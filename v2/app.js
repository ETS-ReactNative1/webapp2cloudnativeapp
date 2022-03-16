//. app.js
var express = require( 'express' ),
    ejs = require( 'ejs' ),
    session = require( 'express-session' ),
    app = express();

var db = require( './api/db_postgres' );
app.use( '/api/db', db );

var redisClient = require( './api/db_redis' );

app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

//. AppID
var settings_appid_region = 'APPID_REGION' in process.env ? process.env.APPID_REGION : 'us-south';
var settings_appid_tenantId = 'APPID_TENANTID' in process.env ? process.env.APPID_TENANTID : '';
var settings_appid_apiKey = 'APPID_APIKEY' in process.env ? process.env.APPID_APIKEY : '';
var settings_appid_secret = 'APPID_SECRET' in process.env ? process.env.APPID_SECRET : '';
var settings_appid_clientId = 'APPID_CLIENTID' in process.env ? process.env.APPID_CLIENTID : '';
var settings_appid_redirectUri = 'APPID_REDIRECTURI' in process.env ? process.env.APPID_REDIRECTURI : 'http://localhost:8080/appid/callback';
var settings_appid_oauthServerUrl = 'APPID_OAUTHSERVERURL' in process.env ? process.env.APPID_OAUTHSERVERURL : 'https://' + settings_appid_region + '.appid.cloud.ibm.com/oauth/v4/' + settings_appid_tenantId;

var RedisStore = require( 'connect-redis' )( session );
var passport = require( 'passport' );

//. Session
var sess = {
  secret: 'webapp2cloudnativeapp',
  cookie: {
    path: '/',
    maxAge: (7 * 24 * 60 * 60 * 1000)
  },
  resave: false,
  saveUninitialized: false //true
};
if( redisClient ){
  sess.store = new RedisStore( { client: redisClient } );
}
app.use( session( sess ) );

var useAppId = false;
if( settings_appid_region && settings_appid_tenantId && settings_appid_apiKey && settings_appid_secret && settings_appid_clientId && settings_appid_redirectUri && settings_appid_oauthServerUrl ){
  var WebAppStrategy = require( 'ibmcloud-appid' ).WebAppStrategy;

  app.use( passport.initialize() );
  app.use( passport.session() );
  passport.serializeUser( ( user, cb ) => cb( null, user ) );
  passport.deserializeUser( ( user, cb ) => cb( null, user ) );
  passport.use( new WebAppStrategy({
    tenantId: settings_appid_tenantId,
    clientId: settings_appid_clientId,
    secret: settings_appid_secret,
    oauthServerUrl: settings_appid_oauthServerUrl,
    redirectUri: settings_appid_redirectUri
  }));

  //. login
  app.get( '/appid/login', passport.authenticate( WebAppStrategy.STRATEGY_NAME, {
    successRedirect: '/',
    forceLogin: false //true
  }));

  //. logout
  app.get( '/appid/logout', function( req, res ){
    WebAppStrategy.logout( req );
    res.redirect( '/' );
  });

  //. callback
  app.get( '/appid/callback', function( req, res, next ){
    next();
  }, passport.authenticate( WebAppStrategy.STRATEGY_NAME )
  );

  useAppId = true;
}

app.get( '/', async function( req, res ){
  try{
    var user = useAppId ? ( req.user && req.user.sub ? { id: req.user.id, nickname: req.user.name, picture: "" } : null ) : null;
    var result = await db.readItems();
    if( result.status ){
      res.render( 'index', { items: result.results, user: user, useAppId: useAppId } );
    }else{
      res.render( 'index', { items: [], user: user, useAppId: useAppId } );
    }
  }catch( e ){
    console.log( e );
    res.render( 'index', { items: [], user: null, useAppId: useAppId } );
  }finally{
  }
});


var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

module.exports = app;

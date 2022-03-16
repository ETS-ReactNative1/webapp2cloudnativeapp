//. app.js
var express = require( 'express' ),
    app = express();

var db = require( './api/db_postgres' );
app.use( '/api/db', db );

app.use( express.static( __dirname + '/public' ) );
app.use( express.Router() );

var port = process.env.PORT || 3000;
app.listen( port );
console.log( "server starting on " + port + " ..." );

module.exports = app;

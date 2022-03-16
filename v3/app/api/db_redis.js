//. db_redis.js
var settings_redis_url = 'REDIS_DATABASE_URL' in process.env ? process.env.REDIS_DATABASE_URL : ''; //. 'redis://localhost:6379' 

//. Redis
var redis = require( 'redis' );
var redisClient = null;
if( settings_redis_url ){
  redisClient = redis.createClient( settings_redis_url, {} );
  console.log( 'redis connected' );
  redisClient.on( 'error', function( err ){
    console.error( 'on error redis', err );
    try_reconnect( 1000 );
  });
}

function try_reconnect( ts ){
  setTimeout( function(){
    console.log( 'reconnecting...' );
    redisClient = redis.createClient( settings_redis_url, {} );
    redisClient.on( 'error', function( err ){
      console.error( 'on error redis', err );
      ts = ( ts < 10000 ? ( ts + 1000 ) : ts );
      try_reconnect( ts );
    });
  }, ts );
}


//. redisClient をエクスポート
module.exports = redisClient;

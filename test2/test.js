#!/usr/bin/env node

var test = require( 'tape' )
  , fs = require( 'fs' )
  , util = require( 'util' )
  , processJSON = require( '../bin/process_json' );

test( 'basic', function(t) {
  fs.readFile( './test2/data.json', function(err, data) {
    if (err) throw err;
    processJSON( 
        JSON.parse( data.toString() )
      , function(data, next) {
        next();
      } )
    .then( function(result) {
      console.log( util.inspect(result) );
      t.pass();
      t.end();
    });
  });
});
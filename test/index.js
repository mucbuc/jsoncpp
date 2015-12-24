#!/usr/bin/env node

var Expector = require( 'expector' ).Expector
  , cp = require( 'child_process' )
  , test = require( 'tape' )
  , fs = require( 'fs' )
  , translate = require( '../index.js' );

test( 'smoke', function(t) {
  var expector = new Expector(t)
    , child;

  fs.readFile( 'test/src/sample.h', function(err, data) {
    if (err) throw err;
    expector.expect( data.toString() );
  
    translate( 'test2/data.json', function(result) {
      result = result.toString();
      for (var i = 0; i < 2; ++i) 
      {
        result = result.substring( result.indexOf('\n') + 1 );
      }

      console.log( result );

      expector.emit( result.toString() );
      expector.check();
    } );
  });
});
#!/usr/bin/env node

var Expector = require( 'expector' ).Expector
  , test = require( 'tape' )
  , fs = require( 'fs' )
  , translate = require( '../index.js' );

test.skip( 'smoke', function(t) {
  var expector = new Expector(t);

  fs.readFile( 'test/src/sample.h', function(err, data) {
    if (err) throw err;
    expector.expect( data.toString() );
  
    translate( 'test2/data.json', function(result) {
      result = result.toString();
      for (var i = 0; i < 2; ++i) 
      {
        result = result.substring( result.indexOf('\n') + 1 );
      }

      expector.emit( result.toString() );
      expector.check();
    } );
  });
});

test.only( 'array', function(t) {

  var expector = new Expector(t);

  fs.readFile( 'test/src/result_array.h', function(err, data) {
    if (err) throw err;
    expector.expect( data.toString() );

    translate( 'test/array.json', function(result) {
      result = result.toString();
      for (var i = 0; i < 2; ++i) 
      {
        result = result.substring( result.indexOf('\n') + 1 );
      }

      expector.emit( result.toString() );
      expector.check();
    });
  });
});
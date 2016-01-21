#!/usr/bin/env node

var Expector = require( 'expector' ).Expector
  , test = require( 'tape' )
  , fs = require( 'fs' )
  , translate = require( '../index.js' );

test( 'smoke', function(t) {
  var expector = new Expector(t);

  fs.readFile( 'test/src/sample.h', function(err, data) {
    var jsonPath = 'test2/data.json';
    if (err) throw err;
    expector.expect( data.toString() );
  
    fs.readFile(jsonPath, function(err, data) {
      if (err) throw err; 
      translate( JSON.parse(data.toString()), jsonPath, function(result) {
        expector.emit( result.toString() );
        expector.check();
      });
    });
  });
});

test( 'array', function(t) {

  var expector = new Expector(t);

  fs.readFile( 'test/src/result_array.h', function(err, data) {
    var jsonPath = 'test/array.json';
    if (err) throw err;
    expector.expect( data.toString() );
    fs.readFile(jsonPath, function(err,data) {
      if (err) throw err;
      translate( JSON.parse(data.toString()), jsonPath, function(result) {
        expector.emit( result.toString() );
        expector.check();
      });
    }); 
  });
});

test.skip( 'object_array', function(t) {
  var jsonPath =  'test/object_array.json'
  fs.readFile( jsonPath, function(err, data) {
    if (err) throw err; 

    translate( JSON.parse(data.toString()), jsonPath, function(result) {
      console.log( result.toString() );
      t.pass();
      t.end();
    });
  });
});

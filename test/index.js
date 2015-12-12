#!/usr/bin/env node

var Expector = require( 'expector' ).Expector
  , cp = require( 'child_process' )
  , test = require( 'tape' )
  , fs = require( 'fs' );

process.chdir( '..' );

test( 'smoke', function(t) {
  var expector = new Expector(t)
    , child;

  fs.readFile( 'test/src/sample.h', function(err, data) {
    var buffer = '';
    if (err) throw err;
    expector.expect( data.toString() );
  
    child = cp.fork( './index.js', [], {silent: true});
    child.stdout.on( 'data', function(data) {
      buffer += data.toString();
    });
    child.on( 'exit', function(code) {
      expector.emit( buffer );
      expector.check();
    });
  });
});
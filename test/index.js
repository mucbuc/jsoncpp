#!/usr/bin/env node

var Expector = require( 'expector' ).Expector
  , cp = require( 'child_process' )
  , test = require( 'tape' )
  , fs = require( 'fs' );

process.chdir( '..' );

test( 'smoke', function(t) {
	var expector = new Expector(t)
	  , child;

	fs.readFile( 'test/sample.h', function(err, data) {
		if (err) throw err;
		expector.expect( data.toString() );
	
		child = cp.fork( './index.js', []);
		child.on( 'exit', function(code) {
			expector.check();
		});
	});
});
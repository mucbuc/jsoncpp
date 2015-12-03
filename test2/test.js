#!/usr/bin/env node

var test = require( 'tape' )
  , Expector = require( 'expector' ).SeqExpector
  , fs = require( 'fs' )
  , util = require( 'util' )
  , processJSON = require( '../index' );

test( 'basic', function(t) {
	fs.readFile( './data.json', function(err, data) {
		if (err) throw err;
		processJSON( JSON.parse( data.toString() ) )
		.then( function(result) {
			console.log( util.inspect(result) );
			t.pass();
        	t.end();
		});
	});
});
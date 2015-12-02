#!/usr/bin/env node

var test = require( 'tape' )
  , Expector = require( 'expector' ).SeqExpector
  , fs = require( 'fs' )
  , processJSON = require( '../index' );

test( 'basic', function(t) {
	fs.readFile( './data.json', function(err, data) {
		if (err) throw err;
		processJSON( JSON.parse( data.toString() ) );
	});
});
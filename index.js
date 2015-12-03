#!/usr/bin/env node

var assert = require( 'assert' )
  , fs = require( 'fs' )
  , processJSON = require( './bin/process_json' )
  , writeCPP = require( './bin/write_cpp' )

assert( typeof processJSON !== 'undefined' );
assert( typeof writeCPP !== 'undefined' );

function translate(pathJSON) {
	fs.readFile(pathJSON, function(err, data) {
		if (err) throw err;
		processJSON(JSON.parse(data.toString()))
		.then( function(result) {
			writeCPP(result);
		});
	});
}

translate( './test2/data.json' );
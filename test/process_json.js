#!/usr/bin/env node

var processJSON = require( '../bin/process_json' );

processJSON( { data: 0 }, function(type, name, value) {
	console.log( type, name, value );
});
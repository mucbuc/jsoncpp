#!/usr/bin/env node

var processJSON = require( '../bin/process_json' )
  , test = require( 'tape' )
  , Expector = require( 'expector' ).Expector;

test( 'basic', function(t) {
	var expector = new Expector( t );

	expector.expect( 'number' );

	processJSON( { data: 0 }, function(info, next) {
		expector.emit( info.type );
		next();
		expector.check();
	});
});


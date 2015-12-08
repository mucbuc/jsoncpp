#!/usr/bin/env node

var processJSON = require( '../bin/process_json' )
  , test = require( 'tape' )
  , Expector = require( 'expector' ).Expector;

test( 'type names', function(t) {
  var expector = new Expector( t );

  checkType("boolean", false); 
  checkType("number", 0);
  checkType("string", "str");
  checkType("null", null);
  checkType("object", {});
  checkType("array", []); 
  expector.check();
  
  function checkType( type, value ) {
    
    expector.expect( 'done', { type: type, name: 'data', value: value } );

    processJSON( { data: value }, function(info, next) {
      expector.emit( 'done', info );
      next();
    });
  }
});

#!/usr/bin/env node

var assert = require( 'assert' )
  , fs = require( 'fs' )
  , processJSON = require( './bin/process_json' )
  , writeCPP = require( './bin/write_cpp' )
  , makeModel = require( './bin/model' );

assert( typeof makeModel !== 'undefined' );
assert( typeof processJSON !== 'undefined' );
assert( typeof writeCPP !== 'undefined' );

function translate(pathJSON) {
  fs.readFile(pathJSON, function(err, data) {
    var model = makeModel();
    if (err) throw err;
    processJSON(
      JSON.parse(data.toString()),
      function(info, next) {
        model[info.type].push( { name: info.name, value: info.value} );
        next();
      }
    )
    .then( function() {
      writeCPP(model, 'json' )
      .then( function(source) { 
        console.log( source ); 
      });
    });
  });
}

translate( './test2/data.json' );
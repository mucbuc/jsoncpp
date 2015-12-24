#!/usr/bin/env node

var assert = require( 'assert' )
  , fs = require( 'fs' )
  , processJSON = require( './bin/process_json' )
  , writeCPP = require( './bin/write_cpp' )
  , makeModel = require( './bin/model' );

assert( typeof makeModel !== 'undefined' );
assert( typeof processJSON !== 'undefined' );
assert( typeof writeCPP !== 'undefined' );

if (module.parent) {
  module.exports = translate;
}
else if (process.argv.length < 4) {
  console.log( 'usage: cppjson $input.json $output.h' ); 
}
else {
  
  translate( process.argv[2], function(source) {


    fs.writeFile( process.argv[3], result ); 
  });
}

function translate(pathJSON, cb) {
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
        var pathFixed = pathJSON.replace( /[\/\\\.]/g, '_' )
          , guard = (pathFixed + '_' + Math.random().toString(36).substr(2)).toUpperCase() // remove '_json' part 
          , name = pathFixed.substr(0, pathFixed.length - 5)
          , result = '';
    
        result += '#ifndef ' + guard + '\n';
        result += '#define ' + guard + '\n';
        result += 'namespace static_port_' + name + '\n{\n';
        result += source + '\n';
        result += '}\n#endif';

        cb( result ); 
      });
    });
  });
}

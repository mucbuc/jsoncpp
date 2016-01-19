#!/usr/bin/env node

var assert = require( 'assert' )
  , fs = require( 'fs' )
  , processJSON = require( './bin/process_json' )
  , writeCPP = require( './bin/write_cpp' )
  , makeModel = require( './bin/model' )
  , path = require( 'path' );

assert( typeof makeModel !== 'undefined' );
assert( typeof processJSON !== 'undefined' );
assert( typeof writeCPP !== 'undefined' );

if (module.parent) {
  module.exports = translate;
}
else if (process.argv.length < 4) {
  console.log( 'usage: jsoncpp $input.json $output.h' ); 
}
else {
  translateFile( process.argv[2], function(source) {
    fs.writeFile( process.argv[3], source ); 
  });
}

function translateFile(pathJSON, cb) {
  fs.readFile(pathJSON, function(err, data) {
    if (err) throw err;
    translate(JSON.parse(data.toString()), pathJSON, cb);
  });
}

function translate(json, pathJSON, cb ) {
  var model = makeModel()
    , pathRel = path.join( 
        path.basename( path.dirname( pathJSON ) ), 
        path.basename( pathJSON ) 
      );    
  processJSON(
    json,
    function(info, next) {
      model[info.type].push( { name: info.name, value: info.value} );
      next();
    }
  )
  .then( function() {
    writeCPP(model, 'json' )
    .then( function(source) { 
      var pathFixed = pathRel.replace( /[\/\\\.]/g, '_' )
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
}

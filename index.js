#!/usr/bin/env node

var assert = require( 'assert' )
  , fs = require( 'fs' )
  , processJSON = require( './bin/process_json' )
  , writeCPP = require( './bin/write_cpp' )
  , makeModel = require( './bin/model' )
  , mr = require( 'mkdir-recursive')
  , path = require( 'path' );

assert( typeof makeModel !== 'undefined' );
assert( typeof processJSON !== 'undefined' );
assert( typeof writeCPP !== 'undefined' );

if (module.parent) {
  module.exports = {
    translate : translate, 
    translateFile: translateFile
  };
}
else if (process.argv.length < 4) {
  console.log( 'usage: jsoncpp $input.json $output.h' ); 
}
else {
  translateFile( process.argv[2], function(source) {
    mr.mkdir(process.argv[3], function(err) {
      if (err) throw err;
      fs.writeFile( process.argv[3], source ); 
    });
  });
}

function translateFile(pathJSON, cb) {
  fs.readFile(pathJSON, function(err, data) {
    var pathRel; 
    if (err) throw err;
    pathRel = path.join( 
      path.basename( path.dirname( pathJSON ) ), 
      path.basename( pathJSON ) 
    );
    translate(
      JSON.parse(data.toString()), 
      function(source) {
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
      }
    );
  });
}

function translate(json, cb, internal) {
  var model = makeModel();   
  processJSON(
    json,
    function(info, next) {
      model[info.type].push( { name: info.name, value: info.value} );
      next();
    }
  )
  .then( function() {
    writeCPP(model, 'json', translate, internal )
    .then( function(source) { 
      cb(source);
    });
  });
}

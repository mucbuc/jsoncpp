var assert = require( 'assert' )
  , util = require( 'util' )
  , traverse = require( 'traverjs' )
  , Promise = require( 'promise' );

function processJSON(json, cb) {

  assert( typeof cb !== 'undefined' );

  return new Promise( function(resolve, reject) {
    
    traverse( json, function(o, next) {
      var name = Object.keys(o)[0]
        , value = o[name]
        , type = typeof value;
      
      if (type == 'object') {
        if (Array.isArray(value)) {
          type = 'array';
        } 
        else if (value == null) {
          type = 'null';
        }
      }
      cb( type, name, value );
      next();
    } )
    .then( function() {
      resolve();
    })
    .catch( reject );
  });
}

module.exports = processJSON;

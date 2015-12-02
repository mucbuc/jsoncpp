var traverse = require( 'traverjs' )
  , util = require( 'util' );

function processJSON(json, name) {

    var result = {
            "null": [],
            "boolean": [],
            number: [],
            string: [],
            object: [],
            array: []
          };

    traverse( json, function(o, next) {
        var name = Object.keys(o)[0]
          , value = o[name]
          , type = typeof value
          , info = '';
        
        if (type == 'object') {
            if (Array.isArray(value)) {
                type = 'array';
            } 
            else if (value == null) {
                type = 'null';
            }
        }
        info = { name: name, value: value };
        console.log( info, type );
        result[type] += info;
        next();
    } )
    .then( function() {
        traverse( result, function( ele, next ) {
            traverse( ele, function( inside, inext) {
                console.log( '*', inside );
                inext();
            })
            .then( next );
        } )
        .then( function() {
            t.end();
        });
    });
}

module.exports = processJSON;
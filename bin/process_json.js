var assert = require( 'assert' )
  , util = require( 'util' )
  , traverse = require( 'traverjs' )
  , Promise = require( 'promise' )
  , makeModel = require( './model' );

assert( typeof makeModel !== 'undefined' );

function processJSON(json, name) {

	return new Promise( function(resolve, reject) {
		var model = makeModel();

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
			model[type].push({name: name, value: value});
			next();
		} )
		.then( function() {
			resolve(model);
		})
		.catch( reject );
	});
}

module.exports = processJSON;

var traverse = require( 'traverjs' )
  , Promise = require( 'promise' );

function processJSON(json, name) {

	return new Promise( function(resolve, reject) {


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
			  , type = typeof value;
			
			if (type == 'object') {
				if (Array.isArray(value)) {
					type = 'array';
				} 
				else if (value == null) {
					type = 'null';
				}
			}
			result[type].push({name: name, value: value});
			next();
		} )
		.then( function() {
			resolve(result);
		})
		.catch( reject );
	});
}

module.exports = processJSON;

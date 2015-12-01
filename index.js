var traverse = require( 'traverjs' );

function processJSON(data) {

	traverse( JSON.parse( data.toString() ), function(o, next) {
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
		switch(type) {
			case 'string':
			break;
			case 'number':
			break;
			case 'boolean':
			break;
			case 'null':
			break;
			case 'object': 
			break;
			case 'array':
			break;
		}

		console.log( name, value, type );
		next();
	} )
	.then( function() {
		t.end();
	});
}

module.exports = processJSON;
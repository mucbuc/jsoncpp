var util = require( 'util' );

function writeCPP( json ) {
	console.log( util.inspect( json ) );
}

module.exports = writeCPP;
var util = require( 'util' );

function Writer()
{
	var classes = ''
	  , includes = ''
	  , guard = '';

	this.writeFile = function(filePath) {
		var content = '';
		content += includeGuardBegin();
		content += includes;
		content += classes;
		content += includeGuardEnd();
	
		console.log( content );
	};

	this.defineClass = function( name, members, nestedClasses ) {

		// template<class T> just like 
		//classes += 'class ' + name + 
	};

	this.includeFile = function( filePath ) {
		includes += '#include ' + filePath + '\n'; 
	};

	function includeGuardBegin() {
		return '';
	}


	function includeGuardEnd() {
		return '';
	}
}


function writeCPP( json ) {
	
	var writer = new Writer();

	writer.includeFile( '<lib/jsoncpp/src/jsonbase.h>' );

	writer.writeFile( 'iyt' );
// 	var code = '';
// //	code += incluce guard
// 	code += '#include <lib/jsoncpp/src/jsonbase.h>\n';
// 	code += 'namespace cport\n'; 
// 	code += '{\n';
// 	code +=	'class Name : public';
// 	code += '} // cport\n'
// //	code += incluce guard close
// 	console.log( code );
}

writeCPP( '' );

module.exports = writeCPP;
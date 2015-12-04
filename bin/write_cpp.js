/*	
		, members, nestedClasses )
		if (typeof members === 'undefined') {
			members = '';
		}
		if (typeof nestedClasses === 'undefined') {
			nestedClasses = '';
		}

		classes += nestedClasses;
		classes += members;
		classes += '};\n'; 
	*/

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

	this.defineClassBegin = function( name ) {
		classes += 'class ' + name + '\n';
		classes += '{\n';
	};

	this.defineClassEnd = function( name ) {
		classes += '};\n';
	}

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
	writer.defineClassBegin( 'dummy' );
	writer.defineClassEnd();
	writer.writeFile( 'iyt' );
}

writeCPP( '' );

module.exports = writeCPP;
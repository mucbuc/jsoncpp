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
    , guard = ''
    , tabCount = 0;

  this.writeFile = function(filePath) {
    var content = '';
    content += includeGuardBegin();
    content += includes;
    content += classes;
    content += includeGuardEnd();
  
    console.log( content );
  };

  this.defineClassBegin = function( name ) {
    classes += tabs(tabCount) + 'class ' + name + '\n';
    classes += tabs(tabCount) + '{\n';
    ++tabCount;
  };

  this.defineClassEnd = function( name ) {
    classes += tabs(--tabCount) + '};\n';
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

  function tabs(count) {
    var result = '';
    while (count--) {
      result += '\t';
    }
    return result;
  }
}

function writeCPP( json ) {
  var writer = new Writer();
  writer.includeFile( '<lib/jsoncpp/src/jsonbase.h>' );
  writer.defineClassBegin( 'dummy' );
  writer.defineClassBegin( 'nested' );
  writer.defineClassEnd();
  writer.defineClassEnd();
  writer.writeFile( 'iyt' );
}

writeCPP( '' );

module.exports = writeCPP;
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
    , tabCount = 0
    , instance = this;

  this.writeFile = function(filePath) {
    var content = '';
    content += includeGuardBegin();
    content += includes;
    content += classes;
    content += includeGuardEnd();
  
    console.log( content );
  };

  this.defineTemplateClassBegin = function( template, name ) {
    classes += 'template ' + template + '\n';
    instance.defineStructBegin( name );
  };

  this.defineStructBegin = function( name ) {
    classes += tabs(tabCount) + 'struct ' + name + '\n';
    classes += tabs(tabCount) + '{\n';
    ++tabCount;
  };

  this.defineStructEnd = function( name ) {
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
  
  writer.defineTemplateClassBegin( '<T = std::string, U = int>', 'dummy' );
  //json[""]

  writer.defineStructBegin( 'nested' );
  writer.defineStructEnd();
  writer.defineStructEnd();
  writer.writeFile( 'iyt' );
}

writeCPP( '' );

module.exports = writeCPP;
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
  var tabCount = 0
    , instance = this;

  this.defineTemplateClassBegin = function( template, name ) {
    var result = 'template ' + template + '\n';
    result += instance.defineStructBegin( name );
    return result;
  };

  this.defineStructBegin = function( name ) {
    var result = tabs(tabCount) + 'struct ' + name + '\n';
    result += tabs(tabCount++) + '{\n';
    return result;
  };

  this.defineStructEnd = function( name ) {
    return tabs(--tabCount) + '};\n';
  };

  this.includeGuardBegin = function() {
    return '';
  };

  this.includeGuardEnd = function() {
    return '';
  };

  function tabs(count) {
    var result = '';
    while (count--) {
      result += '\t';
    }
    return result;
  }
}

function writeCPP( json, name ) {
  var writer = new Writer()
    , content = '';

  content += writer.includeGuardBegin();
  content += writer.defineTemplateClassBegin( '<T = std::string, U = int>', name );
  
  //writer.write( '    typedef T string_type;' );
  //writer.write( '    typedef U number_type;' );

  content += writer.defineStructBegin( 'nested' );
  content += writer.defineStructEnd();
  content += writer.defineStructEnd();
  content += writer.includeGuardEnd();
  console.log( content );
}

writeCPP( '', 'json' );

module.exports = writeCPP;
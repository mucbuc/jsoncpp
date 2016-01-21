var assert = require( 'assert' )

function Writer(tabInit)
{
  var tabCount = 0
    , instance = this
    , init = '';

  this.open = function() {
    return instance.tabs(tabCount++) + '{' ;
  };

  this.close = function() {
    assert( tabCount );
    return instance.tabs(--tabCount) + '}' ;
  };

  this.write = function( text ) {
    return instance.tabs(tabCount) + text.replace( /\n/g,  instance.tabs(tabCount) );
  };

  this.defineTemplateClassBegin = function( template, name ) {
    var result = init + 'template ' + template;
    init = '\n';
    result += instance.defineStructBegin( name );
    return result;
  };

  this.defineStructBegin = function( name ) {
    return instance.write( 'struct ' + name ) + instance.open();
  };

  this.defineStructEnd = function( name ) {
    return instance.close() + ';';
  };

  this.mangle = function(source) {
    return '_' + source;
  };

  this.tabs = function(count) {
    var result = init;
    init = '\n';
    while (count--) {
      result += '  ';
    }
    return result;
  };
}

module.exports = Writer;
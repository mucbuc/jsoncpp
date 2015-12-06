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

var util = require( 'util' )
  , traverse = require( 'traverjs' )
  , Promise = require( 'promise' );

function Writer()
{
  var tabCount = 0
    , instance = this;

  this.write = function( text ) {
    return tabs(tabCount) + text + '\n';
  };

  this.defineTemplateClassBegin = function( template, name ) {
    var result = 'template ' + template + '\n';
    result += instance.defineStructBegin( name );
    return result;
  };

  this.defineStructBegin = function( name ) {
    var result = instance.write( 'struct ' + name );
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

  this.mangle = function(source) {
    return '_' + source;
  };

  function tabs(count) {
    var result = '';
    while (count--) {
      result += '  ';
    }
    return result;
  }
}

function writeCPP( json, name ) {
  
  return new Promise( function(resolve, reject) {

    var writer = new Writer()
      , content = '';

    content += writer.includeGuardBegin();
    content += writer.defineTemplateClassBegin( '<T = std::string, U = int>', name );
    
    content += writer.write( 'typedef T string_type;' );
    content += writer.write( 'typedef U number_type;' );

    traverse( json, function(type, nextType) { 
      var key = Object.keys( type )[0];
      var value = type[key];
      switch (key) 
      {
        case "object": 
          traverse( value, function( object, nextObject ) {

            content += writer.defineStructBegin( object.name );
      
            content += util.inspect(object.value);

            content += writer.defineStructEnd();  
          
          })
          .then( nextType );
          break;

        case "array": 
          traverse( value, function( array, nextArray) {

            var types = [];
            traverse( array, function(type, nextType) {
              types.push( mapType(typeof key) );
              nextType();
            })
            .then( function() {
              content += writer.write( 'std::tuple<' + types.join(', ') 
                 + '> ' + writer.mangle( array.name ) 
                 + ' = {' + util.inspect( array.value).slice(1,-1) + '};' );
              nextArray();
            });
          })
          .then( nextType );
          break;
      case "string":
      case "number":
      case "boolean":
        var mapped = mapType(key);
        traverse(value, function(obj, next) { 
          content += writer.write( mapped 
            + ' ' + writer.mangle( obj.name )
            + ' = ' + obj.value + ';' );
            next();  
        })
        .then( nextType );
        break;
      default:
        nextType();
      }; 
    })
    .then(function() {
      content += writer.defineStructEnd();
      content += writer.includeGuardEnd();
      console.log( content );
      resolve(content);
    });

  });

  function mapType(type) {
    switch (type) {
      case 'object':
      case 'array': 
        break;
      case 'boolean':
        return 'bool';
      case 'null':
        return 'std::nullptr_t';
    }
    return type + '_type';
  }
}

module.exports = writeCPP;
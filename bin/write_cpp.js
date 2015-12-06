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
          .then( function() {
            nextType();
          });
          break;
      case "string":
      case "number":
      case "boolean":
        var mapped = mapType(key);
        traverse(value, function(obj, next) { 
          content += writer.write( mapped 
            + ' ' + writer.mangle( obj.name )
            + ' = ' + obj.value + ';' );   
        });
        // fall thru
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




/*
    json["object"].forEach( function(obj) {
      content += writer.defineStructBegin( obj.name );
      
      ///content += util.inspect(obj.value);

      content += writer.defineStructEnd();   
    });

    json["array"].forEach( function(obj) {
      
      var types = [];
      traverse( obj.value, function(type, next) {
        types.push( mapType(typeof type) );
        next();
      })
      .then( function() {
        content += writer.write( 'std::tuple<' + types.join(', ') 
          + '> ' + writer.mangle( obj.name ) 
          + ' = {' + util.inspect(obj.value).slice(1,-1) + '};' );
        
        [ "string", "number", "boolean" ].forEach( function(type) {
          json[type].forEach( function(obj) {
            content += writer.write( mapType(type) 
              + ' ' + writer.mangle( obj.name )
              + ' = ' + obj.value + ';' );      
          });
        });

        content += writer.defineStructEnd();
        content += writer.includeGuardEnd();
        console.log( content );
        resolve();
      });
    });
*/
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
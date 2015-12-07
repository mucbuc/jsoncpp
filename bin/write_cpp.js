var assert = require( 'assert' )
  , util = require( 'util' )
  , traverse = require( 'traverjs' )
  , Promise = require( 'promise' )
  , processJSON = require( './process_json' )
  , Writer = require( './writer' );

assert( typeof processJSON !== 'undefined' ); 
assert( typeof Writer !== 'undefined' );

function writeCPP( json, name ) {
  return new Promise( function(resolve, reject) { 

    writeCPPInternal( json, name )
    .then( function(content) {
      var result = ''
        , writer = new Writer();
      result += writer.includeGuardBegin();
      result += writer.defineTemplateClassBegin( '<T = std::string, U = int>', name );
      result += writer.write( 'typedef T string_type;' );
      result += writer.write( 'typedef U number_type;' );
      result += writer.write( content );
      result += writer.defineStructEnd();
      result += writer.includeGuardEnd();
      resolve( result );
    })
    .catch( reject );
  });
}

function writeCPPInternal( json, name ) {
  
  return new Promise( function(resolve, reject) {

    var writer = new Writer()
      , content = ''
      , members = [];

    traverse( json, function(type, nextType) { 
      
      var key = Object.keys( type )[0];
      var value = type[key];
      
      switch (key) 
      {
      case "object": 
        traverse( value, function( object, nextObject ) {
          
          processJSON(object.value)
          .then( function(result) {
            var typeName = mapType( object.name );
            writeCPPInternal( result, typeName )
            .then( function(nested) {
              content += writer.defineStructBegin( typeName ); 
              content += writer.write(nested);
              content += writer.defineStructEnd();
              content += writer.write(typeName + ' ' + writer.mangle( object.name ) + ' = {};' );
              members.push( object.name ); 
              nextObject(); 
            } );
          });
        })
        .then( nextType )
        .catch( nextType );
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
            members.push( array.name ); 
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
          members.push( obj.name );
          next();  
        })
        .then( nextType )
        .catch( nextType );
        break;
      case "null": 
        var mapped = mapType(key);
        traverse(value, function(obj, next) { 
          content += writer.write( mapped 
            + ' ' + writer.mangle( obj.name ) + ';' );
          members.push( obj.name );
          next();  
        })
        .then( nextType )
        .catch( nextType );
        break;
      default:
        nextType();
      }; 
    })
    .then(function() {
      content += writer.write( 'template<class V>' );
      content += writer.write( 'void traverse(V & h)' );
      content += writer.write( '{' );
      writer.open();
      members.forEach( function(member) {
        content += writer.write( 'h( "' + member + '", ' + writer.mangle(member) + ');' );
      } );
      writer.close();
      content += writer.write( '}' );
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
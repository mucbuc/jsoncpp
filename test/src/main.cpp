#include <iostream>
#include <map>
#include <vector>

#include "abstract_json.h"
#include "json_base.h"

#include "test.h"

class json : public json_base
{   
    struct nested_json : json_base
    {
        nested_json()
        : json_base(
            { { "right", _right } },
            {},
            {},
            {},
            {}
          )
        , _right( true )
        , _strings( { "hello", "arrays" } )
        {}
        
        const bool _right;
        std::vector< string_type > _strings;
    };

public:
    
    json()
    : json_base(
        { { "wrong", _wrong } },
        { { "wtf", _wtf } },
        {},
        { { "three", _three } },
        {}
      )
    , _wrong( true )
    , _wtf()
    , _three( 3 )
    {}
    
    const bool _wrong;
    const nested_json _wtf;
    const int _three;
};


int main(int argc, const char * argv[])
{
    json instance;
    ASSERT( instance.has_own_property( "wrong" ) );
    ASSERT( instance.get_boolean( "wrong" ) );
    
    bool caught( false );
    try {
        instance.get_boolean( "wtf " );
    }
    catch(...) {
        caught = true;
    }
    ASSERT( caught );

    const auto & wtf( instance.get_object( "wtf" ) );
    ASSERT( !wtf.has_own_property( "wrong" ) );
    ASSERT( wtf.has_own_property( "right" ) );
    ASSERT( wtf.get_boolean("right") );

    ASSERT( instance._wrong == instance.get_boolean( "wrong" ) );
    ASSERT( instance._wtf._right ==  wtf.get_boolean("right") );
    
    
    ASSERT( instance.get_number( "three" ) == 3 );
    caught = false;
    try {
        wtf.get_number( "three" );
    }
    catch( ... )
    {
        caught = true;
    }
    ASSERT( caught );
    
    return 0;
}
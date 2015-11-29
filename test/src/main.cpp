#include <iostream>
#include <map>

#include "abstract_json.h"
#include "json_base.h"

#include "test.h"

class json : public json_base
{   
    struct nested_json : json_base
    {
        nested_json()
        : json_base(
            { { "right", _right } }, {}
          )
        {}
        
        const bool _right = true;
    };

public:
    
    json()
    : json_base(
        { { "wrong", _wrong } },
        { { "wtf", _wtf } }
      )
    {}
    
    const bool _wrong = true;
    const nested_json _wtf;
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

    return 0;
}
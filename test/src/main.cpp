#include <iostream>
#include <map>
#include <vector>
#include <typeinfo>

#include "abstract_json.h"
#include "json_base.h"

#include "test.h"

template<class T>
class json : public json_base<T>
{
    typedef json_base<T> base_type;
    
    using typename base_type::string_type;
    using typename base_type::number_type;
    using typename base_type::handler_type;
    
    struct nested_json : json_base<T>
    {
        typedef json_base<T> base_type;
        nested_json()
        : base_type(
            { { "right", _right } },
            {},
            {},
            {},
            {}
          )
        , _right( true )
        , _strings( { "hello", "arrays" } )
        {}
        
        virtual void traverse(handler_type & h) override
        {
            h( "strings", _strings );
            base_type::traverse(h);
        }
        
        virtual bool has_own_property(const string_type & key) const override
        {
            return  key == "strings"
                ||  base_type::has_own_property(key);
        }
        
        const bool _right;
        const std::tuple< string_type, string_type > _strings;
    };

public:
    
    json()
    : json_base<T>(
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
    
    virtual void traverse(handler_type & h) override
    {
        h( "wtf", _wtf );
        h( "arr", _arr );
        base_type::traverse(h);
    }
    
    virtual bool has_own_property(const string_type & key) const override
    {
        return  key == "wtf"
            ||  key == "arr"
            ||  base_type::has_own_property( key );
    }
    
    const bool _wrong;
    const nested_json _wtf;
    const int _three;
    const std::tuple< int, bool, string_type > _arr;
};

struct handler_type
{
    template<class T, class U>
    void operator()(T t, const U & u)
    {
        std::cout << t << " " << typeid(u).name() << std::endl;
    }
};


int main(int argc, const char * argv[])
{
    json<handler_type> instance;
    ASSERT( instance.has_own_property( "wrong" ) );
    ASSERT( instance.has_own_property( "wtf" ) );
    ASSERT( instance._wtf.has_own_property( "right" ) );
    
    handler_type handler;
    instance.traverse( handler );

    ASSERT( instance._wrong );
    ASSERT( instance._wtf._right );
    
    return 0;
}
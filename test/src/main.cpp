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
        
        virtual void traverse(handler_type & h) const override
        {
            h( "strings", _strings );
            base_type::traverse(h);
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
    , _arr( 3, false, "something" )
    {}
    
    virtual void traverse(handler_type & h) const override
    {
        h( "arr", _arr );
        base_type::traverse(h);
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
    
    template<class T, class U, class V, class W>
    void operator()(T t, const abstract_json<U, V, W> & u)
    {
        std::cout << t << " " << "object:" << std::endl;
        u.traverse( * this );
        std::cout << "end:" << std::endl;
        
    }
    
    template<class T>
    void operator()(T t, const std::tuple< int, bool, std::string > & u)
    {
        std::cout << t << " " << "tuple<int, bool, string>" << std::endl;
    }
    
    template<class T>
    void operator()(T t, const std::tuple< std::string, std::string > & u)
    {
        std::cout << t << " " << "tuple<string, string>" << std::endl;
    }
    
    template<class T>
    void operator()(T t, const std::string & u)
    {
        std::cout << t << " " << "string:" << u << std::endl;
    }
    
    template<class T>
    void operator()(T t, const int & u)
    {
        std::cout << t << " " << "int:" << u << std::endl;
    }
    
    template<class T>
    void operator()(T t, const bool & u)
    {
        std::cout << t << " " << "bool:" << (u ? "true" : "false") << std::endl;
    }
};


int main(int argc, const char * argv[])
{
    json<handler_type> instance;
    ASSERT( instance._wrong );
    ASSERT( instance._wtf._right );
    
    handler_type handler;
    instance.traverse( handler );
    
    return 0;
}
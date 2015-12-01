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
            { "zippo" }
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
        ASSERT( false );
    }
    
    template<class T, class U, class V, class W>
    void operator()(T t, const abstract_json<U, V, W> & u)
    {
        ++m_abstract_counter;
        u.traverse(* this);
    }
    
    template<class T>
    void operator()(T t, const std::tuple< int, bool, std::string > & u)
    {
        ++m_tuple_int_bool_string_counter;
    }
    
    template<class T>
    void operator()(T t, const std::tuple< std::string, std::string > & u)
    {
        ++m_tuple_string_string_counter;
    }
    
    template<class T>
    void operator()(T t, const std::string & u)
    {
        m_strings[t] = u;
    }
    
    template<class T>
    void operator()(T t, const int & u)
    {
        m_ints[t] = u;
    }
    
    template<class T>
    void operator()(T t, const bool & u)
    {
        m_bools[t] = u;
    }
    
    template<class T>
    void operator()(T t, const json_null & u)
    {
        m_nulls.insert( t );
    }
    
    std::set< std::string > m_nulls;
    std::map< std::string, bool > m_bools;
    std::map< std::string, int > m_ints;
    std::map< std::string, std::string > m_strings;
    unsigned m_abstract_counter = 0;
    unsigned m_tuple_string_string_counter = 0;
    unsigned m_tuple_int_bool_string_counter = 0;
};


int main(int argc, const char * argv[])
{
    json<handler_type> instance;
    ASSERT( instance._wrong );
    ASSERT( instance._wtf._right );
    
    handler_type handler;
    instance.traverse( handler );
    
    ASSERT( handler.m_bools["right"] );
    ASSERT( handler.m_bools["wrong"] );
    ASSERT( handler.m_ints["three"] == 3 );
    ASSERT( handler.m_abstract_counter == 1 );
    ASSERT( handler.m_tuple_int_bool_string_counter == 1 );
    ASSERT( handler.m_tuple_string_string_counter == 1 );
    ASSERT( handler.m_nulls.count( "zippo" ) );
    
    return 0;
}
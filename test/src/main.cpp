#include <iostream>
#include <map>
#include <set>
#include <vector>
#include <typeinfo>

#include "test.h"

struct json_null
{
    json_null()
    {}
};

class json 
{
    typedef std::string string_type;
    typedef int number_type;
    
    struct nested_json 
    {
        nested_json()
        {}
        
        template<class T> 
        void traverse(T & h) const
        {
            h( "strings", _strings );
            h( "right", _right );
            h( "zippo", _zippo );
        }
        
        const bool _right = true;
        const std::tuple< string_type, string_type > _strings = { "hello", "arrays" };
        const json_null _zippo;
    };

public:
    
    json()
    {}
    
    template<class T>
    void traverse(T & h) const
    {
        h( "wrong", _wrong );
        h( "wtf", _wtf );
        h( "three", 3 );
        h( "arr", _arr );
    }
    
    const bool _wrong = true;
    const nested_json _wtf;
    const int _three = 3;
    const std::tuple< int, bool, string_type > _arr = { 3, false, "something" };
};

struct handler_type
{
    template<class T, class U>
    void operator()(T t, const U & u)
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
    json instance;
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
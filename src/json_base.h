#ifndef JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk
#define JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk

#include <set>

#include "abstract_json.h"
#include "json_impl.h"

struct json_base
: public abstract_json< std::string, int>
{
    typedef abstract_json< std::string, int> root_type;
    using typename root_type::string_type;
    using typename root_type::number_type;
    
    typedef json_impl<string_type, const bool &> bool_type;
    typedef json_impl<string_type, const string_type &> strings_type;
    typedef json_impl<string_type, const number_type &> numbers_type;
    typedef std::set< string_type > nulls_type;
    
    virtual ~json_base() override = default;
    
    json_base() = default;
    
    json_base(  const typename bool_type::map_type & bool_init,
                const typename strings_type::map_type & strings,
                const typename numbers_type::map_type & numbers,
                const nulls_type & nulls
              )
    : m_bool( bool_init )
    , m_strings( strings )
    , m_numbers( numbers )
    , m_nulls( nulls )
    {}
    
    template<class T>
    void traverse(T & h) const
    {
        m_bool.traverse( h );
        m_strings.traverse( h );
        m_numbers.traverse( h );
        for( auto i : m_nulls ) {
            h( i, json_null{} );
        }
    }

private:
    bool_type m_bool;
    strings_type m_strings;
    numbers_type m_numbers;
    std::set< string_type > m_nulls;
};

#endif // JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk
#ifndef JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk
#define JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk

#include <set>

#include "json_impl.h"

struct json_base
: public abstract_json< std::string, int >
{
    typedef abstract_json< std::string, int > root_type;
    typedef json_impl<string_type, const bool &> bool_type;
    typedef json_impl<string_type, const root_type &> object_type;
    typedef json_impl<string_type, const string_type &> strings_type;
    typedef json_impl<string_type, const number_type &> numbers_type;
    typedef std::set< string_type > nulls_type;
    
    virtual ~json_base() override = default;
    
    json_base() = default;
    
    json_base(  const bool_type::map_type & bool_init,
                const object_type::map_type & object_init,
                const strings_type::map_type & strings,
                const numbers_type::map_type & numbers,
                const nulls_type & nulls
              )
    : m_bool( bool_init )
    , m_object( object_init )
    , m_strings( strings )
    , m_numbers( numbers )
    , m_nulls( nulls )
    {}
    
    bool has_own_property(const string_type & key) const override
    {
        return m_bool.has_own_property(key)
            || m_object.has_own_property(key)
            || m_strings.has_own_property(key)
            || m_numbers.has_own_property(key)
            || m_nulls.count(key);
    }
    
    virtual void get_null( const string_type & key) const override
    {
        if (!m_nulls.count(key))
        {
            throw stderr;
        }
    }
    
    const bool & get_boolean( const string_type & key) const override
    {
        return m_bool.get_property(key);
    }
    
    const root_type & get_object( const string_type & key) const override
    {
        return m_object.get_property(key);
    }
    
    const string_type & get_string( const string_type & key ) const override
    {
        return m_strings.get_property(key);
    }
    
    const number_type & get_number( const string_type & key ) const override
    {
        return m_numbers.get_property(key);
    }
    
    bool_type m_bool;
    object_type m_object;
    strings_type m_strings;
    numbers_type m_numbers;
    std::set< string_type > m_nulls;
};

#endif // JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk
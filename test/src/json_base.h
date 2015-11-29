#ifndef JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk
#define JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk

#include "json_impl.h"

struct json_base
: public abstract_json< std::string, int >
{
    typedef abstract_json< std::string, int > root_type;
    typedef json_impl<string_type, bool> bool_type;
    typedef json_impl<string_type, const root_type &> object_type;
    
    virtual ~json_base() override = default;
    
    json_base() = default;
    
    json_base( const bool_type::map_type & bool_init, const object_type::map_type & object_init)
    : m_bool( bool_init )
    , m_object( object_init )
    {}
    
    bool has_own_property(const string_type & key) const override
    {
        return m_bool.has_own_property(key) || m_object.has_own_property(key);
    }
    
    const bool & get_boolean( const string_type & key) const override
    {
        return m_bool.get_property(key);
    }
    
    const root_type & get_object( const string_type & key) const override
    {
        return m_object.get_property(key);
    }
    
    bool_type m_bool;
    object_type m_object;
};

#endif // JSON_BASE_INCLUDE_GUARD_324332kjladjkflfjk
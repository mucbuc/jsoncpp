#ifndef JSON_IMPL_INCLUDE_GUARD_OOJOJ93993IK
#define JSON_IMPL_INCLUDE_GUARD_OOJOJ93993IK

template<class T, class U>
struct json_impl
{
    typedef T string_type;
    typedef std::map< string_type, U > map_type;
    
    json_impl() = default;
    
    json_impl(const map_type & init)
    : m_properties( init )
    {}
    
    bool has_own_property( const string_type & key) const
    {
        return m_properties.find( key ) != m_properties.end();
    }
    
    const U & get_property( const string_type & key) const
    {
        auto i( m_properties.find(key) );
        if (i == m_properties.end())
        {
            throw stderr;
        }
        return i->second;
    }
    
private:
    
    map_type m_properties;
};


#endif // JSON_IMPL_INCLUDE_GUARD_OOJOJ93993IK
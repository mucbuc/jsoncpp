#ifndef JSON_IMPL_INCLUDE_GUARD_OOJOJ93993IK
#define JSON_IMPL_INCLUDE_GUARD_OOJOJ93993IK

template<class T, class U>
struct json_impl
{
    typedef T string_type;
    typedef std::map< string_type, U > map_type;
    
    json_impl() = default;
    ~json_impl() = default;
    
    json_impl(const map_type & init)
    : m_properties( init )
    {}
    
    template<class V>
    void traverse(V & handler) const
    {
        for( auto i : m_properties )
        {
            handler( i.first, i.second );
        }
    }
    
private:
    
    map_type m_properties;
};


#endif // JSON_IMPL_INCLUDE_GUARD_OOJOJ93993IK
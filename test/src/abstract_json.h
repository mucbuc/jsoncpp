#ifndef ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE
#define ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE

template<class T, class U> 
struct abstract_json
{
	typedef T string_type; 
	typedef U number_type;

	virtual ~abstract_json() = default;
	virtual bool has_own_property( const string_type & ) const = 0;
    
    virtual const bool & get_boolean( const string_type &) const = 0;
    virtual const abstract_json & get_object( const string_type & ) const = 0;
    virtual const string_type & get_string( const string_type &) const = 0;
    virtual const number_type & get_number( const string_type &) const = 0;
    virtual void get_null( const string_type &) const = 0;
};

#endif // ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE
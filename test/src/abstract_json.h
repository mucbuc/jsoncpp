#ifndef ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE
#define ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE

template<class T, class U, class V>
struct abstract_json
{
	typedef T string_type; 
	typedef U number_type;
    typedef V handler_type;

	virtual ~abstract_json() = default;
	virtual bool has_own_property(const string_type &) const = 0;
    virtual void traverse(handler_type &) = 0;
    
};

#endif // ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE
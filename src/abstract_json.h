#ifndef ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE
#define ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE

template<class T, class U>
struct abstract_json
{
	typedef T string_type; 
	typedef U number_type;

	virtual ~abstract_json() = default;
};

struct json_null {};

#endif // ABSTRACT_JSON_INCLUDE_GUARD_32143RGWDRWE
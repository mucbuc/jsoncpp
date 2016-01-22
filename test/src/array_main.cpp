#include <iostream>
#include <map>
#include <set>
#include <vector>
#include <typeinfo>

#include "test.h"

#include "object_array.h"


struct handler_type
{
    template<class T, class U>
    void operator()(const T & t, const U & u)
    {
        std::cout << __PRETTY_FUNCTION__ << std::endl;
        u.traverse( * this);
    }
    
    template<class T, class ... U >
    void operator()(const T & t, const std::tuple<U ... > & u)
    {
        std::cout << __PRETTY_FUNCTION__ << std::endl;
    }
    
    template<class T>
    void operator()(const T & t, const std::string & u)
    {
       	std::cout << __PRETTY_FUNCTION__ << std::endl;
    }
    
    template<class T>
    void operator()(const T & t, const int & u)
    {
        std::cout << __PRETTY_FUNCTION__ << std::endl;
    }
    
    template<class T>
    void operator()(const T & t, const bool & u)
    {
        std::cout << __PRETTY_FUNCTION__ << std::endl;
    }
    
    template<class T>
    void operator()(const T & t, const std::nullptr_t & u)
    {
        std::cout << __PRETTY_FUNCTION__ << std::endl;
    }
};



int main(int argc, const char * argv[])
{
    static_port_test_object_array::json<> tmp;
    
    handler_type a;
    tmp.traverse( a );
    
	return 0;
}
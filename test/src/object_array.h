#ifndef TEST_OBJECT_ARRAY_JSON_31D2929N44ZK6GVI
#define TEST_OBJECT_ARRAY_JSON_31D2929N44ZK6GVI
namespace static_port_test_object_array
{
template <class T = std::string, class U = int>
struct json
{
    typedef T string_type;
    typedef U number_type;

    /* need some marker here so the handler knows this 
      is a traversable json
    */ 
    struct _entry_0 
    {
        struct entries
        {
            entries() : _hello( "hello" ), _more( "more" ) {}
            string_type _hello;
            string_type _more;
            template<class V>
            void traverse(V & h) const
            {
              h( 0, _hello);
              h( 1, _more );
            }
        };
    
        _entry_0() = default;
        
        template<class V>
        void traverse(V & h) const
        {
            h( "entries", _entries );
        }

        entries _entries;
    };

    struct _entry_1 
    {
        _entry_1() : _hello("hello"), _more2("more2") {}
        
        string_type _hello;
        string_type _more2;
        template<class V>
        void traverse(V & h) const
        {
          h( 0, _hello);
          h( 1, _more2 );
        }
    };

    _entry_0 _first;
    _entry_1 _second;
    template<class V>
    void traverse(V & h) const
    {
        h( 0, _first );
        h( 1, _second );
    }
};
}
#endif
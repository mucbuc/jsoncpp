template <class T = std::string, class U = int>
struct json
{
  typedef T string_type;
  typedef U number_type;
  struct jsonde03e3d25d87a2a51b8b1966c8c90a64
  {
    std::tuple<string_type, string_type> _entries = {"hello", "more"};
    template<class V>
    void traverse(V & h)
    {
      h( "entries", _entries);
    }
  };
  struct json5b8ba0c6f7f58e381cd074f172492b2b
  {
    std::tuple<string_type, string_type> _entries = {"hello", "more2"};
    template<class V>
    void traverse(V & h)
    {
      h( "entries", _entries);
    }
  };
  std::tuple<jsonde03e3d25d87a2a51b8b1966c8c90a64, json5b8ba0c6f7f58e381cd074f172492b2b> _entries = {};
  template<class V>
  void traverse(V & h)
  {
    h( "entries", _entries);
  }
};
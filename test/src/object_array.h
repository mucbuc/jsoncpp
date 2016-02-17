template <class T = std::string, class U = int>
struct json
{
  typedef T string_type;
  typedef U number_type;
  struct jsona1d8701c7fbff4ef72dd51bc4d9f028c
  {
    std::tuple<string_type, string_type> _entries = std::make_tuple(string_type("hello"), string_type("more"));
    template<class V>
    void traverse(V & h)
    {
      h( "entries", _entries);
    }
  };
  struct jsonf79ffdcba43985e96eddfc991abe3f8b
  {
    std::tuple<string_type, string_type> _entries = std::make_tuple(string_type("hello"), string_type("more2"));
    template<class V>
    void traverse(V & h)
    {
      h( "entries", _entries);
    }
  };
  std::tuple<jsona1d8701c7fbff4ef72dd51bc4d9f028c, jsonf79ffdcba43985e96eddfc991abe3f8b> _entries;
  template<class V>
  void traverse(V & h)
  {
    h( "entries", _entries);
  }
};
template <class T = std::string, class U = int>
struct json
{
  typedef T string_type;
  typedef U number_type;
  std::tuple<string_type, string_type> _entries = std::make_tuple(string_type("hello"), string_type("more"));
  template<class V>
  void traverse(V & h)
  {
    h( "entries", _entries);
  }
};
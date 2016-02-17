template <class T = std::string, class U = int>
struct json
{
  typedef T string_type;
  typedef U number_type;
  struct jsonc9db419dd88c3254dd1a3623cf5cfe7f
  {
    std::tuple<string_type, string_type> _entries = std::make_tuple("hello", "more");
    template<class V>
    void traverse(V & h)
    {
      h( "entries", _entries);
    }
  };
  struct json1bfda7821b12e41750f079eb8f63103f
  {
    std::tuple<string_type, string_type> _entries = std::make_tuple("hello", "more2");
    template<class V>
    void traverse(V & h)
    {
      h( "entries", _entries);
    }
  };
  std::tuple<jsonc9db419dd88c3254dd1a3623cf5cfe7f, json1bfda7821b12e41750f079eb8f63103f> _entries;
  template<class V>
  void traverse(V & h)
  {
    h( "entries", _entries);
  }
};
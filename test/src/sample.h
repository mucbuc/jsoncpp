template <class T = std::string, class U = int>
struct json
{
  typedef T string_type;
  typedef U number_type;
  std::nullptr_t _nothing;
  bool _wrong = true;
  number_type _three = 3;
  string_type _single = string_type("string");
  struct wtf_type
  {
    std::nullptr_t _zippo;
    bool _right = true;
    std::tuple<string_type, string_type> _strings = std::make_tuple(string_type("hello"), string_type("arrays"));
    template<class V>
    void traverse(V & h)
    {
      h( "zippo", _zippo);
      h( "right", _right);
      h( "strings", _strings);
    }
  };
  wtf_type _wtf = {};
  std::tuple<number_type, bool, string_type> _arr = std::make_tuple(3, false, string_type("something"));
  template<class V>
  void traverse(V & h)
  {
    h( "nothing", _nothing);
    h( "wrong", _wrong);
    h( "three", _three);
    h( "single", _single);
    h( "wtf", _wtf);
    h( "arr", _arr);
  }
};
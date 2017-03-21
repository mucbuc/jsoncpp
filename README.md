##install  
```
npm install -g jsoncpp
```

##usage  
```
jsoncpp $input.json $output.h
```

##example input  
```
{
    "wtf": { 
        "right": true,
        "zippo": null,
        "strings": [ "hello", "arrays" ]
    },
    "wrong": true, 
     "three": 3, 
     "arr": [ 3, false, "something" ],
     "single": "string",
     "nothing": null
}   
```

##example output  

```
#ifndef TEST2_DATA_JSON_LW9O5SXX0LLERK9
#define TEST2_DATA_JSON_LW9O5SXX0LLERK9
namespace static_port_test2_data
{
template <class T = std::string, class U = int>
struct json
{
  typedef T string_type;
  typedef U number_type;
  std::nullptr_t _nothing;
  bool _wrong = true;
  number_type _three = 3;
  string_type _single = "string";
  struct wtf_type
  {
    std::nullptr_t _zippo;
    bool _right = true;
    std::tuple<string_type, string_type> _strings = {"hello", "arrays"};
    template<class V>
    void traverse(V & h)
    {
      h( "zippo", _zippo);
      h( "right", _right);
      h( "strings", _strings);
    }
  };
  wtf_type _wtf = {};
  std::tuple<number_type, bool, string_type> _arr = {3, false, "something"};
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
}
#endif
```

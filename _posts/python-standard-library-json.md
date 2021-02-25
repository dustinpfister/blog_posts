---
title: The JSON standard library in Python
date: 2021-02-25 14:35:00
tags: [python]
categories: python
layout: post
id: 811
updated: 2021-02-25 17:23:18
version: 1.9
---

I have wrote a few posts on standard libries in python thus far, I do not think I will write posts on all of them, however I still tink I should write a post for each of them that I might actually use in projects. One such librray might very well be the JSON standard library. The JSON standard library is the standard library to use when it comes to creating a JSON string from a source object, and to parse a JSON string into workable objects. The JSON format is an example of a data seralizion langaue, that is taking an object and turning it into a string format that can be stored in a file, or trasmitted over and http request to or from a client system.

If you have some experence with javaScript there is the JSON.parse, and JSON.strigify methods that can be used to do the same in a javaScript enviroment. I wrote a [post centered on the javaScript Json parse method](/2020/02/28/js-json-parse/) before hand, and it is a javaScript rather than python related topic so I will not be getting into detail with that here.

<!-- more -->

## 1 - Some basic examples of the json library

There are two main methods of interest when it comes to using the json librray which are the dumps method that can be used to convert an object to a JSON string and the loads method that can convert such a string back into an object that can then be used with some code. In this section I will then just be going over a few basic examples of these two kinds of methods just for the sake of getting a feel for how to go about using them in a very hello world kind of way.

### 1.1 - The json dump method

The dumps method on the json librray would seem to be the python equavalent of the JSON.stringify method. If I give the method a python object such as a list of a dictionary it will convert that to a JSON form. As I would exspect lists are treated as javaScript arrays, and dictionaries are treated as plain javaScript Objects.

```python
import json
t=json.dumps(['foo', {'bar': 42}])
print(t)
# ["foo", {"bar": 42}]
```

### 1.2 - The loads method

When it comes to parsing or loading a JSON string into an object there is the loads method. All I have to do is just pass the json string to the loads method as the first argument and the method will return an object that I can then use with some python code.

```python
import json
s="[\"foo\", {\"bar\": 42}]"
t=json.loads(s)
print(t)
```

## 2 - Conclusion

The JSON format is a standard format for data seraliztion that is used in web development. I also often find myself using it as a way to store data also, but there are many other formats that might be a better option when it comes to some kinds of applactions. One drawback about JSON is that it does not support comments, so it is not the best option when it comes to a config file format.

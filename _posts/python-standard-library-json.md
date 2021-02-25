---
title: The JSON standard library in Python
date: 2021-02-25 14:35:00
tags: [python]
categories: python
layout: post
id: 811
updated: 2021-02-25 15:26:24
version: 1.3
---

I have wrote a few posts on standard libries in python thus far, I do not think I will write posts on all of them, however I still tink I should write a post for each of them that I might actually use in projects. One such librray might very well be the JSON standard library.

The JSON standard library is the standard library to use when it comes to creating a JSON string from a source object, and to parse a JSON string into workable objects. 

If you have some experence with javaScript there is the JSON.parse, and JSON.strigify methods that can be used to do the same in a javaScript enviroment. I wrote a [post centered on the javaScript Json parse method](/2020/02/28/js-json-parse/) before hand, and it is a javaScript rather than python related topic so I will not be getting into detail with that here.

<!-- more -->

## 1 - Some basic examples of the json library

### 1.1 - The json dump method

The dumps method on the json librray would seem to be the python equavalent of the JSON.stringify method.

```python
import json
t=json.dumps(['foo', {'bar': 42}])
print(t)
# ["foo", {"bar": 42}]
```
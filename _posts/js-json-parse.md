---
title: JSON parse method in javaScript
date: 2020-02-28 10:34:00
tags: [js,JSON]
layout: post
categories: js
id: 619
updated: 2020-02-28 12:05:52
version: 1.5
---

This will be a quick post on the [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method which is a native javaScript built in way to parse a JSON string into a workable object at least on all modern platforms anyway. The use of the method is fairly straight forward just call the method off of the json object and pass a json string to parse into an object, the returned object is then the workable object from that json string. There are still a few additional things a javaScript developer should be ware of such as browser support, what happens when an invalid string is passed, and some additional related methods and features.

<!-- more -->

## 1 - json parse basics

For starters in this section I will be going over the basics of the json pare method. This will include just using the method on a simple string of json, error handling, and the reviver method argument.

### 1.1 - basic json parse example

The JSON parse method can be used to parse a json string into a workable object by just passing the json string as the first argument. The workable object will then be returned by the method, assuming that nothing goes wrong, which can then be stored in a variable.

```js
var str = "{\"x\":42,\"y\": 15}";
var obj = JSON.parse(str);
console.log(obj.x, obj.y); // 42 15
```

### 1.2 - Errors and try catch

In certain projects where the json parse is being used to parse from a source that possible give invalid json it is possible for an error to happen. So it is often generally a good idea o use the json parse method in a try catch statement, and then have a way to handle such errors.

```js
var str = "{f7--!", // not valid json
obj;
try {
    obj = JSON.parse(str);
} catch (e) {
    obj = {
        x: 0,
        y: 0
    };
}
console.log(obj.x, obj.y); // 0 0
```

### 1.3 - The json parse reviver method argument

A reviver method can be given as a second argument to the json parse method after giving the string to parse. this method will have a key and value argument, and the returned value will become the new value in the resulting object returned by json parse. 

```js
var str = '[1,2,3,4,\"a\"]',
obj;
var revive = function (key, val) {
    if (typeof val === 'number') {
        return Math.pow(2, val);
    }
    return val;
};
try {
    obj = JSON.parse(str, revive);
} catch (e) {
    obj = [];
}
 
console.log(obj);
// [ 2, 4, 8, 16, 'a' ]
```
---
title: JSON parse method in javaScript
date: 2020-02-28 10:34:00
tags: [js,JSON]
layout: post
categories: js
id: 619
updated: 2020-10-29 12:42:07
version: 1.15
---

This will be a general post on the [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method. The JSON.parse method is a native javaScript built in way to parse a JSON string into a workable object, at least on all modern platforms that support this method. The JSON parse method is a is then an inversion of the [JSON stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method is for turning a workable object into a JSON string.

If you are new to javaScript a [JSON string is a data interchange format](https://en.wikipedia.org/wiki/JSON) that is often the default solution for such a thing in a javaScript environment. However the standard is not used with javaScript alone, the format is often used in many other programing languages because of its close relationship to the web. There are of course other options when it comes to data interchange, or data serialization, but getting into that would be off topic.

The use of the method is fairly straight forward just call the method off of the JSON object and pass a JSON string to parse into an object, the returned object is then the workable object from that json string. The JSON.stringify method works in a similar way, only the first argument passed should be the object that I want to convert into a JSON string.

There are still a few additional things a javaScript developer should be ware of such as browser support, what happens when an invalid string is passed, and some additional related methods and features. So in this post I will be touching base on some additional things to work with when using JSON parse such as the [try catch](/2019/03/02/js-javascript-try/) statement. So in this post I will be going over they very basics, but also any additional things to look out for when working with JSON.parse, and JSON in general.

<!-- more -->

## 1 - json parse basics

For starters in this section I will be going over the basics of the JSON.parse method. This will include just using the method on a simple string of JSON, error handling. In addition there is also the reviver method argument that is a way to go about setting a function that can be used to set values for the final object that is returned. This can sometimes lead to more complex examples of the JSON.parse method, but I will still be going over a quick simple example of it here.

### 1.1 - basic json parse example

The JSON parse method can be used to parse a JSON string into a workable object by just passing the JSON string as the first argument. The workable object will then be returned by the method, assuming that nothing goes wrong, which can then be stored in a variable.

```js
var str = "{\"x\":42,\"y\": 15}";
var obj = JSON.parse(str);
console.log(obj.x, obj.y); // 42 15
```

Here I am using a STring literal that just happens to be valid JSON, but in a real example this JSON string would be obtained by reading a file, or receiving a HTTP request body that that is a JSON string. The JSON parse method is just simply a way to convert this kind of string to an object.

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

A reviver method can be given as a second argument to the json parse method after giving the string to parse. This method will have a key and value argument, and the returned value will become the new value in the resulting object returned by json parse. 

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

the use of this method might come in handy if the JSON code has a bunch of values that need to be used to create new instances of a class or something to that effect.

## 2 - Basic nodejs example

So now that I have the basics out of the way it is now time to work out a simple text program that makes use of the JSON.parse method. There is working otu a client side javaScript example, however in this section I will be going over a quick, basic nodejs example.

```js
let fs = require('fs'),
promisify = require('util').promisify,
os = require('os'),
path = require('path'),
read = promisify(fs.readFile),
write = promisify(fs.writeFile),
 
fileName = '.node-json-example.json',
filePath = path.join(os.homedir(), fileName);
 
read(filePath)
.then((data) => {
    let obj = JSON.parse(data);
    return Promise.resolve(obj);
})
.catch((e) => {
    if (e.code === 'ENOENT') {
        return Promise.resolve({
            count: 0
        });
    }
    return Promise.reject(e);
})
.then((obj) => {
    obj.count += 1;
    console.log('count: ' + obj.count);
    return write(filePath, JSON.stringify(obj));
})
.then(() => {
    console.log('updated json file at: ' + filePath);
})
.catch((e) => {
    console.warn(e);
    console.log(e.code);
});
```

## 3 - Conclusion

So that is it for now when it comes to the JSON parse method. There is way more to write about when it comes to the use of the JSON parse method when it comes to some real code examples maybe. There is also of course the JSON.stringify method that is also worth mentioning when it comes to converting a workable object to a JSNON string for example.

If I get some time to come around to updating this post again I might add some additional examples of both parsing and stringify objects with JSON. That may or may not happen as I have some many other posts, and projects that are more deserving of my attention.
---
title: javaScript try
date: 2019-03-02 11:44:00
tags: [js]
layout: post
categories: js
id: 394
updated: 2019-03-02 11:59:06
version: 1.3
---

The try catch statement in javaScript is one way to go about preforming error handling when developing a javaScript project. The try catch statement is not just a one stop solution for all Error handling tasks when it comes to working with Errors in javaScript, but is certainly one aspect of doing so along with error objects in certain callbacks, and when working with promises as well. In this post I will be outlining some things to know about when working with the try catch.

<!-- more -->

## 1 - javaScript try basic example

For a basic example of a try catch block I have a sting that represents an invalid JSON string. When I attempt to try to parse the JSON string into a workable object this results in an Error.

```js
var str = '{\"n\":\"27\"',
obj = {
    n: 42
};
 
try {
    obj = JSON.parse(str);
} catch (e) {
    console.log(e.message); // Unexpected end of JSON input
}
console.log(obj.n); // 42
```

Instead of the script failing completely a try catch statement can be used to define what to do in the event of an error such as this. The flow of the script will then continue instead of coming to a griding halt.

## 2 - 

```js
try {
    try {
        throw new Error('My custom Error');
    }
    finally {
        console.log('finally');
    }
} catch (e) {
    console.log(e.message);
}
// 'finally'
// 'My custom Error'
```

## 3 - 

```js
var valJSON = function (str) {
    try {
        JSON.parse(str);
        return 'foo';
    } catch (e) {
        return 'bar'; // Unexpected end of JSON input
    }
    finally {
        return 'baz';
    }
};
 
console.log(valJSON('{\"n\":\"foo\"')); // 'baz'
```
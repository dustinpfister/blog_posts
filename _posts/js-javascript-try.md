---
title: javaScript try
date: 2019-03-02 11:44:00
tags: [js]
layout: post
categories: js
id: 394
updated: 2019-03-02 12:11:48
version: 1.7
---

The [try catch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) in javaScript is one way to go about preforming error handling when developing a javaScript project. The try catch statement is not just a one stop solution for all Error handling tasks when it comes to working with Errors in javaScript, but is certainly one aspect of doing so along with error objects in certain callbacks, and when working with promises as well. In this post I will be outlining some things to know about when working with the try catch.

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

## 2 - The Deal with finally

The finally statement is a little weird as on the surface it seems unnecessary. It is a block where they code that is defined in it will always execute regardless if an Error fires or not. As such why not just define some javaScript after a try catch block, sense that will always run as well? Well there are some things that come to mind where the finally statement might actually need to be used possible in this section I will be covering this topic in detail.

### 2.1 - A try statement can be followed with just a finally statement and without a catch.

A try catch statement must be followed by a catch or finally statement or else it will result in an Error.

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

### 2.2 - Using return with a try catch

When using the return keyword in the body of a try catch block, any return statement used in the finally block will supersede any additional return statements that may exist in the try, or catch blocks. 

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
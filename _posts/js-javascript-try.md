---
title: javaScript try
date: 2019-03-02 11:44:00
tags: [js]
layout: post
categories: js
id: 394
updated: 2020-06-21 09:36:41
version: 1.12
---

The [try catch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) in javaScript is one way to go about preforming error handling when developing some javaScript code. The try catch statement is not just a one stop solution for all Error handling tasks when it comes to working with Errors in javaScript, but is certainly one aspect of doing so along with error objects in certain callbacks, and when working with catch function calls with promises just to mention a few basic things about error handling. So then with that said in this post I will be outlining some things to know about when working with the try catch statement, as well as any additional things that might come to mind.

<!-- more -->

## 1 - javaScript try basic example

For a basic example of a try catch block I have a sting that represents an invalid JSON string. In a real example this json might be pulled from a file that might end up being malformed for one reason or another, but foe the sake of this simple example it is just a string literal. So then because the JSON is in fact invalid, when I attempt to try to parse the JSON string in the try block of the try catch statement into a workable object, this results in an Error as expected. Inside the body of the catch block I have it so I just log the resulting error message that is a property of the error object.

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

Although I am just logging the message to the console, in a real project I would of course want to do something more than just that. Say I am working on a project where I need to load a json file or some other kind of file that serves as a config file of sorts. I would want to not just log and error message to the console, I might want to do something more such as look at another file system location for a backup file of sorts or revert to using some hard coded settings on top of finding some way to alert the user to what is going on.

## 2 - The Deal with finally

The finally statement is a little weird as on the surface it seems unnecessary. It is a block where the code that is defined in it will always execute regardless if an Error fires or not. As such why not just define some javaScript after a try catch block, sense that will always run as well? Well maybe there are some things that come up where the finally statement might actually need to be used possibly, so in this section I will be covering this topic in detail.

### 2.1 - A try statement can be followed with just a finally statement and without a catch.

A try catch statement must be followed by a catch or finally statement or else it will result in an Error. So it is possible to define a try statement without a catch but just a finally and that will work as one might expect.

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

I can not say I ever get into situations in which I need to define a javaScript try statement this way, but it is one of those weird things about javaScript that can be done and it works without issue.

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

## 3 - Catch id or error object and throw statement

The catch block of a try catch statement will have a reference to the error object or catch id of the error that occurred in the try block. This can be used to set custom error handling conditions for specific errors.

```js
var checkValue = function (n) {
    try {
        if (typeof n != 'number') {
            throw new Error('notNumber');
        }
        if (n < 0 || n > 100) {
            throw new Error('outOfRange')
        }
        if (n.toString() === 'NaN') {
            throw new Error('NaN')
        }
        return n;
    } catch (e) {
        if (e.message === 'outOfRange') {
            return n < 0 ? 0 : 100;
        }
        return 0;
    }
};
 
console.log(checkValue(42)); // 42
console.log(checkValue(320)); // 100
console.log(checkValue(-5)); // 0
console.log(checkValue(NaN)); // 0
console.log(checkValue('foo')); // 0
```
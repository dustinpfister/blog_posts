---
title: javaScript try
date: 2019-03-02 11:44:00
tags: [js]
layout: post
categories: js
id: 394
updated: 2020-10-13 13:25:02
version: 1.20
---

The [try catch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) in javaScript is one way to go about preforming error handling when developing some javaScript code. The use of a try catch involves placing one or more statements of javaScript code in a try block that might cause an Error in some situations, in the event that an error does happen some additional javaScript in a catch block will be called and an error object will be present in this block to help with the process of handling the error.

The try catch statement is not a one stop solution for all Error handling tasks when it comes to working with Errors in javaScript, but is certainly one aspect of doing so along with other options. Other things to be aware of are error objects in certain callback functions that need to be handled differently typical with if statements, or conversion ro promises. Speaking of promises another thing about error handling is when working with catch function calls with promise chains which is yet another kinds of Error handling. Still the javaScript try catch statement is a good starting point when it comes to this topic. 

So then with that said in this post I will be outlining some things to know about when working with the try catch statement, as well as any additional things that might come to mind thar relate to try catch, and error handling in javaScript.

<!-- more -->

## 1 - javaScript try basic example

For a basic example of a try catch block I have a sting that represents an invalid JSON string that should do nicely for a basic example. In a real example this JSON might be pulled from a file that might end up being malformed for one reason or another, but for the sake of this simple example it is just a string literal. 

So then because the JSON is in fact invalid, when I attempt to try to parse the JSON string in the try block of the try catch statement into a workable object, this results in an Error as expected. Inside the body of the catch block I have it so I just log the resulting error message that is a property of the error object.

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

Instead of the script failing completely a try catch statement can be used to define what to do in the event of an error such as this. In many situations there is more than one kind of Error that can happen, and code can be placed in the catch block for all possible errors that can happen. The flow of the script will then continue instead of coming to a griding halt, and any and all action can be taken to address all Errors that can happen.

When it comes to something real say I am working on a project where I need to load a JSON file, or some other kind of file that serves as a config file of sorts for the application. I would want to not just log and error message to the console in the event that invalid JSON is loaded, or if the file is not there. In such a situation I might want to do something more such as look at another file system location for a backup file of sorts, or revert to using some hard coded settings, and write a new file with those settings.

So with that said now that we have the basic idea of try catch out of the way lets look at some more examples.

## 2 - The Deal with finally

The finally block is an optional additional block that can be added at the end of a try catch block, and it can also be used as a substitute for catch.

So many seem to find finality a is a little weird as on the surface it seems unnecessary, until one fines that it can be used with just try by itself. It is a block where the code that is defined in it will always execute regardless if an Error fires or not. As such why not just define some javaScript after a try catch block, sense that will always run as well? Well maybe there are some things that come up where the finally statement might actually need to be used possibly, so in this section I will be covering the topic of finally in the try catch block statement in detail.

### 2.1 - A try statement can be followed with just a finally statement and without a catch.

A try catch statement must be followed by a catch or finally statement or else it will result in an Error when used just by itself. So it is possible to define a try statement without a catch but just a finally, and that will work as one might expect.

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

I can not say I ever get into situations in which I need to define a javaScript try statement this way, but it is one of those weird things about javaScript that can be done, and it works without issue.

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

For example say I have a method that will check a value that is given, and will throw an error if the value is not a Number type at all, is a Number but has a value of NaN, or is a value that is out of a set range. This is a situation in which there is more than one thing that can go wrong, and say that I want to handle the out of range error differently from the others. In such situations a property of the Error Object such as the message, or Error code can be used as a way to preform a different way of resolving the Error.

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

In addition to being able to make use of Properties in an Error object there is also of course throwing custom user defined Errors. This allows be to define what the message is, so of course I can then use that message as a way to create custom ways of going about defining what to do for these custom Errors. If the Errors objects that I am dealing with are not user defined, then it is just a matter of knowing what Errors I am dealing with and what properties values there are that can happen. With that I can do the same thing as I did in this example.

## 4 - Conclusion

So the basics of try catch statements are not so hard to get up to speed with. The typical use case situation is that you do something that might case an error in the try block, and then use the catch block to do what needs to happen in the event of an error. There is just the question if there is any weird situations about try catch that might come up now and then, and as I become aware of more things about that I will of course expand this post as needed.

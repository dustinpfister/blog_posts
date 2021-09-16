---
title: The javaScript try statement and other Error handing related topics
date: 2019-03-02 11:44:00
tags: [js]
layout: post
categories: js
id: 394
updated: 2021-09-16 13:55:55
version: 1.40
---

The [try catch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) in javaScript is one way to go about preforming [error handling](https://rollbar.com/guides/javascript-exception-handling/) when developing some javaScript code. The use of a try catch involves placing one or more statements of javaScript code in a try block that might cause an Error in some situations. In the event that an error does happen some additional javaScript in a catch block that follows the try block will be called, and an error object will be present in this catch block to help with the process of handling the error.

The try catch statement is not a one stop solution for all Error handling tasks when it comes to working with Errors in javaScript, but is certainly one aspect of doing so along with other aspects of this sort of thing. Other things to be aware of are error objects in certain callback functions that need to be handled differently typically with if statements. When it comes to promises another thing about error handling is when working with catch function calls with promise chains which is yet another kinds of Error handling. Still the javaScript try catch statement is a good starting point when it comes to this topic. 

So then with that said in this post I will be outlining some things to know about when working with the try catch statement, as well as any additional things that might come to mind that relate to try catch, and error handling in javaScript.

<!-- more -->

## - Try catch and What to know first

This is a post on one keyword of interest in the javaScript programing language that is the try keyword, as well as the additional catch and finally keywords. These keywords can be used together to form something called a try catch block that is one of many ways to help address various kind of errors that might happen when running a little javScript code. So then this is a bit more of an advanced topic for someone that might still be a little new to javaScript, but it is still something that one will need to learn a thing or two about sooner or later, and many of the examples here are fairly simple. Still I assume you have at least some background when it comes to the vary basics of [getting started with both client side javaScript and server side javaScript with nodejs](/2018/11/27/js-getting-started/).

### - The source code examples here are up on my gihub account

This post is just one of many posts on the various source code examples that I have in my test vjs repository that I continue to work on a little more every now and then. With that said the [source code examples that I am writing about here](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-try) can be found in the repository.

## 1 - The javaScript try basic example

For a basic example of a try catch block I have a sting that represents an invalid [JSON string](/2020/02/28/js-json-parse/) that should do nicely for a basic example. In a real example this JSON might be pulled from a file that might end up being malformed for one reason or another, but for the sake of this simple example it is just a string literal. 

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

When using the [return keyword](/2019/03/01/) in the body of a try catch block, any return statement used in the finally block will supersede any additional return statements that may exist in the try, or catch blocks. This might not always be what one might expect, but it just seems to be the way that things work out.

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

For example say I have a method that will check a value that is given, and will throw an error, using the [throw keyword](/2019/03/15/js-javascript-throw/) if the value is not a Number type at all, is a Number but has a [value of NaN](/2017/09/23/js-nan/), or is a value that is out of a set range. This is a situation in which there is more than one thing that can go wrong, and say that I want to handle the out of range error differently from the others. In such situations a property of the Error Object such as the message, or Error code can be used as a way to preform a different way of resolving the Error.

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

## 4 - Promises and error handling with try catch as well as other features.

In this section I will be going over the topic of using Promises and the try catch statement. When doing this there are a number of other things to be aware of when it comes to handing errors. For example there is using Promise prototype methods such as the Promise.reject method to reject something and continue the flow to the next catch method call in the Promise chain. 

There is also not just logging the result of an error when making a project there is taking the time to do something more when it comes to actually handing the error and preforming some kind of action that might help to address the situation. For example say that the reason why an error has happen is because a configuration files was not found, one way to address that would be to write a new one with hard coded settings and then try again.

### 4.1 - A read-json node script example

So then here I have a simple nodejs script that will try to read a json file that may or may not be there. By default the script will look for a json file called conf.json at the same folder as that of the script. However I can set a different file location by making use of the first and only [positional argument by way of the process object](/2018/02/11/nodejs-process/) for this script.

This script then makes use of the [promisify method of the nodejs built in util module](/2019/06/22/nodejs-util-promisify/) to make sure that the read file, file system method will return a promise. I then call the resulting read file method to read the json file at the given location that might be a location in which the file might not be there. In the event that json file is not there, the next catch function call will fire rather than a then function call. In the body of a catch function call I am then looking at the code and name properties of the error object in the catch call. For this script I am just logging different messages, however in a slightly more advanced revision of this script I could do something more for specific conditions.

```js
const fs = require('fs'),
path = require('path'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);
 
let uri_json = process.argv[2] || path.join(__dirname, 'conf.json');
 
readFile(uri_json, 'utf8')
.then((JSON_text) => {
    try {
        return JSON.parse(JSON_text);
    } catch (e) {
        return Promise.reject(e);
    }
})
.then((obj) => {
    console.log('JSON FIle parsed successfully');
    console.log(obj);
})
.catch((e) => {
 
    // what to do if the file is not found
    if (e.code === 'ENOENT') {
        console.log('The JSON file at ' + uri_json + ' was not found');
    }
 
    if(e.name === 'SyntaxError') {
        console.log('looks like we have a syntax error');
        console.log('a good reason for this is that the JSON file is no good');
    }
 
});
```

```
{
    "n": 42
}
```

```
{
    // comments are not supported in JSON sorry
    "n": 42
}
```

## 5 - Conclusion

So the basics of try catch statements are not so hard to get up to speed with. The typical use case situation is that you do something that might case an error in the try block, and then use the catch block to do what needs to happen in the event of an error. There is just the question if there is any weird situations about try catch that might come up now and then, and as I become aware of more things about that I will of course expand this post as needed.

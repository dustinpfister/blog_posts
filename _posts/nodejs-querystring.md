---
title: The node.js query string module.
date: 2018-02-03 21:43:00
tags: [js,node.js]
layout: post
categories: node.js
id: 143
updated: 2018-02-05 11:46:08
version: 1.1
---

When making a [node.js](https://nodejs.org/en/) project there might come a need to do something involving working with a [query string](https://en.wikipedia.org/wiki/Query_string), that is the parameters that are defined in a url using question marks, equal sign, and ampersands. It is a standard way of communicating some parameters to a server by way of a url, rather than some other means such as a post request payload.

<!-- more -->

I could work out some javaScript to help with parsing a query string to an object, and vice versa, but why bother with that when there is a built in module in node.js to do this called the [querystring module](https://nodejs.org/api/querystring.html).

## Basic example of query string parse method.

The main method of interest is the parse method, this is what can be used to quickly parse a url parameter query string into a javaScript object that can be worked with in a project. To use it just grab a reference to what is exported using require, and give the string to parse to the parse method.

```js
let qs = require('querystring'),
 
str = 'foo=bar&answer=42';
 
console.log(qs.parse(str));
// { foo: 'bar', answer: '42' }
```

## Make sure the question mark is not in the string.

With query strings the question mark is used to denote that the path of a resource has ended, and a query string has started. When passing a query string to the parse method, the question mark should be omitted, or else it will be the first character of the key of the first value in the query string.

So something needs to be done to make sure that does not happen, as it seems that the parse method will not do any of that kind of sanitation for you.

```js
str = '?whoops=mybad&sorry=true';
console.log(qs.parse(str));
// { '?whoops': 'mybad', sorry: 'true' }
 
str = '?whoops=nope&sorry=false';
str = str[0] === '?' ? str.substr(1,str.length) : str;
 
console.log(qs.parse(str));
// { whoops: 'nope', sorry: 'false' }
```

## When working with a full url the query string needs to be extracted.

A quick and simple way to do it is to just use String.split.

```js
let url = 'http://www.foo.com/bar/answer.html?a=42&t=1000';
 
str = url.split('?')[1];
 
console.log(qs.parse(str));
// { a: '42', t: '1000' }
```

## Making a simple method to work with most situations

You might feel compelled to make a method to help assure that most typically query string scenarios are handled in a way that will always result in a clean, and sane object of key value pares. Making something that will work for most typical scenarios is not to hard.

```js
let parseQS = function (str) {
 
    // if not a string return an empty object
    if (typeof str != 'string') {
 
        return {};
 
    }
 
    // if there is a question mark,
    // split the string, and use the
    // second part
    if (str.indexOf('?') != -1) {
 
        str = str.split('?')[1];
 
    }
 
    // there should be at least one
    // equal sign, if so parse
    if (str.indexOf('=') != -1) {
 
        // parse the string with the usual delimiters,
        // and set a value for max keys 
        return qs.parse(str,'&','=',{maxKeys:3});
 
    }
 
    // default to returning an empty object if we make it here
    return {};
 
};
 
// any non string should given an empty object
console.log(parseQS(42)); // {}
console.log(parseQS(null)); // {}
 
// if no questing mark, but there is an equal sign it should parse
console.log(parseQS('foo=bar&answer=42'));
// { foo: 'bar', anwser: '42' }
 
// but it can handle it just fine if it is there
console.log(parseQS('?whoops=nope&sorry=false'));
// { whoops: 'nope', sorry: 'false' }
 
// works when given full url examples
console.log(parseQS('http://www.foo.com/bar/answer.html?a=42&t=1000'));
//{ a: '42', t: '1000' }
console.log(parseQS('http://www.foo.com/bar/answer.html'));
// {}
 
// max for keys set
console.log(parseQS('a=1&b=2&c=3&d=4'));
// { a: '1', b: '2', c: '3' }
```

## A word a security

Like that of post requests a query string can be the result of your own client system, put the client system can also be bypassed. In other words a query string is a potential entry point with respect to a certain type of hacking. I have not taken the time to work out an actual example, but for now I will just say that it is important to be aware of how the object that is parsed from the query string is being used.


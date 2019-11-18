---
title: Turning a node.js method into a promise with pify
date: 2018-02-27 18:36:00
tags: [js,node.js]
layout: post
categories: node.js
id: 159
updated: 2019-11-18 10:19:21
version: 1.5
---

When making a node.js project, many methods in the node.js core work by giving a callback that will return an error, or what it is that you want from the method. This is a callback style method that can result in the so called callback hell when it comes to doing anything where many of these kinds of calls need to be nested.

In late versions of nodejs many core modules now return a promise as an alternative to this cllback style way of doing things. Also there is the [promisify method in the util module](/2019/06/22/nodejs-util-promisify/) that I often use as a way to promsify these built in methods. That solution will also work on most older versions of nodejs, at least all the one that are still supported anyway.

Another option would be to just make a quick method where I am returning a new instance of a promise constructor when it comes to any version of node that supports Promises, or failing that, by using a user space module like bluebird to add promises. However this is a post on the npm package [pify](https://www.npmjs.com/package/pify), one of many project created and maintained by [sindresorhus](https://github.com/sindresorhus), it is a nice little project that can help to make quick work of this also so lets look at some quick examples.

<!-- more -->

## 1 - Basic example of pify

So normally most node.js methods are used by giving one or more arguments ending with a callback. That callback will then give an error object, or null value as the first argument, and then a result of some kind as the second argument when there is something to that effect.

In other words something like this:

```js
let fs = require('fs');
 
fs.readFile('readme.md', function (e, text) {
 
    // something went wrong
    if (e) {
 
        console.log(e);
 
    } else {
 
        // the contents of the readme
        console.log(text.toString());
 
    }
 
});
```

This can work okay, but can lead to what is called call back hell when making a complex project. Promises can help to keep things neater by having a long chain of calls for promises and then calling the then method off the resolve promise object.
This is where pify can be used as a way to make it so that a promise is what is returned rather than having to use the callback style way of doing things. Just require in pify, then call the method that it exports passing the function that I want to promisify. I can then call the method that returns which returns a promise, at which point I can then use then and catch just like with any other promise.


```js
let pify = require('pify'),
fs = require('fs');
 
pify(fs.readFile)('readme.md').then(function (text) {
 
    // the contents of the readme
    console.log(text.toString());
 
}).catch (function (e) {
 
    // something went wrong
    console.log(e);
 
});
```

## 2 - Conclusion

So pify is not the inly way to go about doing this when it comes to making a project that will work nice with older versions of node, and the use of user space projects that do not return promises. As I have mentioned there is a built in method in the util module of nodejs that can also be used to do this. In addition other projects like fs-extra return promise for all file system methods' Also when it comes to late versions of node there is no need to bother with any of these any more assuming that you do not care abut supporting older versions of node at all.
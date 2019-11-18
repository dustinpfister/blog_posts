---
title: Node promise basics and beyond
date: 2019-11-18 12:13:00
tags: [node.js]
layout: post
categories: node.js
id: 565
updated: 2019-11-18 12:48:18
version: 1.8
---

Looking back I have wrote a few posts on promises in nodejs, and a few when it comes to using them in javaScript in general. However I have not yet wrote a main post on node promise topics in general. From just starting out with the Promise constructor, and the using the promisify utility method to convert old callback style methods to methods that return promises.

It would also be nice to have one post where I go beyond just the basics of promises, and give some real solid examples that outline why they are great for handing a whole bunch of async tasks.

<!-- more -->

## 1 - Node promise basics

So in the section I will start out with the basics surrounding node promise topics. Starting out with just a simple example of an old callback style use example of the read file file system module method. I will then give two examples that do the same thing with promises. One of which will use the Promise Constructor, and the other will use the promisify method of the util method to quickly create a method that returns a promise for the read file file system module.

This section serves as the getting start point of promises in nodejs, if you have some experience with promises all ready and want to go beyond the basics of them in node, then you should maybe skip over this section.

### 1.1 - The old node callback style way

So here I have an example of the old callback style way of using a method that accepts a callback method that will fire when the task is finished. That is I call the method, give it some arguments, and one of the arguments is a function that will fire when the task is done. Within this callback method I then do what it is that I want to do with the result of that task, or handle and error that might happen.

So this example is an example of the read file file system method in the file system module of node. I call the method pass the path to the file that I want to read as the first argument, followed by an option encoding, or options object, and finally pass a callback that will fire when the file is read, or an error happens.

```js
let fs = require('fs');
 
fs.readFile('./README.md', 'utf8', function (e, data) {
    if (e) {
        // error message if there is a problem
        console.log(e.message);
    } else {
        // the content of the file if it is there
        // and all id well
        console.log(data.toString());
    }
});
```

The problem here is that I have to do both error handing, and what it is that I do if all goes well in the body of the same function. However this also causes things to get yet even more messy when I need to do several tasks like this on top of each other. When doing so this results in what is often called callback hell.

So promises then are a way to go about breaking down what to do into septate functions that are called in the event of an error, and if all goes well. In addition things can be chained together, resulting in code that is easier to follow and debug. So lets look as some more examples that do the same thing only this time with node promises.

### 1.2 - The Node Promise native constructor

So one way to get started with promises in node is to create one with the promise constructor. As long as you are using a recent version of node the promise constructor should be there, all I have to do is just call it with the new keyword just like any other constructor, and pass it a function where I will define what needs to get done for the promise.

The function that I pass to the constructor will have two arguments a resolve and reject argument. These arguments are functions that are to be called when the task that needs to happen is done. The resolve argument is to be called if all has gone well, passing the result as an argument when calling it. The reject method in turn is the argument to call if there is a problem, passing an error object as an argument.

```js
let fs = require('fs');
 
let readFile = (filePath, encoding, flag) => {
    encoding = encoding || 'utf8';
    flag = flag || 'r';
    if (!filePath) {
        return Promise.reject(new Error('file path not given to readFile method.'))
    }
    // return a new Promise created with the
    // promise constructor
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {
            encoding: encoding,
            flag: flag
        }, function (e, data) {
            if (e) {
                reject(e);
            } else {
                resolve(data);
            }
        });
    });
};
 
readFile('./README.md')
.then((data) => {
    // the content of the file if it is there
    // and all id well
    console.log(data.toString());
})
.catch((e) => {
    // error message if there is a problem
    console.log(e.message);
});

```

So then this example works more or less the same way as the first example that just used callbacks. So far it would seem that I just made something that could be very simple far more complex. That is the case hear actually, there is a far more simple way to go about doing this.

In late versions of node you do not need to bother making a readFile method like this, as the native read file method returns a promise to begin with. Using the Promise constructor is not maybe the best option to do something like this, when it comes to supporting older versions of node as well. If I just want to make sure read file will return a promise on all versions of node concerned, it might be better to use a promsify method of one type or another

Still this example is here to serve as an example of using the promise constructor to create a method that returns a promise. In some situations it might make sense to make a method with the promise constructor if the aim is to make some kind of custom method where the use of the constructor is really called for.

Any way lets look at some more examples of promises in nodejs.

### 1.3 - THe Util module and the promisify method

So then thee is the promsify method of the node core util module. I use this method all the time as a node built in way to convert an old callback style method into a method that will return a promise.

```js
let fs = require('fs'),
promisify = require('util').promisify;
 
let readFile = promisify(fs.readFile);
 
readFile('./README.md')
.then((data) => {
    // the content of the file if it is there
    // and all id well
    console.log(data.toString());
})
.catch((e) => {
    // error message if there is a problem
    console.log(e.message);
});
```
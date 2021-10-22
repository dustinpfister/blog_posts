---
title: JavaScript Promise general overview
date: 2021-10-22 10:45:00
tags: [js]
layout: post
categories: js
id: 934
updated: 2021-10-22 13:12:06
version: 1.19
---

I have not yet got around to writing a post that is a general overview of [Promises in javaScript](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261) just a whole lot of posts on various native methods of the Promise Object as well as various libraries and other native javaScript features surrounding the use of Promises. So then in todays post I will be putting and end to this by writing a post that will serve as a way to tie all of this together.

<!-- more -->


## 1 - JS Promise basics

To start off this post I will be taking a moment to write about some basics of Promises, as well as any and all related topics that might come up in the process of doing so. There is of course having at least some background when it comes to [getting started with javaScript itself in general](/2018/11/27/js-getting-started/), as well as all kinds of various other topics that you should know before hand. As such I will not be getting into all the various little details that you show know before reading this, however I will be trying my best to keep things fairly simple in the basic getting started type section as always.

### The source code examples in this post can be found on Github

If you are wondering if the source code examples in this post are stored somewhere on Github you would be right, [they are in my test vjs Github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-promise). In that repository I also have [all the source code examples for all my other posts on vanilla javaScript.](/categories/js/)

### 1.1 - Simple promise example using the Promise Constructor

For this basic getting started example with promises I am using the [Promise Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise) with the new keyword as a way to create a new promise object to which I can call then and catch methods off of. When calling the constructor I pass a function as the first argument and it is in the body of the function where I will define the conditions that will result in the promise object resolving or rejecting. In the event that the function resolves the next then function will be called, in the event that the promise rejects it will then be the next catch function that will be called.

```js
// method that returns a promise using the Promise constructor
let hw = (mess) => {
    return new Promise((resolve, reject) => {
        if(typeof mess === 'string' || typeof mess === 'number'){
            resolve('Hello World ' + mess);
        }else{
            let e = new Error('ENASON: mess value is not a string or number.');
            e.code = 'ENASON';
            reject(e);
        }
    })
};
// if all goes well the next then in the chain is called
hw('this is foo')
.then(function(mess){
   console.log(mess);
});
// if an error happens the next catch in the chain is called.
hw()
.catch(function(e){
   console.warn(e.code, e.message);
});
```

### 1.2 - Simple example of a callback function

```js
// very basic callback example using setTimeout
console.log('one moment');
setTimeout(function(){
    console.log('delayed');
}, 3000);
```

### 1.3 - Simple example of making a Promise with something that uses a callback

```js
// very basic callback example using setTimeout
console.log('one moment');
new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('delayed');
    }, 3000);
})
.then(function(mess){
    console.log(mess);
});
```

### 1.4 - A nodejs example of the Promise Constructor

Here I have an example of using the [Promise constructor in nodejs](/2019/11/18/nodejs-promise/) with the file system module.

```js
// requiring in the file system module
let fs = require('fs');
// usning the Promise constructor as a way to create a promise
new Promise((resolve, reject) => {
    let uri = process.argv[2];
    // reject if not URI to a file is given
    if(!uri){
        reject(new Error('ENOURI: no path to file given as first positonal argument.'));
    }else{
        // if we have a given uri try to read it
        fs.readFile(uri, 'utf8', (e, data) => {
            // if we have an error reject passing that error object
            if(e){
                reject(e);
            }else{
                // else resolve with what should be the data of the file
                resolve(data);
            }
        });
    }
})
// then if all goes well
.then((data)=>{
    console.log(data);
})
// if any error happens we will end up here
// and the above then call will not fire
.catch((e) => {
    console.warn(e.message);
});
```

### 1.5 - Simple client side example of a Promise

```html
<html>
  <head>
    <title>javascript promise</title>
  </head>
  <body>
    <div><textarea id="json_in" cols="60" rows="20">{ "foo": 42, "bar": [0, [1, 2], 3] }</textarea><br><br></div>
    <div id="json_out"></div>
    <script>
// parse json helper that returns a promsie
var parseJSON = function(text){
    return new Promise(function(resolve, reject){
        try{
            resolve(JSON.parse(text));
        }catch(e){
            reject(e);
        }
    });
};
// get method that just wraps document.querySelector
var get = function(str){
    return document.querySelector(str);
};
// update method that calls parseJSON method
var update = function(node){
    var out = get('#json_out');
    return parseJSON(node.value)
    .then(function(obj){
        out.innerText = 'top level keys in above VAILD JSON! : ' + Object.keys(obj);
        return Promise.resolve('vaild json');
    })
    .catch(function(e){
        out.innerText = e.message;
        return promise.reject(e);
    });
};
// call update for each key up event for the textarea
get('#json_in').addEventListener('keyup', function(e){
    update(e.target)
    .then(function(){
        console.log('vail json input!');
    })
    .catch(function(){
        console.log('json not vaild');
    });
});
// call update for first time
update(get('#json_in'))
.then(function(){
   console.log('hard coded demo json is good');
});
    </script>
  </body>
</html>
```

## 2 - The nodejs promisify method in the utils module

In nodejs there is the util module, and in this module there is a [util promisify method](/2019/06/22/nodejs-util-promisify/) that can be used as a way to create a method that will return a promise from a method that uses old nodejs style call back functions. On nodejs built in module that is packed with methods that use this kind of callback function would be the [nodejs file system module](/2018/02/08/nodejs-filesystem/).

### 2.1 - Basic util promisify example

To get started with this promisify method there is creating a quick simple script that will just read a file and spit put the data of the file to the standard output of the console if all goes well using the [read file method](/2020/05/12/nodejs-filesystem-read-file/) of the file system module that has been passed to the promisify method. To making this kind of script I would just need to start by requiring in the file system module, and then the promisify method of the utils module. At that point I can create a read file method by calling the promisify method and passing the read file method of the file system module as the first and only argument for the promisify method. The returned result of doing so is then a read file method that will return a promise when used, at which point I can call that and then start chaining then and catch calls off of the promise object.

```js
// requiring in the file system module
let fs = require('fs'),
promisify = require('util').promisify,
readFile = promisify(fs.readFile);
// read file method should return a promise in node 8+
readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code, ' : ', e.message);
});
```

### 2.2 - Not using promisify, and just using the fs.promises in late nodejs versions


If I do not care at all about supporting old versions of nodejs that do not all ready have native methods that return a promise in the file system module, then there is just doing that. In late versions of nodejs such as 16.x there is now a collection of native methods in the nodejs file system module that will already return a promise. These methods are contained in a promise object of the nodejs file system module.

```js
let fs = require('fs');
 
fs.promises.readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code, ' : ', e.message);
});
```

```
$ node16 
$ node8 
```

### 2.3 - Monkey patching fs.promises

If at some point I want to support old versions of node again the promise object of the file system could be easily monkey patched. The general idea would be to just feature test for the promises object, and then use the util promisify method to create that method if it is not there to begin with. The process of doing monkey patching is generally frowned upon, except for these kinds of situations in which one is just trying to make sure that something that should be there is in fact there.

```js
let fs = require('fs'),
promisify = require('util').promisify;
 
fs.promises = fs.promises || {};
fs.promises.readFile = fs.promises.readFile || promisify(fs.readFile);
 
fs.promises.readFile(process.argv[2], 'utf8')
.then((data)=>{
    console.log(data);
})
.catch((e) => {
    console.warn(e.code || '', ' : ', e.message);
});
```

## 3 - Conclusion

SO then there is a lot to cover when it comes to promises in native javaScript, as well as various methods of interest in nodejs, and client side javaScript. If that was not enough there is a whole would of topics that branch off from promises such as old style callback functions, the event loop, and ways to go about having more than one event loop to work with.



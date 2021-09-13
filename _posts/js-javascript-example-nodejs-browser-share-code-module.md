---
title: Share code between nodejs and the browser with this javaScript module example
date: 2021-04-14 14:45:00
tags: [js]
layout: post
categories: js
id: 845
updated: 2021-09-13 15:03:48
version: 1.19
---

I am continuing to expand my collection of [javaScript example](/2021/04/02/js-javascript-example/) type posts this week, and today I think I will be covering a simple [module design pattern](/2019/03/12/js-javascript-module/) for [sharing code between nodejs and a browser](https://www.geeksforgeeks.org/how-to-share-code-between-node-js-and-the-browser/) environment. There are a number of popular user space projects that make use of this kind of pattern so that a single from of the file will work great in nodejs, or a browser, one great example of this world be the [mark down parser know as marked](/2017/11/19/nodejs-marked/).

One of the cool things about nodejs is that I can use the programing language of the open web to create scripts that will run in my operating system environment. However it would be nice to make modules for nodejs that will also work in a browser environment also without hacking over the code a little first. This sort of thing might not be a good idea for all situations might you, but with something like a parser, or a library that I want to use as part of a game mode that might run in the browser or a node environment this sort of thing can prove to be useful. Thankfully the process of doing so is not so hard, and can be done with just a few basic core javaScript features.

<!-- more -->


## 1 - The module that will work in node and a browser

First off I just need to write a [IIFE](/2020/02/04/js-iife) or Immediately Invoked Function Expression that is a kind of self executing function. The only thing that is special about this IIFE is the value that I will be passing to it in the form of an argument when calling it. The value will be the result of an expression that makes use of the conditional expression to test for the presence of the module global in node. In the event that the module is there then the value of module.exports will be what is passed to the IIFE. In the event that module is not there I will be creating a new property for the value of this, which in client side javaScript at the top level should be the window object.

For this module I will have just a few pure functions that just make use of core javaScript itself which will work nice for this kind of module. When it comes to any kind of function where a client side or server side only feature is used that is where things will end up getting a little complicated. For example if I need to make some kind of module that will make http requests the XMLHttprequest method might be there to work with in client side javaScript, but in nodejs it is not. No worries about hat for now though as this will just be a simple example that has just a few typical methods I use in various projects that stick to using just core javaScript features.

The methods are just properties like the result of Math.PI multiplied by two, a no operation methods, a mathematical modulo method, and a distance formula. The nature of the methods and properties that are the results of expressions are not what is important here though. What is important is that all of this is the result of using just plain old core javaScript by itself, and appending to an object that can be one of two different things depending on the environment in which it is used.

```js
(function (api) {
 
    // PI * 2
    api.pi2 = Math.PI * 2;
 
    // no operation
    api.noop = function () {};
 
    // mathematical modulo
    api.mod = function (x, m) {
        return (x % m + m) % m;
    };
 
    // distance
    api.distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
 
}(  typeof module === 'undefined' ? this['utils'] = {} : module.exports ));
```

So if all works as expected with this I should be able to use these methods in a client side or sever side javaScript environment. To know for sure I would need to work out some quick examples that will make use of this, so lets take a look at a few examples.

### 1.1 - Using the module in a node script

So now to test out if this module works in a node script, to do so I just need to require the script in like always. The way that I typically do this is to require the path module, and then join the value of the dirname global with the path to the utils.js file that I coved above fro the script that is using it. This way I end up with an absolute path to the script, which will always be the location of the utils script regardless of where I call this example with nodejs.

I can then call one of the public methods of the module from the script that makes use of it, for this example I am just testing out that distance formula.

```js
let path = require('path');
utils = require( path.join(__dirname, 'lib/utils.js' ));
 
console.log( Math.floor(utils.distance(0,0,45,45)) ); // 63
```

If I then save the above code as index.js in a folder, and then place the utils.js file that I coved above in the lib folder off of that folder like so I can then call the index.js script in the thermal like this.

```
$ node index.js
63
```

So then the module is working as expected in node, but what about a browser example.

### 1.2 - Using the module in client side javaScript

So now to see if this utils module will still work as expected when using it in a client side javaScript environment. With that said when I open up the following in my browser it seems to work just fine also.

```html
<html>
    <head>
        <title>javaScript example</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="./lib/utils.js"></script>
        <script>
var container = document.querySelector('#app');
container.innerText = utils.distance(37, 20, 10, 0);
        </script>
    </body>
</html>
```

So then this kind of pattern will work for most of the kinds of modules that I make, but not all of them. There is a point where a script that I have in mind is just going to need to be very much node only, and the same can still be said of many of the modules that I make that are very much client side only when it comes to something that has to do a lot with canvas elements for example. Still when it comes to some kind of module that has to do with the creating and mutating of a simple object state, a parser, or something to that effect this kind of module pattern seems to work just fine.

## 2 - A custom user events example of the pattern

I got around to editing my [post on custom events](/2019/07/03/js-custom-event/) and how to make them in a client side javaScript environment when it comes to using the custom event method. While I was at it I thought I should expand the post with an additional example that is a module that makes use of this kind of pattern.

```js
(function (api) {
 
    // add an event for an object
    api.addEvent = function (obj, opt) {
        opt = opt || {};
        // user Event Object
        var userEvent = {};
        // MUST GIVE AN EVENT KEY
        userEvent.eventKey = opt.eventKey;
        // need a forDispatch method that will be called for each dispatch of an event
        userEvent.forDispatch = opt.forDispatch || function (obj, dispatchOpt) {};
        // need an array of listeners
        userEvent.listeners = [];
        // attach to the objects own properties
        obj.ue = obj.ue || {};
        obj.ue[userEvent.eventKey] = userEvent;
        return obj;
    };
 
    // attach a listener for the object that will fire
    // when the event happens
    api.addListener = function (obj, eventKey, callBack) {
        // get listeners for the eventKey
        var listeners = obj.ue[eventKey].listeners;
        // if we have listeners push the callback
        if (listeners) {
            listeners.push(callBack);
        }
        return obj;
    };
 
    // dispatch an event for the given object, passing the event key, and options
    api.dispatch = function (obj, eventKey, dispatchOpt) {
        var eventObj = obj.ue[eventKey];
        // loop listeners array
        eventObj.listeners.forEach(function (cb) {
            // call the listener
            cb.call(eventObj, eventObj.forDispatch.call(eventObj, obj, dispatchOpt));
        });
        return obj;
    };
 
    // this module should work well in nodejs, or client javaScript
}
    (typeof module === 'undefined' ? this['eventMod'] = {}
        : module.exports));
```

## 3 - Conclusion

That is it for this kind of javaScript module pattern, at least as far as this post is concerned at least. There is getting more into the subject of module design in javaScript in general which is in itself a pretty large topic. Working out something like this is just one of many kinds of other patterns that might work out better in some situations.

It is great that if I want to I can go about writing my modules like this, but just because I can do something does not alone mean that it is a good idea. it might still be best to maintain browser and nodejs variants of the same module, but doing something like this works okay too. There are many popular frameworks that follow some kind of pattern like this, and that does not keep me from using them.


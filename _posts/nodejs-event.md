---
title: Node event emitter class
date: 2019-11-21 16:58:00
tags: [node.js]
layout: post
categories: node.js
id: 568
updated: 2019-11-21 17:07:40
version: 1.2
---

This will be a post on the [node event](https://nodejs.org/api/events.html#events_class_eventemitter) emitter class for making custom events in nodejs. It can come in handy now and then to make my own custom events, and attach handers for them, I just need to know where and when to call the emit method in my code when a custom event happens. However maybe it would be best to learn by doing, and to do so it might be best to just jump ahead to the code examples here on the node event emitter class.
This is a nodejs core build in module that is in node itself, so no npm package of any kind needs to be installed to get started with this, you just need node itself.

<!-- more -->

## 1 - Basic node event emitter class example

So for a basic example of the node event emitter class here is an example that just involves stepping an object property, and emitting and overload event when that property reaches a defined max value. 

```js
let Emitter = require('events'),
events = new Emitter();
 
events.on('update', (obj) => {
    console.log(obj.i)
});
 
events.on('overload', (obj) => {
    obj.i %= obj.iMax;
});
 
let obj = {
    i: 0,
    iMax: 10
};
 
let updateObject = function (obj) {
    obj.i += 1;
    if (obj.i > obj.iMax) {
        events.emit('overload', obj);
    }
    events.emit('update', obj);
};
 
setInterval(function () {
    updateObject(obj);
}, 250);
```
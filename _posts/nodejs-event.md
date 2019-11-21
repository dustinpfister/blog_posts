---
title: Node event emitter class
date: 2019-11-21 16:58:00
tags: [node.js]
layout: post
categories: node.js
id: 568
updated: 2019-11-21 17:01:16
version: 1.0
---

This will be a post on the [node event](https://nodejs.org/api/events.html#events_class_eventemitter) emitter class for making custom events in nodejs.

<!-- more -->


## 1 - Basic node event emitter class example

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
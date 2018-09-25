---
title: The _.assign Object method in lodash, and alternatives
date: 2018-09-21 19:51:00
tags: [js,lodash]
layout: post
categories: lodash
id: 285
updated: 2018-09-25 13:26:30
version: 1.2
---

Looking over my content so far I am surprised that I have not yet wrote a post on \_.assign in lodash, as well as the native alternative Object.assign. The \_.assign method is one of many ways to go about combining a bunch of objects into a single object. The process of doing so is a little involved because there is a lot to know about objects and what happens when there are combined together in javaScript. For example objects are copied by reference rather than value, which can result in unexpected behavior if you are new to javaScript and are not aware of that nature. There is also the question of the prototype, and how that should be handled as well. So in todays post I will be covering some use case scenarios of \_.assign, and alternatives such as \_.merge, and the native Object.assign method.

<!-- more -->


## 2 - Basic example of 

```js
var pos = {
    x: 42,
    y: 12
};
 
var deltas = {
    dx: 1.2,
    dy: 0.2
};
 
var methods = {
    step: function () {
        this.x += this.dx;
        this.y += this.dy;
    }
}
 
// assign everything to a new object
var obj = _.assign({}, pos, deltas, methods);
 
obj.step();
 
console.log(obj.x,obj.y); // 43.2,12.2
```

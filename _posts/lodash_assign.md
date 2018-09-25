---
title: The _.assign Object method in lodash, and alternatives
date: 2018-09-21 19:51:00
tags: [js,lodash]
layout: post
categories: lodash
id: 285
updated: 2018-09-25 13:42:42
version: 1.5
---

Looking over my content so far I am surprised that I have not yet wrote a post on \_.assign in lodash, as well as the native alternative Object.assign. The \_.assign method is one of many ways to go about combining a bunch of objects into a single object. The process of doing so is a little involved because there is a lot to know about objects and what happens when there are combined together in javaScript. For example objects are copied by reference rather than value, which can result in unexpected behavior if you are new to javaScript and are not aware of that nature. There is also the question of the prototype, and how that should be handled as well. So in todays post I will be covering some use case scenarios of \_.assign, and alternatives such as \_.merge, and the native Object.assign method.

<!-- more -->

## 1 - what to know

This is a post on the lodash object method \_.assign, as well as the native javaScript Object.assign method as well. This is not a getting started post on lodash, or javaScrtipt and I expect that you have at least some background with these topics.

## 2 - Basic example of assign

So for a basic example of the assign method I will start out with a bunch of objects that contain properties, and methods that I will like to combine together into a single method. In this example I will not be doing anything advanced involving nested objects or the prototype chain, and I will be giving both lodash, and native Object.assign examples.

### 2.1 - Using the lodash \_.assign method.

So say I have an object that contains an x, and y position, as well as another object that contains deltas for x and y. In addition I also have an object of methods that I would like to use with these values. I could use Function.call, but before I do that I would still need to combine the position and delta values into a single object. There are a few options for doing so and \_.assign is one of them.

All I have to do is pass an object that is the object that I want everything assigned to as the first argument. For this example I just give it an empty object because I do not want to mangle any of the other objects. After that I just start passing objects that I want assigned to the empty object.

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

This results as in an object that works as expected. However There is much that I am not covering in this example such as what happens when there are name space collisions, what happens to the prototype, and what if a nested object is used and it's values change. More on all that later but for now you should get the basic idea of what \_.assign is good for.


### 2.2 - Object.assign

```js
// assign everything to a new object
var obj = Object.assign({}, pos, deltas,methods);

obj.step();

console.log(obj.x,obj.y); // 43.2,12.2
```

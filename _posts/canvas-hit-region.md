---
title: Hit region and html 5 canvas
date: 2019-12-01 14:20:00
tags: [js, canvas]
layout: post
categories: canvas
id: 573
updated: 2019-12-07 11:08:21
version: 1.4
---

There is the possibly of a new [hit region](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility) api in canvas that can be used as a way to define additional interactivity for objects that are drawn in a canvas. As of this writing there is very poor browser support for this, in fact it does not seem to work at all in any browser that I use at least.

Still I though that I should write a post on this subject, and also on hit detection in general in canvas projects. So this post will not be on the hit region api that much, but it will be on bounding box collision detection in a vanilla javaScript canvas project. A subject that will come up often in many such projects.

<!-- more -->

## 1 - Basic bounding box hit region area

I do not think that a hit region area should really be the responsibility of a canvas drawing api any way, and that a canvas element does not need to be a replacement for other HTML elements. Sure the subject will come up often, but hit detection should be a part of the class, model, framework or whatever it is that you are using outside of just the canvas element and the drawing api alone.

In short a canvas is just a bitmap drawing area that can be used to draw things with javaScript and all kinds of external assets. So with that said a javaScript module or state object of some kind should be where you are storing information about objects drawn in the canvas, as well as logic that updates and works with that state.

```js
var bb = function (a, b) {
    return !(
        ((a.y + a.h) < (b.y)) ||
        (a.y > (b.y + b.h)) ||
        ((a.x + a.w) < b.x) ||
        (a.x > (b.x + b.w)));
};
 
var box = {x:50,y:50,w:100,h:50};
 
console.log( bb(box,{x: 75,y:75,w:1,h:1}) ); // true
console.log( bb(box,{x: 5,y:5,w:1,h:1}) ); // false
```

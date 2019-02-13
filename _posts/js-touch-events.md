---
title: Touch events in javascript.
date: 2019-02-13 08:49:00
tags: [js]
layout: post
categories: js
id: 378
updated: 2019-02-13 10:04:03
version: 1.3
---

There are touch events in client side javaScript than can be used to bring interactivity to a javaScript project via touch screens. There is of course also using mouse events as well to help bring a more general way of interactivity to a project that will work on a wider range of client systems. Still if you have a large volume of traffic coming to a project that is from clients that are using a mobile device it might be nice to add some custom functionality for those kinds of clients. So in this post I will be covering some basic examples of using touch events with javaScript.

<!-- more -->

## 1 - touch events basics, and touchstart

Touch events differ a little from mouse events, however there is also a great deal in common as well. With touch events there is the possibility of multi touch, and it is also true that there is not an equivalent to a mouse hover event. However both mouse events and touch events can be though of as pointers, and as such can be used to create an interface of some kind.

For a very basic example of touch events with plain vanilla javaScript here is an example that involves a canvas element, and a single touch start event. The touch start event is an event that fires each time a touch starts. As such it only fires once a one or more fingers touch the surface of a touch screen.

```js
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// fill black
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
// attach a touch start event for the canvas
canvas.addEventListener('touchstart', function(e){
 
    // get the canvas relative rather than window relative
    // position of the first touch
    var bx = e.target.getBoundingClientRect(),
    x = e.touches[0].clientX,
    y = e.touches[0].clientY;
 
    // prevent any default action for touch events
    e.preventDefault();
 
    // stroke a red circle
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(x,y,15,0,Math.PI*2);
    ctx.stroke();
 
});
        </script>
    </body>
</html>
```

In this example I am also using the getBoundingClientRect method to get a canvas rather than window relative position of the touch event. When it comes to touch events there is also the preventDefault method as well that will cancel browser level type actions when a user interacts with the canvas. One major difference from mouse events is that the clientX, and clientY values are gained from an array of touch objects, this is because unlike a mouse a touch screen can support multi touch.
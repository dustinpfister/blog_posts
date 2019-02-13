---
title: Touch events in javascript.
date: 2019-02-13 08:49:00
tags: [js]
layout: post
categories: js
id: 378
updated: 2019-02-13 09:15:37
version: 1.1
---

There are touch events in client side javaScript than can be used to bring interactivity to a javaScript project via touch screens. There is of course also using mouse events as well to help bring a more general way of interactivity to a project that will work on a wider range of client systems. Still if you have a large volume of traffic coming to a project that is from clients that are using a mobile device it might be nice to add some custom functionality for those kinds of clients. So in this post I will be covering some basic examples of using touch events with javaScript.

<!-- more -->

## 1 - touch events basics

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
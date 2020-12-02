---
title: Touch events in javaScript.
date: 2019-02-13 08:49:00
tags: [js]
layout: post
categories: js
id: 378
updated: 2020-12-02 13:44:38
version: 1.12
---

There are [touch events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) in client side javaScript than can be used to bring interactivity to a javaScript project via touch screens rather than just using mouse and keyboard events only. There are several events of interest when it comes to touch events namely [touch start](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event), [touch move](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event), and [touch end](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event).

There is of course also using mouse events with touch events and keyboard events to help bring a more general way of interactivity to a project that will work on a wider range of client systems in a uniform kind of way. I have worked out a [canvas example that makes use of touch events as well as mouse and keyboard events](/2020/04/17/canvas-example-input-controller/) that acts as a kind of grand central input controller of sorts.

Still if you have a large volume of traffic coming to a project that is from clients that are using a mobile device it might be nice to add some custom functionality for those kinds of clients. For example making use of multi touch while making it so the project can still be used by systems that may not support touch events. So in this post I will be covering some basic examples of using touch events with javaScript.

<!-- more -->

## 1 - touch events basics, and touch start

Touch events differ a little from mouse events, for example with touch events there is the possibility of multi touch, rather than just a single mouse cursor position. In addition it is also true that there is not an equivalent to a mouse hover event. 

however there is also a great deal in common with them as well, both mouse events and touch events can be though of as pointers. I can just not take into account the location of any of the additional touch objects that might be present when it comes to touch events and only look at the first touch object. I can also just use mouse down and touch start events to preform the same actions. However I still need to make slight adjustments to the event handers in order to get them to work with both touch and mouse events.
In this section I will be going over some of the very basics of touch events. In these examples I am just going to stick with just one event at a time when it comes to touch support.

### 1.1 - Just the touch start event.

For a very basic example of touch events with plain vanilla javaScript, here is an example that involves a canvas element, and a single touch start event. The touch start event is an event that fires each time a touch starts the very moment that one or more fingers touch the surface of the touch device. So it only fires once during the duration of an action that involves touching the surface of the screen moving and then lifting.

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
 
var drawCircle = function(ctx, x, y, r, style){
    // stroke a red circle
    ctx.strokeStyle = style || 'red';
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.stroke();
};
 
// attach a touch start event for the canvas
canvas.addEventListener('touchstart', function(e){
    // prevent any default action for touch events
    e.preventDefault();
    // get the canvas relative rather than window relative
    // position of the first touch by making use of the
    // getBoundingClientRect method and the changedTouches array of
    // the touch event
    var bx = e.target.getBoundingClientRect(),
    x = e.changedTouches[0].clientX,
    y = e.changedTouches[0].clientY;
    // draw a circle centered there
    drawCircle(x,y,15,'red');
});
        </script>
    </body>
</html>
```

In this example I am also using the getBoundingClientRect method to get a canvas rather than window relative position of the touch event. When it comes to touch events there is also the preventDefault method as well that will cancel browser level type actions when a user interacts with the canvas. One major difference from mouse events is that the clientX, and clientY values are gained from an array of touch objects, this is because unlike a mouse a touch screen can support multi touch.

## 2 - touch start, move, and end events

In addition to touch start events there are also the touch move and touch end events as well. In this example I have a simple project that will create the red circles in the previous example each time a touch move event fires as well on top of just the touch start event.

This time around I will be pulling what I am working on into an external javaScript file and linking to it from the html.

```html
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="startendmove.js"></script>
    </body>
</html>
```

In the javaScript file I now have a more advanced version of the previous example. I now have a clean event that I call once the project starts and also each time a touch start event fires. For the touch end event I am not doing much of anything aside from just logging the time stamp value of the full touch event from start to end.

```js
// Get the canvas and 2d context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
// clear
var cls = function () {
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// get first pointer object
var getFirst = function (e) {
    var bx = e.target.getBoundingClientRect();
    return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
};
 
var touchStart = function (e) {
    var f = getFirst(e);
    e.preventDefault();
    cls();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
    ctx.stroke();
};
 
var touchMove = function (e) {
    var f = getFirst(e);
    e.preventDefault();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(f.x, f.y, 15, 0, Math.PI * 2);
    ctx.stroke();
};
 
var touchEnd = function (e) {
    console.log(e.timeStamp);
};
 
// attach a touch events
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchend', touchEnd);
canvas.addEventListener('touchmove', touchMove);
 
cls();
```

## 4 - Conclusion

So this was just a brief overview of touch events in a client side javaScript environment. In my experience thus fat touch events are just part of what needs to be taken into account when working out a user interface. More often then not when I use them it is just to define some additional way to do what can also be done with mouse events. That is that when I make a javaScript project I can not just write code for  touch events alone, I need to assume that I am always dealing with a desktop client. In fact more often than not that is what I am dealing with when I look at my sites statistics when it comes to that.
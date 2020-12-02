---
title: Touch events in javaScript.
date: 2019-02-13 08:49:00
tags: [js]
layout: post
categories: js
id: 378
updated: 2020-12-02 14:17:31
version: 1.19
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

For a very basic example of touch events with plain vanilla javaScript, here is an example that involves a canvas element, and a single touch start event. The example will just draw a red circle to the canvas each time that the canvas is touched, but will do so only with the first finger, for now I am not going to do anything fancy with multi touch.

The touch start event is an event that fires each time a touch starts the very moment that one or more fingers touch the surface of the touch device. So it only fires once during the duration of an action that involves touching the surface of the screen moving and then lifting back up again.

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
    drawCircle(ctx, x, y, 15, 'red');
});
        </script>
    </body>
</html>
```

One major difference from mouse events is that the clientX, and clientY values are gained from an array of touch objects, this is because unlike a mouse a touch screen can support multi touch of course. There is however more than one array of touch objects though and it is impotent to know the differences between them when working out logic for touch events. In this example I am using the [changed touches](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches) array of the touch event object. Although it might not make much of a difference with this example the state of these touch objects may differ a little when it comes to the [touches array](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches) when it comes to touch move events.

In this example I am also using the [getBoundingClientRect method](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) to get a canvas rather than window relative position of the touch event. This method will return a object that will contain metric for the position of the canvas element, I can then just use those values to adjust the values that are in the changed touches array that are relative to the window of the web page, and not the canvas element.

When it comes to touch events there is also the [preventDefault method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) as well that will cancel browser level type actions when a user interacts with the canvas. 

### 1.2 - Making a hander that will work with both touch and mouse events

One important thing to take into account is if I want to do something completely separate for touch events, or if I just want to make a single set of event handers that will work with both touch and mouse events. Often I just work out an interface that will work well with both pointer devices and just think in terms of a single pointer object.

When working out event handers that will work well with both touch and mouse events there are just a few little conditions to look for. There is of course looking at the type property of the event object, but another way is to look for the presence or absence of a touch array, such as the changed touches event.

```html
<html>
    <head>
        <title>touch events example</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
var drawCircle = function(ctx, x, y, r, style){
    ctx.strokeStyle = style || 'red';
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.stroke();
};
 
var pointerDown = function(e){
    e.preventDefault();
    var bx = e.target.getBoundingClientRect(),
    x = e.clientX,
    y = e.clientY,
    color = 'lime';
    if(e.changedTouches){
        x = e.changedTouches[0].clientX,
        y = e.changedTouches[0].clientY;
        color = 'red'
    }
    drawCircle(ctx, x, y, 15, color);
};
 
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('mousedown', pointerDown);
 
        </script>
    </body>
</html>
```

So with this example I am getting lime circles when I click the canvas, and red circles when I touch it. I am just setting the values for the x and y values to e.clientX and e.cleintY for starters. In the event that the event is a mouse event these will be the starting window relative values. In the event that it is a touch event there should be a changed touches array, this is then what I am setting the starting values for x and y then. I can the adjust the values with the metrics from bounding box like before.

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
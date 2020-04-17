---
title: Get a point relative to a canvas element rather than window in client side javaScript
date: 2020-03-04 09:41:00
tags: [canvas]
categories: canvas
layout: post
id: 621
updated: 2020-04-17 09:54:43
version: 1.13
---

When starting any kind of canvas project I want to get a [canvas point](https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/) that is relative to the canvas element rather than the window object. To do this I just need to attach a touch or mouse event to the canvas element, and then use the [get bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) method of the canvas element to get the offsets for the position of the canvas relative to the window. Once I do that I can use the object returned by the get bounding client rect method to adjust the client x and y values of the event object in the mouse or touch event handler to get the desired canvas element relative position.

So a get canvas relative position method of sorts has become a usual suspect of sorts along with things like the distance formula, and bounding box collision detection when working out a new canvas project without using some kind fo framework that might abstract away this functionality along with all kinds of other things.

There is a bit more to how to go about getting a canvas relative position when it comes to how to go about making methods that will work with just mouse events, just touch events, or both in most situations. Also there is working out a more comprehensive input controller, or input handler of sorts that will work well with mouse, multi touch, and keyboard events.However for now in this post I will be taking a look at a few examples of how to go about getting a canvas relative mouse or touch position with client side javaScript and canvas elements.

<!-- more -->

## 1 - The canvas point basics

So once again the basic idea with getting the canvas relative point is to use the get bounding client rect method of the canvas element of interest, and then use that to adjust any values in an event object that are window relative.

One way to do this is to use the target property of an event object that was fired from an event hander that is attached to the canvas element to get a reference to the canvas element that was clicked. At which point the get bounding client rect method can be called off the reference to the canvas element, and then that can be used to adjust the client x and y values of an event object to work with in the body of the handler.

So you might end end with some javaScript code that looks something like this if mouse events are only of concern for starters.

```js
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: e.clientX - bx.left,
        y: e.clientY - bx.top,
        bx: bx
    };
};
```

Such a method might work out okay for mouse events only, but what about supporting touch events? When it comes to touch events there is not just one set of x and y values but one or more sets of values in an array of touch objects. So getting something like this to work for touch, and mouse events will be a little more complex. 

Also it is important I think to keep in mind that nature of web based applications and how they differ from mobile phone applications. In that kind of programing environment it is safe to just go ahead and do all kinds of things with multi touch, however in a web application environment I have to take into account that a significant volume of traffic is going to be using the application with a traditional desktop system that might not have a touch screen.

## 2 - Support touch and mouse events

So now that we have the basic idea covered there is the idea of a more robust solution that will work with touch events on top of just mouse events. The event objects of touch events of course are a little different then that of mouse events because of the possibility of multi touch. There is a changed touched array in the event object that contains an array of one or more objects for each finger on the touch surface. If I do not care about multi touch, and just want to make a single method that will work with both mouse and touch events then I will just want to get the first object in that array.

So then this solution will involve just that an updated get canvas relative method that will get the canvas relative position with clientX, and clientY in the event of mouse events, and the changedTouches array in the event of touch events.

```html
<html>
    <head>
        <title>canvas get point relative to canvas</title>
    </head>
    <body>
        <canvas 
            id="the-canvas" 
            width="320" height="240"
            style="position:absolute;left:100px;top:100px"
        ></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
 
var drawBackground = function (ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var drawPos = function (ctx, pos) {
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
    ctx.stroke();
};
 
var pointerHandler = function (e) {
    var pos = getCanvasRelative(e);
    drawPos(ctx, pos);
};
 
drawBackground(ctx);
canvas.addEventListener('mousemove', pointerHandler);
canvas.addEventListener('touchmove', pointerHandler);
        </script>
    </body>
</html>
```

I do not work on many projects that make use of multi touch. The reason why is because javaScript projects are typically going to be in a web based environment, so I need to thin in terms of traditional desktop system support. If I do want multi touch then it might be best to have two or more methods maybe that are part of my user interface logic.

## 3 - Conclusion

So the process of getting a canvas relative position with a pointer event is a little complicated, but that is the way it should be after all. When it comes to front end javaScript we are not always dealing with canvas elements, the default value should therefore be window relative.

If you do not want to bother with these kinds of things then maybe you should think about working inside of a framework, or slowly start making your own framework by working this, along with all kinds of other things that have to do with input and much more into it. I have come to fine that when I do that I end up spending more time making a framework rather than an actual project though.

There is much more to write about when it comes to pointer events, and input in general as part of the process of making a canvas application. I could go on about keyboard events, simulating input, and working everything together into some kind of all powerful input control module of some kind. Maybe I will get around to editing this post if I get to that, but yet again,  maybe that is a matter for another post.
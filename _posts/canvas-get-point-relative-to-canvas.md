---
title: Get a point relative to a canvas element rather than window in client side javaScript
date: 2020-03-04 09:41:00
tags: [canvas]
categories: canvas
layout: post
id: 621
updated: 2020-12-10 11:36:21
version: 1.15
---

When starting any kind of canvas project that will involve a user interface I often want to get a [canvas point](https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/) that is relative to the canvas element rather than the window object. To do this I just need to attach a touch or mouse or touch event to the canvas element to get the position of a pointer event relative to the window for startes. Then I can also use the [get bounding client rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) method in the body of the event hander off a refernce to the canvas element to get a set of values that include the offset values from the upper left corner to the browser window. Once I do that I can use the object returned by the get bounding client rect method to adjust the client x and y values of the event object in the mouse or touch event handler to get the desired canvas element relative position.

So a get canvas relative position method of sorts has become a usual suspect of sorts along with things like the distance formula, and bounding box collision detection when working out a new canvas project without using some kind fo framework that might abstract away this functionality along with all kinds of other things. With that said it is a good idea to look into a framework or two to help keep you from wasting time with stuff like this, but if you really must do everything from the ground up then these things just need to get worked out as you built your own canvas framework, or vanilla javaScript canvas project.

There is a bit more to how to go about getting a canvas relative position when it comes to how to go about making methods that will work with just mouse events, just touch events, or both in most situations. When it comes to touch events there is the potential at least to do things with multi touch, however in my experence thus far I avoid getting into that and just make solutions that work well with a mouse or a touch device.

Also there is working out a more comprehensive input controller, or input handler of sorts that will work well with mouse, multi touch, and keyboard events. However that all might be a bit off topic, for now in this post I will be taking a look at a few examples of how to go about just getting a canvas relative mouse or touch position with client side javaScript and a canvas element.

<!-- more -->

## 1 - The canvas point basics

So once again the basic idea with getting the canvas relative point is to use the get bounding client rect method to get an objet with values that can be used to ajust the x and y values in an event object for a pointer event handler. This get bounding client rect method should be of use not just for canvas elements but any display element in general actually. However before I can use that method I first need a reference to the canvas element of interest, and I will also need to attach one or more event handers to the canvas element such as on mouse down.

One way to do this is to use the target property of an pointer event object that was fired from an event hander that is attached to the canvas element to get a reference to the canvas element that was clicked. At which point the get bounding client rect method can be called off the reference to the canvas element, and then that can be used to adjust the client x and y values of an event object in the body of the handler to get the end result.

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

Such a method might work out okay for mouse events only, but what about supporting touch events? When it comes to touch events there is not just one set of x and y values but one or more sets of values in an array of touch objects. Also there is more then one array of touch objects in these kinds of event objects. So getting something like this to work for touch, and mouse events will be a little more complex, however the basic idea is still the same. 

Also it is important I try to keep in mind that nature of web based applications, and how they differ from mobile phone applications. In a mobile environment it is safe to just go ahead and do all kinds of things with multi touch, becuase those kinds of systems these days are typically just a touch device that supports multi touch. However in a web application environment I have to take into account that a significant volume of traffic is going to be using the application with a traditional desktop system that might not have a touch screen at all. In fact taking into account my sites stats at least almost all of my traffic is desktop clients, so for me it just makes more sense to just think in terms of pointer events in general rather than making something that is very touch or mouse centric.

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

I do not work on many projects that make use of multi touch, the reason why is because javaScript projects are typically going to be in a web based environment, so I need to thin in terms of traditional desktop system support. If I do want multi touch then it might be best to have two or more methods maybe that are part of my user interface logic. However I never get around to adding those kinds of features to projects, and also there is not much incetaive for me to spend time on it.

## 3 - Conclusion

So the process of getting a canvas relative position with a pointer event is a little complicated, but that is the way it should be after all. When it comes to front end javaScript we are not always dealing with canvas elements, the default value should therefore be window relative.

If you do not want to bother with these kinds of things then maybe you should think about working inside of a framework, or slowly start making your own framework by working this, along with all kinds of other things that have to do with input and much more into it. I have come to fine that when I do that I end up spending more time making a framework rather than an actual project though.

There is much more to write about when it comes to pointer events, and input in general as part of the process of making a canvas application. I could go on about keyboard events, simulating input, and working everything together into some kind of all powerful input control module of some kind. Maybe I will get around to editing this post if I get to that, but yet again,  maybe that is a matter for another post.
---
title: Canvas drag and drop examples
date: 2020-03-10 18:21:00
tags: [canvas]
layout: post
categories: canvas
id: 624
updated: 2020-05-19 16:53:43
version: 1.16
---

In canvas [drag and drop](https://konvajs.org/docs/drag_and_drop/Drag_and_Drop.html) actions are part of many projects when working out a user interface for a project. There are ways of dragging whole elements when it comes to client side javaScript in general, but in this post I will be writing about dragging a display object in the canvas which is a little different from that as it just deals with canvas elements alone.

The process of making a canvas drag of sorts might involve first getting a canvas relative point in a pointer event such as mouse down or a touch start event when it comes to touch events. Then the nest step might be to use that to find out if a display object was clicked or not with some kind of collision detection method such as bounding box. If an object has been clicked then I could set a boolean value for that display object to true that would then used in the logic of a pointer move event. In the body of the pointer move event I would then set the position of the display object to the canvas relative point that is obtained within the event object of the move event. Finally there will be a pointer end event that just sets the boolean back to false leaving the dragged display object at its new location.

There is more to it then just start though, there are other talking points when it comes to snapping things to a grid or not, and creating user defined events for certain things that are a result of drag and drop. However the basics of getting started with canvas drag and drop is not so hard, and if things get to intense there is always just going with a framework such as [phaser that has all this worked out well and much more](/2017/10/24/phaser-inputhandler-draggable/). However in this post I am going to be witting about doing this sort of things and related topics with just plain old vanilla javaScript and canvas elements.

<!-- more -->

## 1 - Basic canvas drag example

So in this section I will be going over just a basic canvas drag example. This will just be a canvas example where at the center of the canvas there will be a circle, and the circle can just be clicked and dragged around the canvas, thats it nothing special. The example will involve the use of a method that I worked out for another canvas post of mine that has to do with getting a canvas relative point from and event object, and also the distance formula that will be used for collision detection.

### 1.1 - The get canvas relative method and distance formula

In this example I will be using mouse and touch events so I will want to use a method I worked out that helps with getting the canvas relative position of a mouse or touch events from and event object. I will also want a distance formula to help me find out if I clicked the circle or not when working out my event handers.

```js
// get canvas relative and distance methods
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
var distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

### 1.2 - Event handers

So now that I have my get canvas relative method and my distance method I can now put together my event handers. these methods will be called and passed a state object when doing so that will then be accessed by the internal event hander that is returned when using add event listener. More on that later.

```js
// Event handlers
var pointerDown = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (distance(pos.x, pos.y, state.x, state.y) <= state.r) {
            state.down = true;
        }
    };
};
var pointerMove = function (state) {
    return function (e) {
        var pos = getCanvasRelative(e);
        if (state.down) {
            state.x = pos.x;
            state.y = pos.y;
            draw(ctx, canvas, state);
        }
    };
};
var pointerUp = function (state) {
    return function (e) {
        state.down = false;
    };
};
```

### 1.3 - The draw method

I will just need a single draw method that will be used to paint a sold background to the canvas followed by the circle. This method will be called each time the circle moves as well as one time initially and then end of the code.

```js
// draw
var draw = function (ctx, canvas, state) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(state.x, state.y, state.r, 0, Math.PI * 2);
    ctx.fill();
};
```

### 1.4 - set up the canvas, state object, and attach events

Now to get a reference to the canvas element, create the state object, and attach the event handlers. I get a reference to the canvas element, and also get a reference to the 2d drawing context as well as set the width and height.

I create the state object with just a single object literal, and then pass it for each call of my pointer handler methods when attaching events to the canvas. I then also call my draw method for the first time, but all additional calls will be made my events rather than an event loop.

```js
// set up canvas
var canvas = document.getElementById('mycanvas'),
ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
// the state object
var state = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 10,
    down: false
};
 
// attach for mouse and touch
canvas.addEventListener('mousedown', pointerDown(state));
canvas.addEventListener('mousemove', pointerMove(state));
canvas.addEventListener('mouseup', pointerUp(state));
canvas.addEventListener('touchstart', pointerDown(state));
canvas.addEventListener('touchmove', pointerMove(state));
canvas.addEventListener('touchend', pointerUp(state));
 
// starting draw
draw(ctx, canvas, state);
```

Once this is all up and running the result is what I would expect. A single circle at the center of the center of the canvas, and I can then click and drag the circle to any location on the canvas. There is still a bit more to click in drag with canvas though such as snapping things into place.

## 2 - Conclusion

There is much more to this subject then what I have covered thus far when it comes to dragging and dropping with canvas elements. If I get around to it hopefully I will expand this more with additional examples that can sever as additional exercises with drawing display objects and canvas in general.
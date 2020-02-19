---
title: Canvas examples on animation basics and beyond
date: 2019-10-10 17:03:00
tags: [canvas]
layout: post
id: 544
categories: canvas
updated: 2020-02-19 09:43:26
version: 1.20
---

So this is another post on [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), and for this post it will be about some basics with [canvas animation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations). Making animations with canvas can be a fun, and rewarding experience and is definitely and example of the fun side of javaScript. In addition in some situations animations can also be helpful as well as a way to express data, or show how something works. There are many canvas frameworks out there, but for now I will be sticking to just plain old native client side javaScript by itself here.

<!-- more -->

## 1 - A basic Canvas example of animation

So lets start off with a basic canvas example of an animation that is just that of a ball moving from side to side in the canvas. To do this I just need to have a canvas element, and then gain a reference to that canvas element. Once I have my canvas element reference I can then use the get context method of the canvas reference to get the 2d drawing context of that canvas element.

However I am also going to need more than just the canvas element reference and the drawing context, on top of that I am going to want to have at least a few variables that have to do with the current state of the animation. Because I am just moving a ball from one side of the canvas to the other and back again I am not going to need much, but I will need at least one variable for the current x position to say the least. There are all ready many different ways this kind of animation could be written with javaScript and canvas so lets look at some options.

### 1.1 - Basic stepping canvas animation example

So one of the most basic ways to go about making a simple canvas animation of a ball bouncing back and forth might be to just have an x variable and a delta x variable. In a loop function the x variable is changed by the delta x variable on each tick, and conditional statements can be used to change the delta x variable when it reaches one of the sides of the canvas.

```html
<html>
    <head>
        <title>canvas example animation basics</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas and context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// some kind of state for the animation
var x = 0,
dx = 1;
// Main APP loop
var loop = function () {
    //request next frame
    requestAnimationFrame(loop);
    // update state
    x += dx;
    if (x >= canvas.width) {dx = -1;}
    if (x <= 0) {dx = 1;}
    // draw
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
};
loop();
        </script>
    </body>
</html>
```

This might be a good starting point for making canvas animations, but there are a few issues of concern with this kind of approach with animation. The first of which is that I am just stepping the x value for each frame, but I am not taking into account that the abut of time it will take might vary a little from system to system. Even if the ball moves back and forth at the same speed across different platforms, at what speed? It might be better to have some kind pixels per second value, and the delta value is determined by the amount of time that has elapsed sense the last frame update and that pixels per second value.

Another thought that comes to mind is the nature of the animation that I am making here, this is a kind of animation that just loops over and over again. So in other words it is an animation that can be expressed as a collections of static frames, rather than a state that changes as a result of user input, or some kind of randomization factor. So lets look at some more examples that do the same thing more or less, but in very different ways.

### 1.2 - Pixles per second

So then there is making the same animation but now with a pixels per second value. Now I have a clear speed at which I would like the ball to move at, and I am using the Date constructor to create a last time value that can be used to know the amount of time that has elapsed sense the last frame tick inside the body of an update method.

```html
<html>
    <head>
        <title>canvas example animation basics</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas and context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// some kind of state for the animation
var x = 0,
pps = 128,
lt = new Date(),
right = 1;
// update method
var update = function(){
    // now and time and dx
    var now = new Date(),
    t = now - lt,
    dx = t / 1000 * pps * right;
    // update state
    x += dx;
    if (x >= canvas.width) {
       x = canvas.width - (x - canvas.width);
       right = -1;
    }
    if (x <= 0) {
       x = Math.abs(x);
       right = 1;
    }
    lt = now;
};
// Main APP loop
var loop = function () {
    //request next frame
    requestAnimationFrame(loop);
    update();
    // draw
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, canvas.height / 2, 10, 0, Math.PI * 2);
    ctx.fill();
};
loop();
        </script>
    </body>
</html>
```

This canvas example might prove to be a better approach to animation in the sense that I am taking into account the fact that on some browsers and systems javaScript is going to run a litter faster than with others. However this is also still a situation in which I am always just adding to an x value and then adjusting with if statements. This is more or less what needs to be done in one way or another when it comes to making a game for example. However for an animation such as this there is another way of interest that involves thinking in terms of a collection of frames.

### 1.3 - Frame index value, max frame index value, and deterministic animation style

In this example I am moving the ball in relation to a current frame index value relative to a set number of max frames for the animation. This is an approach that I take when working out any kind of canvas powered animation that is going to be a fixed set of frames, rather than something that is subject to user input, or any kind of variation or randomization factor.

The basic idea of this at least is simple, I have a variable that represents the current frame index, and another that represents the total number of frames. I can then use those to values to find the current value for all kinds of other values that are used to set the position, size, position, rotation, color, and so forth for display object, lines, and any thing else that might be used to render the current frame of an animation.

```html
<html>
    <head>
        <title>canvas example animation basics</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
// get canvas and context
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// some kind of state for the animation
var state = {
    frame: 0,
    maxFrame: 100,
    point: {}
};
// update or forFrame method
var forFrame = function (s, canvas) {
    var per = s.frame / s.maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    s.point.x = canvas.width * bias;
    s.point.y = canvas.height / 2;
    s.frame += 1;
    s.frame %= s.maxFrame
};
// draw method the canvas
var draw = function (s, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(s.point.x, s.point.y, 10, 0, Math.PI * 2);
    ctx.fill();
};
// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    forFrame(state, canvas);
    draw(state, ctx, canvas);
};
loop();
        </script>
    </body>
</html>
```

This kind of canvas animation seems to be a good way to go about making any kind of animation that is to just be a certain collection of fixed frames that is defined by javaScript code. It is a great way to go about getting into what might be expressed as a kind of deterministic style of animation where each frame is rendered by a current state that is mutated purely by a changed in frame value relative to a max frame value.

Although this might not be the best example of it, this style of canvas animation can also be thought of maybe as a kind of functional style of animation. This is of course if implemented differently where the animation is a pure function where the only arguments that are given to the function is a frame index, and max frame index value. If so the same set of arguments should return the same state every time to be in line with the rules of functional programing.

There are ways of exporting these frames, and then from that point forward it is just a matter of setting a frame rate at which the animation is to be played back at.

## 2 - Basic For Frame centered style canvas animation

So now that I have covered the basic elements of animation and canvas, in this section I will be going over a basic example of a for frame centered style canvas animation module. What I mean by this is having a module where I pass and options object that contains a method that will be called on a per frame basis for all possible frame index values between zero and a max frame value. What is then returned is a function that when passed a frame index value will return an object that is the state of the animation for that frame index value relative to the max frame value that can also be set via a second argument.

### 2.1 - A basic For Frame module

So this is a basic example more or less of what I have in mind for this for frame style of canvas animation. When I call this FF function it it will return an inner function that I can then use to change the state of the animation that I define using a for frame method that I pass as an option to it.

Inside the FF function I have a helper method that will set a percent done value as a number in the range of zero to one that reflects the stage of completion of the animation as it progresses from frame zero to the last frame. This method also sets what I have come to call a bias value that is a number that goes from zero to on half and then back down to zero depending on the stage of completion of the animation. These are two general properties that come to mind that I will want to work with when it comes to working out some logic for an animation via a for frame method.

```js
var FF = function (opt) {
    var api = {};
    opt = opt || {};
    api.ani = {};
    api.forFrame = opt.forFrame || function () {};
 
    // set the main percent and bias values for api
    var setMainPerAndBias = function (api) {
        api.per = api.frameIndex / api.maxFrame;
        api.bias = 1 - Math.abs(0.5 - api.per) / 0.5;
    };
 
    // private forFrame method
    var forFrame = function (frameIndex, maxFrame) {
        // set api frame index and max frame
        api.frameIndex = frameIndex;
        api.maxFrame = maxFrame;
        // set main percent done and bias value
        setMainPerAndBias(api);
        // call api forFrame with current api state
        api.forFrame.call(api, api, frameIndex, maxFrame);
        // return just the ani object
        return api.ani;
    };
 
    // public method used to set by frameIndex
    // over max Frames
    return function (frame, maxFrame) {
        // defaults if undefined for frame index and max frame
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 50 : maxFrame;
        // wrap frame index
        frame = frame > maxFrame ? frame % maxFrame : frame;
        frame = frame < 0 ? maxFrame - Math.abs(frame) % maxFrame : frame;
        // call forFrame with parsed frame and maxFrame
        forFrame(frame, maxFrame);
        // return just the animation object
        return api.ani;
    };
};
```

### 2.2 - Simple moving box example of the Basic for forFame module

Now for a Basic example of my for frame method in action.

```js
// DRAW
var draw = {};
draw.bx = function (ctx, bx) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
 
var opt = {
    forFrame: function (api, f, mf) {
        var bx = api.ani.bx = {
            w: 32,
            h: 32
        };
        bx.x = (canvas.width - 32) * api.per;
        bx.y = canvas.height / 2 - 16 + canvas.height / 4 * api.bias;
    }
};
 
// create an animation method
var ani = FF(opt);
 
var bx = ani(25, 50).bx;
draw.back(ctx, canvas)
draw.bx(ctx, bx);
```
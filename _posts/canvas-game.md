---
title: Canvas Game examples
date: 2019-03-18 19:40:00
tags: [js, canvas]
layout: post
categories: canvas
id: 403
updated: 2020-07-05 13:10:28
version: 1.22
---

In this post I will be writing about a very simple canvas game example and I might get around to expanding this post with additional simple examples at some point. There is of course a lot to cover when it comes to getting started with canvas games and javaScript, in addition there are many different ways to go about keeping things well structured as one moves forward with developing a game project. So I thought it would be a good ide to have a post where I go over some very simple starting points when it comes to canvas game development.

There are many other examples of how to go about making a canvas game with javaScript on the web. For example there is a [nice tutorial on how to go about making a breakout clone on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript) that is worth checking out as well. However In this post I will be going over a few simple examples of my own that I thrown together and touch base on many topics that come up when getting into other kinds of projects. 

<!-- more -->

## 1 - Canvas games basics

So in order to get started with canvas it would be a good idea to learn a thing or two about javaScript to begin with if you have not done so before hand. I will not be covering the basics of javaScript development here, there will be some simple copy and past examples, but you need to know the basics of how to get them working.

Making a game can be very simple, depending of course on the nature of the game. Just about any canvas game is going to have at least some kind of state, a way to update that state by way of an update loop, and user input, and of course one or more methods that show the current state of things on the canvas. I will try to keep may of these examples as simple as possible, but game development can get very involved, even with things you would think world be stupid simple oddly enough.

## 2 - Canvas Game One - Simple moving box example

In this example I have worked out just a simple moving box example. Many Games might start out with this kind of structure that just involves moving a box around a screen. So it would be a good idea to start of with something just very simple like this if you are new to canvas game development. We all need to start somewhere when it comes to this sort of thing, so lets get this one out of the way.

### 2.1 - The html for the Canvas Game

For the html I will keep things very simple. The main area of concern is that I just have a canvas element, and a script tag that will link to my external javaScript file. It is also possible to create and inject canvas elements of course, and there is a great deal more to write about when it comes to making this valid html 5 markup. However for the sake of keeping this example fairly simple, I will not be getting into that for this example at least.

```html
<html>
    <head>
        <title>canvas game</title>
    </head>
    <body>
        <canvas id="gamearea"></canvas>
        <script src="game1.js"></script>
    </body>
</html>
```

### 2.2 - The game1.js file for the Canvas Game

In this section I will covering the javaScript file I am linking to for this simple canvas game example. There are many topics to cover briefly at least even for a simple example like this, so lets get to it.

#### 2.2.1 - Get a reference to the canvas and 2d context

So at the very top of the file I just grab a reference to the canvas element. Once that is done I can use the getContext method of the canvas element to get a reference to the 2d drawing context. I will not be covering every little detail about the 2d drawing context here, but there will be an example of using it later on in this section when it comes to making a draw method.

```js
// get the canvas and context
var canvas = document.getElementById('gamearea'),
ctx = canvas.getContext('2d');
 
// set native size of the canvas
canvas.width = 320;
canvas.height = 240;
```

Here I also set the native size of the canvas as well via the width and height properties of the canvas element. I will also be attaching an event handler to the canvas as well for accepting user input that will be used to move the canvas as well later on in the file.

#### 2.2.2 - The state object

So any canvas game will involve some kind of state. In a very simple project like this one the state can just be a single object with just a few properties that represent the position, speed, and direction of the box along with maybe a few more necessary properties as well. In more complex projects there will be a need to save, and load a fairly more complex state object like this, but one needs to learn how to walk before they can run.

```js
// a simple state that is just a single object
// that will be the moving box
var bx = {
    // x, y, and angle
    x: 144,
    y: 104,
    a: 0,
    // pixels per second
    pps: 64,
    lastTick: new Date()
};
```

Along with the current x and y position of the box, I will also store the current angle to which the box will be moving. In addition I will also be storing a pixels per second value that will be the number of pixels that the box will move per second. There will be more on this and the lastTick date object when I get to the update loop of this canvas game example.

#### 2.2.3 - The update loop, and Mathematical Modulo

One of the many things a javaScript developer might run into at one point or another is how the native modulo operator in javaScript works when it comes to dealing with negative numbers. I [wrote a post on this subject](/2017/09/02/js-whats-wrong-with-modulo/) before so I will not get into the details about it, however in this example I will be using a mathematical modulo method to help with wrapping the x and y values of the box when it moves out of bounds.

```js
// mathematical modulo
var mod = function (x, m) {
    return (x % m + m) % m;
};
 
// an update loop for the state
var update = function () {
    // number of seconds sense last tick
    var secs = (new Date() - bx.lastTick) / 1000;
    // reset last tick to current time
    bx.lastTick = new Date();
    // step x and y
    bx.x += Math.cos(bx.a) * bx.pps * secs;
    bx.y += Math.sin(bx.a) * bx.pps * secs;
    // wrap x and y
    bx.x = mod(bx.x, canvas.width - 32);
    bx.y = mod(bx.y, canvas.height - 32);
};
```

In the update method of this example I am using the lastTick property of the state object to find out how much time as passed sense the last frame tick. This value will be used in the expressions that will set the delta values of the x and y properties of the box, resulting in its movement for each frame tick. The deltas can be thought of as the amount that something changes from one point in time to another.

In the expressions that change the values of x, and y I am using the Math.cos, and Math.sin methods of the Math object. If you are not familiar with these methods that will it would be a good idea to make a few projects in which you are playing around with them a little, as they are often used a lot in these kinds of projects.

#### 2.2.4 - The draw method

Now it is time to create a draw methods that will be used to draw each frame of the canvas game. In complex games I might get into layering and other advanced topics, but for this example there is no need to get that involved. Here I am just using the fillRect 2d context method to paint the whole of the canvas black, and then use it once more to draw the box at its current position.

```js
// draw method
var draw = function () {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw bx
    ctx.fillStyle = 'red';
    ctx.fillRect(bx.x, bx.y, 32, 32);
};
```

#### 2.2.5 - The single event handler

So for this example I will add a single event handler to the canvas that will be used to change the course of the box when the user clicks the canvas. I use the getBoundingClientRect method of the target element which in this case is the canvas element to get canavs element relative x and y values as to where the canvas was clicked.

```js
// attach single event handler
canvas.addEventListener('mousedown', function (e) {
    // get bounding client rect
    var bb = e.target.getBoundingClientRect(),
    x = e.clientX - bb.left,
    y = e.clientY - bb.top;
    // using Math.atan2 to set bx angle
    bx.a = Math.atan2(y - canvas.width / 2, x - canvas.height / 2);
});

Here I am also using the atan2 method as a way to find out the angle from the center of the canvas to the point at which the canvas was clicked, and I am just simple setting the direction of the box to that angle.

#### 2.2.6 - The app loop

So then there is the main app loop of the project. Here I am using requestAnimationFrame to create the loop rather than setTimeout, and just calling the update and draw methods on each loop.

// main app loop
var loop = function () {
    // use RAF over setTimeout
    requestAnimationFrame(loop);
    // update, and draw
    update();
    draw();
};
 
loop();
```

In more complex projects the main app loop might turn into some kind of state machine, a topic I might get into with additional examples. Other projects might take a more event driven approach rather than updating things constantly on a frame by frame basis.

### 2.3 - Conclusion with Canvas Game One

When this project is up and running it might not feel like much of a game yet. Still I have covered many of the basics when it comes to making a canvas game. There is an update and draw method, I am using methods like Math.cos, and Math.atan2. I addressed some basic problems that a javaScript developer might run into when making a project like this with plain vanilla javaScript such as the situation with the module operator, and how to get canvas rather than window relative x and y values when dealing with user input.
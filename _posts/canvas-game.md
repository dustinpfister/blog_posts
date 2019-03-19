---
title: Canvas Game examples
date: 2019-03-18 19:40:00
tags: [js, canvas]
layout: post
categories: canvas
id: 403
updated: 2019-03-19 12:59:02
version: 1.13
---

In this post I will be writing about a few simple canvas game examples. There is of course a lot to cover when it comes to getting started with canvas games and javaScript, but this post should help with many of the basics and more.

<!-- more -->

## 1 - Canvas games basics

So in order to get started with canvas it would be a good idea to learn a thing or two about javaScript to begin with if you have not done so before hand. I will not be covering the basics of javaScript development here, there will be some simple copy and past examples, but you need to know the basics of how to get them working.

There are many other examples of how to go about making a canvas game with javaScript on the web. For example there is a [nice tutorial on how to go about making a breakout clone on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript) that is worth checking otu as well. However In this post I will be going over a few simple examples of my own that I throwed togeather and touch base on many topics that come up when getting into other kinds of projects. 

## 2 - Canvas game one - Simple moving box example

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

#### 2.2.4 - The draw method

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

#### 2.2.6 - The app loop

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
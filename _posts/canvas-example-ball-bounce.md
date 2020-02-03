---
title: A Canvas example of bouncing balls
date: 2020-01-14 19:58:00
tags: [canvas]
categories: canvas
layout: post
id: 592
updated: 2020-02-03 00:01:45
version: 1.22
---

The subject of bouncing a ball around a canvas is a typical canvas example for most beginners. However even it you have been at it with canvas and javaScript for a while, this is one topic I find myself coming back to now and then.

In this post I will be going over some code that I put together for a basic bouncing ball [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial). I will not be covering every little detail when it comes to this kind of example when it comes to advanced things pertaining to physics. However the canvas example will be about [bouncing balls of of the edges of walls of the canvas](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls).

<!-- more -->


## 1 - The ball module for the canvas example

So lets start out with the ball module for this canvas example. This is just a simple collection of methods that will create and return a ball object of sorts, and then other methods that will work with such a method. 

These days I am getting away from writing classes in favor of functional, or at least functional like modules. Now suggesting that doing so is a better or worse way of doing things, it is just that I think it is time for me to start doing certain things a litter different now and then.

### 1.1 - The start of the module and the create ball object method

The first method that I made for my ball module is a function that just creates and returns a ball object. This object contains the x and y position of the ball, as well as the radius, heading, and delta value of the ball.

```js

var b = {};
 
b.createBallObject = function (opt) {
    var ball = {};
    opt = opt || {};
    ball.x = opt.x === undefined ? 0 : opt.x;
    ball.y = opt.y === undefined ? 0 : opt.y;
    ball.r = opt.r === undefined ? 5 : opt.r;
    ball.h = opt.h === undefined ? 0 : opt.h;
    ball.d = opt.d === undefined ? 0 : opt.d;
    return ball;
};
```

### 1.2 - a Create ball collection method

I then have another method that I can use to create a collection of ball objects. This method calls my create ball object method a bunch of times and thus creates an array of ball objects.

```js
b.createBallCollection = function (opt) {
    var noop = function (ball, i) {
        ball.x = ball.r + ball.r * 3 * i;
        ball.y = ball.r;
    },
    i,
    ball,
    balls;
    opt = opt || {};
    opt.r = opt.r === undefined ? 5 : opt.r;
    opt.h = opt.h === undefined ? 5 : opt.h;
    opt.count = opt.count === undefined ? 4 : opt.count;
    opt.forBall = opt.forBall === undefined ? noop : opt.forBall;
 
    i = 0;
    balls = [];
    while (i < opt.count) {
        ball = b.createBallObject({
                r: opt.r,
                h: opt.h,
                d: opt.d,
            });
        opt.forBall(ball, i, opt);
        balls.push(ball);
        i += 1;
    }
    return balls;
};
```

### 1.3 - Move ball object method

Now for the method that moves the ball, and also checks to see if the ball hits any sides of the canvas. This works by passing a single ball object as the first arguments, and then a canvas as the second argument. The method will step the position of the ball based on the current heading and delta value for the ball. If the ball goes out of bounds for the canvas element adjustments are made.

```js
b.moveBallObject = function (ball, canvas) {
    canvas = canvas || {
        width: 320,
        height: 240
    };
    // move
    ball.x += Math.cos(ball.h) * ball.d;
    ball.y += Math.sin(ball.h) * ball.d;
    // boundaries
    if (ball.y >= canvas.height - ball.r) {
        ball.y = canvas.height - ball.r;
        ball.h = ball.h * -1;
    }
    if (ball.y <= ball.r) {
        ball.y = ball.r;
        ball.h = ball.h * -1;
    }
    if (ball.x >= canvas.width - ball.r) {
        ball.x = canvas.width - ball.r;
        ball.h = (ball.h + Math.PI) * -1
    }
    if (ball.x <= ball.r) {
        ball.x = ball.r;
        ball.h = (ball.h + Math.PI) * -1;
    }
};
```

## 2 - The draw methods

Now for the draw methods of this canvas example of bouncing balls. For now there are just two draw methods for this canvas example one for drawing a single ball object, and the other that draws a collection that just calls the draw ball method for each ball in a given collection.

### 2.1 - The draw ball object method

So I will want a draw method where I pass a ball object, and then a 2d context to draw to. The within the body of that draw method I just draw the current state of the ball object that was passed. I will also like a line drawn from the center of the ball outwards a little ways in the direction of the current heading of the ball.

```js
// draw a ball object
var drawBallObject = function (ball, ctx) {
    var x,
    y;
    // draw ball
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // draw heading line
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    x = Math.cos(ball.h) * ball.r * 2 + ball.x;
    y = Math.sin(ball.h) * ball.r * 2 + ball.y;
    ctx.lineTo(x, y);
    ctx.stroke();
};
```

### 2.2 - The draw ball collection method

Now that I have a draw ball method it is not so hard to make another draw method that will draw the whole collection. It just needs to loop over all the balls in the collection and draw the current status of each ball to the canvas.

```js
// draw ball collection
var drawBallCollection = function (balls, ctx) {
    balls.forEach(function (ball) {
        drawBallObject(ball, ctx);
    });
};
```

## 3 - The rest of the canvas example

Now for the rest of the canvas example that puts everything into action in main.js. Here I create the canvas element, as well as call my create ball collection method to get a ball collection to work with. There is also of course the main app loop of this canvas example here.

```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
 
ctx.translate(0.5, 0.5);
 
// create ball collection
var balls = b.createBallCollection({
        count: 4,
        r: 20,
        d: 1,
        forBall: function (ball, i, opt) {
            var space = 3.5;
            ball.x = canvas.width / 2 - ball.r * space * opt.count / 2 + ball.r * (space / 2) + ball.r * i * space;
            ball.y = canvas.height / 2;
            ball.h = Math.PI * 2 / opt.count * i + Math.PI * 0.25;
            //ball.h = Math.PI * 2 * Math.random();
        }
    });
 
var loop = function () {
    var i
    requestAnimationFrame(loop);
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw balls
    drawBallCollection(balls, ctx);
    // move all
    i = 0;
    while (i < balls.length) {
        b.moveBallObject(balls[i], canvas);
        i += 1;
    }
};
 
loop();
```

## 4 - Conclusion

The basic idea of what I had in mind for this example is there, but there is much more to writing about event when it comes to just making this basic kind of canvas example.
---
title: A Canvas example of bouncing balls
date: 2020-01-14 19:58:00
tags: [canvas]
categories: canvas
layout: post
id: 592
updated: 2021-02-14 17:45:52
version: 1.38
---

The subject of bouncing a ball around a canvas is a typical [canvas example](/2020/03/23/canvas-example/) for most beginners with javaScript and canvas, and I guess I have to admit that this is one that I find myself coming back to now and then also actually. I say that because even if you have been working with canvas and javaScript for a log time like I have, bouncing a ball around is one thing that I can never seem to get just right. On the surface it seems to be the kind of thing that is trivial, there is just a simple formula to be aware of, along with some basics concepts when it comes to collision detection, and that is all to it, yet often it is not so trivial. There is just bouncing a ball off of a wall, and then there is bouncing a ball off of other balls and surfaces. The code can start out easy, but then end up getting complicated fast, and if it is not done right, can result in all kinds of bugs.

In this post I will be going over some code that I put together for a basic bouncing ball canvas example. I will not be covering every little detail when it comes to this kind of example when it comes to advanced things pertaining to physics. However the canvas example will be about [bouncing balls of of the edges of walls of the canvas](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls) at least for starters.
 
However I would not stop here when it comes to looking for additional resources on this kind of canvas example. If you want to get a bounding ball project up and running fast it would be best to go with a framework like phaser that comes equipped with a physics engine that can be used to get something like this working fairly quickly. In this post however I will be sticking to just working with javaScript and canvas by itself, and one way to go about doing this sort of thing from the floor up.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/ball-bounce/0.1.0/pkg.js"></script>

## 1 - The ball module for the canvas example

So lets start out with the ball module for this canvas example. This is just a simple collection of methods that will create and return a ball object of sorts, and then other methods that will work with such an object. 

These days I am getting away from writing classes in favor of functional, or at least functional like modules. I am not suggesting that doing so is a better or worse way of doing things, it is just that I think it is time for me to start doing certain things a litter different now and then. In addition doing so gos beyond doing so just for the sake of novelty, as I find functional style programing cleaner, and easier to follow.

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

The delta value will be used in conjunction with the heading value to create a vector of sorts later on in this project. if you do not know what a vector is, it is just simply a direction and a magnitude. Or in other worlds an angle and a distance of length. Vectors are used in conjunction with points to create delta values of changes in the position of the points.

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
    return {
        ver: '0.0.0',
        balls: balls
    };
};
```

When  calling the method I can pass a for ball method that will be called for each ball object. Within the body of that function I can define logic that will be used to set the initial conditions of each ball object.

### 1.3 - Move ball object method

Now for the method that moves the ball, and also checks to see if the ball hits any sides of the canvas. This works by passing a single ball object as the first argument, and then a canvas as the second argument. The method will step the position of the ball based on the current heading and delta value for the ball. If the ball goes out of bounds for the canvas element adjustments are made to the x, y and heading values.

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

So then this is thus far the method where I am moving a ball object, and also the method where the bouncing is happening.

## 2 - The draw methods

In this section I will be going over the draw methods of this canvas example of bouncing balls. For now there are just two draw methods for this canvas example one for drawing a single ball object, and the other that draws a collection that just calls the draw ball method for each ball in a given collection. In time I will likely expand this section if I get around to sinking some more time into this example.

### 2.1 - The draw ball object method

So I will want a draw method where I pass a ball object, and then a 2d context to draw to. The within the body of that draw method I just draw the current state of the ball object that was passed. I will also like a line drawn from the center of the ball outwards a little ways in the direction of the current heading of the ball.

```js
// draw a ball object
var drawBallObject = function (ctx, ball) {
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
var drawBallCollection = function (ctx, canvas, ballCollection) {
    ballCollection.balls.forEach(function (ball) {
        drawBallObject(ctx, ball);
    });
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px courier';
    ctx.fillText('v' + ballCollection.ver, 10, canvas.height - 15);
};
```

## 3 - The rest of the canvas example

Now for the rest of the canvas example that puts everything into action in main.js. Here I create the canvas element, as well as call my create ball collection method to get a ball collection to work with. There is also of course the main app loop of this canvas example here.

```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
 
ctx.translate(0.5, 0.5);
 
// create ball collection
var ballCollection = b.createBallCollection({
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
    drawBallCollection(ctx, canvas, ballCollection);
    // move all
    i = 0;
    while (i < ballCollection.balls.length) {
        b.moveBallObject(ballCollection.balls[i], canvas);
        i += 1;
    }
};
 
loop();
```

Now for just a little html to pull this all together.

```html
<html>
    <head>
        <title>canvas example ball bounce</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="balls.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

The result when this is up and running is balls bouncing off the walls as expected. So the basic idea that I had in mind for this canvas example is working. However there is much more that comes to mind when it comes to cleaning this project up a bit, and also adding some additional functionality.

However there are things that I am getting right. When it comes to a project like this I am of course going to want to have objects that have an x and y property along with an angle that is the current heading and yet another that is the current distance to move from that point. So what needs to change has more to do with the logic that has to do with updating those values rather than the set of values themselves.

## 4 - Conclusion

The basic idea of what I had in mind for this example is there, but there is much more to write about even when it comes to just making this basic kind of canvas example. I would like to develop or find a better routine for bounding that will work with walls, and also other display objects.
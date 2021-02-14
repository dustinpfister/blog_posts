---
title: A javaScript breakout canvas example
date: 2020-02-13 17:25:00
tags: [canvas]
layout: post
categories: canvas
id: 612
updated: 2021-02-14 18:09:24
version: 1.27
---

This will be a post on a [canvas example](/2020/03/23/canvas-example/) that is a very basic [breakout](https://en.wikipedia.org/wiki/Breakout_(video_game)) clone. Even a basic example of this game might prove to be a little involved for new developers especially if you are starting from the ground up, and not using a framework as a lot of topics can still come up with the nature of this kind of game. Still breakout is often a good starting point when it comes to exercising a range of skills that are needed to make games in general using canvas and javaScript. In this example I will be using a fair amount of code that touches base on a wide range of topics when it comes to game development in general with javaScript and canvas elements.

I will try to keep things as striped down as possible for this canvas example, but it will still be a little involved with several javaScript files. I will not be getting into many subjects of interest that come up when making a game like this into detail, but I will still be touching base on them. For example there is bounding box collision detection, how to go about changing the angle of a ball when it hits a surface such as a wall or block, and many other such topics that deserve a post alone.

Cloning games like this is a good idea I think, and not just for the sake of practice. When it comes to cloning a game like breakout there is not just cloning the mechanics of the game, but also adding my own features and tweaks that help to make the project distinct from all the other breakout clones on the open Internet. Cloning the game is often just a starting point for a project like this.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-breakout/0.1.2/pkg.js"></script>

## 1 - The custom utils lib

I worked out a basic custom utils library for this canvas example. This library has methods that I will be using in the game module, but also likely elsewhere if this project where to continue growing. For now it is just methods that have to do with bounding box collision detection, distance, and normalizing angles.

```js
var util = {};
 
util.TAU = Math.PI * 2;
util.EPS = 1e-15;
 
util.mod = function mod(x, m) {
    return (x % m + m) % m;
};
 
util.boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < (y2) ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
 
util.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// normalize angle method
util.angleNormalize = function (a, scale) {
    return util.mod(a, scale || util.TAU);
};
 
util.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    var x = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
    y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top;
    return {
        x: x,
        y: y,
        bx: bx
    };
};
```

## 2 - The game modules

Here in this section I have the main game module of this breakout canvas example. This module has many methods that are used for creating a block array, balls array, paddle object, and game state object in general. There are also many methods both private and public for working with this state object.

## 2.1 - The start of the module and the create blocks helper

The whole of the game module is wrapped in an IIFE or immediately invoked function expression that returns a public API to a single global variable called game. The first private method that I have inside the body of this IIFE is a function that creaks the array of blocks.

```js
var breakout = (function () {
 
    // create a blocks grid
    var createBlocks = function (opt) {
        opt = opt || {};
        opt.sx = opt.sx || 0;
        opt.sy = opt.sy || 0;
        opt.blockWidth = opt.blockWidth || 32;
        opt.blockHeight = opt.blockHeight || 16;
        opt.gridWidth = opt.gridWidth || 4;
        opt.gridHeight = opt.gridHeight || 4;
        var blocks = [],
        i = 0,
        len = opt.gridWidth * opt.gridHeight;
        while (i < len) {
            var gx = i % opt.gridWidth,
            gy = Math.floor(i / opt.gridWidth);
            blocks.push({
                gx: gx,
                gy: gy,
                x: opt.sx + gx * opt.blockWidth,
                y: opt.sy + gy * opt.blockHeight,
                w: opt.blockWidth,
                h: opt.blockHeight,
                points: 1,
                i: i
            });
            i += 1;
        }
        return blocks;
    };
```

### 2.2 - Move the paddle helper

This is a method that will move the paddle by the current state values, and a secs value that is passed from the method that call this where such a value has been figured before hand. Left and right values in the state object are set by and external event handler from this method.

```js
    // move the paddle
    var movePaddle = function (state, secs) {
        var paddle = state.paddle,
        d = 0;
        // set direction
        if (state.input.left) {
            d = -1;
        }
        if (state.input.right) {
            d = 1;
        }
        if (state.input.left && state.input.right) {
            d = 0;
        }
        // move paddle
        paddle.x += paddle.pps * secs * d;
        // bounds
        if (paddle.x + paddle.w > state.canvas.width) {
            paddle.x = state.canvas.width - paddle.w;
        }
        if (paddle.x < 0) {
            paddle.x = 0;
        }
    };
```

### 2.3 - Ball block hit check, ball paddle hit check, and ball boundaries hit check

So then I am also going to need methods to check if a block was hit, and if so splice it out from the blocks array. I am also going to need similar methods for when a ball in the balls array hits the paddle, or a wall.

```js
    // check if a ball hit a block, and purge it if it did
    var ballBlockHitCheck = function (ball, state) {
        var blocks = state.blocks,
        i = blocks.length,
        bl;
        while (i--) {
            bl = blocks[i];
            if (util.boundingBox(ball.x, ball.y, 1, 1, bl.x, bl.y, bl.w, bl.h)) {
                state.score += bl.points;
                blocks.splice(i, 1);
                if (blocks.length === 0) {
                    setGame(state);
                }
            }
        }
    };
 
    // check if a ball hot a wall
    var ballBounds = function (ball, canvas) {
        if (ball.y <= ball.radius) {
            ball.y = ball.radius;
            ball.heading = ball.heading * -1;
        }
        if (ball.x >= canvas.width - ball.radius) {
            ball.x = canvas.width - ball.radius;
            ball.heading = (ball.heading + Math.PI) * -1
        }
        if (ball.x <= ball.radius) {
            ball.x = ball.radius;
            ball.heading = (ball.heading + Math.PI) * -1;
        }
    };
 
    // check if a ball has hit the paddle and change ball heading if it did.
    var ballPaddleHitCheck = function (ball, paddle) {
        if (util.boundingBox(ball.x, ball.y, 1, 1, paddle.x, paddle.y, paddle.w, paddle.h)) {
            ball.heading = Math.PI * 1.5;
            ball.y = paddle.y;
            var d = util.distance(ball.x, ball.y, paddle.x + paddle.w / 2, paddle.y),
            per = d / (paddle.w / 2),
            dir = ball.x < paddle.x + paddle.w / 2 ? -1 : 1,
            a = Math.PI / 4 * per * dir;
            ball.heading = Math.PI * 1.5 + a;
        }
    };
```

### 2.4 - reset balls array

Here I have a methods that are used to set one or more balls back to there starting positions. 

With the reset ball method I wanted to make it so an array of balls would be spaced out evenly over the paddles starting location at the center of the canvas. So I worked out an xAjust expression of sorts that will change depending if there is just one ball or more than one.

```js
    // reset a ball
    var resetBall = function (ballIndex, state) {
        var ball = state.balls[ballIndex],
        len = state.balls.length,
        xAjust = len === 1 ? 0 : -60 + 120 / (len - 1) * ballIndex,
        per = ballIndex / len;
        ball.x = state.canvas.width / 2 + xAjust;
        ball.y = state.canvas.height / 1.5;
        ball.heading = Math.PI / 2;
    };
 
    // reset all balls
    var resetAllBalls = function (state) {
        var i = state.balls.length;
        while (i--) {
            resetBall(i, state);
        }
    };
```

### 2.5 - Add one or more balls to a state

This method will add a count of balls to the balls array. Although it sets some starting values for x and y for the balls it is not a replacement for my reset ball method. I could just have a single ball object that would help to simplify things here, however one of the advanced features of a breakout style game is having two or more balls at once and I wanted to lay the foundation for that with this.

```
    // make a ball object
    var addBalls = function (state, count) {
        count = count || 1;
        var canvas = state.canvas,
        i = count,
        ball;
        state.balls = state.balls || [];
        while (i--) {
            ball = {
                x: canvas.width / 2 - 60,
                y: canvas.height / 1.5,
                radius: 5,
                heading: Math.PI - Math.PI / 4,
                pps: 128
            };
            state.balls.push(ball);
        }
        return ball;
    };
```

### 2.6 - move balls

This method will of course move all the balls in the balls array of the state object. However it is also here where I am preforming all kinds of checks to see if the ball hit anything also.

```js
    // move balls
    var moveBalls = function (state, secs) {
        var i = 0,
        ball,
        len = state.balls.length,
        paddle = state.paddle;
        while (i < len) {
            ball = state.balls[i];
            // move ball
            ball.x += Math.cos(ball.heading) * ball.pps * secs;
            ball.y += Math.sin(ball.heading) * ball.pps * secs;
            // out?
            if (ball.y >= state.canvas.height + ball.radius) {
                // reset ball
                resetBall(i, state);
            }
            // hit a wall?
            ballBounds(ball, state.canvas);
            ballBlockHitCheck(ball, state);
            // hit the paddle?
            ballPaddleHitCheck(ball, state.paddle);
            // make sure ball heading is normalized
            ball.heading = util.angleNormalize(ball.heading);
            i += 1;
        }
    };
```

### 2.7 - set game state and balls

This set game method will not create a new state object, but will set up a new game for the state object. It will create a new blocks array, set all balls to there starting position, and will also rest the paddle to the center also. The main create state method of the brakout module should only be called once when starting up the applaction for the first time, moe on that later.

```
    // set game state and balls
    var setGame = function (state) {
        var canvas = state.canvas;
        state.blocks = createBlocks({
                sx: 32,
                sy: 32,
                blockWidth: (canvas.width - 64) / 8,
                blockHeight: 16,
                gridWidth: 8,
                gridHeight: 5
            });
        state.balls = [];
        addBalls(state, 3);
        resetAllBalls(state);
        state.paddle = {
            x: canvas.width / 2 - 60,
            y: canvas.height - 30,
            w: 120,
            h: 15,
            pps: 128
        };
    };
```

### 2.8 - Pointer handers

As of version 0.1.x I have added support for mouse and touch events, as that of course should be there when it comes to having a working package up on the page here. So there is an object with handers for pointer start, move, and end events as well as a main function that will wrap a state object, and return a hander that will be used later on in this module in the public API.

```js
    var pointerHandlers = {
        start: function (state, e) {
            state.input.pointerDown = true;
        },
        move: function (state, e) {
            // just need to update state.input.pos in main hander
            // put we can expand here later of needed
        },
        end: function (state, e) {
            state.input.pointerDown = false;
            state.input.left = false;
            state.input.right = false;
        }
    };
 
    var createPointerHandler = function (state, type) {
        return function (e) {
            var pos = state.input.pos = util.getCanvasRelative(e);
            e.preventDefault();
            pointerHandlers[type](state, e, pos);
        };
    };
```

### 2.9 - The public api and the end of the module

Now that I have all the private methods out of the way it is now time to look at the public methods that can be used to work with this module from the outside in my main.js file.

```
    var api = {};
 
    // create a new game state
    api.createNewState = function (canvas) {
 
        canvas = canvas || {
            width: 320,
            height: 240
        };
 
        // create the state object
        var state = {
            ver: '0.1.1',
            score: 0,
            input: {
                pointerDown: false,
                pos: {},
                left: false,
                right: false
            },
            canvas: canvas,
            balls: [],
            blocks: [],
            paddle: {}
        };
 
        // set game for first time
        setGame(state);
 
        // attach pointer handlers
        canvas.addEventListener('mousedown', createPointerHandler(state, 'start'));
        canvas.addEventListener('mousemove', createPointerHandler(state, 'move'));
        canvas.addEventListener('mouseup', createPointerHandler(state, 'end'));
        canvas.addEventListener('touchstart', createPointerHandler(state, 'start'));
        canvas.addEventListener('touchmove', createPointerHandler(state, 'move'));
        canvas.addEventListener('touchend', createPointerHandler(state, 'end'));
 
        // keyboard handlers
        window.addEventListener('keydown', function (e) {
            var key = e.key.toLowerCase();
            if (key === 'a') {
                state.input.left = true;
            }
            if (key === 'd') {
                state.input.right = true;
            }
        });
        window.addEventListener('keyup', function (e) {
            var key = e.key.toLowerCase();
            if (key === 'a') {
                state.input.left = false;
            }
            if (key === 'd') {
                state.input.right = false;
            }
        });
 
        return state;
    };
 
    // Pointer movement helper
    var pointerMove = function (state) {
        var pos = state.input.pos;
        if (state.input.pointerDown) {
            state.input.left = false;
            state.input.right = false;
            if (pos.x < state.paddle.x + state.paddle.w / 3) {
                state.input.left = true;
                state.input.right = false;
            }
            if (pos.x > state.paddle.x + state.paddle.w - state.paddle.w / 3) {
                state.input.left = false;
                state.input.right = true;
            }
        }
    };
 
    // update the given state object with the given amount of time
    // passed sense last update in seconds
    api.update = function (state, secs) {
        movePaddle(state, secs);
        moveBalls(state, secs);
        pointerMove(state);
    };
 
    return api;
 
}
    ());
 
```

## 3 - The draw module

I then have a draw module that can be used to draw many aspects of the a current state of a game state object created with the game module.

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.blocks = function (ctx, state) {
    ctx.fillStyle = 'rgba(0,255,0,0.5)';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    state.blocks.forEach(function (block) {
        ctx.beginPath();
        ctx.rect(block.x, block.y, block.w, block.h);
        ctx.fill();
        ctx.stroke();
    });
};
 
draw.paddle = function (ctx, state) {
    var paddle = state.paddle;
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fill();
    ctx.stroke();
};
 
draw.balls = function (ctx, state) {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'white';
    state.balls.forEach(function (ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    });
};
 
draw.info = function (ctx, canvas, state) {
    ctx.fillStyle = 'white';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.fillText('v' + state.ver, 5, canvas.height - 15);
    ctx.fillText(state.score, 5, 5);
};
 
```

## 4 - main.js and index.html

Now to tie everything together with a main.js file and and html file. I get a reference to a single canvas element in the html, and a reference to the drawing context as with any other canvas project.

Once I have my canvas element to work with I then pass it as the one argument for my create new state public method for the game module. I set up a two event handler for the window objects keydown and keyup events where I set the left and right values of the state input object that will be the only way to move the paddle for now.

```js
(function () {
 
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    var state = breakout.createNewState(canvas);
 
    var lt = new Date(),
    FPS_target = 30;
    var loop = function () {
        var now = new Date(),
        t = now - lt,
        secs = t / 1000;
        requestAnimationFrame(loop);
        if (t >= 1000 / FPS_target) {
            breakout.update(state, secs);
            draw.background(ctx, canvas);
            draw.blocks(ctx, state);
            draw.paddle(ctx, state);
            draw.balls(ctx, state);
            draw.info(ctx, canvas, state);
            lt = now;
        }
    };
    loop();
 
}
    ());
```

Now for just a little html to pull eventing together by providing a hard coded container element, and script tags that link to all the modules that I have coved above.

```html
<html>
    <head>
        <title>canvas breakout</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="utils.js"></script>
        <script src="game.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Conclusion

When this canvas example is up and working as expected the game just starts out right away with an array of balls coming at the paddle. The a and d keys on the keyboard can be used to move the paddle, and there balls just re spawn when the go out of bounds for now. Once all the blocks are hit with a ball, the game will just reset again.

There is much more to do when it comes to turning this into something that will start to resemble and actual game, but for now the basic idea is there.
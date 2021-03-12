---
title: Pop The Lock Canvas Example Game Clone
date: 2019-11-26 21:22:00
tags: [js, canvas]
layout: post
categories: canvas
id: 571
updated: 2021-03-12 15:05:29
version: 1.32
---

A long time ago I played a game called [pop the lock on android](https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en_US), and managed to end up getting hooked for a while. It was a very simple game that just involved a circle moving along the path of another circle, and once it gets close to a target area you need to tap the screen or else you loose, you also loose if you tap to soon. I can then try again and the object is to repeat this process up to a certain count of times to unlock a lock.

I find myself making clones of this game now and then, in part because it is so easy to make a game like this. It is the kind of game where I can make a working clone within just about an hour or so when I am working at my best. Many of the game prototypes that I have made so far are the kind of projects where it takes a long time to get something together that is just starting to look like a game, but things do not always have to be that way when it comes to this sort of thing, a game can be simple. It is also a great example of what really matters when making a game which is just to make something that is fun, or addictive in a distinct unique way.

So todays [canvas example](/2020/03/23/canvas-example/) will be a game that is a clone of this pop the lock game to some extent, but a little different. I want to play around with the various values that come to mind when making a game like this, and maybe make it work a little differently altogether so it is not just a full rip off of the original.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pop-the-lock/0.3.0/pkg.js"></script>

## 1 - The game.js module for pop the lock

For this canvas example I made a game module that will be used to create and return a game state object, as well as provide methods to update that state object.

The game object contains values such as the current degree of the point in motion, and a value that reflects the total number of degrees in the main circle of the game. In addition there is also a target degree, and margin value that can be used to result in a range area in the circle. This range is the area where the payer will score if they make an action such as clicking or touching the canvas when the current degree is in that range. There are also a number of other values that have to do with the rate at which the current degree will move as well as the current direction, and a boolean that indicates that the current degree is in the range.

```js
var gameMod = (function(){
    // helpers
    var getInRange = function (game) {
        return game.deg.current >= game.deg.target - game.deg.margin && game.deg.current <= game.deg.target + game.deg.margin;
    };
    var randomTarget = function (game) {
        game.deg.target = Math.floor(Math.random() * (game.deg.total - game.deg.margin * 2)) + game.deg.margin;
    };
    // public API
    var api = {};
    // create method
    api.create = function(){
        var game = {
            ver: '0.1.0',
            deg: {
               perSec: 40,
               current: 0,
               target: 4,
               total: 100,
               margin: 4
            },
            dir: -1,
            inRange: false,
            score: 0
        };
        randomTarget(game);
        return game;
    };
    // update
    api.update = function(game, secs){
        game.deg.current +=  game.deg.perSec * secs * game.dir; 
        game.deg.current = utils.mod(game.deg.current, game.deg.total); 
        game.inRange = getInRange(game);
    };
    // create click handler
    api.click = function (game) {
        //return function(e){
            game.score += game.inRange ? 1 : -1;
            if (game.inRange) {
                game.dir = game.dir === 1 ? -1 : 1;
                randomTarget(game);
            }
        //};
    };
    // return public api
    return api;
}());
```

In this module I am making use of a utils library that contains many useful methods such as mathematical modulo. I will be getter to that in a later section in this post.

So now that I have a game module worked out I am going to want to have some additional code that is used to draw the state of one of these game state objects to the canvas. In additional I am also going to want to have some javaScript code that will provide a main app loop, and a state machine that will be needed when it comes to continuing to expand this.

## 2 - The draw method

So now that I have the game state object worked out it is time to work out a draw method for it, as well as some additional draw methods for the project as a whole. In this example I am not doing anything fancy with layering, sprites, and so forth. So I just have a collection of draw methods for drawing things like a solid color background, the current version number, and the current state of things when it comes to the game state object of course. I took the time to break things down into a whole bunch of helper methods, and then have just a few public drawing methods that I will be using in my main.js file.

```js
var draw = (function(){
    // draw base circle
    var baseCircle = function(ctx, canvas){
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
        ctx.stroke();
    };
    // draw target range
    var targetRange = function(ctx, canvas, game){
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 100,
            utils.mod(game.deg.target - game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2,
            utils.mod(game.deg.target + game.deg.margin, game.deg.total) / game.deg.total * Math.PI * 2);
        ctx.stroke();
    };
    // info
    var info = function(ctx, canvas, game){
        ctx.fillStyle = 'yellow';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = 0.35;
        ctx.font = '10px arial';
        ctx.fillText('deg.current ' + game.deg.current.toFixed(2), 10, 10);
        ctx.fillText('inrange ' + game.inRange, 10, 20);
    };
    // draw current position
    var current_pos = function(ctx, canvas, game){
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        var r = game.deg.current / game.deg.total * Math.PI * 2,
        x = Math.cos(r) * 100 + canvas.width / 2,
        y = Math.sin(r) * 100 + canvas.height / 2;
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
    };
    // score
    var score = function(ctx, canvas, game){
        ctx.fillStyle = game.score > 0 ? 'green' : 'red';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '25px arial';
        ctx.fillText(game.score, canvas.width / 2, canvas.height / 2);
    };
    // public api
    var api = {};
    // background
    api.background = function(ctx, canvas, style){
        ctx.globalAlpha = 1;
        ctx.fillStyle = style || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // Pop The Lock
    api.PTL = function (ctx, canvas, game) {
        baseCircle(ctx, canvas);
        targetRange(ctx, canvas, game);
        current_pos(ctx, canvas, game);
        score(ctx, canvas, game);
        info(ctx, canvas, game);
    };
    // version
    api.ver = function(ctx, canvas, game){
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.font='10px arial';
        ctx.textAlign = 'left';
        ctx.fillText('v' + game.ver, 5, canvas.height - 15);
    };
    // return public API
    return api;
}());
```

If I put more time into this project this will end up getting broken down into many methods and will be pulled into a file of its one which is often the case with many of these canvas examples.

## 3 - The utils lib

Like all my other canvas examples these days I have a utils library where I park functions that I will likely use in more than one file in a project, and also might copy and paste over to other utils libraries in other canvas examples. For pop the lock thus far as of version 0.0.0 I am just using my create canvas method that is more or less standard for canvas examples now.

```js
var utils = {};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
// mathematical modulo
utils.mod = function (x, m) {
    return (x % m + m) % m;
};
// create a canvas
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
// get canvas relative point
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 4 - The canvas, main app loop, and the html

So now to make use of everything I worked out in a main javaScript file that will proved the main app loop and the state machine. In this main.js file I create a canvas with the create canvas utils method, and get the drawing context to it.

I then create the state machine object that will contain a game state object as one of itself properties. I then start to create at least one game state, that will have methods for updating, drawing and clicking.

In the main app loop I am calling the game module update method of my pop the lock game module, and passing the game object that I created with the game module create method. I am also using the draw method I have worked out to draw the current state of the game state object in the canvas element. I am also of course using request animation frame as always to create the app loop for the canvas example as with just about any other.

```js
// SETUP CANVAS
(function(){
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    }),
    canvas = canvasObj.canvas,
    ctx = canvasObj.ctx;
    // STATE MACHINE
    var sm = {
        game : gameMod.create(),
        lt : new Date(),
        currentState: 'game',
        states: {}
    };
    // GAME STATE
    sm.states.game = {
        update: function(sm, secs){
            gameMod.update(sm.game, secs);
        },
        draw: function(sm, ctx, canvas){
            draw.PTL(ctx, canvas, sm.game);
        },
        click: function(sm, pos, e){
            gameMod.click(sm.game);
        }
    };
    // LOOP
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        sm.states[sm.currentState].update(sm, secs);
        draw.background(ctx, canvas, '#0a0a0a');
        sm.states[sm.currentState].draw(sm, ctx, canvas);
        draw.ver(ctx, canvas, sm.game);
        sm.lt = now;
    };
    loop();
    // attach event hanlder
    canvas.addEventListener('click', function(e){
        var pos = utils.getCanvasRelative(e);
        sm.states[sm.currentState].click(sm, pos, e);
    });
}());
```

Now that I have covered everything that composes the main.js file I just need a little HTML to get this up and running. In my html I just have a div element that I am using for a container element to which the canvas element gets injected in when my main.js file runs, and then of course I have a script tag that links to my main.js file.

```html
<html>
    <head>
        <title>canvas example pop the lock</title>
    </head>
    <body>
        <div id="canvas-app"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/game.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When this game is up and running it works as I would expect as the circle along the other edge moves alone one way or another. If I tab the canvas when the circle is in the range the score will go up otherwise the score will go down. At the time of this writing I am not sure what to do differently, so I just have the basic core idea of the game working for now. There is working out additional logic when it comes to how to go about tripping up the player rather than just having random locations, along with many other such ideas. However for now this is just about it I think.

## 5 - Conclusion

This was a quick, and fun little project that I put together in a flash, but is all ready starting to feel like a game. However there is still a great deal of room for improvement with it also, and I have yet to find a way to turn this kind of project into some more distinct from what I am cloning so that it is not just a knock off. I like to try to keep the projects in these canvas examples posts fairly simple and basic though so that I do not have to write an extremely lengthly amount of written content outlining the example.
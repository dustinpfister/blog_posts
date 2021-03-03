---
title: Pop The Lock Canvas Example Game Clone
date: 2019-11-26 21:22:00
tags: [js, canvas]
layout: post
categories: canvas
id: 571
updated: 2021-03-03 14:47:13
version: 1.24
---

A long time ago I played a game called [pop the lock on android](https://play.google.com/store/apps/details?id=com.sm.popTheLock&hl=en_US), and managed to end up getting hooked for a while. It was a very simple game that just involved a circle moving along the path of another circle, and once it gets close to a target area you need to tap the screen or else you loose, you also loose if you tap to soon. I can then try again and the object is to repeat this process up to a certain count of times to unlock a lock.

I find myself making clones of this game now and then, in part because it is so easy to make a game like this. It is the kind of game where I can make a working clone within just about an hour or so when I am working at my best. Many of the game prototypes that I have made so far are the kind of projects where it takes a long time to get something together that is just starting to look like a game, but things do not always have to be that way when it comes to this sort of thing, a game can be simple. It is also a great example of what really matters when making a game which is just to make something that is fun, or addictive in a distinct unique way.

So todays [canvas example](/2020/03/23/canvas-example/) will be a game that is a clone of this pop the lock game to some extent, but a little different. I want to play around with the various values that come to mind when making a game like this, and maybe make it work a little differently altogether so it is not just a full rip off of the original.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/pop-the-lock/0.0.0/pkg.js"></script>

## 1 - The state and methods of the pop the lock canvas example

So I started off this canvas example with just a plain old object that will serve as both a state, as well as a collection of methods that will work with that state.

The object contains values such as the current section of the point in motion, and a value that reflects the total number of sections in the main circle of the game. In addition there is also a target section, and margin value that can be used to result in a range in the circle. This range is the area where the payer will score if they make an action when the current section is in that range. There are also a number of other values that have to do with the rate at which the current section will move as well as the current direction, and a boolean that indicates that the current section is in the range.

The methods I worked out have to do with wrapping a section value, figuring out if the current section is in range or not, and event handler for use action. I Also have a main tick method that will be called on each loop of a main app loop, and another method that will set the current target section value.

```js
// STATE
var ptl = {
    ver: '0.0.0',
    sec_current: 0,
    sec_target: 4,
    sec_total: 100,
    sec_margin: 4,
    tick_dir: -1,
    tick_rate: 30,
    tick_last: new Date(),
    inRange: false,
    score: 0,
    // wrap a sec value
    wrapSec: function (sec) {
        if (sec > this.sec_total) {
            sec %= this.sec_total;
        }
        if (sec < 0) {
            sec = this.sec_total - (this.sec_total + Math.abs(sec)) % this.sec_total;
        }
        return sec;
    },
    // get in range boolean
    getInRange: function () {
        return this.sec_current >= this.sec_target - this.sec_margin && this.sec_current <= this.sec_target + this.sec_margin;
    },
    // user clicked to touched the canvas
    click: function (e) {
        ptl.score += ptl.inRange ? 1 : -1;
        if (ptl.inRange) {
            ptl.tick_dir = ptl.tick_dir === 1 ? -1 : 1;
            ptl.randomTarget();
        }
    },
    randomTarget: function () {
        this.sec_target = Math.floor(Math.random() * (this.sec_total - this.sec_margin * 2)) + this.sec_margin;
    },
    // tick
    tick: function () {
        var time = new Date() - this.tick_last,
        ticks = time / this.tick_rate;
        this.sec_current += ticks * this.tick_dir;
        this.sec_current = this.wrapSec(this.sec_current);
        this.inRange = this.getInRange();
        this.tick_last = new Date();
    }
};
```

I often do start out with this kind of module pattern when it comes to simple canvas example projects.

## 2 - The draw method

So now that I have the state object worked out it is time to work out a draw method for it. In this example I am not doing anything fancy with layering, sprites, and so forth. Just a single draw method that renders the current state of the game that will be called on each frame tick. For now I went with something that just draws everything in just one method.

```js
// DRAW
var drawPTL = function (ptl, ctx, canvas) {
 
    var r,
    x,
    y;
 
    // background
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // draw base circle
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
    ctx.stroke();
 
    // draw target range
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 100,
        ptl.wrapSec(ptl.sec_target - ptl.sec_margin) / ptl.sec_total * Math.PI * 2,
        ptl.wrapSec(ptl.sec_target + ptl.sec_margin) / ptl.sec_total * Math.PI * 2);
    ctx.stroke();
 
    // draw current
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    r = ptl.sec_current / ptl.sec_total * Math.PI * 2;
    x = Math.cos(r) * 100 + canvas.width / 2;
    y = Math.sin(r) * 100 + canvas.height / 2;
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.stroke();
 
    // score
    ctx.fillStyle = ptl.score > 0 ? 'green' : 'red';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '25px arial';
    ctx.fillText(ptl.score, canvas.width / 2, canvas.height / 2);
 
    // info
    ctx.fillStyle = 'yellow';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.globalAlpha = 0.35;
    ctx.font = '10px arial';
    ctx.fillText('sec_current ' + ptl.sec_current.toFixed(2), 10, 10);
    ctx.fillText('inrange ' + ptl.inRange, 10, 20);
 
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font='10px arial';
    ctx.textAlign = 'left';
    ctx.fillText('v' + ptl.ver, 5, canvas.height - 15);
};
```

If I put more time into this project this will end up getting broken down into many methods and will be pulled into a fle of its one which is often the case with many of these canvas examples.

## 3 - The canvas, main app loop, and the html

So now to make use of everything I work out here. I just create a canvas and get the drawing context to it, and then append to a canvas app div that I have in my html. I set the width and height, and attach a single event that I worked out in my state object. I then set the first random section, and define and start the main game loop.

In the main app loop I am canning the tick method of my pop the lock state object, and I am also using the draw method I have worked out to draw the current state of the state object in the canvas element. I am also of course using request animation frame as always to create the app loop for the canvas example as with just about any other.

```js
// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvasObj = utils.createCanvas({
        width: 320,
        height: 240
    });
    var canvas = canvasObj.canvas;
    var ctx = canvasObj.ctx;
    canvas.addEventListener('click', ptl.click);
    ptl.randomTarget();
    var loop = function () {
        requestAnimationFrame(loop);
        ptl.tick();
        drawPTL(ptl, ctx, canvas);
    };
    loop();
}
    ());
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
        <script src="main.js"></script>
    </body>
</html>
```

When this game is up and running it works as I would expect as the circle along the other edge moves alone one way or another. If I tab the canvas when the circle is in the range the score will go up otherwise the score will go down. At the time of this writing I am not sure what to do differently, so I just have the basic core idea of the game working for now. There is working out additional logic when it comes to how to go about tripping up the player rather than just having random locations, along with many other such ideas. However for now this is just about it I think.

## 5 - Conclusion

This was a quick, and fun little project that I put together in a flash, but is all ready starting to feel like a game. However there is still a great deal of room for improvement with it also, and I have yet to find a way to turn this kind of project into some more distinct from what I am cloning so that it is not just a knock off. I like to try to keep the projects in these canvas examples posts fairly simple and basic though so that I do not have to write an extremely lengthly amount of written content outlining the example.
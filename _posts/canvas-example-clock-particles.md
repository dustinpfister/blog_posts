---
title: A canvas example of a particle clock
date: 2020-05-06 11:45:00
tags: [canvas]
layout: post
categories: canvas
id: 655
updated: 2021-02-14 17:51:25
version: 1.28
---

I have made a [basic clock canvas example before](/2019/12/13/canvas-example-clock-basic/) however maybe now it is time for another [canvas example](/2020/03/23/canvas-example/) of a clock this time maybe I can make it into something a little more interesting. There are many things that come to mind when it comes to ideas for canvas clock projects, but for now I think that it might be best to start out with something only slightly more advanced from my basic canvas clock example.

This will be a clock that involves a pool of display objects or particles as they are some times called that move around the canvas. As the day progresses the count of particle objects that are active will increase to to a certain point at which it will come back down again. 

This is just one silly little idea that came to mind when it comes to be thing about making some additional canvas examples that are just basic clock like projects. Making clocks is a nice diversion from other canvas projects such as games that can become very complicated and time consuming endeavorers. My experience with making clocks thus far however has been a more rewarding, and therapeutic experience thus far. Just like with games there is a lot of room for originally and creativity, so lets take a look at this slightly more advanced canvas clock with particle objects.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/clock-particles/0.1.0/pkg.js"></script>

## 1 - The Utils.js for this particles clock example

I often have a general utility library in my canvas examples, this is just a place where I will park methods that I think that I will be using in two or more modules in the source code. Often that is not the case when I keep many of these fairly simple, however I do that anyway.

For this canvas example I just have a distance method, and a method that helps me with padding a string.

```js
// UTILS
var utils = {};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// pad a value
utils.pad = function (a) {
    return String('00' + a).slice(-2);
};
 
// create a canvas element
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
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
```

So now that I have that out of the way lets move on to the actual clock module.

## 2 - Clock.js

The clock.js file creates a module that is used to create the main state object for this canvas example. I then use this state object with another module in my draw.js file that will draw the state of this object to the canvas. In my basic clock example I just had a create method that would be used over an over again to create an up to date clock object, however in this example I have both a create method and an update method. The reason why is that I do not want to recreate the pool of particles over and over again each time.

### 2.1 - The start of the module, getTimeText and getDayStart

At the top of the module I have a helper method that I use to create a text format of the current time. After that I have another helper method that returns a date the represents the starting time of the current day, this is used to find a percent value for the progression of the current day later on.

```js
var clockMod = (function () {
 
    var getTimeText = function (clock) {
        return u.pad(clock.now.getHours()) + ' : ' +
        u.pad(clock.now.getMinutes()) + ' : ' +
        u.pad(clock.now.getSeconds());
    };
 
    var getDayStart = function (clock) {
        return new Date(clock.now.getFullYear(), clock.now.getMonth(), clock.now.getDate(), 0, 0, 0, 0)
    };
```

### 2.2 - Set particle

I then have another helper that I use to set the speed and heading of a given particle. This is called when creation the pool for the first time, and also each time a particle reaches the outer edge of the time ring that I have made for the clock face.

```js
    var setPart = function (clock, part) {
        var weekPer = (clock.now.getDay()+1) / 7,
        baseSpeed = 16 + 32 * weekPer,
        deltaSpeed = 96 * weekPer * Math.random();
        part.pps = baseSpeed + deltaSpeed;
        part.heading = Math.PI * 2 * Math.random();
    };
```

### 2.3 - Create the pool

Here I have the method that is used to create the particle pool for the first time. Each particle object will have an index value as well as its current x and y position. In addition a particle will have a pps value or pixels per second value that is used to set the speed at which the particle will move, along with a heading value that will of course be the direction it will be moving.

```js
    var createPool = function (clock, count) {
        var i = 0,
        pool = [],
        part;
        while (i < count) {
            part = {
                i: i,
                x: 0,
                y: 0,
                pps: 0,
                heading: 0,
                active: false
            };
            setPart(clock, part);
            pool.push(part);
            i += 1;
        }
        return pool;
    };
```

### 2.4 - set particles active

I set particle to active based on the current day percent value of the clock object.

```js
    var setActivePoolParts = function (clock) {
        var len = clock.pool.length,
        i = len,
        part;
        clock.poolTotalActive = Math.floor(len * (1 - Math.abs(0.5 - clock.dayPer) / 0.5));
        while (i--) {
            part = clock.pool[i];
            part.active = false;
            if (part.i <= clock.poolTotalActive) {
                part.active = true;
            }
        }
    };
```

### 2.5 - update the pool

Update the pool moving each particle that is currently set to active.

```js
    var updatePool = function (clock, secs) {
        var i = clock.pool.length,
        part;
        while (i--) {
            part = clock.pool[i];
            if (part.active) {
                part.x += Math.cos(part.heading) * part.pps * secs;
                part.y += Math.sin(part.heading) * part.pps * secs;
                if (u.distance(part.x, part.y, 0, 0) >= clock.faceRadius) {
                    part.x = 0;
                    part.y = 0;
                    setPart(clock, part);
                }
            }
        }
    };
```

### 2.6 - Set props to now

Set the day percent value and sec percent value of the clock object to there current values.

```js
    var setClockPropsToNow = function (clock) {
        clock.timeText = getTimeText(clock);
        var dayStart = getDayStart(clock);
        clock.dayPer = (clock.now - dayStart) / 86400000;
        clock.secPer = clock.now.getMilliseconds() / 1000;
    };
```

### 2.7 - The public API

The public API of the clock module consists of just two methods, one to create a clock object and the other to update one. So then in the main javaScriopt file of this canvas example I just need to call the create method, and then inside the body of an update loop call the update method passing a date object for the current time.

```js
    // return a public method that creates a clock object
    return {
        create: function (now) {
            var clock = {};
            clock.ver = '0.1.0';
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
            clock.pool = createPool(clock, 240);
            clock.poolLastTick = now;
            clock.poolTotalActive = 0;
            clock.faceRadius = 100;
            return clock;
        },
 
        update: function (clock, now) {
            //clock.now = new Date(2020, 4, 9, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
            var t = clock.now - clock.poolLastTick,
            secs = t / 1000;
            setActivePoolParts(clock);
            updatePool(clock, secs);
            clock.poolLastTick = clock.now;
            return clock;
        }
    }
 
}
    ());

```

## 3 - Draw.js

In the draw.js file I have a bunch of methods that I use to draw the state of a clock object to a canvas element. I break alot of things down into separate methods to help keep things a little more fine grain. For example I have a draw method to just draw the text part of the clock face.

```js
var draw = {};
 
draw.clear = function (canvas, ctx) {
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
};
 
// draw a clock to a canvas
draw.clockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '40px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // percent done of day
    var text = clock.poolTotalActive; // Math.floor(clock.dayPer * 100) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 20);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2 - 20);
    // time
    ctx.font = '30px arial';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
};
 
draw.pool = function (canvas, ctx, clock) {
    var i = clock.pool.length,
    d,
    part;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    while (i--) {
        part = clock.pool[i];
        d = u.distance(part.x, part.y, 0, 0) / clock.faceRadius;
        if (part.active) {
            ctx.beginPath();
            ctx.arc(part.x, part.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,0,0,' + (1 - d.toFixed(2)) + ')';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
    }
    ctx.restore();
};
 
// draw day circle
draw.clockDayCircle = function (canvas, ctx, clock) {
    var r = Math.PI * 2 * clock.dayPer;
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clock.faceRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clock.faceRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, clock.faceRadius, 0, r);
    ctx.stroke();
};
 
draw.ver = function (canvas, ctx, clock) {
    ctx.fillStyle = 'black';
    ctx.font = '10px arial';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.fillText('v' + clock.ver, 10, 10);

};
```

## 4 - Main.js and index.html

So ow that I have a utility library as well as my clock and draw files I can now use all of this in a main.js file and get everything working with just a little html. In the main.js file I create and inject a canvas element, and get a reference to the drawing context of the canvas element, as well as set some values for it. I use the create method of the clock modules to create a new clock object, and use the update method of the clock module in the body of an update loop. In the update loop I use my draw module to draw the various parts of the clock face with the current state of the clock object created and updated with the clock module.

```js
var canvasObj = utils.createCanvas();
 
var canvas = canvasObj.canvas;
var ctx = canvasObj.ctx;
 
// loop
var clock = clockMod.create(new Date());
var loop = function () {
    requestAnimationFrame(loop);
    //clock = clockMod.update(clock, new Date(2020, 4, 6, 14, 0, 0, 0));
    clock = clockMod.update(clock, new Date());
    draw.clear(canvas, ctx);
    draw.pool(canvas, ctx, clock);
    draw.clockDayCircle(canvas, ctx, clock);
    draw.clockText(canvas, ctx, clock);
    draw.ver(canvas, ctx, clock);
};
// start loop
loop();
```

Now that I have my main.js file it is time to use that along with all my other javaScript files that the main.js file depends on to get this canvas clock up and running.

```html
<html>
    <head>
        <title>canvas example clock particles</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/clock.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When this canvas example is up and running I get what it is that I would expect. Particles move outward from the center outward, and the count and speed differs depending on the time of day, and week.

## 5 - Conclusion

I am happy how this project has come out, it is more or less what I had in mind when it comes to having a more advanced javaScript clock canvas example. However this is of course not even the tip of the iceberg when it comes to making interesting clock projects using javaScript and canvas. A clock does not always have to follow the usual format that is typically of most clocks, it can take any form that might make sense, or present an interesting spin on things. A clock can be based on the amount of time that has elapsed sense the date of your birth, or the amount of time it will take the sun to revolve around galactic central point for example. In any case this canvas clock project was a little fun to work on, but I do not think I have done this sort of thing justice at all. So maybe I will make at least a few more of these kinds of canvas examples in the future.
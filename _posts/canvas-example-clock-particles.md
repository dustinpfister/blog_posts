---
title: A canvas example of a particle clock
date: 2020-05-06 11:45:00
tags: [canvas]
layout: post
categories: canvas
id: 655
updated: 2020-05-06 14:58:20
version: 1.2
---

I have made a basic clock canvas example before however maybe now it is time for another [canvas example](/2020/03/23/canvas-example/) of a clock this time maybe I can make it into something a little more interesting. This will be a clock that involves a pool of objects that move around the canvas, as the day progresses the count of particle objects that are active will increase to to a certain point at which it will come back down again. This is just one silly little idea that came to mind when it comes to be thing about making some additional canvas examples that are just basic clock like projects.

<!-- more -->

## 1 - Utils.js

```js
// UTILS
var u = {};
 
u.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// pad a value
u.pad = function (a) {
    return String('00' + a).slice(-2);
};
```

## 2 - Clock.js

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
 
    var setPart = function (part) {
        part.pps = 16 + 16 * Math.random();
        part.heading = Math.PI * 2 * Math.random();
    };
 
    var createPool = function (count) {
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
            setPart(part);
            pool.push(part);
            i += 1;
        }
        return pool;
    };
 
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
 
    var movePool = function (clock, secs) {
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
                }
            }
        }
    };
 
    var setClockPropsToNow = function (clock) {
        clock.timeText = getTimeText(clock);
        var dayStart = getDayStart(clock);
        clock.dayPer = (clock.now - dayStart) / 86400000;
        clock.secPer = clock.now.getMilliseconds() / 1000;
    };
 
    // return a public method that creates a clock object
    return {
        create: function (now) {
            var clock = {};
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
            clock.pool = createPool(240);
            clock.poolLastTick = now;
            clock.poolTotalActive = 0;
            clock.faceRadius = 100;
            return clock;
        },
 
        update: function (clock, now) {
            clock.now = now || new Date(0);
            setClockPropsToNow(clock);
 
            var t = clock.now - clock.poolLastTick,
            secs = t / 1000;
            setActivePoolParts(clock);
            movePool(clock, secs);
            clock.poolLastTick = clock.now;
            return clock;
        }
    }
 
}
    ());
```

## 3 - Draw.js

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
```

## 4 - Main.js and index.html

```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
canvas.style.width = '100%';
canvas.style.height = '100%';
 
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
};
// start loop
loop();
```

```html
<html>
    <head>
        <title>canvas example clock particles</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="./lib/utils.js"></script>
        <script src="./lib/clock.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```
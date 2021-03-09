---
title: Canvas example percent values and Math log
date: 2020-08-08 19:54:00
tags: [canvas]
layout: post
categories: canvas
id: 692
updated: 2021-03-09 15:56:06
version: 1.19
---

I have been busy with things lately so this weeks [canvas example](/2020/03/23/canvas-example/) is going to be a simple one that has to do with percent values that are linear and making them not so linear. In other words having a value that is typically some kind of index value, or numerator value, that is then divided over a max index value, denominator value, or any other value that is a max value relative to another value that is not. The result of such an operation is going to result in a value that is between and including zero and one. In most cases this value ends up being in a linear, or straight line kind of way which might work okay in some situations, but at other times I might want to do something else with this kind of value. So it might be nice in some situations to have one or more methods that can be used to take a percent value such as this, and return another percent value that is not going up in such a strait line kind of fashion. When looking into all kinds of expressions to do something like this one thing that might pop up is the Math.log method.

I am writing about this because I came across a situation in another canvas example where I wanted to have a method that would take a percent value between 0 and 1 and return another percent value that is consistent with something that is more of a curve rather than a straight line. This kind of method can be useful when it comes to positioning objects in a way where they are being aligned on a curve rather than what would otherwise be a strait line. However it can also be useful when it comes to applying it to other values that have to do with things like the rate of change of position. For example say I want a value that has to do with the rate at which a pixels per second rate changes change in a way so that an object accelerates at a rate that is not fixed or static. In addition this is also a topic that can come up when it comes to creating an experience point system. So it makes sense to work out some examples now and then when it comes to this sort of thing.

So with all that said this will be a quick canvas example where I am using the [Math.log](/2018/12/26/js-math-log/) method to create a percent value from another percent value that goes up in a logarithmic kind of way. I will then be using the method to change the rate at which a display object moves, and have another display object to compare to this will help to show why working out a method like this can come into play often with various canvas projects.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/percent-math-log/0.1.1/pkg.js"></script>

## 1 - The utility methods

First things first lets start out with the method that I am using to create a percent value from a percent value of that makes any sense. With that said I have an object literal with two methods one of which is used to create a percent value from another percent value, and some additional arguments that are used with the Math log method. The other method I can use to create an array of points with two values that are used with the logPer method and additional arguments that are used to set an area where the array of points will be, and a len property that will set the number of points.

```js
var utils = {};
utils.logPer = function (per, a, b) {
    a = a === undefined ? 2 : a;
    b = b === undefined ? a : b;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + a - 2) + per) / Math.log(b);
};
utils.createLogPerPoints = function (a, b, sx, sy, w, h, len) {
    var points = [],
    i = 0,
    x,
    y,
    per,
    logPer;
    while (i < len) {
        per = i / len;
        logPer = utils.logPer(per, a, b);
        x = sx + w / (len - 1) * i;
        y = sy + h - logPer * h;
        points.push({
            x: x,
            y: y,
            per: per,
            logPer: logPer,
            perY: sy + h - h * per
        });
        i += 1;
    }
    return points;
};
```

So the idea here is to use the createLogPoints method as a way to create an array of points that can then be drawn to a canvas element with a draw points method.


## 2 - The draw module

I then have an additional object with draw methods that can be used to draw a simple background, a points array, and info about a state object for this canvas example. I also added a draw method to draw a simple box in the canvas that will be used as a way to show how methods like these work to help set pixels per second rates of display objects. However I will be getting into that more in the demo module that will make use of the utility module and this draw modules.

```js
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.box = function (ctx, box, style) {
    ctx.fillStyle = style || 'grey';
    ctx.strokeStyle = '#afafaf';
    ctx.beginPath();
    ctx.rect(box.x, box.y, box.w, box.h);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'red';
};
draw.points = function (ctx, points) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    var i = 1;
    while (i < points.length) {
        ctx.lineTo(points[i].x, points[i].y);
        i += 1;
    }
    ctx.stroke();
};
draw.logPerPoints = function (ctx, state) {
    draw.box(ctx, state.backBox);
    draw.points(ctx, state.points);
    ctx.strokeStyle = 'lime';
    draw.points(ctx, state.points.map(function (point) {
            return {
                x: point.x,
                y: point.perY
            }
        }));
    draw.currentPoints(ctx, state);
};
draw.currentPoints = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cp.x, cp.perY, 5, 0, Math.PI * 2);
    ctx.stroke();
};
draw.info = function (ctx, state) {
    var cp = state.currentPoint;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.textBaseline = 'top';
    ctx.fillText('v' + state.ver, 10, 10);
    ctx.fillText('a: ' + state.a.toFixed(2) + ', b: ' + state.b.toFixed(2), 10, 20);
    ctx.fillText('current: ' + Math.floor(cp.x) + ',' + Math.floor(cp.y), 10, 30);
};
```

## 3 - Demo state module

So now for a module that will create a state object for this canvas example that makes use of my utility methods that create percentage values. Here I have a few methods to help with creating a main state object that will have a whole bunch of properties that will be used to create a functioning canvas example that will show why working out something likes this is helpful.

```js
var demo = {};
 
demo.createState = function (canvas) {
    var state = {
        ver: '0.1.0',
        canvas: canvas,
        points: [],
        a: 2.2,
        b: 2.5,
        maxHigh: 5,
        bias: 0,
        per: 0,
        i: 0,
        iMax: 250,
        IPS: 10,
        lt: new Date(),
        FPS: 30,
        currentPoint: {},
        backBox: {
            x: 60,
            y: 20,
            w: 200,
            h: 200
        },
        boxPer: {
            x: 0,
            y: 64,
            w: 32,
            h: 32,
            heading: 0,
            pps: 0
        },
        boxLogPer: {
            x: 0,
            y: 128,
            w: 32,
            h: 32,
            heading: 0,
            pps: 0
        }
    };
    state.points = utils.createLogPerPoints(state.a, state.b, state.backBox.x, state.backBox.y, state.backBox.w, state.backBox.h, 100);
    return state;
};
 
demo.update = function (state, secs) {
 
    var cp = state.currentPoint;
    state.i += state.IPS * secs;
    state.i %= state.iMax;
    state.per = state.i / state.iMax;
    state.bias = 1 - Math.abs(0.5 - state.per) / 0.5;
    state.boxLogPer.pps = 512 * cp.logPer;
    state.boxPer.pps = 512 * cp.per;
    //state.boxLogPer.heading = state.boxPer.heading = Math.PI / 20 * state.bias;
    demo.moveBox(state.boxLogPer, state, secs);
    demo.moveBox(state.boxPer, state, secs);
};
 
demo.moveBox = function (box, state, secs) {
    if (box.x > canvas.width + box.w) {
        box.x = box.w * -1;
    }
    if (box.x < box.w * -1) {
        box.x = canvas.width + box.w;
    }
    if (box.y > canvas.height + box.h) {
        box.y = box.h * -1;
    }
    if (box.y < box.h * -1) {
        box.y = canvas.height + box.h;
    }
    box.x += Math.cos(box.heading) * box.pps * secs;
    box.y += Math.sin(box.heading) * box.pps * secs;
};
```

So now that I have my utility methods, a draw module, and a module that can be used to create a state object, I now just need a little more javaScript code to make use of all of this.

## 4 - Lets try this out now

Now that I have my utility methods and some methods that can be used to draw to the canvas it is time to use a little additional javaScript code to test out if all this works as expected. Here I will be creating the canvas element, as well as injecting it into the hard coded HTML. I will be using the crate method of my demo module to create a state of the demo that I worked out for this canvas example, and I will of course have a main app loop that makes use of requestAnimatinFrame to create a render loop.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var state = demo.createState(canvas);
var loop = function () {
 
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
 
    requestAnimationFrame(loop);
 
    if (t >= 1000 / state.FPS) {
        state.currentPoint = state.points[Math.floor(state.bias * (state.points.length - 1))];
        draw.back(ctx, canvas);
        draw.logPerPoints(ctx, state);
        draw.box(ctx, state.boxLogPer, 'red');
        draw.box(ctx, state.boxPer, 'lime');
        draw.info(ctx, state);
        demo.update(state, secs);
        state.lt = now;
    }
};
 
loop();
```

So now that I have all the javaScript that I want want I just need a little HTML. In this HTML file I just have a single container div, and then I link to my main.js file that contains all the javaScript for this.

```html
<html>
    <head>
        <title>canvas example percent math log</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="main.js"></script>
    </body>
</html>
```

So when this is all up and running I get what it is that I expected working. In boxes move in to very different ways as the pixel per second values change.

## 4 - Conclusion

So maybe this is not the most exciting canvas example I have made thus far, but I did want to make a quick example that will helper to illustrate something that seems to come up now and then with certain projects. I have a percent value that goes from zero to one, but it does so in a straight line kind of way, so I want another way to make it so the value does not behave that way.
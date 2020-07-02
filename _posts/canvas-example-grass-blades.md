---
title: Canvas Example grass blades
date: 2020-07-02 13:31:00
tags: [canvas]
layout: post
categories: canvas
id: 675
updated: 2020-07-02 13:45:23
version: 1.2
---

I just have to make another [canvas example](/2020/03/23/canvas-example/) post now and then, so for today I made a grass blades thing. That is that I just wanted to make another artful canvas example that is not really a game or anything like that. This canvas example makes use of a blade javaScript module that is used to create a single blade of grass, and then there is another grass module that serves as a way to create a collection of blade objects. I then as always with these canvas examples have a draw.js module that is used to render the state of one of these grass objects to a canvas element.

<!-- more -->

## 1 - The blade.js file for this canvas example

So for starters I made a blade.js module that I will be using to create just one blade of grass that will be rendered to a canvas element. This blade object will contains an array of points that go from the bottom of a given canvas, along with other properties that are used for rendering. So for one thing there is a base position object that is a point on the bottom of the canvas element. From this position upwards a bunch of line segments will be drawn, but not all at once.

```js
var Blade = (function () {
 
    var createPoints = function (blade, ptCount) {
        var points = [],
        bp = blade.basePos,
        i = 0,
        a,
        x = bp.x,
        y = bp.y;
        aDelta = Math.PI / 180 * blade.turn;
        while (i < ptCount) {
            a = Math.PI * 1.5 + aDelta / (ptCount - 2) * i;
            points.push({
                x: x,
                y: y
            });
            x += Math.cos(a) * blade.segLength;
            y += Math.sin(a) * blade.segLength;
            i += 1;
        }
        return points;
    };
 
    // public API
    return {
        // create a blade
        create: function (opt) {
            opt = opt || {};
            opt.ptCount = opt.ptCount || 24;
            opt.canvas = opt.canvas || {
                width: 320,
                heigh: 240
            };
            opt.baseX = opt.baseX === undefined ? canvas.width / 2 : opt.baseX;
            var blade = {
                basePos: {
                    y: canvas.height,
                    x: opt.baseX
                },
                r: opt.g === undefined ? 0 : opt.r,
                g: opt.g === undefined ? 255 : opt.g,
                b: opt.g === undefined ? 0 : opt.b,
                width: {
                    min: 3,
                    max: 20
                },
                turn: opt.turn === undefined ? 0 : opt.turn,
                segLength: 10,
                points: [],
                t: opt.t === undefined ? 0 : opt.t,
                tMax: opt.tMax === undefined ? 0 : opt.tMax
            };
            blade.points = createPoints(blade, opt.ptCount)
                return blade;
        }
    }
 
}
    ());
```

## 2 - grass.js

```js
var Grass = (function () {
    // public API
    return {
        // create a grass state
        create: function (opt) {
            opt = opt || {};
            return {
                maxBlades: opt.maxBlades || 10,
                spawnRate: 1000,
                canvas: opt.canvas || {
                    width: 320,
                    heigh: 240
                },
                t: 0,
                blades: []
            };
        },
        // update grass
        update: function (grass, t) {
            grass.t += t;
            grass.blades.forEach(function (blade) {
                blade.t += t;
                blade.t = blade.t > blade.tMax ? blade.tMax : blade.t;
            });
            if (grass.t >= grass.spawnRate) {
                // shift out old blade
                if (grass.blades.length >= grass.maxBlades) {
                    grass.blades.shift();
                }
                // push new blade
                grass.blades.push(Blade.create({
                        r: 100 + Math.floor(156 * Math.random()),
                        g: 100 + Math.floor(156 * Math.random()),
                        b: 100 + Math.floor(156 * Math.random()),
                        baseX: Math.floor(grass.canvas.width * Math.random()),
                        turn: -90 + 180 * Math.random(),
                        tMax: 1000 + Math.floor(20000 * Math.random()),
                        ptCount: 10 + Math.floor(15 * Math.random())
                    }));
                grass.t %= grass.spawnRate;
            }
        }
    }
 
}
    ());
```

## 3 - draw.js

```js
var draw = (function () {
 
    var drawBlade = function (ctx, blade, style) {
        var i = 1,
        per,
        len = Math.floor((blade.t / blade.tMax) * blade.points.length),
        pt = blade.points[0];
        ctx.strokeStyle = style || 'lime';
        while (i < len) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            pt = blade.points[i];
            per = i / len;
            ctx.lineWidth = Math.floor(blade.width.min + blade.width.max - blade.width.max * per);
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
            i += 1;
        }
    };
 
    return {
 
        // draw background
        background: function (ctx, canvas) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        },
 
        // draw a blade
        blade: drawBlade,
 
        grass: function (ctx, grass) {
 
            grass.blades.forEach(function (blade, i) {
                var style = 'rgba(' + blade.r + ',' + blade.g + ',' + blade.b + ',' + (0.1 + 0.9 * (i / grass.blades.length)) + ')';
                drawBlade(ctx, blade, style);
            })
 
        }
 
    }
 
}
    ());
```

## 4 - main.js and index.html

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var g = Grass.create({
        maxBlades: 50,
        canvas: canvas
    });
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt;
    requestAnimationFrame(loop);
    draw.background(ctx, canvas);
 
    Grass.update(g, t);
    draw.grass(ctx, g);
    lt = now;
};
 
loop();
```

```html
<html>
    <head>
        <title>canvas example grass blades</title>
    </head>
    <body style="margin:0px;">
        <div id="gamearea"></div>
        <script src="./lib/blade.js"></script>
        <script src="./lib/grass.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```
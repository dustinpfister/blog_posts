---
title: Canvas Example grass blades
date: 2020-07-02 13:31:00
tags: [canvas]
layout: post
categories: canvas
id: 675
updated: 2020-07-02 14:40:55
version: 1.11
---

I just have to make another [canvas example](/2020/03/23/canvas-example/) post now and then, so for today I made a grass blades thing. That is that I just wanted to make another artful canvas example that is not really a game or anything like that. This canvas example makes use of a blade javaScript module that is used to create a single blade of grass, and then there is another grass module that serves as a way to create a collection of blade objects. I then as always with these canvas examples have a draw.js module that is used to render the state of one of these grass objects to a canvas element.

With what is going on in the outside would as of late I have come to find that I like to work on canvas projects as a way to gain an escape of sorts from what is going on. JavaScript and canvas have always been there for me as a way to get away from my troubles that may prove to be a more constructive alternative to that which is often typical. So that is the kind of canvas example this is, just letting go of what is bothering me and letting my mind flow. The result is another canvas animation type thing that I can have running on the screen that is nice to look at for a while, and I can just thing about all the other things I can do to make it more interesting.

<!-- more -->

## 1 - The blade.js file for this canvas example

So for starters I made a blade.js module that I will be using to create just one blade of grass that will be rendered to a canvas element. This blade object will contains an array of points that go from the bottom of a given canvas, along with other properties that are used for rendering. So for one thing there is a base position object that is a point on the bottom of the canvas element. From this position upwards a bunch of line segments will be drawn, but not all at once.

The blades module has just one helper method that is used to create the array of points for the blade. When it comes to rendering the t and tMax properties of a bald object will be what is used to know how many of the segments to draw from the bottom to the top. More on this later when I get to the module that will be used to draw things to the canvas.

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

So for now the blades module just has a single public method that creates a new blade object. This module is not going to be used by itself, although I guess it could when it comes to just testing out the module by itself when working out new features for just a blade. However for this canvas example the blade module here is going to be used in yet another module that will be used to create a collection of these called the grass module, so lets take a look at that next.

## 2 - The grass.js blade collection module

So now that I have a blade module I will also want a grass module that will create an object that will store and array of blade objects created with the blade module that I covered in the last section. This Grass module will have just two public methods one that is used to create a new grass object, and the other that is used to update such a grass object.

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

## 3 - The draw.js module

So then I have my blades and grass modules that will be used to create a state object. That now just means that I need another module that will be used to render this module to a canvas element.

In my draw module I have a single internal helper method that is used to render a single blade object created with the blade module. This helper is made public in the public api of the draw module, so it is also public. In addition to this it is also called in the draw grass public draw method as that is just drawing a collection of blade objects.

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

## 4 - The main.js and index.html

I have my javaScript modules that will be used to create a modal as well as render that modal to a canvas element. the only thing that I have to do now is just have a little more javaScript code that will make use of all of this, and of course at least a little HTML to warp this all up.

Here in my main.js file I create the actual canvas element that will be used in this canvas example, as well as get the drawing context for it just like with any other canvas example of mine. In then attach the canvas element to a container element that I have hard coded in my html. I set th width and height of the canvas element, and also translate it so that it looks better.

I use my grass module here in main.js to create a new grass object. The grass object will then be updated, and rendered in the main app loop of the canvas example here that is powered by the [request animation frame](/2018/03/13/js-request-animation-frame/) method.

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

So then I have my html that makes use of this main.js file, and of cousre I am also loading in all the other modules that the main.js makes use of.

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

The result as I would expect is a bunch of blades of grass popping up from the ground up over and over again.

## 5 - Conclusion

So this was a quick fun little canvas example that is what I had in mind more or less. I do like making these kinds of projects that involve just rendering something to the canvas over and over again like this. I guess there is much more I could do with this kind of project when it comes to making it a little more interactive, as well as have maybe a few more things going on to make it more interesting. I have a whole lot of other canvas examples, blog posts, and other ideas for projects though so I am not sure I will get around to putting much more time into this one or not.
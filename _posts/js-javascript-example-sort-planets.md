---
title: Sort planets javaScript example
date: 2020-08-31 16:56:00
tags: [js]
layout: post
categories: js
id: 698
updated: 2021-04-04 11:18:01
version: 1.16
---

I have wrote a post on the [array sort](/2019/12/02/js-array-sort/) method before hand, and the general idea I have in mind now is to have at least a one if not more [javaScript example](/2021/04/02/js-javascript-example/) posts that help to show why the array sort method is useful. Very basic examples are helpful, but they do not help to get people to really understand the connection between the array sort method, and something that is at least starting to look like some kind of project that is fun, interesting or useful. Sorting an array of objects is something that will come up often in javaScript so I thought I would make a fun little javaScript project that would be an example of why sorting is helpful. 

This javaScript example will not be a full game, but it will be one little mechanic that could be used in a full game that will of course make use of array sort. Say you have an array of objects, and each object is a planet in some kind of game that has to do with taking over planets. Anyway there would be a lot of code that would need to be written to make a fun little planet attack game, but one feature that I would want is to have a method where I can give a position, and get a list of planets where the first planet in the list is the one that is the closest to that position. This javaScript example will then just be this one little aspect of game development using javaScript, I will also put together some additional code that will be a very basic canvas display.

<!-- more -->

## 1 - The planets Module

So this javaScript example will start off with, and also center around just a javaScript module that is used to create an array of planet objects. There are just two public methods for now, one that will create an return an array of planets, and another that can be used to get a list of target objects for each planet. In a real project this module would contain a whole lot more methods of course, but for now I am going to keep things simple just for the sake of this post.

```js
var planetMod = (function () {
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
 
    var api = {};
 
    api.createPlanets = function (opt) {
        opt = opt || {};
        opt.canvas = opt.canvas || {
            width: 320,
            height: 240
        };
        opt.count = opt.count || 5;
        var i = 0,
        y,
        a,
        d,
        dMax = Math.min.call(null, opt.canvas.width / 2, opt.canvas.height / 2),
        planets = [];
        while (i < opt.count) {
            d = dMax / opt.count * i;
            a = Math.PI * 2 * Math.random();
            x = canvas.width / 2 + Math.cos(a) * d;
            y = canvas.height / 2 + Math.sin(a) * d;
            planets.push({
                x: x,
                y: y,
                r: 8,
                minerals: 50 + Math.round(50 * Math.random())
            });
            i += 1;
        }
        return planets;
    };
 
    api.getTargets = function (planets, x, y) {
        var i = planets.length,
        pl,
        d,
        targets = [];
        while (i--) {
            pl = planets[i];
            d = distance(x, y, pl.x, pl.y);
            targets.push({
                pl: pl,
                i: i,
                d: d
            });
        }
        // sort targets by distance
        targets.sort(function (a, b) {
            if (a.d > b.d) {
                return 1;
            }
            if (a.d < b.d) {
                return -1;
            }
            return 0;
        });
        return targets;
    };
 
    return api;
 
}
    ());
```

So the get targets method of this module is the main method of interest here with respect to the array sort method. I am looping over all the planets in the passed planets collection, and creating a target object for each planet. This target object contains things like a reference to the planet object, but also a distance value from the planet to the given point when the method is called. This distance value is then used as a way to sort the array of targets with the array sort method, and the list of targets are returned by the method.

## 2 - A canvas app that makes use of the module

Now that I have a javaScript module that can be used to create and sort a list of planet objects, and that it seems to work okay when I work with it by itself. It would be nice to put together a quick little canvas project that makes use of this planets module. In time if I do get more time to work on this maybe I will start a full canvas example that will contain additional logic that will be more of a game. However for this simple javaScript example It will just be a canvas example where clicking on a point in the canvas will be the value that is passed to the get targets method. The results will then be displayed on each of the planets which will also be drawn in the canvas.

### 2.1 - draw.js

Here I have a draw module that has a few methods to help with drawing the state of an array of targets to a canvas element. For this example I just want a draw background method, and of course a method to draw the current status with the targets list.

```js
var draw = {};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.targets = function (ctx, targets) {
    var i = targets.length,
    target,
    pl;
    while (i--) {
        target = targets[i];
        pl = target.pl;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(pl.x, pl.y, pl.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'blue';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i, pl.x, pl.y);
    }
};
```

### 2.2 - Main.js and index.html

Now for some additional javaScript code that will create and inject a canvas element, as well as make use of my planets module, and attach an event handler that will update the list of targets based on a location where the canvas is clicked.

```js
var container = document.getElementById('canvas-app'),
canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
container.appendChild(canvas);
// create planets collection
var planets = planetMod.createPlanets({
        canvas: canvas
    });
// update scene
var update = function (planets, x, y) {
    var targets = planetMod.getTargets(planets, x, y);
    draw.back(ctx, canvas);
    draw.targets(ctx, targets);
};
// get a canvas relative point
var getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
};
// attach an event handler
canvas.addEventListener('click', function (e) {
    var pos = getCanvasRelative(e);
    update(planets, pos.x, pos.y);
});
// call update for the first time
update(planets, canvas.width / 2, canvas.height / 2);
```

Some html that will pull this all together.

```html
<html>
    <head>
        <title>javaScript example sort planets</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script src="planets.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 3 - Conclusion

So I was able to quickly throw together a little example of array.sort that might prove to be a little fun and interesting. In this example I worked out something where a list of target planets is based on distance to a given position, however this is something that can be expansed on of course. Say each planet has various levels of resources I might want a list then that is based on distance and value in terms of resources. There are many other ideas that come to might such as filtering out planets that are under control by the player, rather than neutral or enemy planets.
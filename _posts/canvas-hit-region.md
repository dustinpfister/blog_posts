---
title: Hit region and html 5 canvas elements
date: 2019-12-01 14:20:00
tags: [js, canvas]
layout: post
categories: canvas
id: 573
updated: 2020-04-15 12:23:24
version: 1.14
---

There is the possibly of a new [hit region](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility) api in canvas that can be used as a way to define additional interactivity for objects that are drawn in a canvas. As of this writing there is very poor browser support for this, in fact it does not seem to work at all in any browser that I use at least.

Still I though that I should write a post on this subject, and also on hit detection in general in canvas projects. So this post will not be on the hit region api that much, but it will be on bounding box collision detection in a vanilla javaScript canvas project. A subject that will come up often in many such projects.

<!-- more -->

## 1 - Basic bounding box hit region area

I do not think that a hit region area should really be the responsibility of a canvas drawing api any way, and that a canvas element does not need to be a replacement for other HTML elements. Sure the subject will come up often, but hit detection should be a part of the class, model, framework or whatever it is that you are using outside of just the canvas element and the drawing api alone.

In short a canvas is just a bitmap drawing area that can be used to draw things with javaScript and all kinds of external assets. So with that said a javaScript module or state object of some kind should be where you are storing information about objects drawn in the canvas, as well as logic that updates and works with that state.

### 1.1 - A Basic bounding box method

One way to make it so you have a hit area in the canvas is to use a basic bounding box collision detection method. This kind of method should be a part of a framework that you are using, if you are just going vanilla js style though you could start out with just something like this maybe.

```js
var bb = function (a, b) {
    return !(
        ((a.y + a.h) < (b.y)) ||
        (a.y > (b.y + b.h)) ||
        ((a.x + a.w) < b.x) ||
        (a.x > (b.x + b.w)));
};
 
var box = {x:50,y:50,w:100,h:50};
 
console.log( bb(box,{x: 75,y:75,w:1,h:1}) ); // true
console.log( bb(box,{x: 5,y:5,w:1,h:1}) ); // false
```

A method such as this can be used to find out if one box area overlaps another, and can then be used in conjunction with many other methods and objects to create, and mutate a state. That state then just needs to be rendered to the canvas.

## 2 - Basic canvas hit region example

Now that I have covered how to have a simple bound box collision detection method, I can now use that to make it so that when and area of the canvas is clicked that results in some kind of action. In this section I have an example that uses the bounding box method to know that and area is clicked and when such an area is click I cycle over some indexed color values for that area. In other words when the area is click it changes color, not the most interesting example, but it is a start when it comes to this sort of thing with canvas.

```html
<html>
    <head>
        <title>canvas hit region</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var bb = function (a, b) {
    return !(
        ((a.y + a.h) < (b.y)) ||
        (a.y > (b.y + b.h)) ||
        ((a.x + a.w) < b.x) ||
        (a.x > (b.x + b.w)));
};
 
var actions = [{
        x: 50,
        y: 50,
        w: 100,
        h: 50,
        colorIndex: 0,
        click: function () {
            this.colorIndex += 1;
            this.colorIndex %= 3;
            console.log('action 1');
        }
    }
];
 
var actionHandler = function (e) {
    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top;
    var i = 0,
    len = actions.length;
    while (i < len) {
        if (bb({
                x: x,
                y: y,
                w: 1,
                h: 1
            }, actions[i])) {
            actions[i].click.call(actions[i]);
            break;
        }
        i += 1;
    }
    drawActions(actions, ctx);
}
 
var drawActions = function (actions, ctx) {
    var pal = ['red', 'green', 'blue']
    actions.forEach(function (act) {
        ctx.fillStyle = pal[act.colorIndex] || 'white';
        ctx.fillRect(act.x, act.y, act.w, act.h);
    });
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.addEventListener('click', actionHandler);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawActions(actions, ctx);
 
        </script>
    </body>
</html>
```

I can not say that this is the best way to go about setting up some buttons in a canvas project, but you get the general idea. A hit detection method can be used to find out of an object was clicked or not, and then some kind of action can be preformed. In a real project I might go about pulling code like this into a module of sorts, and also make the objects a little more flashy.

## 3 - A simple functional javaScript canvas box module

So maybe it will be best to make some kind of javaScript Box module that returns a Class, or a functional style module of some kind. In this section I will be going over a more functional approach to this kind of module design. So there will be a box.js module that can be used to create a Box object, and then a bounding box method as part of it that I can use to find if two box objects overlap each other or not.

In additional I will be pulling logic that has to do with the box module into its own box.js file, and additional javaScript code that has to do with drawing a box module into a draw.js file. I will the be using those two assets in a main index.html file along with some additional code that will make use of these external javaScript files. This helps to keeping things better organized by separating logic that creates and works with state, from logic that draws state, and logic that sores a current state object.

### 3.1 - The box.js file

Here I have the box.js file that I made for this section. It is based on what I worked out for my post on making a javaScript box class in general that I started a few years back, and come back to now and then when it comes to editing. it is more or less the same as what i copied from there, but with the introduction of a bounding box method.

```js
var Box = (function () {
 
    var clone = function (bx) {
        return JSON.parse(JSON.stringify(bx));
    };
 
    var api = {};
 
    api.create = function (opt) {
        opt = opt || {};
        return {
            x: opt.x === undefined ? 0 : opt.x,
            y: opt.y === undefined ? 0 : opt.y,
            w: opt.w === undefined ? 32 : opt.w,
            h: opt.h === undefined ? 32 : opt.h
        };
    };
 
    api.boundingBox = function (bx1, bx2) {
        return !((bx1.y + bx1.h) < bx2.y ||
            bx1.y > (bx2.y + bx2.h) ||
            (bx1.x + bx1.w) < bx2.x ||
            bx1.x > (bx2.x + bx2.w));
    };
 
    api.moveByHeading = function (bx, heading, delta) {
        heading = heading === undefined ? 0 : heading;
        delta = delta === undefined ? 1 : delta;
        var nbx = clone(bx);
        nbx.x = nbx.x + Math.cos(heading) * delta;
        nbx.y = nbx.y + Math.sin(heading) * delta;
        return nbx;
    };
 
    return api;
 
}
    ());
```

So this is not really an end point in development for several reasons. When it comes to making a game a functional approach might not always be a such a great idea because of the performance loss from cloning objects with certain methods that will not mutate in place. Also when it comes to a real project I am likely going to need this to do a bit more than just creating box objects, bounding box collision detection, and moving a box by a heading and delta. Still for just the sake of canvas hit areas this alone will do the trick.

### 3.2 - The draw.js file

So then I will want a draw.js file that can be used to draw a box object to a canvas element. In addition I will place any additional draw methods hear that I will want to use from a project in general. For now I am just pulling the process of drawing a plain background into its own methods, but if this where to grow into something more this module would have a lot more going on.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// draw a box
draw.box = function (ctx, bx, fill, stroke) {
    ctx.fillStyle = fill || '#ffffff';
    ctx.strokeStyle = stroke || '#000000';
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.fill();
    ctx.stroke();
};
```

### 3.3 - An example of the javaScript module in action with hit detection

Time to test this out now.

```html
<html>
    <head>
        <title>canvas hit region</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="box.js"></script>
        <script src="draw.js"></script>
        <script>
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var bx = Box.create({x: 100, y: 80}),
bx2 = Box.create({y:80});
 
bx2 = Box.moveByHeading(bx2, 0, 75);
 
draw.back(ctx, canvas);
var fill = 'white';
if(Box.boundingBox(bx, bx2)){
 fill = 'red';
}
draw.box(ctx, bx, fill);
draw.box(ctx, bx2);
 
        </script>
    </body>
</html>
```
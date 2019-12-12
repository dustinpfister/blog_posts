---
title: Hit region and html 5 canvas elements
date: 2019-12-01 14:20:00
tags: [js, canvas]
layout: post
categories: canvas
id: 573
updated: 2019-12-11 21:09:49
version: 1.8
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
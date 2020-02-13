---
title: Drawing a canvas star with javaScript
date: 2020-02-12 15:17:00
tags: [canvas]
layout: post
id: 611
updated: 2020-02-12 19:41:03
version: 1.2
---

Time for yet another [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) this time I think I will do a quick example of drawing a star. There are many ways of doing so with a canvas html element, many solutions that I see involve making a draw method that will draw a star. However I think a better way of doing so is to create a method that will create an array of points, and then have a draw method that will just render that array of points.

<!-- more -->

## 1 - The module to make a canvas star

First off there is the module that I worked out that creates arrays of points that when drawn in order end up drawing stars. There is more than one method provided by this module to create these point arrays. One method creates a point array by given an outer and inner radius along with other options such as point count. The other method works by giving a pointCount radius and point skip value.

```js
var starMod = (function () {
 
    // get a point with a given radian, radius, and origin point
    var getPoint = function (radian, radius, ox, oy) {
        return {
            x: Math.cos(radian) * radius + ox,
            y: Math.sin(radian) * radius + oy
        };
    };
 
    // parse options
    var parseOptions = function (opt) {
        opt = opt || {};
        opt.pointCount = opt.pointCount || 5;
        opt.radius = opt.radius === undefined ? 50 : opt.radius;
        opt.radiusInner = opt.radiusInner === undefined ? 25 : opt.radiusInner;
        opt.radianAjust = opt.radianAjust === undefined ? 0 : opt.radianAjust;
        opt.ox = opt.ox || 0;
        opt.oy = opt.oy || 0;
        opt.pointSkip = opt.pointSkip || 2;
        return opt;
    };
 
    // public API
    return {
        // create a star points array by pointCount, and inner and outer radius
        create1: function (opt) {
            opt = parseOptions(opt);
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / opt.pointCount,
            points = [];
            while (i < opt.pointCount) {
                pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                pt = getPoint(rd * i + rd / 2 + opt.radianAjust, opt.radiusInner, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        },
        // create a star by point count radius and point skip
        create2: function (opt) {
            opt = parseOptions(opt);
            var i = 0,
            pt,
            r,
            rd = Math.PI * 2 / opt.pointCount * opt.pointSkip,
            points = [];
            while (i < opt.pointCount) {
                pt = getPoint(rd * i + opt.radianAjust, opt.radius, opt.ox, opt.oy);
                points.push(pt.x, pt.y);
                i += 1;
            }
            return points;
        }
    }
 
}
    ());
```

## 2 - The draw methods

```js
var draw = {};
 
draw.background = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
};
 
draw.points = function (ctx, points, cx, cy) {
    cx = cx === undefined ? 0 : cx;
    cy = cy === undefined ? 0 : cy;
    ctx.save();
    ctx.translate(cx, cy);
    var i = 2,
    len = points.length;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1])
        i += 2;
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};
```

## 3 - The main index file

```html
<html>
    <head>
        <title>canvas star</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="draw.js"></script>
        <script src="star.js"></script>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
 
var star1 = starMod.create1({
    radius: 60,
    radiusInner: 30
});
var star2 = starMod.create2({
    pointCount: 7,
    radius: 60,
    pointSkip: 3
});
 
ctx.lineWidth = 3;
draw.background(ctx, canvas);
ctx.strokeStyle = 'white';
draw.points(ctx, star1, 80, canvas.height / 2);
draw.points(ctx, star2, 240, canvas.height / 2);
        </script>
    </body>
</html>
```
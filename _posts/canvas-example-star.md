---
title: Drawing a canvas star with javaScript
date: 2020-02-12 15:17:00
tags: [canvas]
layout: post
categories: canvas
id: 611
updated: 2020-02-13 09:06:58
version: 1.10
---

Time for yet another [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) this time I think I will do a quick example of drawing a star. There are many ways of doing so with a canvas html element, many solutions that I see involve making a draw method that will draw a star. However I think a better way of doing so is to create a method that will create an array of points, and then have a draw method that will just render that array of points.

<!-- more -->

## 1 - The module to make a canvas star

First off there is the module that I worked out that creates arrays of points that when drawn in order end up drawing stars. There is more than one method provided by this module to create these point arrays, and some internal helper methods to parse options and get a point when given a radian, and radius from a given origin. 

One method that creates an array of points that makes up a star I called just simply create1. This method works by having not one but to radius from a center point. There is one set of points at one radius, and another set of points at another radius, and both sets of points are spaced out between each other half way. When the array of points is drawn the line will be drawn from a point at one radius to the next point at the other radius, thus forming a star like shape that way.

The other method that I worked out is called just create2, this method creates an array of points by way of having a single set of points at a single given radius, the oder in which points are added to the array is just set by a point skip argument that defaults to 2.


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

There are many many ideas that come to mind when it comes to further expanding a module like this. Such as having a method that returns not just an array of points, but an object where the array of points is just an argument, and then there are a bunch of methods that can eb used to update the state of those points. However for this section I will be keeping this simple for now.

## 2 - The draw methods

I then have some draw methods that I worked out. One is to just draw a plain black background, and another is to draw an array of points.

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

So then it is just a matter of using the methods to create point arrays, and then pass those point arrays to my draw points method. Apart from the usual with any canvas project such as creating a canvas element and getting a reference to it, as well as linking to my start module that I worked out above.

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

This results in two stars created with the two separate methods drawn at two locations in the canvas. The important thing here is that I am keeping the state of the starts separate from that of the methods that are used to draw that state. I could expand on the canvas star module by adding additional methods that can be used to manipulate the star point arrays. Another option though would be to make an example that just creates new stars each time.

## 4 - Conclusion

So this canvas example worked out pretty well, it was a nice little exercise at making stars for a canvas project. There is more than one methods for making them both of which have to do with Math.cos and Math.sin that are used to find out points around a given orgin point.
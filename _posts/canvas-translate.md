---
title: The canvas translate method and normalizing points.
date: 2019-10-09 19:43:00
tags: [canvas]
layout: post
id: 543
categories: canvas
updated: 2020-07-13 12:27:07
version: 1.39
---

The [canvas translate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) method can be used to add a [translation transformation](https://en.wikipedia.org/wiki/Translation_(geometry)) to the current canvas matrix as a whole. This is done by applying an shifting the origin of the canvas matrix, rather than applying a vector in terms of direction and magnitude.

This canvas translate method can then make it so that when something is drawn to a certain point within the canvas using the canvas drawing methods it is actually drawn relative to the new translated point, rather that the usual top left corner of the canvas.

The canvas translate method is often used in conjunction with other methods such as canvas [save, restore](/2019/08/14/canvas-save/), and [rotate](/2019/11/05/canvas-rotate/) when drawing rotated display objects on the fly rather than from a sprite sheet of images that where rotated before hand. I generally use the save and restore methods when using the translate method in any capacity actually because the method applies deltas to the current state of the canvas matrix rather than setting a fixed value.

The canvas translate method can also be used as a way to just change the drawing origin in the canvas when I want to draw something in a different location of the canvas. This can be useful as it allows me to avoid having to do something else to help with the process of normalizing points. Still it might be best to just make it so that everything in an object that serves as a model just stays relative to the origin rather than changing that in the canvas matrix outside of the model. That is to just not use the canvas translate method, but do translations in a separate state object of sorts.

So with that said lets take a moment to look at some examples of the canvas translate method.

<!-- more -->

## 1 - Canvas translate basic example

For a very basic example of the canvas translate method I just put together this simple little example where I am just translating the canvas so that a rectangle at 0,0 is actually rendered at 16,16. In the HTML I just have a canvas element, and then a script tag that links to an external javaScript file where I have the basic canvas translate example. I often do things this way rather than having everything in a script tag, even when it comes to basic examples now and then becuase basic examples often quickly become not so basic.

```html
<html>
    <head>
        <title>canvas translate</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

In the basic.js file of this canvas translate example I just grab a reference to the canvas element, and then a reference to the 2d drawing context as i would for any other canvas example. Once I have a reference to the 2d drawing context I can the use the canvas translate method to translate the canvas matrix by a given delta x and delta y value. In this example I am shifting the origin of the canvas from the default 0,0 position to 16,16 by calling the translate method off if the reference to the drawing context and passing the arguments for those deltas for x and y.

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// drawing rect at 0,0 in the canvas
ctx.fillStyle = 'blue';
ctx.fillRect(0,0,32,32);
 
// translating canvas to 16,16
ctx.translate(16,16);
ctx.fillStyle = 'red';
ctx.globalAlpha = 0.5;
// now drawing a rect at 0,0 is actually at 16,16
ctx.fillRect(0,0,32,32);
```

So now when I use any drawing method such ad fill rect the drawing will now happen relative to the point 16,16 rather than that of 0,0. I have then moved the location of the origin by using the translate method. To set it back I would then have to call the translate method again and pass -16,-16, or use the save and restore methods. SO the the is the basics of the translate method in action, so with that out of the way lets looks at some more interesting examples of using the translate method.

## 2 - A normalized chart data canvas translate example

In this section I will be going over a far more advanced example that has to do with normalized points, and using the canvas translate method to translate the canvas matrix when it comes to drawing those normalized points to the canvas. This example involves creating an object that contains a small amount of data about how well a websites blog post is preforming in terms of search impressions, clicks, and a click threw rate.

This example is an exercise of [separating the concerns of data and view](/2017/08/29/canvas-separation-of-concerns-model-and-view/). The reason why is that the data object contains raw data as well as data that is formatted for viewing, but is not an actual view. This data object is septate from the javaScript that actually renders that data to the canvas.

In this canvas example I am also making normalized points where each point of interest is centered around a relative origin. It is then up to the developer how to go about scaling up the set of 2d points. One way would be to apply an offset to each point, and another would be to use the canvas translate method.


### 2.1 - The data object with normalized points

So lets start out with the data object. Here I used a self executing function expression to wrap up everything that has to do with the data object into a closure. Inside this closure I created and returned a public api that contains the raw data, as well as normalized and scaled data. This normalized and scaled data is what I will be using when writing my view that will make use of the canvas translate method along with many other aspects of the canvas 2d drawing api.

The public api for the data object contains two methods of interest including a normalize method, and a scale method. The normalize method will create and array of points where each point has a value between negative one and positive one. So in other words all points are at a minimal scale of sorts that can then be scaled up by some kind of multiplier. This is of course where the scale method comes into play.

```js
// data objects
var data = (function () {
    var api = {
        stats: [],
        chartWidth: 160,
        chartHeight: 120,
        points: [],
        // normalize points
        normalize: function () {
            return api.points = api.stats.map(function (statObj) {
                    var max = Math.max.apply(null, statObj.values),
                    deltaX = api.chartWidth / (stats[0].values.length - 1);
                    return statObj.values.map(function (val, i) {
                        return {
                            x: (deltaX * i - api.chartWidth / 2) / api.chartWidth,
                            y: ((1 - val / max) * api.chartHeight - api.chartHeight / 2) / api.chartHeight
                        }
                    });
                });
        },
        // set scale of points by normalizing, and then scaling
        scale: function (scaleW, scaleH) {
            api.chartWidth = scaleW || api.chartWidth;
            api.chartHeight = scaleH || api.chartHeight;
            api.normalize();
            return api.points = api.points.map(function (statPoints) {
                    return statPoints.map(function (pt) {
                        pt.x = pt.x * api.chartWidth;
                        pt.y = pt.y * api.chartHeight;
                        return pt;
                    });
                });
        }
    };
    // hard coded stats
    var stats = [{
            lable: 'impressions',
            color: 'cyan',
            values: [125, 397, 487, 463, 472, 321, 94]
        }, {
            lable: 'clicks',
            color: 'blue',
            values: [9, 33, 29, 30, 29, 13, 7]
        }
    ];
    // creating a ctr stat object
    stats.push((function () {
            return {
                lable: 'CTR',
                color: 'green',
                values: stats[0].values.map(function (imp, index) {
                    return imp / stats[1].values[index];
                })
            }
        }
            ()));
    // set stats and update points for first time
    api.stats = stats;
    api.normalize();
    api.scale();
    // return the api
    return api
}
    ());
```

The data object contains are coded data, but if I where to continue working on this and make it some kind of long term project I would change this into some kind of constructor that can be fed new raw data of course. The central theme of this example has to do with the concept of normalizing points in a 2d plain, as this is what is most relevant to the over all theme of this post on the canvas translate method.

### 2.2 - canvas translate and the Draw Graph method

Now here is the main draw graph method that uses the canvas translate method to translate the canvas to any point in the area of the canvas element. Once one canvas is translated to a given point in interest I then call additional methods that will draw the current state of the points that have been normalized and scaled.

```js

// main draw method that uses canvas translate
var drawGraph = function (ctx, data, x, y) {
    ctx.save();
    // translate to the center of the canvas
    ctx.translate(x, y);
    // draw stat object points
    drawStatObjects(ctx, data);
    // draw base lines
    drawBaseLines(ctx, data);
    ctx.restore();
};
```

Here I ams also using the canvas save and restore methods as well so if I want to call this method more than once it will not keep changing the state of the canvas matrix each time the method is called.

### 2.3 - The draw stat objects draw method

Here I have the draw method that can be used to draw the charts normalized and scaled points to the canvas. This is of course what I am calling in the draw graph method outline above, the reason why I did this is to help make things more fine grain when t comes to drawing something like this.

```js
// draw a stat objects normalized chart value points
var drawStatObjects = function (ctx, data) {
    ctx.lineWidth = 3;
    data.points.forEach(function (statPoints, statIndex) {
        var statObj = data.stats[statIndex];
        ctx.beginPath();
        ctx.strokeStyle = statObj.color || 'red';
        statPoints.forEach(function (pt, pointIndex) {
            ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
    });
};
```

### 2.4 - The draw base lines method

Here I have another draw method that is used to draw the base lines of the chart based on values in the data object.

```js
// draw normalized base lines of chart
var drawBaseLines = function (ctx, data) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(-data.chartWidth / 2, -data.chartHeight / 2);
    ctx.lineTo(-data.chartWidth / 2, data.chartHeight / 2);
    ctx.lineTo(data.chartWidth / 2, data.chartHeight / 2);
    ctx.stroke();
};
```

### 2.5 - Pull it all together

So now that everything is worked out nice and need it is time to play around with things with some additional javaScript that composes the actual state of the canvas project.

```js
// draw background
var drawBackground = function (ctx) {
    // black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// Lets use it
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
drawBackground(ctx);
 
// draw Graph at default
drawGraph(ctx, data, canvas.width / 2, canvas.height / 2);
 
// using scale method to make a smaller version of the graph
data.scale(50,50);
drawGraph(ctx, data, 30, 30);
```

In the data object I called the scale method for the first time that sets everything to a default state of sorts. I can the use the scale method to change the size of the chart. The thing to note here about normalizing points is that everything is centered around a single point, and from there it can be scaled up, this works well in relationship with the canvas translate method that can be used to change the location of where that center point of interest is.

## 3 - Using canvas translate, rotate, save, and restore.

So now for an example that uses the canvas translate method along with the canvas rotate method, and save and restore to rotate a box with the center of the box centered at the center of the canvas. The [save and restore methods](/2019/08/14/canvas-save/) can be used to save and then later restore the current state of the drawing context. So if I use the canvas translate method to change the translation of the matrix, I can use save first to store the previous status of the context. Once I am done translating, rotating, and so forth I can then use the restore method to put things back the way they where.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var bx = {
    a: 0,
    cx: canvas.width / 2,
    cy: canvas.height / 2,
    w: 64,
    h: 64,
    section: 0,
    update: function () {
        this.a = Math.PI * 2 / 360 * this.section;
        this.section += 1;
        this.section %= 360;
    }
};
 
// draw method using canvas translate, save, restore, and rotate
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(bx.cx, bx.cy);
    ctx.rotate(bx.a);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-bx.w / 2, -bx.h / 2, bx.w, bx.h);
    ctx.restore();
};
 
var loop = function () {
    requestAnimationFrame(loop);
    draw();
    bx.update();
};
loop();
```

## 4 - Points collections and canvas translate

Say for example that I want to have a display object format where a display object instance has an array of point values relative to zero, zero. In addition format also has an x and y property that is the center location of the display object. I can use the canvas translate method to translate to the x and y point of a display object, and then just draw the points in the points array. I can also use the save and restore methods as a way to draw two or more of these kinds of display objects.

### 4.1 - The draw module

So then I will need a draw module for this canvas translate example.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
draw.points = function (ctx, points, close, stroke, fill, lw) {
    close = close === undefined ? true : close;
    stroke = stroke === undefined ? 'black' : stroke;
    fill = fill === undefined ? false : fill;
    ctx.lineWidth = lw === undefined ? 3 : lw;
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    var i = 2,
    len = points.length;
    while (i < len) {
        ctx.lineTo(points[i], points[i + 1]);
        i += 2;
    }
    if (close) {
        ctx.closePath();
    }
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
};
 
draw.dispObjects = function (ctx, dispObjects) {
    var i = 0,
    disp,
    len = dispObjects.length;
    while (i < len) {
        disp = dispObjects[i];
        ctx.save();
        ctx.translate(disp.x, disp.y);
        ctx.rotate(disp.r);
        draw.points(ctx, disp.points, disp.close, disp.stroke, disp.fill, disp.lw);
        ctx.restore();
        i += 1;
    }
};
```

### 4.2 - Main.js and index.html

Now that I have my draw module I can now make use of it with a few of these kinds of display objects.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
canvas.width = 320;
canvas.height = 240;
 
var dispObjects = [{
        x: 64,
        y: 64,
        r: Math.PI / 180 * 10,
        points: [-32, -32, 32, -32, 32, 32],
        fill: false,
        stroke: 'white',
        close: true
    }, {
        x: 50,
        y: 50,
        r: Math.PI / 180 * 90,
        points: [-32, -32, 32, -32, 32, 32],
        fill: false,
        stroke: 'white',
        close: true
    }
];
 
draw.back(ctx, canvas);
draw.dispObjects(ctx, dispObjects);
```

```html
<html>
    <head>
        <title>canvas translate</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 5 - Translating by direction and distance

So there is just passing x and y deltas to the translate method, but what if you want to translate by an angle, and a direction? Well we are still talking about two delta values actually, but how would you go about getting these delta values if you do not know how> Well one way would be to use the Math.cos, and Math.sin methods in two simple expressions where I am just multiplying the results of using those math functions with a distance value.

```js
var transByDirDist = function (ctx, dir, dist, scale) {
    scale = scale === undefined ? 360 : scale;
    var rad = dir / scale * (Math.PI * 2);
    ctx.translate(Math.cos(rad) * dist, Math.sin(rad) * dist);
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var i = 0, a, d = 150, count = 10;
while (i < count) {
    ctx.save();
    a = 90 / count * i;
    transByDirDist(ctx, a, d);
    ctx.fillStyle = 'red';
    ctx.fillRect(-8, -8, 16, 16);
    ctx.restore();
    i += 1;
}
```

This example results in having an array of squares drawn at a distance of 150 pixels from the upper left origin of the canvas from an angle of zero to an angle of ninety degrees in a clockwise direction. After the drawing of all the squares is done the canvas matrix is restored back to the default origin at 0,0 thanks to the save and restore context methods.

## 6 - Conclusion

So the canvas translate method is the built in way to change the drawing location of the canvas origin to something other than the upper left corner of the canvas. The canvas translate is one of many such methods that a javaScript developer should be familiar with when it comes to doing something useful and interesting with a canvas element. The method is often used in conjunction with other drawing context methods such as save, restore, rotate, and many other context methods when it comes to what is actually being drawn to the canvas element.

There is also not just translating the canvas itself, but whatever is being used as a module that stores the state of objects that are to be drawn to the canvas. It is often not to hard to make your own translation methods when it comes to translating the model rather than the canvas element.
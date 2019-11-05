---
title: The canvas translate method
date: 2019-10-09 19:43:00
tags: [canvas]
layout: post
id: 543
categories: canvas
updated: 2019-11-05 12:00:37
version: 1.21
---

The [canvas translate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) method can be used to add a translation transformation the the current canvas matrix. This is so that when something is drawn to a certain point within the canvas using the canvas drawing methods it is actually drawn relative to the translated point, rather that the usual top left corner of the canvas.

<!-- more -->

## 1 - Canvas translate basic example

For a very basic example of the canvas translate method I just put together this simple little example where I am just translating the canvas so that a rectangle at 0,0 is actually rendered at 16,16. In the html I just have a canvas element, and then a script tag that links to an external javaScript file where I have the basic canvas translate example.

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

In the javaScript of the example I just grab a reference to the canvas element, and then a reference to the 2d drawing context. Once I have a reference to the 2d drawing context I can use the canvas translate method to translate the canvas matrix by a given delta x and delta y value.

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

## 2 - A normalized chart data canvas translate example

In this section I will be going over a far more advanced example that has to do with normalized points, and using the canvas translate method to translate the canvas matrix when it comes to drawing those normalized points to the canvas. This example involves creating an object that contains a small amount of data about how well a websites blog post is preforming in terms of search impressions, clicks, and a click threw rate.

This example is an exercise of [separating the concerns of data and view](/2017/08/29/canvas-separation-of-concerns-model-and-view/). The reason why is that the data object contains raw data as well as data that is formatted for viewing, but is not an actual view. This data object is septate from the javaScript that actually renders that data to the canvas.

In this canvas example I am also making normalized points where each point of interest is centered around a relative origin. It is then up to the developer how to go about scaling up the set of 2d points. One way would be to apply an offset to each point, and another would be to use the canvas translate method.


### 2.1 - The data object with noramlized points

So lets start out with the data object. Here I used a self executing function expression to wrap up everything that has to do with the data object into a closure. Inside this closure I created and returned a public api that contains the raw data, as well as normalized and scaled data. This normalized and scaled data is what I will be using when writing my view that will make use of the canvas translate method along with many other aspects of the canvas 2d drawing api.

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

### 2.2 - canvas translate and the Draw Graph method

Now here is the main draw method that uses the canvas translate method to translate the canvas to the center point of the canvas. Once one canvas is translated to the center I then call by additional draw methods that will draw oit the points that are normalized.

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

### 2.3 - The draw stat objects draw method

Here I have the draw method that can be used to draw the chart data to the canvas.

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
---
title: Canvas layers the basics and more
date: 2019-07-01 14:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 496
updated: 2019-11-09 12:43:14
version: 1.9
---

In html 5 canvas there might come a time in which [canvas layers](https://stackoverflow.com/questions/3008635/html5-canvas-element-multiple-layers) should be used. This can be helpful when there is a lot going on in the project and it is not necessary to repaint everything on the same frame tick. There are many was to go about increasing the efficiency of a canvas project, but layering might be a good starting point. Take a moment to think about what is going on in your project, are there things that are being redrawn on each frame tick that do not need to be redrawn each time? If so then take a moment to look into layering.

<!-- more -->

## 1 - canvas layer basic example

So the basic idea of canvas layers is that you just have a collection of canvas elements. A canvas element that is created and added to a container element first will have a lower z index value then canvas elements added after. anything that should have a lower z index value such as a background can be drawn to a canvas that is behind another canvas the draws something that updates on every frame tick. In some situations this can help to improves frame rate, as it allows for a situation in which what is being updated is only that what changes.

```html
<html>
    <head>
        <title>canvas layer example</title>
    </head>
    <body>
        <div style="position:absolute;left:50px;top:50px;">
            <canvas id="canvas_back" width="320" height="240" style="position:absolute;"></canvas>
            <canvas id="canvas_front" width="320" height="240" style="position:absolute;"></canvas>
        </div>
        <script>
// get canvas elements and drawing content for each
var canvas_back = document.getElementById('canvas_back'),
canvas_front = document.getElementById('canvas_front'),
ctx_back = canvas_back.getContext('2d'),
ctx_front = canvas_front.getContext('2d');
// some draw methods
var drawBackground = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
var drawCircle = function (ctx, canvas, circle) {
    ctx.strokeStyle = 'red';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.stroke();

};
// draw background once
drawBackground(ctx_back, canvas_back)
// draw circle on each frame tick
var x = 0,
y = 30
    var loop = function () {
    requestAnimationFrame(loop);
    drawCircle(ctx_front, canvas_front, {
        x: x,
        y: y,
        radius: 15
    });
    x += 5;
    x %= canvas_front.width;
};
loop();

        </script>
    </body>
</html>
```

## 2 - A Basic Canvas Layer Class example

There are many canvas libraries that have been developed all ready, and for the most part it might be best to just go with one of them and be done with it. Still it is not to hard to put together a basic canvas library that just supports layers. In this section I will be going over a very basic canvas layer class that can be considered a very basic canvas library of sorts. Just about any canvas library should at the very least support some kind of layering, so why not just start with that, and many even leave it at that.

### 2.1 - The Layer Class

Here I have the layer class that I worked out. I just created a basic [constructor function](/2019/02/27/js-javascript-constructor) and fr the sake of keeping this simple just a single prototype method.

In the body of the constructor function I am parsing properties for the Layer class instance, and then create the stack of canvas layers. I make sure that the position of the container as well as all the canvas elements is set to absolute positioning so that they stack on top of each other as they should.

```js
var Layers = function (obj) {
 
    // options
    obj = obj || {};
    this.container = obj.container || document.body;
    this.layerCount = obj.layerCount || 3;
    this.layerWidth = obj.layerWidth || 320;
    this.layerHeight = obj.layerHeight || 240;
    this.layers = [];
 
    // set container position to absolute
    this.container.style.position = 'absolute';
 
    // create layers
    var i = 0,
    canvas,
    ctx;
    while (i < this.layerCount) {
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = this.layerWidth;
        canvas.height = this.layerHeight;
        canvas.style.position = 'absolute';
        this.container.appendChild(canvas);
        this.layers.push({
            canvas: canvas,
            ctx: ctx
        });
        i += 1;
    }
 
};
 
Layers.prototype.draw = function (draw, index) {
 
    draw = draw || function () {};
    index = index === undefined ? 0 : index;
 
    var layer = this.layers[index];
    console.log(this.layers)
    draw.call(layer, layer.ctx, layer.canvas);
 
};
```

### 2.2 - An example of the Canvas Layer Class

```html
<html>
    <head>
        <title>canvas layer example</title>
    </head>
    <body>
        <div id="gamearea" style="position:absolute;left:50px;top:25px;">
        </div>
        <script src="layers-lib.js"></script>
        <script>
// create new layers stack
var layers = new Layers({
        container: document.getElementById('gamearea')
    });
// draw background on layer 0 once
layers.draw(function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}, 0);
// draw another area to layer 1 once
layers.draw(function (ctx, canvas) {
    ctx.fillStyle = 'rgba(0,128,128,0.8)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(5, 5, 310, 50);
}, 1);
// can use the top layer for animation
var canvas = layers.layers[2].canvas,
ctx = layers.layers[2].ctx,
obj = {
    x: 0,
    y: 120
};
var loop = function () {
    requestAnimationFrame(loop);
    obj.x += 5;
    obj.x %= canvas.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(obj.x, obj.y, 32, 32);
};
loop();
        </script>
    </body>
</html>
```

## 3 - Conclusion

That is it for canvas layering now, if I get some spare time, or work on a vanilla js canvas project I will likely update this post with some more examples. In any case thanks for reading, and have fun with canvas.
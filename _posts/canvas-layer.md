---
title: Canvas layers the basics and more
date: 2019-07-01 14:05:00
tags: [js, canvas]
layout: post
categories: canvas
id: 496
updated: 2020-08-02 13:27:28
version: 1.23
---

In html 5 canvas there might come a time in which [canvas layers](https://stackoverflow.com/questions/3008635/html5-canvas-element-multiple-layers) should be used as a way to make it so I do not have to render everything all over again over and over again. Canvas layers often might refer to having more than one canvas element in a container element, with them all positioned on top of each other in a certain z index order. In that type of situation I can render only things that are changing, and leave any other static layers alone.

Canvas Layering can be helpful when there is a lot going on in the canvas project, and it is not necessary to repaint everything on the same frame tick. So then the use of laying can help create a situation in which things that only need to be updated on each frame tick are updated. In addition static things that only need to be rendered once, by way of an event, or at a lower rate can be rendered at there lower or higher rates.

There are many was to go about increasing the efficiency of a canvas project, but layering might be a good starting point. Take a moment to think about what is going on in your project, are there things that are being redrawn on each frame tick that do not need to be redrawn each time? If so then take a moment to look into layering as an option for helping to increase FPS by using canvas laying as a way to reduce workload.

<!-- more -->

## 1 - canvas layer basic example

So the basic idea of canvas layers is that you just have a collection of canvas elements in a container element. A canvas element that is created and added to a container element first will have a lower z index value then canvas elements added after using the document.appendChild method unless something is done to change that. There are other methods that can be used to append elements to a parent element differently which would be one way to have control over z order. However there are other ways such as using the CSS zIndex property, or just treating each canvas in the HTML collection as a z level and drawing to it accordingly. However for starters in this section I will just be going over a basic example of canvas layering.

### 1.1 - The basic example

Anything that should have a lower z index value, such as a background can be drawn to a canvas that is behind another canvas that draws something that updates on every frame tick in the foreground. In some situations this can help to improve frame rate a little, by taking what is updated only once at the start of a game and drawing it just once in a separate canvas.

So lets start out with a basic example that is just two hard coded canvas elements in the html itself. Where I have a div element and then two canvas elements contained in the div element that acts as a container of the canvas elements. I will want to set the position of the div to absolute or certain other types of positioning that will work well with this such as fixed. The position of the canvas elements in the div element should also be set to absolute rather than static or relative so that they layer up on top of each other in the container element.

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

This kind of example might be the basic idea as a hard coded example of what canvas laying is. However inmost projects where I am using canvas laying I often work out some solution that involves using javaScript to create and inject the stack of canvas elements.

## 2 - A Basic Canvas Layer Class example

There are many canvas libraries that have been developed before hand, and for the most part it might be best to just go with one of them and be done with it rather than working out your own solution for canvas layering. However I do understand the mindset of wanting to have control over all aspects of a projects source code, and the only way to do that it to take the time to dive deep into these things.

So if you must work out your own canvas layering solution doing so is not to hard, but can prove to be a little time consuming. However to put together a basic canvas library that just supports layers and that is about it might not take to long. SO with that in mind in this section I will be going over a very basic canvas layer class that can be considered a minimal canvas library of sorts. Just about any canvas library should at the very least support some kind of layering, so why not just start with that, and maybe even leave it at that.

### 2.1 - The Layer Class

Here I have the layer class that I worked out just for this post. I just created a basic [constructor function](/2019/02/27/js-javascript-constructor) and for the sake of keeping this simple just a single prototype method that can be used to draw to a given canvas layer index with a draw method.

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

Not much, and there are all ready things I might considerer changing, however the basic idea of canvas layering is there. I want to have a layers array of sorts, and each layer object should have references to the canvas element, and the drawing context of the canvas. This layer object could also be used to store other helpful properties such as layer names, and so forth. However for this section at least I want to keep things minimal.

### 2.2 - An example of the Canvas Layer Class

So then I worked out a very simple use example of they canvas layers class. I just linked to an external javaScript file where I have the javaScript of the layers class parked, and then make used of it in another script tag. This time around the canvas layers class creates canvas elements so I just have a hard coded container div in the HTML itself that I will be using as a mount point.

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

That is it for canvas layering now, if I get some spare time, or work on a vanilla js canvas project that will make use of layering I will likely update this post with some more examples. In any case thanks for reading, and have fun with canvas.
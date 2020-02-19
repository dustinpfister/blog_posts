---
title: Basic Canvas fractal example
date: 2020-02-19 14:37:00
tags: [canvas]
layout: post
id: 616
categories: canvas
updated: 2020-02-19 17:01:14
version: 1.3
---

Fractals are fun, the math can get a little challenging too. Also I am always looking for more things to get into with javaScript purely for the sake of continuing to sharpen my skills, but also just simply as a fun and interesting way to apply what I all ready know.

<!-- more -->

## 1 - A Basic fractal canvas animation example

The basic idea of a fractal is that I have something that will appear the same, or at least similar, as I continue to zoom in or out. So a good starting exercise would be to just have and array of squares, and as I continue to zoom in the square of a certain index value in the array will get bigger, at some point though that square will end up being small again. In other words it is just a repeating loop of squares getting larger, until they get to a certain size, at which point they become the new small square, and of course this is happening in an offset way.

### 1.1 - The For Frame animation helper

```js
var FF = function (opt) {
    var api = {};
    opt = opt || {};
    api.ani = {};
    api.forFrame = opt.forFrame || function () {};
    var setMainPerAndBias = function (api) {
        api.per = api.frameIndex / api.maxFrame;
        api.bias = 1 - Math.abs(0.5 - api.per) / 0.5;
    };
    var forFrame = function (frameIndex, maxFrame) {
        api.frameIndex = frameIndex;
        api.maxFrame = maxFrame;
        setMainPerAndBias(api);
        api.forFrame.call(api, api, frameIndex, maxFrame);
        return api.ani;
    };
    return function (frame, maxFrame) {
        frame = frame === undefined ? 0 : frame;
        maxFrame = maxFrame === undefined ? 50 : maxFrame;
        frame = frame > maxFrame ? frame % maxFrame : frame;
        frame = frame < 0 ? maxFrame - Math.abs(frame) % maxFrame : frame;
        forFrame(frame, maxFrame);
        return api.ani;
    };
};
```

### 2 - The draw module

```js
// DRAW
var draw = {};
draw.bx = function (ctx, bx) {
    ctx.strokeStyle = 'white';
    ctx.globalAlpha = 0.05 + bx.per * 0.95;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.rect(bx.x, bx.y, bx.w, bx.h);
    ctx.stroke();
};
draw.bxArr = function (ctx, ani) {
    var i = 0,
    len = ani.bxArr.length;
    ctx.save();
    while (i < len) {
        draw.bx(ctx, ani.bxArr[i]);
        i += 1;
    }
    ctx.restore();
};
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
```

### 3 - The for frame method for the fractal animation loop

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);
 
var opt = {
    forFrame: function (api, f, mf) {
        var bxArr = api.ani.bxArr = [];
        var i = 0,
        per,
        bxCount = 10,
        maxSize = canvas.width;
        while (i < bxCount) {
            // figure out the percent for the current box
            per = api.per + 1 / bxCount * i;
            per %= 1;
            // create and push the box
            bx = {};
            bx.w = maxSize * per;
            bx.h = maxSize * per;
            bx.x = canvas.width / 2 - (bx.w / 2);
            bx.y = canvas.height / 2 - (bx.h / 2);
            bx.per = bx.w / maxSize;
            bxArr.push(bx);
            i += 1;
        }
        bxArr.sort(function (a, b) {
            if (a.per > b.per) {
                return 1;
            }
            return -1;
        });
    }
};
 
// create an animation method
var ani = FF(opt);
 
var frame = 0;
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(ctx, canvas)
    draw.bxArr(ctx, ani(frame, 200));
 
    frame += 1;
    frame %= 200;
 
};
loop();
```
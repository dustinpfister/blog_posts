---
title: Basic Canvas fractal example
date: 2020-02-19 14:37:00
tags: [canvas]
layout: post
id: 616
categories: canvas
updated: 2021-02-14 14:10:27
version: 1.25
---

I would say that [Fractals](https://en.wikipedia.org/wiki/Fractal) are fun, the math can get a little challenging too so it is also an example of the kind of thing to get into these days when it comes to me trying to find novel and inserting things to do with javaScript. I am always looking for more things to get into with javaScript purely for the sake of continuing to sharpen my skills, and just make more [canvas examples](/2020/03/23/canvas-example/) to play around with. However fractals are also just simply a fun and interesting way to apply what I all ready know with javaScript in an artful way for what that is worth to me.

The basic idea of a fractal as I see it is that I am dealing with some kind of image pattern that repeats as I continue to zoom in. That might be a pretty crude definition that does not do the subject justice, but more often then not it would appear that is what a fractal is. So a very simple canvas fractal example could just be an animation of some squares getting bigger from a single starting point, and then looping back to that point once they get big enough. So that would maybe be a good starting point actually, but I would not stop there with this sort of thing.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/animation-fractal/0.1.0/pkg.js"></script>

## 1 - A Basic looping square array fractal canvas animation example

So maybe a good starting exercise for fractals would be to just have and array of squares, and as I continue to zoom in the square of a certain index value in the array will get bigger, at some point though that square will end up being small again at the starring point. In other words it is just a repeating loop of squares getting larger, until they get to a certain size, at which point they become the new small square, and this is happening in an offset way where each square in the collection is at a certain point in this transition.

Maybe another way to explain this is that I have and array of box objects with x, y, width, and height properties. All I am doing is setting say the first box in the array with an index of zero to a width and height of zero, and then setting the position to a certain starting point at say the center of the canvas. As I move up in the index values of the array of box objects the size of the boxes gets bigger in terms of the width and height, and the position of the upper left corner moves to the upper left corner of the canvas. When updating the values of this collection  at some point the largest box gets to a certain max size at which point it will become the new box with a width and height of zero at the starting position. Thus the result is a simple loop of boxes getting bigger from a starting location looping over and over again.

So with that said this section will be a canvas fractal animation of just some boxes getting bigger from a starting point over and over again.

### 1.1 - The For Frame animation helper

So I have worked out a function that helps me quickly get up and running with frame by frame style animations. I went over this and much more in my [post on canvas animation basics](/2019/10/10/canvas-example-animation-basics/) in general.

This function accepts an options object when I call it that will contain a function that will be called on a frame by frame basis. Each time the for frame function that is passed as an option is called there will be an api of sorts that I can use when working out the logic of a for frame method. In this api I have properties such as the current percentage value between a current frame value, and a max frame value. these properties are useful when it comes to working out the values that constitute an animation.

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

### 1.2 - The for frame method for the fractal animation loop

Now for the actual animation logic, and everything else that will result in this canvas fractal animation. Here I create the canvas element and get the drawing context, work out the options object for my for frame method, and make a basic app loop method in which I use the for frame method instance to update the animation state, as well as draw that state.

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

### 1.3 - The draw module

Here I have the draw module for this canvas animation example of a basic box array fractal. I have a bx method that will just draw a single box, and then a bx array method that will draw the whole array. In addition there is a method that I use to just draw the background of the canvas.

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

### 1.4 - Up and running

When I have this example running in the browser it is what I would expect just a bunch of squares getting bigger from a single starting point. However many of the basic features of fractal animations are there, it is just a little boring and basic. I can play around with the expressions that are used to set the size and position of the boxes to make it a little more interesting, but that is all there is to this example at least.

To make thing more interesting though I could mess around with the expressions and introduce some images. There are all kinds of fun projects that could be accomplished with just a little more work. However maybe another thing that could be done is to start over with another for frame method all together, or a whole new approach to this from the ground up.

## 2 - Conclusion

There is much more to write about when it comes to fractals, and ways to define the logic of fractals and how to go about drawing them. If I get some more time, maybe I will get around to continuing to expand on this post, as well as maybe start a few additional post on this topic. fractals are and aspect of using javaScript and canvas that interest me, but I do not have as much experience working with them as I would like to have. There are many other things to writing about when it comes to these canvas examples, javaScript, and programing in general.
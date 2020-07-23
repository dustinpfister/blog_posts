---
title: The Canvas Element in client side javaScript
date: 2020-07-22 15:38:00
categories: canvas
tags: [canvas]
layout: post
id: 685
updated: 2020-07-23 09:49:52
version: 1.21
---

In client side javaScript there is the [canvas element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) that is one of the coolest, if not the coolest elements to with with. The reason why is because it can be used to create graphics and animations using javaScript code. So it goes without saying that this [canvas element is worth doing a great deal of research](https://en.wikipedia.org/wiki/Canvas_element) on beyond this post if you have not done all ready. If you have a solid grasp on the element all ready then you might want to do more research now and then how other developers work with the element by looking at there own collection of [canvas examples](/2020/03/23/canvas-example/) to gain a better sense of how to work on all kinds of different projects that make use of canvas elements. 

There is a whole bunch of methods for drawing to a canvas element when it comes to drawing lines and shapes, as well as rendering an image to the canvas, and even working with raw image data.

I have wrote a lot of posts on the canvas element then, from getting started posts, to posts on various properties and methods in the 2d drawing context API, to full canvas examples of games, animations, and so forth. So it was only a matter of time until I made a main blog post of sorts that will act as a center point for all things canvas related on this github pages site of mine here.

<!-- more -->

## 1 - Getting started with canvas

This section will be just me briefly going over the very basics of how to get started with canvas elements, if you are an experienced javaScript developer the you will likely want to skip over this section and move on to the good stuff when it comes to working with the canvas element.

So I have wrote a [getting with canvas post](/2017/05/17/canvas-getting-started/) a long time ago, but I will also touch on this subject briefly here as well. The basic idea is that you need to first get a reference to a canvas element, one that is hard coded into the actual html itself, or one that is created and then injected with a little javaScript code.

Once you have a reference to a canvas element, you can then use the getContext method of the canvas element to get a reference to the 2d drawing context of the canvas element. With this context API it is then possible to now draw to the canvas with a whole much of drawing methods, and properties.

### 1.1 - A simple copy and past black screen canvas example

So in this section I will be going over a very simple canvas example that you can copy and past into the javaScript console right now. Just press ctrl+shift+j if you are using chrome, then copy and past the below canvas example into the javaScript console and press return. The result should be a blank canvas element in the upper left corner of the browser window.

```js
(function () {
 
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    // append to body
    document.body.appendChild(canvas);
 
    // set actual matrix size of the canvas
    canvas.width = 320;
    canvas.height = 240;
    // fixed position
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
 
    // default the canvas to a solid back background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
}
    ());
```

So there you have a very basic canvas example that just involves creating an injecting a canvas element into a web page. I just created an canvas element, appending it to the body element, set the width and height, set fixed positioning for it via the style API. I then usd the fill style property, and the fill rect method to draw a black rectangle from the upper left corner of the canvas to its with and height to just make a blank black canvas.

### 1.2 - A Still somewhat Simple HTML copy and paste example of a canvas animation

So now for something just a little more involved then the blank canvas example. Here I have a canvas example that does a little more then just create and inject a blank black canvas element, it is a simple animation of a circle moving around in a circle like pattern. I know it is not the most interesting of canvas examples, but this is the getting started section of my main canvas post so I just need to get this one out of the way here. Also in the process of going over it I will also be touching base on a whole much of little topics that have to do with canvas so maybe reading this is not a waste of time after all.

Just as before I am creating and injecting a canvas element, but this time I am doing so in a container element rather than that of body. So this is not the kind of example that you can just copy and past into the javaScript console like in the previous example. Now we need to create and open an html file for this one, and this is often how I would go about staring many of my serious canvas examples. The container element is a div, that has some inline style that is consistent with what I would do when it comes to making a page embed for one of my canvas example posts. I have some dimension to the div, and I make it so it will center in the page.

In this example I now have a state object and a few methods that will update that state object. This is a crude yet effective way of getting into something that is also an important topic of canvas apps, and javaScript apps in general actually. Having some way to separate a module from a view. That is having some kind of object that is intendant of code that is used to render that object to the canvas element. This might not be the best example of this, but I will be getting into this a bit more in this post. In additional [I have a septate post in which I write about this topic of model and view](/2017/08/29/canvas-separation-of-concerns-model-and-view/) in greater detail all ready so moving on.

```html
<html>
    <head>
        <title>Canvas animation example</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script>
(function () {
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    // append to container
    container = document.getElementById('canvas-app');
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    var state = {
        lastTick: new Date(),
        FPS: 1000 / 40,
        cx: canvas.width / 2,
        cy: canvas.height / 2,
        x: 0,
        y: 0,
        r1: 100,
        r2: 16,
        frameIndex: 0,
        maxFrames: 50
    };
    var set = function (state) {
        var per = state.frameIndex / state.maxFrames,
        radian = Math.PI * 2 * per;
        state.x = state.cx + Math.cos(radian) * state.r1;
        state.y = state.cy + Math.sin(radian) * state.r1;
    };
    var update = function (state) {
        var now = new Date(),
        t = now - state.lastTick;
        if (t >= state.FPS) {
            state.frameIndex += 1;
            state.frameIndex %= state.maxFrames;
            set(state);
            state.lastTick = now;
        }
    };
    var draw = function (ctx, canvas, state) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(state.x, state.y, state.r2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    };
    var loop = function () {
        requestAnimationFrame(loop)
        update(state)
        draw(ctx, canvas, state);
    };
    loop();
}
    ());
        </script>
</body>
</html>
```

In the have a draw method that will be used to draw the current state of this state object to the canvas. In real projects this draw method will often become a draw module of sorts with many draw methods for drawing all kinds of aspects of a far more advanced module that is more than just a circle moving around in a circle.

The example also has a main app loop method that makes use of the request animation frame method as a way to make such an app loop. In this app loop I am updating the model, and then drawing the model to the canvas element.

So We have went over many of the basic here then when it comes to working with canvas elements. There is creating and injecting a canvas. There is creating a state object of some kind, and then having methods that are used to update that state. There is having a method to draw that state to the canvas element, and then there is having a main app loop. I still did not cover everything when it comes to the basic of canvas just yet though. There is of course adding events to have a way to make it so that canvas responds to user input of course, and there is a whole world of drawing methods other that fill rect, and the various methods I used to draw the circle. However maybe that is good for a getting started with canvas section in this post at least.

## 2 - User input and canvas

One thing that makes canvas so cool is that it is not just something that can be drawn to with javaScript code. A canvas element just like any other element can have all kinds of event handers attached to it. This allows for user input to be taken into account when working out a canvas project when it comes to pointer device input from a mouse or touch screen, keyboard events, and any other kinds of event that can be attached to a canvas element.

I will not be getting into user input and canvas in detail here, as I have wrote a lot of other posts where that was the main focal point of the content. However I think that it is called for to at least go over a basic copy and past example of user input and canvas here, and maybe a bot more then that if I get around to it.

### 2.1 - A simple mouse event example

A good starting point with user input and canvas might be to get into mouse events if working in a desktop operating system environment, and more often then not I assume that is the case.

The basic idea here is to just attach an event hander to the canvas element using the addEventLsitener method, passing a mouse event type such as mouse down as the first argument, and then a function that will fire each time that event happens as the second argument. In the body of this function and event object will be passed, and this event object will contain useful properties like clientX, and clientY with mouse events that contain the position where the mouse down event happed. However the values will be window rather than canvas relative, so a method like getBoundingClientRect must be used off a reference to the canvas element, and that can be used as a way to adjust the window relative values to get a canvas relative value.

There is more to it when it comes to getting a canvas relative position in general that will work with both mouse and touch events in general. When it comes to that though I have wrote a [post on getting a canvas relative pointer position](/2020/03/04/canvas-get-point-relative-to-canvas/) where I get into this topic in detail.

```js
<html>
    <head>
        <title>Canvas animation example</title>
    </head>
    <body>
        <div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
        <script>
(function () {
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    // append to container
    container = document.getElementById('canvas-app');
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    var getCanvasRelative = function (e) {
        var canvas = e.target,
        bx = canvas.getBoundingClientRect();
        return {
            x: e.clientX - bx.left,
            y: e.clientY - bx.top,
            bx: bx
        };
    };
    var state = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
    var draw = function (ctx, canvas, state) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.translate(state.x, state.y);
        ctx.fillRect(-16, -16, 32, 32);
        ctx.restore();
    };
    canvas.addEventListener('mousedown', function(e){
        var pos = getCanvasRelative(e);
        state.x = pos.x;
        state.y = pos.y;
        draw(ctx, canvas, state);
    });
    draw(ctx, canvas, state);
}
    ());
        </script>
</body>
</html>
```

## 3 - Conclusion

So that is just about it for now at least when it comes to writing about canvas in general. There is much more to write about when it comes to canvas of course, but that is all broken down into many other [posts on the canvas element here on my site](https://dustinpfister.github.io/tags/canvas/). I have been puuting a lot of time into this collection of content, so you can rest asure that I will come back to editing this post as my collection of content grows and there is more that comes to mind that I feel is worth mentioning here.

From here on out if you are new to canvas, or have been fiddling with it for years and are just at a loss for what to do next the best thing to do is to just start working on your own projects. I have wrote a main post on my collection of [canvas examples](/2020/03/23/canvas-example/) that I have been doing an okay job of keeping up to date as I expand my collection of canvas examples. Maybe that would be a good starting point when it comes to gaining some inspiration for project ideas if you do not have many.

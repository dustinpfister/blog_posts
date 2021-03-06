---
title: Canvas alpha transparency global alpha property and transparent styles
date: 2019-10-11 19:00:00
tags: [canvas]
layout: post
id: 545
categories: canvas
updated: 2020-06-06 18:31:01
version: 1.22
---

In [canvas alpha](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha) channel transparency can be achieved by way of the global alpha property, but also in a number of other ways. There is the global alpha property of the 2d drawing context, and then there is also using the RGBA notation to set a web color for fill or stroke styles. There are a number of other topics to canvas and alpha transparency also, such as using a png image with an alpha channel, and using the clear rect method and having a background behind the canvas element when it comes to getting into layering. So lets look at some examples that have to do with canvas alpha transparency in html 5 canvas and javaScript.

<!-- more -->

## 1 - canvas alpha transparency using the global alpha property

The global alpha property of the 2d drawing canvas context is maybe the most common typical way to go about setting transparency for something that is going to be rendered in canvas. Just set a value from zero to one for the property and anything that will be drawn or stroked will have that degree of transparency.

This can be useful if I want to set a canvas alpha channel transparency for everything that I end up drawing to the context, rather than just having it apply to a stroke or fill style and not everything else like draw image calls.

```html
<html>
    <head>
        <title>canvas line</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script>
var canvas = document.getElementById('the-canvas'),ctx;
ctx = canvas.getContext('2d');
 
// solid black background
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
// fully opacity red circle
ctx.fillStyle='red';
ctx.beginPath();
ctx.arc(160,120, 40, 0, Math.PI * 2);
ctx.fill();
 
// half opacity green circle using globalAlpha
ctx.fillStyle='green';
ctx.globalAlpha = 0.5;
ctx.beginPath();
ctx.arc(180,140, 40, 0, Math.PI * 2);
ctx.fill();
        </script>
    </body>
</html>
```

When done set the value back to one, or use save and restore to set opacity back to what it was before hand.

## 2 - Using a css color data type value

A [css color data type](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) value can also be used to set an alpha-channel transparency value using the RGBA functional notation for example. This way it is just a matter of me setting the desired color value when setting the fill or stroke style when making graphics with the 2d context drawing methods, then just draw what I want to have a canvas alpha transparency with that style.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
// solid black background
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
// fully opacity red circle
ctx.fillStyle='red';
ctx.beginPath();
ctx.arc(160,120, 40, 0, Math.PI * 2);
ctx.fill();
// half opacity green circle using globalAlpha
ctx.fillStyle='rgba(0,128,0,0.5)';
ctx.beginPath();
ctx.arc(180,140, 40, 0, Math.PI * 2);
ctx.fill();
```

This will of course only work with paths that are drawn with 2d canvas drawing context method calls. So when it comes to drawing images from an external file, Image Data, or another canvas element as a way of rendering to the canvas I am still going to want to use an alternative means of alpha channel transparency. The global alpha property could again be one way to set a global transparency value. However there is also the source images themselves of course and if they have any transparency values.

## 3 - transparent circles canvas alpha example

Now it is time to have some fun with global alpha and make a real canvas example that does something interesting. I went a little overboard with this one, but it was worth it the canvas example looks pretty cool. It has a feature where each circle has an alpha property which is set by the distance from the center of the canvas. So as the collection of circles moves around the canvas the transparency will become opaque as they move closer to the center and  more transparent as they move away from it..

### 3.1 - The circles.js module

Here I have the circles.js file that I use to create a state object, as well as update that state object with the two public methods that it returns to the global variable that it appends to. If of course contains a whole bunch more additional internal methods that all aid with the process of creating and updating a state object which contains an array of circle objects.

Another cool feature of this canvas alpha examples circles.js file is the forTicks array. Each circle has a for tick index number that corresponds with one of these methods that will update the heading of the circle based on the logic of the current method in that array. I could do way more than just change the headings of circles in one of these methods, but for now I just did that to make the movement a little more interesting. There is also a for tick life property that is used as a way to change the for tick index value in the main update method.

```js
var circles = (function () {
 
    var mod = function mod(x, m) {
        return (x % m + m) % m;
    };
    var distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
 
    var forTicks = [
        // noop (just move with current stats)
        function () {},
        // move 45 degrees per second
        function (state, circle, secs) {
            circle.heading += Math.PI / 180 * 45 * secs;
        },
        // weird thing with sin
        function (state, circle, secs) {
            circle.ticks += secs;
            circle.ticks = mod(circle.ticks, 100);
            var r = Math.PI * 2 * (circle.ticks / 100);
            circle.heading = Math.sin(r) * (Math.PI * 2);
        },
        // go down
        function (state, circle, secs) {
            circle.heading = Math.PI / 2;
        },
        // go up
        function (state, circle, secs) {
            circle.heading = Math.PI * 1.5;
        },
        // go right
        function (state, circle, secs) {
            circle.heading = 0;
        },
        // go left
        function (state, circle, secs) {
            circle.heading = Math.PI;
        }
    ];
 
    var randomForTickIndex = function () {
        return Math.floor(forTicks.length * Math.random())
    };
 
    var genCircles = function (state) {
        state.circles = [];
        var i = 30,
        colors = ['red', 'lime', 'blue', 'white'],
        color;
        while (i--) {
            color = colors[Math.floor(Math.random() * colors.length)];
            state.circles.push({
                x: state.canvas.width / 2,
                y: state.canvas.height / 2,
                radius: 16 + 32 * Math.random(),
                color: color,
                alpha: 0.5,
                pps: 64 + 128 * Math.random(),
                heading: Math.PI * 2 * Math.random(),
                ticks: 0,
                forTickIndex: randomForTickIndex(),
                forTickLife: 3
            });
        }
    };
 
    var wrapCircle = function (state, circle) {
        var canvas = state.canvas;
        if (circle.x < circle.radius * -1) {
            circle.x = mod(circle.x, canvas.width + circle.radius) + circle.radius;
        }
        if (circle.x > canvas.width + circle.radius) {
            circle.x = mod(circle.x, canvas.width + circle.radius) - circle.radius;
        }
        if (circle.y < circle.radius * -1) {
            circle.y = mod(circle.y, canvas.height + circle.radius) + circle.radius;
        }
        if (circle.y > canvas.height + circle.radius) {
            circle.y = mod(circle.y, canvas.height + circle.radius) - circle.radius;
        }
    };
 
    // set alpha of a circle based on distance
    var setCircleAlpha = function (state, circle) {
        var d = distance(circle.x, circle.y, state.canvas.width / 2, state.canvas.height / 2);
        circle.alpha = 1 - d / (state.canvas.width / 2);
        circle.alpha = circle.alpha < 0 ? 0 : circle.alpha;
    };
 
    // public API
    return {
        create: function (opt) {
            opt = opt || {};
            var state = {
                canvas: opt.canvas,
                ctx: opt.canvas.getContext('2d'),
                lastTime: new Date(),
                circles: []
            };
            genCircles(state);
            return state;
        },
        update: function (state) {
            var now = new Date(),
            t = now - state.lastTime,
            secs = t / 1000,
            i = state.circles.length,
            circle;
            while (i--) {
                circle = state.circles[i];
 
                // forTick
                forTicks[circle.forTickIndex](state, circle, secs);
                circle.heading = mod(circle.heading, Math.PI * 2);
 
                // step and wrap position
                circle.x += Math.cos(circle.heading) * circle.pps * secs;
                circle.y += Math.sin(circle.heading) * circle.pps * secs;
                wrapCircle(state, circle);
                setCircleAlpha(state, circle);
 
                circle.forTickLife -= secs;
                if (circle.forTickLife <= 0) {
                    circle.forTickLife = 3;
                    circle.forTickIndex = randomForTickIndex()
                }
            }
            state.lastTime = now;
        }
    }
 
}
    ());
```

### 3.2 - The draw module for transparent circles

I will need a way to draw the state of one of my circles.js files state objects to the canvas. So here is the draw module that will do just that. I included a gradient method to make a background that is a little more interesting then just my usual plain black background. The of the method to draw the background, and of course a method to draw the current state of all my circle objects.

```js
var draw = (function () {
 
    var gradient;
    var api = {};
 
    // set a gradient for the background
    api.setGradient = function (state) {
        var canvas = state.canvas;
        gradient = state.ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.33, '#00ff00');
        gradient.addColorStop(0.66, '#0000ff');
        gradient.addColorStop(1, '#ffffff');
    };
 
    // draw background
    api.back = function (state) {
        var ctx = state.ctx,
        canvas = state.canvas;
        ctx.fillStyle = gradient || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    // draw the circles
    api.circles = function (state) {
        var ctx = state.ctx,
        canvas = state.canvas,
        i = state.circles.length,
        circle;
        ctx.stokeStyle = 'black';
        ctx.lineWidth = 3;
        while (i--) {
            circle = state.circles[i];
            ctx.globalAlpha = circle.alpha;
            ctx.fillStyle = circle.color;
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    };
 
    return api;
 
}
    ());
```

The draw circles method uses the global alpha property to set the global alpha value of the drawing context to the current circle. Once all the circles are drawn I the  make sure to set global alpha back to the default of 1.

### 3.3 - The main.js, and html files

time now to tie everything together with a main.js file and a little HTML. In my main.js file I create a circles.js state object with my create public method. I then also call the set gradient method of my draw module passing the state object to set up the gradient background for the state object. I then have a simple app loop in which I am drawing the background, the circles, and then updating the state object.

```js
var state = circles.create({
        canvas: document.getElementById('the-canvas')
    });
draw.setGradient(state);
var loop = function () {
    requestAnimationFrame(loop);
    draw.back(state);
    draw.circles(state);
    circles.update(state);
};
loop();
```

The html then looks like this:

```html
<html>
    <head>
        <title>canvas alpha</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="circles.js"></script>
        <script src="draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

When this canvas example is up and running it is pretty cool to look at. A whole bunch of circles moving all over the place in all kinds of interesting ways. Of course the transparency of the circles changes depending on the circles location relative to the center of the canvas. I could put more time into it, making a more interesting form of my for tick methods, but I all ready spend way to much time on this one.

## 4 - Conclusion

So there are some basics when it comes to working with canvas alpha transparency, there is much more to write about on this topic when it comes to other aspects of canvas relating to alpha channel transparency as well as transparency in general. For example there are the various values that can be assigned to the Global Composite Operation property that I have touched base on in my post on [canvas clip](/2019/10/08/canvas-clip/).

There is also of course the nature of PNG files that support an alpha channel, external assets like this can be added to projects and then drawn to the canvas using the draw image method. There is also working with raw image data and the use of alpha channels there.

Still for the most part this post was just on the global alpha property, and for that alone there is only so much to write about in time I might expand this post on canvas alpha transparency in general, but for now this is all.
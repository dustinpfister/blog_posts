---
title: Game Spinner Canvas example
date: 2020-06-07 12:09:00
tags: [canvas]
categories: canvas
layout: post
id: 664
updated: 2020-06-15 08:03:21
version: 1.9
---

This [canvas example](/2020/03/23/canvas-example/) will be of a game spinner. In other words a virtual from of one of those things that you get in many board games that functions as an alternative to dice that has a spinner or arrow type thing attached to the center of a disk with a bunch of sections on it. So this canvas example will involve a module that can be used to create a state object for this sort of thing, and like aways a draw module that is used to draw the state of one of these to a canvas element.

<!-- more -->

## 1 - The spinner.js file for this canvas example

So in this section I will be going over all the features of my spinner.js file that can be used to create an instance of a spinner object. The module contains a public API that is used to create an instance of one of these objects, and then a bunch of methods that are used to set up a new spin, and update the state of that spinner object on each frame tick.

```js
var spinner = (function () {
 
    var PI2 = Math.PI * 2;
 
    var createSectionObject = function (opt) {
        return {
            background: opt.background || 'green',
            value: opt.value === undefined ? null : opt.value
        };
    };
 
    // get current section value or object
    var get = function (spin) {
        var len = spin.sectionIndices.length,
        index = spin.sectionIndices[Math.floor(spin.radian / PI2 * len)];
        return spin.sections[index];
    };
 
    return {
 
        // create a spinner state object
        create: function (opt) {
            opt = opt || {};
            var spin = {
                cx: opt.cx === undefined ? 0 : opt.cx,
                cy: opt.cy === undefined ? 0 : opt.cy,
                RPS: {
                    current: 0,
                    start: [3, 8],
                    lossPerSecond: 2
                },
                radian: 0,
                sections: opt.sections || [1, 2, 3],
                sectionIndices: opt.sectionIndices || [0, 1, 0, 1, 2],
                currentSection: null
            };
            return spin;
        },
 
        // start spinning a spinner state object
        startSpin: function (spin) {
            var RPS = spin.RPS;
            RPS.current = RPS.start[0] + Math.random() * (RPS.start[1] - RPS.start[0]);
        },
 
        // update a spinner object
        update: function (spin, secs) {
            var RPS = spin.RPS;
            // just step by RPS times secs
            spin.radian += RPS.current * secs;
            spin.radian %= PI2;
            RPS.current -= RPS.lossPerSecond * secs;
            RPS.current = RPS.current < 0 ? 0 : RPS.current;
            spin.currentSection = get(spin);
        }
 
    }
 
}
    ());
```

## 2 - The draw.js module

This is a canvas example so like always I will want a module that is packet with methods that I can call to render the state of a spinner state object to a canvas element. Here I went with an object literal module pattern that I usual go with when it comes to these kinds of modules. I also have it so I pass the drawing context, canvas, and any other objects that I need to draw in the given methods rather than grabbing at globals for these things.

```js
var draw = (function () {
 
    var api = {};
 
    // public draw background
    api.background = function (ctx, canvas) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
 
    var getSectionRadian = function (spin, i) {
        return Math.PI * 2 / spin.sectionIndices.length * i;
    };
 
    // public draw sections
    api.sections = function (ctx, spin) {
        var i = 0,
        r,
        len = spin.sectionIndices.length,
        sectionIndex,
        section;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        while (i < len) {
            sectionIndex = spin.sectionIndices[i];
            section = spin.sections[sectionIndex];
            var r1 = getSectionRadian(spin, i),
            r2 = getSectionRadian(spin, i + 1),
            x1 = spin.cx + Math.cos(r1) * 64,
            y1 = spin.cy + Math.sin(r1) * 64;
            ctx.beginPath();
            ctx.moveTo(spin.cx, spin.cy);
            ctx.lineTo(x1, y1);
            ctx.arc(spin.cx, spin.cy, 64, r1, r2);
            ctx.stroke();
            i += 1;
        }
    };
 
    // public draw arrow
    api.arrow = function (ctx, spin) {
        var x = spin.cx + Math.cos(spin.radian) * 64,
        y = spin.cy + Math.sin(spin.radian) * 64;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(spin.cx, spin.cy);
        ctx.lineTo(x, y);
        ctx.stroke();
    };
 
    // draw info
    api.info = function (ctx, spin) {
        var x = spin.cx - 64,
        y = spin.cy + 64,
        section = spin.currentSection;
        ctx.fillStyle = 'white';
        ctx.textBaseline = 'top';
        ctx.fillText('radian: ' + spin.radian, x, y + 20);
        ctx.fillText('section: ' + section, x, y + 30);
    };
 
    return api;
 
}
    ());
```

## 3 - The main.js and index.html files

So now that I have my spinner.js file, and a draw.js file that can be used to draw the state of a spinner object it is time to test this all out with just a little more javaScript, and some HTML. For this I have my main.js file where I create and inject the html element for the canvas example, and also create an instance of my state object for this example which is a spinner state object created with the create public API method of the spinier.js module the I covered before hand. Here in the main.js file I also have my main app loop, and I also attach events for the spinner state object.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
canvas.width = 640;
canvas.height = 480;
 
var spin = spinner.create({
        cx: canvas.width / 2,
        cy: canvas.height / 2
    });
 
var lt = new Date();
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    spinner.update(spin, secs);
    draw.background(ctx, canvas);
    draw.sections(ctx, spin);
    draw.arrow(ctx, spin);
    draw.info(ctx, spin);
    lt = now;
};
loop();
 
canvas.addEventListener('mousedown', function (e) {
 
    spinner.startSpin(spin);
 
});
```

And the html for the example.

```html
<html>
    <head>
        <title>canvas example game spinner</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="./lib/spinner.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

## 4 - Conclusion

So this example is more or less what I had in mind but I did not take the time to create any kind of actual game around it. It is still a nice quick canvas example project though when it comes to making this sort of thing. There is more that I could do with this when it comes to use case examples, and adding additional features to it, however I also have many other canvas examples that I thing deserve a higher degree of attention when it comes to further work to be done on these canvas examples of mind, as the basic idea is very much there with this one.
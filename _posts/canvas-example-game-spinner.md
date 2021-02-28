---
title: Game Spinner Canvas example
date: 2020-06-07 12:09:00
tags: [canvas]
categories: canvas
layout: post
id: 664
updated: 2021-02-28 15:03:42
version: 1.18
---

This [canvas example](/2020/03/23/canvas-example/) will be of a game spinner. In other words a virtual from of one of those things that you get in many board games that functions as an alternative to dice that has a spinner or arrow type thing attached to the center of a disk with a bunch of sections on it. So this canvas example will involve a module that can be used to create a state object for this sort of thing, and like aways a draw module that is used to draw the state of one of these to a canvas element.

<!-- more -->

<div id="canvas-app"></div>
<script src="/js/canvas-examples/game-spinner/0.0.0/pkg.js"></script>

## 1 - The spinner.js file for this canvas example

So in this section I will be going over all the features of my spinner.js file that can be used to create an instance of a spinner state object. This state object can then be rendered to a canvas element using a draw.js module for this spinner state object that I will be getting to in a later section in this post.

I start off the module with an IIFE that will contain just a few internals that as of this writing is just a get section helper method, and a value that holds the value of PI time two. If I where to continue working on this one I would expand this with more helpers and such, but for now I think I would like to keep this canvas example simple and to the point.

```js
var spinner = (function () {
 
    var PI2 = Math.PI * 2;
 
    // get current section value or object
    var get = function (spin) {
        var len = spin.sectionIndices.length,
        index = spin.sectionIndices[Math.floor(spin.radian / PI2 * len)];
        return spin.sections[index];
    };
```

The module contains a public API that is used to create an instance of one of these spinner state objects, and then a bunch of methods that are used to set up a new spin, and update the state of that spinner object on each frame tick. So the general idea here is to use the create method to create a spinner state object once, and then use the start spin method in the body of an event hander that will start the spin. Then the update method will be called in an app loop update method to update the state of the spinner on a frame by frame basis.
```js
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

The core of the idea I had in mind with this module is that I wanted something that can be used to create more than one instance of this spinner state object, and to have a way to customize it. In the state object there is the sections array that will hold the possible values for each type of section and then the section indices array that will hold index value for each element in the sections array that can be used as a way to map what values go where in the spinner. the reason for this is that I might have a spinner that contains more than one section with the same value, so I have an array of values, and an array of index value for those values. Maybe this makes the state object a little more complex, but is an exercise of something that might help to make this a little better organized so that I do not repeat values.

In any case I am sure if I where to start using this in a real project I would be adding a lot more to it. However a lot of what would change would vary depending on the nature of the project in which I would be using it.

## 2 - The draw.js module

This is a canvas example so like always I will want a module that is packed with methods that I can call to render the state of a state object to a canvas element in this case a spinner state object. Here I went with an IIFE module pattern yet again even though I am making everything public, I often go with IIFES anyway when it comes to these kinds of modules and modules in general because sometimes I add private helpers later on. However hear I do have one such private helper method thus far so it still makes sense to go with an IIFE rather than the object literal pattern. I also have it so I pass the drawing context, canvas, and any other objects that I need to draw in the given methods rather than grabbing at globals for these things.

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

So I have broken the process of drawing a spinner into a few steps. First I would want to draw the sections of the spinner object, then the current state of the arrow, and finally the debug info of the spinner state object. So now that I have a state module and a way to draw a state object created with that state module, lets look at just a little more code that puts all of this into action.

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

So then the result of this is a spinner at the center of the canvas element when it click the canvas the spinner starts moving and will start to slow down also. Eventually it will land on a section the value of which is displayed via the use of my draw info method in the draw module.

In a real project I would change the index values for the sections, as well as what the sections are. In some cases I could have an array of objects rather than numbers for the sections that would contain style into for the sections when it comes to further skinning the spinner.

## 4 - Conclusion

So this example is more or less what I had in mind but I did not take the time to create any kind of actual game around it. It is still a nice quick canvas example project though when it comes to making this sort of thing. There is more that I could do with this when it comes to use case examples, and adding additional features to it, however I also have many other canvas examples that I thing deserve a higher degree of attention when it comes to further work to be done on these canvas examples of mind, as the basic idea is very much there with this one.
---
title: A canvas example of a basic clock
date: 2019-12-13 12:39:00
tags: [canvas]
layout: post
categories: canvas
id: 580
updated: 2020-05-06 11:15:09
version: 1.17
---

For today I would like to write another post about a [canvas example](/2020/03/23/canvas-example/), because canvas is fun and life is short. Todays post on canvas examples will be an example of a basic clock. Making clocks is fun because doing so is easy, but there is also lots of room when it comes to doing things that are original with it when it comes to getting creative with canvas and javaScript. Sure a starting point would be just a simple digital or analog clock but why stop there as there are so many things that a developer could do when it comes to working with date objects and using them to update the state of an object that can then be rendered using canvas. Still in this post I will be going over just a simple basic clock concept using canvas and javaScript.

<!-- more -->

## 1 - Te clock.js file for a basic canvas clock example

So lets start out with a very basic canvas clock example that will just be a digital clock along with some other little features. This will involve a module that has at least one public method that will create a clock object based on the passed date given as the first argument. The clock object will contain properties that are then used in one or more draw methods that are used to render the current state of that clock object to a canvas element.

```
var clockMod = (function () {
    // pad a value
    var pad = function (a) {
        return String('00' + a).slice(-2);
    };

    var getTimeText = function (clock) {
        return pad(clock.now.getHours()) + ' : ' +
        pad(clock.now.getMinutes()) + ' : ' +
        pad(clock.now.getSeconds());
    };

    var getDayStart = function (clock) {
        return new Date(clock.now.getFullYear(), clock.now.getMonth(), clock.now.getDate(), 0, 0, 0, 0)
    };

    // return a public method that creates a clock object
    return {
        create: function (date) {
            var clock = {};
            clock.now = date || new Date(0);
            clock.timeText = getTimeText(clock);
            var dayStart = getDayStart(clock);
            clock.dayPer = (clock.now - dayStart) / 86400000;
            clock.secPer = clock.now.getMilliseconds() / 1000;
            return clock;
        }
    }

}
    ());
```

So then this module returns an object that has thus far just one method that I will be using to create a clock object in my main.js file. The aim here is to work out the basic idea of what I should be doing when it comes to making a canvas clock in terms of what I need it terms of a state object rather than rendering. I want to keep the state of the clock separate from methods that are used to draw it, and also I would like to have a create clock method designed in a way in which the same state object is returned for the same arguments that are given. Also in the event that no arguments are given it will always return a state object that reflects the same point in time. In other words a pure function of sorts, even though it is a state object that is returned.


So now that I have my get clock method I will n ow want to work out at least one method that will render the state of this clock object.

## 2 - Draw the clock status object

Here I have a draw method that will render the clock object that is returned with my get clock method. For now with this canvas example the draw method just displays the timeText property of the clock object. In additional examples I will add properties to my clock object when it comes to making a more advanced get clock method, but for now I want to keep things basic and just have a digital clock.

```js
var draw = {};
 
draw.clear = function (canvas,ctx) {
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
};
 
// draw a clock to a canvas
draw.clockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '40px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    // percent done of day
    var text = Math.floor(clock.dayPer * 100) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 20);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2 - 20);
    // time
    ctx.font = '20px arial';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2 + 20);
};
 
draw.hands = function (canvas, ctx, clock) {
 
    var r = Math.PI * 2 * clock.secPer,
    radius = (canvas.height - 50) / 2,
    cx = canvas.width / 2,
    cy = canvas.height / 2;
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(r) * radius, cy + Math.sin(r) * radius);
    ctx.stroke();
 
};
 
// draw day circle
draw.clockDayCircle = function (canvas, ctx, clock) {
    var r = Math.PI * 2 * clock.dayPer;
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, r);
    ctx.stroke();
};
```

## 3 - The main.js and index.html files


So then I have the rest of the code that gets a reference to a canvas element that I have in the HTML of the example, sets the size, and then makes use of what I have worked out by just calling the loop method at a set time interval. I then have the main app loop of the canvas example. I this main loop method I am just getting a clock object with the create method of my clock module with the current time, clearing the canvas, and then calling my draw methods in the draw module.


```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;

// loop
var loop = function () {
    requestAnimationFrame(loop);
    var clock = clockMod.create(new Date());
    draw.clear(canvas, ctx);
    draw.hands(canvas, ctx, clock);
    draw.clockDayCircle(canvas, ctx, clock);
    draw.clockText(canvas, ctx, clock);
};
// start loop
loop();

```


```html
<html>
    <head>
        <title>canvas example clock basic</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="./lib/clock.js"></script>
        <script src="./lib/draw.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```


So then when I have this canvas example up and running it just displays a simple digital clock. Nothing to interesting, but it is just a start, and any more interesting clock is just going to be a more advanced examples of this. When it comes to my get clock method I will want that to always give me the same clock object for the same date that is passed each time. That object can have all kinds of things attached to it that can be used in the render process. Including things like display objects the position of which change depending on the time of day, the time of year, or even over all time if I want to get that nuts.
This is a post on making a basic canvas clock example, but lets look at least one more example of this to get a better idea of what this can lead to and why it can be really fun to get into this sort of thing.

## 4 - Conclusion

So making clocks in canvas can be pretty fun, and there is much room for originality with this. In addition I would say that making simple clock canvas examples like this is a good starting point for just giving ones self a project to work on when it comes to javaScript in canvas. Other ideas for canvas examples such as games can end up becoming very complicated and time consuming, unless they are kept simple.
---
title: A canvas example of a basic clock
date: 2019-12-13 12:39:00
tags: [canvas]
layout: post
categories: canvas
id: 580
updated: 2019-12-13 13:35:13
version: 1.6
---

For today I would like to write another post about a [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), because canvas is fun and life is short. Todays post on canvas examples will be an example of a basic clock. Making clocks is fun because doing so is easy, but there is also lots of room when it comes to doing things that are original with it.

<!-- more -->

## 1 - Basic canvas clock example

So lets start out with a very basic canvas clock example. This will involve a get clock method that will create a clock object based on the passed date given as the first argument. The object will contain properties that are then used in one or more draw methods that are used to render the current state of that clock object.

### 1.1 - A get clock method

So here is the get clock methods that I would out for this canvas example, and this section of this post. The aim here is to work out the basic idea of what I should be doing when it comes to making a canvas clock. I want to keep the state of the clock separate from methods that are used to draw it, and also I would like to have a get clock method designed in a way in which the same state object is returned for the same arguments that are given. Also in the event that no arguments are given it will always return a state object that reflects the same point in time. In other words a pure function of sorts, even though it is a state object that is returned.

```js
// pad a value
var pad = function (a) {
    return String('00' + a).slice(-2);
};
// get a clock state with the give date or new Date(0) by default
var getClock = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = pad(c.now.getHours()) + ' : ' + pad(c.now.getMinutes()) + ' : ' + pad(c.now.getSeconds());
    return c;
};
```

So now that I have my get clock method I will n ow want to work out at least one method that will render the state of this clock object.

### 1.2 - Draw the clock text

Here I have a draw method that will render the clock object that is returned with my get clock method. For now with this canvas example the draw method just displays the timeText property of the clock object. In additional examples I will add properties to my clock object when it comes to making a more advanced get clock method, but for now I want to keep things basic and just have a digital clock.

```js
// draw a clock to a canvas
var drawClockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '20px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(clock.timeText, canvas.width / 2, canvas.height / 2);
    ctx.strokeText(clock.timeText, canvas.width / 2, canvas.height / 2);
};
```

### 1.3 - The app loop

Here I have the main app loop of the canvas example, I am just getting a clock object of the current time, clearing the canvas, and then calling my draw clock text method.

```js
// loop
var loop = function (canvas) {
    var clock = getClock(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(canvas, ctx, clock);
};
```

### 1.4 - Get the canvas element, set size, and start the loop.

So then I have the rest of the code that gets a reference to a canvas element that I have in the HTML of the example, sets the size, and then makes use of what I have worked out by just calling the loop method at a set time interval.

```js
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('gamearea') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
// start loop
loop(canvas);
setInterval(function () {
    loop(canvas);
}, 1000);

```

## 2 - Day Percent basic clock canvas example

### 2.1 - updated get clock method

```js
// get a clock state with the give date or new Date(0) by default
var getClock = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = pad(c.now.getHours()) + ' : ' + pad(c.now.getMinutes()) + ' : ' + pad(c.now.getSeconds());
    var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
    c.dayPer = (c.now - dayStart) / 86400000;
    return c;
};
```

### 2.2 - Updated and additional draw methods

```js
// draw a clock to a canvas
var drawClockText = function (canvas, ctx, clock) {
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '30px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    var text = (clock.dayPer * 100).toFixed(3) + '%';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
};
// draw day circle
var drawClockDayCircle = function (canvas, ctx, clock) {
    var r = Math.PI * 2 * clock.dayPer;
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.height - 50) / 2, 0, r);
    ctx.stroke();
};
```

### 2.3 - updated loop

```js
// loop
var loop = function (canvas) {
    var clock = getClock(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(canvas, ctx, clock);
    drawClockDayCircle(canvas, ctx, clock);
};
```
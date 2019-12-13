---
title: A canvas example of a basic clock
date: 2019-12-13 12:39:00
tags: [canvas]
layout: post
categories: canvas
id: 580
updated: 2019-12-13 13:23:57
version: 1.2
---

For today I would like to write another post about a [canvas example](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), because canvas is fun and life is short. Todays post on canvas examples will be an example of a basic clock. Making clocks is func because doing so is easy, but there is also lots of room when it comes to doing things that are original with it.

<!-- more -->

## 1 - Basic canvas clock example

### 1.1 - A get clock method

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

### 1.2 - Draw the clock text

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

```js
// loop
var loop = function (canvas) {
    var clock = getClock(new Date());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClockText(canvas, ctx, clock);
};
```

### 1.4 - Get the canvas element, set size, and start the loop.

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
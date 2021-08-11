---
title: Math PI constant in javaScript
date: 2020-06-05 06:58:00
tags: [js]
layout: post
categories: js
id: 663
updated: 2021-08-11 10:37:57
version: 1.14
---

The [Math PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) constant in javaScript contains a constant value of [PI](https://en.wikipedia.org/wiki/Pi). The value of PI is a constant ratio where if the diameter of a circle is equal to one then the circumference of that circle is equal to PI. 

So the use of the PI constant will come up a lot with expressions that have to do with circles, arcs, angles, and just about anything else where a constance variable for the value would come into play. There are many practical use case examples for PI in javaScript and of course in programming in general. There are many simple formulas some of which you might all ready be familiar with that have to do with getting the circumference or area of a circle.

Many of the other Math methods in javaScript accept [radians](https://en.wikipedia.org/wiki/Radian) rather than degrees when it comes to using an angle as an argument, so it makes sense to have at least a little experience working with some basic expressions using Math PI. So then just for the sake of getting used to the deal with PI and Radians as a unit of measurement for angles, it would make sense to start playing around with a few simple expressions that make use of Math.PI if you have not done so before hand.

<!-- more -->

## 1 - Some basic examples of Math.PI

In this section I will be going over some simple examples of the Math.PI constant in javaScript. This will include a whole bunch of examples that are usual suspect expressions using PI to find things like the circumference of a circle when the radius is known, and so forth.

### 1 - A Basic 2PIr AKA circumference example of Math.PI

One simple expression that you are most likely to be familiar with thus far is an expression to find the circumference of a circle when you know the radius of the circle. The radius of a circle as you should know is half the diameter of a circle, so by multiplying Math PI times 2 and then multiply again by the radius of a circle, you will get the circumference.

```js
var pi = Math.PI,
r = 0.5,
// circumference 
c = 2 * pi * r;
console.log(pi); // 3.141592653589793
console.log(c); // 3.141592653589793
```

I can not say the use of this expression comes up much in many of the projects that I have worked on thus far. However I do end up working the angles a lot, so lets look at some additional examples of the Math PI constant when working with methods that take radians as an argument.

## 2 - radians and Math.PI

The radian is a unit of measurement of angles that can be used as an alternative to degrees. With radians the radius of a circle is used as the unit of measurement for angles, rather than dividing the circumference of a circle by 360. So because the circumference of a circle is equal to 2PIr then this can be used as a way to know how many radians there are in a circle which is 2PI or 6.28... which can be used as a way to work out some methods for conversion.

```js
var radianToDegree = function (radian) {
    return radian / (Math.PI * 2) * 360;
};
 
var degreeToRadian = function (deg) {
    return Math.PI / 180 * deg;
};
 
console.log( radianToDegree(1.5707963267948966) ); 90
console.log( degreeToRadian(90) ); 1.5707963267948966
```

## 3 - Getting a point along the circumference of a circle

One use case example of using radians and therefore having a method that uses Math Pi to convert degrees to radians would be to have a method that can be used to get a point along the circumference of a circle. The method here makes use of the Math.cos, and Math.sin methods booth of which take a radian as the first argument. So if I want to use degrees then I will want to have a method that converts for degrees to radians. So then the method that I covered earlier would come into play with this example then.

```js
var degreeToRadian = function (deg) {
    return Math.PI / 180 * deg;
};
 
var getCirclePoint = function (cx, cy, radius, radian) {
    return {
        x: cx + Math.cos(radian) * radius,
        y: cy + Math.sin(radian) * radius
    }
};
 
var radian = degreeToRadian(45);
var pt = getCirclePoint(0,0, 10, radian);
 
console.log(pt);
// { x: 7.0710678118654755, y: 7.071067811865475 }
```


## 4 - Using Math.PI in a circle bar animation

So now for an example using Math.PI in some kind of simple canvas project or something to that effect. These kinds of examples can some times be a little fun, but also helpful when it comes to helping to understand what Math.PI is a useful constant when working out javaScript projects in general.

In this example I made a simple canvas animation example of a circle bar. That is that it is a circle type of plain progress bar that I often see in all kinds of games and practical projects. This one involves the use of a state object, a method that updates this state object, a method to draw to the canvas, and a main app loop of sorts.

I use Math PI to get the value of Math PI \* 2 to which I then use to preform a modulo operation in the update method to make sure that the radian value for the state object is always between 0 and Math PI \* 2. In other worlds to make sure that a radian value is between the min and max values for a radian.

```html
<html>
    <head>
        <title>Math PI cir animation</title>
    </head>
    <body>
        <canvas id="out" width="320" height="240"><canvas>
        <script>
 
// Math PI * 2 is the total number of radians
// in a circle
var pi2 = Math.PI * 2;
 
var update = function (state, secs) {
    state.radian += state.radiansPerSecond * secs;
    // use Math.PI * 2 to always get the remainder
    // for state.radians
    state.radian %= pi2;
};
 
var draw = function (state, ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(state.cx, state.cy, state.radius, 0, state.radian);
    ctx.stroke();
};
 
var canvas = document.getElementById('out'),
ctx = canvas.getContext('2d'),
lt = new Date();
 
var state = {
    cx: canvas.width / 2,
    cy: canvas.height / 2,
    radius: 50,
    radian: 0,
    radiansPerSecond: Math.PI / 180 * 45, // 45 degrees per second
};
 
var loop = function () {
    var now = new Date(),
    t = now - lt,
    secs = t / 1000;
    requestAnimationFrame(loop);
    update(state, secs);
    draw(state, ctx, canvas);
    lt = now;
};
loop();
 
        </script>
    </body>
</html>
```

## 5 - Conclusion

So that Math PI constant is there in the Math object for any and all situations in which I would want to use it compared to just using a number literal. However there are situations in which I might want to use a literal, maybe not in number from, but in string form when it comes to making or using some kind of user space project or additional feature that allows for high precision Math.

There is much more to write about, and develop when it comes to use case examples involving the use of Math PI, in time I might get around to updating and expanding this post as more examples come to mind. 
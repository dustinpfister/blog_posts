---
title: Math PI constant in javaScript
date: 2020-06-05 06:58:00
tags: [js]
layout: post
categories: js
id: 663
updated: 2020-06-05 07:40:21
version: 1.6
---

The [Math PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) constant in javaScript contains a constant value of [PI](https://en.wikipedia.org/wiki/Pi). The value of PI is a constant ratio where if the diameter of a circle is equal to one then the circumference of that circle is equal to PI. SO the use of the PI constant will come up a lot with expressions that have to do with circles, and angles. Also many of the other Math methods in javaScript accept [radians](https://en.wikipedia.org/wiki/Radian) rather than degrees when it comes to using an angle as an argument, so it makes sense to have at least a little experience working with some basic expressions using Math PI just for the sake of getting used to the deal with PI and Radians as a unit of measurement for angles if you have not done so before hand.

<!-- more -->

## 1 - A Basic 2PIr example of Math.PI

One simple expression that you are most likely to be familiar with thus far is an expression to find the circumference of a circle when you know the radius of the circle. The radius of a circle as you should know is half the diameter of a circle, so by multiplying Math PI times 2 and then multiply again by the radius of a circle, you will get the circumference.

```js
var pi = Math.PI,
r = 0.5,
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
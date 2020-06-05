---
title: Math PI constant in javaScript
date: 2020-06-05 06:58:00
tags: [js]
layout: post
categories: js
id: 663
updated: 2020-06-05 07:17:03
version: 1.2
---

The [Math PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) constant in javaScript contains a constant value of [PI](https://en.wikipedia.org/wiki/Pi). The value of PI is a constant ratio where if the diameter of a circle is equal to one then the circumference of that circle is equal to PI. SO the use of the PI constant will come up a lot with expressions that have to do with circles, and angles. Also many of the other Math methods in javaScript accept radians rather than degrees when it comes to using an angle as an argument, so it makes sense to have at least a little experience working with some basic expressions using Math PI just for the sake of getting used to the deal with PI and Radians as a unit of measurement for angles if you have not done so before hand.

<!-- more -->

## 1 - A Basic 2PIr example of Math.PI

One simple expression that you are most likely to be familiar with thus far is an expression to find the circumference of a circle when you know the radius of the circle.

```js
var pi = Math.PI,
r = 0.5,
c = 2 * pi * r;

console.log(pi); // 3.141592653589793
console.log(c); // 3.141592653589793
```
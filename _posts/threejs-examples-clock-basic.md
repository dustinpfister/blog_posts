---
title: A Three js example of a basic clock
date: 2019-12-16 14:10:00
tags: [three.js]
layout: post
categories: three.js
id: 581
updated: 2019-12-16 14:14:37
version: 1.1
---

I feel as though I need to work on things that are fun now and then with javaScript at least once in a while, otherwise I will end up hating what I love. With that being said threejs is certainly a fun frameworks, and also I often find myself making clocks because they are a quick yet fun thing to make with javaScript and canvas. So then todays post will be on a threejs example that is a javaScript powered basic clock.

<!-- more -->

## 1 - This is a threejs example

## 2 - The clock.js module

```js
var clock = {};
 
clock.createFacePoints = function (cx, cy, cz, radius) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    radius = radius || 10;
    var faceMarks = [],
    marks = 12,
    i = 0,
    x,
    y,
    z;
    while (i < marks) {
        rad = Math.PI * 2 / marks * i;
        x = Math.cos(rad) * radius + cx;
        y = Math.sin(rad) * radius + cy;
        z = cz;
        faceMarks.push([x, y, z]);
        i += 1;
    }
    return faceMarks;
};
 
// create hand points array using given clockObj, origin, and radius
clock.createHandPoints = function (clockObj, cx, cy, cz, radius) {
    cx = cx || 0;
    cy = cy || 0;
    cz = cz || 0;
    radius = radius || 10;
    return 'sec,min,hour'.split(',').map(function (tUnit, i) {
        var per = clockObj[tUnit + 'Per'] || 0,
        rad = Math.PI * 2 * per * -1 + Math.PI / 2,
        x = Math.cos(rad) * (radius - (i * 2 + 2)) + cx,
        y = Math.sin(rad) * (radius - (i * 2 + 2)) + cy,
        z = cz;
        return [x,y,z];
    });
};
 
// get a clock object for the give date
clock.get = function (date) {
    var c = {};
    c.now = date || new Date(0);
    c.timeText = c.now.getTime();
    c.secPer = c.now.getMilliseconds() / 1000;
    c.minPer = c.now.getSeconds() / 60;
    c.hourPer = c.now.getMinutes() / 60;
    var dayStart = new Date(c.now.getFullYear(), c.now.getMonth(), c.now.getDate(), 0, 0, 0, 0);
    c.dayPer = (c.now - dayStart) / 86400000;
    return c;
};
```
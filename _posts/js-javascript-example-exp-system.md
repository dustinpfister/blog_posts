---
title: EXP point system javaScript example
date: 2020-04-27 16:20:00
tags: [js]
layout: post
categories: js
id: 652
updated: 2020-04-27 20:52:40
version: 1.7
---

As of late I was working on one of my canvas examples and I wanted a simple [exp point](https://en.wikipedia.org/wiki/Experience_point) system for it. Working out an experience point system can end up becoming ng a bit of a rabbit hole for me, so I thought I would start a blog post on this one. That way I can keep coming back to this whenever I end up in this situation.

I said that this can end up being a bot of a rabbit hole, because there are many ways of going about making an experience point system, and also how it should be applied to objects in a game. For example an experience point system can just be applied to a variable that holds experience points for an object that repentants stats of a player object. However experience points could also be the number of kills that a unit has scored, or the amount of money that something costs. 

Also there is how experience points are gained, is that something that will go up along with level? If so will it at the same rate? How about the amount of time that a player spends paying a game, should that be used, or should it be something that is earned by way of skill or reflexes?

In any case in this post I thing I will be sticking with just the basics of making an experience point system with javaScript. When doing so I think most systems should have at least two methods one that can be used to find out how much experience points are needed to get to a given level, and another that can be used to set level based on a given about of experience points.

<!-- more -->

## 1 - The xp System

So For this post I will be making a module that returns two public methods to a global variable called XP. Both of the public methods return a standard object that contains the level rounded down, the level in raw fraction form, the current amount of xp and xp counts for the next level, and to the next level. The only difference between the two methods is setting the values of this object by level, and setting the values by xp.

```js
var XP = (function () {
    var DEFAULTS = {
        level: 1,
        xp: 0,
        cap: 30,
        deltaNext: 50
    };
    // set level with given xp
    var set = function (xp, deltaNext) {
        return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var getXPtoLevel = function (level, deltaNext) {
        return ((Math.pow(level, 2) - level) * deltaNext) / 2;
    };
    var parseByXP = function (xp, cap, deltaNext) {
        xp = xp === undefined ? DEFAULTS.xp : xp;
        cap = cap === undefined ? DEFAULTS.cap : cap;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
 
        var l = set(xp, deltaNext);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = getXPtoLevel(level + 1, deltaNext);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        parseByLevel: function (l, cap, deltaNext) {
            l = l === undefined ? DEFAULTS.level : l;
            deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
            var xp = getXPtoLevel(l, deltaNext);
            console.log(xp);
            return parseByXP(xp, cap, deltaNext);
        },
        parseByXP: parseByXP
    };
}
    ());
```

For the most part I would think that I would want at least those two methods at a minimum. That is in a situation where the experience points are know, but I want to know the level and other values of interest I can use my parseByXP method to get and object that contains level along with everything else I think I would want. In a situation in which the Level is know, but I want to know the experience points and so forth I can use my parseByLevel method to get the object.

## 2 - Simple demo

Now to test out my module.

```html
<html>
    <head>
        <title>javaScript example exp system</title>
    </head>
    <body>
        <div id="out"></div>
        <script src="xp.js"></script>
        <script>
var l = 1,
cap = 30,
deltaNext = 100,
html = '',
levelObj;
while (l < cap) {
    levelObj = XP.parseByLevel(l, cap, deltaNext);
    html += '<span> level: ' + levelObj.level + '; xp: ' + levelObj.xp + '; toNext: ' + levelObj.toNext + ' </span><br>';
    l += 1;
}
document.getElementById('out').innerHTML = html;
        </script>
    </body>
</html>
```

So then this results in the following output.

```
level: 1; xp: 0; toNext: 100
level: 2; xp: 100; toNext: 200
level: 3; xp: 300; toNext: 300
level: 4; xp: 600; toNext: 400
level: 5; xp: 1000; toNext: 500
level: 6; xp: 1500; toNext: 600
level: 7; xp: 2100; toNext: 700
level: 8; xp: 2800; toNext: 800
level: 9; xp: 3600; toNext: 900
level: 10; xp: 4500; toNext: 1000
level: 11; xp: 5500; toNext: 1100
level: 12; xp: 6600; toNext: 1200
level: 13; xp: 7800; toNext: 1300
level: 14; xp: 9100; toNext: 1400
level: 15; xp: 10500; toNext: 1500
level: 16; xp: 12000; toNext: 1600
level: 17; xp: 13600; toNext: 1700
level: 18; xp: 15300; toNext: 1800
level: 19; xp: 17100; toNext: 1900
level: 20; xp: 19000; toNext: 2000
level: 21; xp: 21000; toNext: 2100
level: 22; xp: 23100; toNext: 2200
level: 23; xp: 25300; toNext: 2300
level: 24; xp: 27600; toNext: 2400
level: 25; xp: 30000; toNext: 2500
level: 26; xp: 32500; toNext: 2600
level: 27; xp: 35100; toNext: 2700
level: 28; xp: 37800; toNext: 2800
level: 29; xp: 40600; toNext: 2900
```

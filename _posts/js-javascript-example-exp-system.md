---
title: EXP point system javaScript example
date: 2020-04-27 16:20:00
tags: [js]
layout: post
categories: js
id: 652
updated: 2020-04-27 17:49:53
version: 1.2
---

As of late I was working on one of my canvas examples and I wanted a simple exp point system for it. Working out an experience point system can end up becoming ng a bit of a rabbit hole for me, so I thought I would start a blog post on this one. That way I can keep coming back to this whenever I end up in this situation.

<!-- more -->

## 1 - The xp System

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

## 2 - Simple demo

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

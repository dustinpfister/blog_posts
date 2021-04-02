---
title: EXP point system javaScript example
date: 2020-04-27 16:20:00
tags: [js]
layout: post
categories: js
id: 652
updated: 2021-04-02 11:45:53
version: 1.17
---

As of late I was working on one of my [canvas examples](/2020/03/23/canvas-example/) and I wanted a simple [exp point](https://en.wikipedia.org/wiki/Experience_point) system for it. Working out an experience point system can end up becoming a bit of a rabbit hole for me, so I thought I would start a blog post on a [javaScript example](/2021/04/02/js-javascript-example/) for this one so I always have something to look back on.

I said that this can end up being a bit of a rabbit hole, because there are many ways of going about making an experience point system, and also how it should be applied to objects in a game. For example an experience point system can just be applied to a variable that holds experience points for an object that repentants stats of a player object. However experience points could also be the number of kills that a unit has scored, or the amount of money that something costs, and so forth depending on the game where it is used. 

Also there is how experience points are gained in the first place, and how many points are gained for doing whar. How about the amount of time that a player spends paying a game, should that be used as a way to gain XP, or should it be something that is earned by way of skill or reflexes?

In any case in this post I thing I will be sticking with just the basics of making an experience point system with javaScript, and will not be getting to much into how a system like this would be applied in a project that would make use of it. When doing so I think most systems should have at least two methods one that can be used to find out how much experience points are needed to get to a given level by passing a level, and another that can be used to set level based on a given about of experience points. Both methods should return the same standard object that contains all kinds of useful properties such as how many more experience points to the next level, and a percentage value from the starting about of XP to the amount of XP for the next level.

<!-- more -->

## 1 - The XP System module

So for this post I will be making a module that returns two public methods and appends to a global variable called XP. Both of the public methods return a standard object that contains the level rounded down, the level in raw fraction form, the current amount of xp, the amount of xp for the next level, the amount of xp left to the next level, and xp amount for the last level up, and a percentage value for the current level. 

The only difference between the two methods is setting the values of this object by level, and setting the values by xp. So if I am in a situation where XP is known, but level is not I can use my parseByXP method to get a level object by way of XP. However if for whatever the reason I want to know what an amount of XP is for a given level I can use my parseByLevel method to get a levelObj and look at the xp property of that object.

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
        forNext = l === cap ? Infinity : forNext;
        var toNext = l === cap ? Infinity : forNext - xp;
        var forLast = getXPtoLevel(level, deltaNext);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast
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

For the most part I would think that I would want at least those two methods at a minimum in most projects. That is having a method that I can use in a situation where the experience points are known, but I want to know the level and other values of interest. I can use my parseByXP method to get and object that contains level along with everything else I think I would want when it comes to having an experience point system. In a situation in which the level is known, but I want to know the experience points and so forth I can use my parseByLevel method to get the level object that way. 

In certain projects maybe I would want a few more methods on top of this, however for this post I just wanted to work out a simple starting point that I can copy and past into vanilla javaScript projects.

## 2 - Simple demo that generates a list of values

Now to test out my experience point system module with one or more quick demos. For starters how about just a simple example that just spits out values for each level from 1 up to a level cap of say 30.


In that case I would want something like this.
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

Which results in the following output in the browser window.

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

Seems to work okay, at least for now anyway. However I am sure that this is one such project that i will come back to now and then. The main thing that comes to mind thus far are the expressions that I am using to produce a level from xp and to do the inversion of that. I would like to have greater control over how the numbers will go up such as having the xp point requirements go up at a slow rate for the first few levels, and then start to go into a more exponential type curve.

## 3 - Conclusion

So for now I have my simple copy and past experience point system. There is of course using this in some projects, doing some additional testing to make sure there are not any serious issues with it, and maybe add some features to it that are needed when the come up. Still less is more with something like this I think, I do not want to spend a great deal of time working out an experience point system, unless I am confident I can make one that will really set a project of mine apart from everything else, maybe that is the experience point system, maybe it is something else.

For now I have a few canvas examples that make use of this system, or some other system that is based off of this at least. I first started using this system in my [beach canvas game prototype example](/2020/04/24/canvas-example-game-beach/) where it is used to level up turrets that fire at ships.

 However Another [canvas example is my cross hairs game](/2020/07/29/canvas-example-game-crosshairs/) where I am using an experience point system for the main player object that is used to level up weapons that are used in the game. I am also using the same system in that game for the map cells, and the map object to begin with.

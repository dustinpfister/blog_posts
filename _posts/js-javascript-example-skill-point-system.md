---
title: Skill Point system
date: 2020-08-26 13:38:00
tags: [js]
layout: post
categories: js
id: 696
updated: 2021-04-03 08:43:45
version: 1.16
---

I have found that a component that I would like to have in many game projects that I might start, or improve in time would be a skill point system. This skill point system as I have come to call it would be a way to gain skill points in a game, and then have a way to invest these skill points into upgrades. The upgrades in turn would then increase stats for various items in a main game state object. So maybe it would be a good idea to start one or more [javaScript examples](/2021/04/02/js-javascript-example/) in which I explore, and refine this narrow little topic when it comes to javaScript game design.

What I have in mind is a system that is a more advanced version of the [experience point system that I made a while back](/2020/04/27/js-javascript-example-exp-system/). So my skill point system will be more or less the same thing as that at the core of it, but with maybe one additional public method that can be used as a way to create values that are based off of a level object of the experience point system, and a skill point value. In time I might make additional skill point systems that are there own independent thing, that may of may not be a better way of doing things, but as far as this post is concerned this is the system that I will be writing about here.

So in this post I will be writing about another kind of experience point system, but with this additional feature that can be used as a way to create stat values with a level object, and a skill point value from zero to positive infinity. This will not be a post in which I will be going over every little detail when it comes to using a module like this in an actual project though. However I will be going over a simple demo that will make use of it just for the sake of getting an idea how this will work as a player levels up in a game.

<!-- more -->

## 1 - The utils module

I have a single utility method that my skill point system uses that is a function that will work with a percent value. This log percent method that I have made in a previous project is a method that I work out that will return a percent value from zero to one based on a given percent value that has the same range. The idea with this method is to just have a way to convert a percent value that normally goes up in a linear way to instead go up in a not so linear way.

```js
var utils = {};
utils.logPer = function (per, a, b) {
    a = a === undefined ? 2 : a;
    b = b === undefined ? a : b;
    per = per < 0 ? 0 : per;
    per = per > 1 ? 1 : per;
    return Math.log((1 + a - 2) + per) / Math.log(b);
};
```

I will be suing this method when it comes to working out my expressions for the effect that skill points and a level object have a a stat value.

## 2 - The xp.js module

So here I have the source code for my experience point system that has a few changes and a single public method added that thus results in my skill point system thus far. This module has the same methods that i would expect form any experience point system that helps with creating what I have come to call a level object. That is it has a method where if I know then level, but want to know an experience point value I can use a parse by level public method, and there is then another method where I can get a level by passing a know experience point value. There is now however one additional method that I have added when it comes to this javaScript example, and that is my apply skill points method.

The apply skill points method takes a level object as the first argument, followed by a skill point value that is the number of skill points that the player wishes to place in a given skill, or upgrade if you prefer. The third and final argument is an options object that can be used to set a base value for a state, alone with maximum values that are effected by level, and skill point value. The product that is returned is then an object with a value of method that will return a value that is to be used as a stat value for something that is effect by all of this.

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
    // parse by xp
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
            cap: cap,
            xp: xp,
            per: (xp - forLast) / (forNext - forLast),
            forNext: forNext,
            toNext: toNext,
            forLast: forLast,
            valueOf: function () {
                return this.level;
            }
        };
    };
 
    // THE PUBIC API
    var api = {};
 
    // create a levelObj by passing a level value
    api.parseByLevel = function (l, cap, deltaNext) {
        l = l === undefined ? DEFAULTS.level : l;
        deltaNext = deltaNext === undefined ? DEFAULTS.deltaNext : deltaNext;
        var xp = getXPtoLevel(l, deltaNext);
        return parseByXP(xp, cap, deltaNext);
    };
 
    // create a levelObj by passing an XP value
    api.parseByXP = parseByXP;
 
    // XP.applySkillPointes helpers and Public method
    var getSkillPointsPer = function (skillPoints) {
        var per = 1 - (1 / (skillPoints + 1));
        return utils.logPer(per, 2, 2.5);
    };
    api.applySkillPoints = function (levelObj, skillPoints, opt) {
        opt = opt || {};
        opt.SPEffectMax = opt.SPEffectMax === undefined ? 1000 : opt.SPEffectMax;
        opt.levelEffectMax = opt.levelEffectMax === undefined ? 250 : opt.levelEffectMax;
        opt.baseValue = opt.baseValue === undefined ? 0 : opt.baseValue;
 
        var level = levelObj.level,
        spPer = getSkillPointsPer(skillPoints),
        spValue = opt.SPEffectMax * spPer;
        levelValue = opt.levelEffectMax * utils.logPer((level / levelObj.cap), 2, 2),
        n = opt.baseValue + spValue + levelValue;
 
        return {
            levelObj: levelObj,
            opt: opt,
            levelValue: levelValue,
            spValue: spValue,
            baseValue: opt.baseValue,
            n: n,
            valueOf: function () {
                return this.n;
            }
        };
    };
 
    // return the public api to the XP global
    return api;
}
    ());
```

## 3 - A canvas demo that makes use of this skill point system

So now that I have my skill point system I will want to work out just a little more javaScript code to just serve as a way to confirm that this system will work as expected before starting to use it in one of my canvas examples.

For now this demo is just a crude yet effective way to visualize what the effect of my apply skill points method is for a range of levels, and what happens when skill points are added, and not added by just playing around with the hard coded values in the state object of this demo. If I get some more time to work on this I might have a better display for all of this, but it seems like things are working as I would expect thus far.

```js
var draw = {};
 
draw.back = function (ctx, canvas) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
draw.valuesChart = function (ctx, canvas, state) {
    var h = canvas.height * 0.75,
    w = canvas.width * 0.75,
    i = 0,
    per,
    n,
    x,
    y,
    len = state.values.length;
    ctx.beginPath();
    while (i < len) {
        n = state.values[i];
        per = n <= 0 ? 0 : n / state.valueMax;
        x = 50 + w / (len - 1) * i;
        y = canvas.height - per * h;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        i += 1;
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
};
draw.ver = function (ctx, canvas, state) {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    ctx.font = '10px arial';
    ctx.fillText('v' + state.ver, 4, canvas.height - 12);
 
};
 
// create and append canvas element, and get 2d context
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
// set width and height
canvas.width = 320;
canvas.height = 240;
 
var state = {
    ver: '0.0.0',
    levelObj: {},
    level: 1,
    levelCap: 100,
    deltaNext: 10000,
    DPS: 0,
    skillPoints: 0,
    skillOptions: {
        SPEffectMax: 700,
        levelEffectMax: 200,
        baseValue: 100
    },
    values: [], // values array for the graph
    valueMax: 0
};
 
var createValues = function (state) {
    state.level = 1;
    while (state.level <= state.levelCap) {
        state.levelObj = XP.parseByLevel(state.level, state.levelCap, state.deltaNext);
        var DPS = XP.applySkillPoints(state.levelObj, state.skillPoints, state.skillOptions);
        state.values.push(Number(DPS));
        state.level += 1;
        //state.skillPoints += Math.floor(Math.pow(5, state.level));
        //state.skillPoints += Math.floor(Math.pow(1.5, state.level));
        state.skillPoints += 1;
        //state.skillPoints = 5;
    }
    state.valueMax = Math.max.apply(null, state.values);
};
 
createValues(state);
 
console.log(state.values);
 
draw.back(ctx, canvas);
draw.valuesChart(ctx, canvas, state);
draw.ver(ctx, canvas, state);
```

## 4 - Conclusion

This skill point system seems to work okay thus far, but I would like to polish things a little more before using it in an actual project. Still I think I have the basic idea that I had in mind working the way that I would like it to, so there is not much more to get done with this beyond maybe working out some different expressions when it comes to setting values.

I have a few projects in the works all ready in which I would like to use a system like this, so in the not to distant future I will likely start using some kind of rendition of this in some projects that I have in the works now. I also am pretty sure that I will likely be using this in some future projects that I have not even started yet also. So when I get around to it I will likely update this post and link to other posts in which I am using this.

Still I think that I might want to make at least one additional system for this kind of thing. Something that is totally independent from the experience point system that I am using. By thinking is that a Skill point system will have at least some involvement with an experience point system in the sense that skill points are something that will be granted to a player with each new level. However it does not have to be so closely tied to that system, and can be used in other projects

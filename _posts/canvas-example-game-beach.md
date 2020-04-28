---
title: canvas example of a beach war game
date: 2020-04-24 17:52:00
tags: [canvas]
layout: post
categories: canvas
id: 651
updated: 2020-04-27 21:29:44
version: 1.3
---

For this weeks [canvas example](/2020/03/23/canvas-example/) I started working on an idea that I had for a simple strategy type game. The basic idea of what I had in mind is just a simple 2d grid with three index values for ground types that are water, beach, and land. The player can build structures on land, but not on beach or water cells. In the water enemy boats can spawn and attempt to attack and invade the beach.

<!-- more -->

## 1 - The utils library for canvas example beach

So with many of these canvas examples I end up making a utility library where I park methods that I think I will be using in more that one module at one point or another. Or another reason why I might place something there is to just reduce the complexity of another module. In any case it is a collection of methods that are relevant to the modules for this canvas example that include the modules for state, rendering, and any plug-ins I might make at some point if I end up making a plug-in system.

```js
var utils = {};
 
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
utils.XP = (function () {
    // set level with given xp
    var set = function (xp) {
        //return Math.sqrt(xp);
        return (1 + Math.sqrt(1 + 8 * xp / 50)) / 2;
    };
    // get exp to the given level with given current_level and xp
    var XPto = function (level) {
        //return Math.pow(level, 2);
        return ((Math.pow(level, 2) - level) * 50) / 2;
    };
    var parseByXP = function (xp, cap) {
        var l = set(xp);
        l = l > cap ? cap : l;
        var level = Math.floor(l),
        forNext = XPto(level + 1);
        return {
            level: level,
            levelFrac: l,
            xp: xp,
            forNext: l === cap ? Infinity : forNext,
            toNext: l === cap ? Infinity : forNext - xp
        };
    };
    return {
        parseByLevel: function (l, cap) {
            return parseByXP(XPto(l, cap));
        },
        parseByXP: parseByXP
    };
}
    ());
```

For now the module consists of the distance formula, and a an experience point system that consists of two methods. The distance formula if a usual suspect for a lot of these canvas examples, but the experience point system is thus far something that I am juts using in this project, at least at the point of this writing anyway.

## Conclusion

This might end up being one of my canvas example that I might keep coming back to now and then in an effort to break the habit of starting a project but never really finishing it. I like how it is turning out so far, but this one does need a whole lot more work, and I am also not completely sure what the finished product will be if I keep working at it. The main thing I wanted t focus on with this one is to just try to make something that is fun.

With that being said maybe I will keep working on this canvas example, and if so I am sure i will come back and expand this post even further. I would like to break the habit once and for all, if not with this canvas example, [one of them at least](/2020/03/23/canvas-example/).

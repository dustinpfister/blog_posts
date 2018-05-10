---
title: Orbs game Class for something similar to Gemcraft
date: 2018-01-25 19:00:00
tags: [js,games]
layout: post
categories: games
id: 135
updated: 2018-01-29 12:00:22
version: 1.1
---

I have only made two other posts where I write about game development ideas, all the way back in March of last year was the last time I wrote a post in my [games category](/categories/games/). Maybe part of the reason why is because part of me sees no future in it for me, as such I should focus elsewhere. However the main reason why I got into programing in the first place is to be creative in that regard, also it is important to have fun now and then, so maybe it's time for another one of these kinds of posts.

<!-- more -->

Also I have become tired of writing posts on libraries, and frameworks that are all ready well covered, and documented. What I really want to do is go in new, and interesting directions with coding, that after all should be what it is all about anyway, otherwise I am just yet again re-inventing the wheel right?

## The Game idea I have been working on lately is inspired from Gemcraft

So one of my favorite series of web based games is the [gem craft series of games](https://en.wikipedia.org/wiki/GemCraft), by an indie label called [game in a bottle](http://gameinabottle.com/). If you have never played one of them before, don't, unless you are okay with the idea of loosing a great deal of your time playing something that is pretty addicting. The idea I am working on is inspired by this series of games, for now I have am just calling it orbs.js.

In Gemcraft a _Gem_ has a _Grade_ and two Gems of the same Grade can be combined together to form a new Gem of a Grade that is one higher. So A Gems Grade is increased by way of powers of two. 

In addition to Grades there is more than one _Color_ of Gems, Gems of the same color Can be combined to make _Pure Gems_, or of Different colors to make _Dual Gems_, _Tripple Gems_, and so forth.

## So I am Calling my Gems, Orbs

For now the idea I am working on is just one of my many github projects that might never see the limelight, however if I ever break that pattern this might be a good candidate. It provides a class that contains the game logic for something I am calling an Orb, just like that of a Gem in Gemcraft, but of course I am aiming to take some kind of novel direction with this.

## How do Orbs differ from Gems?

To help keep this project from just being a clone of Gemcraft I will of course be taking a different direction in which the focus is on ratios. In place of Colors I have only four _Elements_ , and each _Orb_ is a certain composition of Elements. Powers of two are not of much concern, but the ratios are, and the count that a ratio is raised is it's Grade, or Level.

## Orbs

An _Orb_ is a single instance of the class I have written in orbs.js. It is a composition of one or more _Element Points_ that I will explain.

## Elements

In orbs.js there are four Elements, corresponding to _Fire_, _Earth_, _Wind_, and _Water_.

## Element Points

An Orb Class instance has an array associated with it that contains four numbers that are point counts for each Element.

## Element Ratios

The Element Points array will always have a certain ratio

```js
// If an Orb has this points Array
var points = [5,5,25,10],
 
// then it would have this Ratio Array
ratio = [1,1,5,2]
```

The ratio of an Orb can be used to find its Type

## Orb Worth

The worth of an Orb is the count of it's grand total Element Points for each Element.

## Orb Level

An Orb level is the number of times the Element Ratio is raised.

```js
var ratio = [1,1,5,2], // if an Orb has this ratio...
points = [5,5,25,10], // and this Points array...
level = 5, // then it's Level is 5, and it's Worth is 9
worth = 9;
```

## Orb Types

An Orb has More than one possible type. This is where things can become very interesting. Elements can be combined in all kinds of different ratios, and the type is determined by the ratio. There are simple one to one ratios like 1:0:1:0, and not so simple ones like 1:1:5:12. It's the not so Simple ratios that make me what to get into this idea more.

### Pure Orb Type

An Orb can be of just one Element, and the Element Point count of that Orb can be considered its _Level_, and also it's _Worth_. 

### Dual Orb Type

An Orb can be composed of two Elements in a 1:1 ratio, if this is the case then it is a dual Orb. In this case its Level would be half of it's Worth.

### Triple Orb Type

An Orb with a 1:1:1 ratio of elements

### Quad Orb Type

An Orb composed of all four Elements in a 1:1:1:1 ratio

### Recipe Orb Type

This is where I feel that the project I am working on might have room for some originality. When an Orb is combined in a cretin ratio that exists in a database of Recipe Orbs, then its Type becomes that Recipe. This can lead to all kinds of Orbs that can have different Properties, Of course what all that is depends on the database, and how orbs.js might be used in a greater project that makes use of it.

### Composite Orb Type

If an orb has a ratio that does not recognized as any type mentioned above it defaults to the Composite type.

## orbs.js

So here is the current state of the idea as I have it now.

```js
var Orb = (function () {
 
    // set orb values by a given ratio, and level
    var setByRatio = function (ratio, level) {
 
        var self = this;
 
        // set level, and ratio to given values
        this.level = level || 1;
        this.ratio = Array.from(ratio) || [1, 0, 0, 0];
 
        // find points
        this.points = [];
        this.ratio.forEach(function (pt, i) {
 
            self.points[i] = pt * level;
 
        });
 
    };
 
    // set orb values based on a given points array
    var setByPoints = function (points) {
 
        var self = this;
 
        this.points = Array.from(points);
        this.ratio = [];
        this.level = Infinity;
 
        // the lowest point is the level
        this.points.forEach(function (pt, i) {
 
            if (pt < self.level && pt > 0) {
 
                self.level = pt;
 
            }
 
        });
 
        // find the ratio from points
        this.points.forEach(function (pt, i) {
 
            self.ratio[i] = pt / self.level;
 
        });

    };
 
    // combine one or more orbs with this one
    var fromOrbs = function (orbs) {
 
        var points = [0, 0, 0, 0],
        tab = function (orb) {
 
            orb.points.forEach(function (pt, i) {
 
                points[i] += pt;
 
            });
 
        };
 
        // if Array of Orbs (combine, new from)
        if (orbs.constructor.name === 'Array') {
 
            orbs.forEach(function (orb) {
 
                tab(orb);
 
            });
 
            setByPoints.call(this, points);
 
        } else {
 
            // assume just single orb is given
 
            // then just set by the given orbs points (clone orb)
            setByPoints.call(this, orbs.points);
 
        }
 
    };
 
    var findType = function () {
 
        var oneCT = 0,
        nonOne = false;
        oneTypes = ['pure', 'dual', 'tripple', 'quad'];
 
        // find count of 1's in the ratio
        this.ratio.forEach(function (pt) {
 
            if (pt === 1) {
 
                oneCT += 1;
 
            } else {
 
                if (pt != 0) {
 
                    nonOne = true;
 
                }
 
            }
 
        });
 
        // default to a type based on count of ones in ratio
        this.type = oneTypes[oneCT - 1];
 
        // if any value that is not 1 is in the ratio then default to composite
        if (nonOne) {
 
            this.type = 'composite';
 
        }
 
    };
 
    // the Orb constructor
    var Orb = function (opt) {
 
        var self = this;
 
        opt = opt || {};
        opt.points = opt.points || null;
        opt.ratio = opt.ratio || null;
        opt.level = opt.level || null;
        opt.recipies = opt.recipies || [];
 
        // if points i opt, set by points
        if (opt.points) {
 
            setByPoints.call(this, opt.points);
 
        }
 
        // if ratio in opt, set by ratio, and level
        if (opt.ratio) {
 
            setByRatio.call(this, opt.ratio, opt.level);
 
        }
 
        // if orbs in opt set by one or more given orbs
        if (opt.orbs) {
 
            fromOrbs.call(this, opt.orbs);
 
        }
 
        // if just calling new Orb()
        if (!opt.points && !opt.ratio && !opt.orbs) {
 
            setByPoints.call(this, [1, 0, 0, 0]);
 
        }
 
        this.worth = 0;
        this.points.forEach(function (pt) {
 
            self.worth += pt;
 
        });
 
        findType.call(this);
 
    };
 
    return Orb;
 
}
    ());
 
```

So far I have many of the basic ideas I have written about here working, I can create a new Orb by passing a points array, and the ratio and level will then be found. Or I can pass a ratio, and level which can be used to set the points array.

## Conclusion

This might be something fun to work on now and then, if I can focus just on this when it comes to working on this sort of thing, who knows maybe it will become some kind of game. For the most part though the inner adult in me says I should spend my time elsewhere, so don't get to excited.
---
title: Orb Module javaScript example
date: 2021-04-09 16:27:00
tags: [js]
layout: post
categories: js
id: 842
updated: 2021-04-10 10:02:02
version: 1.6
---

Todays [javaScript example](/2021/04/02/js-javascript-example/) is going to be on a module that I have started a long time ago, but have come around to clean it up a bit because I might want to use it in a game in the near or distance future. The module has to do with and array of point values, and finding a simple ratio of those values, and using the ratio to set one of several kinds of types.

The general idea here is that I have an Orb object that contains an array of four numbers, each number is an integer from zero upwards and represents a count of a certain kind of element. For example the first element in the points array can represent a count of Earth elements, then Wind, Fire, and Water when it comes to that kind of idea with elements in a game. There is then the ratio of these elements that is of interest for example an Orb object with a points value of 14,4,2,2 would have a simple ratio of 7,2,1,1. The ratio could be a kind of recipe, for a special kind of Orb, with special attributes, or it could just be an unknown ratio that does not have any special meaning.

<!-- more -->

## 1 - The utils module

```js
var utils = {};
 
utils.GCD = function (a, b) {
    if (!b) {
        return a;
    }
    return utils.GCD(b, a % b);
};
 
utils.GCDFromArray = function (points) {
    var ai = 0,
    d,
    gd = 1,
    bi;
    while (ai < points.length) {
        if (points[ai] < 1) {
            ai += 1;
            continue;
        }
        bi = 0;
        while (bi < points.length) {
            if (bi === ai || points[bi] < 1) {
                bi += 1;
                continue;
            }
            d = utils.GCD(points[ai], points[bi]);
            if (points[ai] === points[bi]) {
                d = 1;
            }
            if (d > gd) {
                gd = d;
            }
            bi += 1;
        }
        ai += 1;
    }
    return gd;
};
 
// are all non-zero elements in the ratio equal to each other?
utils.allNonZeroEqual = function (array) {
    var a = 0;
    return array.filter(function (num) {
        return num > 0;
    }).every(function (num) {
        if (a === 0) {
            a = num;
            return true;
        }
        return num === a;
    });
};
 
// get the simple ratio from a set of points (or simplify a ratio)
// [0,0,14,2] => [0,0,7,1]
utils.getSimpleRatio = function (points) {
    // make sure pure, dual, triple, and quad
    // work they way they should
    if (utils.allNonZeroEqual(points)) {
        return points.map(function (el) {
            return el === 0 ? 0 : 1;
        });
    }
    // if we get this far use utils.GDCFromArray
    var gcd = utils.GCDFromArray(points);
    // get simple ratio by diving all points by gd
    return points.map(function (pt, i) {
        return pt / gcd;
    });
};
```

## 2 - The orb Module

TIme to jump right into the main event of this javaScript example now when it comes to the orb module.

```js
var orbMod = (function () {
 
    var api = {};
 
    // set orb values based on a given points array
    var setByPoints = function (orb, points) {
        orb.points = Array.from(points);
        // find the simple ratio
        orb.ratio = utils.getSimpleRatio(orb.points);
        // find type
        findType(orb);
        return orb;
    };
 
    var findType = function (orb) {
        var oneCT = 0,
        nonOne = false,
        oneTypes = ['pure', 'dual', 'triple', 'quad'];
        // find count of 1's in the ratio
        orb.ratio.forEach(function (pt) {
            if (pt === 1) {
                oneCT += 1;
            } else {
                if (pt != 0) {
                    nonOne = true;
                }
            }
        });
        // default to a type based on count of ones in ratio
        orb.type = oneTypes[oneCT - 1];
        // if any value that is not 1 is in the ratio then default to composite
        if (nonOne) {
            orb.type = 'composite';
        }
    };
 
    // create and return an Orb Object
    api.create = function(opt){
        var orb = {};
        opt = opt || {};
        opt.points = opt.points || null;
        opt.ratio = opt.ratio || null;
        opt.level = opt.level || null;
        // if points i opt, set by points
        if (opt.points) {
            setByPoints(orb, opt.points);
        }
        // if just calling new Orb()
        if (!opt.points && !opt.ratio && !opt.orbs) {
            setByPoints(orb, [1, 0, 0, 0]);
        }
        return orb;
    };
 
    // create an orb from a collection of orbs
    api.fromOrbs = function (orbCollection) {
        var points = [0, 0, 0, 0],
        tab = function (a) {
            a.points.forEach(function (pt, i) {
                points[i] += pt;
            });
        };
        // if Array of Orbs (combine, new from)
        if (orbCollection.constructor.name === 'Array') {
            orbCollection.forEach(function (a) {
                tab(a);
            });
            var orb = setByPoints(api.create(), points);
            return orb;
        } else {
            // assume just single orb is given
            // then just set by the given orbs points (clone orb)
            return setByPoints(api.create(), orbCollection.points);
        }
    };
 
    return api;
 
}
    ());
```

## 2 - Testing out the orb module

So now that I have an Orb module worked out I will want to take a moment to just test it out to make sure that it is working as expected. I could make some full blown project around this Orb module, and in time I might get around to doing just that. However for now it might be best to just work out some simple text script.

```js
var printOrbData = function(orb){
    console.log(orb.points, orb.ratio); // [1, 0, 0, 0]
    console.log(orb.type);
    console.log('');
};
 
// pure ( [1,0,0,0], [0,1,0,0] )
printOrbData( orbMod.create({points:[1,0,0,0]}) );
printOrbData( orbMod.create({points:[0,7,0,0]}) );
printOrbData( orbMod.create({points:[0,0,8,0]}) );
printOrbData( orbMod.create({points:[0,0,0,3]}) );
 
// dule ( [1,0,0,1], [0,1,1,0])
printOrbData( orbMod.create({points:[0,7,0,7]}) );
printOrbData( orbMod.create({points:[7,0,0,7]}) );
printOrbData( orbMod.create({points:[0,7,7,0]}) );
printOrbData( orbMod.create({points:[7,0,7,0]}) );
 
// triple ( [1,1,1,0], [1,0,1,1] )
printOrbData( orbMod.create({points:[3,3,0,3]}) );
printOrbData( orbMod.create({points:[3,3,3,0]}) );
 
// quad ( [1,1,1,1] )
printOrbData( orbMod.create({points:[8,8,8,8]}) );
 
// composite ( [1,1,0,2], [4,0,1,4] )
printOrbData( orbMod.create({points:[2,2,0,4]}) );
printOrbData( orbMod.create({points:[0,2,1,3]}) );
printOrbData( orbMod.create({points:[8,0,2,8]}) );
 
// from orbs test
var a = orbMod.create({points:[1,0,0,0]}),
b = orbMod.create({points:[1,0,2,0]});
var orb = orbMod.fromOrbs([a, b]);
printOrbData(orb);
```

## 3 - Conclusion

There is still maybe a great deal more work to do with this module, but maybe more so with what it is that I would pile on of of it rather than the core of what it is. There are some additional features that I would like to add this this Orb module, but much of the additional work that will be involved in turning this into an actual game of some kind would involve additional modules such as an object pool, and a state machine.


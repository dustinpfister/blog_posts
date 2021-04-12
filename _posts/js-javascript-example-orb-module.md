---
title: Orb Module javaScript example
date: 2021-04-09 16:27:00
tags: [js]
layout: post
categories: js
id: 842
updated: 2021-04-12 12:49:36
version: 1.14
---

Todays [javaScript example](/2021/04/02/js-javascript-example/) is going to be on a module that I have started a long time ago, but have come around to clean it up a bit because I might want to use it in a game in the near or distance future. The module has to do with and array of point values, and finding a simple ratio of those values, and using the ratio to set one of several kinds of types.

The general idea here is that I have an Orb object that contains an array of four numbers, each number is an integer from zero upwards and represents a count of a certain kind of element. For example the first element in the points array can represent a count of Earth elements, then Wind, Fire, and Water when it comes to that kind of idea with elements in a game. There is then the ratio of these elements that is of interest for example an Orb object with a points value of 14,4,2,2 would have a simple ratio of 7,2,1,1. The ratio could be a kind of recipe, for a special kind of Orb, with special attributes, or it could just be an unknown ratio that does not have any special meaning.

<!-- more -->

## 1 - The orb Module

Time to jump right into the main event of this javaScript example now when it comes to the orb module. When it comes to this module the main public method of interest is the create from points method, all the other methods that are used to create an orb will end up calling this method in an indirect way. This method is used by passing an array of numbers like 4,8,8,0 which will be used directly as the points property of the orb, the simple ratio of the points array would then be 1,2,2,0, and this type of orb would then be composite.

At the top of the file I have my find type method that is used to, well kind out what the current type of an orb is based off the ratio of the orb. For example a ratio that is 1,0,0,0 or 0,0,1,0 would be an example of a pure orb as all of the points are of a single element. However an orb with a ratio like 1,0,0,1 pr 0,1,1,0 would be an example of a dual orb as it has an even number of pints between two elements. Any ratio like 1,0,7,3 is a composite orb for now, but I have plains for additional features when it comes to orbs with this kind of ratio if I ever get around to it.

I then have some additional methods for creating orbs, including one where I given a simple ratio and a level as a way to create a points value, and another that will create a new orb from a collection of orbs.

```js
var orbMod = (function (global) {
 
    // PUBLIC API
    var api = {};
 
    // fire the type of the orb
    var findType = function(orb){
        var type = 'composite',
        binArr = ratio.isBinaryArray(orb.ratio),
        elCount = ratio.countNonZero(orb.ratio);
        if(binArr){
           type = ['pure', 'dual', 'tripple', 'quad'][elCount - 1];
        }
        return type;
    };
 
    // create from points
    api.createFromPoints = function(points){
        points = points || [1,0,0,0];
        var orb = {};
        orb.points = points;
        orb.ratio = ratio.getSimpleRatio(orb.points);
        orb.type = findType(orb);
 
        // LEVEL, and INCREMENTAL
        // The level of the orb is the power of the simple ratio to the power of 2
        // the ratio.getLevel method should use if the points array is given along with the 
        // base set to 2, the same method should also work to get the 
        //  incremental by just setting base to 1
        orb.level = Math.floor(ratio.getLevel(orb.points, 2)) + 1;
        orb.incremental = ratio.getLevel(orb.points, 1);
 
        return orb
    };
 
    // create from ratio helper
    api.createFromRatio = function(r, n, base){
        n = n === undefined ? 1: n;
        base = base === undefined ? 1: base;
        return api.createFromPoints(ratio.getRaisedRatio(r, n, base));
    };
 
    // create from a ratio and 1 relative level
    api.createFromLevel = function(r, level){
        var simp = ratio.getSimpleRatio(r);
        return api.createFromRatio(simp, Math.pow(2, level - 1), 1);
    };
 
    // create from a collection of orbs made before hand
    api.createFromOrbs = function(orbCollection){
        // just add up the points
        var points = orbCollection.map(function(orb){
            return orb.points;
        }).reduce(function(acc, points){
            return acc.map(function(el, i){
                return el + points[i];
            });
        });
        // and create a new orb with the sum of the points
        return api.createFromPoints(points);
    };
 
    return api;
 
}
    (this));
```

That is it for now when it comes to my orbs module, I am sure that I will add a bit more in time but to really know what is meiing I will want to start creating at least a few projects using this module.

## 2 - The ratio module

I have a custom made ratio module that I made primarily for my orbs module, however this ratio module contains some methods that I might want to use in additional projects.

```js
var ratio = {};
 
// Greatest Common Divisor
// https://en.wikipedia.org/wiki/Greatest_common_divisor
ratio.GCD = function (a, b) {
    if (!b) {
        return a;
    }
    return ratio.GCD(b, a % b);
};
 
// Greatest Common Divisor from array
// https://www.geeksforgeeks.org/gcd-two-array-numbers/
ratio.GCDFromArray = function(arr, n){
    let result = arr[0];
    n = n === undefined ? arr.length: n;
    for (let i = 1; i < n; i++){
        result = ratio.GCD(arr[i], result);
        if(result == 1){
            return 1;
        }
    }
    return result;
}
 
// Are all non-zero elements in the ratio equal to each other?
// ratio.allNonZeroEqual([1,0,1,1]); // true
// ratio.allNonZeroEqual([1,2,0,4]); // false
ratio.allNonZeroEqual = function (array) {
    var a = 0;
    return array.every(function(num){
        if(num === 0){ // if 0 return true
            return true;
        }
        if (a === 0) { // if first non-zero value return true
            a = num;
            return true;
        }
        // if any additional non-zero value does not equal the 
        // first non zero value return false, else true
        return num === a;
    });
};
 
// count nonZero array elements
ratio.countNonZero = function(array){
    return array.reduce(function(acc, n, i){
        acc = i === 1 ? acc === 0 ? 0 : 1 : acc;
        return acc += n > 0 ? 1 : 0;
    });
};
 
// is binary only array
ratio.isBinaryArray = function(array){
    var i = 0,
    len = array.length;
    while(i < len){
        if(Number(array[i]) === 0 || Number(array[i]) === 1){
           i += 1;
           continue;
        }
        return false;
    }
    return true;
};
 
// get the simple ratio from a set of arr (or simplify a ratio)
// ratio.getSimpleRatio([0,0,14,2]); // [0,0,7,1]
ratio.getSimpleRatio = function (arr) {
    // make sure pure, dual, triple, and quad
    // work they way they should
    if (ratio.allNonZeroEqual(arr)) {
        return arr.map(function (el) {
            return el === 0 ? 0 : 1;
        });
    }
    // if we get this far use ratio.GDCFromArray
    var gcd = ratio.GCDFromArray(arr);
    // get simple ratio by diving all arr by gd
    return arr.map(function (pt, i) {
        return pt / gcd;
    });
};
 
// raise the given array of numbers n time with the given base
// The array of numbers will be simplified
// ratio.getRaisedRatio([2,2,0,1], 2, 1); // [4,4,0,2]
// ratio.getRaisedRatio([2,2,0,1], 4, 2); // [32,32,0,16]
ratio.getRaisedRatio = function(arr, n, base){
    n = n === undefined ? 1 : n;
    base = base === undefined ? 1 : base;
    var simp = ratio.getSimpleRatio(arr);
    return simp.map(function(el){
        //return n * Math.pow(el, base);
        return n * Math.pow(el, base);
    });
};
 
// The inverse of ratio.getRaisedRatio
// ratio.getLevel([4,4,0,2], 1); // 2
// ratio.getLevel([32,32,0,16], 2); // 4
ratio.getLevel = function(arr, base){
    base = base === undefined ? 1 : base;
    // get lowest non zerro number
    var a = Math.min.apply(null, arr.filter(function(n){
        return n > 0;
    }));
    // if base is one just divide
    if(base === 1){
        return a / base;
    }
    // else use Math.log
    return Math.log(a) / Math.log(base);
};
 
// just the sum of the numbers
ratio.sum = function(arr){
    return arr.reduce(function(acc, n){
        return acc + n;
    });
};
```

## 3 - Testing out the orb module

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


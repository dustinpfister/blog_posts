---
title: Orb Module javaScript example
date: 2021-04-09 16:27:00
tags: [js]
layout: post
categories: js
id: 842
updated: 2021-11-11 16:22:17
version: 1.24
---

Todays [javaScript example](/2021/04/02/js-javascript-example/) is going to be on a [module](/2019/03/12/js-javascript-module/) that I have started a long time ago, but have come around to clean it up a bit because I might want to use it in a game in the near or distance future. The module has to do with and array of point values, and finding a simple ratio of those values, and using the ratio to set one of several kinds of types.

The general idea here is that I have an Orb object that contains an array of four numbers, each number is an integer from zero upwards and represents a count of a certain kind of element. For example the first element in the points array can represent a count of Earth elements, then Wind, Fire, and Water when it comes to that kind of idea with elements in a game. There is then the ratio of these elements that is of interest for example an Orb object with a points value of 14,4,2,2 would have a simple ratio of 7,2,1,1. The ratio could be a kind of recipe, for a special kind of Orb, with special attributes, or it could just be an unknown ratio that does not have any special meaning.

<!-- more -->

## 1 - The orb Module

Time to jump right into the main event of this javaScript example now when it comes to the orb module. I assume that you have at least some background with javaScript as this is a post on an actually project to some extent. If nit you are going t want to take a step back and start out with some kind of [getting started with javaScript](/2018/11/27/js-getting-started/) type post. This is also just a module not a full game project of any kind so when it comes to making some kind of game out of something like this there is more work to be done, and there is going to need to be some kind of view such as with [canvas elements](/2017/05/17/canvas-getting-started/).

When it comes to this module the main public method of interest is the create from points method, all the other methods that are used to create an orb will end up calling this method in an indirect way. This method is used by passing an array of numbers like 4,8,8,0 which will be used directly as the points property of the orb, the simple ratio of the points array would then be 1,2,2,0, and this type of orb would then be composite.

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

That is it for now when it comes to my orbs module, I am sure that I will add a bit more in time but to really know what is missing I will want to start creating at least a few projects using this module. There is not just thinking in terms or the features that I want to add, there is also thinking if a feature should be a part of this module to begin with. I would like to try to keep this module as simple as possible by not adding anything that should be part of another module. For example I am sure than many of the games that I will be using this with will involve a collection of display objects, as such I could make properties like x, y, width, and height part of this orb module, however I think that I should not do that, and rather just make that all part of a whole other module.

## 2 - The ratio module

I have a custom made ratio module that I made primarily for my orbs module, however this ratio module contains some methods that I might want to use in additional projects. So I will be pulling a lot of code that had to do with ratios out of the orb module and into this module unlike what I have done in previous attempts at making this kind of module.

A certain method to this module, and thus also the orb module is the [Greatest Common Divisor](https://en.wikipedia.org/wiki/Greatest_common_divisor) method. This method will find a number that is the highest number that two numbers can be divided by. For example the GCD of 15 and 5 is 5, and the GCD of 7 and 3 is 1. This can then in turn be used as a way to create a simple ratio form of a set of numbers, for example getting 1,1,4,0 from 3,3,12,0 thanks to an [array function form of this kind of method](https://www.geeksforgeeks.org/gcd-two-array-numbers/).

My all non zero equal method serves as a way to know when kind of type an orb should be depending on the simple ratio form of its points. I then have a while bunch of other useful methods that have to do with working with a set of numbers.

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

So now that I have an Orb module worked out I will want to take a moment to just test it out to make sure that it is working as expected. I could make some full blown project around this Orb module, and in time I might get around to doing just that. However for now it might be best to just work out some simple test script of sorts.

```js

var level = 4;
var orb = orbMod.createFromLevel([1,0,2,0], level);
console.log(orb.points);
```

So far it would seem that my orb module is working more or less the way that I expect it to. However I have yet to make a real project on tp of this module. A few bugs that I am managing to miss might still be there, and in any case I will likely want to add a few more features in the event that the mouse seems to work fine. In any case I will of course update this section once I have a nice simple little game of some kind for this.

## 3 - Conclusion

There is still maybe a great deal more work to do with this module, but maybe more so with what it is that I would pile on of of it rather than the core of what it is. There are some additional features that I would like to add this this Orb module, but much of the additional work that will be involved in turning this into an actual game of some kind would involve additional modules such as an object pool, and a state machine. 

I am thinking that the objects that I create with the orb module should be part of a data object of a display object, rather than a kind of display object. There is also a lot of little things when it comes to how the properties of an orb objects effect other properties of this display objects that have to do with game mechanics. I am thinking that I might want to keep all that apart from the orb module itself, but maybe that is something that will prove to be hard to avoid. In which case each time I use this module in a game I am going to want to hack over the source code of it just a little, so that makes creating an maintaining a clean version of the file that much more important.

For the moment there is checking out my many [canvas examples](/2020/03/23/canvas-example/) that I have made thus far when it comes to the various game prototypes that I have put together.



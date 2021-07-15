---
title: The lodash _.flatten method for flatting down a multi dimensional array
date: 2018-08-12 12:17:00
tags: [js,lodash]
layout: post
categories: lodash
id: 257
updated: 2021-07-15 14:41:29
version: 1.14
---

So some of the methods in [lodash](https://lodash.com/) can come in handy, and really do help to save time with certain projects where I might make lodash part of the stack. Todays post on lodash is one of those lodash methods that I might actually use now and then which is the [\_.flatten](https://lodash.com/docs/4.17.10#flatten) method. However when it comes to just working with native javaScript these days there is also the [flat array](/2021/07/15/js-array-flat/) prototype in native javaScript.

The \_.flatten, and also \_.flattenDeep methods are one of many methods that help with the task of working with arrays of arrays, or multi dimensional arrays in javaScript. Flatten can be used to flatten down an array of arrays into a single array, thus making it a method that can be thought of as a reversal of [\_.chunk](/2017/09/13/lodash-chunk/) that will break and array down into an array of arrays that is also worth checking out if you have not done so all ready.

So then taking a moment to play around with flatten and chunk methods in lodash is one way to go about seeing why these two methods can often come in handy. So lets look at a few examples when it comes to working with arrays of arrays, and the lodash flatten method in javaScript.

<!-- more -->

## 1 - what to know

This is a post on the \_.flatten method in lodash, than can be used to flatten nested arrays down into a single array. The flatten method is one of the many [array methods](/2019/02/14/lodash_array/) in lodash many of which are just wrappers of native methods, but thus is one method where that is not the case. 

I will not be getting into lodash, arrays, and javaScript in general in depth, and assume that you have at least some background with javaScript and using lodash in a project.

## 2 - Basic example of \_.flatten, and \_.chunk

So for a basic example of \_.flatten and the corresponding \_.chunk method I will start off with an array of arrays where each array is a number between 1 and 9, and is broken into three arrays of three numbers each. The \_.flatten method can be used to flatten such an array of arrays into a single linear array, and then the \_.chunk method can be used to break it back down again into the array of arrays. So the chunk and flatten methods are two lodash methods that are often used together in a project to quickly change between an array of arrays form, and just a single array.

### 2.1 - flattening an array of arrays into a linear array with \_.flatten

So If I make an array of arrays with the array literal notation I can flatten it down into a straight linear array with the lodash \_.flatten method, but just passing the array of arrays as the first argument.

```js
let grid = [
   [1,2,3],
   [4,5,6],
   [7,8,9]
];
 
let flat = _.flatten(grid);
 
console.log( flat ); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Simple enough right, now if I want to break it back down again I will want to use \_.chunk.

### 2.2 - chunking a linear array into an array of arrays with \_.chunk

So then if I have a linear array but then want to break it down into an array of arrays there is the \_.chunk method that can do the opposite of /_.flatten. It works by passing the linear array as the first argument, and then the element length of the arrays as the second argument.

```js
let flat = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
 
let grid = _.chunk(flat,3);
 
console.log( grid ); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
```

## 3 - The lodash \_.flattenDepth method for when there are many levels of nested arrays

If I have a situation in which I am dealing with many nested levels of arrays I can use the \_.flattenDepth method that is just like \_.flatten only it accepts a second argument that sets the depth at which flattening is to take. With the normal \_.flatten method only a single level will be flattened, and with the \_.flattenDeep method all levels will be flattened, but with \_.flattenDepth I can control the depth of this.

```js
let grid3 = [
   [[1,2,3],[4,5,6],[7,8,9]],
   [[10,11,12],[13,14,15],[16,17,18]],
   [[19,20,21],[22,23,24],[25,26,27]],
];
 
let grid2 = _.flattenDepth(grid3,1);
let grid = _.flattenDepth(grid3,2);
 
// just one level
console.log( grid2 );
/*
[ [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ],
  [ 10, 11, 12 ],
  [ 13, 14, 15 ],
  [ 16, 17, 18 ],
  [ 19, 20, 21 ],
  [ 22, 23, 24 ],
  [ 25, 26, 27 ] ]
*/
 
// all the way to linear
console.log( grid );
// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
```

## 4 - A grid example using \_.flatten and friends

So an example that involves some fun with a gird is in order for a method that has to do with multi dimensional arrays, so lets get into that for a moment as a way to learn why methods like \_.flatten come in handy. Say you are making a game that involves to one extent or another a grid, and each grid position has an object associated with it. This gird might be used in a lot of different ways but so far you just have a single minimal module that uses \_.chunk to break down a linear array into an array of arrays that each have an object for each x, y position.

There is only a few properties of this modules that store the current state of the grid, and a single public method that can be used to generate the grid. When calling the genMap method it will create an object for each position with basic info like x,y, and the index when it does exist as a linear array. The genMap object also allows for a forPos methods that is called for each position which can be used to make custom properties for the position object.

### 4.1 - The grid module using \_.chunk

So here is the code of the module that I was explaining. In it I create a public api, and return that api after calling the genMap method once with default values to make sure that the gird always has some kind of set of values.

```js
let grid = (function () {
 
    // public api method
    let api = {
        grid: [],
        w: 8,
        h: 8
    };
 
    // generate a map
    api.genMap = function (opt) {
 
        opt = opt || {};
        opt.forPos = opt.forPos || function () {};
        this.w = opt.w || this.w;
        this.h = opt.h || this.h;
        this.grid = [];
 
        let i = 0,
        len = this.w * this.h;
        while (i < len) {
 
            let obj = {};
 
            obj.i = i;
            obj.x = i % this.w;
            obj.y = Math.floor(i / this.w);
 
            opt.forPos.call(obj, obj.x, obj.y, obj.i);
 
            this.grid.push(obj);
 
            i += 1;
 
        }
 
        // chunk the linear array into an array of arrays
        this.grid = _.chunk(this.grid, this.w);
 
    };
 
    api.genMap();
 
    return api;
 
}
    ());
```

The genMap method works by just creating a linear array of objects for each position, and then I use the \_.chunk method to break it down into the proper array of arrays form.

### 4.2 - Using \_.flatten to help with tabulating a grid involving money

So now that I have my grid module it is time to start playing around with some custom maps, and methods that involve the use of \_.flatten among other useful methods like [\_.reduce](/2018/07/25/lodash_reduce/). How about a map that holds random amounts of money, and I must make a method that tabulates the total sum of the money in the grid.

```js
// gen a map with random amounts of money in it
grid.genMap({
    w: 3,
    h: 3,
    forPos: function (x, y, i) {
        this.money = _.random(0, 5);
    }
});
 
// A Tab money method that makes use of \_flatten
// to flatten the grid back to a linear array
var tabMoney = function () {
    var grid = this;
    return _.reduce(_.flatten(grid.grid), function (acc, obj) {
        return {
            money: acc.money + obj.money
        }
    }).money;
};
 
console.log(grid.grid);
console.log(tabMoney.call(grid, grid));
/*
[ [ { i: 0, x: 0, y: 0, money: 2 },
    { i: 1, x: 1, y: 0, money: 5 },
    { i: 2, x: 2, y: 0, money: 4 } ],
  [ { i: 3, x: 0, y: 1, money: 4 },
    { i: 4, x: 1, y: 1, money: 1 },
    { i: 5, x: 2, y: 1, money: 4 } ],
  [ { i: 6, x: 0, y: 2, money: 4 },
    { i: 7, x: 1, y: 2, money: 4 },
    { i: 8, x: 2, y: 2, money: 2 } ] ]
30
*/
```

Here my tab money method works by making use of \_.flatten to flatten the grid into a linear array to which I am then using with \_.reduce to tabulate the amount of money for each position object.

## 5 - conclusion

I hope you enjoyed this post on the lodash \_.flatten method, if you think there should be something more to add to this post be sure to let me know in the comments. Also if you enjoyed this post you might want to check out my many other [posts on lodash](/categories/lodash/). Some other posts of interest that are relevant to \_.flatten might be my post on [\_.chunk](/2017/09/13/lodash-chunk/), and [\_.zip](/2018/02/01/lodash_zip/)
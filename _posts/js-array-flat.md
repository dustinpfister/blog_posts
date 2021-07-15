---
title: Flatten an array with the flat method or alternatives
date: 2021-07-15 14:17:00
tags: [js]
layout: post
categories: js
id: 911
updated: 2021-07-15 14:38:23
version: 1.7
---

If I want to flatten an array of arrays into a single array of values, and I am working in a modern javaScript environment, then I can use the [fill Array prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to do so. If for some reason I am using an old version of node that does not support Array.fill, or if I need better backward support then there are a wide rand of options when it comes to creating or finding alternatives to the array flat method also.

<!-- more -->


## 1 - basic example

First off a basic example of the array flat method where I am just flattening down a single array of arrays just one level.

```js
let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nums.flat();
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

A depth argument can be given to the array flat method, and by default the depth is 1.

## 2 - Vanilla javaScript alternatives

For the most part I should be able to just use the array flat method and move on with my life when it comes to this sort of thing. However if I am using an old version of node that does not support this method, then I might need some kind of alternative. Also when it comes to coding purely for the sake of learning, making a method like this might not be a waste of time because it can prove to be a good exercise of writing a recurse method when it comes to creating a depth feature for the method.

### 2.1 - Basic reduce concat example

Many the alternative methods that I see on the web make use of the [array reduce](/2021/07/13/js-array-reduce/) and [array concat](/2020/07/13/js-array-concat/) methods. The array reduce method will work on browsers as old as Internet explorer 9, and the array concat method goes back even farther than that. These days I can not say that I would every need or want to go back father than that, so in most cases a method that make use of those array methods should work just fine.

```js
var flatten = function (arr) {
    var reducer = function (acc, val) {
        return acc.concat(val);
    };
    return arr.reduce(reducer, []);
};
 
var nums = [[1, 2, 3, [4, 5]], 6, 7];
var flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]
```

### 2.2 - Reduce concat example with recursion

```js
var flatten = function (arr) {
    var reducer = function (acc, val) {
        if (typeof val === 'object') {
            if (val.constructor.name === 'Array') {
                return acc.concat(flatten(val));
            }
        }
        return acc.concat(val);
    };
    return arr.reduce(reducer, []);
};
let nums = [[1, 2, 3, [4, 5]], 6, 7];
let flat = flatten(nums);
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7 ]
```

### 2.3 - Reduce concat example with recursion and a depth argument

```js
var flatten = function (arr, depth) {
    depth = depth === undefined ? 1 : depth;
    var flattenLevel = function (arr, level) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                if (val.constructor.name === 'Array') {
                    var nextLevel = level + 1;
                    if (nextLevel <= depth) {
                        return acc.concat(flattenLevel(val, nextLevel));
                    }
                    return acc.concat([val]);
                }
            }
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };
    return flattenLevel(arr, 0);
};
 
var nums = [[1, 2, 3, [4, 5]], 6, 7];
console.log(flatten(nums, 0));
// [ [ 1, 2, 3, [ 4, 5 ] ], 6, 7 ]
console.log(flatten(nums, 1));
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]
console.log(flatten(nums, 2));
// [ 1, 2, 3, 4, 5, 6, 7 ]
 
var grid = [ [1, 2], [3, [4, 5]], [6, 7]];
 
console.log(flatten(grid, 1));
// [ 1, 2, 3, [ 4, 5 ], 6, 7 ]
console.log(flatten(grid, 2));
// [ 1, 2, 3, 4, 5, 6, 7 ]
```

## 3 - Polling filling Array.fill

```js
// polly fill for old versions of node
Array.prototype.flat = function (depth) {
    var arr = this;
    depth = depth === undefined ? 1 : depth;
    var flattenLevel = function (arr, level) {
        var reducer = function (acc, val) {
            if (typeof val === 'object') {
                if (val.constructor.name === 'Array') {
                    var nextLevel = level + 1;
                    if (nextLevel <= depth) {
                        return acc.concat(flattenLevel(val, nextLevel));
                    }
                    return acc.concat([val]);
                }
            }
            return acc.concat(val);
        };
        return arr.reduce(reducer, []);
    };
    return flattenLevel(arr, 0);
};
 
let nums = [[1, 2, 3], [4, [5, 6]], [7, 8, 9]];
 
console.log(nums.flat(0));
// [ [ 1, 2, 3 ], [ 4, [ 5, 6 ] ], [ 7, 8, 9 ] ]
console.log(nums.flat(1));
// [ 1, 2, 3, 4, [ 5, 6 ], 7, 8, 9 ]
console.log(nums.flat(2));
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 4 - Conclusion


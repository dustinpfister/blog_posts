---
title: Flatten an array with the flat method or alternatives
date: 2021-07-15 14:17:00
tags: [js]
layout: post
categories: js
id: 911
updated: 2021-07-15 14:24:50
version: 1.1
---

If I want to flatten an array of arrays into a single array of values, and I am working in a modern javaScript environment, then I can use the [fill Array prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) to do so.

<!-- more -->


## 1 - basic example

```js
let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nums.flat();
console.log(flat);
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 2 - Vanilla javaScript alternatives

### 2.1 - Basic reduce concat example

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


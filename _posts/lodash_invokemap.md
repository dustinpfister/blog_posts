---
title: invoke them all with lodash invokeMap or just plain old javaScript
date: 2020-05-01 15:43:00
tags: [lodash]
layout: post
categories: lodash
id: 654
updated: 2020-05-01 15:57:11
version: 1.3
---

So you have a collection in javaScript, and by collection I mean an array or an object in general that is a collection of key value pairs. You want to invoke a method in the collections prototype, or any method in general for all elements in this collection. Well in lodash there is the [invokeMap method](https://lodash.com/docs/4.17.15#invokeMap) that can be used to invoke a method at a certain path for all elements in a collection. However in modern javaScript there are also plenty of tools to grab at to begin with that a javaScript developer should be ware of that can also be used for this kind of task. So lets take an look at some code examples of calling a method for all elements in a collection.

<!-- more -->

## 1 - Using lodash invoke map with an array to call an array prototype method

So the lodash invoke map method is used by calling the method and then passing the collection as the first argument. The second argument is then a path to a method in the given collection object, or a function to use in place for such a method that is to be called for all elements in the collection. Any additional arguments are then arguments that are to be passed to the method that is to be called.

```js
let arr = [
    [7, 56, 3, 3, 0, 12],
    [6, 5, 4],
    [5, 5, 5, 1]
];
 
let sorter = function (a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};
 
let r = _.invokeMap(arr, 'sort', sorter);
 
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```

### 1.1 - Doing the same thing with vanilla javaScript using Array.prototype.map

```js
let r = arr.map(function (nums) {
        return nums.sort(sorter);
    });
 
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```

## 2 - Okay but lodash invoke map is a collection method so it works out of the box with objects in general too

```js
let obj = {
    a: [7, 56, 3, 3, 0, 12],
    b: [6, 5, 4],
    c: [5, 5, 5, 1]
};
 
let sorter = function (a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};
 
let r = _.invokeMap(obj, Array.prototype.sort, sorter);
 
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```

## 2.1 - However it is not that much harder to do so with vanilla javaScript, just need to use Object.values

```js
let r = Object.values(obj).map(function (nums) {
        return nums.sort(sorter);
    });
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```
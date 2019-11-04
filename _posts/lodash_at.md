---
title: lodash at method
date: 2019-11-04 12:19:00
tags: [js,lodash]
layout: post
categories: lodash
id: 555
updated: 2019-11-04 13:29:15
version: 1.2
---

The [lodash at](https://lodash.com/docs/4.17.15#at) method can be used to create an array of values from an object with a given array of paths to values from the object that are to be included in the array.

<!-- more -->

## 1 - lodash at method basic example

```js
let color = {
    a: 255,
    r: 128,
    b: 0,
    g: 64
};
 
let cArr = _.at(color, ['r','g','b', 'a']);
 
console.log(cArr);
// [ 128, 64, 0, 255 ]
```

## 2 - An Array of objects and lodash at

```js
let colors = [
    {a: 255,r: 128,b: 0,g: 64},
    {a: 255,r: 32,b: 32,g: 0},
    {a: 255,r: 28, b: 28,g: 28}
];
 
// _.map and _.at can be used to create an array
// of arrays
let cArr = _.map(colors, (color) => {
        return _.at(color, ['r', 'g', 'b', 'a']);
    });
console.log(cArr);
// [ [ 128, 64, 0, 255 ], [ 32, 0, 32, 255 ], [ 28, 28, 28, 255 ] ]
 
// a single color can be obtained by changing the path values
console.log( _.at(colors, ['[1].r', '[1].g', '[1].b', '[1].a']) );
// [ 32, 0, 32, 255 ]
```
---
title: lodash at method
date: 2019-11-04 12:19:00
tags: [js,lodash]
layout: post
categories: lodash
id: 555
updated: 2020-06-07 19:05:36
version: 1.7
---

The [lodash at](https://lodash.com/docs/4.17.15#at) method can be used to create an array of values from an object with a given array of paths to values from the object that are to be included in the array. When using the lodash at method the oder of the index values for the elements in the resulting array correspond with the order of the paths given in the array that is passed when calling the lodash at method. So in other words this can resolve issues where the order of key names in a plain old object are not always in a desired order.

<!-- more -->

## 1 - lodash at method basic example

For a basic example of the lodash at method I put together a quick example that has to do with a color object. In this color object I have property key value pairs for each color channel, and and alpha value. I want an array where the first index value is the red channel, followed by green, blue, and finally the alpha channel value. The lodash \_.at method can be used to create that array, and in the oder that I want the index values.

I just call the lodash \_.at method, pass the color object as the first argument, and then an array of paths to each property that I want in the new array. The order in which the paths are given will be the order in which the values will be indexed in the array that will be returned by \_.at.

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

I have an array of my color objects then I can again use the lodash \_.at method to create and array of arrays by using a method like [lodash map](/2018/02/02/lodash_map/) for example. I can also create just one object by changing the value of the paths string to do so.

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
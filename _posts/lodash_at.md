---
title: lodash at method
date: 2019-11-04 12:19:00
tags: [js,lodash]
layout: post
categories: lodash
id: 555
updated: 2021-12-08 15:37:38
version: 1.15
---

The [lodash at](https://lodash.com/docs/4.17.15#at) method can be used to create an array of values from an object with a given array of paths to values from the object that are to be included in the array. When using the lodash at method the order of the index values for the elements in the resulting array correspond with the order of the paths given in the array that is passed when calling the lodash at method. So in other words this can resolve issues where the order of key names in a plain old javaScript object are not always in a desired order.

<!-- more -->

## 1 - The basics of lodash at, and what to know first

This is a post on the lodash at method in the javaScript utility library known as lodash. With that said I trust that you have at least enough experience with javaScript and the specific environment that you are coding in to know how to make use of an external javaScript library and so forth. If not even this basic section of the post might still prove to be a bit to advanced for you at the moment, and you might want to take a step back and read up on a [getting started with javaScript type post](/2018/11/27/js-getting-started/).

With that said in this section I will be starting out with just a few basic examples of the lodash at method. When it comes to additional source code examples that have to do with doing similar things with javaScript by itself that is something that I will be getting to in a later section in this post.

### 1.1 - lodash at method basic example

For a basic example of the lodash at method I put together a quick example that has to do with a color object. In this color object I have property key value pairs for each color channel, and and alpha value. I want an array where the first index value is the red channel, followed by green, blue, and finally the alpha channel value. The lodash \_.at method can be used to create that array, and in the oder that I want the index values.

I just call the lodash \_.at method, pass the color object as the first argument, and then an array of paths to each property that I want in the new array. The order in which the paths are given will be the order in which the values will be indexed in the array that will be returned by \_.at.

```js
let color = {
    a: 255,
    r: 128,
    b: 0,
    g: 64
};
 
let cArr = _.at(color, ['r','g','b','a']);
console.log(cArr);
// [ 128, 64, 0, 255 ]
```

### 1.2 - An Array of objects and lodash at

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

## 2 - Vanilla javaScript

### 2.1 -

```js
let color = {
    a: 255,
    r: 128,
    b: 0,
    g: 64
};
let cArr = [ color.r, color.g, color.b, color.a ]
console.log(cArr);
// [ 128, 64, 0, 255 ]
```

### 2.2 - 

```js
const getColorArray = (colors, index) => {
    let obj = colors[index];
    return [obj.r, obj.g, obj.b, obj.a];
};
 
let colors = [
    {a: 255,r: 128,b: 0,g: 64},
    {a: 255,r: 32,b: 32,g: 0},
    {a: 255,r: 28, b: 28,g: 28}
];
 
let cArr = getColorArray(colors, 1);
console.log(cArr);
// [ 32, 0, 32, 255 ]
```

## 3 - Concustion

So then the lodash at method is a way to go about creating an array of values from a source object and an array of paths to the various values in the source object. If you enjoyed this post you might want to check out my [main post on lodash](/2019/02/15/lodash/), my post on [lodash array methods](/2019/02/14/lodash_array/) in general, or one of my [many other posts on lodash](/categories/lodash/).


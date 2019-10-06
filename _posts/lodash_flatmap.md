---
title: lodash flatmap method and alternatives
date: 2019-10-01 14:40:00
tags: [lodash]
layout: post
categories: lodash
id: 540
updated: 2019-10-06 17:58:36
version: 1.6
---

So there is the native javaScript array map method, and then there is the lodash map collection method. The map method is often used in conjunction with many other methods to produce an array of collection in a certain format, including methods like then flatten method. With lodash there are a few methods that are a single method that combines the functionality of two methods such as the [lodash flatmap](https://lodash.com/docs/4.17.15#flatMap) method which I will be going over in this post.

<!-- more -->

## 1 - lodash flatmap basic example

The lodash flat map method works more or less the same way as the [lodash map](/2018/02/02/lodash_map/) method in the sense that the first argument is a collection and the second argument is an iteratee method for each element in the collection. The difference is that an array of results for each element is what is expected to be returned by the iteratee and that array is to be flattened into an array of just one dimension.

```js
let fromRed = (r) => {
    let g = 128 + Math.floor(r / 255) * 64,
    b = 255 - r;
    return [r, g, b];
}
let notFlat = _.map([0,255], fromRed);
let flat = _.flatMap([0, 255], fromRed);
console.log(notFlat);
// [ [ 0, 128, 255 ], [ 255, 192, 0 ] ]
console.log(flat);
// [ 0, 128, 255, 255, 192, 0 ]
```

## 2 - Chaining lodash map and flatten

To some extent the lodash flatten method is redundant as the same result can be achieved with the lodash map and lodash flatten method by way of chaining.

```js
let fromRed = (r) => {
    let g = 128 + Math.floor(r / 255) * 64,
    b = 255 - r;
    return [r, g, b];
}
 
// the same result can be achieved by chaining with
// lodash map and lodash flatten
let flat = _([0,255]).map(fromRed).flatten().value()
console.log(flat);
// [ 0, 128, 255, 255, 192, 0 ]
```
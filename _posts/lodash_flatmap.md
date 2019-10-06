---
title: lodash flatmap method and alternatives
date: 2019-10-01 14:40:00
tags: [lodash]
layout: post
categories: lodash
id: 540
updated: 2019-10-05 20:14:04
version: 1.3
---

So there is the native javaScript array map method, and then there is the lodash map collection method. The map method is often used in conjunction with many other methods to produce an array of collection in a certain format, including methods like then flatten method. With lodash there are a few methods that are a single method that combines the functionality of two methods such as the [lodash flatmap](https://lodash.com/docs/4.17.15#flatMap) method which I will be going over in this post.

<!-- more -->

## 1 - lodash flatmap basic example

The lodash flat map method works more or less the same way as the lodash map method.

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

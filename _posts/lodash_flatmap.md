---
title: lodash flatmap method and alternatives
date: 2019-10-01 14:40:00
tags: [lodash]
layout: post
categories: lodash
id: 540
updated: 2020-06-07 19:01:40
version: 1.10
---

So there is the native javaScript array map method, and then there is the lodash map collection method. The map method is often used in conjunction with many other methods to produce an array or collection object in general in a certain end format. For example I might map over an array of source objects to create primitive values that I would then pass threw another method such as reduce to reduce the array of primitives into a single value. 

However there are many methods that I might use other than reduce including methods like the flatten method. With lodash there are a few methods that are a single method that combines the functionality of two methods such as the [lodash flatmap](https://lodash.com/docs/4.17.15#flatMap) method which I will be going over in this post.

So the lodash flatmap method in lodash is one of many methods that I do not use often, and alo it is not such a big deal to just use map, and then flatten. never the less this will be the subject of this post.

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

## 3 - Vanilla javaScript alternatives to lodash flat map

This is a post on lodash, but many developers these days prefer to just go with just plain old native javaScript by itself for many of these kind of tasks. Doing so should still be done with caution, many methods might not have great browser support, and backward computability is also an issue of interest when making a node project also. Still in this section I will be going over some vanilla javaScript alternatives to the lodash flatten method.

### 3.1 - Array map, reduce, and concat chain

Maybe one of the best options to go with these days will still involve chaining a few native method that include array map, along with array reduce and array concat.

```js
// the native map method can be used to create
// an array of arrays for starters
let arr = [0, 255].map(fromRed), flat;
console.log(arr);
// [ [ 0, 128, 255 ], [ 255, 192, 0 ] ]
 
// reduce and concat is one option
flat = arr.reduce((acc, val) => acc.concat(val));
console.log(flat);
// [ 0, 128, 255, 255, 192, 0 ]
```

This solution might still break on older browsers, but often so will lodash code as well in some cases it it is a late version of lodash.
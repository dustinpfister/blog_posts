---
title: lodash flatmap method and alternatives
date: 2019-10-01 14:40:00
tags: [lodash]
layout: post
categories: lodash
id: 540
updated: 2021-12-09 08:46:12
version: 1.21
---

So there is the native javaScript [array map method](/2020/06/16/js-array-map/), and then there is the [lodash map](/2018/02/02/lodash_map/) collection method. The map method is often used in conjunction with many other methods to produce an array or collection object in general in a certain end format. For example I might map over an array of source objects to create primitive values that I would then pass threw another method such as the [lodash reduce method](/2018/07/25/lodash_reduce/) to reduce the array of primitives into a single value. 

However there are many methods that I might use other than reduce including methods like the [lodash flatten method](/2018/08/12/lodash_flatten/), and the [lodash chunk](/2017/09/13/lodash-chunk/) methods that are helpful tools when it comes to working with [multidimensional arrays](/2020/03/31/js-array-multidimensional/). With lodash there are a few methods that are a single method that combines the functionality of two methods such as the [lodash flatmap](https://lodash.com/docs/4.17.15#flatMap) method which I will be going over in this post.

So the lodash flatmap method in lodash is one of many methods that I do not use often, and alo it is not such a big deal to just use map, and then flatten. never the less this will be the subject of this post.

<!-- more -->

## 1 - Lodash flat map and other lodash methods

In this section I will be going over a few basic examples of the lodash flat map method as well as the use of one or more additional lodash methods that can be used to do the same thing as the lodash flat map method. I assume that you have at least a little experience with getting started with lodash and javaScript in general so I will only be keeping the examples so basic here. If you are still fairly new to javaScript you might want to take a step back and take a look at some kind of [getting stared with javaScript](/2018/11/27/js-getting-started/) type post. In order to make use of a method like the lodash flat map method you might also want to read up more on how to work with [arrays in javaScript](/2018/12/10/js-array/) starting with what there is to work with when it comes to javaScript by itself.

### 1.1 - lodash flatmap basic example

The lodash flat map method works more or less the same way as the lodash map method in the sense that the first argument is a collection and the second argument is an iteratee method for each element in the collection. The difference is that an array of results for each element is what is expected to be returned by the iteratee and that array is to be flattened into an array of just one dimension.

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

### 1.2 - Chaining lodash map and flatten

To some extent the lodash flatten method is redundant as the same result can be achieved with the lodash map and lodash flatten methods by way of chaining. There are two ways of going about doing chaining with lodash, one of which is to call the [lodash chain](/2018/11/11/lodash_chain/) method and the other is to call the main lodash method. When calling one or the other I start out by passing the value that I want to chain with, what is returned is then an object to which I can call all kinds of lodash methods such as the lodash map and flatten methods. In order to get a final value when doing this I then need to call a lodash method that will return a primitive value, or call the value method of the object wrapper.

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

## 2 - Vanilla javaScript alternatives to lodash flat map

This is a post on lodash, but many developers these days prefer to just go with just plain old native javaScript by itself for many of these kind of tasks. Doing so should still be done with caution, many methods might not have great browser support, and backward computability is also an issue of interest when making a node project also. Still in this section I will be going over some vanilla javaScript alternatives to the lodash flatten method.

### 2.1 - Array map, reduce, and concat chain

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

## 3 - Conclusion

I can not say that I use the lodash flat map method that often, in fact I would say I do not use it at all, even when I am using lodash in a project. Also with that said I am not using lodash at all in most projects these days which is why I have been going in the direction of making sure that I mentioning at least a few vanilla javaScript solutions in these posts on lodash also.Things have progressed to the point where it is only a hand full of methods now that are really of interest in lodash, and maybe to some extent some of the array flattening methods are among that small collection. There is a native array flat method now, but in a way it is still a relative new addition so it makes sense to use a method like lodash flatten or at least some kind of polly fill method.


---
title: The lodash _.concat method
date: 2018-08-02 18:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 244
updated: 2019-11-07 11:30:10
version: 1.6
---

In this [lodash](https://lodash.com/) post I will be writing about the lodash [\_.concat](https://lodash.com/docs/4.17.10#concat) method, and of course the corresponding vanilla js method [Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat). 

If you are wondering what the diference is between the two the anwser is there is none, the lodash concat method is one of several methods in lodash that I have come to call [lodash wrapper methods](/2019/11/01/lodash_wrapper_methods). 

Still it is there just for the hell of it, and looking into the lodash source code, it looks like the lodash developers are not just directly referencing the native method, as is the case with some of these methods.

<!-- more -->

Although this is a lodash post on \_.concat, this is also a kind of post of concatenating arrays in general. Also although there might not be much of a point using \_.concat by itself in light of the vanilla js Array.concat, diving deep into the source code \_.concat uses some internal methods that are shared with related methods like \_.flattenDeep.

## 1 - what to know

This is a post on the lodash method \_.concat that can be used to combine, or concatenate two or more arrays into one array. There is also the Array.concat method in javaScript itself that works the same way. I assume that you have some basic working knowledge of javaScript in general, and how to get started with using lodash in a project.

## 2 - Basic examples of array concatenation using lodash, and plain javaScript

For a basic example of concat what is more basic then just some arrays of primitives right? In this section basic example of array concatenation will be covered using lodash \_.concat, and Array.concat.

### 2.1 - Basic example using \_.concat

So the \_.concat method works by just calling the method, and then giving the arrays, and elements to combine into an array.

```js
let start = [1, 2, 3],
mid = [4, 5, 6],
end = [7, 8, 9];
 
let full = _.concat(start, mid, end);
 
console.log(full); // [1,2,3,4,5,6,7,8,9]
```

This can be any mixture of arrays or values. primitives like always will be copy's, however objects, will of course be references so be careful about that. However for the most part that is all there is to it, and this is often preferable to a more complex alternative that involves creating a new array, and looping.

### 2.2 - Basic example using Array.concat

The vanilla js method Array.concat works in a very similar fashion, the only note worth difference would appear to be that is a prototype method of Array rather that a stand alone method that is given arguments like with \_.concat.

```js
let start = [1, 2, 3],
mid = [4, 5, 6],
end = [7, 8, 9];
 
// from an empty array
let full = [].concat(start, mid, end);
console.log(full); // [1,2,3,4,5,6,7,8,9]
 
// or an existing one
console.log( ['a','b','c'].concat(['d','e','f']) ); // [ 'a', 'b', 'c', 'd', 'e', 'f' ]
 
// with call
console.log(Array.prototype.concat.call( ['a','b'],['c','d'] )); [ 'a', 'b', 'c', 'd' ];
```

## 3 - Be aware of references

So when concatenating arrays it is important to rememberer that objects are copied by reference in javaScript. If this is a problem you will want to use something like [\_.cloneDeep](/2017/11/13/lodash_clonedeep/) to see that the objects are full new separate objects by themselves, and are not just being referenced.

```js
let _ = require('lodash');
 
// some objects
let objs = [{x:1,y:5}, {x:7,y:10}];
 
// concatenating with another object
let points = _.concat(objs, {x:0,y:0});
 
// works as exspected
console.log(points); // [ { x: 1, y: 5 }, { x: 7, y: 10 }, { x: 0, y: 1 } ]
 
// but what if the primitives in the referenced
// objects change?
_.each(objs, function(pt){
 
    pt.x = 0;
    pt.y = 0;
 
});
 
// this is what
console.log(points); // [ { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 } ]
```
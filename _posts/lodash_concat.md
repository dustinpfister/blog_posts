---
title: The lodash concat method and native javaScript options for adding two or more arrays together
date: 2018-08-02 18:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 244
updated: 2021-12-21 10:37:17
version: 1.17
---

In this [lodash](https://lodash.com/) post I will be writing about the lodash [\_.concat](https://lodash.com/docs/4.17.10#concat) method, and of course the corresponding vanilla js method [Array.concat](/2020/07/13/js-array-concat/) built into the [Array prototype](/2018/12/10/js-array/) in core javaScript itself. Regardless of which one you use the result is the same, adding two or more arrays into a single array in other words concatenation of arrays rather then Strings.

If you are wondering what the difference is between the lodash and native options when it comes to an array concatenation method in javaScript, the answer is there is none beyond that os just making an abstraction. The lodash concat method is one of several methods in lodash that I have come to call [lodash wrapper methods](/2019/11/01/lodash_wrapper_methods/). These are methods where a native javaScript method is just simply being wrapped, and in this case more os less just for the sake of consistency when it comes to using lodash.

Still it is there just for the hell of it, and looking into the lodash source code, it looks like the lodash developers are not just directly referencing the native method, as is the case with some of these methods.

<!-- more -->

Although this is a lodash post on \_.concat, this is also a kind of post of concatenating arrays in general. Also although there might not be much of a point using \_.concat by itself in light of the vanilla js [Array.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat), diving deep into the source code \_.concat uses some internal methods that are shared with related methods like \_.flattenDeep.

## 1 - lodash concat, and What to know first

This is a post on the lodash method \_.concat that can be used to combine, or concatenate two or more arrays into one array. There is also the Array.concat method in javaScript itself that works the same way. I assume that you have some basic working knowledge of javaScript in general, and how to get started with using lodash in a project. If not you might want to take a step back and look into a getting started with lodash type post, and maybe also do the same with [javaScript in general](/2018/11/27/js-getting-started/) also if you are still fairly new to this sort of thing.

In this section basic examples of array concatenation will be covered using lodash with the concat method as well as various other lodash methods. In a later section in this post I will be covering how to go about doing various things that can be done with the lodash concat method using just native javaScript alone. 

### 1.1 - Basic example using \_.concat

For a basic example of the lodash concat method I think it would be a good idea to just start out with a few arrays that are just simple arrays of primitives such as numbers. So the \_.concat method works by just calling the method, and then giving the arrays, and elements to combine into a new array that will be returned from lodash concat using the given source arrays and elements.

```js
let start = [1, 2, 3],
mid = [4, 5, 6],
end = [7, 8, 9];
 
let full = _.concat(start, mid, end);
 
console.log(full); // [1,2,3,4,5,6,7,8,9]
```

This can be any mixture of arrays and or values as well passing everything that I want tin order as arguments to the lodash concat method. Primitives like always will be copied by value rather than reference, however objects, will of course be references unless action is taken to prevent that so be careful about that when dealing with objects. However for the most part that is all there is to it, and this is often preferable to a more complex alternative that involves creating a new array, and looping. So then I might just want to expand this section with a few more examples of this lodash concat method, but now it is more about using the concat method with other methods, and various other situations that will come up when dealing with arrays and objects in general actually. There is after all only so much to write about when it comes to the concat method alone in lodash.


### 1.2 - Be aware of references

So when concatenating arrays it is important to rememberer that objects are copied by reference in javaScript. If this is a problem you will want to use something like [\_.cloneDeep](/2017/11/13/lodash_clonedeep/) to see that the objects are full new separate objects by themselves, and are not just being referenced. At last that might end up being the desired outcome in some situations anyway. In certain use case examples I might want the root element objects themselves, or a given nested object with in one or more of them to remain references to the same objects in memory actually. Such is often the case when dealing with html element nodes in client side javaScript for example. However maybe getting into this more is called for in a more advanced section on matters such as this.

```js
let _ = require('lodash');
 
// some objects
let objs = [{x:1,y:5}, {x:7,y:10}];
 
// concatenating with another object
let points = _.concat(objs, {x:0,y:0});
 
// works as expected
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

## 2 - Vanilla javaScript altertaives to lodash concat

Now that I covered a few examples that have to do with combining two or more arrays using lodash, in this section I will be going I will be going over a few examples that have to do with using just javaScript by istelf to combine arrays into a single array.

### 2.1 - Basic example using Array.concat

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

## 3 - Conclusion

That will be it for now when it comes to using lodash to combine two or more arrays into a single array.

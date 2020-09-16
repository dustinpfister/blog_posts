---
title: Array Slice in javaScript and related topics
date: 2018-12-08 11:17:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 346
updated: 2020-09-16 13:59:40
version: 1.20
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) the [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) prototype method comes up a whole lot in many code examples. It works in a very similar fashion to that of [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) but with one very important difference, it returns a new Array rather than manipulating the existing one that it is used with. 

This nature of the array slice method that involves not mutating an array in place makes it consistent with the concept of pure functions, and functional programing in when working with an array of primitives. So for todays post on javaScript I will be covering some simple examples of Array.slice, as well as some related topics.

<!-- more -->


## 1 - JavaScript Array Slice basic example

For starters lets look at a very basic example of the Array.Slice method just for the sake of covering the very basics. With that said when working with an instance of a javaScript Array the Array.slice prototype method can be used by calling the method off the Array instance, and passing a starting and ending index for the range of elements to be included in the new array. The returned result will be a new array that is a collection of elements from that starting index up to one less from the ending index. So the ending index in other words will not be included in the returned new array that is a slice of the source array.

```js
let a1 = [1,2,3,4],
a2 = a1.slice(1,3);
 
// a2 is a new array
// with the starting and ending index values
// from the a1 array
console.log(a2); // [2,3]
 
// and a1 remains unchanged
console.log(a1) // [1,2,3,4]
```

The index values are zero relative as is the case with all javaScript arrays as usual.

What is nice about this is that you can see that the source array is not mangled, this is not the case with the array splice method that will mutate the array in place. Many built in array prototype methods are like that which is one talking point as to why a lot of developers still like to use lodash over some of this built in methods.

## 2 - Getting the last element of an array with array slice

Negative index values can be given to Array.slice this results in the corresponding index value from the end of the length of an array. So then array slice can be used as a quick way of getting the last element of an array by taking advantage of this fact.

```js
let a1 = [1,2,3,4],
last = a1.slice(-1)[0];
 
console.log(last); // 4
```

So I guess it is slightly more concise then the less one from length trick that I usually use, but that is a major nano pic issue.

```js
let a1 = [1,2,3,4],
last = al[al.length - 1];
 
console.log(last); // 4
```

## 3 - javaScript Array slice can be used to clone an array of primitives

So because Array.slice returns a new Array rather than mutating one it can, in some cases, be used as a way to clone an array assuming it is an array of primitive values.

```js
let a1 = [1,2,3,4],
a2 = a1.slice();
 
a1[1] += 5;
 
console.log(a1); // [1,7,3,4]
console.log(a2); // [1,2,3,4]
```

This works because I am working with an array of primitives, objects however are copied by reference. So in these situations using just array slice might not be enough. Some how you will need to preform a shallow or even deep clone of the array first in order to really return something that is separate from the source that can not end up being mangled elsewhere in a body of code. However getting into stuff like that is beyond the scope of this post.

```js
var points = [
    {
        x: 5,
        y: 42
    }, {
        x: 27,
        y: -15
    }
];
 
var p = points.slice();
 
points[0].x = 0;
 
console.log(points[0].x); // 0
console.log(p[0].x); // 0
```

## 4 - Conclusion

So the array slice prototype method is a way to get a section of an array, without mutating the source array. [This is not to be confused with the array spice](https://www.freecodecamp.org/news/lets-clear-up-the-confusion-around-the-slice-splice-split-methods-in-javascript-8ba3266c29ae/) method that can be use to do the same, only it will mutate the array in place.

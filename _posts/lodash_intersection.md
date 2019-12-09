---
title: lodash intersection method
date: 2019-12-03 20:10:00
tags: [lodash]
layout: post
categories: lodash
id: 575
updated: 2019-12-09 10:12:52
version: 1.8
---

Time for another post on lodash this one is on the [lodash intersection](https://lodash.com/docs/4.17.15#intersection) method. The \_.intersection method will create an array of values that are in all the given arrays using the [lodash \_.eq](/2019/12/04/lodash_eq) method also known as same value zero for comparisons.

This is yet another kind of task that is not so hard to do with just plain old javaScript by itself these days using array prototype methods such as array some, and array filter. However regardless if you use lodash or not this will be a post on creating arrays of intersecting values in javaScript in general.

<!-- more -->

## 1 - lodash intersection basic example

So for a basic example of the lodash intersection method, if I just have to arrays of primitives I can just pass those arrays as arguments to the lodash intersection method. The result that is returned will then be an array of values that are in all of those given arrays.

```js
let arr1 = [1, 4, 5],
arr2 = [1, 2, 1],
arr3 = [1, 4, 5],
 
result = _.intersection(arr1, arr2, arr3);
 
console.log(result); // [1]
```

So arrays of primitives are nice, but any real project will often involve arrays of objects. There are two other methods in lodash called \_.intersectionBy and intersectionWith than can be used to work with more complex situation sin which collection of objects are involved.

## 2 - Objects and lodash intersection by

when working with arrays of objects things can get a little more involved. However if I do just want to compare a uniform object property then the lodash \_.intersectionBy method can be used.

```js
let arr1 = [{id: 7}, {id: 10}],
arr2 = [{id:7}],
 
result = _.intersectionBy(arr1, arr2, 'id');
 
console.log(result); // [ { id: 7 } ]
```


## 3 - Vanilla javaScript and intersection

Creating a true lodash intersection vanilla javaScript alternative is a little tricky. Keep in mind that the same value zero way of comparison is used rather than equality or identity. So a solution will have to involve the use of Object.is, or a polyfill of that just to make the comparisons.

Still you might start out with something like this that will work fine for comparing just two arrays.

```js
let arr1 = [1, 4, 5, NaN],
arr2 = [1, 2, 1, NaN];
 
let intersectTwo = (a, b) => {
    return a.filter((x) => {
        return b.some((y) => {
            return Object.is(x, y);
        });
    });
};
 
console.log( intersectTwo(arr1, arr2) );
// [1,NaN]
```

If I where to use just equality or identity for the comparisons then the NaN value will not be included.
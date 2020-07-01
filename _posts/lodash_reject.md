---
title: lodash reject compaired to lodash filter and other native javaScript options
date: 2020-07-01 10:33:00
tags: [lodash]
layout: post
categories: lodash
id: 674
updated: 2020-07-01 10:40:38
version: 1.1
---

I often start out each new month with a new post on lodash because it would seem that there is still much interest in this utility library despite its age. For this post I will be working out a few quick examples of the lodash reject method that is just simple an inversion of the lodash filter method. This method in lodash is not really one of the redeeming methods in lodash that make the library worth while as there is of course the native array filter method that can be used to quickly create a reject method in plain old javaScript by itself.

Still it would seem that there are some talking points with this one as the lodash reject method is one of the collection methods in lodash that will work with both arrays and many objects in general. Still it is not so hard to just work out ways of doing the same thing with just native javaScript by itself. So this will of course not just be a post on the lodash reject method but also native javaScript examples that do the same things the lodash reject method does. 

<!-- more -->


## 1 - 

```js
let arr = [1, 2, 'foo', 3, 'bar', true, null, 4, {}, NaN];
 
let nums = _.reject(arr, (el) => {
        return typeof el != 'number' || String(el) === 'NaN';
    });
 
console.log(nums); // [1,2,3,4]
```

## 2 - 

```js
let a = [1,2,'b',3];
 
let test = (el)=> typeof el === 'string';
 
console.log( _.reject(a, test ) ); // [1,2,3]
 
console.log( _.filter(a, test ) ); // ['b']
```

## 3 - 

### 3.1 -

```js
let a = [1, 2, 'b', 3];
 
let test = (el) => typeof el === 'string';
 
let reject = (arr, test) => {
    return arr.filter((el) => !test(el));
};
 
console.log(reject(a, test)); // [1,2,3]
console.log(a.filter(test)); // ['b']
```
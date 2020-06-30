---
title: Reversing an Array in javaScript with lodash _.reverse, and alternatives
date: 2018-10-17 12:31:00
tags: [js,lodash]
layout: post
categories: lodash
id: 306
updated: 2020-06-30 12:53:58
version: 1.9
---

For todays [lodash](https://lodash.com/) post I have come around to taking a moment to write a quick post about [\_.reverse](https://lodash.com/docs/4.17.10#reverse). Lodash is a great project, but many of the methods are pretty much just reverences to native methods, and \_.reverse is an example of one of these. Also the native array method on which \_.reverse is based has excellent backward compatibility, as the method will work on browsers as old as IE 5.5. 

So then \_.reverse is not one of those lodash methods that help support a case that lodash acts as a safety net of sorts when it comes to the question of supporting older browsers. At least it is worth saying that the lodash reverse method is not the best example of safely net types methods in lodash. Never the less in this post I will be writing about \_.reverse and the native [Array.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) methods as a means to reverse the order of an array in javaScript, and also cover some any and all related topics that might pop up in the process of doing so.

<!-- more -->

## 1 - What to know

This is a post on the \_.reverse method in lodash that can be used to reverse the order of an array in javaScript, as well as other related topics. This is not a getting started post with lodash, or javaScript in general, and I assume that you have at least some background with these topics.

## 2 - Basic example of \_.reverse and Array.reverse

So for a basic example of \_.reverse I just have a quick code example in which I am just reversing the array by passing the array to \_.reverse.

```js
let arr = [1,2,3,4];
let arr2 = _.reverse(arr);

console.log(arr); // [ 4, 3, 2, 1 ]
console.log(arr2); // [ 4, 3, 2, 1 ]
```

The native Array.reverse works by just calling it off the instance of Array.

```js
let arr = [1,2,3,4];
 
let arr2 = arr.reverse();
 
console.log(arr); // [ 4, 3, 2, 1 ]
console.log(arr2); // [ 4, 3, 2, 1 ]
```

That is all there is to it, not must to write about with this one. However there is the matter that \_.reverse is a method that will not return a new array, but mutate the existing one that is passed to it. In most cases this does not present a problem, unless for some reason it does, in which case there will be a need to clone the array first, or write a custom reverse method.

## 3 - Using _.clone to clone the array before reversing

So if lodash is part of the stack then there is or course methods like [\_.clone](/2017/10/02/lodash_clone/), [\_.cloneDeep](/2017/11/13/lodash_clonedeep/), [\_.create](/2018/09/27/lodash_create/), and so forth to work with that can be used to make both shallow, and deep clones of objects including arrays.

```js
let arr = [1,2,3,4];
let arr2 = _.reverse(_.clone(arr));
 
console.log(arr); // [ 1, 2, 3, 4 ]
console.log(arr2); // [ 4, 3, 2, 1 ]
```

So if lodash is there to work with, then it is no problem at all to address the mangle rather than create new nature of \_.reverse. If you are going vanilla js style though there are some quick solutions that can help as well.

## 4 - reversing without managing with plain old javaScript

### 4.1 - Writing a method

Its not like writing an reverse method is that hard if it seems like that is what just needs to happen

```js
let reverse = function (arr) {
    let newArr = [],
    i = arr.length;
    while (i--) {
        newArr.push(arr[i]);
    }
    return newArr;
};
 
console.log(reverse([1,2,3,4])); // [4,3,2,1]
```

A solution like this would work on a wide range of platforms, but if you do not care that much about older browsers there are a number of methods than can be used to clone an array before reversing it.

### 4.2 - Array.from

The native Array.from can be used to quickly create a new array from an array.

```js
let arr = [1,2,3,4];
console.log( Array.from(arr).reverse()); // [ 4, 3, 2, 1 ]
console.log(arr); // [ 1, 2, 3, 4 ]
```

## 5 - Conclusion

So then \_.reverse in lodash is one of those methods in lodash that are there pretty much just for the sake of consistency, and they do not do much of anything differently from what is available in javaScript by itself. Of course this is not the case with all lodash methods, and if methods like this really bother you lodash methods can be quickly installed on a per method basis.

---
title: Creating an array of numbers with _.range in lodash
date: 2018-10-02 20:47:00
tags: [js,lodash]
layout: post
categories: lodash
id: 295
updated: 2021-10-20 13:21:17
version: 1.40
---

Sometimes when working on a javaScript project there is a need to create a range of numbers in an array, with [lodash](https://lodash.com/) there is the [\_.range](https://lodash.com/docs/4.17.10#range) method than can be used to quickly make a range of numbers. The method is fairly easy to use so this should be be quick when it comes to just using the single lodash method. However there is also the general idea of not using lodash anymore as there are often native javaScript solutions for doing many of these tasks actually. So on top of going over a few quick examples of the lodash rage method I will also be looking into some additional examples that make use of just native javaScript by itself.

<!-- more -->

## 1 - What to know first

This is a post on the \_.range method in lodash that can be used to quickly create an array that contains a range of numbers. This is also something that is not that hard to do with plain old vanilla js as well, so I will also be looking at some plain old javaScript solutions for creating number ranges. This is not a getting started post with lodash, or [javaScript in general](/2018/11/27/js-getting-started/), so I hope you have at least some background with those topics before continuing.

### 1.1 - The source code examples here are on github

I have the source code examples for this post on my [test lodash github repository](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_range). This is where I also store many of my other lodash source code examples for my various other posts on lodash, and also to some extent vanilla javaScript actually.

## 2 - Creating an range of numbers using lodash

So this is very much a post on lodash, at least first and foremost anyway. So in this section I will be going over a few basic examples of the lodash range method. In this section I will also be going over other options when it comes to using lodash in general when it comes to other ways to make a range of numbers using lodash. Later in this post I will then be getting into some alternatives that involve just using native javaScript alone.

### 2.1 - Basic lodash range example

There is not much to write about when it come to using \_.range, just call the method, and pass a count of the number of numbers that you need in the array if you just want a range of numbers from zero upwards then just one argument will work just fine like so.

```js
let nums = _.range(10);
console.log(nums); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

Most of the time when I need an array like this this is all I need to do. However there are some additional arguments for the lodash range method. Also there are some limitations with the range method that can still be addressed with other lodash methods. So with that said lets look at a few more basic examples of making a range of numbers with lodash methods.

### 2.2 - Start and end values

There may come a time now and then where I will want a range that will start at a number other then that of zero. Te good news with this is that this can be done with the lodash range method by using two rather than just one arguments. So then a range between a start and end value can be done by passing the starting number first, and then the ending number.

```js
let nums = _.range(5,10);
console.log(nums); // [5,6,7,8,9]
```

This works by a start and end value, rather than a start value and a count or size of elements from that start location. So that is one little detail where I might want some other kind of method for this sort of thing. However maybe a more important detail is being able to set a step or delta value other than one. This two can be done with the range method, but only in the from of a number value rather tan a function that can be used to create such a value. So the rest of the examples of this section will have to do with this, with just the lodash range method as well as with other lodash method that there are to work with.

### 2.3 - Setting a step value

So then it is also possible to use three arguments when calling the lodash range method. When three arguments are used the first is the start value, the second is the end value, and the third argument is the step rate. It should go without saying that the default steeping value is one, so when using this it would make sense to use a higher, or lower value. When using a negative number that will result in what one would expect when it comes to counting backwards.

```js
let nums = _.range(100,200,20);
console.log(nums); //  [ 100, 120, 140, 160, 180 ]
```

So that is all there is to when when it comes to the lodash range method. However it is true that this is not one of the most compelling methods in lodash that help support a case for its continued use. There are of course a number of ways to get a similar result using other lodash methods, as well as native javaScript so lets look at some other ways to create a range of numbers with javaScript.

### 2.4 - Using \_.map to create an array of sequential numbers

So a solution for this could be done with [lodash \_.map](/2018/02/02/lodash_map/) or the native [array map method](/2020/06/16/js-array-map/) as well by creating an array that has a length that is the desired range, and then using the index argument that is given to the callback to set the numbers.

```js
let nums = _.map(new Array(10), (el, i) => i);
console.log(nums); // [0,1,2,3
```

However if you aim to use the native Array.map it will not call the function for elements that do not have values, so a solution like this will not work with the native Array.map unless the array is filled before hand some how.

### 2.5 - Custom map example

Using map might prove to be a better option in some cases. That is that for the most part the range method will work fine, but now and then I might need to work something else out when it comes to the stepping, or I might want to give a size argument rather than an end value. So in this section I am using the lodash map method once again to make a custom method for creating a range of numbers.

```js
const myRange = (start, size, step) => {
    let arr = new Array(size);
    step = step === undefined ? 1 : step;
    return _.map(arr, (el, i) => {
        let d = step;
        if (typeof step === 'function') {
            d = step(i, start, size);
        }
        return start + i * d;
    });
};
 
console.log(myRange(0, 10));
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 
console.log(myRange(5, 15, 5));
// [ 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 ]
 
console.log(_.range(5, 15, 5));
// [5, 10]
 
// I can still get a similar result to _.range if I just
// adjust the arguments to size, rather than a stop value
console.log(myRange(5, 2, 5));
// [5, 10]
 
// custom stepping
console.log(myRange(0, 5, (i) => Math.pow(2, i)));
// [ 0, 2, 8, 24, 64 ]
```

This might not be the best example, but the basic idea is there. Using the lodash map method, or some native counterpart allows for me to define what the expression is to create the numbers. It might prove to be more complex, but what the situation calls for it some times I just have to do something like this. However doing something like this also makes me question why I should bother with lodash, it would seem that there are times where what i really need to do is create some kind of custom utility library with methods that I am actually gong to use.

## 3 - Reversing the order of the elements

One thing that might come up is the idea of reversing the order of the elements. That is doing more or less the same thing my make it so the first element is the last number in the range. When it comes to this there is a method for this purpose itself actually as well as other lodash methods for doing this sort of task in general.

### 3.1 - The lodash range right method

One way to do this would be to use the range right lodash method which works just like lodash range only it will return a reversed order.

```js
let nums = _.rangeRight(0, 10, 1);
console.log(nums);
//[ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]
```

There is also the question of this method really being needed in lodash or not. After all there are methods that can be used to reverse the order.

### 3.2 - The lodash reverse method with the regukar ranmge method

The range right method is one of the methods in lodash that is not all that necessary. One reason why is that once can just use the regular lodash range method and just reverse the order of the elements. There is bolth a [lodash reverse method](/2018/10/17/lodash_reverse/), as well as a native array method that can be used to do this.

```js
let nums = _.reverse(_.range(10));
console.log(nums);
//[ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]
```

## 4 - Vanilla js range method examples

Using lodash is something that seems to be falling out of fashion. I do understand many of the reasons why this is, and many of them are good reasons. So although this is a lodash post in this section I will be going over some range method examples that make use of just core javaScript by itself. There are a number of ways to go about making this kind of method, using jus core javaScript features. So hopefully reading over this will help you to get a better idea of what there is to work with when it comes to javaScript alone.

### 4.1 - Using a while loop

Yes it is not to hard at all to make a vanilla js replacement for the lodash \_.range method. For this example I quickly worked out a range method that makes use of a while loop. In the body of the function I just need to create a blank empty array, and then just push numbers into the array in the body of the while loop.

```js
var range = function (start, end, step) {
    let arr = [],
    len = 0;
    step = step === undefined ? 1 : step;
    if (arguments.length === 1) {
        len = start;
        start = 0;
        end = start;
    } else {
        start = start === undefined ? 1 : start;
        end = end === undefined ? 1 : end;
        len = end - start;
    }
    var i = 0;
    while (i < len) {
        arr.push(start + i * step);
        i += 1;
    }
    return arr;
};
console.log( range(10) ); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log( range(10,15) ); // [ 10, 11, 12, 13, 14 ]
console.log( range(8, 16, 2) ); // [ 8, 10, 12, 14, 16, 18, 20, 22 ]
```

Still making a simple method like this takes a little time, and if it is there in lodash all ready, and lodash is part of the projects stack, then there is no need to bother.

### 4.2 - Using the native array map and fill method

So then there is also using the native array map method over the lodash map method as yet another way to make a range. One drawback over the native array map method is that it will skip over empty elements. So one way to go about addressing this would be to use the [array fill method](/2020/04/23/js-array-fill/) as a way to just make the elements not empty. Then the array map method will work with the resulting array returned by the array fill method.

```js
var range = function (start, end, step) {
    var len = start;
    if (end != undefined) {
        len = Math.floor(Math.abs(start - end) / step);
    }
    step = step === undefined ? 1 : step;
    return new Array(len).fill(0).map(function (el, i) {
        return start + i * step;
    });
};
console.log(range(10)); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 
console.log(range(-2, 10, 2));
```

## 5 - Conclusion

That is it for today, just wanted to do a quick post on a simple topic like this when it comes to the subject of creating an array of numbers that are with a range using lodash and native javaScript. lodash does have a lot of little methods like this that are not that complex, but do help save me the time of making a solution from scratch, or hunting something down at stack overflow. There is also a lot to be said as to the question if lodash is something that we should still even be bothering with when starting a new project also these days. The lodash range method is not one of the best methods to help support a case to continue using lodash, but maybe getting into all of that is a mater for another post.

I do get around to editing my content on lodash now and then. So at some point in the future I might get around to expanding this post more. However there might only be so much more to write about when it comes to this topic actually. So maybe the only thing to do at this post would be to make a few simple use case examples. When there is not much more to write about when it comes to the method itself, as well as the native counterparts, some times that is all that there is to do when it come to moving forward more.
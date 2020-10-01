---
title: JS Array map method examples
date: 2020-06-16 15:24:00
tags: [js]
layout: post
categories: js
id: 667
updated: 2020-10-01 15:32:00
version: 1.10
---

It is a common task in javaScript projects to need to loop over the full contents of an array, and create some sort of product for each element in that array. There are methods like the Array foreach method that can be used to do this sort of thing, along with other features in javaScript such as just doing such things with loops and the array bracket syntax. However there is an array prototype method that each javaScript developer should be aware of called [array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

I have wrote a post a long while back on the [lodash map method](/2018/02/02/lodash_map/) that works more or less the same way as array map only it will work on most objects in general rather than just arrays. That of course is yet another option to be aware of if you are working on a project where lodash is part of the stack. However in this post I will be focusing more so on the native array map prototype method, as well as little tips and tricks that have to do with getting array map to work with objects in general as well as other native javaScriot examples for doing the same thing without array map.

<!-- more -->

## 1 - Array map basic example

The basic idea of the array map method is to call the map prototype method off of an instance of an array, and then pass a function as the first argument to the method. This method that is passed to array map will then be used to return a new value for every element in the array that it was called off of. The value for each element is passed as an argument for the method that is passed when calling array map, so the current value for each element can be used in the expressions and statements that are used to furnish a new value for each element in the array. Also it is important to note that it is indeed a new array that is returned, and the array that array map is called off of is not mutated in place. Many array prototype methods will mutate in place such as array sort, but this is not the case with array map, and certain other array prototype methods.

If you are still a little confused then maybe it would be best to just start working out a few simple examples. One good starting point would be just having a simple array of number primitives and then use array map to create a new array of powers using the numbers in the array as exponent value for the Math pow method.

```js
var nums = [1, 2, 3];
 
var pows = nums.map(function (n) {
        return Math.pow(2, n);
    });
 
// creates a new array of pows
console.log(pows); // [2,4,8]
// does not mutate the source array
console.log(nums); // [1,2,3]
```


## 2 - Doing the same thing with Array forEach, or while loops

If you are new to javaScript you might all ready be doing this sort of thing with other tools in the toolbox sort of speak. When it comes to the very basic example that I have covered so far it is not to hard to do the same thing with the array foreach method, or some kind of loop such as a while loop. The use of array foreach comes up all the time in from discussions and the like, and often more experienced javaScript developers shun the use of the array forEach method. I try to nt be so judgmental about the use of it, and I often fine myself using it on occasion still, but I am of course aware of the other options to use such as but certainly not limited to array map.

So the same thing that can be done with the array map method can be done with the array foreach method, and createing a new array, by dong something like this.

```js
var nums = [1, 2, 3];
 
var pows = [];
nums.forEach(function (n) {
    pows.push(Math.pow(2, n));
});
 
// also creates a new array of pows
console.log(pows); // [2,4,8]
// also does not mutate the source array
console.log(nums); // [1,2,3]
```

A while loop could also be used of course, or just about any other kind of loop for that matter to reproduce a similar effect to what can be obtained by using array map.

```js
var nums = [1, 2, 3];

var pows = [],
len = nums.length,
i = 0;
while (i < len) {
    pows.push(Math.pow(2, nums[i]));
    i += 1;
}
 
// also creates a new array of pows
console.log(pows); // [2,4,8]
// also does not mutate the source array
console.log(nums); // [1,2,3]
```

So it is not like the array map method is the only way to go about doing something like this. In fact in many situations I might prefer to go with a while loop because of the greater degree of flexibility that can be achieved. In addition I am not much of a performance nut, but from what I gathered while loops do tend to preform a little faster also for what that is worth. What I try to avoid is getting fixed on just one way to go about doing something, and thinking that this one way of doing it is the only true way of doing it. I see that all the time and I do not care to add to it. It is not to say that these ways of creating a new array based off of values from another array do not have there drawbacks compared to array map still so lets look at some more examples.

## 3 - forEach and chaining compared to array map.

So although the array foreach method can be used to do the same thing as array map by just creating a new array with the array bracket syntax and pushing in new values. There is one draw back that comes to mind right away when it comes to chaining. The problem can be resolved by bringing an [IIFE](/2020/02/04/js-iife/) into the mix, but I have to admit that it is making the code a little more complex compared to just using array map.

```js
var nums = [1, 2, 3];
 
// in order to chain you have to do something like ths
var sum = (function () {
    var pows = [];
    nums.forEach(function (n) {
        pows.push(Math.pow(2, n));
    });
    return pows;
}
    ()).reduce(function (acc, n) {
    return acc + n;
});
 
console.log(sum); // 14
 
// although that will work it is a little
// more complex than just using array map
var sum = nums.map(function (n) {
        return Math.pow(2, n)
    }).reduce(function (acc, n) {
        return acc + n;
    });
 
console.log(sum); // 14
```

It might make sense to do something like this with a while loop though if I need to create a new array of values from a source array, but not all values in the array maybe. However the use of array forEach is not really such a great choice, because on one hand I can just use array map that is a little more appropriate here, and on the other hand I can use a while loop for better flexibility. However array forEach is is not really setting itself apart from the other two options, so often I use one of those over forEach.

## 4 - Using array map with a plain old object with the help of the Object values static method

So one draw back of the array map prototype method might be that is it an array prototype method so it can not be used out of the box with objects in general. This might be one of the talking points as to why the lodash map method has a little something more goign on for itself compared to its native counterpart. However it is not to hard to overcome this issue by way of taking advantage of some more native methods to work with when it comes to just plain old javaScript by itself. If it is an array like object that you are working with than just using the function call prototype method will help to get map to work with it. When it comes to Objects in general there is the Object values and Object keys static method that can be used to create an array of values or key names from an Object.

```js
var obj = {
    a: 1,
    a1: 'foo',
    b: 2,
    b2: 'bar',
    c: 3,
    n: NaN
};
 
var sum = Object.values(obj).filter(function (el) {
        return typeof el === 'number' && String(el) != 'NaN';
    }).map(function (n) {
        return Math.pow(2, n);
    }).reduce(function (acc, n) {
        return acc + n
    });
 
console.log(sum); // 14
```

## 4 - Conclusion

So the array map method is one of several methods in the array prototype that have to do with creating an array from a source array. The array map method is a good choice if you want to created a new array from all elements in the array, but there are of course other options that a javaScript developer should be aware of, namely filter, and reduce, but also many other such as sort.
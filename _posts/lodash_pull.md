---
title: The lodash pull method and other ways to remove elements
date: 2020-03-03 12:46:00
tags: [lodash]
layout: post
categories: lodash
id: 620
updated: 2022-01-06 14:24:38
version: 1.19
---

The [lodash pull](https://lodash.com/docs/4.17.15#pull) method can be used to remove one or more values from an array using the same value zero method as a way to make comparisons. This method is a kind of convenience method in place of using [lodash remove](/2017/09/19/lodash_remove/) with the [lodash eq](/2019/12/04/lodash_eq/) methods for example which would have the same end result. There are a number of other lodash methods such as [filter](/2018/05/18/lodash_filter/) and [reduce](/2018/07/25/lodash_reduce/) that can also be used to preform similar tasks without mutating an array in place and will allow a little more flexibility in how equality is detected when it comes to using an operator or method other then that of the Same Value Zero compliant lodash eq method.

It is not to hard to do the same thing that the lodash pull method does with vanilla javaScript, that is as long as you are aware of the native methods that are used to do the same kind of task. In any case I will be going over the lodash pull methods alone with lodash remove lodash eq and vanilla javaScript methods that do the same thing. In addition to this as with my many other posts on lodash I will be taking a quick look at some vanilla javaScript examples that will also preform similar actions to that of the lodash pull method.

<!-- more -->

## 1 - lodash pull basics

In this section I will be going over some basic examples of the lodash pull method as well as other lodash and vanilla javaScript methods of interest.

### 1.1 - Basic lodash pull example

The basic idea of the lodash pull method is that I call it, pass and array as the first argument, and then one or more additional arguments that are values to remove from the array using the same value zero method that can be used by itself via the lodash eq method.

```js
let arr = [-1,5,7,-1,-1, 8, 7];
arr = _.pull(arr,-1);
console.log( arr);
// [ 5, 7, 8, 7 ]
```

### 1.2 -

```js
let source = [-1,5,7,-1,-1, 8, 7];
b = _.pull(source,-1);
// pull will mutate the source array in place
console.log( source );
// [ 5, 7, 8, 7 ]
console.log( b );
// [ 5, 7, 8, 7 ]
```

### 1.3 - Objects

```js
let source = [{i:0}, {i:1}, {i:2}];
 
// this will not work as the new value given is a whole
// new object in memory
let a = _.pull(source, {i:1});
console.log(a);
// [ { i: 0 }, { i: 1 }, { i: 2 } ]
 
// this will work because it is a reference to the same object
let b = _.pull(source, source[1]);
console.log(b);
// [ { i: 0 }, { i: 2 } ]
```



## 2 - Other lodash methods to be aware of

On top of the lodash pull method there is a number of other methods in lodash that work almost the same, but with slightly different ways that in some cases can be very significant. As I have covered in the basic section of this post the lodash pull method will mutate an array in place. In some cases I might not want to do that, but instead create a new array with elements that are not wanted not included in this new array. One way to do so the same way as that of the lodah pull method would be to use the lodash without method.

### 2.1 - lodash without and not muttaing in place

The lodash pull method is similar to that of the lodash without method only it will mutate the array in place, so the pull method is not a functional programing style method compared to the lodash without method. So if you want to remove elements in a way so that a new array is returned without mutating the give array you will want to use lodash without, or whatever vanilla javaScript alternatives do achieve a similar effect.

```js
// a source array
let source = [-1,5,7,-1,-1, 8, 7];
// creating a new array and not mutating in place by using without in place of pull
let b =  _.without(source, -1);
console.log( source );
// [ -1, 5, 7, -1, -1, 8, 7 ]
console.log( b );
// [ 5, 7, 8, 7 ]
```

### 2.2 - The lodash eq method

```js
console.log(  _.eq(NaN, NaN) ); // true ( 7.2.10 SameValueZero )
console.log( Object.is(NaN, NaN) ); // true ( 7.2.9 SameValue)
console.log(  NaN === NaN ); // false
 
// The main difference between SamveValueZero and SameValue is how
// +0 and -0 are treated
console.log( _.eq(0, -0) );      // true
console.log( Object.is(0, -0) ); // false
```

### 2.3 - Using lodash remove, and lodash eq to do the same thing and more.

The lodash remove method is another way to go about removing methods from an array with lodash, only that will give a greater deal of flexibility as I can define the logic that will be used. I could use the lodash remove combined with the lodash eq method to do the same thing as lodash pull, or I could use a completely different expression all together in the function that I pass to the lodash remove method.

```js
let arr = [-1, 5, 7, -1, -1, 8, 7];
 
// lodash \_.remove and \_.eq can be used also to do
// the same thing more or less
arr = _.remove(arr, function (el) {
        return !_.eq(el, -1);
    });
 
console.log(_.join(arr, ':'));
// 5:7:8:7
 
// remove can also be used to define any custom
// logic for removing elements
 
var arr1 = _.remove([-1, 1, -5, -7, 2, 3], function (el) {
        return !(el < 0);
    });
console.log(_.join(arr1, ':'));
// '1:2:3'
```

## 3 - A vanilla js pull to do lodash pull style pulling complete with an Object.is pony fill

Many might think that all lodash pull does is remove elements from an array with the same value as one or more given values. Yes on the surface that might seem like a very simple thing to do with plain old vanilla javaScriopt by itself. However there is more to it then just pulling values that are equal to a value. In javaScript there is the equality operator, and then there is also the identity operator. In additional to this there is also the isNaN method and the fact that it does not always given an intended result.

Making a vanilla javaScript lodash pull method is not just a question of looping over an array and splicing out elements using the equality operator. The Object.is method should be used to make the comparisons, and when it comes to that there is the question of browser support. If you want to push browser support back a great deal you are going to want to polyfill or pony fill th Object.is method and then use that in your vanilla javaScript pull method.

```js
// SameValue algorithm pony fill
var eq = function (x, y) {
    if (x === y) { // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
};
 
// vjs pull
var pull = function (arr) {
    var len = arguments.length,
    val,
    i = 1;
    if (arguments.length <= 1) {
        return arr || [];
    }
    while (i < len) {
        val = arguments[i];
        arr = arr.filter(function (el) {
                return !eq(el, val);
            });
        i += 1;
    }
    return arr;
};
 
var arr = [-1, 5, 7, -1, -1, 8, 7];
arr = pull(arr, -1);
 
console.log(arr.join(':'));
// 5:7:8:7
 
// passes the SameValue test
console.log(pull([-0, 0], 0).join(':'));
// 0
console.log(pull([NaN, 5, NaN], NaN).join(':'));
// 5
```

Here I just copied over an Object is method and turned it into a pony fill called eq that will work the same way as the lodash eq method. Now that I have that I can use it on my vanilla js pull method. I am using the array filter method but could easily use array splice or slice to make it even more robust.

There are many other ways a vanilla js pull method could be written. If you do not care about supporting older browsers at all you could just use the Object is method, and make a far more concise solution at the cost of code breaking on older platforms.

## 4 - Conclusion

So then the lodash pull method will remove elements by a given value using the same value zero standard for doing so, and will do so by mutating the array in place. The lodash without method will do more or less the same thing as the lodash pull method but it will return a new array rather than mutating an array in place.
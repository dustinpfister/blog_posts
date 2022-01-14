---
title: lodash difference method examples
date: 2019-03-27 19:55:00
tags: [js,lodash]
layout: post
categories: lodash
id: 407
updated: 2022-01-14 08:07:44
version: 1.26
---

In this post I will be writing about some [lodash difference method](https://lodash.com/docs/4.17.11#difference) that can be used to find out what values in an array are not included on one or more additional arrays. So then as the name implies, it is a way to go about extracting the difference from an array, using one or more additional arrays as a way to known what to extract.

The comparisons are made in compliance with the Same Value Zero standard that is used in methods like that of the [lodash eq](/2019/12/04/lodash_eq/) method. This method of preforming comparisons works in a very similar way to that if the strict equals operator, and the native Object.is method but with subtle differences when it comes to handing NaN and rare cases with negative zero.

There are more than one method in lodash that can be used to preform this kind of task, as well as various similar tasks. There is also what there is to work with when in comes to native javaScript by itself as well.

<!-- more -->

## 1 - lodash difference

The lodash distance method can be used to find the difference between two arrays. Just give an array as the first argument, and another as the second, and what will be returned is a new array of values that are not in second array when comparing element by element.

```js
let _ = require('lodash');

let data1 = ['foo', 'bar', 'baz'],
data2 = ['foo', 'man', 'chew'];

console.log( _.difference(data1, data2) ); // [ 'bar', 'baz' ]
console.log( _.difference(data2, data1) ); // ['man', 'chew']
```

So it goes without saying that the order of the arrays is important. Also it is not to hard to get a similar effect with just plain old javaScript by itself so this makes the lodash difference another one of those kinds of methods. Also when it comes to working on projects I can not say that I end up in a situation in which I need to do this sort of thing often. So if those things in mind lets look at some additional code example when it comes to finding the difference between two or more arrays in javaScript.

## 2 - Other lodash methods

In some cases a lodash method such as difference can help make quick work of this kind of task. It is often a nice concise way of doing so at times sure. However there are many other lodash methods that can be used as well.

### 2.1 - lodash difference with

There is also the [lodash difference with](https://lodash.com/docs/4.17.11#differenceWith) method as well on top  of the regular lodash difference method. The difference is that I can use another method to aide in making the comparisons.

```js
let data = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
],
kill = [
    [5, 6, 7, 8],
    [13, 14, 15, 16]
];
 
let result = _.differenceWith(data, kill, _.isEqual);
 
console.log(result); //[ [ 1, 2, 3, 4 ], [ 9, 10, 11, 12 ] ]
```

### 2.2 - lodash or native filter

If you are not all ready up to speed with the lodash filter method as well as the native Array filter equivalent, then maybe it would be a good idea to look into these methods.

```js
let data = [2, 4, 6, 8, 9],
kill = [4, 8];
 
let result = _.filter(data, function (n) {
        return !_.some(kill, function (kn) {
            return kn === n;
        });
    });
 
console.log(result); // [2,6,9]
 
let result_diff = _.difference(data,kill);
 
console.log(result_diff); // [2,6,9]
```

## 3 - Vanilla javaScript and getting a difference

When it comes to kicking lodash to the curb it is not to hard to accomplish these kinds of tasks with just plain native javaScript. So in this section I will be looking at some alternatives to the lodash difference method that involve just working with native javaScript by itself. These examples will then make use of core javaScript features mainly various methods in the [array prototype](/2018/12/10/js-array/), as well as another other static and prototype methods as well as the javaScritp syntax itself.

### 3.1 - Array filter, Array some, and Object is

For this example I am making use of the [Array filter](/2020/10/03/js-array-filter/), and Array some methods in the array prototype of core javaScript. When it comes to making the comparisons I am using the Object.is method that is just a little difference to that of the lodash eq method. The only difference between Object is and lodash eq is how the methods will handle negative and positive zero.

```js
let data = [2, 4, 6, 8, 9],
kill = [4, 8];
// Using Array.filter and Array.some
let result = data.filter(function (n) {
    return !kill.some(function (kn) {
        return Object.is(kn, n);
    });
});
console.log(result); // [2, 6, 9]
```

## 4 - Conclusion

So the lodash difference method is another one of those kinds of methods that make me thing that lodash is not really necessary. Do not get me wrong the library does have its redeeming qualities when it comes to the idea of having a stand alone method for doing things rather than poly filling native methods. There are many taking points about why using lodash, or something like lodash in a project is a good idea. I just can nit say that the lodash difference method is one of the most compelling methods in the collection of methods. There is really just a hand full here and there that I actually find myself using, and even then I could just use a custom tailored utility library that is in tune with the project itself.
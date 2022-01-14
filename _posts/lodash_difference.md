---
title: lodash difference method examples
date: 2019-03-27 19:55:00
tags: [js,lodash]
layout: post
categories: lodash
id: 407
updated: 2022-01-14 07:17:51
version: 1.15
---

In this post I will be writing about some [lodash difference method](https://lodash.com/docs/4.17.11#difference) examples. In lodash the difference method can be used to create an array of values that are not present in the other given arrays. So in other words it is a way to go about finding unique values that are in two or more given arrays.

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

## 2 - lodash difference with

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

## 3 - lodash difference alternatives

There is more than one way to get something like this done. In some cases a lodash method such as difference can help make quick work of this kind of task. It is often a nice concise way of doing so at times sure. However there are many other lodash methods that can be used as well. Also when it comes to kicking lodash to the curb it is not to hard to accomplish these kinds of tasks with just plain native javaScript as well. So in this section I will be looking at some alternatives to the lodash difference method.

### 3.1 - lodash or native filter

However if you are not all ready up to speed with the lodash filter method as well as the native Array.filter equivalent, then maybe it would be a good idea to look into

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

## 4 - Conclusion

So the lodash difference method is another one of those kinds of methods that make me thing that lodash is not really necessary. Do not get me wrong the library does have its redeeming qualities when it comes to the idea of having a stand alone method for doing things rather than poly filling native methods. There are many taking points about why using lodash, or something like lodash in a project is a good idea. I just can nit say that the lodash difference method is one of the most compelling methods in the collection of methods. There is really just a hand full here and there that I actually find myself using, and even then I could just use a custom tailored utility library that is in tune with the project itself.
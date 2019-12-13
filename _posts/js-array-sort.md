---
title: The Array sort method  in javaScript
date: 2019-12-02 21:40:00
tags: [js]
layout: post
categories: js
id: 574
updated: 2019-12-13 10:03:45
version: 1.11
---

In native javaScript there is the [array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method in the array prototype object. This method can be used to sort an array in place, but will not create and return a new sorted array, which is one reason why you might want to use an alternative such as the [lodash \_.sortBy](/2018/07/06/lodash_sortby/) collection method.
<!-- more -->

## 1 - Array sort basic examples

In this section I will be going over a few quick basic examples of the array sort prototype method. In the event that I am working with an array of numbers or strings, and I want to sort by value of alphabetically I can just call the array sort method off of the array instance and be done with it. However in most real cases I need to give a sort method as the first argument to the array sort method.

### 1.1 - Arrays of primitives and array sort without a function

If you are just working with a simple array of numbers just calling the array sort method of the array instance will sort the array of numbers by value from lowest to highest.

```js
var arr = [7,4,2,5,8,6,3,1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

An Array of strings will be sorted by alphabetic order.

```js
var arr = ['c','b','a','d'];
arr.sort();
console.log(arr);
// [ 'a', 'b', 'c', 'd']
```

If array sort will work okay juts like this the that is all there is to it then. However if mutating an array in place is a problem, of if I need to add some custom functionality for sorting then I am going to need to work something else out so lets look at some more examples of array sort.

### 1.2 - Array sort and objects

If I am working working with an array of objects, or for whatever the reason I want to define some logic for sorting I am going to want to give the array sort method a sorting function. This function Will be given two arguments that can be used to compare two elements in the array. The function Should return a number value that is zero if the position is not to change negative if it is to go down towards the zero index value, and positive if it is to go up in index value.

```js
var arr = [
    {hp: 0}, 
    {hp: 57}, 
    {hp: 50},
    {hp: 0},
    {hp: 7}
];
 
arr.sort(function (a, b) {
    if (a.hp > b.hp) {
        return -1;
    }
    if (a.hp < b.hp) {
        return 1;
    }
    return 0;
});
 
console.log(arr.map((e) => e.hp).join(':'));
// 57:50:7:0:0
```

## 2 - Using Array sort to make a sort method like the lodash sortBy method

In lodash there is the sortBy method that works a little differently from the native javaScropt array sort prototype method. When using that method I pass the array as an argument rather than using a prototype method, which is more in line with functional programing.In addition I then pass a function as the second argument when it comes to defining some custom logic for how to go about sorting the array just, just like with array sort, but I just return a number value from zero upwards rather than a number value that is a delta value for an array index value. Also the lodash sortBy returns a new array, and does not mutate the array in place.

In many respects I like the lodash sortBy method more so than the native array sort prototype method. However if you do not want to add lodash to the stack of a project, it is not to hard to create that kind of functionality, if that is all you care about. 

In this section I will be going over a vanilla js sort method that works like the lodash sortby method, it uses the array sort prototype method, but does so on a cloned copy of the array, and also allows for me to define my sort methods in a similar way my creating an abstraction of sorts for that.

### 2.1 - The sort method

Here I have the sort method that I worked out for this section. I am using JSON methods as a crude yet effective way to clone most objects. This results in a copy of the array, I then call the array sort method off of that copy, and call the sorter method that is given in the body of a function that I use with the array prototype method.

```js
var sort = function (arr, sorter, reverseWeight) {
    // return empty array if not array is given
    if (!arr) {
        return [];
    }
    // default sorter
    sorter = sorter || function (el) {
        if (typeof el === 'number' && el.toString() != 'NaN') {
            return el;
        }
        if (typeof el === 'string') {
            return parseInt(el, 16);
        }
        return 0;
    };
    reverseWeight = reverseWeight === undefined ? false : reverseWeight;
    // clone the array by some means
    var copy = JSON.parse(JSON.stringify(arr));
    // using array sort off of the copy of the array
    // so that I do not mutate the argument array
    copy.sort(function (a, b) {
        // use the sorter to get number values for two
        // elements that are being compared
        var c = sorter(a),
        d = sorter(b);
        // return -1, 1, or zero to move down the index
        // move it up or do nothing
        if (c > d) {
            return reverseWeight ? 1 : -1;
        }
        if (c < d) {
            return reverseWeight ? -1 : 1;
        }
        return 0;
    });
    return copy;
};
```

### 2.2 - Sorting a simple array of numbers



```js
// numbers
var nums = [3, 5, 6, 1, 7, 9, 3];
var numsSorted = sort(nums);
console.log(nums.join('-'));
console.log(numsSorted.join('-'));
// 3-5-6-1-7-9-3
// 9-7-6-5-3-3-1
```

### 2.3 - Sorting objects

```js
var posts = [{
        wordCount: 500,
        time: 330,
        comentCount: 7
    }, {
        wordCount: 1800,
        time: 1000,
        comentCount: 0
    }, {
        wordCount: 750,
        time: 0,
        comentCount: 3
    }, ];
var byWordCount = sort(posts, function (post) {
        return post.wordCount;
    });
console.log(byWordCount);
// [ { wordCount: 1800, time: 1000, comentCount: 0 },
//   { wordCount: 750, time: 0, comentCount: 3 },
//   { wordCount: 500, time: 330, comentCount: 7 } ]
var byFresh = sort(posts, function (post) {
        return post.time;
    }, true);
console.log(byFresh);
// [ { wordCount: 750, time: 0, comentCount: 3 },
//   { wordCount: 500, time: 330, comentCount: 7 },
//   { wordCount: 1800, time: 1000, comentCount: 0 } ]
```
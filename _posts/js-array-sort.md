---
title: The Array sort method  in javaScript
date: 2019-12-02 21:40:00
tags: [js]
layout: post
categories: js
id: 574
updated: 2021-07-23 14:26:41
version: 1.25
---

In native javaScript there is the [array sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method in the [array](/2018/12/10/js-array/) prototype object, that can be used to sort the elements in place.  This fact that the array sort mutates an array in place might be one reason why you might want to use an alternative user space method to the array sort method, such as the [lodash \_.sortBy](/2018/07/06/lodash_sortby/) method in lodash. This method is like array sort, but will work out of the box with object collections in general beyond that of arrays. In addition it will not mutate the object in place like array sort does, but create and return a new array.

However in this post I will be sticking to plain old native javaScript by itself, and looking into just working with what there is to work with in the array prototype, and with other native javaScript features without bothering with a user space library of some kind. When it comes to the problem of the array sort method mutating the array in place I can just make use of one of the many options for [copying an array](/2020/09/03/js-array-copy) to make a shallow or deep clone of a source array first if I do not want to mutate the array in place. After that I just need to learn how to create sort methods for the array sort method that might change a little from one situation to the next.

<!-- more -->

## 1 - Array sort basic examples

In this section I will be going over a few quick basic examples of the array sort prototype method. In the event that I am working with an array of numbers or strings, and I want to sort by value of alphabetically I can just call the array sort method off of the array instance and be done with it. However in most real cases I need to give a sort method as the first argument to the array sort method. So this section Will be just a quick example of using array sort to just sort an array, of numbers, but also a simple example that uses a sort method. 

So if you all ready know the basics of the array sort method, then you might want to skip over this section to get to the good stuff that might be something new to you.

### 1.1 - Arrays of primitives and array sort without a function

If you are just working with a simple array of numbers just calling the array sort method of the array instance will sort the array of numbers by value from lowest to highest. So in other words the built in sorting method will work just fine in that case. So just call the array sort method off of the array of numbers and you are done.

```js
var arr = [7,4,2,5,8,6,3,1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

When it comes to an Array of strings that will be sorted by way of alphabetic order when it comes to built in sorting.

```js
var arr = ['c','b','a','d'];
arr.sort();
console.log(arr);
// [ 'a', 'b', 'c', 'd']
```

If array sort will work okay just like this then that is all there is to it then. However if mutating an array in place is a problem, of if I need to add some custom functionality for sorting, then I am going to need to work something else out so lets look at some more examples of array sort that make use of a custom sorting method.

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

So the sort method works as expected when it comes to a simple array of numbers. In addition the use of the method does not mutate the original array that I give it as the first argument.

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

When using the sort method with an array of objects I can feed it functions that will return a number value from zero upwards, and that value is what will be used to change index value. I like this better then the way that array sort works by itself.

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

## 3 - create an array of weight objects

There is the issue of not wanting to mutate a source array in place, and there is also working out a standard way to go about souring a collection of something. One thing that comes to mind is to come up with a standard way of sorting a collection of objects, but sorting a new array of objects created from the source array with something like the [array map](/2020/06/16/js-array-map/) method. This array of objects would just be a an object for each element in the source array that contains an index value for the element in the source array, and a weight value for that element. It is then this array of weight objects that is then sorted and not the original source array, and the same sort method can be used for each one.

```js
var posts = [
   { wc: 1800, bl: 0, date: '2017-10-02'},
   { wc: 1017, bl: 5, date: '2021-03-17'},
   { wc: 1350, bl: 3, date: '2020-08-30'}
];
 
// create weight objects array
var weightObjects = posts.map(function(post, index){
    var wcScore = 1000 * ( post.wc >= 1800 ? 1 : post.wc / 1800 ),
    blScore = 1000 * ( post.bl >= 5 ? 1 : post.bl / 5 );
    return {
        weight: wcScore + blScore,
        index: index
    };
});
console.log(weightObjects);
/*
[
  { weight: 1000, index: 0 },
  { weight: 1565, index: 1 },
  { weight: 1350, index: 2 }
]
*/
 
// sort the weight objects by the weight property
weightObjects.sort(function(a, b){
    if(a.weight > b.weight){
        return -1;
    }
    if(a.weight < b.weight){
        return 1;
    }
    return 0;
});
 
console.log(weightObjects);
/*
[
  { weight: 1565, index: 1 },
  { weight: 1350, index: 2 },
  { weight: 1000, index: 0 }
]
*/
 
// use the index prop, or attach objects references to get the best post
console.log( posts[weightObjects[0].index] );
```

## 4 - Conclusion

So the array sort prototype method will work okay when one knows how to get around its shortcomings. The main draw back is that it will mutate the array in place, but aside from that it will work okay just fine. There are ways of getting around the mutation in place thing anyway. For example often I might want to do something with array map before sorting, and that will of course return a new array.

The main appeal of the array sort method is of course the fact that it is there to work with in javaScript by itself without having to introduce an additional external library which of course would be the case with the lodash \_.sortBy method.

Working out some simple examples of array sort is one thing, but in order to really have fun, or doing anything truly worth while of course there is taking a moment to create some kind of game, or project of some kind that would make use of array sort. When it comes to my collection of [javaScript examples](/2021/04/02/js-javascript-example/) thus far I have [one example where I am making use of array sort](/2020/08/31/js-javascript-example-sort-planets/) to sort an array of planets in an example that is serving as a basic starting point for something that might become a full game some day. However when it comes to seeing a collection of full canvas examples there is also my collection of [canvas examples](/2020/03/23/canvas-example/) that might also be worth checking out.


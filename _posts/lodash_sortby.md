---
title: The lodash sort by method
date: 2018-07-06 20:56:00
tags: [js,mongodb]
layout: post
categories: lodash
id: 223
updated: 2021-12-28 11:21:27
version: 1.24
---

So I have come to find that I like the [lodash](https://lodash.com/) [\_.sortBy](https://lodash.com/docs/4.17.10#sortBy) method more so than the native [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method for a few various reasons. I do still use it of course when it comes to working with a project where lodash is not part of the stack, it is just that the method works in a way that I find more natural when it comes to the return value and arguments used for the function that is passed to the sort by method. I will be elaborating what I mean by that in this post. 

The \_.sortBy method is another option compared to the \_.find method also, the \_.find method can be used to find just one item in a collection, while the \_.sortBy method can be used to sort the whole collection, I can then take just the first element, or the top three. So lets take a look at some examples of sorting with lodash, and native javaScript as well.

<!-- more -->

## 1 - lodash sort by method and what to know first

This is one of my many posts on lodash methods, this one is on the \_.sortBy method that works like the sort array prototype method in native javaScript, but works a little differently. Here I will be writing about that method a bit, as well as the corresponding Array.sort when it comes to just working with javaScript by itself. This is not a getting started post on lodash, or javaScript in general.

### 1.1 - Basic example of lodash \_.sortBy

For a basic example of \_.sortBy why not start off with just using it to sort an array of numbers. It does not get more basic than that does it. To sort an array of numbers by numerical value, I just have to give the array of numbers to \_.sortBy. No need to give and method as the second argument.

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
console.log(_.sortBy(nums));
//[ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
```

This is all fine and good for a very basic example of the lodash sort by method, but what if I want to set some kind of condition for sorting? A function can of course be given as a second argument, so lets look at another basic example of that.

### 1.2 - Sort an array of numbers by an expression

I can give a method as a second argument that can be used to define an expression for sorting rather than using the default sort behaviors that might not always work the way I want it to. Inside the body of the function that I give to sort by the first argument will be a given array element value, or the value of a named object key in the event of a named collection object of some kind. When it comes to the return value in which situations the return value should be a number and the lower the number is the closer to an index value of zero the value will be in the resulting array returned by the lodash sortBy method.

```js
// using sortBy method by giving a function with
// custom sort logic
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
let a = _.sortBy(nums, function (n) {
    if (n > 0) {
        return Math.abs(n) * -1;
    }
    return Math.abs(n);
});
console.log(a);
// [ 158, 52, 42, 27, 7, 6, 5, 3, -1, -5 ]
 
// compare to just using _.sortBy with the 
// source array itself, also the sortBy method
// will not mutate the source array in place
console.log(_.sortBy(nums));
// [ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
console.log(nums);
// [ 5, 42, -5, 7, 6, 3, 52, 27, 158, -1 ]
```

That is all fine and good, but in many projects I am working with an array of objects. So lets look at some more basic examples.

### 1.3 - Arrays of Objects and lodash sortby

When it comes to an array of objects a property name can be given as a second argument to a number value that will be used t sort the collection. If that does not cut it a function can be given to create and return a numbered value that will be used to sort the collection.

```js
let arr = [{x:20,y:20}, {x:23,y:32},{x:100,y:6}];
 
// strings can be used to set a property to a number value
let sortX = _.sortBy(arr, 'x'),
sortY = _.sortBy(arr, 'y'),
 
// or a function can be given to define some logic
distance = _.sortBy(arr, (pt)=>{
    return Math.sqrt( Math.pow(pt.x - 70, 2) + Math.pow(pt.y -70, 2) );
});
 
console.log(sortX.pop().x); // 100
console.log(sortY.pop().y); // 32
console.log(distance.pop().x); // 20
```

## 2 - \_.sortBy and \_.find

When it comes to finding an item in a collection there is finding a single item, and then there is sorting the collection and taking the top or bottom item of that collection. The lodash \_.find method will work okay in most situations depending on the nature of the condition that is used. In some cases it would be better to sort the collection by a condition, and then take the first element.

For example say I have a bunch of blog posts and I want to find the post in my collection of posts that has the highest word count. Using the lodash \_.find method in that case, would not work out so well because the nature of condition must be applied to all items in the collection. It is a situation in which there is a value that is unique to just one item, but that value is not known it must be found first in order to know what I am looking for. So a better alternative would be to sort.

```js
let posts = [{
        wordCount: 240
    }, {
        wordCount: 300
    }, {
        wordCount: 1600
    }, {
        wordCount: 800
    }, {
        wordCount: 1800
    }, {
        wordCount: 550
    }
];
 
// a common iterator that will be
// used with _.find and _.sortBy
let iterator = (a) => {
    return a.wordCount;
};
 
// find will just return the first item that
// will return true for the iterator it will
// not sort
let findPost = _.find(posts, iterator);
console.log(findPost.wordCount); // 240
 
// Sort by will actually sort all elements
// that meet the condition, and leave
// those that do not
topPosts = _.sortBy(posts, iterator);
console.log(topPosts.pop().wordCount); // 1800
console.log(topPosts.pop().wordCount); // 1600
console.log(topPosts.pop().wordCount); // 800
```

## 3 - The vanilla javaScript array sort by method

I am seeing a lot of content on the open web that has to do with all the various reasons as to why it is that one should not use lodash. Some of them are good points, others make me thing that not everything is seeing the full value of what lodash about. In any case I have made a habit of making sure that I have at least one section in my posts on lodash that has to do with the topic of not using lodash. With that said when it comes to not using lodash, and therefore the lodash sort by method one will be forced to use other options that there are to work with when just using javaScript by itself. So then the first native javaScript feature that comes to mind when it comes to sorting would be the [array sort method](/2019/12/02/js-array-sort/) of the [array prototype object](/2018/12/10/ja-array/).

### 3.1 - Simple array of numbers example

```js
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
let a = nums.sort();
// by default the sort method will not sort values by number
// value
console.log(a);
// [ -1, -5, 158, 27, 3, 42, 5, 52, 6, 7 ]
// this will mutate in place
console.log(nums);
// [ -1, -5, 158, 27, 3, 42, 5, 52, 6, 7 ]
```

### 3.2 - Using a function example

```js
// using array sort with a function
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
let a = nums.sort(function (a, b) {
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    return 0;
});
console.log(a);
// [ 158, 52, 42, 27, 7, 6, 5, 3, -1, -5 ]
 
// compared to sort by itself
console.log(nums.sort());
// [ -1, -5, 158, 27, 3, 42, 5, 52, 6, 7 ]
console.log(nums);
// [ -1, -5, 158, 27, 3, 42, 5, 52, 6, 7 ]
```

## 4 - Conclusion

That will be it for now when it comes to the lodash sort by method as well as various other lodash features that I have covered in this content. If you enjoyed this post you might want to check out my [main post on lodash](/2019/02/15/lodash) in general, or maybe one of my [many other lodash posts](/categories/lodash/).


---
title: The lodash _.sortBy method
date: 2018-07-06 20:56:00
tags: [js,mongodb]
layout: post
categories: lodash
id: 223
updated: 2019-11-07 03:37:21
version: 1.10
---

So I have come to find that I like the [lodash](https://lodash.com/) [\_.sortBy](https://lodash.com/docs/4.17.10#sortBy) method more so than the native [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method. I do still use it of course when it comes to working with a project where lodash is not part of the stack, it is just that the method works in a way that I find more natural. I will be elaborating what I mean by that in this post. 

The \_.sortBy method is another option compared to the \_.find method also, the \_.find method can be used to find just one item in a collection, while the \_.sortBy method can be used to sort the whole collection, I can then take just the first element, or the top three. So lets take a look at some examples of sorting with lodash, and native javaScript as well.

<!-- more -->

## 1 - What to know

This is one of my many posts on lodash methods, this one is on the \_.sortBy method that works like the sort array prototype method in native javaScript, but works a little differently. Here I will be writing about that method a bit, as well as the corresponding Array.sort when it comes to just working with javaScript by itself. This is not a getting started post on lodash, or javaScript in general.

## 2 - Basic example of \_.sortBy

For a basic example of \_.sortBy why not start off with just using it to sort an array of numbers. It does not get more basic than that does it.

### 2.1 - Sort an array of numbers

To sort an array of numbers by numerical value, I just have to give the array of numbers to \_.sortBy. No need to give and method as the second argument.

```js
let _ = require('lodash');
 
let nums = [5, 42, -5, 7, 6, 3, 52, 27, 158, -1];
 
console.log(_.sortBy(nums));
 
//[ -5, -1, 3, 5, 6, 7, 27, 42, 52, 158 ]
```

That is all fine and good, but in many projects I am working with an array of objects. So lets look at some more basic examples.

### 2.2 - Sort an array of numbers by an expression

I can give a method as a second argument that can be used to define an expression for sorting.

```js
let lessThanTen = _.sortBy(nums, function (n) {
  return n < 10;
});
 
console.log(lessThanTen);
// [ 42, 52, 27, 158, 5, -5, 7, 6, 3, -1 ]
```

## 3 - \_.sortBy and \_.find

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
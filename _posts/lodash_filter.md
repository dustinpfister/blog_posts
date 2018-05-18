---
title: The lodash _.filter, and Array.filter methods
date: 2018-05-18 10:50:00
tags: [js,lodash]
layout: post
categories: lodash
id: 190
updated: 2018-05-18 11:08:49
version: 1.1
---

It has been a few months sense the last time I wrote a post on [lodash](https://lodash.com/), as I have been trying to find other great things in the javaScript word to write about such as [phaser](/categories/phaser/), and [three.js](/categories/three-js/). However lodash is very popular, and content on it is very much in demand, so maybe I should get back into it for a while, make some new posts, and improve some old ones.

Looking over what [I have on lodash](/categories/lodash) so far I am surprised that I forgot to write one on [\_.filter method](https://lodash.com/docs/4.17.10#filter), also oddly enough I don't have any post on the core js Array.filter equivalent as well. So for the heck of it why not write one on \_.filter and how it compares to what is in javaScript by itself, as there are a lot of lodash methods that are like that.

<!-- more -->

## Basic example of \_.filter in lodash

To use the \_.filter methods the first argument that you give it is a collection, such as an array of numbers. The second argument you give is an iteratee method, that can be your own method, or one of the lodash iteratee methods such as \_.matches. Also some of those methods are built in, more on that later.

So for a basic example one might have a simple little demo in which I have an array of numbers that are negative and positive, and I use \_.filter to create a new array that is only the positive numbers in that array.

Something like this:
```js
// basic example
console.log(
 
    _.filter([4,-1,7,7,-3,-5,1], function(val){
 
        return val > 0;
 
    })
 
); // [4, 7, 7, 1]
```


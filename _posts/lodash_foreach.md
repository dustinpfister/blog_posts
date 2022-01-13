---
title: For Each in lodash and the native Array forEach
date: 2017-11-20 10:45:00
tags: [js,lodash]
layout: post
categories: lodash
id: 95
updated: 2022-01-13 14:51:14
version: 1.10
---

I have been writing about [lodash](https://lodash.com/) a lot these days, I feel that it is something that is still worth covering at least at the time that I first wrote this post anyway. It is true that many of the methods are now native in the late javaScript specs, but there are of course methods that are not. In addition it is true that many of the methods in lodash work a little differently compared to any native javaScript counterpart. This appears to be the case with [\_.forEach](https://lodash.com/docs/4.17.4#forEach) and the native [Array.prototype.ForEach](/2019/02/16/js-javascript-foreach/) method. As they will both do the same thing, but with some significant note worth differences.

For one thing the lodash for each method is one of the many collection methods of lodash, which means that the method will work with collections in general, not just arrays. Also there are a few more little differences such as what happens when something is returned in the body of a function that is given to lodash for each which can be used as a way to stop looping early.

When it comes to the lodash forEach method and the native javaScript array prototype counterpart it seems that a lot of developers have this negative or positive attitude with the use of such methods. It is a pattern that I have observed in blog posts such as this and from discussions over and over again. My attitude with the use of lodash forEach or naive forEach is that the use of it is fine when it comes to quick code examples now and then. However it certainly goes without saying that it is not the only tool in the toolbox when it comes to looping over the contents of an array, or object in general for that matter. It is important to be aware of the other options in lodash, and in javaScript in general, and realize that sometimes it is best to go with some other option.

<!-- more -->

## 1 - The basics of lodash forEach

To start out with in this section I will be going over some quick examples of suing the lodash for each method. In later sections of this post I will then be looking into other native methods when it comes to doing what the lodash for each method does when working with just javaScript by itself.

### 1.1 - basic example of lodash for each method

For a basic example of the lodash for each method in this example I am just passing an array of strings and then a function that will just log all the arguments for each element. The first argument in the function that I give to for each is the current value of a current element, then there is the index value and sense this is an array that I passed each value of index is a numbered index value. The third argument for the function given ti the lodash for each method is then a reference to the source object that I gave when calling for each, in this case the array of strings.

```js
 // lodash _.forEach
 _.forEach(['a','b','c'], function(el,index,arr){
    console.log(index + ' : ' +el + ' : ' + arr);
    if(el === 'b'){
        return false;
    }
 });
 // 0 : a : a,b,c
 // 1 : b : a,b,c
```

One of the main reasons why I choose to use a loop of some kind over Array.forEach is to have the ability to use the break, and continue keywords to cause looping to come to and end. However with the foreach method in lodash, I can return false in the body of the function I pass to it to break at least.

### 1.2 - Lodash for each is a collection method

```js
let a = {
    foo: 'a',
    bar: 'b',
    baz: 'c'
};
_.forEach(a, function(el,index,arr){
    console.log(index + ' : ' + el);
});
//foo: a
//bar: b
//baz: c
```

## 2 - Vanilla JavaScript alternatives to lodash for each


Just like with Array.forEach it some times makes sense to just use a loop of some kind. This allows for full control with respect to use of defining conditions with break, and continue, as well as complex conditions for starting, continuing, stepping, and additional escape conditions. There is also the matter that in some cases a loop is faster, but most of the time it does not make much of a difference, and I often view it as a nano pick issue.

### 2.1 - Basic native array for each method example

```js
// native Array.forEach
['a','b','c'].forEach(function(el,index,arr){
    console.log(index + ' : ' +el + ' : ' + arr);
    if(el === 'b'){
        return false; // does nothing to stop it
    }
});
 // 0 : a : a,b,c
 // 1 : b : a,b,c
 // 2 : c : a,b,c
```

## 3 - Conclusion

Hopefully this post answered a certain question many javaScript developers may have these days, which is the question of the relevance of lodash today. I would say yes, but I can also understand the alternative mindset with this as well. If you enjoyed this post you might want to check out my main post on [lodash in general](/2019/02/15/lodash/), in any case thank you for reading.
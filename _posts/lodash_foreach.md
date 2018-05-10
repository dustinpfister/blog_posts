---
title: _.forEach in lodash vs javaScripts native Array.forEach
date: 2017-11-20 10:45:00
tags: [js,lodash]
layout: post
categories: lodash
id: 95
updated: 2017-11-20 11:03:49
version: 1.0
---

I have been writing about [lodash](https://lodash.com/) a lot these days, I feel that it is something that is still worth covering. It is true that many of the methods are now native in the late javaScript specs, but there are of course methods that are not. In addition it is true that many of the methods in lodash work a little differently then its native js counterpart, this appears to be the case with [\_.forEach](https://lodash.com/docs/4.17.4#forEach).

<!-- more -->

## \_.forEach(Array,iteratee) vs Array.forEach(iteratee)

The main difference that comes to mind is that I can define a condition that causes the looping of the array to stop.

```js
 // lodash _.forEach
 _.forEach(['a','b','c'],function(el,index,arr){
 
    console.log(index + ' : ' +el + ' : ' + arr);
 
    if(el === 'b'){
 
        return false;
 
    }
 
 });
 
 // 0 : a : a,b,c
 // 1 : b : a,b,c
 
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

One of the main reasons why I choose to use a loop of some kind over Array.forEach is to have the ability to use the break, and continue keywords to cause looping to come to and end. However with the foreach method in lodash, I can return false in the body of the function I pass to it to break at least.

## \_.forEach vs while, and for loops

Just like with Array.forEach it some times makes sense to just use a loop of some kind. This allows for full control with respect to use of defining conditions with break, and continue, as well as complex conditions for starting, continuing, stepping, and additional escape conditions. There is also the matter that in some cases a loop is faster, but most of the time it does not make much of a difference, and I often view it as a nano pick issue.

## Conclusion

Hopefully answering a certain question many javaScript developers have these days. Which is the question of the relevance of lodash today. I would say the answer is to some effect yes, but if you say otherwise I understand why.
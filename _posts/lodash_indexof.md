---
title: loash _.indexOf
date: 2019-06-26 13:38:00
tags: [js,lodash]
layout: post
categories: lodash
id: 492
updated: 2020-07-11 10:31:47
version: 1.15
---

The [lodash indexof](https://lodash.com/docs/4.17.11#indexOf) method is one of many methods in lodash that are no longer really a great selling point for the use of lodash in projects these days. There is the [Array.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) array prototype method of course, and that is fairly well supported these days. The [native string index of method](/2020/07/09/js-stirng-index-of/) works more or less the same way as lodash index of method with strings, and as such this is not one of the most compelling methods in lodash that help to win over pople who say it is a dead library.

There are other methods of interest in lodash of course such as the \_.findIndex method as well, and there is also the ides of getting more than just one index when the situation calls for it as well. Still I thought I would take a moment to wrote a post around the lodash indexOf method and a whole much of related topics when it comes to just plain old vanilla javaScript as well.

<!-- more -->

## 1 - lodash indexOf and what to know before continuing

The lodash indexOf method can be used as a way to get the first index that matches the value that is given as the second argument when called. There is however also the \_.findIndex method as well that is a little more advanced as it can be used with arrays of objects rather than just a string of primitives. In addition there are a number of ways of just doing what the lodash indexOf method does with just plain old vanilla javaScript as well including the Array.indexOf array prototype method.

### 1.1 - Browser support for Array.indexOf

So one of the main reasons why you might bother with a method like \_.indexOf over Array.indexOf might have to do with browser support yes? Well the thing about that is that it is not just a question of how far back support goes with a native method it is also a question of how far back does support go with the version of lodash you are using as well.

From what I have gathered the Array.indexOf method works with versions 9+ of Internet explorer, and late versions of lodash only support ie as far back as version 10 of IE. So then it is important to know what version of lodash you are using, and what needs to happen to push support backward farther if need be.

## 2 - A basic lodash indexof example

So if you have an array of primitives and you want to know the index of the first element from index zero forwards the  the lodash indexOf method could be used to do just that.

```js
let arr = ['zero', 'one', 'two', 'three'],
index = _.indexOf(arr, 'two');
console.log(index, arr[index]); // 2 'two'
```

However what if you want to know the index of an element from the end backwards when there is more that one primitive of the same value? What if you want to know all of the index values of all primitives that match the given value? Also what if you are dealing with an array of objects, and you need a way to reference a property that is to be found in the objects? Also is it not true that this method is baked into javaScript itself? why not just use that then? 

Well that being said lets look at some other options then.

## 3 - Vanilla js alternatives to the lodash indexOf method

The lodash indexOf method does not bring much of anything new to the table compared to the native Array.indexOf method, and browser support with Array.indexOf is fairly good these days. This is of course not the case with all lodash methods as some of them work a little differently add additional features, and help to function as a safety net of sorts. However this is not so much the case with \_.indexOf it would seem, unless you need to support ie 8 or even older browsers then that for some reason. So lets look at what we can do with just plain old vanilla js.

### 3.1 - The Array.indexOf method

So of course the first alternative that comes to mind is the native Array.indexOf method. This works in more or less the same fashion as the lodash \.indexOf method, but it is a array prototype method. So there is no need to pass the array, just call it off the array and pass the value that you want the first index of from index zero forward.

```js
let arr = ['zero', 'one', 'two', 'three'],
index = arr.indexOf('two');
console.log(index, arr[index]); // 2 'two'
```

However just like with the lodash method there is still having a greater amount of control when it comes to from where to where, and what to look for when it comes to getting one or more index values. SO lets look as some more examples.

### 3.2 - Using Array.forEach to get one or more index values

So the Array.forEach array prototype method can be used to call a function for each element in an array. There are a number of other such methods in both lodash and native javaScript, so lets use this one for starters when it comes to going beyond just Array.indexOf as an alternative to the lodash method.

```js
let findIndexes = (arr, term) => {
    let indexes = [];
    arr.forEach((el, i) => {
        if (el === term) {
            indexes.push(i);
        }
    });
    return indexes;
};
 
let indexes = findIndexes(['zero', 'one', 'two', 'three', 'two'], 'two');
 
// the first one
console.log(indexes[0]); // 2
// all of them
console.log(indexes); // [2,4]
```

### 3.3 - Getting index values for arrays of primitives and objects with a while loop

Sometimes if you want a job done right you just have to do it yourself. Say you want a method that is like the lodash index of method or its native counterpart, but is packed with all kinds of features that allow for changing the direction in which we are looking, allow for custom functionality when it comes to what exactly we are looking for in order to log an index value, and so forth.

Well there is what can be done with a while loop, it is something where I can define a condition that is what will need to hapen in oder to stop looping rather than just looping over everything every time. I can set a starting index at the end of an array, and the loop backwards if I want also.

In addition I can make it a high order function of sorts in the sense that it can accept a function as one of its arguments and inside the body of that function I can define some custom logic that can change the behavior of the method when it comes to what it is that results in an element being pushed to an array of index values or not.

maybe something like this:

```js
let findIndexes = (opt) => {
    opt = opt || {};
    opt.arr = opt.arr || [];
    opt.term = opt.term || '';
    opt.lookFor = opt.lookFor || function (el, term) {
        if (el === term) {
            return true;
        }
        return false;
    };
    opt.reverse = opt.reverse || false;
    let len = opt.arr.length,
    i = opt.reverse ? len : 0,
    indexes = [];
    while (opt.reverse ? i-- : i < len) {
        if (opt.lookFor(opt.arr[i], opt.term)) {
            indexes.push(i);
        }
        if (!opt.reverse) {
            i += 1;
        }
    }
    return indexes;
};
```

I have all kinds of defaults for it so then I can just use it like this when it comes to an array of primitives like so.

```js
// check it
let indexes = findIndexes({
        arr: ['zero', 'one', 'two', 'three', 'two'],
        term: 'two'
    });
// first from the left
console.log(indexes[0]); // 2
// all of them
console.log(indexes); // [2,4]
```

However say I have an array of objects and the text of interest is a property of each object. Also say I want to change up the logic in a way in which I do not just want to log items in that array that are just an exact pattern match for the value that I give, and I want to log index values from the end of the array backwards.

No problem

```js
// Now for an array of objects
let postIndexes = findIndexes({
        arr: [
            {cat:'lodash', name:'lodash_indexof',wordCount:250},
            {cat:'lodash', name:'lodash-find',wordCount:850},
            {cat:'js', name:'js-fetch',wordCount:230},
            {cat:'lodash', name:'lo-merge',wordCount:1250}
        ],
        term: 'lodash',
        reverse: true,
        lookFor: function(el, term){
            if(el.cat === term && el.wordCount > 500){
                return true;
            }
            return false;
        }
    });
 
console.log(postIndexes[0]); // 3
console.log(postIndexes); // [3,1]
```

There are yet even more features that comes to mind, but you get the idea. In many cases taking the time to work something like this out is not called for, there is often a simpler solution depending on the nature of the problem of course.
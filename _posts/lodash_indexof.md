---
title: loash _.indexOf
date: 2019-06-26 13:38:00
tags: [js,lodash]
layout: post
categories: lodash
id: 492
updated: 2019-06-26 15:33:35
version: 1.6
---

The [lodash indexof](https://lodash.com/docs/4.17.11#indexOf) method is one of many methods in lodash that are no longer really a great selling point for the use of lodash in projects these days. There is the [Array.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) array prototype method of course, and that is fairly well supported these days. There are other methods of interest in lodash of course such as the \_.findIndex method as well, and there is also the ides of getting more than just one index when the situation calls for it as well. Still I thought I would take a moment to wrote a post around the lodash indexOf method and a whole much of related topics when it comes to just plain old vanilla javaScript as well.

<!-- more -->

## 1 - lodash indexOf and what to know before continuing

The lodash indexOf method can be used as a way to get the first index that matches the value that is given as the second argument when called. There is however also the \_.findIndex method as well that is a little more advanced as it can be used with arrays of objects rather than just a string of primitives. In addition there are a number of ways of just doing what the lodash indexOf method does with just plain old vanilla javaScript as well including the Array.indexOf array prototype method.

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

The lodash indexOf method does not bring much of anything new to the table compared to the native Array.indexOf method, and browser support with Array.indexOf is fairly good these days. This is of course not the case with all lodash methods as some of them work a little differently add additional features, and help to function as a safety net of sorts. However this is not so much the case with \_.indexOf it would seem, so lets look at what we can do with just plain old vanilla js.

### 3.1 - The Array.indexOf method

So of course the first alternative that comes to mind is the native Array.indexOf method. This works in more or less the same fashion as the lodash \.indexOf method, but it is a array prototype method. So there is no need to pass the array, just call it off the array and pass the value that you want the first index of from index zero forward.

```js
let arr = ['zero', 'one', 'two', 'three'],
index = arr.indexOf('two');
console.log(index, arr[index]); // 2 'two'
```

### 3.2 -

```js
let findIndexes = (arr, term) => {
    let indexes = [];
    Object.values(arr).forEach((el, i) => {
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

### 3.3 -

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
---
title: loash _.indexOf
date: 2019-06-26 13:38:00
tags: [js,lodash]
layout: post
categories: lodash
id: 492
updated: 2019-06-26 15:07:20
version: 1.2
---

The lodash indexof method is one of many methods in lodash that are no longer really a great selling point for the use of lodash in projects these days. There is the Array.indexOf array prototype method of course, and that is fairly well supported these days. There are other methods of interest in lodash of course such as the \_.findIndex method as well, and there is also the ides of getting more than just one index when the situation calls for it as well. Still I thought I would take a moment to wrote a post around the lodash indexOf method and a whole much of related topics when it comes to just plain old vanilla javaScript as well.

<!-- more -->

## 1 - lodash indexOf and what to know before continuing

The lodash indexOf method can be used as a way to get the first index that matches the value that is given as the second argument when called. There is however also the \_.findIndex method as well that is a little more advanced as it can be used with arrays of objects rather than just a string of primitives. In addition there are a number of ways of just doing what the lodash indexOf method does with just plain okd vanilla javaScript as well including the Array.indexOf array prototype method.

## 2 - 

```js
let arr = ['zero', 'one', 'two', 'three'],
index = _.indexOf(arr, 'two');
console.log(index, arr[index]); // 2 'two'
```

## 3 -

### 3.1 -

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
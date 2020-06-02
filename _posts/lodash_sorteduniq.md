---
title: The lodash SortedUniq and vanilla js alternative
date: 2020-06-01 16:12:00
tags: [lodash]
layout: post
categories: lodash
id: 661
updated: 2020-06-02 10:27:31
version: 1.4
---

The [lodash sorted uniq](https://lodash.com/docs/4.17.15#sortedUniq) method can be used to remove all redundant copies of an element from an array. This is one of many methods in lodash that seem a little redundant, or present some kind of functionality that can easily be done with just native javaScript by itself. In any case this will be a quick post and removing copy elements from an array using the lodash sortedUniq method and vanilla javaScript alternatives to this method.

<!-- more -->

## 1 - The lodash sortedUniq method

The lodash sortedUniq method can be used to sort and remove copy values of an array by passing the array as the first and only argument. The result that is returned is an array that contains only uniq values and it is sorted from lowest value to highest value.

```js
let _ = require('lodash');
let a = [1,1,2,2,3,3,4,4,4,4]
let b = _.sortedUniq(a);
console.log(b); // [1,2,3,4];
```

## 2 - A vanilla javaScript alternative

I have [found this vanilla javaScript alternative to sorted uniq](https://youmightnotneed.com/lodash/#sortedUniq). This vanilla javaScript alternative to the lodash sorteduniq method involves using the spread operator in conjunction with the array bracket syntax, the Set constructor, and the sort array prototype method.

```js
let sortedUniq = arr => {
    return [...new Set(arr)].sort()
};
let a = [1, 1, 2, 2, 3, 3, 4, 4, 4, 4],
b = sortedUniq(a);
 
console.log(b); // [1,2,3,4];
```

So this solution makes use of some fairly modern javaScript features as of this writing at least. So if this is a problem you might still want to use lodash fr that reason. However it is still important to remember that even when it comes to using loadh there is still the question of what version and how far back client support goes with that version.
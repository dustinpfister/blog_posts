---
title: The lodash _.untion method and Sets
date: 2020-09-02 14:38:00
tags: [lodash]
layout: post
categories: lodash
id: 699
updated: 2020-09-02 15:26:47
version: 1.5
---

Time for another one of my usual [lodash](https://lodash.com/) posts this time I will touch base on the [lodash union](https://lodash.com/docs/4.17.15#union) method. Just like many lodash methods there are ways of doing the same thing that the lodash union method does with vanilla javaScriot, so I will be taking a look at [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) in native javaScript also.

The lodash union method is a way to create an array of unique values from one or more arrays of values. So say you have a whole bunch of arrays, but you justs want a single array of values that are not repeated then the lodash unique method can be done to do so. There are ways of doing the same with native javaScript by itself also, which is one reason why I will also be touching based on sets also when it comes to not using lodash.

<!-- more -->

## 1 - basic lodash union example

So a basic example of the lodash union method would be to just call the method and pass one or more arrays as arguments. The result that is returned is an array of values where only unique values are in the resulting array. In other words it is a way to omit values that repeat.

```js
let _ = require('lodash');
 
let arr = _.union([1, 2, 3], [6], [3, 2, 4, 1], [5, 4]);
 
console.log( _.sortBy(arr) );
// [1,,3,4,5,6]
```


## 2 - Vanilla javaScript set example

There is more than one way to get the same result as lodash union with native javaScript but one way is to use sets.


```js
let s = new Set(),
arr = [];
[[1, 2, 3], [6], [3, 2, 4, 1], [5, 4]].forEach(function (arr) {
    arr.forEach(function (n) {
        s.add(n);
    });
});
 
console.log(s);
// Set { 1, 2, 3, 6, 4, 5 }
```


So that is it for now when it comes to the lodash union method, and vanilla javaScript alternatives to the lodash union method. I can not say that this is something that I end up using in actual projects just yet, but it does not hurt to play around with some of these methods now ans then, and also take a moment to look into how are it is to do the same thing with vanilla javaScritp by itself.
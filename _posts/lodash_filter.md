---
title: The lodash _.filter, and Array.filter methods
date: 2018-05-18 10:50:00
tags: [js,lodash]
layout: post
categories: lodash
id: 190
updated: 2019-11-06 18:22:39
version: 1.5
---

Looking over what [I have on lodash](/categories/lodash) so far I am surprised that I forgot to write one on [\_.filter method](https://lodash.com/docs/4.17.10#filter), also oddly enough I don't have any post on the core js [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) equivalent as well. The filter method both in lodash and in native javaScript compes in handy often as a way to create a new array from and array with many of the elements that I do not want for one reason of another removed. There are many other methods that are like filter in lodash such as [compact](/2018/08/09/lodash_compact/), but these are often just convenience methods for what can be done with filter.

<!-- more -->

## 1 - Basic example of \_.filter in lodash

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

## 2 - Array.filter vs \_.filter

The vanilla js Array.filter method can be used in a similar fashion, without the need for lodash. When it comes to something simple, that can work just fine. Also the browser support for Array.filter is pretty good these days, it's only real old versions of IE that come to mind that present a concern if there is actually a far amount of visitors that still use those platforms. Also if in a node.js environment there is no need for lodash at all if this just happens to be the only method that you are using. 

Yet again maybe not, like many of these methods in lodash there are a few things to them that set them apart. So maybe one can rationalize the use of \_.filter these days even when we often have the native alternative to play with in javaScript itself.

### 3 - \_.filter is a collection method, not an array method

So \_.filter is one of the many collection methods in lodash, meaning they are made with both arrays, and objects in general in mind. So if I want to I can just use an Object with \_.filter, and it does not even have to be an array like Object.

```js
var obj = {
 
    foo: 'bar',
    bool: false,
    n: 42,
    c: 7
 
};
 
var numbers = _.filter(obj, function (val, key, obj) {
 
    return typeof val === 'number';
 
});
 
console.log(numbers); // [42,7];
```

When trying to use an array method with a plan old object that was not an instance of Array using call, it will typically only work if it is array like. Or in other words it is an object that has keys that are numbers from zero upwards, and a length property that reflects the count of those keys.

```js
// Vanilla js Array.filter will not just work on any object
var numbers = [].filter.call(obj, function(val,key,obj){
 
    return typeof val === 'number';
 
});
console.log(numbers); // [];
 
// but it will work on 'array like' objects
var numbers = [].filter.call({
 
    0 : 'foo',
    1: 'man',
    2: 7,
    length: 3
 
}, function(val,key,obj){
 
    return typeof val === 'number';
 
});
 
console.log(numbers); // [7]
```

## 4 - Conclusion

It has been a few months sense the last time I wrote a post on [lodash](https://lodash.com/), as I have been trying to find other great things in the javaScript word to write about such as [phaser](/categories/phaser/), and [three.js](/categories/three-js/). However lodash is very popular, and content on it is very much in demand, so maybe I should get back into it for a while, make some new posts, and improve some old ones.

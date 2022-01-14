---
title: lodash collection methods, and working with collection in general with javaScript
date: 2022-01-14 09:57:00
tags: [lodash]
layout: post
categories: lodash
id: 951
updated: 2022-01-14 11:44:56
version: 1.9
---

This month I have been focusing on [lodash](https://lodash.com/), mostly in terms of editing my older content on the subject, but also writing a few new posts where and when I think doing so is needed. With that said I have not wrote a post centered around the [subject of collections](https://en.wikipedia.org/wiki/Collection_%28abstract_data_type%29), and so called collection methods and how they compare to say [arrays methods in lodash](/2019/02/14/lodash_array/).  So in todays post the focal point will be collections, the various methods in lodash that work with collections, and also how to work with collections in general outside of lodash when it comes to working with javaScript by itself.

When it comes to [arrays in javaScript](/2018/12/10/js-array/) and array can be though of as a kind of collection, this is because an array is zero or more elements and each element is often of a given type. When it comes to regular javaScript arrays any element can be any given type, but there are also  typed arrays where all elements are a single type. However anyway each element in the array typically has some kind of shared significance that is relevant to an over all problem, and this array needs to be acted on with various kinds of methods that preform actions on this array such a filtering. When it comes to the structure of javaScript arrays, an array is a kind of object in javaScript, each key is numbered rather than named, and there is a length property of the array that is the current capacity of the array. There is then creating an object that is structured this way using for example the Object literal syntax, as such it is an object that is just like an array in terms of the own properties of the object, but it is not an instance of the array class, thus does not have array prototype methods at the ready to work with. There is then creating another kind of object that is also just like this kind of object in terms of the values for each key, but the keys are named rather than numbered, and there is no length property. These kinds of objects may differ from an array a little, but they can still be thought of as a kind of collection.

<!-- more -->

## 1 - The basics of collections

In this section I am going to start out with the very basics of what a collection is in javaScript in general, and also why it is that collection methods in lodash are helpful. The aim here then is to cover what a collection is to begin with when it comes to the various kinds of objects that a javaScript developer will run into in client side javaScript as well as general run time environments such as nodejs.

At this point I assume that you have at least some basic working knowledge of javaScript in general, and how to make use of an external user space library such as lodash. If not getting started with the very basics of javaScript and lodash is outside the scope of this post, so you will need to take a step back and read up more on certain things you should know before hand.

### 1.1 - Three Objects example

In the first few paragraphs of this post I outline three kinds of general objects, one of which is an array, another is an array like object, and the final one is a kind of named collection or associative array as it might some times be called. All of these kinds of objects hold one thing in common, they are all a kind of collection. Each of these kinds of objects have zero or more public keys and each of those public keys have some kind of value that correspond to it. However there are also the differences, for example the object that is an array will have the array map method at the ready to work with, however that is not the case with the array like object, or the associative array. A collection method is then a kind of method that is designed to work with any of these kinds of objects, right out of the gate, without having do something  before hand to convert types, or get one class of object to work with another.

```js
// an Array
let a = [ 1, 2, 3];
 
// an Object that is formated like an Array
let b = {
    0: 1,
    1: 2,
    2: 3
};
Object.defineProperty(b, 'length', {
    value: 3
});
 
// An Object with named rather than numbered keys and no length property
let c = {
    zero: 1,
    one: 2,
    two: 3
};

// a collection method like lodash forEach, will work with all of these
let func = (item, key, obj) => {
    console.log(key + ' : ' + item + ' : ' + Object.keys(obj).length );
};
_.forEach(a, func);
// 0: 1: 3 
// 1: 2: 3 
// 2: 3: 3 
_.forEach(b, func);
// 0: 1: 3 
// 1: 2: 3 
// 2: 3: 3 
_.forEach(c, func);
// zero: 1: 3 
// one: 2: 3 
// two: 3: 3
```

## 2 - Lodash collection methods

### 2.1 - The lodash for each method

```js
let a = {
    0: 1,
    1: 2,
    2: 3
};
_.forEach(a, (n, key)=>{
    console.log( Math.pow(2, n) );
});
// 2
// 4
// 8
```

## 3 - Vanilla javaScript and Collections

### 3.1 - The array for each method and Object.keys

```js
let a = {
    0: 1,
    1: 2,
    2: 3
};
Object.keys(a).forEach((key) => {
    var n = a[key];
    console.log( Math.pow(2, n) );
});
// 2
// 4
// 8
```

## 4 - Conclusion


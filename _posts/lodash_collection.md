---
title: lodash collection methods, and working with collection in general with javaScript
date: 2022-01-14 09:57:00
tags: [lodash]
layout: post
categories: lodash
id: 951
updated: 2022-01-15 10:35:53
version: 1.15
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

Now that I have the basics of what a collection is to begin with out of the way I can now take a moment to run over some of the collection methods to work with in lodash. There are a lot to choose from, some of which will just loop over the contents of a collection, others preform very specific tasks that will only prove to be useful in rare cases, and even then it is not to hard to do the same with another more common option. So I will not be going over every little method that there is to write about in this section, but I will of course be writing about the common ones.

### 2.1 - The lodash for each method

I all ready covered the lodash for each method, so I will not be going over this method again in to much detail. I all ready [wrote another post on the lodash for each method](/2017/11/20/lodash_foreach), so much of the various little additional features are outline there.

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

Lodash is a great library, but there is also a whole lot to work with all ready when it comes to just using javaScript by istelf. It is  not so hard to just work with collections in general with just native javaScript features alone when one is aware of what there is to work with to help with this. For example there are static methods of the Object class that can be used to do things like create and return an array of values, or public key names of any object, and then an array prototype method can be called off of that.

### 3.1 - The array for each method and Object.keys

There is a native [array for each method](/2019/02/16/js-javascript-foreach/) in the array prototype of core javaScript. This method might be an array method but there are ways of getting it to work with collections in general. If it is an array like object a function prototype method can be used, and if it is not an array like object there are static Object methods like [Object.keys and Object.values](/2018/12/15/js-object-keys/).

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

So then in javaScript, and many other languages a collection is just some kind of group of values. This group of values might differ in various ways fro one language to another, but it should always be as the same suggests a kind of collection of values. There are all kinds of collections in core javaScript such as Arrays, TypedArrays, Sets, and plain old Objects. Also in client side javaScript there are classed like HTMLCollection and NodeList just to name a few examples of this sort of thing when it comes to that environment.

However there is a common bond between them all in javaScript, and that common bond is that you are just working with some kind of object. Also there is a common bond, or at least there should be, when it comes to what a collection is across many languages.



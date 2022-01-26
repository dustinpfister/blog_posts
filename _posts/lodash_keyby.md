---
title: Examples of the _.keyby method in lodash
date: 2018-10-24 20:03:00
tags: [js,lodash]
layout: post
categories: lodash
id: 311
updated: 2022-01-26 11:02:23
version: 1.15
---

If I am ever in a situation in which I need to create an object with keys that are generated from the properties of objects in an array I can use the [lodash](https://lodash.com/) [\_.keyBy](https://lodash.com/docs/4.17.10#keyby) method to make quick work of that. 

The \_.keyBy method works a lot like [\_.groupBy](/2018/08/02/lodash_groupby/) only it will only create one object for each key. In this post I will be going over some use case examples of \_.keyBy, and some vanilla js alternatives for doing so as well when it comes to doing something like this with just native javaScript by itself.


<!-- more -->

## 1 - What to know

This is a post on the \_.keyBy method in lodash, which can be used to create a new object with keys that are made from the properties of objects in an array. This is not a getting started post on lodash, or javaScript in general. Lodash has a lot of useful methods that can help save time when it comes to working these thinks out from scratch, but a lot of the methods are now part of javaScript itself, and much of what is left is often not to hard to write from scratch. I have not attachment to lodash, and in these posts on lodash I often write about how to do something with lodash, and then also how hard it is to get by without it.

### 1.1 - A Basic lodash keyby example

Maybe it is a good idea to start out with a very simple example of the lodash \_.keyby method. Maybe something where we are just working with a simple array of numbers, and I want an object where each key is the corresponding letter of the alphabet for that number.

```js

let nums = [1, 2, 3, 4];
let obj = _.keyBy(nums, (num) => {
        return String.fromCharCode(64 + num);
    });
 
console.log(obj);
// { A: 1, B: 2, C: 3, D: 4 }
```

So basically the returned value of of the method that is given to the lodash keyby method will be the object key name of the resulting key value pait object that will be returned by the keyby method.

### 1.2 - Another example of \_.keyBy

For a basic example I just have an array of objects that each have a type and price property. I want to have a single object that has keys that are the type of an object in the array followed by a number. The \_.keyBy method can be used in this case.

```js
let units = [{
        type: 'a',
        price: 10
    }, {
        type: 'b',
        price: 12
    }, {
        type: 'a',
        price: 9
    }
];
 
let counts = {
    a: 0,
    b: 0
};
let keyed = _.keyBy(units, function (unit) {
        counts[unit.type] += 1;
        return unit.type + counts[unit.type];
    });
 
console.log(keyed.a1.price); // 10
```

## 2 - Vanilla javaScript alternatives to using keyby

Although the lodash keyby method might prove to be useful in various situations in which it would become of use, it is also not so hard to preform the same result with just vanilla javaScript by itself.

### 2.1 - basic example with vanilla js

It is not to hard to make a vanilla js alternative to the lodash keyby method though. Just using forEach or a loop of some kind to loop over the contents of the array, and use the value of each object to create key names to a new Object created with the object literal syntax for example. 

```js
let counts = {
    a: 0,
    b: 0
},
keyed = {};
units.forEach((unit) => {
    let c = counts[unit.type]++;
    keyed[unit.type + c] = unit;
});
 
console.log(keyed.a1.price); // 9
```

So the lodash keyby method is not one of the most compelling methods in lodash to warrant the need to continue using it. I can not say that I find myself doing this sort of thing often and when I need to it is not so hard to just go ahead and do so with just a few javaScript built in features.

### 2.2 - The Object keys method to help work with collections

The [object keys method](/2018/12/15/js-object-keys/), is one of many static methods attached to the main Object object in core javaScript. This keys method will return an array of public key names for any object that is passed to it. So then this is a typical first go to method when it comes to doing anything with a collection in general rather than just with arrays.

```js
let source = {
    "bar": {x: 5, y: 37, id: 1},
    "foo": {x: 0, y: 0, id: 7}
};
// using Object.keys to get an array of key named for
// the source object. I can then use that key to get the value
// for each key in the source object also and do whatever I need to
// do when it comes to creating a new object
let a = {};
Object.keys(source).forEach(function(key){
    let value = source[key];
    a[value.id] = value;
});
console.log(a);
// { '1': { x: 5, y: 37, id: 1 }, '7': { x: 0, y: 0, id: 7 } }
```

### 2.3 - Vjs methods for looping over a collection, and doing the same thing as keyby

So then with the Object.keys method as well as array prototype methods like array for each it is possible to loop over the contents of any object, at least in terms of public keys. I can then use this as a basis to create functionally like that of the lodash key by method, but also many other similar methods like the lodash for each method, groupBy and countBy. The functionality of for each and the object keys method can be abstracted away into a kind of vanilla javaScript lodash for each style function, that function can then be called in one or more additional methods that will then be used to recreated the functionality of lodash key by.

```js
// vjs for each and key by collection methods
let vjsEach = (source, func) => {
    Object.keys(source).forEach(function (key, i, keys) {
        func.call(source, source[key], key, source, i, keys)
    });
};
 
let vjsKeyBy = (source, func) => {
    let obj = {};
    vjsEach(source, function (val, key) {
        obj[func(val, key, source)] = val;
    });
    return obj;
};
 
// DEMO of vjsKeyby
let source = {
    "bar": {x: 5, y: 37, id: 1},
    "foo": {x: 0, y: 0, id: 7}
};
let a = vjsKeyBy(source, function(val){
    return val.id;
});
console.log(a);
// { '1': { x: 5, y: 37, id: 1 }, '7': { x: 0, y: 0, id: 7 } }
```

## 3 - Conclusion

So \_.keyBy is one of the many methods in lo dash that can come in handle now and then when a situation comes about that calls for it's use. If you have anything you might like to add, or have any questions or concerns about the content of this post please be sure to let me know in the comments, and thank you for reading.

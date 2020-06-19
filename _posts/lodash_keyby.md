---
title: Examples of the _.keyby method in lodash
date: 2018-10-24 20:03:00
tags: [js,lodash]
layout: post
categories: lodash
id: 311
updated: 2020-06-19 15:18:08
version: 1.10
---

If I am ever in a situation in which I need to create an object with keys that are generated from the properties of objects in an array I can use the [lodash](https://lodash.com/) [\_.keyBy](https://lodash.com/docs/4.17.10#keyby) method to make quick work of that. 

The \_.keyBy method works a lot like [\_.groupBy](/2018/08/02/lodash_groupby/) only it will only create one object for each key. In this post I will be going over some use case examples of \_.keyBy, and some vanilla js alternatives for doing so as well when it comes to doing something like this with just native javaScript by itself.


<!-- more -->

## 1 - What to know

This is a post on the \_.keyBy method in lodash, which can be used to create a new object with keys that are made from the properties of objects in an array. This is not a getting started post on lodash, or javaScript in general. Lodash has a lot of useful methods that can help save time when it comes to working these thinks out from scratch, but a lot of the methods are now part of javaScript itself, and much of what is left is often not to hard to write from scratch. I have not attachment to lodash, and in these posts on lodash I often write about how to do something with lodash, and then also how hard it is to get by without it.

## 2 - A Basic lodash keyby example

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

## 3 - Another example of \_.keyBy

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

### 3.1 - basic example with vanilla js

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

## 4 - Conclusion

So \_.keyBy is one of the many methods in lo dash that can come in handle now and then when a situation comes about that calls for it's use. If you have anything you might like to add, or have any questions or concerns about the content of this post please be sure to let me know in the comments, and thank you for reading.

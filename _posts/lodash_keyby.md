---
title: Examples of the _.keyby method in lodash
date: 2018-10-24 20:03:00
tags: [js,lodash]
layout: post
categories: lodash
id: 311
updated: 2018-10-24 20:35:27
version: 1.4
---

If I am every in a situation in which I need to create an object with keys that are generated from the properties of objects in an array I can use the [lodash](https://lodash.com/) [\_.keyBy](https://lodash.com/docs/4.17.10#keyby) method to make quick work of that. The \_.keyBy method works a lot like \_.groupBy only it will only create one object for each key. In this post I will be going over some use case examples of \_.keyBy, and some vanilla js alternatives for doing so as well.


<!-- more -->

## 1 - What to know

This is a post on the \_.keyBy method in lodash, which can be used to create a new object with keys that are made from the properties of objects in an array. This is not a getting started post on lodash, or javaScript in general. Lodash has a lot of useful methods that can help save time when it comes to working these thinks out from scratch, but a lot of the methods are now part of javaScript itself, and much of what is left is often not to hard to write from scratch. I have not attachment to lodash, and in these posts on lodash I often write about how to do something with lodash, and then also how hard it is to get by without it.

## 2 - basic example of \_.keyBy

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

### 2.1 - basic example with vanilla js

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

---
title: The JS Array filter method
date: 2020-10-03 12:55:00
tags: [js]
layout: post
categories: js
id: 715
updated: 2020-10-03 13:13:09
version: 1.4
---

So in native javaScript there are a number of prototype methods that can be used off of any instance of an array. One such method is the js [array filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method than can be used to create a new array from an array with a whole bunch of elements filtered out. The logic that is used to filter out elements can be defined in the body of a function that is passed to the array filter method.

The js array filter method is just one of many methods that a javaScript developer should be aware of in the native array prototype, alone with many other such methods in other prototype objects. So the js array filter method is often used with or in replacement of other methods like [array map](/2020/06/16/js-array-map/), and [array forEach](/2019/02/16/js-javascript-foreach/).

<!-- more -->

## 1 - js array filter basics

So in this section I will be going over just the very basics of the js array filter method.

### 1.1 - basic array filter example

here we have just a very basic example of the js array filter method.

```js
var a = [1, 'a', 2, 'b', 3, 'c'],
b = a.filter(function (el) {
        return typeof el === 'number';
    });
console.log(a);
console.log(b);
```

## 2 - filter keys of an Object

The js array filter method can be used with other methods in native javaScript such as the Object keys static method to filter objects keys in a plain old object. In other words say you have an object with named key values rather than numbered key values and you want to create a new object with named key values. You can not use array filter by itself because it is an array prototype methods and the objects that we are talking about here are not array like objects so it is not possible to do something with the function call prototype method. However the Object keys static method can be used to create an array of key names, and then the array filter method can be called off of that.

```js
var filterObjectKeys = function (obj, func, thisValue) {
    func = func || function () {
        return true;
    };
    thisValue = thisValue || obj;
    var b = {};
    Object.keys(obj).filter(function (key, i) {
        return func.call(thisValue, key, obj[key], i, obj);
    }).forEach(function (key) {
        b[key] = obj[key];
    });
    return b;
};
 
var obj = {
    a: 1,
    b: '1',
    c: 2,
    d: 3
};
 
var b = filterObjectKeys(obj, function (key, val, i, obj) {
        return typeof val === 'number';
    });
 
console.log(obj);
// { a: 1, b: '1', c: 2, d: 3 }
console.log(b);
//{ a: 1, c: 2, d: 3 }
```

## 3 - js array filter examples

In this section I will just be going over a whole buch of use case examples of the array filter method.

### 3.1 - remove invalid values

So of course the array filter method can be used to create a new array that does not have any elements that would be considered invalid.

```js
var removeInvalid = function (objects) {
    return objects.filter(function (el) {
        if (typeof el != 'object' || el === null) {
            return false;
        }
        return typeof el.hp === 'number';
    });
};
 
var objects = [{
        hp: 10
    }, {},
    7,
    undefined,
    'foo',
    [], {
        hp: 7
    },
    null,
    NaN
];
 
objects = removeInvalid(objects);
 
console.log(objects);
// [ { hp: 10 }, { hp: 7 } ]
```

### 3.2 - remove dead enemies in a game

Say you are making a game and you want to work out a method that will be used to remove any dead enemies from an array. The array filter method could be used to create a new array of enemies that only contains enemies that are still alive.

```js
// remove dead function
var removeDead = function (pool, onDead) {
    onDead = onDead || function () {};
    var dead = [];
    // create clean pool
    var clean = pool.filter(function (el) {
            if (el.hp <= 0) {
                dead.push(el);
                return false;
            }
            return true;
        });
    // call onDead for each dead enemy
    dead.forEach(function (el, i, dead) {
        onDead(el, i, dead, clean, pool);
    });
    return clean;
};
// DEMO
var ships = [{
        hp: 0
    }, {
        hp: 10
    }, {
        hp: 7
    }, {
        hp: -5
    }
];
var score = 0;
ships = removeDead(ships, function (ship) {
        score += 1;
    });
console.log(ships);
// [ { hp: 10 }, { hp: 7 } ]
console.log(score);
// 2
```
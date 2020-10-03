---
title: The JS Array filter method
date: 2020-10-03 12:55:00
tags: [js]
layout: post
categories: js
id: 715
updated: 2020-10-03 13:03:38
version: 1.1
---

So in native javaScript there are a number of prototype methods that can be used off of any instance of an array. One such method is the js array filter method than can be used to create a new array from an array with a whole bunch of elements filtered out. The logic that is used to filter out elements can be defined in the body of a function that is passed to the array filter method.

The js array filter method is just one of many methods that a javaScript developer should be aware of in the native array prototype, alone with many other such methods in other prototype objects. So the js array filter method is often used with or in replacement of other methods like array map, and array forEach.

<!-- more -->

## 1 - js array filter basics

### 1.1 - basic array filter example

```js
var a = [1, 'a', 2, 'b', 3, 'c'],
b = a.filter(function (el) {
        return typeof el === 'number';
    });
console.log(a);
console.log(b);
```

## 2 - filter keys of an Object

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

### 3.1 - remove invalid values

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
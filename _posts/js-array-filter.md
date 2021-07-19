---
title: The JS Array filter method
date: 2020-10-03 12:55:00
tags: [js]
layout: post
categories: js
id: 715
updated: 2021-07-19 16:21:36
version: 1.15
---

So in native javaScript there are a number of prototype methods that can be used off of any instance of an native [javaScript array](/2018/12/10/js-array/). One such method is the js [array filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method than can be used to create a new array from an array with a whole bunch of elements filtered out. The logic that is used to filter out elements can be defined in the body of a function that is passed to the array filter method.

The js array filter method is just one of many methods that a javaScript developer should be aware of in the native array prototype, alone with many other such methods in other prototype objects. So the js array filter method is often used with or in replacement of other methods like [array map](/2020/06/16/js-array-map/), and [array forEach](/2019/02/16/js-javascript-foreach/).

<!-- more -->

## 1 - js array filter basics

So in this section I will be going over just the very basics of the js array filter method. The array filter method is an array prototype method so in order to use it you must have an array to begin with, or use the call function prototype method to attempt to get it to work on something that is not an array. In any case in this section I will be going over a few quick examples of the basic features of the array filter prototype method.

### 1.1 - basic array filter example

Here I have just a very basic example of the js array filter method. I create an array and then call the filter method off of that array, and then pass a function as the first argument for the array filter method that will be called for each element in the array. In the body of the function that I pass to the array filter method I return a true or false value. If the value is true then the current element will be included in the new array, if the value is false it will not be included.

```js
var a = [1, 'a', 2, 'b', 3, 'c'],
b = a.filter(function (el) {
        return typeof el === 'number';
    });
console.log(a);
console.log(b);
```

### 1.2 - The index values of the elements

The index value for each element in the array can be obtained via a second argument in the function that is passed to the js array filter method as the first argument.

```js
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var b = a.filter(function (el, i) {
        return i % 2 === 0;
    });
console.log(b);
// [ 1, 3, 5, 7, 9 ]
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

In this section I will just be going over a whole bunch of use case examples of the array filter method. Many of these examples might not have any typical real would use case value, however some of them might. It would be best to just start working on your own projects and start finding your own unique use case examples of the array filter method. However if you would like to see a few examples that might help to inspire you to get working on your own code maybe this section will help.

### 3.1 - remove invalid values

So of course the array filter method can be used to create a new array that does not have any elements that would be considered invalid. With that said the array filter method can be used as a way to preform sanitation on an array that can potential contain values that should not be there. I just have to work out whatever logic needs to be preformed in order to return false right away for certain types that should not be there, and then preform additional checks on objects once I know I am indeed working with an object.

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

Say you are making a game and you want to work out a method that will be used to remove any dead enemies from an array. The array filter method could be used to create a new array of enemies that only contains enemies that are still alive. While I am filtering out enemies that are dead I could also fire a method that is to be called each time an enemy dies in the game. Inside this on dead function I can do things like tabulate a score value.

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

Although this kind of approach might work okay, when it comes to a serious game project these days I have found that i prefer to use an object pool. What I mean by an object pool is that I have a fixed collection of objects that are reused over an over again rather than pushing and purging objects into a collection as needed. For more on object pools you might wan to check out [my canvas example post on object pools](/2020/07/20/canvas-example-object-pool/) to get a better idea of what I mean by them.

### 3.3 - HTMLCollections and using array filter with function call

In javaScript often I find myself working with what are called array like objects. What these kinds of objects are is that they are objects that have keys that are numbered rather than named just like arrays, and they have a length property that should be the total number of named keys just like arrays. So it is a kind of object that is like an array, but it is not an instance of the built in array prototype so it is not an array. So with these kinds of objects I can not just use the array filter method with them because the array filter method is part of the array prototype and not that of any other prototype.

However if it is an array like object often I can still get the array filter method to work with it by making use of a function prototype method know as call.

```html
<html>
    <head>
        <title>JS Array filter</title>
    </head>
    <body>
        <div id="container">
            <div id="foo1">one</div>
            <div id="foo2">2</div>
            <div id="foo3">3</div>
            <div id="foo4">four</div>
        </div>
        <script>
var container = document.getElementById('container'),
divs = container.children;
Array.prototype.filter.call(divs, function (el, i) {
    return String(parseInt(el.innerText)) != 'NaN';
}).forEach(function (el) {
    var n = parseInt(el.innerText);
    el.innerText = n + ' : ' + Math.pow(n, 2);
});
        </script>
    </body>
</html>
```

## 4 - Conclusion

So the array filter method is just one of the many tools in the toolbox in native javaScript when it comes to working with arrays. I find myself using it most of the time when I want to filter out elements from an array, but it is not a replacement for other options like array map, and array reduce.

I guess another thing worth mentioning is that support for the array filter method. With that said the js array filter method was introduced in ECMA-262 5th revision spec javaScript. So these days I would consider the array filter method to be a fairly safe method to use unless for some reason I need to support really old browsers.
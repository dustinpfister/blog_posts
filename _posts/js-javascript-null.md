---
title: javaScript null
date: 2019-03-11 19:47:00
tags: [js]
layout: post
categories: js
id: 399
updated: 2019-03-12 14:06:34
version: 1.5
---

So [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) is one of many possible values that a variable can be at any given time in javaScript. It would seem that null is more or less the same as undefined, but this is not the case. In this post I will be writing around some of the things to know about the javaScript null value.

<!-- more -->

## 1 - javaScript null and undefined

The null value is one of javaScripts primitive values, that represents the absence of any object value. There is some confusion surrounding null and a similar primitive value known as undefined.

### 1.1 - null must be assigned.

One major difference to undefined is that the null value must be assigned to a variable or object property. By default the undefined value is what the value of an variable that is declared but has not been assigned anything. Same is true of object properties, and what is returned by a function, in any case the null value must be assigned.

```js
var a,
obj = {},
func = function () {};
 
console.log(a); // undefined
console.log(obj.foo); // undefined
console.log(func()); // undefined
 
var b = null,
obj2 = {
    foo: null
},
func2 = function () {
    return null;
};
 
console.log(b); // null
console.log(obj2.foo); // null
console.log(func2()); // null
```

### 1.2 - In some cases null can be set as a value, but undefined can not.

In some cases it is possible to set an argument to null, but not to undefined. For example many functions are designed in a way in which there is a default value that is assigned to an argument when do argument is given. Often this works by testing for the undefined value by way of strict type equality. In the event that the argument is undefined a default value is assigned for the argument, so it can not be set to undefined, but it can be set to null.

```js
var foo = function (bar) {
    bar = bar === undefined ? 'foobar' : bar;
    return bar;
};
 
console.log( foo() ); // 'foobar'
console.log( foo(undefined) ); // 'foobar'
console.log( foo(null) ); // null
```

## 2 - Typeof null is object.

So when the typeof operator is used to find the type of a value that is null, the result is an object.

```js
console.log(typeof null); // 'object'
```

Apparently this is a bug that has been around sense the beginning of javaScript way back in the day. However given that the meaning of null is the absence of an object value, then maybe it is not such a bad thing. Still this can result in problems in some situations, requiring something like this to fix it.
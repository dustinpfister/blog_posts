---
title: javaScript null
date: 2019-03-11 19:47:00
tags: [js]
layout: post
categories: js
id: 399
updated: 2021-04-15 13:38:54
version: 1.14
---

So [javaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) is one of many possible values that a variable can be at any given time that stands the absence of an object value. On the surface it might seem that null is more or less the same as undefined, but this is not the case. There are some subtle differences and null is not meant to be a replacement for undefined or vice versa. 

A null value can be thought of as a lack of identification value for what should be an object. This might be the main reason why the type of null is object. In addition it is true that null is a value that must be assigned, rather than a value that such as undefined where it is often the assumed default for variables that have been declared but not assigned anything and so forth. In this post I will be writing around some of the things to know about the javaScript null value.

<!-- more -->

## 1 - javaScript null and undefined

The null value is one of javaScripts primitive values, that represents the absence of any object value. There is some confusion surrounding null and a similar primitive value known as undefined. They are similar but there are reasons why a null value is part of javaScript. In some cases using null as a default value might be a better option compared to something lie the number zero.

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

```js
var func = function (obj,dx) {
    if (typeof obj === 'object' && obj != null) {
        return obj.x += dx;
    }
    return -1;
};
 
console.log(func({x:5},5)); // 10
console.log(func(null,5)); // -1
```

Without a check for nul then what will result is an error when trying to access a property of null.

## 3 - Adding one to null vs doing the same with undefined

One note worthy difference between null and and undefined is what happens when you add a number to null compared to doing the same with an undefined value. When adding a number to an undefined value the result is NaN, where doing the same with a null value will result in the number that was added to null. For this reason alone it might be better to use null as a define value fo sorts compared to undefined.

```js
console.log( null + 1 ); // 1
console.log( undefined + 1 ); // NaN
```

## 4 - Conclusion

So null in javaScript is one of several primitive values in javaScript that a developer should be aware of. It will evaluate to false when it comes to converting to boolean, and has a type of object. It is often confused with the undefined value but there are many little deferences between the two types of values.


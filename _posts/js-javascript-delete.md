---
title: javaScript delete operator
date: 2019-02-20 02:20:00
tags: [js]
layout: post
categories: js
id: 387
updated: 2019-02-20 11:05:10
version: 1.4
---

The [JavaScript delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) operator might not come up that often in code examples, but once in a while it might be needed as a way to remove object properties. In this post I will be checking out the delete operator, and some related topics that seem to center around the use of it when it comes to managing object properties in javaScript.

<!-- more -->

## 1 - javaScript delete

The delete operator as you might expect is there to help delete things, but not just anything, only object properties.

```js
let obj = {
    x: 5,
    y: 7,
    t: 1
};
console.log(obj.t); // 1
delete obj.t
console.log(obj.t); // undefined
```

Here I have a basic example of an object that has three properties, and I want to delete one of them. The delete operator can be used to do so, and when it is used and works successfully at deleting the property, it does not just set the property value to undefined it gets rid of it completely.

## 2 - Delete and set undefined

As I mentioned in the last section the delete operator can get rid of a property completely from an object. This differs from just setting an object key value to undefined. In that case the value of the property is undefined, but the key is still very much there and will show up in for in loops or when using an Object static method like Object.keys.

```js
var obj = {
    x: 15,
    y: 27
};
obj.y = undefined;
console.log(Object.keys(obj).length); // 2
delete obj.y;
console.log(Object.keys(obj).length); // 1
```
---
title: js value of object method
date: 2020-03-06 16:45:00
tags: [js,corejs]
layout: post
categories: js
id: 622
updated: 2020-03-07 07:41:53
version: 1.3
---

The js [value of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) method is a way to define what the primitive value of an object is. There is a value of object prototype methods that will always be used by default when making an object part of an expression that involves operators like addition. However it is possible to add a value of method for the prototype object of a Class, or just make it an own property of an object instance which will supersede the default value of method in the object prototype.

Typically I would want a value of method to return a number or string value, however it should return whatever is appreciate when using an an object in an expression that will be used to compute a product.

<!-- more -->

## 1 - js value of basic example

```js
var obj = {
    exp: 4,
    base: 2,
    valueOf: function () {
        return Math.pow(this.base, this.exp);
    }
};
var n = obj + 5;
console.log(n); // 21
```

If there is a value of method as an own property of an object that will supersede anything that might be in the prototype object
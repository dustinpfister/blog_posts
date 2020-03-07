---
title: js value of object method
date: 2020-03-06 16:45:00
tags: [js,corejs]
layout: post
categories: js
id: 622
updated: 2020-03-07 07:16:48
version: 1.2
---

The js [value of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) method is a way to define what the primitive value of an object is. 

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
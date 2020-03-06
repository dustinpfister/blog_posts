---
title: js value of object method
date: 2020-03-06 16:45:00
tags: [js,corejs]
layout: post
categories: js
id: 622
updated: 2020-03-06 16:48:44
version: 1.1
---

The js value of method is a way to define what the primitive value of an object is

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
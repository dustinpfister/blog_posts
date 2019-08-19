---
title: lodash omit method for omitting properties from an object
date: 2019-08-19 16:10:00
tags: [js,lodash]
layout: post
categories: lodash
id: 525
updated: 2019-08-19 16:13:42
version: 1.1
---

The lodash omit method can be used to create a new object by omitting properties from an existing object that is give as the first argument. This method is like the lodash pick method only it creates a new object by omitting properties that are not wanted rather than picking properties that are wanted.

<!-- more -->

## 1 - lodash omit basic example

```js
let obj = {
    index: 0,
    x: 5,
    y: 12,
    z: 3
};
 
console.log(_.omit(obj, ['index', 'z']));
// { x: 5, y: 12 }
```

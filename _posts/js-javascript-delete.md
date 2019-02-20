---
title: javaScript delete operator
date: 2019-02-20 02:20:00
tags: [js]
layout: post
categories: js
id: 387
updated: 2019-02-20 11:00:04
version: 1.3
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
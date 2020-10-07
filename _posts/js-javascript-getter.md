---
title: javaScript getters, setters, and reactive objects
date: 2020-10-07 15:05:00
tags: [js]
layout: post
categories: js
id: 718
updated: 2020-10-07 15:52:48
version: 1.1
---

In vuejs it is possible to create reactive objects, by default this is the case with the data object of a vuejs instance. However it might be a good idea to dive deep down into how this works, and the key behind it is the Object.definePropery method and the use of javaScript getters and setters.

<!-- more -->

## 1 - Basic javaScript getter example

One way to define a JavaScript getter is to use the [get syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) when making a new object.

```js
var obj = {
    mess: 'foo',
    get foo() {
        return '(' + this.mess + ')';
    }
};
 
console.log(obj.foo);
// '(foo)'
```
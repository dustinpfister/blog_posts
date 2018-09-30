---
title: The lodash _.forIn method
date: 2018-09-30 14:40:00
tags: [js,lodash]
layout: post
categories: lodash
id: 43
updated: 2018-09-30 19:44:18
version: 1.9
---

The [\_.forIn](https://lodash.com/docs/4.17.4#forIn) method in [lodash](https://lodash.com/) is a helpful tool, for looping over both own, and inherited properties in an Object in a javaScript environment. In this post I will be covering a basic use case example of \_.forIn, and how it compares to other lodash, and vanilla js methods of looping over object properties in javaScript.

<!-- more -->

## 1 - what to know before hand

This is a post on the \_.forIn method in lodash, and other related topics. The _.forIn method can be used to loop over both the own properties of an object as well as anything that may be in the prototype chain.

## 2 - Basic example of \_.forIn

The \_.forIn lodash method will loop over all own, and inherited properties of an object. In other words the key value pairs that are specific to the object, as well as anything that is part of the objects prototype.

```js
let A = function () {
 
    this.b = 42
 
};
 
A.prototype.c = 7;
 
_.forIn(new A(), function (d) {
 
    console.log(d); // 42 7
 
});
```

## 2 - Vanilla js alternatives to \_.forin

In this section I will be exploring ways to go about looping over both own and inherited properties just using vanilla js.

### 2.1 - A for in loop

Just a plain old for in loop seems to work just fine to loop over own properties of an object as well as what is in the prorotpe object as well.

```js
let a = new A();
 
// a for in loop works
for (var prop in a) {
    console.log(a[prop]);
}
```
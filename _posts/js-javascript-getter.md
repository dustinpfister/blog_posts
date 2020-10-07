---
title: javaScript getters, setters, and reactive objects
date: 2020-10-07 15:05:00
tags: [js]
layout: post
categories: js
id: 718
updated: 2020-10-07 16:24:04
version: 1.4
---

In vuejs it is possible to create reactive objects, by default this is the case with the data object of a vuejs instance. However it might be a good idea to dive deep down into how this works, and the key behind it is the Object.definePropery method and the use of javaScript getters and setters.

In ECMA-262 R5 spec javaScript forward getters and setters where introduced as a way to have control over how properties are actually rendered to a result each time the property is accessed, or set by way of some kind of assignment. One why of thinking about it is that they can be thought of as event handlers of sorts where each time a property of a object is accessed the getter function is called, and the value that is returned by the getter is what will be used for the value of that property. In addition setters can be used as a way to define some additional logic that will fire each time the value of a property is set with an assignment operator.

Son in this post I will be writing a bot about javaScript getters, but I suppose I will also have to touch base on setters and other related topics like the [Object.definePropery](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) method.

<!-- more -->

## 1 - JavaScript getters

In this section I will be starting out with just a few basic examples of javaScript getters. There are two ways of defining a javaScript getter that I am aware of. One way is to make use of the get syntax, an the other is to do so by using the Object define property method.

### 1.1 - Basic javaScript getter example

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

### 1.2 - The define property method

```js
var obj = {
    mess: 'foobar'
};
 
Object.defineProperty(obj, 'foo', {
    get: function () {
        return this.mess;
    }
});
 
console.log(obj.foo);
// 'foobar'

```
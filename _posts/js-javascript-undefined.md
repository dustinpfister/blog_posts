---
title: JavaScript undefined value and keyword what to know
date: 2019-01-30 16:16:00
tags: [js]
layout: post
categories: js
id: 368
updated: 2019-02-09 13:27:02
version: 1.4
---

In [javaScript undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is a value that comes up often. The undefined value is the default value for variables that are declared but do not have any value assigned to them. When working with functions a value of undefined is what is returned by a function by default unless something else is returned by using the return keyword. There is also the undefined keyword that can be used to intentionally set a variable to undefined, and can also be used in expressions. In this post I will be outlining some examples that point out some things that a javaScript developer should be aware of when it comes to undefined in javaScript.

<!-- more -->

## 1 - javaScript undefined defined

In javaScript undefined is a primitive value, and a global property that represents that value. In this section I will cover some examples that demonstrate some typical situations in which a javaScript developer will run into the undefined primitive.

### 1.1 - when a variable is declared, but not assigned anything.

When a variable is declare but is not assigned a value other than undefined, the default value for that variable is undefined.

```js
var n;
 
console.log(typeof n); // undefined
```

### 1.2 - undefined is what is returned by a function by default

When writing a function that returns some kind of result, if nothing is returned then the default value that is returned is undefined. To have a function return something other than undefined the return keyword can be used inside the body of a function to define what it is that is to be returned.

```js
var noop = function () {};
var foo = function () {
    return 'bar';
};
 
console.log(noop()); // undefined
console.log(foo()); // 'bar'
```
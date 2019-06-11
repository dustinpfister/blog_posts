---
title: JavaScript undefined value and keyword what to know
date: 2019-01-30 16:16:00
tags: [js]
layout: post
categories: js
id: 368
updated: 2019-06-11 19:59:40
version: 1.7
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

### 1.3 - undefined is the default value for an argument

When writing a function that accepts one or more arguments if an argument is not given then the default value for the argument is undefined. So testing for undefined is often used as a way to determine of no argument is given,and then thus set a default for that argument when writing a function.

```js
var sum = function (a, b) {
    a = a === undefined ? 0 : a;
    b = b === undefined ? 0 : b;
    return a + b;
};
 
console.log(sum()); // 0
console.log(sum(5)); // 5
console.log(sum(2,6)); // 8
```

## 2 - Conclusion

The undefined value in javaScript comes up a lot in discussions when learning javaScript for the first time. A common mistake most new javaScript developers make involves errors resulting in calling undefined.
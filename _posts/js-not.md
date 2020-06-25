---
title: JavaScript Not Operator usage examples
date: 2019-10-14 18:08:00
tags: [js]
layout: post
categories: js
id: 546
updated: 2020-06-25 16:21:13
version: 1.9
---

The javaScript not operator can be used to negate a value and turn the value into a boolean value. In other words whatever the truth value is for a value the js not operator will return the opposite of that value as a boolean type rather than whatever type it might be before hand.

The operator can come in handy when writing many expressions that might come up when working with conditional statements, and also with feature testing. In some code examples I see it being used to trim down the size of a boolean literal expression, and I am sure that there are many other use examples for the [js not](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) operator.

<!-- more -->

## 1 - js not basic example

The js not operator is an exclamation point when it comes to the syntax of javaScript. The operator has right to left associativity so any value that is left of the operator will be what is converted to a boolean. The operator both converts to boolean and inverts the value, so A good starting example might be to just give the number zero as the value for starters.

```js
let bool = !0;
 
console.log(typeof bool); // boolean
console.log(bool); // true
```

In javaScript zero will evaluate as false so then not zero will end up being true. The most important thing about this is that the operator will produce a boolean value and that the value will be inverted. With that being said lets look at some more examples some of which might prove to be a little more piratical.

## 2 - feature testing with the js double not !! operator

The [js not operator used twice](https://love2dev.com/blog/javascript-not-operator/) comes up now and then in many code examples in the wild. In some cases it might seem unnecessary, but it can come in handy when feature testing and I want to return a boolean value rather than another value.

```js
var supportsCanvas = function () {
    try {
        return !!document.createElement('canvas').getContext('2d');
    } catch (e) {
        return false;
    }
};
 
console.log(supportsCanvas()); 
// false if nodejs (or not support in browser), true if browser that supports 2d canvas
```

The reason why this works is because calling the js not operator once will convert a value to a boolean, but it will also invert the value of that boolean value. So calling the js not operator once more will then invert it back to its true logical value.

## 3 - Using js not to make a boolean value bay way of !0 or !1

The number zero will work out to a false boolean value, so using the js not operator will result in a true boolean value. The opposite of this will work out to false by using the js not operator with the number one for example.

```js
let bool = !0;
console.log(typeof bool); // boolean
console.log(bool); // true
```
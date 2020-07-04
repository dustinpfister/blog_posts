---
title: JavaScript Not Operator usage examples
date: 2019-10-14 18:08:00
tags: [js]
layout: post
categories: js
id: 546
updated: 2020-07-04 07:52:22
version: 1.13
---

The [javaScript not](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) operator can be used to negate a value and turn the value into a boolean value. In other words whatever the truth value is for a value the js not operator will return the opposite of that value as a boolean type rather than whatever type it might work out to before hand.

So then in many situations the javaScript not operator can come in handy when writing many expressions that might come up when working with conditional statements, and also often with feature testing in my experience thus far. In some code examples I see it being used to trim down the size of a boolean literal expression which is one little trick I will be getting to in this post, and I am sure that there are many other use examples for the [js not](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) logical operator that might be of interest when reading code out in the wild. So lets look at some basic examples, and then many some not so basic examples of the javaScript not operator.

<!-- more -->

## 1 - js not logical not basic example

The js not operator is an exclamation point when it comes to the syntax of the javaScript operator. The operator has right to left [associativity](/2019/02/02/js-operator-precedence/) so any value that is right of the operator will be what is converted to a boolean. In addition logical not as well as bitwise not for that matter has a precedence value of 17, this means that the operation will be preformed before addition, subtraction and any other operators that are below that value. The operator both converts to boolean and inverts the value, so A good starting example might be to just give the number zero as the value for starters.

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

## 4 - Conclusion

I often use the javaScript not operator whenever and wherever needed as a way to negate the truth value of something. In addition it is also a helper tool for quickly converting something into a boolean value by using twice. There are also other ways of negating value when it comes to numbers such as just multiplying by negative one or using the subtraction and addition operators but with only one value rather than two.
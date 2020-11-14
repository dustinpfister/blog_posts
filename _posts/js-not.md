---
title: JavaScript Not Operator usage examples
date: 2019-10-14 18:08:00
tags: [js]
layout: post
categories: js
id: 546
updated: 2020-11-14 13:44:02
version: 1.19
---

The [javaScript not](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) operator can be used to negate a value and turn the value into a boolean value. In other words whatever the truth value is for a value the js not operator will return the opposite of that value as a boolean type rather than whatever type it might work out to before hand.

So then in many situations the javaScript not operator can come in handy when writing many expressions that might come up when working with conditional statements, and also often with feature testing in my experience thus far. In some code examples I see it being used to trim down the size of a boolean literal expression which is one little trick I will be getting to in this post, and I am sure that there are many other use examples for the [js not](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) logical operator that might be of interest when reading code out in the wild. So lets look at some basic examples, and then many some not so basic examples of the javaScript not operator.

<!-- more -->

## 1 - JS Not (!) logical not basics

The js not operator is an exclamation point when it comes to the syntax of the javaScript operator. The operator has right to left [associativity](/2019/02/02/js-operator-precedence/) so any value that is right of the operator will be what is converted to a boolean. In addition logical not as well as bitwise not for that matter has a precedence value of 17, this means that the operation will be preformed before addition, subtraction and any other operators that are below that value. 
### 1.1 - Basic JS Not Example

The operator both converts to boolean and inverts the value that is to the right of the JS Not operator. So for example say I just want a simple function that will return one of two messages depending on the truth value of a single given argument. Where I want to have a message if the value is Not true rather than true, the JS Not operator combined with an if statement and the return keyword can be used to do so.

```js
var mess = function (happy) {
    if (!happy) {
        return 'I am Not Happy'
    }
    return 'I am Happy';
};
console.log(mess()); // 'I am NOT Happy'
console.log(mess(false)); // 'I am NOT Happy'
console.log(mess(true)); // 'I am Happy'
```

### 1.2 - The Double JS Not (!!)

If I just want to convert a value to a boolean type there are other options to that of the JS Not operator. There is of course the Boolean constructor that will just convert a value to what the Boolean value of that value is. The trouble with js not is that it will both convert and invert, which is okay considering that is the expected behavior of it. However if I want to convert and preserve the original truth value with js not, doing so can be easily done by just using the operator twice.

```js
// The Boolean Constructor can be used
// to create A Boolean value from a value such
// as the number 0
console.log(Boolean(0)); // false
 
// The JS Not (!) operator can also be used to
// convert a number to a Boolean but it will also
// negate the truth value
let b = !0;
console.log(typeof b); // boolean
console.log(b); // true
 
// Double JS Not (!!) can fix this
let c = !!0;
console.log(typeof b); // boolean
console.log(b); // false
```

The practice of using the JS Not operator twice is often referred to as [Double Not or Not Not](https://love2dev.com/blog/javascript-not-operator/).

### 1.3 - Conversion to Boolean

The JS Not can be used as a way to convert a value to a boolean value. The only thing to remember is that it will do more than just convert, it will convert and invert. So be sure to use two, or one depending on the situation in order to get the desired truth value for the value.

```js
// the Boolean Constructor
console.log( Boolean(0) ); // false
console.log( Boolean(1) ); // true
console.log( Boolean('') ); // false
console.log( Boolean('foo') ); // true
console.log( Boolean(null) ); // false
console.log( Boolean(undefined) ); // false
console.log( Boolean(NaN) ); // false
 
// Double Not (!!) should give the same result
console.log( !!0); // false
console.log( !!1 ); // true
console.log( !!'' ); // false
console.log( !!'foo' ); // true
console.log( !!null ); // false
console.log( !!undefined ); // false
console.log( !!NaN ); // false
 
// Single Not (!) will invert
console.log( !0); // true
console.log( !1 ); // false
console.log( !'' ); // true
console.log( !'foo' ); // false
console.log( !null ); // true
console.log( !undefined ); // true
console.log( !NaN ); // true
```

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

The number zero will work out to a false boolean value, so using the js not operator will result in a true boolean value. The opposite of this will work out to false by using the js not operator with the number one also on top of this. So then the use of the JS Not operator with the numbers 0 and 1 and be used as a way to make a slightly smaller alertaive to that of the true and false literals. 

```js
let bool = !0;
console.log(typeof bool); // boolean
console.log(bool); // true
```

## 4 - Bitwise not (~)

There is another kind of Not operator in javaScript called the bitwise not operator. This kind of operator has to do with inverting the bits of a number value, rather than the truth value of a boolean.

```js
var n = 255,
a = (n).toString(2),
b = (~n >>> 0).toString(2),
c = (~n).toString(2);
 
console.log(a); // '11111111'
console.log(b); // 11111111111111111111111100000000
console.log(c); // -100000000
```

## 5 - Conclusion

I often use the javaScript not operator whenever and wherever needed as a way to negate the truth value of something. In addition it is also a helper tool for quickly converting something into a boolean value by using twice. There are also other ways of negating value when it comes to numbers such as just multiplying by negative one or using the subtraction and addition operators but with only one value rather than two.
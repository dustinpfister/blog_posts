---
title: javaScript numbers the basics and more.
date: 2019-01-24 15:47:00
tags: [js]
layout: post
categories: js
id: 363
updated: 2020-06-27 12:38:27
version: 1.20
---

In [javaScript Numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) are a central part of just about any project, so doing just about anything interesting with javaScript will require at least some basic understanding of how numbers are handled in a javaScript programing environment. 

Working with numbers in javaScript might be a little easier compared to other environments as there is only one Number data type, or at least that is the case traditionally. There is also a new [BigInt constructor](/2019/09/06/js-bigint/) also, but that is a matter for another post.

In this post I will be going over some of the basics when it comes to just plain old javaScript numbers.

<!-- more -->

## 1 - javaScript number basics

In javaScript a number can be just a literal, there are a number of was of creating a number literal actually but the most common is the decimal format. In order words just type the number in base 10 common base 10 format, if you want a fraction use a decimal point where needed.

Number literals by themselves do not do much good, so often they need to be stored in a variable. There once was a time when there was just var when it comes to storing values in javaScript, but now there is let and const as well. I will not be getting into the differences between them here that is off topic, if you are not sure which to use then start off with var. So then type var followed by the assignment operator, and then the number value you want to store.

Or better yet just look at some code examples, and learn by doing.

```js
// just logging a number literal
console.log(42); // 42
 
// setting a number to a variable
let x = 40;
console.log(x); // 40
 
// a number can be a result of an expression as well
let y = x + 2;
console.log(y); // 42
 
// numbers can be what is returned by a
// static function such as Math.pow
let z = Math.pow(2, 4);
console.log(z); // 16
 
// there are a number of Number prototype
// methods that can be used
let m = 32.49273,
f = m.toFixed(2);
console.log(typeof f); // 'string'
console.log(f); // '32.49'
 
// numbers can be passed as arguments,
// and can be created and used inside the body of a function
let d = function (x1, y1, z1, x2, y2, z2) {
    let a = Math.pow(x1 - x2, 2),
    b = Math.pow(y1 - y2, 2),
    c = Math.pow(z1 - z2, 2)
        return Math.sqrt(a + b + c);
};
console.log(d(x, y, z, 0, 0, 0)); // 60.166435825965294
```

As you can see from the basic examples numbers can be the result of expressions, what is returned by a method, and can also be used as arguments for a function. In the body of a function numbers can be declared with the var let or const keywords and when doing so will have function or even block level variable scope inside the body of that function when used with those keywords. There are also a number of number class prototype methods such as toFIxed that can be called off of any instance of a number.

## 2 - javaScript Numbers are only one data type IEEE_754

In javaScript, traditionally at least all Numbers are 64 bit double precision [IEEE_754](https://en.wikipedia.org/wiki/IEEE_754-1985) floating point numbers. If you would like to dive into the subject of IEEE 754 to gain a better understanding of the data type by all means do so, but getting into the depth of that is not necessarily required as long as you are aware that there are some limitations with that data type. There are new standards such as [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), as well as other libraries that can be used to address those limitations. However for the most plain old javaScript Numbers work just fine, and in this post I will be writing mainly about this.

## 3 - Finding out if something is a javaScript number

When I want to find out if a variable or property name that I am dealing with is a number or not one way to go about doing so is to use the typeof operator.

```js
let arr = ['foo', 42, null, NaN, 16, {}, 0, -1];
arr = arr.filter((el) => {
        return typeof el === 'number';
    });
console.log(arr);
// [ 42, NaN, 16, 0, -1 ]
```

## 4 - javaScript Numbers and max safe integer.

With with the javaScript Number Object there is a built in constant called [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). This number is the highest value that a developer can work with until they run into a weird problem when making certain comparisons. For example consider the following:

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
 
let n = Number.MAX_SAFE_INTEGER + 1;
 
console.log(n === n + 1); // true (but should be false)
 
```

When making an equal comparison between n and n + 1 the returned value should be false. However When I go beyond the Max Safe integer this is no longer the case. The reason why has to do with the limitations of IEE_754. For many projects I am not working with numbers this large, but when I do I will want to use a library that represents numbers as strings, or make use of the new bigInt standard to help get around this.

## 5 - Converting Numbers to Strings in javaScript

The process of converting a number to a string is fairly easy, there is of course the String method that can be used. However in javaScript conversion to a string can also occur when just adding a number to a string as well. Often I see that method used as a way to do so by just adding an empty string to a number.

```js
let n = 42;
 
console.log(typeof n); // number
 
console.log(typeof String(n)); // string
console.log(typeof (n + '')); // string
console.log(typeof n.toString(16)); // string
```

This works because in javaScript the addition operator is not just used to add Numbers but also to concatenate strings together as well. So when a number and string are added together that results in string concatenation rather than addition and the result is a string not a number. I will get into this sort of thing more so in the expressions section of this post.

### 5.1 - Number.toString in detail

One more thing about the Number.toString prototype method, there is an option to give a base as the first argument to this method. So if you are looking for a quick way to get a string representation of a number in binary for example the number to can be given to the toSting method sense binary is a base two system.

```js
console.log( (42).toString(2) ); // '101010'
``` 

## 6 - converting Strings to Numbers

So now that I have covered converting Numbers to strings there is the process of doing the opposite as well. The same can be done with some operators when working out an expression, and there are a few options when it comes to methods as well. So in this section I will be looking at some examples of converting something that is not a number to a number in javaScript.

### 6.1 - The Number function

The main Number function can be used as a way to convert something such as a string, boolean, or in some cases even an object to a number if it has a valueOf method. In some cases though it will result in NaN depending on what type it is, the value of the type, and in the event of an object the presence and state of any valueOf method that may or may not be there.

```js
let n = Number('17');
console.log(typeof n); // 'number'
console.log(n); // 17
 
// String with a space results in NaN
n = Number('17 6');
console.log(typeof n); // 'number'
console.log(n); // NaN
 
// Booleans
n = Number(true);
console.log(typeof n); // 'number'
console.log(n); // 1
 
// Objects with valueOf methods
let obj = {
    x: 10,
    y: 42,
    valueOf: function () {
        return this.x + this.y;
    }
}
n = Number(obj);
console.log(n); // 52
console.log(parseInt(obj)); // NaN
```

For the most part using the Number function is the standard way of converting something that is not a number to a number, I say that mostly because of the valueOf method of objects. Many built in constructors such as Date have valueOf methods, and as you can see in the example above it can be included in my own custom objects as well.

### 6.2 - An expression that evaluates to a number

One trick is to multiply the string by 1, if the string can successfully be converted to a number it will result in a number with the corresponding value, otherwise it will result in NaN. There is also parseInit,parseFloat and the Number method as well that can work.

```js
let str = '42.2';
console.log(typeof (str * 1)); // number
```

### 6.2 - parseInt and parseFloat

```js
let str = '42.2';

console.log(typeof parseInt(str)); // number
console.log(typeof parseFloat(str)); // number
console.log(typeof Number(str)); // number
```


## 7 - javaScript number literals

There are a number of ways to create a javaScript number by way of a Number Literal rather than the result of an expression or any other means. The most common way would be in plain old decimal form, however there are base16, and base8 options as well. There are also exponents, and other options that can be considered a kind of literal as well.

```js
// decimal integer and floating points
console.log( 42 ); // 42
console.log(42.1234); // 42.1234
 
// hex (base16) numbers 
console.log( 0x2a); // 42
 
// octal (base8) numbers 
console.log(052); // 42
console.log(0o52); // 42
 
// exponents
console.log(2e3); // 2000
console.log(2e-1); // 0.2
 
// NaN and infinity literals
console.log(NaN);
console.log(Infinity);
```

## 8 - Numbers as the result of an expression

When creating an expression of one or more operations a Number can often be the result of that expression. In some cases however it can some times evaluate to something else such as a string depending on the data type of the value. For example if an operator such as the multiplication operator is used with a Number and a string the string will be converted to a number, and the result will be a number. However if addition is used with two strings then the result will be string concatenation, and not addition. 

```js
console.log(typeof (2 * '5')); // number
console.log(typeof (7 / '13')); // number
 
console.log(typeof (5 + 10) ); // number
console.log(typeof ('7' + '13')); // string
```
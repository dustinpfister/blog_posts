---
title: The basics of JavaScript numbers
date: 2019-01-24 15:47:00
tags: [js]
layout: post
categories: js
id: 363
updated: 2020-10-28 13:17:45
version: 1.32
---

In [javaScript Numbers](https://www.javascripttutorial.net/javascript-number/) are a central part of just about any project. Much of programing has to do with working with magnitudes that are well represented with numbers. For example say I am working out a simple example that has to do with a point in a 2d grid, numbers can be used to represent the x and y position of that point in the grid. Numbers are also used when it comes to representing things like an angle between two points in a grid, and the number of frames that are to pass when a point moves from one location to another, just to mention a few examples where Numbers will come into play. So doing just about anything interesting with javaScript will require at least some basic understanding of how numbers are handled in a javaScript programing environment. 

Working with numbers in javaScript might be a little easier compared to other environments as there is only one Number data type, or at least that is the case traditionally. There is also a new [BigInt constructor](/2019/09/06/js-bigint/) also, but that is a matter for another post.

In this post I will be going over some of the basics when it comes to just plain old javaScript numbers. There are quight a few thing to be aware of when working out expressions, and may other little things here and there that one might only become ware of over time. So I will be touching base on at least some of theme here for what it is worth.

<!-- more -->

## 1 - The basics of javaScript numbers

In this section I will be going over some of ther very basics of numbers in javaScript. There is creating a number literal that is an actaul literal value in javaScript code. However in real projects number valiues are often obtained by way of some external data, or input of some kind. So there is also storing number values in variables, so they can be worked with elsewhere later. There is also ending up with a number by way of some kind of expression that is also often the case. So there is much to cover even whe it comes to the very basic of numbers in javaScript, so lets get this out of the way so we can move on to the good stuff.

### 1.1 - Number literals

In javaScript a number can be just a literal, there are a number of ways of creating a number literal actually but the most common is the decimal format. In order words just type the number in base 10 common base 10 format, if you want a fraction use a decimal point where needed.

```js
// just logging a number literal
console.log(42); // 42

// NaN is also a number literal
console.log(typeof NaN); // 'number'

// there are some others
console.log(typeof Infinity); // 'number'
console.log(typeof -Infinity); // 'number'
```

### 1.2 - Storing a number in a variable

Number literals by themselves do not do much good, so often they need to be stored in a variable. There once was a time when there was just var when it comes to storing values in javaScript, but now there is let and const as well. I will not be getting into the differences between them here that is off topic, if you are not sure which to use then start off with var. So then type var followed by the assignment operator, and then the number value you want to store.

Or better yet just look at some code examples, and learn by doing.

```js
// setting a number to a variable
let x = 40;
console.log(x); // 40
```


### 1.3 - expressions can result in a number

Expressions in javaScript are a way to use a log string of values and operators that will ultimately be evaluated to some kind of value. one such value that an expression will typically evaluate to is of course a number.

```js
// a number can be a result of an expression as well
let x = 40;
let y = x + 2;
console.log(y); // 42
```

### 1.4 - Returned by a function call

A number can be a value that is returned by a function call. When creating a function there is using the return keyword in the body of the function, and making it so that it will return a number value. There are also a number of built in static functions such as the Math.pow method.

```
// numbers can be what is returned by a
// static function such as Math.pow
let z = Math.pow(2, 4);
console.log(z); // 16
```

### 1.5 - Number wrapper prototype methods

There are a number of methods that are [Number wrapper Prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) methods. In JavaScript a Number is a kind of primitive value rather than an Object, however there is a wrapper object that is available around the primitive number value. This wrapper object has a prototype object, and via that object there are all kinds of methods than can be called off of the number. One such method is the toFixed method that will return a string value of the number to a fixed number of decimal places.

```js
// there are a number of Number prototype
// methods that can be used
let m = 32.49273,
f = m.toFixed(2);
console.log(typeof f); // 'string'
console.log(f); // '32.49'
```

### 1.6 - Numbers can be passed as arguments

Numbers are one of many values that can be passed to functions as arguments. So often functions are made that will expect a number as an argument, or at least will only return a desired result if a number is passed. Inside the body of a function if I declare a variable and assigned a number to it, or any value for that matter, it will become local to that function even if I use var as the way to do so. If I use let and const it can event be local to a block of code inside the function, but variable scope is maybe a bit off topic here.

```js
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

The parseInt and parseFloat methods are yet another way to go about creating numbers from string values.

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

## 9 - Conclusion

In javaScript numbers as a central part of most programing tasks, along with other primitive values such as Strings. What is nice about javaScript and numbers is that I only have to worry about one data type for numbers. In many other languages not only is there strict typing, but I also have to work with more than one type of number.
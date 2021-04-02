---
title: BigInt basics in javaScript for numbers beyond max safe int
date: 2019-09-06 15:46:00
tags: [js]
layout: post
categories: js
id: 531
updated: 2021-04-02 10:18:45
version: 1.16
---

So the regular number type in javaScript has some limitations when it comes to working with very large numbers beyond that of the [max safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER). Beyond that when it comes to adding a low number such as one to a number at, and beyond max safe integer you might end up with the same number as the result of the expression. So then it goes without saying that after that range, certain operations can not be preformed without a loss of precision, thus the name Max Safe Integer.

To get around this limitation with javaScript numbers in the past, a library would have to be used that involves representing a number with a string, and then have custom method that is part of this library for preforming operations with these types of objects was a way to work with big numbers in a project. For a long time the use of an external library was required when it comes to working with large numbers beyond max safe integer, and preserving high precision when preforming operations. These modules still work just fine, and often might still prove to be a better choice over a native solution, but as of late yes there is a native solution for this now.

So with that said in modern browsers, and node 10.4.x+ there is now the BigInt Object that now provides high precision math functionality in native javaScript by itself without the introduction of an external module. As of this writing the [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) object is still not well supported so you might still want to use a library for that reason, but in time such libraries will no longer be needed for this because of this native support. So lets look at a few quick examples of the native bigInt object and what is has to provided in platforms that support it.

<!-- more -->

## 1 - JavaScript BigInt Numbers might not be the best option for now at least

As of this writing BigInts are still a fairly new addition to native core javaScript itself. If the nature of the project consists of front end code BigInts might not be the best option because of poor browser support, unless of course some additional code is added to help function as a fallback in the event that it is not there. 

In addition if it is a nodejs project then it might still not be a good idea to use BigInts unless you are confident that the project will always be used in later versions of node that are version 10.4.x or later. Even if you go with BigInt there are still some drawbacks that might not make a library solution outdated just yet, BigInt numbers can not be used with native javaScript Math Object methods such as Math.pow for example.

Still in this section I will be going over some simple examples of BigInt to serve as a way to get started with this javaScript feature.

### 1.1 - BigInt basics creating them

So If you are confident that the use of native javaScript BigInt numbers will work for your project rather than a user space library solution for this sort of thing then getting started with them is fairly simple. The BigInt Object can be used as a way to create an instance of BigInt from a number or a string of a number that I want the value of the BigInt to be. There is also a literal syntax that can be used by just appending an n after a number value.

Once I have some BigInt values there are a number of operators that can be used with BigInts just like plain old javaScript numbers. They can be added together, multiplied, and so forth. This is one nice feature of the native solution for this as I do not have to bother with library built in features to preform operations I can just make javaScript expressions like always.

```js
// create BigInts from a Number
var n = BigInt(37),
// from a string of a number
x = BigInt('130000'),
// by appending an n to the end of a number literal
y = 4500n,
// by writing an expression using BigInts
z = n + x * y;

console.log(z.toString());
// '585000037'
```


## 2 - BigInts in javaScript are a new type

So a BigInt in javaScript is a whole new data type all together so they are not Numbers, strings, or just a certain class of Object, they are a new data type all together. When using the [typeof operator](/2019/02/15/js-javascript-typeof/) the type of a BigInt will not be the same as that of a plain old tired yet true javaScript Number. This can present a problem as you can not just use a BigInt with any native or user space method that expects a javaScript number rather than a BigInt. So in this section I will be going over a few examples of making big int values but also converting them back to regular numbers so they can be used with methods that will just work with the older data type.

### 2.1 - Know what you are dealing with by using typeof

First off it is a good ideal to get into the habit of using the typeof operator as a way to know what data types a variable is. This is something that a javaScript developer should be aware of to begin with, but never the less there is just starting out with using this to gain insight as to what kind of value a variable is.

```js
var bigN = BigInt(42),
n = 42;
 
// BigInts are a type of there own
console.log(typeof bigN);
// bigint
 
// Plain old javaScript Numbers are a type of their own also
console.log(typeof n);
// number
```

### 2.2 - The valueOf method, the Number method, and using functions that call for a number rather than bigint

When calling the valueOf method of a bigint the returned result will be a bigint and not a number. This is what I would expect and want to happen actually so that I can use these bigint values with javaScript operators and use the type in expressions. However the drawback is that is I need a number values of a big int value to use with a function that will only work with regular javaScript numbers this presents a problem. In many libraries the valueOf method of a bug integer class object will return a regular javaScript number, but with the native solution for this it will not be the case. So in situations in which I need to convert a big int value to a regular number I can use the Number method.

```js
var bigN = BigInt(8);
 
// The valueOf method of a bigInt
// will return a bigint and not a number
var a = bigN.valueOf();
console.log(typeof a); // bigint
 
// so to covert to a number use the Number method
var b = Number(bigN);
console.log(typeof b); // number
 
// bigint values must be converted to a number
// when using them with a method that expects a number
var c;
try{
  c = Math.pow(2, bigN);
}catch(e){
    console.log(e.message); // Cannot convert a BigInt value to a number
}
c = Math.pow(2, Number(bigN));
console.log(c); // 256
```

## 3 - Equality and BigInt

So when it comes to equality things are as a javaScript developer would expect when using the identity and equality operators with a big int value compared to a number and string value. When using identity a BigInt will not equal a number or string of the same value because they are different types. However when using the loose typing equality operator a bog int will equal and equivalent number or string value because type conversion is preformed.

```js
var bigN = BigInt(42);
 
console.log(bigN === 42); // false
console.log(bigN == 42); // true
console.log(bigN == '42'); // true
```

So simply put the big int type is a whole new data type in javaScript to work with. However javaScript is also a typeless language so any variable can be a big int, regular JavaScript number, a string value, or any other type for that matter at any time. So it is still a good idea to stick to the use of the identity operator, and make sure that you always know what you are dealing with.

## 4 - Conclusion

So the BigInt type is a great addition to native javaScript, but I would say that it is not yet a replacement for library solutions as there are many features missing that are present in [library solutions](/2017/05/29/nodejs-big-integer/) for [big numbers](http://www.thealmightyguru.com/Pointless/BigNumbers.html) in javaScript. There is also not the question of just preforming operations with these kinds of numbers, but also how to go about formatting them when it comes to displaying a value. Many user space modules for this sort of thing include not just methods for preforming operations, but also methods for formatting a number for display.

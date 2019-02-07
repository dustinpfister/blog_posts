---
title: Javascript == ,===, and more.
date: 2019-02-06 17:47:00
tags: [js]
layout: post
categories: js
id: 372
updated: 2019-02-07 10:03:51
version: 1.9
---

So the javaScipt == operator is used to find equality in expressions, in addition there is also the === operator that is used to find what is called identity as well. So there is more than one [comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) in javaScript because of javaScripts typeless nature. This is a subject that comes up often in javaSciprt related discussions so it goes without saying that I should write a post on this one.

<!-- more -->

## 1 - javaScript == can be used to find equality (AKA type conversion)

The javaScript == operator can be used to find equality between to operands. If the two operands are equal the resulting value will be true otherwise it will result in false.

```js
let str = 7;
console.log( str == 7); // true
```

Simple enough for the most part however there are some things to be ware of, and there is also another operator === known as the identity operator. So be sure to read on if this is a subject that you still find a little confusing.

### 1.1 - The == operator preforms type conversion

The main difference between == and === is that == preforms type conversion. In the event that both operands that are used in the operation are not of the same type then type conversion is used to check if they equal each other when converted.

```js
let str = '7';
 
console.log(str == 7); // true
console.log(str == '7'); // true
```

### 1.2 - Comparing objects

When comparing two objects the result is true when both operands are references to the same object.

```js
let obj = {n:42},
ref = obj;
 
// if both operands are references to the same object that is true
 console.log(obj == ref); // true
 
// else it is not true
console.log(obj == {n:42}); // false
```

Even if another object has the same set of property names, and values it is another separate object in memory rather than two references to the same object.

### 1.3 - Two booleans

Same as with numbers and strings if a boolean is compared to a non boolean value type conversion is preformed. The resulting boolean value depends on the data type and the value of the type.

```js
// two booleans
console.log(false == false); // true
console.log(!1 == false); // true
console.log(!-42 == false); // true
console.log(!0 == false); // false
console.log(true == false); // false;
 
// type conversion
console.log(0 == false); // true
console.log('' == false); // true
```

## 2 - javaScript === can be used to find identity (AKA strict comparison)

The identity, or strict comparison is another type of comparison operator in javaScript that does the same thing but with one significant difference which is of course that it does not preform type conversion. So both operands in the expression must be of the same type, as well as have the same value as well.

```js
let str = '7',
n = 7;
 
// so the ==  (equality) operator will preform type conversion
 console.log(n == str); // true
 
// however the === (identity) operator will not preform type conversion
console.log(n === str); // false
 
console.log(n === 7); // true
 
console.log(n === Number(str)); // true
```

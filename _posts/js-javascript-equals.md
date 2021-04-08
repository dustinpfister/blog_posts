---
title: =, == , ===, and Object.is in javaScript
date: 2019-02-06 17:47:00
tags: [js]
layout: post
categories: js
id: 372
updated: 2021-04-08 14:44:56
version: 1.30
---

So the javaScipt == or [Equality operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) is used to find equality in expressions. However there are a number of other options to be aware of in javaScript in addition to the equality operator there is also the === or identity operator that is used to preform a more strict, type sensitive kind of comparison between two values. There is yet even another option that comes to mind that is not an operator, but a static method called the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) method that brings yet even another standard to be aware of. However none of these should be confused with just a single = operator, that is used for assignment, and there is really only that when it comes to doing so.

So there is more than one [comparison operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators) in javaScript because of javaScripts typeless nature. This might case some confusion, but if you take a moment to just work out some simple examples that confusion can be quickly dispelled.

A variable can be of any kind of type at any given moment, at one time it can be the number 5, and at another moment it can be the string 5. So there is a need for a comparison operator that does type conversion, and another that does not. This is a subject that comes up often in javaSciprt related discussions so it goes without saying that I should write a post on this one. So then in this post I will be going over a few quick examples of comapting to values to each other that might be equal to each other in javaScript.

<!-- more -->

## 1 - First off some simple = ( assignment ) examples

### 1.1 - basic assignment example

```js
var n = 42;
console.log(n); // 42
```

### 1.2 - Assignment and comparison expressions

```js
let func1 = (a) => {
    let b = a == undefined ? 0 : a;
    console.log(b);
    return b;
};
 
let func2 = (a) => {
    let b = a === undefined ? 0 : a;
    console.log(b);
    return b;
};
 
func1()     // 0
func1(null) // 0
 
func2()     // 0
func2(null) // null
```

## 2 - javaScript == can be used to find equality (AKA type conversion)

The javaScript == operator can be used to find equality between to operands. If the two operands are equal the resulting value will be true otherwise it will result in false. When this kind of operator is used to make a comparison type conversion is preformed until there is a common type between the two values, at which point the comparison is truly made. So when this kind of comparison operator is used the number 5 will of course equal the number 5, however the number 5 will also equal the string 5 when type conversion is preformed. This is why in most cases I, as well as many other developers often prefer to use the identity operator in place of the equally operator, more on that a litter later.

```js
let str = 7;
console.log( str == 7); // true
```

Simple enough for the most part however there are some things to be ware of, and there is also another operator === known as the identity operator. So be sure to read on if this is a subject that you still find a little confusing.

### 2.1 - The == operator preforms type conversion

The main difference between == and === is that == preforms type conversion. In the event that both operands that are used in the operation are not of the same type then type conversion is used to check if they equal each other when converted.

```js
let str = '7';
 
console.log(str == 7); // true
console.log(str == '7'); // true
```

This is why I generally prefer to use the javaScript identity or === operator for most comparisons, because it forces be to be more mindful of what is going on with types.

### 2.2 - Comparing objects

When comparing two objects the result is true when both operands are references to the same object. However any comparison of two objects that are different objects in memory will also result in false, even if they have the same set of values.

```js
let obj = {n:42},
ref = obj;
 
// if both operands are references to the same object that is true
 console.log(obj == ref); // true
 
// else it is not true
console.log(obj == {n:42}); // false
```

So when comparing objects the only thing of interest is if they are both the same object or not. If you want to find out if two objects have the same set of values or not you will want to loop over the contents, and compare each key. If you want to find out if they are both objects of the same class you could try the constructor property that would work in most cases.

### 2.3 - Two booleans

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

## 3 - javaScript === can be used to find identity (AKA strict comparison)

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

## 5 - Comparing to NAN

I [wrote a post in the past about NAN](/2017/09/23/js-nan/) which is a special kind of Number value in javaScript that is a Number yet also stands for Not A Number, however that is not really the end of the confusion surrounding that kind of value. The problem in a nutshell is that NaN does not equal anything, even itself, so a special method called isNaN, or some other kind of method needs to be used to check if two values equal NaN or not.

```js
console.log(NaN == NaN); // false
console.log(isNaN(NaN) == isNaN(isNaN)); // true
```

To make things even more complicated the special methods that are used to test for NaN do not always work as expected, so there is more than one method for doing so in native javaScript alone. In addition an isNaN method is often a usual suspect in many javaScript utility libraries,[Lodash has an isNan method](https://lodash.com/docs/4.17.15#isNaN) for example.

## 6 - Conclusion

So that is it for now when it comes to assignment, equality, and identity in javaScript. First off there is finding out of you just want to assign a value to something, for that there is just using = and that is all there is to it. Things only get a little involved when it comes to making comparisons between two values in an expresion that will evaluate to true of false.



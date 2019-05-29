---
title: Operator precedence AKA order of operations in javaScript
date: 2019-02-02 20:53:00
tags: [js]
layout: post
categories: js
id: 371
updated: 2019-05-28 22:14:46
version: 1.15
---

When writing javaScript expressions knowing the order in which operations is important to make sure that desired results will always be achieved. So [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) or just simply the order of operations in javaScript is the order in which operations are preformed and in this post I will be covering some of the basics with this.

<!-- more -->

## 1 - Order of operations basics in javaScript

With operators some operators have higher precedence than others. For example multiplication has higher precedence than addition. So if an expression contains addition first and then multiplication from left to right, the multiplication operation will be preformed first and then the addition. If for some reason I want the addition to happen first in can use parentheses to achieve that.

```js
console.log( 10 + 5 * 2 ); // 20
console.log( (10 + 5) * 2 ); // 30
```

So there is the questing of what operators are preformed first, and the direction in which they are preformed as well which is called Associativity. To know if grouping with parentheses is really needed or not it is just a matter of know what comes first with operations

## 2 - Associativity of operators

So Associativity is the direction in which operations are preformed such as left to right, or right to left. Operators like addition, subtraction and so forth have left to right associativity. However other operators such as the assignment, and logical not operator have right to left Associativity.

```js
var a = 5 - 2;
var b = 2 - 5;
 
console.log(a,b); // 3 -3
```

Here subtraction is an example of left to right associativity.

## 3 - Grouping - Precedence 20 ( highest, prefromed first)

Parentheses in javaScript are used to make function calls, however they also have another purpose when it comes to grouping an expression. In other words a pare of parentheses is considered a so called [grouping operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping), and when it comes to authoring any kind of expression in javaScript this grouping operator has the highest Operator precedence of all the available operators in javaScript.

```js
let a = !0 + 1 * 5,
b = !(0 + 1) * 5;
 
console.log(a, b); // 6 0
```

No matter what else is going on anything inside the parentheses or grouping if you prefer will be preformed first.

## 4 - Logical Or - Precedence 5

So logical or operators have left to right associativity. In addition of anything that comes along evaluates to true that will be the value of the expression any any additional parts will not effect the result. This effect is desirable in many situations as such it is often used as a way to feature test, and create poly fills.

```js
// left to right Associativity
var a = 0,
b = 1,
c = 42,
d = a || b || c;
 
console.log(d); // 1
 
var e = 5 * 0 || 3,
f = 5 * (0 || 3);
 
console.log(e); // 3
console.log(f); // 15
```

## 5 - Conditional - Precedence 4

I often seen Conditional operators used in expressions. When using them any expression that comes first will typically be preformed first because just about all other operators typically used to write expressions have higher precedence.

```js
let a = 10;
console.log(  a > 5 ? true : false ); // true
console.log(  a * 2 > 5 ? 1 : 0 ); // 1
console.log(  a * (2 > 5) ? 1 : 0 ); // 0
```

## 6 - Assignment - Precedence 3

When it comes to the order of operations in javaScript the assignment operator is fairly low on the list. So low in fact that for most expressions it will be preformed last. The only operators that are even lower are the yield and Comma operators which I can not say I use much when it comes to expressions.

```js
let b = 40;
 
// assignment has right to left Associativity
let a = b = 5;
console.log(a); // 5
console.log(b); // 5
 
// just about everything else is preformed first
let c = -1;
let d = (4 + 5 * 2) / 2 - 7 || 3 + --c;
console.log(d); // 1
```
---
title: Operator precedence AKA order of operations in javaScript
date: 2019-02-02 20:53:00
tags: [js]
layout: post
categories: js
id: 371
updated: 2019-08-12 11:51:23
version: 1.22
---

When writing javaScript expressions knowing the order in which operations are preformed is important to make sure that desired results will always be achieved. Each type of operator has a kind of precedence or level of importance compared to others, for example multiplication is always preformed before addition. So then in javaScript [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence), or just simply the order of operations in which operations are preformed is something that a javaScript developer should have a solid grasp on as it will come up when writing expressions. In this post I will be going over many examples of this that should help with gaining at least a basic understanding of order of operations, associativity, and maybe some other little things here and there when it comes to writing expressions and functions.

<!-- more -->

## 1 - Order of operations basics in javaScript

So lets start out with some very simple examples of order of operations in javaScript, then cover some more complex real examples later in this post. That being said if an expression contains addition first and then multiplication from left to right, then the multiplication operation will be preformed first and then the addition. The reason why is because multiplication and division have a higher precedence value then that of addition and subtraction. If for some reason I want the addition to happen first then I  will want to use parentheses or group operators to achieve just that. The reason why is because parentheses have the highest precedence value of all when it comes to the order of how operations are preformed with javaScript expressions.

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

### 3.1 - Grouping - Precedence 20 ( highest, prefromed first)

Parentheses in javaScript are used to make function calls, however they also have another purpose when it comes to grouping an expression. In other words a pare of parentheses is considered a so called [grouping operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Grouping), and when it comes to authoring any kind of expression in javaScript this grouping operator has the highest Operator precedence of all the available operators in javaScript.

```js
let a = !0 + 1 * 5,
b = !(0 + 1) * 5;
 
console.log(a, b); // 6 0
```

No matter what else is going on anything inside the parentheses or grouping if you prefer will be preformed first.

### 3.2 - Logical Or - Precedence 5

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

### 3.3 - Conditional - Precedence 4

I often seen Conditional operators used in expressions. When using them any expression that comes first will typically be preformed first because just about all other operators typically used to write expressions have higher precedence.

```js
let a = 10;
console.log(  a > 5 ? true : false ); // true
console.log(  a * 2 > 5 ? 1 : 0 ); // 1
console.log(  a * (2 > 5) ? 1 : 0 ); // 0
```

### 3.4 - Assignment - Precedence 3

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

## 4 - javaScript order of operations examples

So now that we know the basics when it comes to order of operations in javaScript lets take a look at some actual code examples when it comes to some lengthly expressions with more than one operator.

### 4.1 - Estimating income example

Say you want to estimate the amount of money that you might make for a blog post if you manage to rank at the top of a search engine result page. You know the score that a keyword of interest gets relative to a compare keyword to which you know the average money traffic. You also know what is average when it comes to click threw rates for the first position, second position and so forth, and also your average page revenue per mille.

So in order to figure estimates for amount of money you might make for each rang position you will need to work out some kind of lengthly expression and use that in a function in which you pass arguments for all of this.

So you might end up with something like this:

```js
let pageMoney = (s, c, ct, ctr, rpm) => {
    return s / c * ct * ctr * rpm;
};

let ctrRates = [0.8, 0.1, 0.05, 0.025];
ctrRates.forEach((ctr, i) => {
    console.log(i + 1, '$' + pageMoney(50, 36, 6.5, ctr, 1.6).toFixed(2));
});
// 1 $11.56
// 2 $1.44
// 3 $0.72
// 4 $0.36
```

So getting back to the subject of this post the expression that is used in the pageMoney function is composed of operators that are all division and multiplication, both of which have the same operator precedence, as well as associativity. So for this expression the operations are just simply preformed from left to right.
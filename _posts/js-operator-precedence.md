---
title: Operator precedence AKA order of operations in javaScript
date: 2019-02-02 20:53:00
tags: [js]
layout: post
categories: js
id: 371
updated: 2019-02-09 18:18:52
version: 1.6
---

When writing javaScript expressions knowing the order in which operations is important to make sure that desired results will always be achieved. So [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) or just simply the order of operations in javaScript is the order in which operations are preformed and in this post I will be covering some of the basics with this.

<!-- more -->

## 1 - Order of operations basics in javaScript

With operators some operators have higher precedence than others. For example multiplication has higher precedence than addition. So if an expression contains addition first and then multiplication from left to right, the multiplication operation will be preformed first and then the addition. If for some reason I want the addition to happen first in can use parentheses to achieve that.

```js
console.log( 10 + 5 * 2 ); // 20
console.log( (10 + 5) * 2 ); // 30
```

So there is the questing of what operators are preformed first, and the direction in which they are preformed as well which is called Associativity.

## 2 - Associativity of operators

So Associativity is the direction in which operations are preformed such as left to right, or right to left. Operators like addition, subtraction and so forth have left to right associativity. However other operators such as the assignment, and new operator have right to left Associativity.
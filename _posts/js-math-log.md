---
title: Math log javaScript
date: 2018-12-26 19:08:00
tags: [js]
layout: post
categories: js
id: 350
updated: 2018-12-26 19:51:46
version: 1.3
---

In some situtaions the Math.log method will need to be used to resolve certian problems that call for the use of such a methiod. Its possible that you have all ready come accross the method when it comes to taking adavnatage of the mnay copy and paste jaavScript solutions that existe on stack overflow and random sites such as this. However for whatever the reason maybe you wish to know more about it, and other examples of its use so lets take a deeper look at Math.log today.

<!-- more -->

## 1 - The natural logarithm

So in javaScript the Math.log method with return an exponent that when used with the Matmatical constant E in a Math.pow opertaion will result in that number.

```js
console.log(Math.pow(Math.E,Math.log(1000))); // 999.99...
```

So if I ever get into a situation in which I know a number, and a base, and want to know the exponent that will result in the number when the exponent is used with the mase using Math.pow then a solution will likley involve the use of Math.log. The only problem is that the Math.log method only excepts one argument that is the number, and there is no way to set a base other than the Math.E constant.

## 2 - Getting the exponent of a number when the base is known

So one of the most comment use case examples of Math.log is to use it to get the exponent of a number when the base is known. By default Math.log will return the exponent of the given number relative to the base of the mattmatical constant known as e. However it is not to hard to chnage that base to something else, to do that I just need to divide the result of Math.log(num) over Math.log(base).

```js
var getExp = function(num, base){
    return Math.log(num) / Math.log(base);
};
 
var exp = getExp(1000,10);
 
console.log(exp); // 2.99...
 
console.log(Math.pow(10,exp)); // 999.99...
```


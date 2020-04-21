---
title: Math log javaScript
date: 2018-12-26 19:08:00
tags: [js]
layout: post
categories: js
id: 350
updated: 2020-04-21 09:39:12
version: 1.7
---

In some situations the [Math.log](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log) method will need to be used to resolve certain problems that call for the use of such a method. This Math object method will return the [Natural_logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) of the number that is given to it as the first argument.

Its possible that you have all ready come across the method when it comes to taking advantage of the many copy and paste jaavScript solutions that exist on stack overflow and random sites such as this. However for whatever the reason maybe you wish to know more about it, and other examples of its use so lets take a deeper look at Math.log today.

<!-- more -->

## 1 - The natural logarithm

So in javaScript the Math.log method with return an exponent that when used with the Mathematical constant E in a Math.pow operation will result in that number. This is known as a [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm).

```js
console.log(Math.pow(Math.E,Math.log(1000))); // 999.99...
```

So if I ever get into a situation in which I know a number, and a base, and want to know the exponent that will result in the number when the exponent is used with the base using Math.pow then a solution will likely involve the use of Math.log. The only problem is that the Math.log method only excepts one argument that is the number, and there is no way to set a base other than the Math.E constant.

## 2 - Getting the exponent of a number when the base is known

So one of the most comment use case examples of Math.log is to use it to get the exponent of a number when the base is known. By default Math.log will return the exponent of the given number relative to the base of the mathematical constant known as e. However it is not to hard to change that base to something else, to do that I just need to divide the result of Math.log(num) over Math.log(base).

```js
var getExp = function(num, base){
    return Math.log(num) / Math.log(base);
};
 
var exp = getExp(1000,10);
 
console.log(exp); // 2.99...
 
console.log(Math.pow(10,exp)); // 999.99...
```

So then when it comes to getting a number that is result of a base raised to the exponent of that base there is Math.pow, but when it comes to doing the inverse of this, there is Math.log.


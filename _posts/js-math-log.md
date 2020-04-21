---
title: Math log javaScript
date: 2018-12-26 19:08:00
tags: [js]
layout: post
categories: js
id: 350
updated: 2020-04-21 10:20:48
version: 1.13
---

In some situations the [Math.log](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log) method will need to be used to resolve certain problems that call for the use of such a method. This Math object method will return the [Natural_logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) of the number that is given to it as the first argument.

Its possible that you have all ready come across the method when it comes to taking advantage of the many copy and paste jaavScript solutions that exist on stack overflow and random sites such as this. However for whatever the reason maybe you wish to know more about it, and other examples of its use so lets take a deeper look at Math.log today.

<!-- more -->

## 1 - The natural logarithm

So in javaScript the Math.log method with return an exponent that when used with the Mathematical constant E  as a base in a Math.pow method call should result in that number, or at least something near it because of floating-point rounding. This is known as a [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm). Another

```js

// the value of number (a)
var a = 1000,
// The math log of (a) returns the power (p) 
// that will result in (a) when used with Math.pow where
// Math.E is the base
p = Math.log(a), 
b = Math.pow( Math.E, p);

console.log(a); // 1000
console.log(p); // 6.907755278982137
console.log(b); // 999.9999999999994

```

So if I ever get into a situation in which I know a number, and a base, and want to know the exponent that will result in the number when the exponent is used with the base using Math.pow then a solution will likely involve the use of Math.log. The only problem is that the Math.log method only excepts one argument that is the number, and there is no way to set a base other than the Math.E constant at least with the Math.log method anyway. There are of course other options in the Math object, and there are also ways of doing simple operations and expressions to get whatever kind of value that you need.

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

## 3 - Conclusion

So the Math.log method in the javaScript Math object is the first go to method that I will be using when I am in a situation where I want to find out the exponent of a number from a given base when I know the base and the result. The Math log method can be used to find an exponent in most situations as i ahve found thus far.

There are of course other options though such as the [Math.log10](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10), and [Math.log2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2) methods. Of course it should go without saying that a javaScript developer should be aware of the [Math.log](/2019/12/10/js-math-pow/) method also when it comes to situations in which that method needs to be used when working out an expression.

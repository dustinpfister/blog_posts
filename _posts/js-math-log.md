---
title: Math log javaScript
date: 2018-12-26 19:08:00
tags: [js]
layout: post
categories: js
id: 350
updated: 2021-08-30 16:16:46
version: 1.25
---

In some situations the [Math.log](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log) method will need to be used to resolve certain problems that call for the use of such a method. This Math.log method of the main javaScript Math object will return the [Natural_logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) of the number that is given to it as the first argument. 

It is possible that you have all ready come across the method when it comes to taking advantage of the many copy and paste javaScript solutions that exist on stack overflow and random sites such as this. However for whatever the reason maybe you wish to know more about it, and at least a few examples of its use so lets take a deeper look at Math.log today.

<!-- more -->

## 1 - The natural logarithm

So in javaScript the Math.log method will return an exponent that when used with the Mathematical constant E as a base in a Math.pow method call should result in that number, or at least something near it because of floating-point rounding. This is known as a [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm). So say I have a value like 1000, and I pass that value to Math.log, the result will be something like 9.90..., which I could then sore in a variable called p. I can then take this p value and pass it to Math.log, using Math.E as the base, and the returned value of that would be close to the original value of 1000.

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

So just calling the method and passing some numbers to it to get a result is one thing, but in order to get a real hold on why this method is useful it is required to get into at least a few actually use case examples. So for the rest of this post I will be touching base on at least a few of these, and then link to some additional posts in which I am writing about actually projects that make use of the Math.log method.

## 2 - Getting the exponent of a number when the base is known

So if I ever get into a situation in which I know a number, and a base, and want to know the exponent that will result in the number when the exponent is used with the base using Math.pow then a solution will likely involve the use of Math.log. The only problem is that the Math.log method only excepts one argument that is the number, and there is no way to set a base other than the Math.E constant at least with the Math.log method anyway. There are of course other options in the Math object, and there are also ways of doing simple operations and expressions to get whatever kind of value that you need.

However it is possible to work out a simple expression that can be used to get an exponent of a number when it is just the base that is known with just Math.log, and this is one of the most important actual use case examples that seems to come up often so lets touch base on this one then. By default Math.log will return the exponent of the given number relative to the base of the mathematical constant known as e. However it is not to hard to change that base to something else, to do that I just need to divide the result of Math.log(num) over Math.log(base).

```js
var getExp = function(num, base){
    return Math.log(num) / Math.log(base);
};
 
var exp = getExp(1000,10);
 
console.log(exp); // 2.99...
 
console.log(Math.pow(10,exp)); // 999.99...
```

So then when it comes to getting a number that is result of a base raised to the exponent of that base there is Math.pow, but when it comes to doing the inverse of this, there is Math.log.

## 3 - Values table example and getting a better idea of what the deal is with Math.log, and Math.pow

So maybe the best way to get a better understanding of Math.log and how it relates to Math.pow would involve just getting into making some examples of its use. It would be best to experiment with your own examples and learn by doing, however I guess I can write about some examples of my own that should help as a starting point of sorts to learn more about Math.log and why it can be useful when working out certain expressions.

So for this section I will be writing about a simple javaScript example that creates a table that is an array of objects where each object contains values for each exponent value from a given base, starting exponent and ending exponent. The properties for each object will be the current exponent value, the base, the power of the base to the exponent, the result of Math.log\(power\), and the result of Math.log\(power\) / Math.log\(base\) which should equal the current exponent value or be near it.

```js
var createValuesTable = function (base, eStart, eEnd) {
 
    base = base === undefined ? 2 : base;
    eStart = eStart === undefined ? 1 : eStart;
    eEnd = eEnd === undefined ? 10 : eEnd;
 
    var e = eStart,
    table = [],
    p;
    while (e < eEnd) {
        p = Math.pow(base, e);
        table.push({
            e: e,
            b: base,
            p: p,
            log_p: Math.log(p),
            log_p_b: Math.log(p) / Math.log(base)
        })
        e += 1;
    }
    return table;
};
 
var table = createValuesTable(2, 1, 10);
console.log(table);
// [ { e: 1, b: 2, p: 2, log_p: 0.6931471805599453, log_p_b: 1 },
//   { e: 2, b: 2, p: 4, log_p: 1.3862943611198906, log_p_b: 2 },
//   { e: 3, b: 2, p: 8, log_p: 2.0794415416798357, log_p_b: 3 },
//   { e: 4, b: 2, p: 16, log_p: 2.772588722239781, log_p_b: 4 },
//   { e: 5, b: 2, p: 32, log_p: 3.4657359027997265, log_p_b: 5 },
//   { e: 6, b: 2, p: 64, log_p: 4.1588830833596715, log_p_b: 6 },
//   { e: 7, b: 2, p: 128, log_p: 4.852030263919617, log_p_b: 7 },
//   { e: 8, b: 2, p: 256, log_p: 5.545177444479562, log_p_b: 8 },
//   { e: 9, b: 2, p: 512, log_p: 6.238324625039508, log_p_b: 9 } ]
```

So this helps to get a good idea of a use for the Math.log method. In a situation in which you know the base \(b\), and the power \(p\) but do not know the exponent \(e\) then the Math.log method can be used to find the exponent \(e\).

## 4 - Percent values

When I am working out logic for some kind of canvas project that is a game, animation of anything to that effect I often find myself working with a value that will go from zero to one. Often these values are the result of a index value the is divided over a max value, as a result the nature of the percent value is one that goes up in a straight line kind of way. So this prompted me to look into ways to go about making such values not so linear in nature, and of course the Math.log method is one way ti go about doing so.

```js
var genPerValues = function (n, d, base) {
    var per = n / d;
    base = base || 2;
    return {
        per: per,
        perLog: Math.log(1 + per * (base - 1)) / Math.log(base)
    }
};
 
var a = genPerValues(25, 50, 2);
console.log(a.per);
console.log(a.perLog);
// 0.5
// 0.5849625007211562
 
var a = genPerValues(25, 50, 16);
console.log(a.per);
console.log(a.perLog);
// 0.5
// 0.7718657103125849
```

## 5 - Conclusion

So the Math.log method in the javaScript Math object is the first go to method that I will be using when I am in a situation where I want to find out the exponent of a number from a given base when I know the base and the result. The Math log method can be used to find an exponent in most situations as I have found thus far, but there are also many other uses that come to mind fro the Math log method also that I have not covered in this post.

I have made a [canvas example that has to do with using the Math.log](/2020/08/08/canvas-example-percent-math-log/) method to create a percent value that goes up from zero to one in a logarithmic kind of way from another percent value the goes up in a linear kind of way. It might be best to just go and see the canvas example for yourself to get a better sense of what I am writing about. I have also made a few javaScript example posts one of which has to do with [working out an experience point system](/2020/04/27/js-javascript-example-exp-system/), and also yet another one that make used of [other methods to set the position of display objects](/2020/08/10/js-javascript-example-zig-zag-arc/). All of these posts are of course just examples of me just scratching the surface when it comes to practical application of the Math.log method, and it might be best of course to work out some of your own examples to help learn by doing and discover yet even more applications.

There are of course other options though such as the [Math.log10](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10), and [Math.log2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2) methods. Of course it should go without saying that a javaScript developer should be aware of the [Math.pow](/2019/12/10/js-math-pow/) method also when it comes to situations in which that method needs to be used when working out an expression.

---
title: Long division and javaScript
date: 2020-02-07 22:35:00
tags: [js]
layout: post
categories: js
id: 608
updated: 2020-02-14 10:28:09
version: 1.9
---

[Long division](https://en.wikipedia.org/wiki/Long_division) is one of those things that as an adult I might forget how to do, but of course it is not so hard to get back up to speed with again by just sting down and doing it again it is elementary school level math after all. However often coming up with a javaScript solution to replicate the process of long division is not so elementary. Solutions for doing so can often work okay, but might not work out as well as I might like.

The main reason why I might take the time to look into solutions for long division is because I am working on some kind of project where I am running into problems with respect to the limits of javaScript numbers. Thankfully there is now native BigInt support in core javaScript by itself, and there is also the Big-Integer user space library that can be used as a poly fill for that. So in most cases I would want to just make use of that and move on with my project in that case. However when it comes to becoming a better programmer just copying and pasting code without taking the time to look into it deeper does not help with that does it.

<!-- more -->

## 1 - JavaScript Long Division solution ONE

So just quickly searching around fo solutions for log division I came across [this one here](https://bocoup.com/blog/long-division-in-javascript) that I just hacked over a little, but left largely unchanged.

```js
var div = function (n, d) {
    var num = String(n),
    numLength = num.length,
    remainder = 0,
    answer = '',
    i = 0;
    while (i < numLength + 3) {
        var digit = i < numLength ? parseInt(num[i]) : 0;
        if (i == numLength) {
            answer = answer + ".";
        }
        answer = answer + Math.floor((digit + (remainder * 10)) / d);
        remainder = (digit + (remainder * 10)) % d;
        i++;
    }
    return answer;
}
 
console.log(div('10', '2'));
```

It seems to work okay but there is one little problem, it is still just straight up divining by the given divisor in the line in which it is tabulating an answer on a per digit basis. So this does not help when it comes to working with a very rage divisor that extends beyond the limits of javaScript numbers.

## 2 - Taking a look at the divRem method in javascript-biginteger by silentmatt

There is [javascript-biginteger](https://github.com/silentmatt/javascript-biginteger) by Matthew Crumley aka [silentmatt on github](https://github.com/silentmatt). The below code example is the division methods from that project, it will not work by itself as a copy and past solution like the above example as it needs a lot of the methods that are part of the larger dependency that creates a big integer class. 

```js
BigInteger.prototype.divRem = function (n) {
    n = BigInteger(n);
    if (n._s === 0) {
        throw new Error("Divide by zero");
    }
    if (this._s === 0) {
        return [ZERO, ZERO];
    }
    if (n._d.length === 1) {
        return this.divRemSmall(n._s * n._d[0]);
    }
 
    // Test for easy cases -- |n1| <= |n2|
    switch (this.compareAbs(n)) {
    case 0: // n1 == n2
        return [this._s === n._s ? ONE : M_ONE, ZERO];
    case -1: // |n1| < |n2|
        return [ZERO, this];
    }
 
    var sign = this._s * n._s;
    var a = n.abs();
    var b_digits = this._d;
    var b_index = b_digits.length;
    var digits = n._d.length;
    var quot = [];
    var guess;
 
    var part = new BigInteger([], 0, CONSTRUCT);
    while (b_index) {
        part._d.unshift(b_digits[--b_index]);
        part = new BigInteger(part._d, 1, CONSTRUCT);
 
        if (part.compareAbs(n) < 0) {
            quot.push(0);
            continue;
        }
        if (part._s === 0) {
            guess = 0;
        } else {
            var xlen = part._d.length,
            ylen = a._d.length;
            var highx = part._d[xlen - 1] * BigInteger_base + part._d[xlen - 2];
            var highy = a._d[ylen - 1] * BigInteger_base + a._d[ylen - 2];
            if (part._d.length > a._d.length) {
                // The length of part._d can either match a._d length,
                // or exceed it by one.
                highx = (highx + 1) * BigInteger_base;
            }
            guess = Math.ceil(highx / highy);
        }
        do {
            var check = a.multiplySingleDigit(guess);
            if (check.compareAbs(part) <= 0) {
                break;
            }
            guess--;
        } while (guess);
 
        quot.push(guess);
        if (!guess) {
            continue;
        }
        var diff = part.subtract(check);
        part._d = diff._d.slice();
    }
 
    return [new BigInteger(quot.reverse(), sign, CONSTRUCT),
        new BigInteger(part._d, this._s, CONSTRUCT)];
};
```

This is of course just a small section of the dependency where the division is going on actually. The over all solution is far more complicated then, but it works way better. I can divide large numbers without a loss of precision because regular javaScript numbers are just being used to preform simple operations on a per digit basis for both numbers used in division.
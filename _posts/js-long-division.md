---
title: Long division and javaScript
date: 2020-02-07 22:35:00
tags: [js]
layout: post
categories: js
id: 608
updated: 2020-02-08 08:31:40
version: 1.6
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
---
title: Long division and javaScript
date: 2020-02-07 22:35:00
tags: [js]
layout: post
categories: js
id: 608
updated: 2020-02-08 08:18:38
version: 1.1
---

Long division is one of those things that as an adult I might forget how to do, but of course it is not so hard to get back up to speed with again by just sting down and doing it again it is elementary school level math after all. However often coming up with a javaScript solution to replicate the process of long division is not so elementary.

<!-- more -->

## 1 - JavaScript Long Division example

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
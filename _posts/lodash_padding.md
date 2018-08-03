---
title: The lodash _.pad, _.padStart, and _.padEnd methods for padding strings in javaScript.
date: 2018-08-03 15:20:00
tags: [js,lodash]
layout: post
categories: lodash
id: 247
updated: 2018-08-03 18:22:39
version: 1.1
---

So today I will be putting togeather another quick post on [lodash](https://lodash.com/) and corresponding vanilla js alternatives when it comes to the process of quickly padding strings. With lodash there is [\_.pad](https://lodash.com/docs/4.17.10#pad), [\_.padStart](https://lodash.com/docs/4.17.10#padStart), and [\_.padEnd](https://lodash.com/docs/4.17.10#padEnd) that can be used to make quick work of this with lodash, if lodash is part of the stack, but I will be looking at some other options as well.

<!-- more -->

## 1 - what to know before hand

This is a post on the lodash padding methods \_.pad, \_.pasStart, and \_.padEnd, as well as string padding in general. It is not a getting started post on lodash, and javaScript in general, so I assume you have at least some background with this.

## 2 - Some padding examples using lodash methods

### 2.1 - Account number example

```js
let an = 1503345;
 
console.log(_.pad(an,10,'0'));      // 0150334500
console.log(_.padEnd(an,10,'0'));   // 1503345000
console.log(_.padStart(an,10,'0')); // 0001503345
```

### 2.2 - A format money example

```js
let format = (m) => {
    // round, and clamp the number. Then split and find dollars and cents
    let sp = _.split(_.round(_.clamp(m, 0, 9999.99), 2), '.'),
    dollars = _.padStart(sp[0], 4, '0'),
    cents = _.padEnd(sp[1] || 0, 2, '0');
 
    return '$' + dollars + '.' + cents;
 
};
 
console.log( format(Infinity) ); // $9999.99
console.log( format(.005) ); // $0000.01
console.log( format(1234.56) ); // $1234.56
console.log( format(0) ); // $0000.00
```

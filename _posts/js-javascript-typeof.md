---
title: javaScript typeof operator
date: 2019-02-15 12:08:00
tags: [js]
layout: post
categories: js
id: 383
updated: 2019-02-15 19:02:09
version: 1.3
---

The javaScript typeof operator will return a string that is the type of the operand that is given to it from the right of the typeof keyword when used. The typeof operator might not always give the desired results, so there are some other keywords, as well as additional properties of objects in javaScript that can be used to gain some insight into what you are dealing with.

<!-- more -->

## 1 - javaScript typeof lowdown

The typeof operator has right to level associativity so to use it I just need to type the typeof operator followed by what it is that I want to find the type of. For the most part the typeof operator is fairly straights forward to use but it has a few quirks, so lets get into it.

```js
let ty = typeof 42;
console.log(ty); // 'number'
``` 

## 4 - no need to call typeof as it is an operator

In some examples I see new javaScript developers placing parentheses around what it is that they want to find the type of. This is not necessary as the typeof operator is an operator and not a function. However in some cases you might still want to use parentheses as a way to group an expression as you might get undesired results.

```js
let str = typeof 6 + '7';
console.log(str); // 'number7'
 
let n = typeof (6 + '7');
console.log(n); // 'string'
```

So if you do need to group then use parentheses otherwise they are not needed.
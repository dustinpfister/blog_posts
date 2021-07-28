---
title: Diminishing returns functions in javaScript
date: 2021-07-28 18:58:00
tags: [js]
layout: post
categories: js
id: 920
updated: 2021-07-28 19:12:30
version: 1.3
---

This week I have been expanding on the topic of [functions in javaScript](/2019/12/26/js-function/), and many various topics that might come up when making a game. One thing that I have run into now and then is the topic of making some kind of [diminishing returns function](https://stackoverflow.com/questions/2813621/how-do-you-create-a-formula-that-has-diminishing-returns) that is involved in creating attribute values when creating some kind of upgrade system.

<!-- more -->


## 1 - Basic diminishing returns function examples

### 1.1 - Just divide 1 over n + 1 and subtract that from 1

```js
var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};
 
console.log(dimReturn(0));   // 0
console.log(dimReturn(0.5)); // 0.33333333333333337
console.log(dimReturn(5));   // 0.8333333333333334
console.log(dimReturn(50));  // 0.9803921568627451
console.log(dimReturn(500)); // 0.998003992015968
```

### 1.2 - More or less the same expression but have another value that will effect the rate

```js
var dimReturn2 = function (n, a) {
    return 1 - 1 / (n / a + 1);
};
 
console.log(dimReturn2(0, 500));     // 0
console.log(dimReturn2(0.5, 500));   // 0.0009990009990008542
console.log(dimReturn2(5, 500));     // 0.00990099009900991
console.log(dimReturn2(50, 500));    // 0.09090909090909094
console.log(dimReturn2(500, 500));   // 0.5
 
console.log(dimReturn2(10000, 500)); // 0.9523809523809523
```

## 2 - Some use case examples

### 2.1 - Setting an attack value for an attribute

```js
var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};
 
var getAttackValue = function (baseValue, skillBonus, skillPoints) {
    return parseFloat((baseValue + skillBonus * dimReturn(skillPoints)).toFixed(2));
};
 
console.log( getAttackValue(10, 25, 0) ); // 10
console.log( getAttackValue(10, 25, 5) ); // 30.83
console.log( getAttackValue(10, 25, 100) ); // 34.75
console.log( getAttackValue(10, 25, 5000) ); // 35
```

## 3 - Conclusion


---
title: One to one functions in javaScript
date: 2021-07-30 19:23:00
tags: [js]
layout: post
categories: js
id: 922
updated: 2021-07-31 10:37:54
version: 1.2
---

This wraps up this week on writing more about writing [functions in javaScript](/2019/12/26/js-function/), much of which had to do with writing functions in general actually. One post that I wrote recently was on the topic of [monotonic functions](/2021/07/26/js-function-monotonic/), however there is one general type of monotonic function that stands out for me and that is a strictly increasing monotonic function. 

<!-- more -->


## 1 -

```js
var getY = function(x){
    return x * 5;
};
 
// say I have a domain like this
var domain = [1, 2, 3, 4, 5, 6];
// I can use array map to create a codomain
// so that I now have a y value for every value of x
var coDomain = domain.map(getY);
console.log(coDomain);
// [ 5, 10, 15, 20, 25, 30 ]
```

## 2 -

```js
// get y if x is known
var getY = function(x){
    return x * 5;
};
// get x if y is known
var getX = function(y){
    return y / 5;
};
 
var a = [1,2,3,4,5].map(getY);
console.log(a);
 
var b = a.map(getX);
console.log(b);
```

## 3 - 

```js
// get exp to the given level with given current_level and xp
var getXP = function (level, deltaNext) {
    return ((Math.pow(level, 2) - level) * deltaNext) / 2;
};
// set level with given xp
var getLevel = function (xp, deltaNext) {
    return (1 + Math.sqrt(1 + 8 * xp / deltaNext)) / 2;
};
 
var level = 1,
results = [],
cap = 10;
while (level <= cap) {
    var xp = getXP(level, 100);
    results.push({
        level: level,
        getXPResult: xp,
        getLevelResult: getLevel(xp, 100)
    });
    level += 1;
}
console.log(results);
/*
[ { level: 1, getXPResult: 0, getLevelResult: 1 },
  { level: 2, getXPResult: 100, getLevelResult: 2 },
  { level: 3, getXPResult: 300, getLevelResult: 3 },
  { level: 4, getXPResult: 600, getLevelResult: 4 },
  { level: 5, getXPResult: 1000, getLevelResult: 5 },
  { level: 6, getXPResult: 1500, getLevelResult: 6 },
  { level: 7, getXPResult: 2100, getLevelResult: 7 },
  { level: 8, getXPResult: 2800, getLevelResult: 8 },
  { level: 9, getXPResult: 3600, getLevelResult: 9 },
  { level: 10, getXPResult: 4500, getLevelResult: 10 } ]
*/
```

## 4 - Conclusion


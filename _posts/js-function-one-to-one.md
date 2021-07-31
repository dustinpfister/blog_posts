---
title: One to one functions in javaScript
date: 2021-07-30 19:23:00
tags: [js]
layout: post
categories: js
id: 922
updated: 2021-07-31 11:30:18
version: 1.14
---

This wraps up this week on writing more about authoring [functions in javaScript](/2019/12/26/js-function/), much of which had to do with writing functions in general actually rather than specifics of why they are written in javaScript alone. In one post I touched base on the topic of [function domain](/2021/07/27/js-function-domain/) which is a term for the full range of possibles when it comes to the range of arguments that can be passed to a function. Another post that I wrote recently was on the topic of [monotonic functions](/2021/07/26/js-function-monotonic/) which are functions that have to do with increasing return values as an argument approaches positive infinity. That is that a function is increasing monotonic if the return value stays the same or goes up as a x argument approaches positive infinity. There are a number of other terms with monotonic functions thorough that have to do with decreasing values also though.

However there is one general type of monotonic function that stands out for me and that is a strictly increasing monotonic function, which can be thought of as an example of a [one to one function](https://www.varsitytutors.com/hotmath/hotmath_help/topics/one-to-one-functions) which stands out from other kinds of monotonic functions some of which can be [many to one](/2021/07/29/js-function-many-to-one/). So it would seem that the term monotonic refers to several kinds of functions some of which can be many to one style functions, however some such as strictly increasing monotonic functions are very much one to one. In this post I will be focusing mainly on the topic of one to one functions which interest me when it comes to the topic of making an [experience point system](/2020/04/27/js-javascript-example-exp-system/).

<!-- more -->


## 1 - The basics of monotonic functions

Say I have a get y function that will return a y value and takes one argument that is called x, and in the body of this function I am just multiplying the given x value by 5. This is then a very basic example of a strictly increasing monotonic function, and on top of that it is also one to one. The reason why is because for every given x value there is a unique y value that is returned. This differs from functions that are many to one where there may be more than one value for x that will return the same y value.

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

## 2 - Creating an inverse of a one to one function

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

## 3 - An experience point system example

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


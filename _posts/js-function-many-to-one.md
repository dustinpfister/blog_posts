---
title: Many to one functions in javaScript
date: 2021-07-29 14:36:00
tags: [js]
layout: post
categories: js
id: 921
updated: 2021-07-29 14:47:06
version: 1.3
---

This week I have been looking more into writing [functions in javaScript](/2019/12/26/js-function/), and as such I have also touched base on many topics that have to do with functions in general. One such topic is knowing what a [many to one function is compared to a one to one function](https://www.quora.com/What-are-one-to-one-and-many-to-one-functions), along with many other topics such as what an independent variable is compared to a dependent variable, and what function domain and co domain is. These are all topics that have to do with functions in javaScript, but also functions in any language for that matter actually.

So in todays post I will be focusing mostly on what a [many to one function is](https://mathworld.wolfram.com/Many-to-One.html), which may some times also be freed to as a [surjective function](https://en.wikipedia.org/wiki/Surjective_function).

<!-- more -->

## 1 - basic example of many to one funciton

```js
var dSin = function(d){
    return Math.sin(Math.PI / 180 * d);
};
// two values for the independent variable d
// will result in the same dependent value being returned
console.log( dSin(90) );  // 1
console.log( dSin(450) ); // 1
```

## 2 - Conclusion


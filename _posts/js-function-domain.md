---
title: The domain of a function in javaScript
date: 2021-07-27 16:52:00
tags: [js]
layout: post
categories: js
id: 919
updated: 2021-07-27 18:24:24
version: 1.2
---

When getting into writing [functions in javaScript](/2019/12/26/js-function/) there are the things that have to do with how functions work in javaScript, but then there are all kinds of things that have to do with functions in general. That is things that do not just apply to functions in javaScript, but any language for that matter. With that said todays post is on the subject of the domain of a function in javaScript.

<!-- more -->

## 1 - Basics of function domain in javaScript

### 1.1 - creating a function domain

```js
// create a domain for a function
var createDomain = function(sx, ex, step){
    var x = sx,
    domain = [];
    while(x < ex){
        domain.push(x);
        x += step;
    }
    return domain;
};
// the function that I am cretaing a domain for.
var func1 = function(x){
   x = x < 0 ? 0: x;
   x = x > 10 ? 10 : x;
   return x / 10;
};
 
// cretaing an array for argumnets values that I
// will act as a domian
var domain = createDomain(0, 11, 1);
console.log(domain);
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
 
// I can now use array map with the function func1 
// to create an array or return values for the domain
console.log( domain.map(func1) );
// [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1 ]
```
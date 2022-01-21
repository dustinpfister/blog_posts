---
title: Chains and the lodash thru method
date: 2022-01-21 14:56:00
tags: [lodash]
layout: post
categories: lodash
id: 953
updated: 2022-01-21 14:59:12
version: 1.1
---

This will be a post on the lodash thru method that is one of several useful methods when working with a chain in lodash.

<!-- more -->


## 1 - Basics of the lodash thru method and also chaning in lodash


### 1.1 - Basic lodash thru example

```js
let a = _.chain(' abc ')
    .trim()
    .split('')
    .thru(function (a) {
        return {
            arr: a
        };
    })
    .value();
console.log(a);
// { arr: [ 'a', 'b', 'c' ] }
```
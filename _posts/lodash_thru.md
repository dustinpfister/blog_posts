---
title: Chains and the lodash thru method
date: 2022-01-21 14:56:00
tags: [lodash]
layout: post
categories: lodash
id: 953
updated: 2022-01-21 15:05:54
version: 1.3
---

This will be a post on the [lodash thru method](https://lodash.com/docs/4.17.15#thru) that is one of several useful methods when working with a chain in lodash. The other useful method to take into account would be the [lodash tap method](/2022/01/07/lodash_tap/) that I wrote a post on earlier this month as I take a moment to expand on lodash, and edit some older posts on the topic too while I am at it. There is also the question of how to even go about starting a chain in lodash to begin with, when it comes to that there is the main lodash function, as well as the [lodash chain method](/2018/11/11/lodash_chain/).

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
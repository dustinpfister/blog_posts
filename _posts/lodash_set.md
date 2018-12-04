---
title: Set object values with a path string in lodash with _.set
date: 2018-12-04 14:48:00
tags: [js,lodash]
layout: post
categories: lodash
id: 344
updated: 2018-12-04 16:56:43
version: 1.2
---

A few months ago I wrote a post on the \_.get method so for todays post on [lodash](https://lodash.com/) I might as well write one on [\_.set](https://lodash.com/docs/4.17.10#set) as well. The \_.set method works just like that of the \_.get method in lodash, only it can be used to set a propert rather than getting it.

<!-- more -->

## 2 - Basic \_.set example

```js
let enemy = {
 
    // enemy health
    health: {
        current: 80,
        max: 100,
        healRate: {
            active: false,
            perTick: 5
        }
    },
 
    // index values of targets
    targets: [2, 6, 8]
 
};
 
// a path
let path = 'health.healRate.active';
 
// set the value at path
_.set(enemy, path, true);
 
// get the value at path
console.log( _.get(enemy, path) ); // true
```
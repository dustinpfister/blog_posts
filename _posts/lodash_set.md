---
title: Set object values with a path string in lodash with _.set
date: 2018-12-04 14:48:00
tags: [js,lodash]
layout: post
categories: lodash
id: 344
updated: 2018-12-04 17:10:10
version: 1.4
---

A few months ago I wrote a post on the [\_.get](/2018/09/24/lodash_get/) method so for todays post on [lodash](https://lodash.com/) I might as well write one on [\_.set](https://lodash.com/docs/4.17.10#set) as well. The \_.set method works just like that of the \_.get method in lodash, only it can be used to set a propert rather than getting it.

<!-- more -->

## 1 - Basic \_.set example

The basic idea of \_.set is that a value can be set by just passing the object, and then a path in string format, followed by the value to set the property to.

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

It's not like setting a property of an object is all that hard without lodash, but this method allows for setting the value with a string format path which can be helpful in some situations. Another added benefit is that it can also be used to create paths in the event that they are not there as well.
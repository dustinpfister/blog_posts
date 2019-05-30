---
title: The lodash _.method method
date: 2019-05-30 11:50:00
tags: [lodash]
layout: post
categories: lodash
id: 467
updated: 2019-05-30 11:55:31
version: 1.1
---

The lodash _.method method can be used to call a method at a given path when used with another lodash method like _.map, or _.filter. This is one of the lesser known methods in lodash that I do not see myself using often, and if you are scratching your head wondering if this is a feature that makes lodash worth the hassle or not you have come to the right place.

<!-- more -->

## 1 - lodash _.method in range example

```js
let inRange = function(){
    return this.x < 9 && this.x >=0 
}
let points = [
    { pt: { x: -1, tester: inRange } },
    { pt: { x: 5, tester: inRange} },
    { pt: { x: 3, tester: inRange} },
    { pt: { x: 25, tester: inRange} },
];
let f = _.filter(points, _.method('pt.tester'));
let r = _.map(f, function(el){ return el.pt.x})
console.log(r); // [5, 3]
```

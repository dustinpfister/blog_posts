---
title: The lodash _.method method
date: 2019-05-30 11:50:00
tags: [lodash]
layout: post
categories: lodash
id: 467
updated: 2020-06-02 09:46:43
version: 1.6
---

The [lodash \_.method](https://lodash.com/docs/4.17.15#method) method can be used to call a method at a given path when used with another lodash method like \_.map, or _.filter. This is one of the lesser known methods in lodash that I do not see myself using often, and if you are scratching your head wondering if this is a feature that makes lodash worth the hassle or not you have come to the right place.

<!-- more -->

## 1 - lodash _.method in range example

The \_.method method is intended to be used with other lodash methods like \_.map that accept a collection as the first argument and then a second argument that is a function that is to be called for each element in that collection.

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

## 2 - Conclusion

Thats it for now today, I could not think about more to write about with this one, and could also not come up with any actual use case examples as well.
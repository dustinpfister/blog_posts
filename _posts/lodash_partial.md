---
title: _.partial for creating a function with from another function with some set arguments
date: 2018-12-02 19:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 342
updated: 2018-12-02 20:07:47
version: 1.2
---

The [\_.partial](https://lodash.com/docs/4.17.4#partial) method in [lodash](http://lodash.com/) can be used to create a new function from another function and some starting arguments. In other words it can be used to create simplified function that only accepts a few arguments that will be used with some set static values when using another method that accepts more arguments. If you are still confused maybe it would be best to just look at some code examples so lets take a look at \_.partial in lodash, as well as some plain vanilla javaScript code as well.

<!-- more -->

## 1 - What to know

## 2 - \_.partial basic example


```js
let foo = function (a, b) {
 
    return a + b;
 
};
 
let bar = _.partial(foo, 40);
 
console.log( bar(2) ); // 42
```

### 2.1 - Vanilla js

```js
var foo = function (a, b) {
 
    return a + b;
 
};
 
var bar = function (b) {
 
    return foo(40, b);
 
};
 
console.log(bar(2)); // 42
```

## 3 - A more complex example of \_.partial

```js
let distance = function (x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2))
};
 
let fromOrgin = _.partial(distance,0, 0, 0);
 
console.log(distance(0, 0, 0, 10, 10, 10)); // 17.32...
console.log(fromOrgin(10, 10, 10)); // 17.32...
```

## 4 - Place holders

```js
let points = {
    guy1: {
        x: 42,
        y: 17
    },
    guy2: {
        x: -17,
        y: 0
    }
};
 
let translate = function (point, dx, dy) {
 
    point.x += dx;
    point.y += dy;
 
};
 
let drop = _.partial(translate, _, 0, 100);
 
_.forEach(points, function (guy) {
    drop(guy);
});
 
console.log(points);
// { guy1: { x: 42, y: 117 }, guy2: { x: -17, y: 100 } }
```

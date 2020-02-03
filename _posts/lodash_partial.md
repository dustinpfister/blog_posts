---
title: _.partial for creating a function with from another function with some set arguments
date: 2018-12-02 19:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 342
updated: 2020-02-03 05:59:43
version: 1.11
---

The lodash [\_.partial](https://lodash.com/docs/4.17.11#partial) method in [lodash](http://lodash.com/) can be used to create a new function from another function and some starting arguments. In other words it can be used to create a simplified function that only accepts a few arguments that will be used with some set static values when using another method that accepts more arguments. Simply put it is a way to create an abstraction, or an alternative interface for a complex method that accepts many arguments.

If you are still confused maybe it would be best to just look at some code examples so lets take a look at \_.partial in lodash, as well as some plain vanilla javaScript code as well.

<!-- more -->

## 1 - What to know

This is a post on using the \_.partial method in lodash to create a method with another method that has some arguments fixed and the others that are left as the arguments of the new method that is made with \_.partial. If you are not using lodash that is fine because it is not to hard to accomplish the same effect with plain old javaScript also.

## 2 - \_.partial basic example

For a basic example of \_.partial I made this quick example that involves a method that accepts two arguments a, and b called foo. I then create a new method called bar with \_.partial passing foo as the first argument to \_.partial, and then a number literal of the value 40. The bar method will then me a method that works just like foo only the a argument is fixed at the value of 40, and the first argument of the resulting bar method will be the value for b in the foo method.


```js
let foo = function (a, b) {
 
    return a + b;
 
};
 
let bar = _.partial(foo, 40);
 
console.log( bar(2) ); // 42
```

## 3 - A more complex example of \_.partial

For a more complex example of how this comes in handy sometimes say I have a method that takes a lot of arguments. For example a 3d distance formula that will except six arguments for two points that exist in 3d space. So I want a method that uses this distance method only with one point fixed at the origin call fromOrgin, so that it only takes three arguments.

```js
let distance = function (x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2))
};
 
let fromOrgin = _.partial(distance,0, 0, 0);
 
console.log(distance(0, 0, 0, 10, 10, 10)); // 17.32...
console.log(fromOrgin(10, 10, 10)); // 17.32...
```

## 4 - Place holders

Place holders can be used to set what arguments will be accepted from the resulting new method, and what arguments will be fixed. So if I want a method where the first argument is to be what is accepted by the new method and the others are fixed that ca be done with place holders.

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

## 5 - Vanilla js example

It is not that hard at all to achieve a similar effect with just plain old javaScript though. I can just call the foo method inside a function literal that returns the result of a call to foo with the number literal passed as the first argument for example.

```js
var foo = function (a, b) {
 
    return a + b;
 
};
 
var bar = function (b) {
 
    return foo(40, b);
 
};
 
console.log(bar(2)); // 42
```

## 6 - Conclusion

So the lodash partial method might not be the most compelling method in lodash to warrant the need to continue using lodash in new projects. I can not say I use this method in any of my projects, but I think I can understand why it might make sense to do something like this when it comes to working with a method that accepts a ton of arguments to help improve readability of code maybe. However I would likely just wrap the method in most cases.
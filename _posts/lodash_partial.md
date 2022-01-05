---
title: The lodash partial method for creating abstractions for complex functions
date: 2018-12-02 19:29:00
tags: [js,lodash]
layout: post
categories: lodash
id: 342
updated: 2022-01-05 13:16:16
version: 1.20
---

The lodash [\_.partial](https://lodash.com/docs/4.17.11#partial) method in [lodash](http://lodash.com/) can be used to create a new function from another function and some starting arguments. In other words it can be used to create a simplified function that only accepts a few arguments that will be used with some set static values when using another method that accepts more arguments. Simply put it is a way to create an abstraction, or an alternative interface for a complex method that accepts many arguments.

There are a number of ways to go about creating simplified methods that call other methods that are a little more complex and take many arguments. One way of doing so would be to just write a new function that calls the other function with certain arguments set to whatever static values that are to be used, or parse whatever values need to be pares for from what was given. Yet another way to deal with abstractions is to just not use them at all to begin with actually, and just work with functions that take many arguments just design the argument in such a way so that they take an options object rather than a set of arguments and have it so the function will just go with certain hard coded default values.

If you are still confused maybe it would be best to just look at some code examples not just with lodash, but also when it comes to just monkeying around with native javaScript by itself actually. So lets take a look at \_.partial in lodash, as well as some plain vanilla javaScript code that does things similar to what the lodash partial method is all about.

<!-- more -->

## 1 - Basics of lodash partial method, and what to know before hand

This is a post on using the \_.partial method in lodash to create a method with another method that has some arguments fixed and the others that are left as the arguments of the new method that is made with \_.partial. If you are not using lodash that is fine because it is not to hard to accomplish the same effect with plain old javaScript also. However that is something that I will be getting to in a later section in this post. First off in this section I will be going over some quick examples of using the partial method in lodash. So I assume that you have enough experience with javaScript in order to know enough as to how to go about adding lodash to a project by way of the appropriate way to do so in a client side, or nodejs environment. If not getting into the very basics of this is outside the scope of this post so then you might want to [start out elsewhere](/2018/11/27/js-getting-started/).

### 1.1 - \_.partial basic example

For a basic example of \_.partial I made this quick example that involves a method that accepts two arguments a, and b called foo. I then create a new method called bar with \_.partial passing foo as the first argument to \_.partial, and then a number literal of the value 40. The bar method will then me a method that works just like foo only the a argument is fixed at the value of 40, and the first argument of the resulting bar method will be the value for b in the foo method.


```js
let foo = function (a, b) {
 
    return a + b;
 
};
 
let bar = _.partial(foo, 40);
 
console.log( bar(2) ); // 42
```

### 1.2 - A more complex example of \_.partial

For a more complex example of how this comes in handy sometimes say I have a method that takes a lot of arguments. For example a 3d distance formula that will except six arguments for two points that exist in 3d space. So I want a method that uses this distance method only with one point fixed at the origin call fromOrgin, so that it only takes three arguments.

```js
let distance = function (x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2))
};
 
let fromOrgin = _.partial(distance,0, 0, 0);
 
console.log(distance(0, 0, 0, 10, 10, 10)); // 17.32...
console.log(fromOrgin(10, 10, 10)); // 17.32...
```

### 1.3 - Place holders

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

## 2 - Vanilla js example

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

## 3 - Conclusion

So the lodash partial method might not be the most compelling method in lodash to warrant the need to continue using lodash in new projects. I can not say I use this method in any of my projects, but I think I can understand why it might make sense to do something like this when it comes to working with a method that accepts a ton of arguments to help improve readability of code maybe. Even when I am in a situation in which I have lodash to work with, I often might create an abstraction by just doing so the vanilla javaScript way of doing so and moving on without making use of this lodash specific way of doing so.

If you enjoyed reading this post then you might want to check out my [main post on lodash](/2019/02/15/lodash/), or one of my many [other posts on lodash](/categories/lodash/) that have to do with specific methods, or various lodash related topics. However these days I can not say that I am using lodash that much when working on an actual project of one kind or another. Do not get me wrong though using lodash, and libraries in general do help to save a whole lot of time, it is just that many of my projects that I work on these days are [vanilla javaScript projects](/2021/04/02/js-javascript-example/) that I create from the ground up, including projects that are a kind of [custom cut utility library](/2021/08/06/js-javascript-example-utils/) of sorts.


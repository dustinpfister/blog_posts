---
title: Using _.flow as a way to chain methods with lodash, and javaScript
date: 2018-11-19 16:34:00
tags: [js,lodash]
layout: post
categories: lodash
id: 333
updated: 2020-01-10 15:22:54
version: 1.8
---

These days I have been doing more reading on [lodash](https://lodash.com/) and have found that I have not yet wrote a post on [\_.flow](https://lodash.com/docs/4.17.4#flow) which can be used as a way to make a new function that is actually a bunch of functions that work together. It is similar to chaining, but the end result is a function rather than a value.

There are many ways to go about chaining methods together with just plain old javaScript by itself as well though, so I will be writing about vanilla js examples as well in this post. However the main theme of this post is centered around the use of the lodash flow method when it comes to using lodash as part of the stack of an project.

<!-- more -->

## 1 - What to know

This is a post on the lodash method \_.flow, it is not a post for developers that are new to lodash, let alone javaScript in general. If you are new to lodash and javaScript in general this is not a good starting point. You should also be somewhat familiar with writing functions, and how many of theme can be used together. There is more than one way to do what can be accomplished with the lodash flow method, I am not suggesting that it is an inherently better or worse option for using many method together to create one final value or product.

## 2 - \_.flow example involving a distance formula

The distance formula came to mind when thinking of a quick example of using flow. This might not be the best example of using \_.flow, as the formal is simple enough where it could just be expressed in a single line. Never the less if you do not have much experience with \_.flow this simple example should help give you the basic idea of why \_.flow can be useful.

### 2.1 - The vanilla js distance formula

So if I where to start working on something in javaScript that required the use of a distance formula I might add something like this in my project.

```js
let distance = function (x1, y1, x2, y2) {
    return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
};
 
console.log(distance(10, 15, 90, 22)); // 80
```

Maybe this method would be part of a framework, or just a stand alone method like this. However for the sake of this post that involves the use of \_.flow this is an example of something that can be broken down into a situation in which a function is created that is the result of one function flowing into another. That is instead of doing everything in a single line, I could have a method that excepts the four arguments preforms a single step, and then passes the result to the next function and so forth.

### 2.2 - Using \_.flow to break things down

Another way of producing the same method would be to use \_.flow, by passing an array of methods to it. The first method in the array would accept the four arguments and return the product of Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2). That product will then be passed as the first argument for Math.sqrt, and then its product will be passed as the first argument of Math.round.

```js
let forA = function (a1, a2) {
    return Math.pow(a1 - a2, 2);
};
 
let dist = _.flow([
   function (x1, y1, x2, y2) {
       return forA(x1, x2) + forA(y1, y2)
   },
   Math.sqrt,
   Math.round
]);
 
console.log(dist(10, 15, 90, 22)); // 80
```
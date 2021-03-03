---
title: Stochastic process basic Bernoulli example
date: 2021-03-03 15:52:00
tags: [statistics]
layout: post
categories: statistics
id: 815
updated: 2021-03-03 16:03:54
version: 1.2
---

I would like to write at least a few posts on examples of a Stochastic process when it comes to statostics. When it comes to any collection of content on something there is always a kind of getting started type post when it comes to just working out the very basics of something. So a [Bernoulli Stochastic process](https://en.wikipedia.org/wiki/Bernoulli_process) would be a good starting point when it comes to this kind of process becuase such a process is just simply a coin toss, or in order words a random process where there are only two possible outcomes.


<!-- more -->

## 1 - A basic coin function

To get started with this kind of random process I just need a function that will return a random number that will be a 1 or a 0, and that is it. When it comes to javaScript I can use the Math.random and Math.round methods to quickly create such a function.

```js
var coin = function(){
    return Math.round(Math.random());
};
 
console.log( coin() );
```

SO then that is it, simple enough. However maybe there is still a little more to write about when it comes to this actually, and it can be stuff that also applys to far more complex Stochastic or random rather than determanasic systems. For example I would exspect that if I call this coin function enough times the propability of a 1 or 0 should be about 50, 50 right? I could just assume that is the case or I could test it by writing at least a little more code.


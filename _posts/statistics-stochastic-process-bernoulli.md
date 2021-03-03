---
title: Stochastic process basic Bernoulli example
date: 2021-03-03 15:52:00
tags: [statistics]
layout: post
categories: statistics
id: 815
updated: 2021-03-03 16:09:26
version: 1.3
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

## 2 - Testing the coint function

```js

var coin = function(){
    return Math.round(Math.random());
};
 
var trial = function(count){
    var i = 0,
    result = [0, 0],
    len = count || 1;
    while(i < len){
        var sideIndex = coin();
        result[sideIndex] += 1;
        i += 1;
    }
    return result;
};
 
var getPers = function(result){
    var count = result[0] + result[1];
    return result.map(function(n){
        return n / count * 100;
    });
};
 
console.log( getPers( trial(10000) ) );
```

## 3 - Conclusion

This could then prove to be an interesting collection of posts when I get around to wrirint more. I have been creating all kinds of simple little projects over the years that can be thought of as examples of a Stochastic process, and I have also have wrote a pure function or two in my time also when it comes to the polar oposite of such a system or function. However now that I am starting to study statstics I find mysel;f gaining a more solid understanind and appreasheation for these two ver general kinds of systems, and that there is often overlap betweeen the two also.


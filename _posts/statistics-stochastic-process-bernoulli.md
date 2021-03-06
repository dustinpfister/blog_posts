---
title: Stochastic process basic Bernoulli example
date: 2021-03-03 15:52:00
tags: [statistics]
layout: post
categories: statistics
id: 815
updated: 2021-03-03 17:54:26
version: 1.13
---

I would like to write at least a few posts on examples of a [Stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) when it comes to [statistics](https://en.wikipedia.org/wiki/Statistics). When it comes to any collection of content on something there is always a kind of getting started type post when it comes to just working out the very basics of something. So a [Bernoulli Stochastic process](https://en.wikipedia.org/wiki/Bernoulli_process) would be a good starting point when it comes to this kind of process because such a process is just simply a coin toss, or in order words a random process where there are only two possible outcomes.


<!-- more -->

## 1 - A Basic Bernoulli process example

This should be pretty easy as all that needs to happen here is to have a function that will return a random number that is just a 1 or 0. However there is maybe a bit more to it when it comes to figuring out if a random function will give what might often be called a fair toss, or a [fair coin](https://en.wikipedia.org/wiki/Fair_coin).

### 1.2 - A basic coin function

To get started with this kind of random process I just need a function that will return a random number that will be a 1 or a 0, and that is it. When it comes to javaScript I can use the Math.random and Math.round methods to quickly create such a function.

```js
var coin = function(){
    return Math.round(Math.random());
};
 
console.log( coin() );
```

SO then that is it, simple enough. However maybe there is still a little more to write about when it comes to this actually, and it can be stuff that also applies to far more complex Stochastic or random rather than deterministic systems. For example I would expect that if I call this coin function enough times the probability of a 1 or 0 should be about 50, 50 right? I could just assume that is the case or I could test it by writing at least a little more code.

### 1.2 - Testing the coin function

So how would I go about testing if this kind of coin function is a fair coin kind of a function? Well the general idea that comes to mind is to have a whole bunch of trials, log the results, and then find out if the results is more or less about 50,50.

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

Each time I call this the results ends up close to 50, 50 but rarely if ever exactly that. If I do play around with the number of trials that does seems to have some kind of an effect, but it is never really a true fair coin.

## 3 - Pure function alternative to the coin function

To get a better understanding of a random process it is a good idea to have something to compare to that is a kind of deterministic system. In other words a system that makes use of a pure function rather than that of of a random function.

### 3.1 - The coin function in a pure function style

To make a pure function example of the coin function it will need to take at least one argument, and for any call of the function with the same argument the same result will always be returned.

```js
var coin = function(index){
    return (index || 0) % 2;
};
 
console.log( coin(0) ); // 0
console.log( coin(1) ); // 1
console.log( coin(2) ); // 0
console.log( coin(3) ); // 1
```

### 3.2 - Testing it

There is then doing the same test again, but this time making use of this other coin function that is more in line with a system that is NOT stochastic.

```js

var coin = function(index){
    return (index || 0) % 2;
};
 
var trial = function(count){
    var i = 0,
    result = [0, 0],
    len = count || 1;
    while(i < len){
        var sideIndex = coin(i);
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
 
console.log( getPers( trial(1) ) ); // [ 100, 0 ]
console.log( getPers( trial(2) ) ); // [ 50, 50 ]
console.log( getPers( trial(3) ) ); // [ 66.66666666666666, 33.33333333333333 ]
console.log( getPers( trial(4) ) ); // [ 50, 50 ]
```

With this like of function of course the results end up being more in line with the idea of a fair coin where for any amount of even tosses of a coin the result will always be 50, 50, and it is only in an odd amount of trials where that will not end up being the case.

This in turn raises some interesting questions when it comes to the idea of making yet another kind of function that will serve as some kind of middle point between these two kinds of system then. A system where it is more or less just like the purely random system, but the results thus far are looked at each time, and the probabilities are adjusted as needed to help keep things more in line with the kind of outcome that happens with this more deterministic system.

## 4 - Conclusion

This could then prove to be an interesting collection of posts when I get around to writing more. I have been creating all kinds of simple little projects over the years that can be thought of as examples of a Stochastic process, and I have also have wrote a pure function or two in my time also when it comes to the polar opposite of such a system or function. However now that I am starting to study statistics I find myself gaining a more solid understanding and appreciation for these two very general kinds of systems, and that there is often overlap between the two also.


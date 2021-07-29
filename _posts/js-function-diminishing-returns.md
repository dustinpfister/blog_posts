---
title: Diminishing returns functions in javaScript
date: 2021-07-28 18:58:00
tags: [js]
layout: post
categories: js
id: 920
updated: 2021-07-29 14:33:29
version: 1.16
---

This week I have been expanding on the topic of [functions in javaScript](/2019/12/26/js-function/), and many various topics that might come up when making a game. One thing that I have run into now and then is the topic of making some kind of [diminishing returns function](https://stackoverflow.com/questions/2813621/how-do-you-create-a-formula-that-has-diminishing-returns) that is involved in creating attribute values when creating some kind of upgrade system. Often a game might involve some kind of skill point, token, or value that will go up as a player advances in the game. Often this value will start out at zero, and each time the player levels up, or preforms some kind of task they end up getting certain amounts more of this value. The amount of this skill points or whatever they may be called can then be invested in one or more upgrades, and there is no limit as to how many that can invest in any one upgrade. However there is a catch when it comes to putting all skill points into a single upgrade and that is that they will never truly reach the max possible value that can be obtained, the reason why is because of, you guessed it, diminishing returns.

<!-- more -->


## 1 - Basic diminishing returns function examples

In this section I will be just going over some very simple diminishing returns functions for starters. There are all kinds of expressions that can be used, so I am not going to even start to scratch the surface here. However one has to start somewhere when it comes to this sort of thing. 

There are making full featured like functions where I can pass a min, and max value, along with an additional argument that is the current skill point amount. However those kinds of functions stroke me more so as additional functions that have expressions that would involve calling a diminishing return function actually. The core of the idea here I think is to have a function that returns a value in the range of a fraction between the values of 0 and 1. That is that the function would have at least one argument that is the value of the skill points invested in an upgrade, and as that value goes up the return value will approach, but never truly reach 1. Failing that it should at least require a very large number to get to one to say the least.

### 1.1 - Just divide 1 over n + 1 and subtract that from 1

So right away there is just thinking in terms of fractions, where I just divide 1 b the given skill point value, or for this example say the skill point value is an argument called n. When diving 1 over n, as n approaches positive infinity, the return value will approach but never truly reach zero. This is similar to what I want, but I want to approach 1, which is no big deal as I can just subtract this return value from 1 to get what I want. There is then just maybe adding 1 to n in a group to address an issue when a value of 0 is given for n.

```js
var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};
 
console.log(dimReturn(0));   // 0
console.log(dimReturn(0.5)); // 0.33333333333333337
console.log(dimReturn(5));   // 0.8333333333333334
console.log(dimReturn(50));  // 0.9803921568627451
console.log(dimReturn(500)); // 0.998003992015968
```

This is more or less the basic idea of what I would want. However I would not stop here, as I would likely want to adjust things at least a little when it comes to getting this kind of value to be used in a larger expression in an additional expression that uses this. That is that when I give a value of 500 I get a value that is very close to 1 all ready, this might not be a big problem if the skill points come slowly in the game, otherwise it is a problem as it allows for a player to advanced to fast maybe. So maybe there is a need for some additional basic examples on this, that have at least one additional argument that will effect the rate at which the return value approaches 1.

### 1.2 - More or less the same expression but have another value that will effect the rate

This example of a diminishing returns function is just slightly more advanced then the one that I just coved above.

```js
var dimReturn2 = function (n, a) {
    return 1 - 1 / (n / a + 1);
};
 
console.log(dimReturn2(0, 500));     // 0
console.log(dimReturn2(0.5, 500));   // 0.0009990009990008542
console.log(dimReturn2(5, 500));     // 0.00990099009900991
console.log(dimReturn2(50, 500));    // 0.09090909090909094
console.log(dimReturn2(500, 500));   // 0.5
 
console.log(dimReturn2(10000, 500)); // 0.9523809523809523
```

## 2 - Some use case examples

So now that I got the basic out of the way, it is now called for to take a look at some quick use case examples of this kind of function.

### 2.1 - Setting an attack value for an attribute

This is an example in which I am using a diminishing returns value to create another value that I might use to set some kind of value for an object such as an attack property.

```js
var dimReturn = function (n) {
    return 1 - 1 / (n + 1);
};
 
var getAttackValue = function (baseValue, skillBonus, skillPoints) {
    return parseFloat((baseValue + skillBonus * dimReturn(skillPoints)).toFixed(2));
};
 
console.log( getAttackValue(10, 25, 0) ); // 10
console.log( getAttackValue(10, 25, 5) ); // 30.83
console.log( getAttackValue(10, 25, 100) ); // 34.75
console.log( getAttackValue(10, 25, 5000) ); // 35
```

## 3 - Conclusion

So far the concept of a diminishing returns function is the kind of function that might come up when making source code for a game, typically code that has to do with an experience point system, or code that closely tied to such a system.

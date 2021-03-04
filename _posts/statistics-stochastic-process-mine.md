---
title: Mine game Stochastic process example
date: 2021-03-04 09:32:00
tags: [statistics]
layout: post
categories: statistics
id: 816
updated: 2021-03-04 09:39:22
version: 1.1
---

Today I will be contnuing with looking into the topic of [Stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) in [statistics](https://en.wikipedia.org/wiki/Statistics) which is more or less a fancy formal way of random rather than deteranistic processes. 

There is a whole world of examples that come to mind when it comes to this, and there are or course many great examples that have all ready been made over the years. However in this post I will be going over a basic example of this kind of system that comes up when it comes to making a basic idle game.

<!-- more -->

## 1 - The source code for a mine function

So the general idea that I have here is to have a mine function that will take some argumnets that have to do with the count of mine events, the method to use to come up for amounts or ores, and a collection of ores.

```js
var defaultOres = [
    { type: 'iron', chance: 1 },
    { type: 'copper', chance: 0.1 },
    { type: 'gold', chance: 0.01 }
];
 
var mineMethods = {
    singleRandom: function(ore, count){
        var roll = Math.random();
        if(roll <= ore.chance){
            return count;
        }
        return 0;
    },
    singlePure: function(ore, count){
        return Math.round(ore.chance * count);
    }
};
 
var mine = function(count, mineMethod, ores){
    ores = ores === undefined ? defaultOres : ores;
    count = count === undefined ? 1 : count;
    mineMethod = mineMethod === undefined ? mineMethods.singleRandom : mineMethod;
    return ores.map(function(oreObj){
        var amount = mineMethod(oreObj, count);
        return {
            type: oreObj.type,
            amount: amount
        };
    });
};
```

```js
var i = 0,
mineCount = 1000,
onHand = {
    iron: 0,
    copper: 0,
    gold: 0
};
 
while(i < mineCount){
    var mineResult = mine(1, mineMethods.singleRandom);
    mineResult.forEach(function(oreObj){
        onHand[oreObj.type] += oreObj.amount;
    });
    i += 1;
}
 
console.log( mine(mineCount, mineMethods.singlePure) );
// [ { type: 'iron', amount: 1000 },
//   { type: 'copper', amount: 100 },
//   { type: 'gold', amount: 10 } ]
 
// random values that should be around the result of using the pure function
console.log( onHand );
 
```
---
title: Mine game Stochastic process example
date: 2021-03-04 09:32:00
tags: [statistics]
layout: post
categories: statistics
id: 816
updated: 2021-03-04 09:53:07
version: 1.4
---

Today I will be contnuing with looking into the topic of [Stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) in [statistics](https://en.wikipedia.org/wiki/Statistics) which is more or less a fancy formal way of random rather than deteranistic processes. 

There is a whole world of examples that come to mind when it comes to this, and there are or course many great examples that have all ready been made over the years. However in this post I will be going over a basic example of this kind of system that comes up when it comes to making a basic idle game.

<!-- more -->

## 1 - The source code for a mine function

So the general idea that I have here is to have a mine function that will take some argumnets that have to do with the count of mine events, the method to use to come up for amounts or ores, and a collection of ores. This kind of function by default could be like a pure function if I do design it that way, but in any case it would never be a true pure function becuase I can always give it a mine method that makes used of Math.random. Also this is a post on the topic of the concept of a Stochastic process rather than a determanisct system, so by default it will make use of Math.random.

### 1.1 - The mine function

So then here is the source code of the mine function that I have in mind.

```js
// The mine function
var mine = (function(){
    // built in ores
    var defaultOres = [
        { type: 'iron', chance: 1 },
        { type: 'copper', chance: 0.1 },
        { type: 'gold', chance: 0.01 }
    ];
    // build in mine methods
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
    // Main mine function
    var api = function(count, mineMethod, ores){
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
    // make mineMethods public
    api.mineMethods = mineMethods;
    // return public API
    return api;
}());
```

### 1.2 - Basic example of the mine function

Now to test this out to see if it works okay.

```js 
var i = 0,
mineCount = 1000,
onHand = {
    iron: 0,
    copper: 0,
    gold: 0
};
 
while(i < mineCount){
    var mineResult = mine(1, mine.mineMethods.singleRandom);
    mineResult.forEach(function(oreObj){
        onHand[oreObj.type] += oreObj.amount;
    });
    i += 1;
}
 
console.log( mine(mineCount, mine.mineMethods.singlePure) );
// [ { type: 'iron', amount: 1000 },
//   { type: 'copper', amount: 100 },
//   { type: 'gold', amount: 10 } ]
 
// random values that should be around the result of using the pure function
console.log( onHand );
 
```

## 2 - Conclusion

This kind of function is something that I am using, or should be using, at the core of some of my idle games. I often do work on improving the source code and experence of some of these games and many other projects that are like this. So it is highly likeley that I will be coming back to this now and then in the future.

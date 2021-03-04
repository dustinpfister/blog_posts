---
title: Mine game Stochastic process example
date: 2021-03-04 09:32:00
tags: [statistics]
layout: post
categories: statistics
id: 816
updated: 2021-03-04 11:32:15
version: 1.8
---

Today I will be contnuing with looking into the topic of [Stochastic process](https://en.wikipedia.org/wiki/Stochastic_process) in [statistics](https://en.wikipedia.org/wiki/Statistics) which is more or less a fancy formal way of random rather than deteranistic processes. 

There is a whole world of examples that come to mind when it comes to this, and there are or course many great examples that have all ready been made over the years. However in this post I will be going over a basic example of this kind of system that comes up when it comes to making a basic idle game. In such games there is often some kind of resource that the player gains over time by clicking something, having a way to automate the process of gaining resources without having to click, and having a way to gain a large sum of resources while away from playing.

<!-- more -->

## 1 - The source code for a mine function

So the general idea that I have here is to have a mine function that will take some argumnets that have to do with the count of mine events, the method to use to come up for amounts or ores, and a collection of ores. This kind of function by default could be like a pure function if I do design it that way, but in any case it would never be a true pure function becuase I can always give it a mine method that makes used of Math.random. Also this is a post on the topic of the concept of a Stochastic process rather than a determanisct system, so by default it will make use of Math.random.

### 1.1 - The mine function

So then here is the source code of the mine function that I have in mind. I actaully return the function within another function by way of following the IIFE module pattern in javaScript. Inside the body of the IIFE I have some hard coded defaults for ores and mine methods.

When it comes to the mine methods I have a single random method that involves the use of a single call of Math.random, and single pure that involves just a single call of an expresion that does not make use of Math.random, and is more in line with the concept of a pure function. In other words a function that will always return the same result for the same arguments.

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

Now to test this mine function out to see if it works the way I want it to. There are three general ways I might go about using this mine function one is to make use of it when it comes to a player clicking something that will result in a single mine event each time it is clicked. The other user case is to have a main app loop update method that will call this mine method once every game update tick. Then there is also adding an away production feature, where a large number of ticks will be done in one shot, once, when the app first starts up after that player was not playing for a while and came back to my site.

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

This kind of function is something that I am using, or should be using, at the core of some of my idle games. In the event that I am not there is still using some kind of system that is not all that far off from what this is. I do not think that an idle game has to be complatly stochastic in nature, many good idle games are not that much. However there is still a degree of randomness when it comes to a player making some kind of action or not.

I often do work on improving the source code and experence of some of these games and many other projects that are like this. So it is highly likeley that I will be coming back to this now and then in the future. 

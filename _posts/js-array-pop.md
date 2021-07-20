---
title: JS Array pop, and getting elements from an array in general.
date: 2020-05-30 13:31:00
tags: [js]
layout: post
categories: js
id: 660
updated: 2021-07-20 13:18:15
version: 1.12
---

When first starting out with javaScript it is only natural to go through a phase where a developer needs to become more familiar with how to go about working with [arrays in javaScript](/2018/12/10/js-array/). There is just simply knowing how to create them for starters, but then there is getting elements from them in a why in which the arrays are mutated in place, as well as not doing so when it comes to working with a source array. There are many methods of interest when it comes to just simply geting one or more elements from an array in javaScript, but maybe one of the first methods one will become aware of is the [js array pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) method. 

The js array pop prototype method will remove and return the last element in an array. This method works okay for what it is intended to be used for, however it might not always be the best choice. For example what if it is the first element that is to be removed and returned, and also what about injecting elements while one is at it? So this post will center on the use of the js array pop method, but also other ways of getting one or more elements from an array such as shift, splice, and just the use of the bracket syntax with an index number.

<!-- more -->

## 1 - A js Array pop method for popping out the last element in an array

The basic idea of the js array pop prototype method is to call the pop method off of an instance of an array, the result is for the last element in the array to be removed and returned.

```js
var arr = [1,2,3,4];
 
var n = arr.pop();
 
console.log(n); // 4
console.log(arr); // [1,2,3]
```

This might work okay for the most part as a way to do this sort of thing with arrays, but it is by no means the only way to go about doing so. There is also the shift method that will do more or less the same thing only removing the first or zero index element of the array. In addition there is the splice method that is far more robust then both the pop and shift methods as it can be used as a way to do this sort of things with any element in the array.

There is also yet another topic of interest when it comes to using the js array pop method and that is should you even mutate an array like this in the first place? Many situations that call for this sort of thing involving working with a pool of some kind of resource such as an array of display objects in a game for example. One way is to inject and purge display objects into the pool as needed, but another way is to have a fixed set of objects that are activated and inactivated as needed. SSo then there are other methods and ways of doing things that come to mind such as just using the bracket syntax to reference elements, and use methods like slice over splice. So lets look at a whole bunch more javaScript examples of other ways of doing this sort of things and more with arrays in javaScript.

## 2 - The js array shift method for popping out the first element in an array

The js array shift method works more or less in the same way as the js array pop method, but with one very important difference which is that it is the first element that is removed and returned rather than the last.

```js
var arr = [1,2,3,4];
 
var n = arr.shift();
 
console.log(n); // 1
console.log(arr); // [2,3,4]
```

## 3 - The array splice method for popping out one or more elements anywhere, and to inject new ones also

So there is the js array pop method that will pop out an return the last element in an array, and the js array shift method that will pop out the first. However what if you want to pop out a certain index value between the two end points of an array? For this there is the splice method which is not to be confused with the slice method that works a little differently and will not mutate the array in place.

The js array spice method can be used to remove one or more elements for any index location in a given array by passing the desired index value as the first argument when calling the js array splice method. So just like the js array pop method the same result can be achieved with splice by passing one less from the length of the array for the index value to pop out and return the last element in the array. In addition the same effect of the shift method can be done by using the value 0 for the index value argument. 

However in addition to being able to preform the same results as pop and shift the splice method can be used for any index value in the array, and on top of that more than one element can be removed. On top of all of that one additional feature of the splice method is that new elements can be injecting into the array also. So it goes without saying that the splice method is all around far more robust when it comes to mutating an array by way of purging as well as going about injecting new elements into an array.

```js
var arr = [1,2,3,4];
 
console.log( arr.splice(arr.length-1, 1)[0] ); // 4
console.log( arr.splice(0, 1)[0] ); // 1
console.log( arr ); // [2,3]
 
// splice can also be used to inject new elements
arr.splice(1,0, 2.1, 2.2);
 
console.log(arr); // [2, 2.1, 2.2, 2.3, 3]
```

## 4 - Example one using particles

Now for a  more advanced example that involves popping out elements from an array using a means of doing so. For this example I will be using the splice method over pop because it allows for me to pop out just elements that meat a certain condition. In this example I have an array of particle objects that move in a certain heading and have life lost over time, when a particle has a life value of zero or lower the particle needs to be purge out from the pool of particles to make room for new ones that will be spawned in. So this is a good example of using a method like splice that does something a little more advanced.

### 4.1 - the create state and spawn methods

Fpor this example I will want a method that I can use to create a state object, and another methods that serves as my rotten for spawning in particles.

```js
var createState = function () {
    return {
        parts: [],
        lt: new Date(),
        spawn: {
            max: 5,
            secs: 0,
            rate: 1
        }
    };
};
 
var spawn = function (state, secs) {
    var spawn = state.spawn;
    spawn.secs += secs;
    if (spawn.secs >= spawn.rate) {
        if (state.parts.length < spawn.max) {
            state.parts.push({
                x: 0,
                y: 0,
                pps: 32,
                heading: Math.PI * 2 * Math.random(),
                life: 5 + Math.floor(Math.random() * 6)
            })
        }
        spawn.secs %= spawn.rate;
    }
};
```

### 4.2 - The purge method that uses the splice method to pop put elements

So here I have the purge method that will purge out objects in the parts array of the state object that have a life value of zero or below.

```js
// purge method using the splice method
var purge = function (state) {
    var i = state.parts.length,
    part;
    while (i--) {
        part = state.parts[i];
        if (part.life <= 0) {
            state.parts.splice(i, 1);
        }
    }
};
```

### 4.3 - the update and main loop methods

So I will now want a main update method that uses my spawn and purge methods along with a render method and a main app loop.

```js
var update = function (state) {
    var i,
    part,
    now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
 
    spawn(state, secs);
    purge(state);
 
    i = state.parts.length;
    while (i--) {
        part = state.parts[i];
        // move
        part.x += Math.cos(part.heading) * part.pps * secs;
        part.y += Math.sin(part.heading) * part.pps * secs;
        // loose life
        part.life -= secs;
    }
    state.lt = now;
};
 
var render = function (state) {
    console.log(state.parts.length);
};
 
var state = createState();
setInterval(function () {
 
    update(state);
    render(state);
 
}, 250);
```

So this is a nice quick example of a method like js array splice doing its thing. However it might not be the best option for making this kind of project. When working out something like this I often might use a fixed pool and just make it so that particles enter an inactive state when a condition is reached rather than purging them out and spawning in a new one.

## 5 - Conclusion

So the js array pop method can be used to purge out and return the last element in an array, but there are other options for doing so. Also it might not always be the best idea to keep purging out elements in the first place depending on the nature of the project. There are of course many other tools in the toolbox then it comes to doing the same things without mutating an array in place, and some times it might be better to keep reusing the same resources over and over again rather than purging them out and creating them again over and over again.
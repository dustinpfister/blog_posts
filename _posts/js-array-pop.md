---
title: JS Array pop, and getting elements from an array in general.
date: 2020-05-30 13:31:00
tags: [js]
layout: post
categories: js
id: 660
updated: 2020-05-31 14:10:52
version: 1.2
---

When first starting out with javaScript it is only natural to go threw a faze where a developer needs to become more familiar with how to go about working with arrays in javaScript. There is just simply knowing how to create them for starters, but then there is getting elements from them in a why in which the arrays are mutated in place as well as not doing so. There are many methods of interest when it comes to working with arrays in javaScript, but maybe one of the first methods one will become aware of is the [js array pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) method. 

The js array pop prototype method will remove and return the last element in an array. This methods works okay for what it is intended to be used for, however it might not always be the best choice. For example what if it is the first element that is to be removed and returned, and also there is a need to inject elements also of course. So this post will center on the use of the js array pop method, but also other returned methods such as shift and splice.

<!-- more -->

## 1 - A js Array pop method basic example

The basic idea of the js array pop prototype method is to call the pop method off of an instance of an array, the result is for the last element in the array to be removed and returned.

```js
var arr = [1,2,3,4];
 
var n = arr.pop();
 
console.log(n); // 4
console.log(arr); // [1,2,3]
```

This might work okay for the most part as a way to do this sort of thing with arrays, but it is by no means the only way to go about doing so. There is also the shift method that will do more or less the same thing only removing the first or zero index element of the array. In addition there is the splice method that is far more robust then both the pop and shift methods as it can be used as a way to do this sort of things with any element in the array.

There is also yet another topic of interest when it comes to using the js array pop method and that is should you even mutate an array like this in the first place? Many situations that call for this sort of thing involving working with a pool of some kind of resource such as an array of display objects in a game for example. One way is to inject and purge display objects into the pool as needed, but another way is to have a fixed set of objects that are activated and inactivated as needed. SSo then there are other methods and ways of doing things that come to mind such as just using the bracket syntax to reference elements, and use methods like slice over splice. So lets look at a whole bunch more javaScript examples of other ways of doing this sort of things and more with arrays in javaScript.

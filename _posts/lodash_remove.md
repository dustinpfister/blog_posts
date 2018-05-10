---
title: The lodash _.remove array method in action
date: 2017-09-19 12:57:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 38
updated: 2017-09-30 18:56:32
version: 1.4
---

The process of removing a few elements from an array can sometimes be a little troubling, or at least I remember that it was back when I was first starting out. The trouble was mainly with looping threw an array from zero upwards, each time an element is removed it of course changes the length of an array. The way I would resolve the problem is often by looping threw the array backwards.

<!-- more -->

Anyway this post is about the [_.remove](https://lodash.com/docs/4.17.4#remove) array method in [lodash](https://lodash.com/) that helps to make quick work of removing elements from an array.

## Basic example

It's pretty easy, just pass the array, and a method where you can define the conditions that will result in removal of the element.

```js
var arr = ['foo', 27, 'man', 42, 'chew'];
 
_.remove(arr, function (el) {
 
    // remove all numbers
    return typeof el === 'number';
 
});
 
console.log(arr); // ['foo','man',chew];
```

So the method that you pass will return true of false, if what is returned is true the element will be removed.

## Array of enemy objects

When it comes to making a game that involves an array of enemies that the player interacts with, often there will be some kind of process that involves purging enemies from an array. The _.remove method can be used to make quick work of that.

```js
var enemy = [{
        id : 'en_1',
        hp : 12,
        maxHP : 50
    }, {
        id : 'en_2',
        hp : 0,
        maxHP : 50
    }, {
        id : 'en_3',
        hp : 50,
        maxHP : 50
    }
];
 
// remove all dead enemies
_.remove(enemy, function (e) {
    return e.hp <= 0;
});
 
console.log(enemy);
// [ { id: 'en_1', hp: 12, maxHP: 50 },
//  { id: 'en_3', hp: 50, maxHP: 50 } ]
```

### conclusion

So lodash is packed full of helpful little methods like this, in addition even if it is redundant it is possible that it might provide higher backward compatibility with older browsers.

Be sure to check out my other [posts on lodash](/categories/lodash/)
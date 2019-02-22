---
title: The lodash _.remove array method in action
date: 2017-09-19 12:57:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 38
updated: 2019-02-21 22:29:01
version: 1.11
---

The process of removing a few elements from an array can sometimes be a little troubling, or at least I remember that it was back when I was first starting out. The trouble was mainly with looping threw an array from zero upwards, each time an element is removed it of course changes the length of an array. The way I would resolve the problem is often by looping threw the array backwards. Anyway this post is about the [_.remove](https://lodash.com/docs/4.17.4#remove) array method in [lodash](https://lodash.com/) that helps to make quick work of removing elements from an array. I will also be looking at some vanilla js alternatives to the lodash remove array method as well as well.

<!-- more -->


## 1 - lodash remove basic example

The lodash remove method is one of the many [array methods in lodash](/2019/02/14/lodash_array/). It's pretty easy, just pass the array, and a method where you can define the conditions that will result in removal of the element.

```js
var arr = ['foo', 27, 'man', 42, 'chew'];
 
_.remove(arr, function (el) {
 
    // remove all numbers
    return typeof el === 'number';
 
});
 
console.log(arr); // ['foo','man',chew];
```

So the method that you pass will return true of false, if what is returned is true the element will be removed.

## 2 - Array of enemy objects

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

## 3 - Vanilla js

In this section I will be going over vanilla js solutions for removing elements from an array.

```js
// so looping from zero upwards presents a problem
// because the length of the array changes
var arr = [-1, -2, 3, -4, 5],
i = 0, len = arr.length;
while (i < len) {
    var el = arr[i];
    if (el < 0) {
        arr.splice(i, 1);
    }
    i += 1;
}
 
console.log(arr); // [ -2, 3, 5 ]
 
// looping backwards works
var arr = [-1, -2, 3, -4, 5],
i = arr.length;
while (i--) {
    var el = arr[i];
    if (el < 0) {
        arr.splice(i, 1);
    }
}
console.log(arr); // [3,5]
```

## 4 - Conclusion

So lodash is packed full of helpful little methods like the lodash remove method. It is true that many of the methods in lodash are redundant, but that is not always the case. Sometimes a lodash method does bring a little more to the table compared to a native counterpart. If you engoyed reading this post you might want to check out my [main post on lodash](/2019/02/15/lodash/) in general.

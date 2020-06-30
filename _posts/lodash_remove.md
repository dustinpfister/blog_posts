---
title: The lodash _.remove array method and vanilla javaScript alternatives
date: 2017-09-19 12:57:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 38
updated: 2020-06-30 11:05:24
version: 1.20
---

The process of removing a few elements from an array can sometimes be a little troubling, or at least I remember that it was back when I was first starting out with javaScript. The trouble was mainly with looping over an array from a zero element index value upwards, each time an element is removed it of course changes the length of an array, which of course causes a problem. The way I would resolve the problem is often by looping threw the array backwards, and using an array prototype method like Array.splice to purge elements. 
When it comes to just using native javaScript alone of course there are ways of just going ahead and removing elements from an array. However this is a post on lodash where it is assumed that lodash is part of the stack of a project so with that said there is also the [_.remove](https://lodash.com/docs/4.17.4#remove) array method in [lodash](https://lodash.com/). The lodaah remove metjod helps to make quick work of removing elements from an array if lodash is there to work with, and I sapose it would make sense to use it if it is indeed there. Still lots of developers are transitioning away from lodash, so I will also be looking at some vanilla js alternatives to the lodash remove method in addition to just what lodash has to work with by itself.

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

### 3.1 - Using Array.splice to remove a element

So one way to remove an element from an Array with native core javaScript is to use the Array.splice prototype method. This is often confused with Array.slice that does the same thing only it returns a new array rather than mangling an existing one. Array.splice might be one of the best options if you are someone that worries a great deal about backward compatibility with older browsers. Unlike other native options like Array.filter, Array.splice is a pre ES5 Array prototype method that will work in browsers as old as IE 5.5.

```js
var arr = [1,2,3,4];
arr.splice(2,1);
console.log(arr); // [ 1, 2, 4 ]
```

The problem with Array.splice by itself at least is that I must know the index of the element that I want to remove. It is not to hard to write a method like the lodash remove method with native javaScript that makes use of Array.splice though. There are a few things to be ware of when doing so though when removing more than one element.

### 3.2 - Array.splice in while loops

When removing more than one element with Array.splice in a loop such as a while loop a problem may come up that has to do with the fact that the length of the array changing when one or more elements are removed.

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
 
A simple solution for this would be to just loop backwards.
 
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
 
### 3.3 - Remove method using Array.splice
 
So making a remove method with Array.splice is not to hard. If you are not familiar with how to write your own higher order functions then it is not a bad idea to make one or two now and then, even if they are kind of basic. A higher order function is just a fancy term that is used to refer to a function that accepts another function as an argument and or returns another function when called. This example is then an exercise of writing something that is the latter of the two, sense I will be returning an Array..
 
 ```js
var remove = function (arr, forEach) {
    var i = arr.length;
    while (i--) {
        if (forEach(arr[i])) {
            arr.splice(i, 1);
        }
    }
    return arr;
};
 
var nums = [-1, 3, -3, -4, 5, 0, 7];
 
console.log(remove(nums, function (n) {
        return n <= 0;
    }));
```

There are of course many different ways that a function such as this could be written. I like Array.splice because of the great browser support, but if you are not such a nut with that sort of thing another option might involve the use of Array.filter for example.

## 4 - Conclusion

So lodash is packed full of helpful little methods like the lodash remove method. It is true that many of the methods in lodash are redundant, but that is not always the case. Sometimes a lodash method does bring a little more to the table compared to a native counterpart. If you enjoyed reading this post you might want to check out my [main post on lodash](/2019/02/15/lodash/) in general.

---
title: The lodash _.map method
date: 2018-02-02 20:53:00
tags: [js,lodash]
layout: post
categories: lodash
id: 142
updated: 2018-02-05 15:53:39
version: 1.1
---

If you work with javaScript a lot like I do chances are you are going to be aware of many of the methods that are part of the Array prototype, one of which is Array.map. In [lodash](https://lodash.com/) there is also the [\_.map](https://lodash.com/docs/4.17.4#map) method what works just like that only it is a little more advanced. In this post I will be covering Array.map, and how it compares with what is in lodash.

<!-- more -->

## Simple example of Array.map

The [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method will create a new array with what is returned by a given method for each element.

```js
// a simple array
var arr = [1,2,3,4,5];
 
// array.map will set each element to what is returned
// and I can use the value of each element in the process.
arr = arr.map(function(el){
 
    return el * 10;
 
});
 
console.log(arr);
// [10,20,30,40,50]
```

## Simple \_.map example in lodash

So of course the same thing can be done with \_.map in lodash.

```js
var arr = [1,2,3,4,5];
 
arr = _.map(arr, function(el){
 
    return el * 10;
 
});
 
console.log(arr);
// [10,20,30,40,50]
```

However \_.map in lodash is a collection method, so it can also be used on plain old objects as well, not just Arrays.

```js
var obj = {foo: 'bar', anwser: 42};
 
console.log(_.map(obj, function(item){
 
    return item;
 
}));
// ['bar',42]
```

## Recursive example of \_.map

For a more advanced example of \_.map in action, say I have a complex object that has nested objects inside of it, and I want to toggle a boolean value for each object, and flatten everything out into an array. I can call \_.map recursively on objects, and arrays. Other lodash methods like \_.isArray, and \_.flatten can also be used in the process.

```js
var obj = {
 
    player: {
 
        team: 'GoodGuys',
        hp: 12,
        hpMax: 100,
        heal: false
 
    },
 
    enemys: [{
 
            team: 'BadGuys',
            hp: 90,
            hpMax: 250,
            heal: true
 
        }, {
 
            team: 'BadGuys',
            hp: 120,
            hpMax: 250,
            heal: true
 
        }
 
    ]
 
};
 
var toggleHeal = function (item) {
 
    if (typeof item != 'object') {
 
        return item;
 
    } else {
 
        if (_.isArray(item)) {
 
            return _.map(item, toggleHeal);
 
        }
 
        item.heal = !item.heal;
 
    }
 
    return item
 
};
 
var toggled = _.flatten(_.map(obj, toggleHeal));
 
console.log(toggled);
// [
//     {team: "GoodGuys", hp: 12, hpMax: 100, heal: true},
//     {team: "BadGuys", hp: 90, hpMax: 250, heal: false},
//     {team: "BadGuys", hp: 120, hpMax: 250, heal: false}
// ]
```

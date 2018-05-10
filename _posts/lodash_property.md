---
title: The lodash _.property method
date: 2018-01-31 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 140
updated: 2018-01-31 15:46:48
version: 1.1
---

The [lodash](https://lodash.com/) [\_.property method](https://lodash.com/docs/4.17.4#property) is one of several methods in lodash the created another method that is to be used with another lodash method such as [\_.find](/2017/09/14/lodash-find/) or \_.map

<!-- more -->

## Basic example of \_.property

\_.property can be used as a stand alone method, by calling it with a given path in string format it will then return a method that ca be used by calling the method with an object, and then it will return the value of the path.

For example say you have a collection of objects that have a value at a given path in each object, such as a current hp value in an hp object, along with other relevant values. \_.property can be used to make a method that will get a value at that path if it is there, else it will returned undefined.

```js
var getHealth = _.property('hp.current'),
 
monster = {
    hp : {
        current : 37,
        max: 80,
        healPerTick: 0,
        hurtPerTick: 0
    },
    attack: 4
};
 
console.log( getHealth(monster) ); // 37
```

## Using \_.map with \_.property

Many real life uses for \_.property might be used with \_.map. If I am every in a situation in which I want a whole bunch of values that exist at a certain path in a bunch of objects fattened down into a simple array of primitives that can be done very quickly using \_.property with \_.map.

```js
var monsters = [
    {
        hp : {
            current : 37,
            max: 80
        },
        attack: 4
    },
    {
        hp : {
            current : 80,
            max: 80
        },
        attack: 2
    },
    {
        hp : {
            current : 7,
            max: 20
        },
        attack: 6
    }
];
 
// [37,80,7]
console.log(_.map(monsters, _.property('hp.current')));
```
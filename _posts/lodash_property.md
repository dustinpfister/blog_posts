---
title: The lodash property method
date: 2018-01-31 15:15:00
tags: [js,lodash]
layout: post
categories: lodash
id: 140
updated: 2021-10-05 10:15:18
version: 1.6
---

The [lodash](https://lodash.com/) [\_.property method](https://lodash.com/docs/4.17.4#property) is one of several methods in lodash that can be used to create a method that is to be used with another lodash method such as [\_.find](/2017/09/14/lodash-find/) or [\_.map](/2018/02/02/lodash_map/). The lodash property method returns a method that when used with a lodash method like \_.map will return a property of an element object in an array. So lets look at some simple quick examples of this method to see what the lodash property method is all about, and also if it is not that big of a deal to not even bother with it.

<!-- more -->

## 1 - Basic example of \_.property

The \_.property can be used as a stand alone method, by calling it with a given path in string format it will then return a method that ca be used by calling the method with an object, and then it will return the value of the path.

For example say you have a collection of objects that have a value at a given path in each object, such as a current hp value in an hp object, along with other relevant values. In this case the  \_.property method can be used to make a method that will get a value at that path if it is there, else it will returned undefined.

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

So there you have it there is a basic example of the lodash property method. Oddly enough this is a topic that comes up now and then. Say I have a value that is at a lengthly name space of sorts in a bunch of nested objects, something that does come up now and then. There is just typing out that lengthly chain of object property names each time, but then there is saving a reference to a variable, or using some other way of doing so such as using the lodash property method.

### 1.1 - Other ways to get a property including lodash get method, variables, and the with statement

So when it comes to just using the lodash property method to the task of making a more concise way of getting a nested object property there are a few other options in lodash as well as of course native javaScript. There is of course the lodash get and set methods that can be used to get and set object properties by way of a string value of the object property path. In addition there is also jus using a variable, and the with statement when it comes to just working with javaScript by itself. Although the with statement is not recommended,, so it is really just a matter of using a variable then.


In any case lets look at out basic example again this time doing the same thing with these other options I have mentioned.
```js
var monster = {
    hp : {
        current : 37,
        max: 80,
        healPerTick: 0,
        hurtPerTick: 0
    },
    attack: 4
};
 
// using lodash _.get
var hp = _.get(monster, 'hp.current');
console.log(hp); // 37
 
// using a variable
hp = monster.hp.current;
console.log(hp); // 37
 
// using with statement
with(monster.hp) {
  console.log( current ); // 37
}
```

## 2 - Using \_.map with \_.property

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
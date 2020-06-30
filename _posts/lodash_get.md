---
title: Get an object value by path with the _.get Object method in lodash
date: 2018-09-24 14:24:00
tags: [js,lodash]
layout: post
categories: lodash
id: 286
updated: 2020-06-30 12:32:42
version: 1.9
---

So it is time for yet another [lodash](https://lodash.com/) post, this time on the lodash [\_.get](https://lodash.com/docs/4.17.10#get) that allows me to get a value from an object by passing the object, and then a path in string format to the value that I want. This method of getting at properties of objects might prove to be a little more helpful compared to just getting properties the way one would in native javaScript in some cases, but still I can nit say this is one of the most compelling methods to support the use of lodash these days. In any case I will be writing about the lodash get method as well as other ways of getting at properties of object in general in this post.

With the lodash get method I can also pass an optional default value to the method in case the path to the value is undefined. So this might help to make the method a little more pointless, but there are still native ways of doing the same thing that I often find myself doing in place of the use of lodash get. It might also be a good idea to explore some other options for quickly getting values from an object in javaScript as well, so I will be writing about some vanilla js alternatives to \_.get while I am at it.

<!-- more -->

## 1 - What to know about \_.get, lodash and javaScript

This is a post on the \_,get method in lodash which is one of the many object methods in lodash that help with many common tasks when developing a project with lodash. These days there is much chatter on the relevance of lodash with much of the functionality of lodash now baked into core javaScript itself, so I often cover vanilla js alternatives to the method in question as well when it comes to writing these posts. In any case this is not a getting started post on lodash, or javaScript in general so I assume that you have at least some background on these topics and are now interested in exploring all of the methods in detail, along with vanilla js alternatives.

## 2 - A basic example of \_.get 

So because these posts tent to be a little boring, why not living things up a little by making a basic example of \_.get game related? Say you have an Enemy Object for a game that you are making and you want to grab an nested object that that contains information about how and instance of an Enemy will heal over time if it is damaged. The lodash \_.get method could be used to snag it my path, and also return a default value if for some reason it is not there. Although it is also not to hard to just do so with plain javaScript as well, plus it might preform better, but bare with me its just a simple example here.

### 2.1 - Using \_.get to get values by path

The \_.get method works by passing the object I want to get a value from first, and then a path in string form as the second argument, following by an optional default value in the event that there is nothing at the given path.

```js
let enemy = {
 
    // enemy health
    health: {
        current: 80,
        max: 100,
        healRate: {
            active: false,
            perTick: 5
        }
    },
 
    // index values of targets
    targets: [2, 6, 8]
 
};
 
// can get plain old object properties like this
console.log(_.get(enemy, 'health.healRate.active')); // false
 
// if it is an array I can and element get like this
// if I know the index
console.log(_.get(enemy, 'targets[2]')); // 8
 
// or like this
console.log(_.get(enemy, 'targets.2')); // 8
 
// default
console.log(_.get(enemy, 'health.healRate.overTime', {
   amount: 0,
   ticks: 0
})); // {amount:0,ticks:0}
```

### 2.2 - Vanilla js: Grabbing at object values

So when it comes to just grabbing at values, and I do not need to do so with a string form I can always just use the dot operator, or I can use square brackets to get a value if I can break down the path into more than one string.

```js
// vanilla js
console.log(enemy.health.healRate.active); // false
console.log(enemy['health']['healRate']['active']); // false
```

In most cases I can do just fine with one of these just fine, but if for some reason I really do want to get an object value by a path in string from then I Might need to find a copy an past solution on stack overflow, or make one.

### 2.3 - Making an alternative to \_.get in plain old javaScirpt

So now there is the question of making ones own lodash get method that works more or less the same way. Most of the time making a stand alone method for a lodash method is not so hard, and the lodash get method is not really an exception to this. I quickly put together this in a flash, for the most part it seems to work in the same manner, but it is not battle tested.

```js
var getByPath = function(obj, path, def) {
 
    path = path
        .replace(/\[/g, '.')
        .replace(/]/g, '')
        .split('.');
 
    path.forEach(function (level) {
        obj = obj[level];
    });
 
    if (obj === undefined) {
        return def;
    }
 
    return obj;
 
};
 
console.log(getByPath(enemy, 'targets[1]')); // 6
 
console.log(getByPath(enemy, 'health.overTime', {
        amount: 0,
        ticks: 0
    })); // { amount: 0, ticks: 0 }
```

Although it might not take to long to make my own solution for a lot of these methods in lodash if there is not a native method to use, it is still way longer than just using \_.get if lodash is part of the stack.

## 3 - Conclusion

Quickly looking over some chatter on stack overflow, and comments at the issues section at the lodash github repo it seems like one of the biggest issues to look out for is that the default value will only return if the value turns out to be undefined. If you expect the default value to return if the path returns a value like null, or false that is one reason why you might want to make your own solution for \_.get. It would not be to hard to add a forth argument to the vanilla js alternative that could be an array of values to return the default for.
---
title: Set object values with a path string in lodash with set
date: 2018-12-04 14:48:00
tags: [lodash]
layout: post
categories: lodash
id: 344
updated: 2022-02-03 09:11:52
version: 1.13
---

A few months ago I wrote a post on the [get method](/2018/09/24/lodash_get/) in the popular javaScript utility library known as [lodash](https://lodash.com/) that is used for getting a property of an object by way of a path string, and returning a default value for the property in the event that the object property is undefined. When it comes to the default value that is given to the get method that is just a return value of get to use in the event that the property value is not in the source value, the get method as the name sugests just simply gets, it does not mutate the source object in any way.

So then becuase I wrote a post on the get method, it would make sense to write a post on the lodash [set](https://lodash.com/docs/4.17.10#set) method as well. The \_.set method works just like that of the \_.get method in lodash, only it can be used to set a property rather than getting it when using path strings to do so. Another lodash method that comes to mind that might be considered a part of this set of method is the [lodash \_.has](/2019/05/15/lodash_has/) method that can be used to not get, or set, but simply check it an object has a certain path or not, returning a boolean value for the result of the check rather than any value, or default value.

However it might not be so hard to just do what these methods do with just plain vanilla javaScript by itself, so lets look a few quick examples of lodash set and other lodash methods, as well as any related topics that might come up as we do so.

<!-- more -->

Many of these tasks that the lodash \_.set and other related methods accomplish can also easily be done with just plain old javaScript. I guess the only talking point is if you find using string paths haves helpful or not.

## 1 - Basic \_.set example

The basic idea of \_.set is that a value can be set by just passing the object, and then a path in string format, followed by the value to set the property to. In the event that the property is not there then a path to it will be cerated, so it is a pretty robust litle way to make sure that object properties are always there in an object of interest.

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
 
// a path
let path = 'health.healRate.active';
 
// set the value at path
_.set(enemy, path, true);
 
// get the value at path
console.log( _.get(enemy, path) ); // true
```

### 2 - \_.set creates a path if it is not there

It's not like setting a property of an object is all that hard without lodash, but this method allows for setting the value with a string format path which can be helpful in some situations. Another added benefit is that it can also be used to create paths in the event that they are not there as well.

```js
let foo = {};
 
let path = 'bar.foobar.answer.to.life';
 
_.set(foo, path, 42);
 
console.log(_.get(foo,path)); // 42
```

## 3 - Conclusion

So I would not say that the lodash set method is one of the most interesting or even useful methods in lodash. When it comes down to it I can not say that I actually use the lodash set method in many of my projects, and also in addition I can not say that I am using lodash at all most of the time now that I think of it. There are native javaScript ways of doing the saem thing that the set methods does without the path feature that I can not say that I often really need actually, at least speaking from my experience thus far working on projects. Still if lodash is part of the stack of a project then this is one method that may come in handy now and then when it comes to setting values to objects.
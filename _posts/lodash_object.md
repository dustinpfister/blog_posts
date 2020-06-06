---
title: lodash object methods and beyond
date: 2019-02-13 13:08:00
tags: [lodash]
layout: post
categories: lodash
id: 379
updated: 2020-06-06 07:26:02
version: 1.9
---

[Lodash Object methods](https://lodash.com/docs/4.17.11#assign) start with [assign](/2018/09/21/lodash_assign/), and end with valuesIn but that is of course only the lodash methods that work with just about any object in javaScript. There are also the lodash array methods, and in JavaScript an [array is just a certain kind of object](/2017/05/12/js-arrays-are-objects/). There are also collection methods that designed to work with plain old objects by themselves, array like objects, and objects that are javaScipt arrays, that is objects with numbered key names and a length property. So there is not just the Object methods in lodash that can be used with Objects, it is more about what kind of object are you dealing with.

In this post I hope to give a general overview of lodash object methods, and also of objects in general in javaScript.

<!-- more -->

## 1 - lodash object methods

In lodash there are a number of methods that are considered object methods. These kinds of methods are intended to be used with just about any kind of object in javaScript, not just a certain kind of object that was created with a specific constructor function likes Arrays. There are a few methods that bring about functionality that still as of this writing is not part of core javaScript at all, however many others are now part of the javaScript spec. 

For example in lodash there is the \_.assign method

```js
let _ = require('lodash');
 
let obj = {n:42,a:{b:12}};
 
let obj2 = _.assign({},obj);
 
obj.a.b = 13;
console.log(obj2.a.b);
```

However there is also the native Object.assign methods as well now that works more or less the same way.

### 1.1 - Lodash merge and lodash assign

The lodash assign and merge methods are two good examples of lodash object methods. They both do more or less the same thing but with just some note worthy differences. The merge lodash object methods will recursively merge down own and inherited object properties while the lodash assign will just assign properties. Also the merge method will skip source object properties that will evaluate to undefined, while assign will not skip them and just assign everything in the source objects.

```js
let b = {
    n: 42
},
c = {
    n: undefined,
    d: {
        e: 12
    }
}
 
let m = _.merge(b, c);
console.log(m);
// { n: 42, d: { e: 12 } }
 
//
let a = _.assign(b, c);
console.log(a);
// { n: undefined, d: { e: 12 } }
```

## 2 - lodash array object methods

In lodash there are a number of methods that are intended to be used with arrays. Arrays are a kind of object in javaScript but they are a special kind of object that is formated in a way in which each key is a numbered index, and there is a length property that reflects the number of elements in the array. In addition Arrays are created using the Array constructor or array literal syntax and as such they inherit a bunch of prototype methods, some of which a similar if not identical to many lodash array methods.

## 3 - lodash collection object methods

In lodash there are a number of methods that are considered collection methods. These methods will work with javaScript objects that are created with the Array constructor. However they will also work just fine with objects that are not created with the array constructor as well, even if they are not array like. Collection methods can be though of as lodash object methods as well, but they are intended to be used with objects that have a collection like nature.

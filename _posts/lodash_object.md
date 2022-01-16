---
title: lodash object methods and beyond
date: 2019-02-13 13:08:00
tags: [lodash]
layout: post
categories: lodash
id: 379
updated: 2022-01-16 12:45:23
version: 1.19
---

In lodash methods there are a number of [Object methods](https://lodash.com/docs/4.17.11#assign) on top of [array methods](/2019/02/14/lodash_array/), and [collection methods](/2022/01/14/lodash_collection/). When it comes to array method these kinds of method will just work with an array that is given as the source object, while collection methods will work with any kind of collection not just arrays. Although it might be true that collection methods are also a kind of object method there are still methods that are designed to work with an object that is a collection of items. 

When working with a collection in one form or another I would want to loop over the own properties of a collection object only. So then maybe a good way of knowing the difference between collection methods would be to take into account the nature of the [lodash forEach](/2017/11/20/lodash_foreach/) collection method, and compare that to the [lodash forIn](/2018/09/30/lodash_forin/) object method. The forEach method will just loop over the public own properties of an object, while the forIn method will loop over all the own properties, and also the prototype object of the object as well.

In this post I hope to give a general overview of lodash object methods, and also of objects in general when it comes to just working with native javaScript alone while I am at it. This might just be what is called for in order to have a solid understanding as to what the difference is between collections and object methods in general.

<!-- more -->

## 1 - The basics of object methods, collections, and arrays

I could just start going over what the methods are as outline in the lodash documentation site, but then I think I might end up not touching base on some basic things that should be covered before hand. The main thing that comes to mind is what the difference is between a collection method, and an object method in lodash. To have a better understanding of this I am going to need to at least briefly touch base one some examples that have to do with the nature of objects themselves, not just within lodash, but within javaScript in general. In this section I will be using lodash methods where and when doing so is needed mainly the for each and for in methods in lodash that I think are good examples that show what the difference is between a collection method, and a object method.

### 1.1 - The Object define property method

The [object define property method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) is a method in core javaScript that can be used to set private keys for an object.

```js
// An array with three public keys and a private length property
let a = [1, 2, 3];
console.log( Object.keys(a) );
// [ '0', '1', '2' ]
 
// A collection formated like an array, but all own properties are public
let b = { 0: 1, 1: 2, 2: 3, length: 3 };
console.log( Object.keys(b) );
// [ '0', '1', '2', 'length' ]
 
// A collection formated like an array, and also the length property is made private
// by making use of the Object.defineProperty method
let c = { 0: 1, 1: 2, 2: 3};
Object.defineProperty(c, 'length', {value: 3});
console.log(Object.keys(c));
// [ '0', '1', '2' ]
```

### 1.2 - A Constructor function

I think another important features of javaScript that I should touch base on here is the concept of a [constructor function](/2019/02/27/js-javascript-constructor/).

```js
// a constructor function
let Foo = function(){
    let foo = this;
    _.forEach(arguments, (n, i) =>{
        foo[i] = n;
    });
    Object.defineProperty(foo, 'length', {value: _.keys(foo).length } );
};
Foo.prototype.bar = function(){
    return _.sum(_.values(this));
};
// an instance of this constructor
let foo = new Foo(1,2,3);
console.log(foo);
// Foo { '0': 1, '1': 2, '2': 3 }
```

### 1.3 - The lodash for each and for in methods

```js
let Foo = function(){
    let foo = this;
    _.forEach(arguments, (n, i) =>{
        foo[i] = n;
    });
    Object.defineProperty(foo, 'length', {value: _.keys(foo).length } );
};
Foo.prototype.bar = function(){
    return _.sum(_.values(this));
};
 
let func = (v, k) => {
    console.log(k);
};
 
let foo = new Foo(1,2,3);
 
// for each is a 'collection' method as such
// if will loop over all public own properties
_.forEach(foo, func);
// 0 1 2
 
// the forIn Object method will loop over all pubic own properties
// as well as all public properties in the prototype object of the Class
_.forIn(foo, func);
// 0 1 2 'bar'
```

## 2 - lodash object methods

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

### 2.1 - Lodash merge and lodash assign

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

## 3 - lodash array object methods

In lodash there are a number of methods that are intended to be used with arrays. Arrays are a kind of object in javaScript but they are a special kind of object that is formated in a way in which each key is a numbered index, and there is a length property that reflects the number of elements in the array. In addition Arrays are created using the Array constructor or array literal syntax and as such they inherit a bunch of prototype methods, some of which a similar if not identical to many lodash array methods.

## 4 - lodash collection object methods

In lodash there are a number of methods that are considered collection methods. These methods will work with javaScript objects that are created with the Array constructor. However they will also work just fine with objects that are not created with the array constructor as well, even if they are not array like. Collection methods can be though of as lodash object methods as well, but they are intended to be used with objects that have a collection like nature.


## 5 - Conclusion

So then lodash has a wide range of useful object methods that can be used to work with any kind of object, not just a specific class of object such as an array, or methods that will just work well with an object that is still a kind of collection.
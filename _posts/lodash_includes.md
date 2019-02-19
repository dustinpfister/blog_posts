---
title: lodash includes method to check Strings, Arrays, and Objects for a value
date: 2017-11-21 10:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 96
updated: 2019-02-19 16:25:55
version: 1.3
---

Time for yet another [one of my posts](/categories/lodash/) on [lodash](https://lodash.com/), today I will be writing about the [\_.includes](https://lodash.com/docs/4.17.4#includes) method and why It might be useful in some situations.

<!-- more -->

## lodash includes

The \_.includes method is one of the collection methods in lodash that work with Arrays, and Objects in general. In addition this method can also be used with strings. The nature of the method is one where it can be used as a means to test if a value is included in a collection. 

## Example of \_.includes With strings

```js
// Strings
var str = 'foo;man;chew';
console.log( _.includes(str,'man') ); // true
console.log( _.includes(str,'bar') ); // false
```

## Example of \_.includes With arrays

```js
// Arrays
var arr = ['a','b','c'];
console.log( _.includes(arr,42) ); // false
console.log( _.includes(arr,'d') ); // false
console.log( _.includes(arr,'c') ); // true
```

## Example of \_.includes With objets

When working with an object the method will return true if one of the key values is equal to the value given.

```js
// Objects
var obj = {name:'jack'};
console.log( _.includes(obj,'name') ); // false
console.log( _.includes(obj,'jill') ); // false
console.log( _.includes(obj,'jack') ); // true
```

## Giving a from index value

An index value can be given as the third argument to the method.

```js
console.log(_.includes(['a','b','c'],'b',1)); // true
console.log(_.includes(['a','b','c'],'b',2)); // false
```

## Negative from index values

When I give a negative from index value it counts as the index value from the end of the collection.

```js
console.log(_.includes(['a','b','c'],'b',-1)); // false
```

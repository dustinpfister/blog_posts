---
title: javaScript typeof operator
date: 2019-02-15 12:08:00
tags: [js]
layout: post
categories: js
id: 383
updated: 2019-02-15 19:25:43
version: 1.5
---

The javaScript typeof operator will return a string that is the type of the operand that is given to it from the right of the typeof keyword when used. The typeof operator might not always give the desired results, so there are some other keywords, as well as additional properties of objects in javaScript that can be used to gain some insight into what you are dealing with.

<!-- more -->

## 1 - javaScript typeof lowdown

The typeof operator has right to level associativity so to use it I just need to type the typeof operator followed by what it is that I want to find the type of. For the most part the typeof operator is fairly straights forward to use but it has a few quirks, so lets get into it.

```js
let ty = typeof 42;
console.log(ty); // 'number'
``` 

## 2 - no need to call typeof as it is an operator

In some examples I see new javaScript developers placing parentheses around what it is that they want to find the type of. This is not necessary as the typeof operator is an operator and not a function. However in some cases you might still want to use parentheses as a way to group an expression as you might get undesired results.

```js
let str = typeof 6 + '7';
console.log(str); // 'number7'
 
let n = typeof (6 + '7');
console.log(n); // 'string'
```

So if you do need to group then use parentheses otherwise they are not needed.

## 3 - Instanceof for fining out what an object is an instnace of

In most cases the typeof operator works just fine if I want to find out if something is a number, or an object. However if I want to find out what kind of object I am dealing with then in most cases typeof does not help much unless it is a function. The instanceof operator accepts two operands one to the left that is what should be an object, and the other is a constructor function. If the variable or value that is being evaluated is an instance of the constructor then the expression will evaluate to true, else false.

```js
let d = new Date();

let Foo = function(){};
let f = new Foo();

console.log(typeof d); // object
console.log(typeof f); // object
 
console.log(d instanceof Date); // true
console.log(f instanceof Foo); // true
console.log(f instanceof Date); // false
```

## 4 - constructor name

When dealing with an object another way to get the actual constructor name of the object rather than just always getting object is to look at the constructor property.

```js
let d = new Date();
console.log(d.constructor.name); // Date
```
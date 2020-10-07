---
title: javaScript Constructor Functions
date: 2019-02-27 14:31:00
tags: [js]
layout: post
categories: js
id: 392
updated: 2020-10-07 10:14:41
version: 1.17
---

In javaScript there are many [types of functions](/2019/12/16/js-function/), and also ways that functions can be used to create different kinds of functions such as pure functions, and [constructor functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor). In  this post I will be touching base on the subject of constructor functions and the use of the new keyword.

The topic of a constructor function comes up often, as it should as it is a major part of development when it comes javaScript development, and object oriented programing in general. There are built in examples of constructors that chances are you have at least some experience with, as well as ways to create your own. There is the traditional way of creating a javaScript constructor function, and then the more modern es2015+ spec javaScript way of making them as well with the class keyword. In this post I will be covering the basics, as well as some other aspects of constructors that a javaScript developer should be aware of.

<!-- more -->

## 1 - javaScript constructor

A [constructor](https://en.wikipedia.org/wiki/Constructor_(object-oriented_programming) is not something that is exclusive to javaScript, but is a major part of object oriented programming in general. The basic idea of a constructor is that it is a function that is called that creates an Object. In javaScript every time an object is created it is an instance of a constructor, and as such there are a number of prototype methods that can be used with that Object. For example an Array in javaScript is a kind of Object that is an instance of the Array constructor, and as such it has access to a number of prototype methods such as Array.slice.

## 2 - Built in constructors

There are a number of built in constructors in javaScript. One example Would be the Date Object in core javaScript. When called and used with the new keyword the Date Constructor can be used to create an instance of a Date object.

```js
var now = new Date();
// the constructor property is a reference to the
// constructor function that constructed the object
var then = new now.constructor(2009,1,13,18,31,30,321);
console.log(then.getTime()); // 1234567890321
```

Once an instance of a Constructor is created there are a number of methods in the prototype object of that constructor that can then be used to interact with that instance of the constructor.


## 3 - Making a javaScript constructor (before es2015)

The built in constructors come in handy often, but some times it is necessary to create my own constructors. The traditional way of making a javaScript constructor is to create what is often called a constructor function, followed by a prototype object.

```js
var Foo = function (foo, bar) {
    this.foo = foo;
    this.bar = bar;
};
 
Foo.prototype.foobar = function () {
    return this.foo + '-' + this.bar;
};
 
var foo = new Foo('foo','bar');
console.log(foo.foobar()); // 'foo-bar'
```

## 3.1 - Making a constructor es2015+ style

To make a constructor in modern es2015+ spec javaScript there is of course the class keyword.

```js
class Foo {
    constructor(foo, bar) {
        this.foo = foo;
        this.bar = bar;
    }
    foobar() {
        return this.foo + '-' + this.bar;
    }

};
 
let foo = new Foo('foo', 'bar');
console.log(foo.foobar()); // 'foo-bar'
console.log(foo.hasOwnProperty('foobar')); // false
```

## 4 - An alternative to constructors

A constructor or class is not always the best option. It does have some good points when it comes to anything where there might be more than one instance of something. However it might not be the best choice when it is just a single object, and there are other ways of handling things of course. 

Constructors can be thought of as a situation in which there is one or more instances of an object that can be though of as a state, and then there are a number of methods that can be used to mutate that state. An alternative to this is to have a collection of pure functions that accept this state as an one of its arguments.

```js
var state = {
    x: 7,
    y: 15
};
 
var utils = {};
 
utils.distance = function (state, x, y) {
    return Math.sqrt(Math.pow(state.x - x, 2) + Math.pow(state.y - y, 2));
};
 
console.log( utils.distance(state,9,15) ); // 2
console.log( utils.distance(state,7,20) ); // 5
console.log( utils.distance(state,14,30) ); // 16.55...
```

## 5 - Conclusion

In javaScript constructors are something that will come up often. Event if you do  nit make your own constructors changes are you will be suing them often. Every time I create a Date instance for example I am working with an object that is the product of a javaScript constructor method.
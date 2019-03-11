---
title: javaScript Constructor Functions
date: 2019-02-27 14:31:00
tags: [js]
layout: post
categories: js
id: 392
updated: 2019-03-11 13:01:50
version: 1.8
---

In javaScript the subject of constructor functions comes up often, as it should as it is a major part of development when it comes javaScript development, and object oriented programing in general. There are built in examples of constructors that chances are you have at least some experience with, as well as ways to create your own. There is the traditional way of creating a javaScript constructor function, and then the more modern es2015+ spec javaScript way of making them as well with the class keyword. In this post I will be covering the basics, as well as some other aspects of constructors that a javaScript developer should be aware of.

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

The traditional way of making a javaScript

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

## 4 - 

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
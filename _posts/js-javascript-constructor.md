---
title: javaScript Constructor Functions
date: 2019-02-27 14:31:00
tags: [js]
layout: post
categories: js
id: 392
updated: 2020-10-07 11:25:22
version: 1.27
---

In javaScript there are many [types of functions](/2019/12/16/js-function/), and also ways that functions can be used to create different kinds of functions with these types of functions such as pure functions, and [constructor functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor). In  this post I will be touching base on the subject of constructor functions, the use of the new keyword, and other related subjects that surround the use of constructor functions.

A constructor function is a function that when called with return an object that is not just an object, but a certain kind or class of an object. This Class of an object typically has properties and methods that are in the prototype object of this kind of object that are unique to the class of object that it is. There are built in examples of constructors that chances are you have at least some experience with. One such example would be the Date constructor that when used with the new keyword will return a date object. This date object is not just an object, but a class of object that has a whole bunch of methods that can be called off of the date object that is in instance of the date constructor function.

There is the traditional way of creating a javaScript constructor function, and then the more modern es2015+ spec javaScript way of making them as well with the class keyword. In this post I will be covering the basics, as well as some other aspects of constructors that a javaScript developer should be aware of when working with, and creating these types of functions in javaScript.

<!-- more -->

## 1 - javaScript constructor

A [constructor](https://en.wikipedia.org/wiki/Constructor_(object-oriented_programming) is not something that is exclusive to javaScript, but is a major part of object oriented programming in general. The basic idea of a constructor is that it is a function that is called that creates not just an Object, but a certain kind of object. 

In javaScript every time an object is created it is an instance of a constructor, and as such there are a number of prototype methods that can be used with that Object. For example an Array in javaScript is a kind of Object that is an instance of the Array constructor, and as such it has access to a number of prototype methods such as Array.slice.

In addition there is what is called the prototype chain, if a method that is called is not a property of the object itself, or the prototype object of its constructor, then javaScript looks farther down the prototype chain all the way to the base Object Class. Only in the event that the method is not found anyware in the object itself or at any location in the prototype chain will the act of calling the method result in an error that is calling an undefined value.

In this section I will be going over just a few basic examples of constructor functions in javaScript. These examples will just focus on the very basics for starters such as working with a built in javaScript constrictor, and ways to create user defined constructor functions.

## 1.1 - Built in constructors

There are a number of built in constructors in javaScript such as the String Constructor, the Array Constructor and the Date constructor. One example would be the Date Constructor in core javaScript that can be used to create a date object. When The Date Constructor is called, and used with the new keyword, the result that is returned is instance of the Date constructor. A such there are a number of useful methods to work with off of the date object that can be used to get and set values in the date object such as the getTime method.

```js
var now = new Date();
// the constructor property is a reference to the
// constructor function that constructed the object
var then = new now.constructor(2009,1,13,18,31,30,321);
console.log(then.getTime()); // 1234567890321
```

So that is the basic idea when it comes to a constructor function, you call it and what is returned is an object that is an instance of the constructor. There are a number of other built in constructors in core javaScript as well as client and sever side javaScript, however there is also making user defined constructor also.

## 1.2 - Making a javaScript constructor (before es2015)

The built in constructors come in handy often, but some times it is necessary to use a constructor that is part of a external library outside of core javaScript, or create my own custom, application specific constructors. The traditional way of making a javaScript constructor is to just write a function and assign it to a variable with a Capital letter that is often used to denote that the function is a constructor. Inside the body of this function the this keyword is used as a way to refer to what will be the resulting object that is returned when the function is called with the new keyword. After the constructor function I can then start adding methods to the prototype object for the constructor.

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

## 1.3 - Making a constructor es2015+ style

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

## 2 - An alternative to constructors, pure functions, or at least going in that direction.

A constructor or class is not always the best option when it comes to working out how to structure an application or module from the ground up. It does have some good points when it comes to anything where there might be more than one instance of something. However it still might not be the best choice when it is just a single object, and there are other ways of handling a collection of objects with shared properties 

Constructors can be thought of as a situation in which there is one or more instances of an object that can be though of as a state, and then there are a number of methods that can be used to mutate that state. An alternative to this is to have a collection of pure functions or at least pure like functions that accept this state as one of its arguments.

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

The subject of a pure function is something that I should not get into detail here, but as far as constructors are concerned the process of doing to revolves around not using them. The alternative to not using a constructor is then just creating plain old javaScript objects with a plain old function that will return one that has the properties that the object should have. Then having a collection of functions that are stand along functions where the object that is created must be passed as an argument. A true pure function is a bit more than just that, but that would be one step in that kind of direction.

## 5 - Conclusion

The topic of a constructor function comes up often, as it should, the reason why is that a constructor function is a major part of development when it comes to javaScript, and object oriented programing in general actually. Even if you do not make your own constructors chances are you will be using them often. Every time I create a Date instance for example I am working with an object that is the product of a javaScript constructor method. A Date object is not just an object but a class of an object that has a whole bunch of prototype methods to work off of such as the Date.getFullYear method.
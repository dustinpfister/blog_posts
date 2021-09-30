---
title: The javaScript Constructor Function, Classes, alternatives and more
date: 2019-02-27 14:31:00
tags: [js]
layout: post
categories: js
id: 392
updated: 2021-09-30 11:07:57
version: 1.50
---

In javaScript there are many [types of functions](/2019/12/26/js-function/) in the sense of how to make one in javaScript, such as arrow functions, function expressions, and declarations. Also there are many ways that functions can be used to create different kinds of functions that are independent of a specific language as JavaScript, some examples would be [pure functions](/2020/06/18/js-function-pure/), [monotonic functions](/2021/07/26/js-function-monotonic/), and [inverse functions](/2021/07/23/js-function-inverse/) just to name a few. So there is much to learn about functions in javaScript, not just with the language itself, but topics that surround functions in general.

However one kind of function that is close to some core functionally of javaScript is the concept of a [constructor function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor). A constructor function is a kind of function in javaScript where the new keyword is used when invoking it to make it so that the value of the this keyword inside the body of the constructor function will refer to a new instance of a class object that will be returned by the constructor. One major advantage of using these kinds of functions is making use of the prototype chain as a way to make certain methods and properties part of an object that will be a fall back object of sorts from the own properties of an instance of the constructor. So in this post I will be touching base on the subject of constructor functions, the use of the new keyword, and other related subjects that surround the use of constructor functions such as the this keyword and the prototype chain.

There are built in examples of constructors that chances are you have at least some experience with. One such example would be the [Date constructor](/2019/02/14/js-javascript-date/) that when used with the new keyword will return a date object. This date object is not just an object, but an instance of the Date class, as such there are a whole bunch of methods that can be called off of the date object instance such as the get full year method that will return the full year of the date object.

There is the traditional way of creating a javaScript constructor function, and then the more modern es2015+ spec javaScript way of making them as well with the class keyword. In this post I will be covering the basics, as well as some other aspects of constructors that a javaScript developer should be aware of when working with, and creating these types of functions in javaScript. I will also be looking into some ways to go about not making classes actually that some developers like to do, preferring to go more in a functional programing style direction with code rather than the Object Oriented Programing nature of constructors.

<!-- more -->

## 1 - javaScript constructor

A [constructor](https://en.wikipedia.org/wiki/Constructor_%28object-oriented_programming%29) is not something that is exclusive to javaScript, but is a major part of object oriented programming in general. The basic idea of a constructor is that it is a function that is called that creates not just an Object, but a certain kind of object. 

In javaScript every time an object is created it is an instance of a constructor, and as such there are a number of prototype methods that can be used with that Object. For example an Array in javaScript is a kind of Object that is an instance of the Array constructor, and as such it has access to a number of prototype methods such as Array.slice.

In addition there is what is called the prototype chain, if a method that is called is not a property of the object itself, or the prototype object of its constructor, then javaScript looks farther down the prototype chain all the way to the base Object Class. Only in the event that the method is not found anywhere in the object itself or at any location in the prototype chain will the act of calling the method result in an error that is calling an undefined value.

In this section I will be going over just a few basic examples of constructor functions in javaScript. These examples will just focus on the very basics for starters such as working with a built in javaScript constrictor, and ways to create user defined constructor functions.

### 1.1 - The source code examples here are on github

The source code examples in this post can be found on by [Github account in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-constructor). Many more source code examples are in that repository that correspond to my various other posts on vanilla javaScript. If you find something wrong with the of the source code examples in this post that would be where to make a pull requests, there is also the comments section at the bottom of this post.

### 1.2 - Built in constructors

There are a number of built in constructors in javaScript such as the String Constructor, the Array Constructor and the Date constructor. One example would be the Date Constructor in core javaScript that can be used to create a date object. When The Date Constructor is called, and used with the new keyword, the result that is returned is instance of the Date constructor. A such there are a number of useful methods to work with off of the date object that can be used to get and set values in the date object such as the getTime method.

```js
var now = new Date();
// the constructor property is a reference to the
// constructor function that constructed the object
var then = new now.constructor(2009,1,13,18,31,30,321);
console.log(then.getTime()); // 1234567890321
```

So that is the basic idea when it comes to a constructor function, you call it and what is returned is an object that is an instance of the constructor. There are a number of other built in constructors in core javaScript as well as client and sever side javaScript, however there is also making user defined constructor also.

### 1.3 - Making a javaScript constructor (before es2015)

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

### 1.4 - Making a constructor es2015+ style

To make a constructor in modern es2015+ spec javaScript there is of course the [class keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) that can be used to create class declarations and expressions.

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

Creating constructor functions this way might call for a whole new post on the subject. However it would seem that this is just a more modern way of doing the same thing with plain old function expressions and declarations. I generally prefer to keep things more in line with older specs of javaScript when writing the code for a project, but this is something that I should still at least mention here for now.

## 2 - An alternative to constructors, pure functions, or at least going in that direction.

A constructor or class is not always the best option when it comes to working out how to structure an application or module from the ground up. It does have some good points when it comes to anything where there might be more than one instance of something. However it still might not be the best choice when it is just a single object, and there are other ways of handling a collection of objects with shared properties 

Constructors can be thought of as a situation in which there is one or more instances of an object that can be though of as a state, and then there are a number of methods that can be used to mutate that state. An alternative to this is to have a collection of pure functions or at least pure like functions that accept this state as one of its arguments.

### 2.1 - create method example

First off there is starting out with a method that will create and return a plain old object by itself that contains a certain standard set of own object properties. For the sake of starting out with something fairly simple how about just a create method that will create and return an object with x and p properties, so in other words a simple create point object method.

```js
var createPointObj = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};
var point = createPointObj();
console.log(point); // { x: 0, y: 0 }
```

Simple enough, but now the next step would be to make one or more methods that will work with one of these objects.

### 2.2 - distance method

Now that I have a method that will create and return a standard point object, I would now like to have at least one method that will work with one of these point objects. One such method that comes to mind would be a distance method that will allow me to get the distance between two point objects, or a point object and some number primitives.

```js
var Points = {};
 
Points.create = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};
 
Points.distance = function (point, a, b) {
    var x = 0,
    y = 0;
    if (typeof a === 'number') {
        x = a;
        y = b === undefined ? 0 : b;
    }
    if (typeof a === 'object') {
        x = a.x;
        y = a.y;
    }
    return Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
};
 
var pt1 = Points.create(45, 20);
console.log( Points.distance(pt1, 0, 0) );
```

The subject of a pure function is something that I should not get into detail here, but as far as constructors are concerned the process of doing to revolves around not using them. The alternative to not using a constructor is then just creating plain old javaScript objects with a plain old function that will return one that has the properties that the object should have. Then having a collection of functions that are stand along functions where the object that is created must be passed as an argument. A true pure function is a bit more than just that, but that would be one step in that kind of direction.

### 2.3 - Create display object method, and updated distance method

When it comes to constructors there is the subject of inheritance. To do something like that without making use of object ordinated style constructor functions and the prototype chain I will just have to find some other way. I guess one way would be to just start making my methods a little more complex and just test for the existence of certain properties to adjust things as needed.

```js
var utils = {};
 
// create just a point object
utils.createPoint = function (x, y) {
    return {
        x: x === undefined ? 0 : x,
        y: y === undefined ? 0 : y
    };
};
 
// create a display object based off of a point object
utils.createDisp = function (opt) {
    opt = opt || {};
    var disp = utils.createPoint(opt.x, opt.y);
    disp.w = opt.w === undefined ? 32 : opt.w;
    disp.h = opt.h === undefined ? 32 : opt.h;
    return disp;
};
 
// distance will still work with points and now display objects
utils.distance = function (obj, a, b) {
    var x2 = 0,
    y2 = 0,
    x1 = obj.x,
    y1 = obj.y;
    // if disp object adjust to cx cy
    if (obj.w != undefined && obj.h != undefined) {
        x1 += obj.w / 2;
        y1 += obj.h / 2;
    }
    if (typeof a === 'number') {
        x2 = a;
        y2 = b === undefined ? 0 : b;
    }
    if (typeof a === 'object') {
        x2 = a.x;
        y2 = a.y;
        // if disp object adjust to cx cy
        if (a.w != undefined && a.h != undefined) {
            x2 += a.w / 2;
            y2 += a.h / 2;
        }
    }
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// points still work fine
var pt1 = utils.createPoint(10, 15);
console.log(utils.distance(pt1, utils.createPoint(10, 5))); // 10
// works with disp objects
var disp = utils.createDisp({
        x: 10 - 16 + 10,
        y: 15 - 16,
        w: 32,
        h: 32
    });
console.log(utils.distance(pt1, disp)); // 10
```

## 3 - Dual use functions

So there is calling a function with the new keyword, and then there is just calling a function without using the new keyword. There is a slight difference between the two when it comes to what the value of the this keyword means inside the body of the function when calling the function. When a function is called with the new keyword the value of the this keyword will refer o the new instance of the constructor function, when the function is called without the new keyword the value of the this keyword will be treated differently. This fact can be used to create what I have come to call dual use functions.

I am not sure of there is a better term for them or not, but until I find out if there is a proper name I guess I will keep just calling them dual use functions. In this section I will just be going over a few basic example of these kinds of functions and also touch base on two very different ways of doing the same thing.

### 3.1 - very basic example of what I mean by dual use

So it mainly has to do with the name of the constructor property of the value of this inside the body of the function when it is called with and without the use of the new keyword. When the constructor is called with the new keyword the value of the name property of the constructor object of the this keyword should equal the name of the constructor function. Inside the body of the function I can use this as a way to test of the function is being used as a constructor or not.

```js
var Foo = function (x, y) {
    console.log(this.constructor.name);
};
Foo();
// 'object'
new Foo();
// 'Foo'
```

So by looking at this value I can then make functions that will work as a constructor, but can also be used as just a plain old function that creates and returns just a plain old javaScript object that only has the Object methods in its prototype object. So in other words this allows for the creating of so called dual use functions that can be used to create instances of a class, or can be used to create just plain old objects that can be used with static methods.

### 3.2 - A more advanced example of dual use in action

To gain a better sense of what I Mean by dual use here is a more advanced example of such a function with a Static method attached to the function object itself, as well as the same function in the prototype that uses the same static method, but allows for this to work in a way where the function is being used as a constructor rather than just a plain old function.

```js
var Point = function (x, y) {
    // Point function is being used as a constructor
    // with the new keyword
    if (this.constructor.name === 'Point') {
        this.x = x;
        this.y = y;
    } else {
        // else The Point function is just being called
        return {
            x: x,
            y: y
        }
    }
};
 
Point.distance = function (pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
};
 
Point.prototype.distance = function (pointB) {
    return Point.distance(this, pointB);
};
 
// Use examples
var pt1 = new Point(10, 10),
pt2 = Point(15, 10);
 
console.log( pt1.distance(pt2) ); // 5
console.log( Point.distance(pt1, pt2) ); // 5
```

I am not suggesting that writing functions like this is a good idea, in fact I would say that it is not really a good idea actually. Generally I would say its a good idea to pick one or the other. Also these days I find myself going more in the direction of making just simple functions that create and return plain old objects, and then have a collection of static methods where I pass one or more of the objects as arguments, dropping the use of constructors all together. In any case if you can not make up your mind when it comes to making constructors, or just plain functions that work with objects of a certain format, then there is a third option which would be making functions like this.

## 4 - Safe Constructors

New javaScript developers might not understand the deal with constructors so great just yet, so they often might just call a constructor without the new keyword and as a result in causing errors. I have touched base on the subject of dual use functions where they are flexible with this whole thing. However there is yet another option, making a constructor return an instance of the constructor in the event that it is not used as a constructor. In other words writing a  constructor so that it will call new for the user in the event that they do not use it. By doing this it will help to ensure that the end result will indeed be an instance of the constructor.

```js
var Point = function (x, y) {
    if (!(this instanceof Point)) {
        return new Point(x, y);
    }
    this.x = x;
    this.y = y;
};
 
var a = new Point(10, 10),
b = Point(10, 10);
 
console.log( a instanceof Point); // true
console.log( b instanceof Point); // true
```

## 5 - Making a constructor reactive with getters and setters

Another subject that comes to mind is making a constructor return an object that is reactive. In other words make it so that each time a property of an object changes, such a chance will trigger a render function that will update a vue as a result of that change. Such a task can be accomplished by making use of the Object.defineProperyt method along with getters and setters.

```js
var Point = function (x, y, render) {
    self = this;
    self.locals = {};
    self.render = render || function (point) {
        console.log('pos: ' + this.x + ',' + this.y);
    };
    self.state = 'init';
    ['x', 'y'].forEach(function (key) {
        Object.defineProperty(self, key, {
            get: function () {
                return self.locals[key];
            },
            set: function (newValue) {
                self.locals[key] = newValue;
                if (self.state == 'ready') {
                    self.render(self);
                }
            }
        });
    });
    self.x = x;
    self.y = y;
    self.state = 'ready';
    self.render(self);
};
 
var a = new Point(10, 10);
 
a.x = 15;
a.y = 5;
a.x += 5;
/*
pos: 10, 10
pos: 15, 10
pos: 15, 5
pos: 20, 5
*/
```

## 6 - Conclusion

The topic of a [constructor function](https://css-tricks.com/understanding-javascript-constructors/) comes up often, as it should, the reason why is that a constructor function is a major part of development when it comes to javaScript, and object oriented programing in general actually. Even if you do not make your own constructors chances are you will be using them often. Every time I create a Date instance for example I am working with an object that is the product of a javaScript constructor method. A Date object is not just an object but a class of an object that has a whole bunch of prototype methods to work off of such as the Date.getFullYear method.
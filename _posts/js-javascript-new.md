---
title: JavaScript new operator examples
date: 2019-02-08 14:15:00
tags: [js]
layout: post
categories: js
id: 373
updated: 2021-03-31 09:27:48
version: 1.18
---

The [javaScript new](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) operator is something that will come up in the occasional code example here and there, knowing what it does, and being aware of the many other subjects that branch off from it is a must for any javaScript developer. In this post I will be touching base with some examples that make use of the new operator, and some related subjects to the use of the new operator and [constructor functions](/2019/02/27/js-javascript-constructor/) that are what the new operator is often used with.

A constructor function is a way to create a function that will constructor a type of object that contains methods and properties that are not unique properties and methods of the object itself, but are contained in the prototype object of it. If you have logged any about of time at all playing around with javaScipt chances are you might have all ready used the new keyword with a built in constructor such as the Date constructor for example.

<!-- more -->

## 1 - javaScript new operator a basic example.

The new operator is used in conjunction with a constructor function to create an instance of that constructor function. There are many such constructor functions built into core of javaScript itself such as the Date constructor that can be used to create an instance of a javaScript Date Object. So chances are the javaScript new keyword is something that a javaScript developer will run into fairly often.

To use the new operator just type new and then the constructor function that there needs to be an instance of. If no parentheses are used then default values will be used for any arguments, otherwise use parentheses to give one or more arguments to the constructor function.

So Say I want to use the new keyword to create a new instance of Date, I can do so like this.

```js
let d = new Date(2017,3,6,10,5);
console.log( d.getDate() ); // 6
console.log( d.hasOwnProperty('time')) // false
```

In this example the d variable is an instance of Date that was created using the new operator with the Date constructor function. Once I have my instance of Date I can use any of the prototype methods of the Date constructor such as Date.getDate. In addition to methods that are part of the Date constructor I can also make use of any additional prototype methods that may be in the prototype chain including the hasOneProperty methods that is part of the base Object prototype. 

## 2 - Creating a Constructor for use with the new operator in javaScript

To create my own constructor function I just need to create a function and in the body of the constructor function or any prototype method I just use the [this keyword](/2017/04/14/js-this-keyword/) as a way to refer to any property that is to be an OwnProperty of an instance of this constructor when created using the new operator.

```js
let Guy = function (x, y) {
 
    this.x = x;
    this.y = y;
 
};
 
Guy.prototype.move = function (dx, dy) {
 
    this.x += dx;
    this.y += dy;
 
};
 
let g = new Guy(10, 12);
 
g.move(-5, 7);
 
console.log(g.x,g.y); // 5 19
```

If I where to to call this method without using the new operator the method would return the undefined value which is the default value that is return when a function is called in that manner without the use of the new keyword.

## 3 - To use javaScript new, to not use javaScript new, and to use both.

It is possible to write functions that can be used with the javaScript new keyword, as well as without. By using the instance of operator to detect if the value of this inside the body of a constructor function is an instance of that constructor or not. In the event that it is not a custom object can be returned in place of a reference to the object that is the instance of that constructor.

```js
let Point = function (x, y) {
 
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
 
    if (!(this instanceof Point)) {
        return {
            x: x,
            y: y
        }
    }
 
};
console.log(new Point(5, 5));
// Point { x: 5, y: 5, dx: 0, dy: 0 }
console.log(Point(5, 5));
// { x: 5, y: 5}
```

## 4 - Arguments and calling is optional

When using the new keyword with no arguments passed to the constructor this will still result in a new instance of the constructor, but with undefined values for all the arguments. So it is often a good idea to work out some kind of solution to have default values for arguments that are not given. When it comes to using the built in Date constructor it is possible to not give any arguments at all, and when doing so the default end up being the current local system time.

One way to go about doing this is to just test for the value of undefined using a conditional operator, and then set a default value in the event that the value is undefined, while just passing along the argument value that is given in any other case.

```js
let Point = function (x, y) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
};
 
console.log( new Point(5,7) );
console.log( new Point() );
console.log( new Point );
```
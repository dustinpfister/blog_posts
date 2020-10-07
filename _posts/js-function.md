---
title: JS Function basics and much more
date: 2019-12-26 14:52:00
tags: [js]
layout: post
categories: js
id: 585
updated: 2020-10-07 17:45:56
version: 1.14
---

In [javaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) are a central part of much of the code that a javaScript developer will be studying and writing. The basics of functions in javaScript are something that can be quickly picked up in a flash, however there are many other aspects of functions in javaScript, and in general that might take longer to get solid.

<!-- more -->

## 1 - js function basic example that returns something

There are many ways to go about defining a function in javaScript such as [function expressions](/2019/01/27/js-function-expression/), [function declarations](/2019/04/11/js-function-declaration/), and yet even more options. There is getting into the depth of the differences between these kinds of functions in javaScript, but for now lets start out with a very stupid simple example of a function in javaScript.

```js
var func = function () {
    return 'Hello World';
};
 
console.log( func() );
```

Here I defined a function via a function expression and I assigned that function to a variable called func. I can then call that function and the string hello world is returned. This is the basic idea of what is accomplished with many functions, you call it and some kind of product is returned. This might be a silly pointless example, but we will be progressing on to some real examples later on in this post that also return a product when called.

## 2 - Constructor function

So another thing about functions is using them to create what is often called a [constructor function](/2019/02/27/js-javascript-constructor/), or just simply a constructor for short. Of you have been using javaScript for at least a little while thus far chances are you have used one or two all ready. One example of a built in constructor function would be the Date constructor. This Date constructor is called with the new keyword to create an instance of a date object. Once there is a date object there is a whole bunch of methods that can be called off of that data object such as the get full year method that will return the full year of that date object instance.

As a javaScript developer you can use built in constructor functions such as Date, but you can also create your own by just simply using the this keyword in the body of a function that will be used as a constructor. This user defined constructor function should be a function expression, or declarations, but not an arrow function because of how the this keyword is handled in arrow functions. Once you have a constructor function prototype methods can then be added to the prototype object of the constructor function.

In other words something like this.

```js
var Box = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 32 : opt.w;
    this.h = opt.h === undefined ? 32 : opt.h;
};
 
Box.prototype.getArea = function () {
    return this.w * this.h;
};
 
var bx = new Box({w:10, h:5});
 
console.log( bx.getArea() ); // 50
```

These days there is a lot of talk about pure functions and how they differ from constructor functions. JavaScript is not a language that is purely functional because of the built in prototype nature of functions and objects. However functional style programing can still be done with it, it is just that that style of programming is not enforced, you can break free from it if you want to by making functions like that of a constructor, or a function that uses a variable in the global scope, and so forth that violate the rules of functional programming.

## 3 - Pure functions

[Pure functions](/2020/06/18/js-function-pure/) are functions that only work with what is given via a set of arguments, and not anything that that is a global variable of object class instance. They also do not mutate and object that is given in place but return a new object.

```js
var pure = function (a, b) {
    return a + b;
};
 
console.log(pure(1, 1));
```

## 4 - Arrow functions

In late specs of javaScript there are now [arrow functions](/2019/02/17/js-arrow-functions/), these kinds of functions are nice and concise. There is one draw back to using arrow functions though and that has to do with how the this keyword is handled, because of that they can not be used as a drop in replacement for other kids of options that work better with function prototype methods like call and apply.

```js
let foo = _ => 'bar';
 
let bar = ()=> 'foobar';
 
let pow = n => 'pow: '+ Math.pow(2,n);

let est = (s,c) => {
    return s / c * 6.5 
};
console.log(foo()); // 'bar'
console.log(foo(4)); // 'pow: 16'
```
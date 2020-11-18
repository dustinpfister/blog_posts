---
title: Arrow Functions in javaScript are not a drop in replacement for all functions
date: 2019-02-17 10:39:00
tags: [js]
layout: post
categories: js
id: 385
updated: 2020-11-18 11:24:06
version: 1.14
---

In [ecma2015](https://en.wikipedia.org/wiki/ECMAScript) spec javaScript [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) where introduced as a more concise way of defining [functions in JavaScript](/2019/12/26/js-function/) compared to the older function [declarations](/2019/04/11/js-function-declaration/) and [expressions](/2019/01/27/js-function-expression/). 

These kinds of functions preform more or less the same way as traditional function expressions and function declarations. However there are a few quirks with them, so they are not always a drop in replacement for all functions in all situations. If you do that in some cases it might work okay, but other times the code might break mainly because of the differences with how the [this keyword](/2017/04/14/js-this-keyword/) is treated with javaScript arrow functions compared to other alternatives. So there is more to arrow functions than just a more concise way to write a function in javaScript so lets take a second look at arrow functions, and how they compare to the other options available when writing functions in javaScript.

<!-- more -->

## 1 - Arrow functions in javaScript

Arrow functions in javaScipt are a much more concise way to write a function in javaScript compared to the alternatives. To do so in it's most primitive form I just need to type  a single argument, then an equal sign followed my a greater than symbol, followed by something that is to be implicitly returned when the function is called. However I often will also want to include the parentheses that can be used to declare some arguments that I can use in an expression, and also some curly brackets if the function is going  to be a few lines of code.

So Some basic examples of arrow functions might look like this.

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

If I am writing pure functions rather than any function that will be part of a prototype object that arrow functions will work just fine. However the value of the this keyword differs inside the body of an arrow function, so lets look at some more examples so we know when to use arrow functions and when to make use of one of the other options such as a function declaration.

## 2 - Comparison to traditional functions

Arrow functions are now yet another option on top of function expressions, and function declarations. I will not be getting into detail about expressions and declarations here. However I will say that arrow functions are not a replacement to these, they are just yet another option to work with.

```js
// function expression AKA function literal
let foo = function (a, b) {
    return a + b;
};
 
// function statement AKA function declaration
function bar(a, b) {
    return a + b;
};
 
// Arrow Function
let baz = (a, b) => a + b;
 
// In many cases they all seem to work the same way.
console.log(foo(1, 1)); // 2
console.log(bar(1, 1)); // 2
console.log(baz(1, 1)); // 2
```

The main difference between the two other options has to do with how the this keyword is handled in the body of an arrow function. With function expressions and declarations it is possible to set the value of the this keyword with Function.call, Function.apply, or Function.bind. However with arrow functions this does not work. An arrow function is also not a good choice when writing prototype methods for a class, again because of the nature of the this keyword when using arrow functions.

## 3 - The this statement and arrow functions

So with arrow functions the this keyword is not treated the same way. When Working with nested functions or closures the self variable is often used as a way to store that value of the this keyword that can then be accessed from within another function within the function. In addition a Function prototype method like Function.call can be used to set the value of the this keyword as well. However with arrow functions this is not the case.

```js
var func1 = function () {
    var self = this;
    self.x = self.x === undefined ? 5 : self.x;
    return function (dx) {
        return self.x + dx;
    };
};
 
console.log( func1()(40)); // 45
console.log( func1.call({x:2})(2)); // 4
 
var func2 = () => {
    this.x = this.x === undefined ? 5 : this.x;
    return (dx) => {
        return this.x + dx;
    };
};
 
console.log( func2()(40)); // 45
console.log( func2.call({x:2})(2)); // 7
```

## 4 - now arguments object in an arrow function

Another draw back of using arrow function is that there will be no arguments object in the body of the function to work with.

## 5 - Conclusion

So arrow functions are a nice addition but they are not always a drop in replacement for all functions that might exist in some legacy code. However when it comes to writing new code in a very functional way then just using arrow functions alone might work out okay. Still it might be a good idea to at least be aware of the older function declaration and expression options and why it is that the use of them is not necessarily out dated.
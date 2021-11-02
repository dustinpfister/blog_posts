---
title: Arrow Functions in javaScript are not a drop in replacement for all functions
date: 2019-02-17 10:39:00
tags: [js]
layout: post
categories: js
id: 385
updated: 2021-11-02 11:16:39
version: 1.19
---

In [ecma2015](https://en.wikipedia.org/wiki/ECMAScript) spec javaScript [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) where introduced as a more concise way of defining [functions in JavaScript](/2019/12/26/js-function/) compared to the older function [declarations](/2019/04/11/js-function-declaration/) and [expressions](/2019/01/27/js-function-expression/). 

These kinds of functions preform more or less the same way as traditional function expressions and function declarations when it comes to many typical use cases of functions in javaScript. However there are a few quirks with them, so they are not always a drop in replacement for all functions in all situations. If you do just start replacing other types of functions with array functions without thinking in some cases it might work okay, but other times the code might break mainly because of the differences with how the [this keyword](/2017/04/14/js-this-keyword/) in arrow functions. 

With arrow functions the this keyword is treated in a different way compared to other alternatives, and as such it will not work as expected when using Function prototype methods such as Function.call. There are some other little issues that might creep up also when using arrow functions such as with the arguments object. So there is more to arrow functions than just a more concise way to write a function in javaScript so lets take a second look at arrow functions, and how they compare to the other options available when writing functions in javaScript.

<!-- more -->

## 1 - Arrow functions in javaScript

Arrow functions in javaScipt are a much more concise way to write a function in javaScript compared to the alternatives. To do so in it's most primitive form I just need to type  a single argument, then an equal sign followed my a greater than symbol, followed by something that is to be implicitly returned when the function is called. However I often will also want to include the parentheses that can be used to declare some arguments that I can use in an expression, and also some curly brackets if the function is going  to be a few lines of code.

In this section I will be starting out with some basic examples of arrow functions in core javaScriot by itself. Although this is very much a basic section it is not a getting started with javaScript in general type post. Also arrow functions are very much just one of many options when it comes to writing functions in javaScript, so it might be a good idea to check out some kind of post that is a main starting point of JavaScript functions in general.

### 1.1 - Basic example of arrow function

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

So with arrow functions the this keyword is not treated the same way as it is in other types of functions. When working with nested functions or closures the self variable is often used as a way to store the value of the this keyword that can then be accessed from within another nested function. In addition a Function prototype method like Function.call can be used to set the value of the this keyword as well when calling a function. 

However with arrow functions the this keyword will not give expected results.

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

With arrow functions any value that is given for this via Function.call will just be ignored, and it will be as if the function was just called normally. There are some how say that this should not be used, as well as everything that this leads to. With that said if I where to stick to just working with values that are given via arguments then this should not be a problem. However there are problems with the arguments object also when it comes to arrow functions.

## 4 - The arguments object in an arrow function

Another draw back of using arrow function is that the arguments object in the body of the function will not work as expected. The length property will give a value of zero when the actual number of arguments given is more than that. This is yet another reason why I often go with function expressions, or declarations over arrow functions.

```js
// using an arrow function, and the arguments.length prop
let func1 = (a, b) => {
    if(arguments.length === 2){
        return a + b;
    }
    return a;
};
// same function only using a function expression in place of an arrow function
let func2 = function(a, b) {
    if(arguments.length === 2){
        return a + b;
    }
    return a;
};
// arrow function will have wrong values for arguments.length
console.log( func1(1, 1) ); // 1
console.log( func2(1, 1) ); // 2
```

## 5 - Conclusion

So arrow functions are a nice addition but they are not always a drop in replacement for all functions that might exist in some legacy code. However when it comes to writing new code in a very functional way then just using arrow functions alone might work out okay. 

Still it might be a good idea to at least be aware of the older function declaration and expression options and why it is that the use of them is not necessarily out dated. If you want to just choose one type of function all the time, then arrow functions might lead to problems when it comes to taking an approach where one needs to do things with Function prototype methods, and the arguments object, so maybe function expressions are a decent first choice still if you are not always sure which to use.
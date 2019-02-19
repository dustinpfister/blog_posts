---
title: Arrow Functions
date: 2019-02-17 10:39:00
tags: [js]
layout: post
categories: js
id: 385
updated: 2019-02-19 17:41:51
version: 1.4
---

In ecma2015 spec javaScript Arrow functions where introduced as a more concise ways of defining functions. These kinds of functions preform more or less the same way as traditional function expressions and function declarations. However there are a few quirks with them, so they are not always a drop in replacement for all functions in all situations. If you do that in some cases it might work okay, but other times the code might break. So there is more to arrow functions than just a more concise way to write a function in javaScript so lets take a second look at arrow functions and how they compare to the alternatives.

<!-- more -->

## 1 - Arrow functions

Arrow functions in javaScipt are a much more concise way to write a function in javaScript compared to the alternatives. To do so in it's most primitive form I just need to type  a single argument, then an equal sign followed my a greater than symbol, followed by something that is to be implicitly returned when the function is called.

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


## 2 - Comparison to traditional functions

Arrow functions are now yet another option on top of function expressions, and function declarations. I will not be getting into detail about expressions and declarations here. However I will say that arrow functions are not a replacement to these, just yet another option to work with.

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

The main difference between the two other options has to do with how the this keyword is handled in the body of an arrow function. With function expressions and declarations it is possible to set the value of the this keyword with Function.call, Function.apply, or Function.bind. However with arrow functions this does not work.
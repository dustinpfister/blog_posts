---
title: Function Declarations in javaScript
date: 2019-04-11 14:14:00
tags: [js]
layout: post
categories: js
id: 414
updated: 2021-10-15 15:49:19
version: 1.34
---

In javaScript there is more than one way to define a function, depending on the nature of the function all the different ways of defining a function will work okay, or not, depending on the situation in which they are used. For example arrow functions will work okay in most cases, however because of how the this keyword is treated with arrow functions it is not a good choice when writing a constructor function. This along with several other concerns that come up would maybe be a good reason to consider other options when it comes to writing functions i n javaScript such as function expressions and function declarations.

So it is important to understand the differences between the different ways of how to go about writing functions in javaScript so you know which to use in a given situation. In this post I will be writing about [function declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), but for comparison I will also be touching base on [function expressions](/2019/01/27/js-function-expression/) and [arrow functions](/2019/02/17/js-arrow-functions/) as well so you have something to compare to here without having to read up on them more elsewhere. However if you do want to read up more on functions in general I have a main post on just javaScript [functions in general](/2019/12/26/js-function/) when it comes to the basics of functions and what can be done with them in javaScript.

<!-- more -->

## 1 - Function Declaration basics in javaScript

In this section I will just be going over a few quick examples of making function declarations, just for the sake of getting started. After that I think I will be getting into what the deal is when it comes to comparing function declarations to other options when it comes to writing functions in javaScript.

### 1.1 - Basic function declaration example

To create a function declaration start out by typing the function keyword followed by a name for the function, then opening and closing parentheses that might contain one or more optional parameters for the function followed by opening and closing brackets. This way of defining a function differs slightly from a function expression, and arrow functions, as well as other ways of defining a function such as using the Function constructor. There is of course the slight differences in syntax when it comes to just looking at code, but there are also differences in terms of how they behave at run time. More on that later, but for now lets just look at a basic example of a function declaration when it comes to syntax.

So a function declaration might look something like this:

```js
function foo() {
    return 'bar';
};
 
console.log( foo() );
```

However there is more to a function declaration in javaScript than just the lexical structure of it, there are differences in the way that they behave as well when compared to other ways of defining functions in javaScript. There are a significant number of ways to go about defining functions in javaScript, but for the most part it is mainly function declarations, function expressions, and arrow functions that are of interest. The reason why I say that is because those are the types of functions that a javaScript developer will run into most of the time when studying code examples in the wild.

Sure there are some wried ways of defining them that involve passing a string to the Function constructor or making use of eval, but for the sake of this post  I do not want to get to far off topic from function declarations.

### 1.2 - A function declaration is a good choice for making a constructor function

When it comes to writing what is called a [constructor function](/2019/02/27/js-javascript-constructor/), a function declaration is a good choice for this kind of function. I will not be getting into detail about this kind of function, as well as many related topics such as the prototype chain, and Object Orientated Programing. However I think A quick hello world style example of a constructor is called for here.

```js
// simple constructor function example
function Box(x, y, w, h) {
    this.x = x === undefined ? 0 : x;
    this.y = y === undefined ? 0 : y;
    this.w = w === undefined ? 10 : w;
    this.h = h === undefined ? 10 : h;
};
 
Box.prototype.area = function () {
    return this.w * this.h;
};
 
var bx = new Box();
console.log(bx.area()); // 100
```

### 1.3 - Writing pure functions as declarations

Another kind of function that is at odds with a constructor would be a [pure function](/2020/06/18/js-function-pure/). There are a few rules that need to be observed when wring these kinds of functions one of which is making sure that the same result is always returned for the same set of arguments. When it comes to constructor functions, and mainly the prototype methods of the class instances that are created with them, the end result that is returned can differ for the same set of arguments depending on the value of the this keyword, and if the new keyword is used or not. 

Although a pure function can be written with a wide range of options for creating functions, the job can be done with declarations just fine.

```js
// simple pure function using a declaration
function area(w, h) {
    w = w === undefined ? 0 : w;
    w = w === undefined ? 0 : w;
    return w * h;
};
// an example of a function that is not a pure function
function randomArea(sx, sy, mw, mh){
    var w = Math.round(Math.random() * mw),
    h = Math.round(Math.random() * mh);
    return {
        x: sx + Math.floor((mw - w) * Math.random()),
        y: sy + Math.floor((mh - h) * Math.random()),
        w: w,
        h: h
    };
};
// a pure function will always give the same result
// for the same arguments
console.log( area(10, 10) ); // 100
// if not then it is not a pure function
console.log(randomArea(10, 10, 10, 10)); // (an object with random props each time)
```

### 1.4 - All the source code examples here and more or on Github

I think I will also take a moment in this section to mention that all the source code examples in this post, as well as all my other posts on vanilla javaScript can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-function-declaration). I often take a moment to mention this in the getting started type sections of these posts. Like many of my other posts on subjects like this I come around to doing a little editing now and then, so I have the latest version of the source code files there. Also there may be some notes and so forth when it comes to what I am planing for the next time I come around to doing a little  ore editing.

## 2 - Function declarations compared to Function Expressions

So the two main ways to create a function in javaScript in order ECMA-262 R5 spec javaScript was to use a function declaration or a function expression. There are still a number of other ways to create functions such as using eval, or the function constructor, but for the most part it is just those two kinds of functions that where of concern. In later specs of javaScript there are now even more options when it comes to creating functions, but in this section I will be focusing on just function declarations and expressions and the reasons why those two stand apart from each other.

### 2.1 - First off a word on function expressions

Aside from function declarations the other most common way to go about defining functions before the introduction of arrow functions was the so called [function expression](/2019/01/27/js-function-expression/) or function literal as it is also often referred to as. The function expression has a slightly different syntax that involves typing the function keyword followed by opening and closing parentheses and then the brackets. A function expression is the result of this expression that is typically stored in a variable, and then it is that variable that is called to execute the function.

The same basic function declaration above could then be written like this as an expression then

```js

let foo = function() {
    return 'bar';
};
 
console.log( foo() ); // 'bar'
``` 

A function expression does not have to be stored in a variable though, they can be used with the group operator and then called outside of that group operator so that they can be used in an anonymous way. In there words they can be used in a self executing from that is often referred to as an [Immediately Invoked Function Expression](/2020/02/04/js-iife/). For the most part function expressions strike me as being a little more flexible compared to declarations, but they are still not a replacement for them for one significant reason that I will be getting to in the next section.

### 2.2 - Function Declarations can be called anywhere while expressions can not

One of the major differences between function declarations and expressions is that declarations can be called anywhere within the body of code in which the function declaration is defined. So a function declaration can be placed at the bottom of a javaScript file, and called at above it, attempting to do so with a function expression will typically result calling undefined which will of course throw a nasty error.

```js
// function declarations can be called anywhere
// within the body of code
console.log(foo()); // 'bar'
 
function foo() {
    return 'bar';
};
 
// function expressions can not be called
// before they are assigned to a variable
try {
    bar(); // ERROR
} catch (e) {
    console.log(e.message); // 'bar is not defined'
}
let bar = function () {
    return 'foo';
};
console.log(bar()); // 'foo'
```

So function declarations might come off as being a little less versatile compared to expressions, but this feature about them is one reason why I might choose to use them from time to time. When using expressions I need to take care that I am defining expressions towards the top of the module and make sure that any call s for that function are below them.

### 2.3 - High order functions and expressions

Another thing about function expressions as that they are generally regarded as a better choice when it comes to working with high order functions. In other words working with a function that will take a function as an argument. The main reason why this might be may have to do with being able to pass one as an argument for a function call without having to declare it to a variable name first.

So expressions can be used like this:

```js
function foobar(bar){
    return 'foo' + bar();
}
// expressions do not need to be defined first
console.log( foobar(function(){
    return 'baz'
}) );
```

When it comes to declarations I have to well, declare them first.

```js
// of course a function declaration can be
// given as an argument to another function
function foo(){
    return 'bar'
}
function foobar(bar){
    return 'foo' + bar();
}
console.log( foobar(foo) );
```

## 3 - Function declarations compared to Arrow Functions

[Arrow functions](/2019/02/17/js-arrow-functions/) where introduced in es2015+ spec javaScript, these functions work fine in most typical situations that require a function or two, but they can not be used as a full drop in replacement for all functions i javaScript code. The scope of the this keyword is handled differently compared to function declarations so when it comes to anything that involves the use of Function.call or the new operator a function declaration or function expression still needs to be used in place of an arrow function.

### 3.1 - The this keyword

The main thing about arrow functions is that they handle the situation with the [this keyword](/2017/04/14/js-this-keyword/) in a whole other way compared to the other options. I am used to the this keyword referring to a class object instance such as with constructors, and class methods. That is not at all the case with arrow functions.

```js
// with arrow functions the this
// keyword is handled differently compared
// to declarations and expressions
 
// with arrow functions the this keyword refers to a
// scope that is one level up
this.b = 2;
let arrow = (a) => this.b + a;
console.log(arrow(40)); // 42
 
// with declarations this is not the case
function declar(a) {
    return this.b + a;
};
console.log(declar(40)); // NaN
```

### 3.2 - Using function prototype methods

One will run into problems with arrow function when it comes to using the [function prototype methods](/2017/09/21/js-call-apply-and-bind/) such as apply, bind and call. Again this has to do with how the this keyword works wit arrow functions, so typically I will only want to use these methods that are ether function declarations, or functions that behave like them at least.

```js
// declarations (and expressions) can
// be used with Function methods like Function.call
console.log(declar.call({
        b: 5
    }, 25)); // 30
// arrow functions can not, the this keyword will
// still refer to the top level scope here
console.log(arrow.call({
        b: 5
    }, 25)); // 27
```

### 3.3 - Constructors

Arrow functions will not work so great when it comes to making a constructor function. The reason why is again because of how these functions work with the this keyword. So then this is yet again another reason why one should stick to using the old tired yet true types of functions, unless they are sure that arrow functions will work without issue.

```js
// declarations can also be used to create constructors
// while arrow functions can not
function MyCon(b) {
    this.b = b;
};
MyCon.prototype.func = function (a) {
    return this.b + a;
};
let d = new MyCon(50);
console.log(d.func(15)); // 65
```

### 3.4 - The arguments object

Another thing that is lost as a result of using arrow functions is the [arguments object](/2019/01/21/js-javascript-arguments-object/) which is a nice feature to have to work with inside the body of a function. This object can be used to find out how many arguments where given when the function was called, and also it can be used as an alternative way to get the values of such arguments. Say that I want to have a function that can take 0 or more arguments and do something with all the values such as some kind of sum function. This can be done with function declarations as well as expressions by way of the arguments object, however such code will not work in an arrow function.

```js
// declarations (and expressions) can
// make use of the arguments object which
// can come in handy
function add(){
  return Array.prototype.reduce.call(arguments, function(acc, n){
      return acc += typeof n === 'number' ? n: 0;
  }, 0);
};
console.log(add(1, 2, 3, 4)); // 10
 
var add2 = () => {
  return Array.prototype.reduce.call(arguments, function(acc, n){
      return acc += typeof n === 'number' ? n: 0;
  }, 0);
};
console.log(add2(1, 2, 3, 4)); // 10
```

## 4 - Conclusion

When it comes to function declarations the main thing that comes to mind about them is that I can declare a function anywhere in the body of a javaScript file, and then use that function anywhere in the file right away. For this reason many developers use them in place of function expressions, but I do not fine myself using them that much. I often prefer to use function expressions, but for the most part that is just a coding style thing, I still see the subtle pros and cons of each and would not say that one way should always be used over another.
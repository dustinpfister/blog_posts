---
title: Function Declarations in javaScript
date: 2019-04-11 14:14:00
tags: [js]
layout: post
categories: js
id: 414
updated: 2020-10-05 09:15:32
version: 1.12
---

In javaScript there is more than one way to [define a function](/2019/12/26/js-function/), depending on the nature of the function all the different ways of defining a function will work okay, or not, depending on the situation in which they are used. For example arrow functions will work okay in most cases, however because of how the this keyword is treated with arrow functions it is not a good choice when writing a constructor function. This along with several other concerns that come up would maybe be a good reason to consider other options when it comes to writing functions i n javaScript such as function expressions and function declarations.

So it is important to understand the differences between the different ways of how to go about writing functions in javaScript so you know which to use in a given situation. In this post I will be writing about [function declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), but for comparison I will also be touching base on [function expressions](/2019/01/27/js-function-expression/) and [arrow functions](/2019/02/17/js-arrow-functions/) as well so you have something to compare to here without having to read up on them more elsewhere. However if you do want to read up more on functions in general I have a main post on just javaScript [functions in general](/2019/12/26/js-function/) when it comes to the basics of functions and what can be done with them in javaScript.

<!-- more -->

## 1 - Function Declaration basics in javaScript

To create a function declaration start out by typing the function keyword followed by a name for the function, then opening and closing parentheses that might contain one or more optional parameters for the function followed by opening and closing brackets. This way of defining a function differs slightly from a function expression, and arrow functions, as well as other ways of defining a function such as using the Function constructor.

So a function declaration might look something like this:

```js
function foo() {
    return 'bar';
};
 
console.log( foo() );
```

However there is more to a function declaration in javaScript than just the lexical structure of it, there are differences in the way that they behave as well when compared to other ways of defining functions in javaScript. There are a significant number of ways to go about defining functions in javaScript, but for the most part it is mainly function declarations, function expressions, and arrow functions that are of interest. The reason why I say that is because those are the types of functions that a javaScript developer will run into most of the time when studying code examples in the wild.

Sure there are some wried ways of defining them that involve passing a string to the Function constructor or making use of eval, but for the sake of this post  I do not want to get to far off topic from function declarations.

## 2 - Function declarations compared to Function Expressions

Aside from function declarations the other most common way to go about defining functions before the introduction of arrow functions was the so called [function expression](/2019/01/27/js-function-expression/) or function literal as it is also often referred to as. The function expression has a slightly different syntax that involves typing the function keyword followed by opening and closing parentheses and then the brackets. it is the result of this expression that is typically stored in a variable, and then it is that variable that is called to execute the function.

The same basic function declaration above cound then be written like this as an expression then

```js

let foo = function() {
    return 'bar';
};
 
console.log( foo() ); // 'bar'
``` 

### 2.1 - Function Declarations can be called anywhere while expressions can not

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

## 3 - Function declarations compared to Arrow Functions

[Arrow functions](/2019/02/17/js-arrow-functions/) where introduced in es2015+ spec javaScript, these functions work fine in most typical situations that require a function or two, but they can not be used as a full drop in replacement for all functions i javaScript code. The scope of the this keyword is handled differently compared to function declarations so when it comes to anything that involves the use of Function.call or the new operator a function declaration or function expression still needs to be used in place of an arrow function.

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

## 4 - Conclusion

When it comes to function declarations the main thing that comes to mind about them is that I can declare a function anywhere in the body of a javaScript file, and then use that function anywhere in the file right away. For this reason many developers use them in place of function expressions, but I do not fine myself using them that much. I often prefer to use function expressions, but for the most part that is just a coding style thing, I still see the subtle pros and cons of each and would not say that one way should always be used over another.
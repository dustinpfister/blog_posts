---
title: javaScript return statement
date: 2019-03-01 17:56:00
tags: [js]
layout: post
categories: js
id: 393
updated: 2019-12-01 17:58:05
version: 1.10
---

The [javaScipt return statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return) is used in the body of a function to return a product when the function is called. The product that is returned can just be a simple primitive, but things get more interesting when it is an object, or a function. The return statement can also be used as an alternative to the break keyword in the body of a function if looping is no longe required, and is also an important part of creating closures.

In this post I will be exploring some examples that have to do with the return statement in javaScript and touch base on some related topics surrounding the javaScript return keyword as well.

<!-- more -->

## 1 - return statement

For a very simple example of the return statement here I have a function declaration that just simply adds two numbers (or concatenates a string) and returns the product of that operation.

```js
// ES5- function deceleration that returns a product
function foo(a, b) {
    return a + b;
};
 
console.log(foo(5,2)); // 7
```

So the return statement is necessary when it comes to authoring any kind of function that will ultimately return a number, string or any kind of product in the form of an Object or another inner function. In this example it is just a simple single operation expression, but it could be a lengthly expression that I do not care to repeat each time I need to use it in a lengthy body of code.

### 1.1 - Another example of return with a lengthy expression

For a more practical example say you want to have a function that can be used to figure out an estimate on how much ad revenue potential a certain search keyword might have. 

If I know how much average monthly impression traffic a keyword has, and what the relative score and compare values of the keyword are at Google trends. Then I can use this data along with other averages for revenue per thousand and click threw rate to figure a crude estimate on keyword value.

```js
var figMoney = function (score, compare, rpm, imp, ctr) {
    ctr = ctr === undefined ? 0.5 : ctr;
    imp = imp === undefined ? 6.5 : imp;
    rpm = rpm === undefined ? 1.5 : rpm;
    compare = compare === undefined ? 1 : compare;
    score = score === undefined ? 0 : score;
 
    // lengthly expression
    return '$' + (score / compare * imp * ctr * rpm).toFixed(2);
};
 
console.log( figMoney() ); // '$0.00'
console.log( figMoney(77, 5, 2) ); // '$100.10'
console.log( figMoney(7, 5, 1.4,6.5,0.12) ); // '$1.53'
```

## 2 - return and function types.

There is more than one way to define a function that returns something in javaScript. There are function expressions, function declarations, and arrow functions.

```js
// ES5- Style function expression that returns a 
// product
var foo = function (a, b) {
    return a + b;
};
 
// ES2015+ style arrow function with brackets that 
// returns a product
let bar = (a, b) => {
    return a + b;
};
 
// ES2015+ style arrow function with an implicit 
// return of a product
 
let baz = (a, b) => a + b;
 
console.log(foo(5,2)); // 7
console.log(bar(5,2)); // 7
console.log(baz(5,2)); // 7
```

The return keyword must be used with function expressions, and function declarations. However with arrow functions it depends on how they are authored. If brackets are not used with an arrow function then a return is implicate and the return keyword is not needed. However if brackets are used with an arrow function then the return keyword must be used just like with expressions, and declarations.

## 3 - The javaScript return keyword and closures

One aspect of javaScript that is often considered advanced javaScript is the use of closures. A closure is a situation in which the function is what is returned by another function using the javaScript return keyword. In this section I will be going over some examples of closures that make used of the return keyword.

### 3.1 - Very basic count closure example

So lets start out with a very simple example of a closure that is just a basic counter. This example is then just a function that returns an inner function with the return keyword, and that function in turn also uses the javaScript return keyword to return the current value of a variable that is local to the outer most function.

```js
var count = function (si) {
    var i = si === undefined ? 0 : si;
    return function () {
        i += 1;
        return i;
    };
};
 
var c = count();
 
console.log( c() ); // 1
console.log( c() ); // 2
console.log( c() ); // 3
```

The current value of I can not be accessed from the outside, however the value is stepped and returned each time the inner function is called. This is the basic idea of a closure, there are variables that are location to an other function and then inner functions that work with those local variables.

### 3.2 - Framed closure example that uses javaScrit return keyword

Now that we understand the basics lets look at another example of closures and the javaScript return keyword that is not so basic. With this example I have a function that returns a function but also some additional static methods that are attached to the function that is returned. It also accepts a function as a property of an options argument that is passed to it when it is called.

```js
var framed = function (opt) {
    // local options
    opt = opt || {};
    opt.forFrame = opt.forFrame || function () {};
    opt.maxFrame = opt.maxFrame || 50;
    opt.frame = opt.frame === undefined ? 0 : opt.frame;
    // helpers
    var wrapFrame = function (frame) {
        if (frame >= opt.maxFrame) {
            return frame % opt.maxFrame;
        }
        if (frame < 0) {
            return opt.maxFrame - Math.abs(frame) % opt.maxFrame;
        }
        return frame;
    };
    var getState = function (frame, maxFrame) {
        var per = frame / maxFrame;
        return {
            frame: frame,
            maxFrame: maxFrame,
            per: per,
            bias: 1 - Math.abs(0.5 - per) / 0.5
        };
    };
    var step = function (delta) {
        opt.frame = wrapFrame(opt.frame + delta);
        return opt.frame;
    };
    var call = function () {
        var state = getState(opt.frame, opt.maxFrame);
        opt.forFrame.call(state, state, opt.frame, opt.maxFrame);
    };
 
    // the public api
    var api = function (frame) {
        opt.frame = wrapFrame(frame === undefined ? opt.frame : frame);
        call();
        step(1);
    };
    // make some additional methods public
    api.step = step;
    api.getState = getState;
    api.call = call;
    // return the public API that is a function
    // with some methods attached
    return api;
};
 
var ani = framed({
        maxFrame: 100,
        forFrame: function () {
            console.log(this.per);
        }
    });
 
setInterval(function () {
    ani();
}, 100);
```
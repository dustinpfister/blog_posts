---
title: function expressions in javaScript
date: 2019-01-27 18:44:00
tags: [js]
layout: post
categories: js
id: 366
updated: 2020-11-17 12:55:52
version: 1.24
---

There are many ways to go about defining a function in javaScript one such was is by writing [Function expressions](https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function), which are also sometimes called function literals. A function expression is a way to define a function as an expression rather than a statement, or declaration which is another traditional way of defining a function. 

There are even more ways to go about defining a function on top of just expressions and declarations in modern specs of javaScript there are now [arrow functions](/2019/02/17/js-arrow-functions/) which often prove to be a more concise way t define a function, however the this keyword is handled differently so it is not always a drop in replacement for expressions and declarations. There is also using the function constructor to create functions my way of passing a string of javaScript code for the function to a constructor, the returned result is then a new function. I can not say I create functions that way often, but it is yet another way to do so. However this post is mainly just on function expressions, so I will not be getting into those in detail here.

Function Expressions have some advantages over [function statements or declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), but they are also not necessary a full replacement for function statements. There are also may other ways to create a function in javaScript such as array functions and the Function constructor.  However in this post I will be going mainly over some of the ins and outs of function expressions in javaScript, and why they can come in handy now and then.

<!-- more -->


## 1 - function expressions in javaScript a basic example

A function expression is a named or unnamed function that can be assigned to a variable using a keyword like var or let. However they also do nit have to be assigned to a variables they can remain anonymous, and are often what is used to create such a function in javaScript. A very basic example of a function expression might look something like this.

```js
let foo = function () {
 
    return 'bar';
 
};
 
console.log( foo() ); // 'bar'

```

This differs from a function statement that would start with the function keyword followed by an identifier for the function. Function expressions are often used like this, where the function expression is assigned to a variable. However they can also be self executing and return something else to a variable, or not be used with assignment at all.

## 2 - Named function expressions

It is possible to name function expressions in a similar manner as one would if they where function statements. However the identifier that is assigned to a named function expression can only be used inside the scope of that function expression.

So for example something like this should work.
```js
let c = 0,
a = function bar() {
    console.log(5 + c);
    if (c < 5) {
        c++;
        bar();
    }
};

a();
```

However if the bar method where to be called outside the scope of the function expression it would result in the value undefined being called which of course would result in an error.

## 3 - Variable hoisting and function expressions

Variable hoisting in javaScript is where a variable can get hoisted up to the top of the variable scope. With function expressions that are assigned to a variable using the var keyword, the variable does get hoisted to the top, but with the value of undefined. This is one of the reasons why many javaScript developers tend to prefer function statements because the identifiers that are used with function statements can be used anywhere within the variable scope.

```js
// a function expression where the bar variable
// is getting hoisted but with the value of undefined
try {
    bar(); // ERROR calling undefined

} catch (e) {

    console.log(typeof bar); // undefined

}
var bar = function () {

    return 'foo';

};
console.log(typeof bar); // function
 
// with function statements this is not a problem
 
console.log(foo()); // bar
 
function foo() {
    return 'bar';
};
 
console.log(foo()); // bar
```

## 4 - Using a function expression as an object

So functions are a kind of object in javaScript, so they can be used just like plain old objects on top of functions. So it is possible to create a function as an expression, and then attach additional static functions to the object that is returned. This is often used as a way to define what the public API of a module should be by making it so that the module returns a main function of some kind, but then also has all kinds of static methods and properties attached to what is returned bu the module also.

```js
var foo = function () {
    return 'bar';
};
 
// function expressions are a kind of object
// and they can be used as such
foo.bar = function () {
    return 'foobar';
};
 
console.log(foo()); // bar
console.log(foo.bar()); // foobar
```

## 5 - iife (Immediately Invoked Function Expression)

One of the reasons why function expressions are a little more flexible is that they can be used as iifes or Immediately Invoked Function Expressions. In other words I can define an anonymous function via a function expression and then encapsulate that expression in parenthesis and then call that expression right away. This has many advantages and is often used as a way to create modules.

```js
var mod = (function () {
 
    let api = function () {
        return 'bar';
    };
 
    api.bar = function () {
        return 'foo';
    }
 
    return api;
}
    ());
 
console.log(mod()); // 'bar'
console.log(mod.bar()); // 'foo'
```

## 6 - Higher order functions and function expressions

When starting to get into advanced javaScript topics sooner or later you might get around to something called [higher order functions](https://en.wikipedia.org/wiki/Higher-order_function). The term higher order function is just a fancy terms for a function that accepts one or more functions as an argument. In addition it might also return a function  as well, or does at least one of those things.

Regardless of what you call them they do come in handy now and then and I find myself writing them all the time. In this section I will be covering an example of a higher order function that makes use of a few function expressions for the creation of the higher order function itself, as well the function that it returns and the default value for the function that is expected to be passed to it as an argument as well. It will have to do with creating and running some logic that has to do with a simple animation, or a not so simple animation depending on the nature of the code that I pass to it via a function expression that I pass to it as an argument.

I start out by creating a function expression and assigning it to a variable called frames, I then make sure that I am calling an argument that is expected to be a function as well called forFrame. I then return a function expression as well that will be called to step an animation logic that is created by calling the frames function.

```js
// a high order function example
// that accepts a function as an argument
// and returns a function as well
var frames = function (forFrame) {
    var frame = 0,
    maxFrame = 50;
    forFrame = forFrame || function () {
        console.log(this.per)
    };
    return function () {
        forFrame.call({
            frame: frame,
            maxFrame: maxFrame,
            per: frame / maxFrame
        });
        frame += 1;
        frame %= maxFrame;
    }
};
 
var box = {
    x: 0,
    y: 30,
    w: 32,
    h: 32
}
var ani = frames(function () {
        box.x = 50 + 100 * this.per;
        console.log(box);
    });
 
var loop = function () {
    ani();
};
setInterval(loop, 1000);
```

The function that I pass as an argument when using the frames higher order function is of course a function expression as well, and in most cases it should be. In fact if if an arrow function is used it will result in an array because I am using the Function.call method and the value of the this keyword is handled differently with arrow functions compared to function expressions and function declarations.

## 7 - Not so typical use case examples of function expressions in javaScript

So I covered some typical use case examples of function expressions, now it is time to cover some weird things that can be done with function expressions. I am not saying any of this is a best practice or not. However maybe this section will help you gain some deeper insight of what is possible with function expressions.

### 7.1 - Using a function expression as part of a larger expression

I do not run into many situations in which it is call for, but one of the benefits of function expressions is that they can be used as part of a larger expression by doing something like this.

```js
let foo = true;
let n = 10 + (function () {
    if (foo) {
        return 38;
    }
    return 2
}
    ()) - 6;
 
console.log(n); // 42
```

### 7.2 - Compute a value for an if statement on the fly

So because function expressions can self invoke they can be used just about anywhere such as a part of a lengthly expression or in an if statement on the fly. I cant say that I do that sort of thing often, also can not say I recommend it, but it is one of the many things that comes to mind when it comes to what is possible with function expressions.

```js
if ((function () { return Math.floor(Math.random() * 2)}())) {
    console.log('true');
} else {
    console.log('false');
}
```

## 8 - Conclusion

Well that is it for now when it comes to function expressions in javaScript. There is a whole lot more to write about functions when it comes to javaScript, but function expressions or literals as you might prefer are a big part of understanding functions to a great deal in javaScriot. There are other types of functions of course that also work more or less the same ways as expressions but with some minor and not so minor differences. Such is the case with function declarations and arrow functions but that is all a matter for another post.
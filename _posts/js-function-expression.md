---
title: function expressions in javaScript
date: 2019-01-27 18:44:00
tags: [js]
layout: post
categories: js
id: 366
updated: 2019-01-29 14:08:19
version: 1.5
---

[Function expressions](https://developer.mozilla.org/en-US/docs/web/JavaScript/Reference/Operators/function) (also sometimes called function literals) in javaScript is a way to define a function as an expression rather than a statement, or declaration. Function Expressions have some advantages over [function statements (aka declarations)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function), but they are also not necessary a full replacement for function statements. In this post I will be going over some of the ins and outs of function expressions in javaScript, and why they can come in handy now and then.

<!-- more -->


## 1 - function expressions in javaScript a basic example

A very basic example of a function expression might look something like this.

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

## 3 - Not so typical use case examples of function expressions in javaScript

So I covered some typical use case examples of function expressions, now it is time to cover some weird things that can be done with function expressions. I am not saying any of this is a best practice or not. However maybe this section will help you gain some deeper insight of what is possible with function expressions.

## 3.1 - Using a function expression as part of a larger expression

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
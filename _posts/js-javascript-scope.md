---
title: Variable scope in javaScript
date: 2019-01-29 18:58:00
tags: [js]
layout: post
categories: js
id: 367
updated: 2020-07-07 16:32:26
version: 1.15
---

The [variable scope of a variable in javaScipt](https://developer.mozilla.org/en-US/docs/Glossary/Scope) is the area in code where the variable is defined, and also where it can be accessed elsewhere in code if at all. 

If a variable is inside the scope of a section of code it is of use there, else it can not be accessed. There is for example variables that are defined at the top level of code that are often called global variables. these kinds of variables can be accessed anywhere else within a body of code, this compares to variables that are declared inside the body of a function with var, let or const, or inside blocks of code when it comes to just let and const that can only be accessed in the scope of that function or block. these kinds of variables are often called local variables.

Traditionally javaScipt had function level scope only with the var keyword, but these days there is block level scope as well via let and const. In this post I will be going over some of the ins and outs with javaScript variable scope both with the way it was, and the way it is now.
<!-- more -->

## 1 - javaScript scope with var

The var keyword is what was traditionally the only keyword that was available for declaring a variable in javaScipt. When using the var keyword to declare variables what will result is function level variable scope. When this means is that once a variable is declared it will be available everywhere within the code given that the code is at the same function scope level. In this section I will be covering this in greater detail with some examples to help clarify this.

### 1.1 - Having a variable with the same name at the top level, and inside a function

Here I have two variables declared with var one at the top level, and another inside the body of a function. this does not result in a name space collision, the reason why being that the n variable inside the body of the function is within the variable scope of that function and not that of the top level code.

```js
var n = 13;
 
var foo = function () {
    var n = 42;
    return n;
};
 
console.log(n); // 13
console.log(foo()); // 42
```

So with the var keyword it is functions that must be used to compartmentalize things to help prevent name space collisions. This is also the beginning of what is often called the scope chain as well.

### 1.2 - The Scope chain with var

When having nested functions each function has its own variable scope it is then possible to have a variable with the same name for each function within that scope by using the var keyword. This might seem a little confusing but once you have a good feel for the nature of function level scope it will make more sense.

```js
var n = 1;
var mod = (function () {
    var n = 2;
    var foo = function (a) {
        var n = 3;
        return n + a;
    };
    return function (b) {
        return foo(n + b);
    };
}
    ());
 
console.log(mod(n)); // 6
```

If I want to access a variable of the same name lower down the scope chain I will want to omit the use of the var keyword to do so. However these days I try to avoid doing this as I am more in tune to the nature of functional programing where everything that I need to work with withing a function should be inside the body of that single function. Still this is something to be aware of when it comes to variable scope in javaScript.

### 1.3 - Variable hoisting with var

Another thing about javaScript scope is that when declaring a variable with var inside the body of a function or anywhere in the scope chain, that variable will be hoisted. That means that even if the variable is accessed before the line in which the var keyword is used, it will result in a value that is undefined, but will not throw and error.

```js
var func = function () {
    var foo = 30;
};
 
var func2 = function () {
    try {
        return foo; // undefined
    } catch (e) {
        return e.message;
    }
};
 
console.log( func() );
// undefined
console.log( func2() );
// 'foo is not defined'
```

## 2 - block variable scope with let

With let block scope is possible rather than just function level scope. So the same situation is possible as with var, only now it is something that is in effect each time there is any kind of block of code. This can also be a function as well, but it can also be an if statement, a loop or just about any kind of block of code enclosed with curly brackets.

```js
let n = 40;
 
if (n > 32) {
    let n = 16;
    console.log(n); // 16
}
 
console.log(n); // 40
```

In the above example the value for n in the body of the if statement differs from the value of n outside of the if statement. If all instances of let where to be replaced with var this would not be the case, it would be the same scoped variable that is changed inside the if statement then.

The other option for block level variable javaScript scope is the const keyword, but one nice thing about let is that the value can be rewritten many times just like with var. So in many respects let can be used as a drop in replacement for var, and there are not many extenuating circumstances to bother with var anymore outside of backward compatibility. However with const that can not always be used as a drop in replacement for var, speaking of which lets continue with getting into const as a way to create block scope variables.

## 3 - Block variable scope with const

Another option for declaring variables that was introduced in es2015 javaScript was by using the const keyword as yet another option to var. Like let this also results in block level variable scope rather than the function level scope that is the result of using var. However unlike bolt var and let const is intended to be used for constants, and thus whatever is define with const can only be declared once. After than any attempt to change a vale set with const will result in an error.

```js
const n = 40;
 
// changing the value of n here
// will result in an error
try {
    n = 42;
} catch (e) {
    console.log(e.message);
    // Assignment to constant variable.
}
 
// however a new n can be declared in any
// block because like let it has block scope
if (n > 32) {
    const n = 16;
    console.log(n); // 16
}
 
console.log(n); // 40
```

## 4 - implicit global

It is possible to create an implicit global scope variable. This can often happen by accident actually by forgetting to use the var let or const keyword when declaring a variable. It is generally a good idea to always use one of the keyword options when declaring a variable, even if you do want it to be a global. Always declare the variable outside the body of a function at the top level, even if you do not want to give it a value yet when making globals.

```js
var func = function () {
    var local = 5;
    global = 3;
};
func();
console.log(global); // 3
try {
    console.log(local);
} catch (e) {
    console.log(e.message); // local is not defined
}
```

## 5 - Apply what you have learned and start making some examples

So do not just take my word for it, and do not stop by just reading this one post on javScript varavle scope and thing that you are up to speed with anything. The best way to learn javaScript is by doing, just start coding some of your own projects. Whatever that might really be may be up to you the reader, but maybe in this section I cen get you started by some examples of putting javaScript variable scope to use.

### 5.1 - Start out with something simple that just moves a point object

In this example of javaScript scope in action I am moving a point object that is stored inside the local scope of another function. This is an exercise in which the scope chain is used as the method that moves the point is not given a reference to the point by way of an argument or my way of content with the this keyword. There is no local point object so javaScript goes down the scope chain to find the point object the is local to the pointer function to which all of this is enclosed. Also speaking of enclosed this is also an example of closure, although I will not be getting into detail with that here as that is a matter for a whole other post.

```js
var pointer = function () {
    // point variable local to Pointer function
    var point = {
        x: 5,
        y: 5
    };
 
    // another global
    var api = {
        dx: 5,
        dy: 5
    };
 
    // move the point
    api.movePoint = function (dx, dy) {
        // accessing a global variable from within
        // this other nested function within the api
        // object
        point.x += dx === undefined ? this.dx: dx;
        point.y += dy === undefined ? this.dy: dy;
    };
 
    api.log = function () {
        console.log(point.x, point.y);
    };
 
    // return api
    return api;
 
};
 
var pt = pointer();
 
pt.log();
// 5 5
pt.movePoint();
pt.log();
// 10 10
pt.movePoint(-10,-10);
pt.log();
// 0 0
```

## 6 - Conclusion

Understanding javaScript scope is one of several core aspects of javaScript that a new developer should get a solid understanding of right away. When writing ECMA 5 style javaScript one is dealing with function level scope only, but when dealing with modern ECMA 2015+ style javaScript there is now block level variable scope as well in javaScript also.
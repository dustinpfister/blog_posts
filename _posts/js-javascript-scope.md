---
title: Variable scope in javaScript
date: 2019-01-29 18:58:00
tags: [js]
layout: post
categories: js
id: 367
updated: 2019-06-11 19:37:51
version: 1.6
---

The [variable scope of a variable in javaScipt](https://developer.mozilla.org/en-US/docs/Glossary/Scope) is the area in code where the variable is defined. If a variable is inside the scope of a section of code it is of use there, else it can not be accessed. Traditionally javaScipt had function level scope only with the var keyword, but these days there is block level scope as well via let and const. In this post I will be going over some of the ins and outs with javaScript variable scope both with the way it was, and the way it is now.
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

When having nested functions each function has its own variable scope it is then possible to have a variable with the same name for each function within that scope by using the var keyword.

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

If I want to access a variable of the same name lower down the scope chain I will want to omit the use of the var keyword to do so.

## 2 - block variable scope with let

With let block scope is possible rather than just function level scope. So the same situation is possible as with var, only now it is something that is in effect each time there is any kind of block of code. This can also be a function as well, but it can also be an if statement or a loop of one kind or another.

```js
let n = 40;
 
if (n > 32) {
    let n = 16;
    console.log(n); // 16
}
 
console.log(n); // 40
```

In the above example the value for n in the body of the if statement differs from the value of n outside of the if statement. If all instances of let where to be replaced with var this would not be the case, it would be the same scoped variable that is changed inside the if statement then.
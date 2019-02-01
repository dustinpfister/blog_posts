---
title: JavaScript global variables and the global object
date: 2019-01-31 17:28:00
tags: [js]
layout: post
categories: js
id: 369
updated: 2019-02-01 10:12:12
version: 1.4
---

In javaScript global variables are variables that can be accessed from anywhere within the javaScript application and are therefor at the global name space. In most environments global variables are also part of what is often called the [global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object), in client side javaScfipt this is typically the window object but it can also be other objects as well such as when working with a web worker environment. In this post I will be writing about some things to be aware of when dealing with global variables, as well as the alternative when would be local function level, and not block level scoped variables.

<!-- more -->


## Implicit Globals

It is possible to create what is often called an implicit global, this is something that often happens by accident by forgetting to use a keyword like var or let. Generally implicit globals are something that a javaScript developer would want to avoid doing. I can not think of any use case example in which doing so is called for. I would always want to declare my global variables at the top level. If for some reason I do want to create a global variable from within a function or block level scope there are other ways to do that such as appending to the window object in client side javaScript.

```js
let foo = function () {
 
    // creating a local scoped x
    let x = 40;
 
    // creating y as an implicit global
    y = 2;
 
    return x + y;
};
 
console.log(foo()); // 42
 
try {
    console.log(x); // will cause an error
 
} catch (e) {
 
    console.log(e.message); // 'x is not defined'
 
}
 
// will return a value of 2 because I have
// created an implicit global
console.log(y); // 2

```

This might work as expected when it comes to the returned value, but it does result in two very different variables. One of which is coped locally within the function, and the other has become a global variable that can be accessed outside of the function. This can some times create problems if there is a situation in which there is a global variable of the same name all ready. In that case I would end up overwriting any value that that variable might have.
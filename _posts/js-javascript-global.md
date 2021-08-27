---
title: JavaScript global variables and the global object
date: 2019-01-31 17:28:00
tags: [js]
layout: post
categories: js
id: 369
updated: 2021-08-27 16:41:11
version: 1.25
---

In javaScript [global variables](https://en.wikipedia.org/wiki/Global_variable) are variables that can be accessed from anywhere within a body of javaScript code, and are therefor at the global name space. In most environments global variables are also part of what is often called the [global object](https://developer.mozilla.org/en-US/docs/Glossary/Global_object), in client side javaScript this is typically the window object. However that can not be the case when it comes to getting into web workers on the front end, but that is a matter for a whole other post.

I hear many developers saying that the practice of creating globals is something that should be minimized, if not completely avoided all together if possible. One reason why is because of the possibility of writing over something else that is in use by setting something to the same variable name. Still with simple projects at least I find myself using them just for the sake of getting something together quickly. I often will wrap everything into [a closure](/2019/02/22/js-javascript-closure/) though when things start to get more advanced, or if it is time to create a single package for deployment rather than more readable source code.

In this post I will be writing about some things to be aware of when dealing with global variables, as well as the alternative which would be local function level, and now block level scoped variables in ecma2015+ spec javaScript. When it comes to the [use of let](/2019/02/09/js-javascript-let/) and const over the tired yet true var keywords when declaring variables we are now no longer limited to function only variable scope.

<!-- more -->

## 1 - javaScript global basics

When a variable is defined at the top level which is outside of any function or code block using a keyword like var, let, or const that results in a global variable. There are also other ways of defining them as well by appending to the window object for example in client side javaScript, and it is even possible to define them by accident also if one is not careful, such is the case with implicit globals. In other words not using a keyword like var to define a variable inside the scope of a function which results in the creation of a global variable.

```js
let global = 'a global';
 
(function () {
 
    let notGlobal = 'not a global';
 
    console.log(global); // 'a global'
    console.log(notGlobal); // not a global
 
}
    ());
 
console.log(global); // 'a global'
 
try {
 
    console.log(notGlobal);
 
} catch (e) {
 
    console.log(e.message); // 'notGlobal is not defined'
 
}

```

The opposite of a global variable is often referred to as a local variable. Traditionally javaScript had function level local scope only, but now there is block level scope as well that can be used when using the let keyword in place of the traditional var keyword.

## 2 - Creating a global by appending to window in client side javaScript

It is possible to create globals in client side javaScript by just simply appending to the window object. So then something like window.foo is the same as just using var to create foo at the top level.

```js
<html>
    <head>
        <title>javascript globals with window</title>
    </head>
    <body>
        <div></div>
        <script>
let foo = function(){

window.bar = 'foobar';

};
foo();
document.getElementsByTagName('div')[0].innerText = bar;
        </script>
    </body>
</html>
```

The reason why this works is because in client side javaScript the window object is the global object. At least in most cases it is, the situation changes when dealing with a web worker environment for example. It is also possible to define a global via the this keyword as well, but in some situations the this keyword may not always refer to the global object.

## 3 - Elements with ids are globals in client side javaScript

It is true that when an id attribute is assigned to an html element in client side javaScript a reference to that element becomes a global variable.

```js
<html>
    <head>
        <title>ids are globals</title>
    </head>
    <body>
        <div id="foo"></div>
        <script>
foo.innerText='bar';
        </script>
    </body>
</html>
```

Something to watch out for, and this is also one of the reasons why javaScript developers get a little aggregated when defining globals. It is true that the global name space is all ready a little polluted event to begin with these days. However if you are sure that you are not over writing a global, or that there is no name space collisions of any kind, then defining a global now and then is no big deal when called for.

## 4 - Implicit Globals

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

## 5 - Avoiding the use of javaScript globals

Many javaScript developers believe that global variables are something that should only be declared when doing so can not be avoided, others might go so far is to say that they should never be used at all. In some cases though avoiding the use of a global is something that just can not be avoided. However in this section I will be going over some examples of how to go about avoiding  the use of javaScript globals.

### 5.1 - Functions

The first are for most way of how to go about avoiding the use of global variables in javaScript is to use closures, or just simply functions if you prefer. When using var, or any keyword that is used to define a variable inside the body of a function that variable will be local to that function and not the global object.

```js
(function () {
    var n = 42;
    console.log(n); // 42
}());
 
try {
    console.log(n);
} catch (e) {
    console.log(e.message);
    // 'n is not defined'
}
```

It does not matter if var let or const is used inside the body of the function they will all result in a variable that is local to that function and not the global object.

### 5.2 - Blocks

So in es2015+ spec javaScript there is not block level variable scope, as such block variable scope can be used as a way to avoid declaring javaScript global variables. Just use let or const to declare a variable and do so in a block such as an if statement, loop, or just a set of curly graces by themselves even.

```js
{
    let n = 42;
    console.log(n); // 42
}
try {
    console.log(n);
} catch (e) {
    console.log(e.message);
    // 'n is not defined'
}
```

This will work fine as a way to stop declaring variables as long as you are sure that you will always be working in a modern javaScript environment that supports block variable scope.

### 5.3 - Monkey patching

Another option that comes to mind is the process of just adding to objects that are defined before hand and native to javaScript itself. This process of adding properties to built in objects in javaScript is known as monkey patching. Although it might work, most developers will give you hell for doing so as this is generally regarded as a bad practice.

```js
this.n = 42;
 
try {
    console.log(n);
} catch (e) {
    console.log(e.message);
    // 'n is not defined'
}
 
// However monkey patching some objects
// might not be such a great idea,
// and may defeat the whole purpose in the process
Object.prototype.n = 42;
console.log(Object.n); // 42
console.log(Math.n); // 42
console.log({}
    .n); // 42
 
console.log(n); // 42
```

## 6 - Conclusion

Understanding javaScript global variables is an important part of becoming proficient with javaScript. Some times a variable just needs to be a global variable and there is no way of getting around it, but for the most part defining a global, variable is something that should be done only when that is the case if you can manage doing so. Every time a global is defined there is a greater chance that it can result in hard to track errors that have to do with name space collisions. 
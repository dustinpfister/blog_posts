---
title: Javascript let keyword for declaring block scoped variables
date: 2019-02-09 08:34:00
tags: [js]
layout: post
categories: js
id: 374
updated: 2021-08-10 15:57:23
version: 1.17
---

When it comes to writing modern javaScript code the [let keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) is available for declaring [block level](https://en.wikipedia.org/wiki/Scope_%28computer_science%29#Block_scope), rather than [function level](https://en.wikipedia.org/wiki/Scope_%28computer_science%29#Function_scope) scoped variables. When it comes to getting into variable scope that might be a topic for another post, but I will be touching base with that here as it is called for when it comes to any post that has to do with the let keyword compared to traditional option known as [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var).

When it comes to a node.js environment where I have control over the version of node.js is used, and can use a modern version that supports let there are not any concerns when it comes to the question of code breaking on older platforms. At least when it comes to me using my own code in may own environments where I know that will never be the case. That issue is of greater concern when it comes to front end development where there is less control over the environment in which the javaScript code runs when thinking about older browsers. Still as time goes by this will become less of an issue, and block level scope for me is a welcome addition to javaScript, so in this post I will be writing about some concerns when it comes to the use of let in a javaScript project.

So the time will come when there will be basically no point at all of using the var keyword anymore for the same reasons why it no longer makes sense to go out of ones way to make sure that there code will not break in Internet explorer 5. It is all about looking at the browser vendor and version data of a sites analytics, and when I do so it looks like most people are using modern evergreen browsers these days. So if it has not happened for you yet it is only a matter of time until it is just a question of using let, const, or both. If you do want to just use only one, like the good old days of var only, then the choice is clear, the choice is let, so lets get into why that is.

<!-- more -->

## 1 - javaScript let keyword basics

When the let keyword is used this results in a block level variable scoped value. So the variable can also be accessed from within a block of code in which it is declared, this can be considered a major improvement from the older javaScript specs that support function level only scope. Conciser the following example.

```js
let n = 40;
if (n > 42) {
    let a = 5;
 
}
 
try {
    console.log(a);
} catch (e) {
    console.log(e.message); // 'a is not defined'
}
```

This code results in an error, but not just because the value of n is lower than 42. If I where to replace all instances of let with var the value undefined will be logged rather than the error message 'a is not defined' because of the variable hoisting aspect of the var keyword.

```js
var n = 40;
if (n > 42) {
    var a = 5;
}
try {
    console.log(a); // undefined
} catch (e) {
    console.log(e.message);
}
```

In addition even if I where to increase the value of n so that the code in the body of the if statement runs, I will still get the same error message. This is of course what is expected as the whole point of using let is to have block level scope, rather than function level scope that var alone can achieve.

## 2 - No older browser support for javaScript let

As I have stated one of the biggest concerns with using let is backward compatibility. Unlike many other new methods and features that have been introduces in late es2015+ javaScript specs the let keyword can not be polly filled. When thinking in terms of older platforms there just is not any block level variable scope.

Of course there are ways of writing javaScript in a way in which I am taking advantage of modern features such as let, and then also maintain an alternative work of that JavaScript that will run on older platforms as well. There are also tools that can be used to help automate that process, but for the most part that complicates things. 

It is easier to just continue to write javaScript code in a way in which it will work in older browsers while still functioning just find in more modern browsers as well. I have this attitude where as long as I make my code clean, and minimal the process of modernizing it should not be to hard or time consuming.

When it comes to server side javaScript though the use of the javaScript let keyword is not as big of a cover though of course, assuming that I have control over the version of node.js to use, and it is a late version that supports the javaScript let keyword along with other modern javaScript features.

## 3 - Redeclaring variables

One thing that comes up with using let over the traditional var is redeclaring a variable with the let keyword over var. The var keyword is more forgiving with this, allowing for a variable to be redeclared over and over again in the same bit of code. The let keyword on the other hand will throw a nasty error if this is done.

```js
// var can be redeclared
var n = 7;
var n = 42;
 
// let can not
let x = 7;
let x = 42; // SyntaxError: Identifier 'x' has already been declared
```

For the most part this is not a big problem for me, as I generally do not do this when writing legacy javaScrip style code. There may be some rare extenuating circumstances in which this might get annoying, but I am sure I could find a way to manage.

## 4 - Simulating block scope with functions.

One of the draw backs of using var over let is of course not having block level variables scope. When it is just var that is used it is a situation in which there is function level scope only. That being said it is possible to simulate block scope with self executing function expressions however.

```js
var n = 42;
(function () {
    var x = 17;
}());

try {
    console.log(x);
} catch (e) {
    console.log(e.message); // x is not defined
}
```

It may be ugly, but for the most part the same desired effect is achieved.

## 5 - Conclusion

The use of javaScript let is a nice addition when it comes to later javaScript specs. Although browser support is decent with javaScript let these days depending on how far I want to push backward compatibility back, I still find myself shying away from using in when writing client side code at least. When it comes to an environment in which I have control however there is less reservations about using late javaScript features such as the let keyword, and arrow functions.
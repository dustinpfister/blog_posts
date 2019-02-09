---
title: Javascript let keyword for declaring block scoped variables
date: 2019-02-09 08:34:00
tags: [js]
layout: post
categories: js
id: 374
updated: 2019-02-09 09:15:40
version: 1.3
---

When it comes to writing modern javaScript code the let keyword is available for declaring block, rather than function level variables scoped variables. When it comes to a node.js environment where I have control over the version of node.js is used, and can use a modern version that supports let there are not any concerns when it comes to the question of code breaking on older platforms. That issue is of greater concern when it comes to front end development where there is less control over the environment in which the javaScript code runs when thinking about older browsers. Still as time goes by this will become less of an issue, and block level scope for me is a welcome addition to javaScript, so in this post I will be writing about some concerns when it comes to the use of let in a javaScript project.

<!-- more -->

## 1 - javaScript let keyword basics

When the let keyword is used this results in a block level variable scoped value. So the variable can also be accessed from within a block of code in which it is declared. Conciser the following example.

```js
let n = 40;
if (n > 42) {
    let a = 5;
}
 
try {
    console.log(a);
} catch (e) {
    console.log(e.message);
 
}

```

This code results in an error, but not just because the value of n is lower than 42. If I where to replace all instances of let with var the value undefined will be logged rather than the error message 'a is not defined' because of the variable hoisting aspect of the var keyword.

In addition even if I where to increase the value of n so that the code in the body of the if statement runs, I will still get the same error message. This is of course what is expected as the whole point of using let is to have block level scope, rather than function level scope that var alone can achieve.

## 2 - Older Browser support

As I have stated one of the biggest concerns with using let is backward compatibility. Unlike many other new methods and features that have been introduces in late javaScript specs the let keyword can not be pollyfilled. When thinking in terms of older platforms there just is not any block level variable scope.

Of course there are ways of writing javaScript in a way in which I am taking advantage of modern features such as let, and then also maintain an alternative work of that JavaScript that will run on older platforms as well. There are also tools that can be used to help automate that process, but for the most part that complicates things. 

It is easier to just continue to write javaScript code in a way in which it will work in older browsers while still functioning just find in more modern browsers as well. I have this attitude where as long as I make my code clean, and minimal the process of modernizing it should not be to hard or time consuming.

## 3 - Redeclaring

One thing that comes up with using let over the traditional var is redeclaring a variable with the let keyword over var. The var keyword is more forgiving with this, allowing for a variable to be redeclared over and over again in the same bit of code. The let keyword on the other hand will throw a nasty error if this is done.

For the most part this is not a big problem for me, as I generally do not do this when writing legacy javaScrip style code. There may be some rare extenuating circumstances in which this might get annoying, but I am sure I could find a way to manage.
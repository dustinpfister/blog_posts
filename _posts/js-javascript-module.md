---
title: javaScript module examples
date: 2019-03-12 19:10:00
tags: [js]
layout: post
categories: js
id: 400
updated: 2019-03-13 18:51:28
version: 1.1
---

When starting to develop a complex project with javaScript the importance of using modules becomes of greater interest. Modules are a great way to keep your project broken down into smaller units of code that are easier to manage. In this post I will be covering some basic module examples when it comes to module design with javaScript.

<!-- more -->

## 1 - JavaScript Module basics

```js
// declaring point global variable
var point;
 
// having another point variable in a 
// Immediately Invoked Function Expression
(function () {
    var point = {
        x: 5,
        y: 17
    };
    console.log(point); // {x:5,y:17}
}
    ());
 
// point global is still undefined
// there are two point variables because
// of  function level scope
console.log(point); // undefined
```

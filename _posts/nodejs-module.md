---
title: Nodejs module object and modules in general
date: 2020-06-30 15:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 673
updated: 2020-06-30 17:57:50
version: 1.3
---

The [module object in nodejs](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_module_exports) is what I often use when creating modules in nodejs. The module exports property of the module object is what I use to return a main function that will be called when using the module elsewhere. In addition the main function that I exports with the module export propriety can have additional properties attached to it which in many respects makes it a better option to the exports global that can also be used to set public methods and properties for a module that I might be making for a nodejs project.

<!-- more -->

## 1 - basic module exports example

A good basic example of the module exports method might be to just have a simple add function that I set to the module exports property. 

```js
let api = (a, b) => {
    return a + b;
};
module.exports = api;
```

When I go to use it in another javaScript file i can bring it in with the require keyword and then use it.

```js
let add = require('./add.js');
 
console.log( add(1, 1) ); 
```
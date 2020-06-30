---
title: Nodejs module object and modules in general
date: 2020-06-30 15:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 673
updated: 2020-06-30 18:51:30
version: 1.5
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

## 2 - Get a Modules filename

If for some reason I need to get the file name of the current module that I am working on, one way to do so would be to use the module objects filename property.

```js
let api = (a, b) => {
    return a + b;
};
module.exports = api;
 
let path = require('path');
console.log( path.basename(module.filename)); // 'add.js'
```

## 3 - Conclusion

I often just use the exports property of the module object over the exports object as a way to export what I am making when designing a nodejs module.
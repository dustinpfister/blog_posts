---
title: Nodejs module object and modules in general
date: 2020-06-30 15:23:00
tags: [js,node.js]
layout: post
categories: node.js
id: 673
updated: 2020-07-04 07:37:16
version: 1.9
---

The [module object in nodejs](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_module_exports) is what I often use when creating modules in nodejs. The module exports property of the module object is what I use to return a main function that will be called when using the module elsewhere. In addition the main function that I exports with the module export propriety can have additional properties attached to it which in many respects makes it a better option to the exports global that can also be used to set public methods and properties for a module that I might be making for a nodejs project.

<!-- more -->

## 1 - basic module exports example

A good basic example of the module exports method might be to just have a simple add function that I set to the module exports property. Just create a method and asign it to the moduel exports property and save the file as something like add.js in a working folder.

```js
let api = (a, b) => {
    return a + b;
};
module.exports = api;
```

When I go to use this method in another javaScript file I can bring it in with require when it comes to doing so with a high degree of support for older versions of node.

```js
let add = require('./add.js');
 
console.log( add(1, 1) ); 
```

This is the basic idea that I follow when it comes to making a javaScript module nodejs style. There are other ways of doing it, and many more talking points when it comes to module design in nodejs though. For example if I want more than just a main method for the module that I am making I can create a main function and then just start appending additional static method to that function just like I would with any other object in javaScript. When I export the main public method the same way it will have a main public method as well as a bunch of additional methods attached to it.

### 1.1 - Using a function and static methods attached to that function

So now for a slightly more advanced version of a nodejs module. This time something with a single private methods, and attaching at least one static methods to the main public method.

Say I want to start a simple point module that can be used to create a point object. In this module I have a single private helper methods that is used to parse arguments that does not need to be public. In adddiot9n to the main public methods that is used to create point methods I have at least one additional static methods that can return a result when given one or more point objects. For starters maybe just a distance formula that will return the distance between two give points.

```js
// private helper method
let parseAxis = (a) => {
    return a === undefined || typeof a != 'number' || String(a) === 'NaN' ? 0 : a;
};
 
// a Main public method
let Point = (x, y) => {
    return {
        x: parseAxis(x),
        y: parseAxis(y)
    };
};
 
// an additional static public method
Point.distance = (pt1, pt2) => {
    return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
};
 
module.exports = Point;
```

```js
let point = require('./point.js');
 
let a = point(45, 15),
b = point(0, 0),
d = Math.floor(point.distance(a, b));
 
console.log(d); // 47
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

I often just use the exports property of the module object over the exports object as a way to export what I am making when designing a nodejs module. In the wild you might see the use of the exports global as a way of just attaching some static methods for the module without a main method for the module. This is yet another way of going about doing so when it is a module that will just be a collection of static methods. Event then I can still have a similar effect by assigning just a plain object to the module exports property anyway.
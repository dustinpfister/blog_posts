---
title: Setting default values with lodash
date: 2018-09-01 17:19:00
tags: [js,lodash]
layout: post
categories: lodash
id: 275
updated: 2020-06-01 11:57:02
version: 1.8
---

So when it comes to making helper methods, or constructor objects that are a little complex with javaScript there will be a need to pass many properties to these kinds of functions. Some of the properties might be mandatory, other might be optional, bit in any case there might be a need to set some default values for these options for the method, function, constructor or what have you. 

There are native ways of parsing options for methods however in [lodash](https://lodash.com/) there is a quick convenience method that can be used to handle this process which is called the [\_.defaults](https://lodash.com/docs/4.17.10#defaults) object method. In this post I will be showing some quick use case examples of the \_.defaults method, as well as some vanilla js alternatives when it comes to option parsing and javaScipt methods.

<!-- more -->

## 1 - What to know before hand.

This is a post on the \_.defaults method in lodash that can be used to set default values to an object if there is no properties there. This method is then a solution for dealing with options objects when making constructors, of helper methods that accept an object as an argument that contain many properties, and I want a way to fill in the blanks with many of those properties when using the constructor, helper or method in general. This is not a getting started post on lodash, or javaScript in general, and I assume that you have at least some background on these subjects.


## 2 - Using \_.defaults when making a constructor

So one use case example is when making a constructor function, and I want to have an options object that can be passed to the method. This options object contains properties that are to be set as the initial state of an instance of the constructor when used with the new keyword. The \_.defaults method can be used along with \_.merge to make quick work of this.

### 2.1 - A constructor example using \_.defaults

```js
let Box = function (opt) {
 
    opt = opt || {};
 
    // handle defaults
    _.defaults(opt, {
        width: 32,
        height: 32,
        x: 0,
        y: 0
    });
 
    // merge in opt
    _.merge(this, opt);
 
};
 
// works as expected
let bx = new Box();
console.log(bx.width); // 32;
 
let bx2 = new Box({width:64,x:37});
console.log(bx2.width); // 64
console.log(bx2.x); // 37
console.log(bx2.y); // 0
```

This approach works fine as long as all properties given in the options object can be set to the instance of the Constructor, else I might want this options object to be a separate argument, or have other properties that are just used once during construction handled in another object.

### 2.2 - A vanilla js constructor example using ternary operators

The same constructor could be made without lodash using ternary operators.

```js
let Box = function (opt) {
 
    opt = opt || {};
 
    this.width = opt.width === undefined ? 32 : opt.width;
    this.height = opt.height === undefined ? 32 : opt.height;
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
 
};
 
// works as expected
let bx = new Box();
console.log(bx.width); // 32;
 
let bx2 = new Box({width:64,x:37});
console.log(bx2.width); // 64
console.log(bx2.x); // 37
console.log(bx2.y); // 0
```

This might work fine if I just have a few properties like in this example, but if the constructor gets a little complex, it is nice to have a better solution for handing this.

## 3 - Conclusion

The lodash \_.defaults method one of the many methods in lodash that makes it a great utility library. This is something that comes up a lot when making projects. One way of other I just work through it, but if lodash is part of the stack it is nice to know that I have this available as an option. If you enjoyed this post you might want to check out my [main post on lodash](/2019/02/15/lodash/) in general.


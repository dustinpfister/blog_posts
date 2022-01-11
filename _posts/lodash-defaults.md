---
title: Setting default values with lodash
date: 2018-09-01 17:19:00
tags: [lodash]
layout: post
categories: lodash
id: 275
updated: 2022-01-11 14:07:52
version: 1.21
---

So when it comes to making helper methods, or constructor objects that are a little complex with javaScript there will be a need to pass many properties to these kinds of functions. Some of the properties might be mandatory, other might be optional, but in any case there might be a [need to set some default values for these options or class properties of an object](https://stackoverflow.com/questions/6600868/set-default-value-of-javascript-object-attributes) in question.

There are native ways of parsing options for methods, or objects in general, however in [lodash](https://lodash.com/) there is a quick convenience method that can be used to handle this process which is called the [\_.defaults](https://lodash.com/docs/4.17.10#defaults) object method. In this post I will be showing some quick use case examples of the \_.defaults method, as well as some vanilla js alternatives when it comes to option parsing and javaScipt methods.

<!-- more -->

## 1 - The basics of lodash defaults, and what to know before hand.

This is a post on the \_.defaults method in lodash that can be used to set default values to an object if there is no property there for a given property is a defaults object. This method is then a solution for dealing with options objects when making constructors, of helper methods that accept an object as an argument that contain many properties, as well as with just objects in general actuality. That is that I want a way to fill in the blanks with many object properties when making a constructor function, a helper method that takes an options object, or just about any kind of object in general actually that should have default fall back values if none are given. 

This is not a getting started post on lodash, or [javaScript in general](/2018/11/27/js-getting-started/), and I assume that you have at least some background on these subjects.

### 1.1 - Basic lodash defaults example

A hello world of sorts with lodash defaults can be something as simple as passing a source object that should be a point as the first argument to the lodash defaults, followed by another object that is the default values for a position object. The source object can then have a x value, y value, or neater actually as long as defaults are defined in the object the defines what the defaults should be for x and y.

```js
let a = {x: 5};
_.defaults(a, {
    x: 0,
    y: 0
});
console.log(a); // { x: 5, y: 0 }
```

So then I can pass any object as the first argument of defaults and default x and y values will be set for that object if they are not there to begin with. That is just about it more or less when it comes to this method, it is a way to set default values for any and all values that are not set for a source object. There is maybe just one thing to point out with this though and that is the fact that the defaults method will mutate an object in place, so then this makes the defaults method one of the methods in lodash that are not functional programing friendly then.

### 1.2 - The lodash assign method

The [lodash assign method](/2018/09/21/lodash_assign/) then might prove to be another note worthy option for this sort of thing then. This can also be used to assign properties to a new object in a way in which a given set of values will be used over defaults, else the defaults will be used. Just call the lodash assign method, pass a new object as the first argument, followed by the defaults object, followed by the source object. The returned value will then be a new object with defaults filed in for anything and everything to which there is no given value in the source object, thus it will not mutate in place if used this way.

```js
let a = { x: 5 };
// the assign method will also work well for this
// and it will not mutate in place
let b = _.assign({}, {
    x: 0,
    y: 0
}, a);
console.log(a); // { x: 5 }
console.log(b); // { x: 5, y: 0 }
```

## 2 - Using \_.defaults when making a constructor

So one use case example is when making a constructor function, and I want to have an options object that can be passed to the method. This options object contains properties that are to be set as the initial state of an instance of the constructor when used with the new keyword. The \_.defaults method can be used along with \_.merge to make quick work of this.

### 2.1 - A constructor example using \_.defaults

So say you have a constructor method that creates a simple Box Class object. You want to make it so that there are default values for the width, height, and x an y properties of the Box Class instance. The lodash defaults method can be used to do just this with an options object that is used for the constructor. Just pass the options object as the first argument to the defaults method, and then as the second argument an object of default values for each property.

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

## 3 - Vanilla javaScript and setting defaults

The lodash defaults method will work great in many various situations in which I want to make sure that default values for an object are set for any and all values that are not given. However there is of course the question of how to go about doing what the lodash defaults method does outside of lodash, as many of us are starting to use this library less and less these days. I still think that the lodash defaults is a nice little tool in the lodash toolbox that works as expected when it comes to having such a method, but this is also something that is not so hard to replicated with just plain old javaScript by itself.

### 3.1 - A vanilla js constructor example using ternary, and identity operators

The first and foremost way that I might go about starting out with this sort of thing would be to use a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) in combination with the [identity operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) to test if an object property is undefined or not. If you are not familiar with the ternary operator yet it is an operator form of an [if else statement](/2019/02/25/js-javascript-if/) that will work well in expressions. The identity operator is then another name for the type sensitive strict equality operator in javaScript which is one of [several tools in the native javaScript toolbox when it comes to checking equality](/2019/02/06/js-javascript-equals/) of two values.

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

## 4 - Conclusion

The lodash \_.defaults method one of the many methods in lodash that makes it a great utility library. This is something that comes up a lot when making projects. One way of other I just work through it, but if lodash is part of the stack it is nice to know that I have this available as an option. If you enjoyed this post you might want to check out my [main post on lodash](/2019/02/15/lodash/) in general, or one of my many other [various posts on lodash](/categories/lodash/).


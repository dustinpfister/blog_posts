---
title: The _.assign Object method in lodash, and alternatives
date: 2018-09-21 19:51:00
tags: [js,lodash]
layout: post
categories: lodash
id: 285
updated: 2022-01-17 12:10:00
version: 1.24
---

Looking over my content so far I am surprised that I have not yet wrote a post on [\_.assign](https://lodash.com/docs/4.17.10#assign) in [lodash](https://lodash.com/), as well as the native alternative [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) methods. The \_.assign method is one of many ways to go about combining a bunch of objects into a single object, and all around assign seems to work well for most situations, but there is a lot to be aware of when merging objects. 

On the surface merging objects down together into one might seem to be a simple task, but often it is not so simple as one can run into all kinds of problems and concerns that have to do with things like copying be reference rather than value, and how to handle recursive references that might be present. So then the lodash assign method will work most of the time, but often there might be some other method that should be used such as merge, or one should at least clone objects that need to be cloned, or do more than just simply depend on one single method to get everything done all each time.

When it comes to objects they are copied by reference rather than value as wih primative values like numbers and strings, which can result in unexpected behavior if you are new to javaScript and are not aware of that nature surrounding objects.  A new developer might assume that when they are assigning objects together they are creating a new object, and all the nested properties with values that are primitives, and additional objects, are new copies of the source objects. This might be the case when copying primitives, but it is not at all the case with objects. So the desired result of having a copy of nested source objects is not the case with the assign method.In lodash there are other options in lodash like merge, and also deep clone that can be used to get that effect if desired.

There is also the question of the prototype property of objects, and how that should be handled when combining two or more objects.

So in todays post I will be covering some use case scenarios of \_.assign, and alternatives such as \_.merge, and the native Object.assign method.

<!-- more -->

## 1 - The basics of lodash assign, and what to know first

This is a post on the [lodash object method](/2019/02/13/lodash_object/) known as the [lodash assign](https://lodash.com/docs/4.17.10#assign) method. In late specs there is also the native javaScript [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method build into native javaScript itself that seems to work more or less the same way. However in this section of this post I will be sticking to using lodash, and will be getting to any and all relevant native javaScript features later in this post.
This is not a [getting started post on lodash](/2019/02/15/lodash/), or [javaScrtipt in general](/2018/11/27/js-getting-started/) and I expect that you have at least some background with these topics.

### 1.1 - Mutate in place

If I have an object before hand, and pass that as the first argument when calling lodash assign, and then any additional objects that I want to assign down on top of that object, the result will be that the object will be mutated in place. In other words if I create an object with say the object literal syntax, and then assign that object to a variable, and pass that variable to the lodash assign method as the first argument, I do not have to bother assigning the return value of lodash assign to another variable as the same object assigned to the variable will be mutated in place.

If you are still confused by what I am saying then just take a moment to study this source code example.

```js
let a = {x: 5};
// if I have an object before hand, and I pass that object
// as the first argument that object will be mutated in place
_.assign(a, {y: 7}, {w: 32, h: 32});
console.log(a);
// { x: 5, y: 7, w: 32, h: 32 }
```

### 1.2 - new object example

One way to avoid mutating an object in place would be to just simply pass a new object as the first argument.

```js
let a = {x: 5};
// One way to not mutate an object in place is to make the
// first object a new object
let b = _.assign({}, a, {y: 7}, {w: 32, h: 32});
console.log(a);
// { x: 5 }
console.log(b);
// { x: 5, y: 7, w: 32, h: 32 }
```

### 1.3 - Order of objects matters

The order in which objects are passed to the lodash assign method is of great importance. Objects that are passed as later arguments will override any objects passed as an argument with a lower argument index when more than one object has the same key name.

```js
let a = _.assign({w: 0, h: 0}, {w: 32}, {w: 64, h: 64});
console.log(a);
// { w: 64, h: 64 }
```

### 1.4 - Basic example of assign

For another example of the assign method I will start out with a bunch of objects that contain properties, and methods that I will like to combine together into a single method. In this example I will not be doing anything advanced involving nested objects or the prototype chain, and I will be giving both lodash, and native Object.assign examples.

So say I have an object that contains an x, and y position, as well as another object that contains deltas for x and y. In addition I also have an object of methods that I would like to use with these values. I could use Function.call, but before I do that I would still need to combine the position and delta values into a single object. There are a few options for doing so and \_.assign is one of them.

All I have to do is pass an object that is the object that I want everything assigned to as the first argument. For this example I just give it an empty object because I do not want to mangle any of the other objects. After that I just start passing objects that I want assigned to the empty object.

```js
var pos = {
    x: 42,
    y: 12
};
 
var deltas = {
    dx: 1.2,
    dy: 0.2
};
 
var methods = {
    step: function () {
        this.x += this.dx;
        this.y += this.dy;
    }
}
 
// assign everything to a new object
var obj = _.assign({}, pos, deltas, methods);
 
obj.step();
 
console.log(obj.x,obj.y); // 43.2,12.2
```

This results as in an object that works as expected. However There is much that I am not covering in this example such as what happens when there are name space collisions, what happens to the prototype, and what if a nested object is used and it's values change. More on all that later but for now you should get the basic idea of what \_.assign is good for.

## 2 - Nested objects an \_.assign vs \_.merge

So when dealing with nested objects you might run into problems, depending on how you expect objects to combine together. As the name suggested \_.assign, well, assigns what is in the objects that you give it to the target object that is given as the first argument. In other worlds objects are copied in by reference and not by value which is the typical case with objects. In many cases this does not present a problem because it may be what is expected or desired. 

However if the typical copy by reference behavior is not what is expected, then when one of the values of the objects that are given to assign changes, then it will also change in the target object where everything is assigned to. If this is not what is desired then there are a number of ways to change that such as using a method like [\_.cloneDeep](/2017/11/13/lodash_clonedeep/) when passing in the objects, or better yet using another lodash method know as [\_.merge](/2017/11/17/lodash_merge/).

```js
let _ = require('lodash');
 
// nested objects
var obj = {
    pos: {
        x: 2,
        y: 7,
        delta: {
            x: 0,
            y: 2.5
        }
    }
};
 
// methods
var methods = {
    step: function () {
        this.pos.x += this.pos.delta.x;
        this.pos.y += this.pos.delta.y;
    }
};
 
// assign everything to a new object
var assign = _.assign({}, obj, methods);
 
// merge everything to a new object
var merge = _.merge({}, obj, methods);
 
obj.pos.x = 0;
obj.pos.y = 0;
 
console.log(merge.pos.x, merge.pos.y); // 2,7
console.log(assign.pos.x, assign.pos.y); // 0,0
```

As you can see when using \_.merge changing the values of the original objects has no effect on the object that had values added in compared to \_.assign.

## 3 - \_assign and an objects prototype

The \_.assign method will only assign the own enumerable properties from source objects, and will not do anything with inherited properties and methods from a prototype when dealing with objects that are created from a class.

```js
// Simple Point Class
var Point = function (x, y, dx, dy) {
 
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
 
};
 
// With a prototype
Point.prototype.tick = function () {
 
    this.x += this.dx;
    this.y += this.dy;
 
};
 
// so if I have an instance of Point
var pt = new Point(50, 100, 0, 25);
 
// then it's constructor is Point
console.log(pt.constructor.name); // 'Point'
 
// and the tick method works as expected
pt.tick();
console.log(pt.x, pt.y); // 50 125
 
// but if I assign it to a plain old object
var assigned = _.assign({},pt);
 
// then the prototype is lost
console.log(assigned.constructor.name); // Object
 
// so then I would be calling undefined if I
// called assign.tick
//assigned.tick(); // TypeError: assigned.tick is not a function
```

There is a number of ways of resolving this one way would be to use \_.create to set the prototype back to the object. However there is also the \_.extend method which is an alias for \_.assignIn that can be used as a way to keep method from a prototype.These different solutions work in very different ways so in this section I will cover what some of the options are.

### 3.1 - Using \_.create to bring the prototype back

So one way to bring the prototype back after using \_.assign would be to just use \_.create to create a new object with the desired prototype, and pass in the result of an \_.assign as the properties to use with that object.

```js
var keepIt = _.create(Point.prototype, _.assign({}, new Point(0,0,5,2),{foo:'bar'}));
 
console.log(keepIt.constructor.name); // Point
keepIt.tick();
 
console.log(keepIt); // Point { x: 5, y: 2, dx: 5, dy: 2, foo: 'bar' }
```

This keeps the prototype in the prototype where it should be rather than another solution in which the prototype ends up getting mixed in with regular old object properties. There is also of course the native Object.create which also works the same way.

### 3.2 - Using \_.assignIn aka \_.extend to combine everything.

Another option would be to use \_.extend which is an alias for \_.assignIn. The \_.assignIn method works like \_assign, but it will bring in the prototype method as well.

```js
// EXTEND
var extended = _.extend({},new Point(5,7,25,50));
 
// the prototype will be lost
console.log(extended.constructor.name); // Object
 
// but it will be combined the inherited properties into the object.
extended.tick();
console.log(extended); // { x: 30, y: 57, dx: 25, dy: 50, tick: [Function] }
```

This can defeat the purpose of the prototype object if dealing with a large collection of objects that share the same prototype, so this solution should be avoided. Unless for some reason you want ot need to do it of course.

## 4 - Using the javaScript native Object.assign method

If you are only concerned about supporting native browsers then there is the core javaScript native Object.assign method that works in the same way.

```js
// assign everything to a new object
var obj = Object.assign({}, pos, deltas,methods);

obj.step();

console.log(obj.x,obj.y); // 43.2,12.2
```

Assuming that it is always there to work with it would seem that Object.assign works in more or less the same way. So then \_.assign is another one of those methods in lodash that pull it's relevance into question as time goes on. Keep in mode that this is not the case with all lodash methods, some do bring a bit something more, but it would appear that \_.assign is not a good example of that, aside from the safety net deal if that is important to you.


## 5 - Conclusion

So \_.assign, as well as other methods like \_.merge, and \_.extend are some of the many useful methods for working with objects in a project where lodash is part of the stack. Although many of the methods are now native in javaScript itself, there is much more that lodash has to offer. In any case if you use the native Object.assign or the \_.assign method hopefully this post has helped you gain a better understanding of what assign does if you did not know before hand. In any case I hope you enjoyed the post, thanks for reading.
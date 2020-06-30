---
title: The lodash _.bind method use examples.
date: 2018-10-15 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 305
updated: 2020-06-30 12:40:55
version: 1.14
---

For today I thought I would write a post on [\_.bind](https://lodash.com/docs/4.17.10#bind) in [lodash](https://lodash.com/), and also the concept of binding in general, by also covering the native [Function.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) as well. In this post I will be mainly writing about bind in an environment where lodash is part of the stack, and as such \_.bind is available. However I will also link to other relevant content that I have written in the past that elaborates on this more.

<!-- more -->

## 1 - what to know

If you are not familiar with \_.bind, or Function.bind, it is a way to go about creating a new javaScript function with another JavaScript function, but with the value of the this keyword set to a given object. So bind is closely tied with the this keyword in javaScript, and is a way to make methods work with any object that they can potential work with. A while back I wrote a post about the [native call, apply, and bind](/2017/09/21/js-call-apply-and-bind/) methods that might also be of interest. Also if you are new to javaScript, and still do not know much about the [this keyword](/2017/04/14/js-this-keyword/) you will want to have a grasp on that as well.

## 2 - Basic example of \_.bind

For a basic example of bind I made a quick example that just involves a single object that contains some properties, and a stand alone method that can do something with thous properties if it where part of the objects prototype, but it is not. There are a number of ways I can get the method to work with the object, one would be to furnish a class, and make the method part of the objects prototype object. Another way would be to mutate the method as to accept the object as an argument, and use that object in place of the this keyword. However another way would be to use call, apply, or for the sake of this post bind.

```js
let obj = {
    x: 0,
    y: 0,
    dx: 5,
    dy: 7
};
 
var step = function () {
    this.x += this.dx;
    this.y += this.dy;
};
 
// create an obj.step with _.bind
obj.step = _.bind(step, obj);
 
// I can now call step, and this will refer to obj
obj.step();
 
console.log(obj.x, obj.y); // 5,7
```

### 2.1 - Using Function.prototype.bind

The native Function.prototype.bind method works in more or less the same manor \_.bind. Sense bind is a prototype method functions, I only need to call it off the function I want to bind with, and pass the object that I want to use in place of the this keyword.

```js
// create an obj.step with Function.prototype.bind
obj.step = step.bind(obj);
 
// I can now call step, and this will refer to obj
obj.step();
 
console.log(obj.x, obj.y); // 5,7
```

## 3 - Using bind to use prototype methods on objects that do not share the prototype.

So then bind is one of many ways to go about using a prototype method of a class with any object, assuming of course that it just happens to have the properties that are needed in order for that method to function properly. For example an Array method can be used with a plain old object, but it will still need to exist in a form that is similar to that of an array.

```js
let _ = require('lodash');
 
let obj = {
    0: 'hi',
    1: 'how',
    2: 'are',
    3: 'you',
    4: 'doing',
    5: 'today',
    length: 6
};
 
obj.slice =  _.bind(Array.prototype.slice, obj)
 
console.log(obj.slice(1, 4)); // [ 'how', 'are', 'you' ]
```

So in any situation in which I want to get a method to work with an object, I can get it to work as long as it has the proper properties and values in order for it to function.

## 4 - when using settimeout

When using a method like settimeout a function is passed as the first argument, followed by a delay in milliseconds. When doing so I am just passing the function, and what is attached to that function, not the parent object that it may be a part of. This might result in unexpected behavior in some examples.

```js
let user = {
    name: 'Jake',
    say: function() {
        console.log('Hello ' + this.name + '!');
    }
};
 
user.say(); // Hello, Jake!
setTimeout(user.say, 100); // Hello, undefined!
setTimeout(user.say.bind(user), 1000); // Hello, Jake!
```

This is because of the nature of the this keyword, and that when passing a method to settimeout the value of the this keyword is no longer a reference to the user object, but to the instance of settimeout.

### 4.1 - Mangling the instance of timeout

So if bind is not to be used, another way of getting this to work would be to append to the instance of settimeout that is returned when calling it.

```js
var t = setTimeout(user.say, 100); // Hello, fooman!
t.name = 'fooman';
```
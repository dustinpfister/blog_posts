---
title: The lodash bind method, and plain javaScript alternatives.
date: 2018-10-15 16:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 305
updated: 2022-02-02 10:52:32
version: 1.24
---

For today I thought I would write a post on the [\_.bind](https://lodash.com/docs/4.17.10#bind) in [lodash](https://lodash.com/), and also the concept of binding in general. In a nut shell the lodash bind method creates a new method from another method with the value of the this keyword binded to a given value. It is one of several methods of interest both in lodash and with javaScript in general when it comes to the nature of the this keyword. 

Speaking of native javaScript there is also the native [Function bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) prototype method that I should also touch base on here as well as maybe some additional topics that have to do with native javaScript alone. There is a great deal more to be aware of with this sort of thing, but just with lodash bind and native counterparts, but all kinds of additional various this when it comes to the this keyword, own properties of objects and the nature of the prototype chain. So then this will not just be a post on lodash, but also in native sections on the topic of binding things in general.

<!-- more -->

## 1 - Lodash bind and What to know first

If you are not familiar with \_.bind, or Function.bind, it is a way to go about creating a new javaScript function with another JavaScript function, but with the value of the this keyword set to a given object. So bind is closely tied with the this keyword in javaScript, and is a way to make methods work with any object that they can potential work with. A while back I wrote a post about the [native call, apply, and bind](/2017/09/21/js-call-apply-and-bind/) methods that might also be of interest. Also if you are new to javaScript, and still do not know much about the [this keyword](/2017/04/14/js-this-keyword/) you will want to have a grasp on that as well.

### 1.1 - Basic example of \_.bind

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

### 1.2 - Using bind to use prototype methods on objects that do not share the prototype.

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



### 1.3 - When using settimeout

When using a method like [settimeout](/2018/12/06/js-settimeout/) a function is passed as the first argument, followed by a delay in milliseconds. When doing so I am just passing the function, and what is attached to that function, not the parent object that it may be a part of. This might result in unexpected behavior in some examples.

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

So if bind is not to be used, another way of getting this to work would be to append to the instance of settimeout that is returned when calling it.

```js
var t = setTimeout(user.say, 100); // Hello, fooman!
t.name = 'fooman';
```

## 2 - Vanilla javaScript alternatives to lodash bind

Lodash is a great library with tones of useful methods, but it is also true that there is a whole lot to work with when it comes to just working with native javaScript alone also. In this section then I will be going over some quick examples that have involving doing what the lodash bind method does with just plain old javaScript by itself.

### 2.1 - Using Function.prototype.bind

The native bind method of the function prototype object works in more or less the same manor \_.bind. Sense bind is a prototype method functions, I only need to call it off the function I want to bind with, and pass the object that I want to use in place of the this keyword.

```js
let obj = {
    x: 0,
    y: 0,
    dx: 5,
    dy: 7
};
// creating a step function with a function
// expression, NOT an arrow function
const step = function () {
    this.x += this.dx;
    this.y += this.dy;
};
// create a stepObj with Function.prototype.bind
let stepObj = step.bind(obj);
// I can now call step, and this will refer to obj
stepObj();
console.log(obj.x, obj.y); // 5,7
```

### 2.2 - Using the Function.prototype.apply method

Another option for using a function that makes use of the this keyword to refer to own properties of an object is to now use a function that returns a new function, from a function and object, but that just directly calls the source function with a new value for this. In other words a function that woks just like bind, but it does not return a function, it just directly calls the source function with a given object as the value to use in place of this. There are two options for this in the native javaScript [function prototype one of which is apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).

```js
const step = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};
 
let obj = {
    x: 0,
    y: 0
};
step.apply(obj, [7, 10])
console.log(obj); // { x: 7, y: 10 }
```

## 3 - Conclusion

The bind method in lodash will work just fine for what it does, but so does the native alternative as a way to create functions with an object bound to it. There are a lot of good reasons why one will still want to use lodash, but not so much with respect to the bind method as native support for this is pretty good these days. 

There is not just thinking about lodash in terms of it being a safety net of sorts though, it seems like many developers thing that ways about it and that is not a good way to think of lodash. Often I am in a situation in which I want to do what a native method does, but not in the same way, for example a native method might mutate an object in place and I do not want to do that. So this issue of many native methods mutating in place is one reason, along with many others, to create some kind of custom user space utility library of some kind, and lodash is a good example of this. With that said if you enjoyed this post you might want to check out one or more of [my other posts on lodash](/categories/lodash/), or my [main long form post on lodash in general](/2019/02/15/lodash/).




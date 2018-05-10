---
title: Whats the deal with Call, Apply, and Bind
date: 2017-09-21 08:56:00
tags: [js,corejs]
layout: post
categories: js
id: 40
updated: 2017-09-30 18:01:21
version: 1.5
---

I see a lot of posts on the this keyword, and also the call, apply, and bind properties of the Function prototype. Seems like something I just have to get out of the way before moving on to less heavily traveled (but still traveled) paths when it comes to writing content for a javaScript blog. I did cover the [this keyword](/2017/04/14/js-this-keyword/) before, but I did not get into call,apply, and bind in detail.

<!-- more -->

## Where to get started with Call, Apply, and Bind.

Maybe a good place to start is to know that in javaScript you often have a situation in which you are working with one or more objects, and you also have methods that act on those objects. For example there are Arrays and then there are methods like join that act on those arrays.

```js
var arr = ['foo','man','chew','is','always','in','style'],
mess = arr.join(' ');
console.log(mess); // foo man chew is always in style
```

No confusion there, but with the power of call I can invoke the Array.join method on a plain old object.

```js
var arr = {0:'foo',1:'man',2:'chew',3:'is',4:'always',5:'in',6:'style',length:7},
mess = [].join.call(arr,' ');
console.log(mess); // foo man chew is always in style
```

The main point here is that yes there are methods that are associated with a certain kind of Object that is made with a certain kind of constructor function. However if any object just happens to have values that a method uses, call can be used to invoke a method on any object regardless if it is an instance of the constructor that it is associated with or not. A real simple way of thinking about it, is that Call can be used to free methods from there prototype.

## Using Call

So call is a property of the Function prototype, which means it is a method that works with any function, including methods that are part of the prototype of any kind of Object like Date, and Array. Call works by using the call method on any function that I want to use with a certain object in which it might work by passing that object as the first argument. This Object will become the value of the this keyword when it comes to the body of the code that defines the method I am using. Any additional arguments are just the arguments that normally get passed to the method that I am using with call like normal.

## Using Apply

Apply works the same way as call, but you pass an array of arguments.

```js
console.log( [].concat.apply({length:3},['foo','man','chew']) );
console.log( [].concat.call({length:3},'foo','man','chew') );
 
// both produce ['foo','man','chew'];
```

## Using Bind

Bind will return a new method that can be used with the given object. It Works just like call, and apply, but will give you a new function that can be assigned to a variable, and called all over the place.

```js
// basic object
var obj = {
 
    x : 0,
    y : 0
 
},
 
// basic module example
mod = {
 
    x: 37,
    y: 50,
 
    // move by angle, and distance
    moveAD: function(angle, dist) {
 
        this.x += Math.cos(angle) * dist;
        this.y += Math.sin(angle) * dist;
 
    }
};
 
// moved by a distance of 100 by a 45 degree angle
mod.moveAD(Math.PI / 180 * 45,100);
 
console.log('*****');
console.log(obj.x +','+obj.y); // unchanged
console.log(mod.x +','+mod.y); // moved 100
 
// bind to obj
moveAD = mod.moveAD.bind(obj);
moveAD(0,100); // now use the method made with bind
 
console.log('*****');
console.log(obj.x +','+obj.y); // moved 100
console.log(mod.x +','+mod.y); // unchanged
 
// just calling the method dirrecly still works as exspected
mod.moveAD(Math.PI / 180 * 45,100);
console.log('*****');
console.log(obj.x +','+obj.y); // unchanged
console.log(mod.x +','+mod.y); // moved 100
```

## conclusion

Yes call, apply, and bind are pretty helpful. They allow for me to break methods from there prototypes and use those methods with any object.
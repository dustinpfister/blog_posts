---
title: The this keyword in javaScript.
date: 2017-04-14 10:45:25
tags: [js,blog,corejs]
layout: post
categories: js
id: 13
updated: 2017-09-30 21:18:49
version: 1.5
---

Every javaScript developer that runs a blog ends up writing at least one post on the [this keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). So I thought I should get this one out of the way quick, so I can get to writing about more obscure and uncovered aspects of the JavaScript ecosystem, as there is all ready a great many posts on this subject. Still if I am going to make yet another one, I should be able to do a descent job on it considering there is so much great content on it out on the Internet all ready, so here we go.

<!-- more -->

## this is dynamic

The this keywords value changes with a wide range of situations, such as if the code is executed at the top level, if you are using strict mode, and even the JavaScript spec of the browser (es3,es5,es2015+).

This is why I see code like this in many JavaScript modules.

```js
var global = this || (typeof window !== 'undefined' ? window : global);
```

More on why that is later, but for now I thought I would start out by saying yes the this keyword is a little tricky. Once you think you have this all snuffed out you end up leaning more about it. 

## At the top level

It would seem that typically in most cases the this keyword refers to the global object at the top level when it is code that is executed at the top level. As far as I can tell it would appear that this is always the case. If the code is at the top level this will refer to whatever the global object is in the environment.

```js
this; // the global object
```

## Inside a function.

This is where things can get a little confusing, as the this keyword can change depending on a lot of factors. I will cover as many of them as I am aware of here.

## An es5 (non strict mode) IIFE

If you use this inside an IIFE, and do not do anything to change the state of this by using call, apply, or the new keyword, then the this keyword will continue to do the same as when it is top level code.

```js
(function(){
 
   console.log(this);  // window (if in the browser)
 
}());
```

## An ES5 (strict mode) IIFE

Using ES5 javaScript strict mode will result in the this keyword having a value of undefined.

'use strict';
```js
(function(){
 
   console.log(this);  // undefined
 
}());
```

This is why I see that expression that I mentioned earlier, sometimes getting the global object is not that easy when you are trying to design code that will work in any run time environment. As such you just have to use some conditionals.

```js
'use strict';
 
(function(){
 
 console.log(this || (typeof window !== 'undefined' ? window : global));
 
}());
```

## The new keyword

The new keyword is used when calling a function to create a new instance of a constructor function. Writing something about constructors, Classes, and the prototype chain is outside the scope of this post. So I will just say that constructors come in handy when you want to make a whole bunch of objects that share a set of methods.

```js
var global = this || (typeof window !== 'undefined' ? window : global),
 
Foo = function(){
 
    if(this === global){
 
        console.log('you did not call Foo with the new keyword');
 
        return {};
 
    }
 
    this.bar = 'foo';
    this.now = new Date();
 
},
 
noNew = Foo(),
yesNew = new Foo();
 
console.log(noNew); // just an Object
console.log(noNew.constructor.name); // Object
 
console.log(yesNew); // An instance of Foo
console.log(yesNew.constructor.name); // Foo
```

If you just call Foo normally it will result in the global object or undefined like always, however if you call it with the new keyword it will return an object that is an instance of the Foo constructor.

## Prototype methods

When creating a class there is the prototype object of that class that is being made. All objects have a prototype object as one of their properties that contain methods that act on an instance of that constructor. The this keyword inside one of these methods refers to the instance of that constructor.

```js
// making a constructor called BX
var BX = function(x,y){
 
   this.x = x;
   this.y = y;
 
};
 
// a prototype method for BX
BX.prototype.move = function(dx,dy){
 
   this.x += dx;
   this.y += dy;
 
};
 
var b = new BX(10,10);
 
console.log(b.x+','+b.y); // 10,10
 
b.move(7,-3);
 
console.log(b.x+','+b.y); // 17,7
```

## Fun With monkey patching

monkey patching is often considered bad practice, but yes if you really want to you can extent built in constructors, even Object.

```js
Object.prototype.monkeyTime = function(){
 
   console.log('constructor: ' + this.constructor.name);
 
};
 
({}).monkeyTime(); // constructor: Object
[].monkeyTime(); // constructor: Array
new Date().monkeyTime(); // constructor: Date
(function(){}).monkeyTime(); // constructor: Function
```

If you monkey patch the Object prototype, this will refer to whatever object you call the method on.

## Using call

I wrote a [full post on Call,Apply, and Bind](/2017/09/21/js-call-apply-and-bind/), but have also got into depth with it here.

Call is a way that you can call a method on any object, regardless if it is an instance of it's prototype or not. It works by changing the value of this to whatever object you give it.

One example of how this comes in handy is with instances of HTMLCollection. They are array like, but are not instances of the constructor Array, therefore they do not have methods such as Array.forEach. So one way to quickly loop over an HTMLCollection is to use call, and give the collection as the first argument.

```js
var divs = document.getElementsByTagName('div')
 
console.log(divs.constructor.name); // HTMLCollection ( not Array )
 
[].forEach.call(divs,function(div){
 
    console.log(div);
 
});
```

With call the first argument is the value you want this to be, and every argument after that is just the normal set of arguments that you would give to the method. In the case of Array.forEach it is the method I want called for each element of an array. 

## Apply

Apply works in the same way as call only you give it just two arguments the second of which is an array of arguments that are to be used with the method you are using with Apply.

```js
var divs = document.getElementsByTagName('div');
 
[].slice.apply(divs,[1,3]).forEach(function(div){
 
    console.log(div.innerHTML);
 
});
```

Here I am again using an Array method on an instance of HTMLCollection. in this case it is slice which returns an instance of Array that is a section from the HTMLCollection with the given index values in the array that I have given apply as the second argument.

I could use call in the same way like this:

```js
[].slice.call(divs,1,3).forEach(function(div){
 
    console.log(div.innerHTML);
 
});
```

Not all methods work though If I used Array.splice that would cause and error as the HTMLCollection instances are read only. Call, and Apply can be used anywhere where appropriate, including your own methods that are part of the Constructors that you define.

## Using bind

Bind creates and returns a new function with the value of this set to the object that is given.

```js
// and object with an x propery
var obj = {
 
   x: 7
 
};
 
// this.x at the top level
this.x = 5;
 
// creating a method that uses this keyword
// and it refers to this.x
var func = function(){
 
   this.x += 5;
 
};
func();
 
// this refers to the top level
console.log(obj.x); // 7
console.log(this.x); // 10
 
// creating a new function with bind
var bindFunc = func.bind(obj);
 
// called it twice
bindFunc();
bindFunc();
 
// the this keyword in the function created with 
// bind will refer to obj, not the top level
console.log(obj.x); // 17
console.log(this.x); // 10
 
```

## High level functions

High level functions are fun, they are what happens when you accept a function as an argument, and pass some variables to it. In addition the this keyword can refer to whatever I want it to be, including a local variable.

```js
var highLevel = (function(){
 
     // the obj that this will refer to in the function 
     // that gits passed to highLevel.
     var obj = {
 
        x : 0,
        y : 0,
 
        center : function(){
 
            this.x = 160;
            this.y = 120;
 
        }
 
     },
     foo = 'bar',
     anwser = 42;
 
    // return this function within a function
    // clusures rock
    return function(func){
 
         // call the given function, and set this to local
         // pass some variable also
         func.call(obj,foo,anwser);
 
    };
 
}());
 
// using the high level function
highLevel(function(f,a){
 
   console.log(this.x + ',' + this.y); // 0,0
 
   this.x = 5;
   this.y = 10;
 
   console.log(this.x + ',' + this.y); // 5,10
 
   this.center();
 
   console.log(this.x + ',' + this.y); // 160,120
 
   console.log(f); // 'bar'
   console.log(a); // 42
 
});
 
// any additional call with refer to the current internal state
highLevel(function(f,a){
 
   console.log(this.x + ',' + this.y); // 160,120
 
});
```

## In event handlers

In an event handler this refers to the relevant element.

```html
<div id="foo">bar</div>
```

```js
document.getElementById('foo').addEventListener('click', function(e){
 
    console.log(this.innerHTML); // bar
 
});
```

## Conclusion

So the this keyword is a little strange, hopefully this post will shed some light on the subject.

Be sure to check out my other posts on [javaScript](/categories/js/).

<!-- 

keyword research at moz

javascript this scope : 51-100
javascript this : 201 - 500

-->
---
title: using setInterval in javaScript
date: 2018-03-08 11:31:00
tags: [js,corejs]
layout: post
categories: js
id: 162
updated: 2018-03-12 12:09:15
version: 1.1
---

Many javaScript projects will require some kind of main application loop that will execute over an over again. There are many ways to go about doing this, one of which is [setInteval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval). The setInterval method will fire a given method after a given millisecond value has elapsed, after which point it will fire again after the given millisecond value has elapsed again, and so forth. It is therefor a popular, and well known way of implementing an application loop. It can also be thought of as a starting point that can branch off into other topics such as state management, and the nature of threading.

<!-- more -->

## Basic example of setInterval

At a minimum setInterval must be given at least two arguments, the first of which is the function to call, and the second is the minimum amount of time that should pass before the function is called.

```js
setInterval(function(){
 
    console.log('tick');
 
},1000);
```

## Basic state machine example

One of the many use case examples of setInterval is as a means to setup some kind of state machine. Many projects will involve ruining the same code over, and over again and often that code can become somewhat complicated. Breaking code down into many separate states will help to make the project more manageable.

```js
var currentState = 'start',
  startX = 10,
  deltaX = 5,
  x = 0;
 
var states = {
 
  start: function() {
 
    console.log('start state');
 
    // set x at startX
    x = startX;
 
    // change to tick state
    currentState = 'tick';
 
  },
 
  reset: function() {
 
    console.log('reset state');
    x = startX;
    currentState = 'tick';
 
  },
 
  tick: function() {
 
    console.log('tick state ( x = ' + x + ')');
 
    x += deltaX;
 
    // some reset rules
    if (x >= 100 || x <= -100) {
 
      currentState = 'reset';
 
    }
 
  }
 
};
 
var loop = function() {
 
  states[currentState]();
 
};
 
setInterval(loop, 1000);
```

A more advanced example might include some kind of State object constructor with all kinds of methods that can be used for any given state, but you should get the basic idea.

## setInterval vs requestAnimationFrame

In my examples to far I am not doing anything that involves updating a canvas, or DOM element in a client side environment. If that was the case I would opt to use requestAnimationFrame as it is a far better alternative to setInterval or setTimeout.

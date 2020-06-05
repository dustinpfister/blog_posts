---
title: using setInterval in javaScript
date: 2018-03-08 11:31:00
tags: [js,corejs]
layout: post
categories: js
id: 162
updated: 2020-06-05 13:18:32
version: 1.5
---

Many javaScript projects will require some kind of main application loop that will execute over an over again. There are many ways to go about doing this, one of which is [setInteval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval). It is not always the best option for doing so, but depending on the nature of the project sometimes it might be what is called for.

The setInterval method will fire a given method after a given millisecond value has elapsed, after which point it will fire again after the given millisecond value has elapsed again, and so on. It is therefor a popular, and well known way of implementing an application loop. It can also be thought of as a starting point that can branch off into other topics such as state management, and the nature of how threading, and event loops in a javaScript environment.

There are alternatives to be aware of when it comes to setInterval such as [setTimeout](/2018/12/06/js-settimeout/) that works the same way more or less, but will just fire the given method once after a delay, rather than over and over again. However the method can be called from within the body of the method that is begin called that can result in a similar effect to the use of setInterval. In addition to setTimeout there is also requestAnimationFrame which is yet another option to work with when it comes to client side javaScript that might prove to be a better choice when it comes to canvas projects.

<!-- more -->

## 1 - Basic example of setInterval

At a minimum setInterval must be given at least two arguments. The first argument is the function to call, and the second is the minimum amount of time that should pass in milliseconds before the function is called.

```js
setInterval(function(){
 
    console.log('tick');
 
},1000);
```

The above example will fire the function that logs the string tick to the console ruffly once every second. I say ruffly because it is not always guaranteed that it will fire every one second right on the nose. The reason why is because of the nature of event loops, and javaScripts single threaded like nature. How ever when it comes to something very simple like this, the function should fire on time more or less.

## 2 - Basic state machine example

One of the many use case examples of setInterval is as a means to setup some kind of state machine. Many projects will involve ruining the same code over, and over again and often that code can become somewhat complicated. Also it might chnage depending on the state of the application. If you have a strategy game, it does not make sense to have game code running when you are navigating around a map system, or a main game options menu.

So then breaking code down into many separate states will help to make the project more manageable, and in many cases doing so is just necessary. The basic idea would be to have not just one, but several update methods, and a property that is used to know which method to call at the current moment.

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

## 3 setInterval vs requestAnimationFrame

In my examples to far I am not doing anything that involves updating a canvas, or DOM element in a client side environment. If that was the case I would opt to use requestAnimationFrame as it is a far better alternative to setInterval or setTimeout.

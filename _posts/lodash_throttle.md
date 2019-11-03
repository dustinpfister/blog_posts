---
title: The lodash _.throttle method.
date: 2017-10-20 11:07:00
tags: [js,lodash]
layout: post
categories: lodash
id: 69
updated: 2019-11-03 11:42:53
version: 1.5
---

There are times when I want to fire a method once an amount of time has passed. I can always just use setTimeout or setInterval, and make my own solution that is some kind of advanced process management solution. However this is a [lodash](https://lodash.com/) post as such I shale be writing some [\_.throttle](https://lodash.com/docs/4.17.4#throttle) examples, which is one way to make throttled methods.

<!-- more -->

## 1 -  A lodash _.throttle basic example

So here is a quick basic example of the lodash throttle method in action. I am using the lodash throttle method by passing a function as the first argument that is to be called each time a certain about of time has passed. After the function as the first argument is passed I then pass a number value that is the amount of time to let pass between times that the function is called as the second argument. What is then returned is a throttled method that will only file once that amount of time has passed.

```js
// call once every 1000ms
var sec = _.throttle(function () {
        console.log('every second');
    }, 1000);
// call every 100ms
var hundredMS = _.throttle(function () {
        console.log('every one hundred ms');
    }, 100);
// a loop for every 33ms
var loop = function () {
    setTimeout(loop, 33)
    sec();
    hundredMS();
};
// start loop
loop();
```

\_.throttle differers from setTimeout and setInterval as it returns a new function that will only fire once the amount of time has passed when it is being called, rather than setting a function to call after an amount of time has passed, or at a certain interval.

## 2 - The power of closures, and high order functions.

\_.throttle is a good example of what can be done with closures, and high order functions. Which are just fancy terms for functions within functions that accept functions as one or more of there arguments.

## 3 - Vanilla js alternative example

I was able to put this together in a flash. I love quick little examples like this, and also If I wanted to I could go in a novel, custom direction with it.

```js
var throttle = function (func, rate) {
 
    var lastTime = new Date(),
    api;
 
    rate = rate || 1000;
 
    // define the api
    api = function () {
 
        var now = new Date();
 
        if (now - lastTime >= rate) {
 
            func();
 
            lastTime = now;
 
        }
 
    };
 
   // call now
    api.now = function(){
 
        func();
 
    };
 
    // return the api
    return api;
 
};
```

What is returned is an api that uses the method that is given to it as the first argument. This way whenever I call the method that is returned I am not directly calling the given method, I am instead calling a method inside the body of my throttle method that will call the given method when a given amount of time has passed.

I also have the beginning of a more complex api starting in which I can also just directly call the given method if I want to with a properly named "now" method.

```js
// using my throttle function
var foo = throttle(function(){
 
    console.log('foo');
 
},3000),
 
// a basic loop
loop = function(){
 
    setTimeout(loop,33);
 
    foo(); // foo every three seconds
 
};
 
// call once now
foo.now();
 
// start loop
loop();
```

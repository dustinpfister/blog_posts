---
title: javaScript closure examples
date: 2019-02-22 17:07:00
tags: [js]
layout: post
categories: js
id: 389
updated: 2021-03-29 15:49:55
version: 1.26
---

What is often considered an aspect of advanced javaScript is the subject of [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). When it comes to the question of what a closure is to begin with there are many ways to go about defining what a closure, which right off the bat can lead to some confusion. Some definitions are very simple, yet technically still correct, however they might not help to give the full picture of what a closure is and why they are useful in some situations. Other more complex definitions are a bit of a mouth full but do a better job doing them justice when it comes to truly understanding them, and what their full potential may be when keeping them in mind as an option. 

There are all ready many posts on the subject of closures in javaScript, just about any js developer that writes a blog will likely get around to writing at least one post on them sooner or later, along with things like the this keyword, pure functions, and the nature of prototype inheritance when it comes to working with classes. So it was only a matter of time until I wrote this post also, so as such, here it is. 

SO then today I will be looking into closures in javaScript with some basic, and maybe not so basic examples of them. While doing so I might get around to touching base on some related topics that have to do with pure functions, classes, and other ways of storing a state.

<!-- more -->

## 1 - javaScript Closure Basics

One of the simplest definitions of a closure that I have come across in my travels on-line can be summarized like this.

*A closure is a function within a function*

This is defiantly true, but just saying that alone does leave a great deal to the imagination. To really do closures justice I would need to elaborate a bit more than just that. One way would be to give another definitional that is a little more long winded. Maybe something alone the lines of:

*A closure is a collection of two functions where there is an inner and outer function, the outer function closes over the inner function, and provides a function level scope that can be accessed from within the inner function, and in addition the inner function level scope can not be accessed from within the scope of the outer function.*

Okay that one was a little more intense, sure, but maybe it still does not cover everything there is to know about them, and why it is that they are useful. That being said maybe it is best to just study some code examples in order to really get the hang of closures, and also what the alternatives are. Some very simple, others maybe not so simple, but for this first section in the post I think I will start with some very simple code examples. In addition of course there is learning by doing, taking the time to reproduce your own unique examples of javaScript closures. 

In this section I will be covering a few javaScript examples that involve having a state in the form of an x and y value, and then updating that state with a function. I will be going over a few ways f doing this including the use of globals, a class, and of course a closure.

So lets take a look at some basic closure, and closure related javaScript examples then.

### 1.1 - Using globals

First off here is an example that makes use of global variables to create, store, and work with a single point value. When I first started out with javaScript I was making functions like this.

```js

var x = 15,
y = 5;
 
var movePoint = function(dx, dy) {
    return {
        x: x += dx,
        y: y += dy
    }
};
 
console.log( movePoint(-5,5) ); // { x: 10, y: 10 }
```

This will work find for just this simple little example, but there is all ready some draw backs to talk about. First off the x and y values are global values that might conflict with other code on the page. Another draw back that will drive some developers nuts is that I am making use of global variables inside the body of the move point function.

### 1.2 - Using a Class

So then another option for this sort of thing would be to make a Point Class. This works by creating what is called a constructor function that will be used with the new keyword to create an instance of the Point class. I can then add a move function to the prototype of the class and then call that method off of the Point instance.

```js
var Point = function (x, y) {
    this.x = x;
    this.y = y;
};
 
Point.prototype.move = function (dx, dy) {
   this.x += dx;
   this.y += dy;
   return this;
};
 
var pt = new Point(15, 5);
 
console.log(pt.move(-5, 5)); // Point { x: 10, y: 10 }
```

### 1.3 - Using pure functions

Another option is to get into the habit of writing pure functions. The basic idea of pure functions is to not mutate source values of function arguments, always return the same result for the same arguments, and to not use globals inside the body of the function.

```js
var createPoint = function (x, y) {
    return {
        x: x,
        y: y
    };
};
 
var newPointFrom = function (pt, dx, dy) {
    return createPoint(pt.x + dx, pt.y + dy);
};
 
var pt = createPoint(15, 5);
// new point at position with given deltas
console.log(newPointFrom(pt, -5, 5)); // { x: 10, y: 10 }
// source point was not mutated
console.log(pt); // { x: 15, y: 5 }
```

### 1.4 - Basic closure example

So then here is a basic example of a closure where the outer function is one where I pass and x and y argument that I want.The returned result of the outer function is then in turn also a function. When I do so those arguments that I give when calling the outer function become local variables within the scope of that outer function. The inner function that is returned then has parameters of it's own, that are used when calling the inner function that is returned. When passing arguments to the inner function that inner function has access to the values that are closed over into the scope of the outer function.

```js
var point = function (x, y) {
    return function (dx, dy) {
        return {
            x: x += dx,
            y: y += dy
        }
    }
};
 
var pt = point(15,5);
console.log( pt(-5,5) ); // { x: 10, y: 10 }
```

So now when I call this point function that is a closure, the returned function is then my move point function. I can then pass the delta values that I want to use to the returned inner function that will return a point object. This comes in handy now and then when a situation arises that calls for it, the nature of this is one that helps to sore a state, and keep things organized.

## 2 - JavaScript closure example involving setTimeout

So there are many javaScript examples out on the open web that have to do with the use of setTimeout that can be used to delay the execution of a javaScript function by a set amount of time.

First of take into account this little bit of javaScript.

```js
var arr = [1, 2, 3, 4],
len = arr.length,
i = -1;
do {
    i += 1;
    setTimeout(function () {
        console.log(arr[i]);
    }, 1000);

} while (i < len - 1);
// 4
// 4
// 4
// 4
```

This might not be the expected output when doing this. The reason why is because the while loop will step the i value to then end and finish long before the first settimeout function call runs the function that is given to it as a callback. So then the value of i will remain at the index value of the last index in the array. One way to go about resolving something  like this would be to use a closure.

```js
var arr = [1, 2, 3, 4],
len = arr.length,
i = -1;
do {
    i += 1;
    (function (n) {
        setTimeout(function () {
            console.log(arr[n]);
        }, 1000);
    }
        (i));
} while (i < len - 1);
// 1
// 2
// 3
// 4
```

By passing the value of i to the outer function the value of i is copied by value because it is a primitive. Things will get a little more complicated if we where taking about an object, but that might be a whole other can of worms when it comes to the subject of copying objects. Any way when each function is called one second later, the value of n is what will be used to get the element in the array, and the result is getting them in order rather than just the last element for each.

## 3 - A basic log once method example

I made a module in which I have some [basic custom, logging functions in the form of one of my javaScript example](/2021/03/29/js-javascript-example-log-once) posts that contains a long once method. This kind of a method is a good example of the use of a closure in javaScript.

## 4 - Conclusion

So closures are functions that return a function, and when doing so that inner function has access to the outer functions local variable scope. 

The basic idea of a closure is not so hard to understand, but it can lead to things that might result in hard to debug code of they are used carelessly. One draw back is that a closure can result in this state that is separate from that of what might be passed using just arguments. In other words the use of a closure goes against the rules of the use of pure functions.


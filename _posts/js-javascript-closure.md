---
title: javaScript closure examples
date: 2019-02-22 17:07:00
tags: [js]
layout: post
categories: js
id: 389
updated: 2021-03-29 13:53:54
version: 1.12
---

What is often considered an aspect of advanced javaScript is the subject of [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). When it comes to the question of what a closure is to begin with there are many ways to go about defining what a closure, which right off the bat can lead to some confusion. Some definitions are very simple, yet technically still correct, however they might not help to give the full picture of what a closure is and why they are useful in some situations. Other more complex definitions are a bit of a mouth full but do a better job doing them justice when it comes to truly understanding them, and what their full potential may be when keeping them in mind as an option. 

There are all ready many posts on the subject of closures in javaScript, just about any js developer that writes a blog will likely get around to writing at least one post on them sooner or later, along with things like the this keyword, pure functions, and the nature of prototype inheritance when it comes to working with classes. So it was only a matter of time until I wrote this post also, so as such, here it is. 

SO then today I will be looking into closures in javaScript with some basic, and maybe not so basic examples of them. While doing so I might get around to touching base on some related topics that have to do with pure functions, classes, and other ways of storing a state.

<!-- more -->

## 1 - javaScript closure

One of the simplest definitions of a closure that I have come across in my travels on-line can be summarized like this.

*A closure is a function within a function*

This is defiantly true, but just saying that alone does leave a great deal to the imagination. To really do closures justice I would need to elaborate a bit more than just that. One way would be to give another definitional that is a little more long winded. Maybe something alone the lines of:

*A closure is a collection of two functions where there is an inner and outer function, the outer function closes over the inner function, and provides a function level scope that can be accessed from within the inner function, and in addition the inner function level scope can not be accessed from within the scope of the outer function.*

Okay that one was a little more intense, sure, but maybe it still does not cover everything there is to know about them, and why it is that they are useful. That being said maybe it is best to just study some code examples. Some very simple, others maybe not so simple. In addition of course there is learning by doing, taking the time to reproduce your own unique examples of javaScript closures. So lets take a look at some closure examples then.

### 1.2 - Basic closure example

For starters here is a basic example of a closure where the outer function is one where I pass and x and y argument. When I do so those arguments become local variables within the scope of that outer function. I then return an inner function that has parameters of it's own, that are used with the parameters of the outer function.

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
console.log( pt(32,90) ); // { x: 42, y: 100 }
```

When calling the outer function the inner function is returned, and I can then use that inner function as a way to work with a state that exists in the scope of the outer function. This comes in handy now and then when a situation arises that calls for it, the nature of this is one that helps to sore a state, and keep things organized.

## 2 - JavaScript closure example involving setTimeout

So there are many javaScript examples out on the open web that have to do with the use of setTimeout that can be used to delay the execution of a javaScript function by a set amount of time.

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
```

## 3 - Conclusion

So closures are functions that return a function, and when doing so that inner function has access to the outer functions local variable scope. 

The basic idea of a closure is not so hard to understand, but it can lead to things that might result in hard to debug code of they are used carelessly. One draw back is that a closure can result in this state that is separate from that of what might be passed using just arguments. In other words the use of a closure goes against the rules of the use of pure functions.


---
title: javaScript closure examples
date: 2019-02-22 17:07:00
tags: [js]
layout: post
categories: js
id: 389
updated: 2019-02-22 20:30:06
version: 1.2
---

What is often considered an aspect of advanced javaScript is the subject of closures. There are many ways to go about defining what a closure is. Some definitions are very simple yet technically still correct, while other definitions are a bit of a mouth full but do a better job doing them justice. There are all ready many posts on this subject, just about any javaScript developer that writes a blog on javaScript will likely get around to writing a post on them sooner or later, along with things like the this keyword, and the nature of prototype inheritance. So it was only a matter of time until I wrote this post, so as such, here it is. Today I will be looking into closures.

<!-- more -->

## 1 - javaScript closure

One of the simplest definitions of a closure that I have come across in my travels on-line can be summarized like this.

*A closure is a function within a function*

This is defiantly true, but just saying that alone does leave a great deal to the imagination. To really do closures justice I would need to elaborate a bit more than just that. One way would be to give another definitional that is a little more long winded. Maybe something alone the lines of:

*A closure is a collection of two functions where there is an inner and outer function, the outer function closes over the inner function, and provides a function level scope that can be accessed from within the inner function, and in addition the inner function level scope can not be accessed from within the scope of the outer function.*

Okay that one was a little more intense, sure, but maybe it still does not cover everything there is to know about them, and why it is that they are useful. That being said maybe it is best to just study some code examples. Some very simple, others maybe not so simple. In addition of course there is learning by doing, taking the time to reproduce your own unique examples of javaScript closures. So lets take a look at some closure examples then.

## 2 - Basic closure example

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
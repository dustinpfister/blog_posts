---
title: setTimeout in javaScript for delaying function calls and looping
date: 2018-12-06 11:03:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 345
updated: 2018-12-06 12:29:02
version: 1.9
---

When writing a [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) project of some kind there will often be a need to implement some kind of main application loop. There are a number of ways to go about doing this, but for this post I will be mainly writing about [settimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout). This method can be used to delay the calling of a function, or setting up a situation in which a function keeps getting called over and over again at a certain rate. It might not be the best option in all situations, often it might be better to use requestAnimationFrame these days. Still settTimeout, or the similar setInterval is a good choice for some projects where it is called for.

<!-- more -->

## 2 - Some setTimeout basic examples

I enjoy the process of learning by doing. In this section I will be covering some basic use case examples of setTimeout. The basic idea is not that hard, just call the method, and pass the method that is to be called after a set amount of time as the first argument, followed by the amount of time in milliseconds. The function is then called once the set amount of time passes, and that is basically all there is to it. Of course there is more to it than just that in many different use case examples, but I will be getting getting to all that later in this post.

### 2.1 - Delay the call of a function

So to just simple delay the call of a function I just need to pass the function and the amount of time like this.

```js
var func = function(){
   console.log('foo');
};
 
// call func after 3 seconds
setTimeout(func,3000);
```

It is not a sure thing that the function will call in exactly three seconds though. If there is something else going on that will hold things up it can take longer. The reason why is the javaScript is generally regarded as signal threaded environment, unless you take advantage of a clever way to get around that somehow, but that is all a mater for another post.

### 2.2 - A basic loop

To put together a basic loop all I need to do is call the setTimeout in the body of the method that I pass to setTimeout resulting in a kind of [recursion](https://en.wikipedia.org/wiki/Recursion).

```js
var x = 0;
var loop = function () {
 
    setTimeout(loop, 30);
 
    console.log('x=' + x);
 
    x += 10;
    x %= 320;
 
};
 
loop();
```

### 2.3 - clearTimeout

```js
var x = 0, t;
var loop = function () {
 
    t = setTimeout(loop, 30);
    console.log('x=' + x);
    x += 10;
 
    // clear timeout
    if (x >= 100) {
        clearTimeout(t);
    }
 
};
loop();
```
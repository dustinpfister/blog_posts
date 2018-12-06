---
title: setTimeout in javaScript for delaying function calls and looping
date: 2018-12-06 11:03:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 345
updated: 2018-12-06 13:01:26
version: 1.17
---

When writing a [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) project of some kind there will often be a need to implement some kind of main application loop. There are a number of ways to go about doing this, but for this post I will be mainly writing about [settimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout). This method can be used to delay the calling of a function, or setting up a situation in which a function keeps getting called over and over again at a certain rate. It might not be the best option in all situations, often it might be better to use [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) these days. Still settTimeout, or the similar setInterval is a good choice for some projects where it is called for.

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

To put together a basic loop all I need to do is call the setTimeout in the body of the method that I pass to setTimeout resulting in a kind of [recursion](https://en.wikipedia.org/wiki/Recursion). In many projects it is necessary to define this kind of function to have a situation in which some kind of state is updated on each frame tick.

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

So setTimeout may not be the best solution for this kind of situation though compares to alternatives such as requestAnimationFrame. However there are a few situations in which I would want to use setTimeout still, more on that later.

### 2.3 - clearTimeout

If I want to stop setTimeout from continuing there is clearTiemout as well. To use it I just need to pass the timeoutID returned by setTimeout to clearTimeout.

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

The timeoutId will keep stepping forward for the object in which setTimout is used, such as with the window object when it comes to client side javaScript. So I should not have to worry about conflicts when it comes to having more than one loop like this.

## 3 - Browser throttling of setTiemout when a tab is inactive

So one of the few reasons why setTimeout and setInterval are still useful alternatives to that of requestAnimationFrame is that it behaves differently when it comes to inactive windows. For example if I am making some kind of game where I want logic to be called every so often even when the window in which the game is running is not active I can do so with setTimeout, where with requestAnimationFrame the loop would be paused.

### 3.1 - A log to title demo

To demonstrate an example of what happens with setTimeout when a window is inactive the title element can be used. In client side javaScript there is the document.title property that can be used to set the text of what is displayed for the title of a tab in a browser. This can be used to display something that will update at a certain rate.

```js
var logToTitle = function (mess) {
    document.title = mess;
};
 
var money = 0;
var loop = function () {
 
    setTimeout(loop, 33);
 
    logToTitle(money);
 
    money += 0.25;
 
};
 
loop();
```

When I run this the money value steps at a fairly fast rate as expected, but once I switch tabs it slows down to a rate of about one frame tick per second in  chrome 70.x. Although the rate at which setTimeout runs is slowed down, it does still run, unlike with requestAnimationFrame. Still because of this nature I will want to design my code accordingly. As such in this example I should step money at a perSecondRate and find out the about of time that elapses each second.
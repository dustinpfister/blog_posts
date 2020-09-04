---
title: setTimeout in javaScript for delaying function calls and looping
date: 2018-12-06 11:03:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 345
updated: 2020-09-04 11:45:14
version: 1.25
---

When creating a [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) project of some kind there will often be a need to implement some kind of main application loop for the project. There are a number of ways to go about doing this, and there is much ground to cover when it comes to this topic, but for this post I will be mainly writing about the [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) method. 

The setTimeout method can be used to delay the calling of a function, that is I can call the setTimeout method, pass a function as the first argument, an amount of time in milliseconds as the second argument, and the result is that the function that I passed as the first argument will fire when an amount of time greater than or equal to the amount of time I passed has elapsed. The setTimeout method is one option for setting up a situation in which a function keeps getting called over and over again at a certain rate by placing setTimeout in the function that will be called by setTimeout. 

It might not be the best option in all situations, often it might be better to use [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) these days in front end javaScript. Still settTimeout, or the similar setInterval is a good choice for some projects where it is called for in certain situations in which requestAnimationFrame is not an option.

<!-- more -->

## 1 - Some setTimeout basic examples

I enjoy the process of learning by doing rather than by other means, and I think that learning by doing might be the best options for getting a knowledge of something solid. In this section I will be covering some basic use case examples of setTimeout. The basic idea is not that hard, just call the method, and pass the method that is to be called after a set amount of time as the first argument, followed by the amount of time in milliseconds. The function is then called once the set amount of time passes, and that is basically all there is to it. Of course there is more to it than just that in many different use case examples, but I will be getting getting to some of that later in this post.

### 1.1 - Delay the call of a function with setTimeout

So to just simple delay the call of a function I just need to pass the function and the amount of time when calling setTimeout like this.

```js
var func = function(){
   console.log('foo');
};
 
// call func after 3 seconds
setTimeout(func,3000);
```

It is not a sure thing that the function will call in exactly three seconds though. If there is something else going on that will hold things up it can take longer. The reason why is that javaScript is generally regarded as signal threaded programing environment, unless you take advantage of a clever way to get around that somehow. The use of setTimeout still works in the same single event loop just like all the other code that might be going on in that single event loop. The use of setTimeout alone will not create a new Event loop for you, there are ways of doing that though, just not with setTimeout alone.

### 1.2 - A basic loop

To put together a basic loop all I need to do is call the setTimeout method in the body of the method that I pass to setTimeout resulting in a kind of [recursion](https://en.wikipedia.org/wiki/Recursion). In many projects it is necessary to define this kind of function to have a situation in which some kind of state is updated on each frame tick.

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

So in this example I am just stepping an x variable by a static delta value each time the loop function is called by setTimeout which should be roughly every 30 milliseconds. This might be a good starting point when it comes to getting the basic idea of what a main app loop is for a project, but when it comes to making a real project this kind of approach might not be the best way to go about doing so. The amount of time that passes might nto always be 30 milliseconds here, that is the main reason why I say that, on top of other reasons why. However I just wanted to cover a basic example of an app loop here in this section, I will be getting to some more advanced examples of setTimeout later.

### 1.3 - clearTimeout

If I want to stop setTimeout from continuing there is the clearTiemout method that can be used to do so. To use it I just need to pass the timeoutID returned when calling setTimeout to clearTimeout as the first argument.

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

## 2 - Browser throttling of setTiemout when a tab is inactive

So one of the few reasons why setTimeout and setInterval are still useful alternatives to that of requestAnimationFrame is that it behaves differently when it comes to inactive windows. For example if I am making some kind of game where I want logic to be called every so often even when the window in which the game is running is not active I can do so with setTimeout, where with requestAnimationFrame the loop would be paused.

### 2.1 - A log to title demo

To demonstrate an example of what happens with setTimeout when a window is inactive the title element can be used. In client side javaScript there is the document.title property that can be used to set the text of what is displayed for the title of a tab in a browser. This can be used to display something that will update at a certain rate.

```html
<html>
    <head>
        <title></title>
    </head>
    <body>
<script>
var logToTitle = function (mess) {
    document.title = mess;
};
 
var lt = new Date(),
i = 0;
var loop = function (t) {
    var now = new Date(),
    t = now - lt;
 
    setTimeout(loop, 33);
 
    logToTitle(t + ':' + i);
    i += 1;
    lt = now;
 
};
 
loop();
</script>
    </body>
</html>
```

When I run this the money value steps at a fairly fast rate as expected, but once I switch tabs it slows down to a rate of about one frame tick per second in  chrome 70.x. Although the rate at which setTimeout runs is slowed down, it does still run, unlike with requestAnimationFrame. Still because of this nature I will want to design my code accordingly. As such in this example I should step money at a perSecondRate and find out the about of time that elapses each second.

## 3 - Change over time example of setTimeout

In a post like this I think that it is impotent to write about making a simple project that shows updating a state object over time rather than just stepping things by a fixed delta value.

```html
<html>
    <head>
        <title></title>
    </head>
    <body>
<div id="out"></div>
<script>
// create a state object
var state = {
    container: document.getElementById('out'),
    secs: 0,
    secsMax: 0.5,
    money: 0,
    moneyPerSecond: 0.25,
    lt: new Date()
};
// update the state
var update = function(state, secs){
    state.secs = secs;
    if(state.secs <= state.secsMax){
        state.money += state.moneyPerSecond * state.secs;
    }
};
// render the state
var logToTitle = function (mess) {
    document.title = mess;
};
var render = function(state){
    var str_money = '$' + state.money.toFixed(2);
    state.container.innerHTML = str_money + ' : ' + state.secs;
    logToTitle(str_money);
};
// The App loop using setTimeout
var loop = function (t) {
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    setTimeout(loop, 33);
    update(state, secs);
    render(state);
    state.lt = now;
};
loop();
</script>
    </body>
</html>
```

## 4 - Conclusion

So the javaScript settimeout method is one way to delay the calling of a method, and can be used in the body of that method as a way to call it over and over again. So in other words it is a way to create a sort of main app loop, or thread. Using settimeout is by no means the only tool in the toolbox when it comes to setting up this kind of loop. There are several other options such as setinterval, and requestAnimationFrame, but the topic goes beyond that. When using any of these methods in a single event loop that is not the same thing as using them in a collection of event loops when it comes to things like webworker, or the cluster module in nodejs. However all of that is a matter for another post.
---
title: setTimeout in javaScript for delaying function calls and looping
date: 2018-12-06 11:03:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 345
updated: 2021-09-30 07:50:45
version: 1.40
---

When creating a [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) project of some kind there will often be a need to implement some kind of main application loop for the project. There are a number of ways to go about doing this, and there is much ground to cover when it comes to this topic, but for this post I will be mainly writing about the [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) method, over that of the [setInterval method](/2018/03/08/js-setinterval/) that is very similar. It might not be the best option in all situations, often it might be better to use [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) these days in front end javaScript. Still settTimeout, or the similar setInterval is a good choice for some projects where it is called for in certain situations in which requestAnimationFrame is not an option such as with web workers.

The setTimeout method can be used to delay the calling of a function, that is I can call the setTimeout method, pass a function as the first argument, an amount of time in milliseconds as the second argument. The result of doing so is that the function that I passed as the first argument will fire when an amount of time greater than or equal to the amount of time I passed has elapsed. The function calling is not always guaranteed to fire at that time mind you though, so it is more of a target time. The setTimeout method is one option for setting up a situation in which a function keeps getting called over and over again at a certain rate by placing setTimeout in the function that will be called by setTimeout. 

<!-- more -->

## 1 - Some setTimeout basic examples

I enjoy the process of learning by doing rather than by other means, and I think that learning by doing might be the best options for getting a knowledge of something solid. In this section I will be covering some basic use case examples of setTimeout. The basic idea is not that hard, just call the method, and pass the method that is to be called after a set amount of time as the first argument, followed by the amount of time in milliseconds. The function is then called once the set amount of time passes, and that is basically all there is to it. Of course there is more to it than just that in many different use case examples, but I will be getting getting to some of that later in this post.

It should also go without saying that I assume that you have at least some background with javaScript. If not you are going to want to start out with some kind of [getting started type post first on javaScript](/2018/11/27/js-getting-started/).

### 1.1 - The source code examples here are on my github

The [source code examples in this post can be found in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-settimeout) on git hub. All of the source code examples for all my other posts on javaScript in general can also be found there.

### 1.2 - Delay the call of a function with setTimeout

So not it might be called for to start out with just a really basic example of the set time out method. So to just simply delay the call of a function I just need to pass the function, and the amount of time when calling setTimeout like this.

```js
var func = function(){
   console.log('foo');
};
 
// call func after 3 seconds
setTimeout(func,3000);
```

It is not a sure thing that the function will call in exactly three seconds though. If there is something else going on that will hold things up it can take longer. The reason why is that javaScript is generally regarded as signal threaded programing environment, unless you take advantage of a clever way to get around that somehow. The use of setTimeout still works in the same single event loop just like all the other code that might be going on in that single event loop. The use of setTimeout alone will not create a new Event loop for you, there are ways of doing that though, just not with setTimeout alone.

### 1.3 - A basic loop

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

So in this example I am just stepping an x variable by a static delta value each time the loop function is called by setTimeout which should be roughly every 30 milliseconds. This might be a good starting point when it comes to getting the basic idea of what a main app loop is for a project, but when it comes to making a real project this kind of approach might not be the best way to go about doing so. The amount of time that passes might not always be 30 milliseconds here, that is the main reason why I say that, on top of other reasons why. However I just wanted to cover a basic example of an app loop here in this section, I will be getting to some more advanced examples of setTimeout later.

### 1.4 - clearTimeout

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

### 1.5 - A loop using a state object, dates, and an update method

Now it is time for a not so basic, basic example of a loop using set time out. This time I am using the Date class to create a last time date object. Inside the body of the loop method I am creating another date object and creating a time delta from the last time date object stored in a state object. I can create this time delta in the from of a sections value by just subtracting the last time from the current time and then dividing that result by one thousand. I can then check to see if this sections value is higher than a seconds value that is a desired frame to tick rate, if so I call an update method, and set the lat time date object back to the current time. When I call the update method I can then pass the state object along with a seconds value that can be used as a way to update the state of something such as the position of an object.

```js
// update method
var update = function (state, secs) {
    var obj = state.obj;
    obj.x += Math.cos(obj.heading) * obj.pps * secs;
    obj.y += Math.sin(obj.heading) * obj.pps * secs;
    console.log(obj.x.toFixed(2), obj.y.toFixed(2));
};
// state object
var state = {
    lt: new Date(),
    FPS: 2,
    obj: {
        x: 0,
        y: 0,
        pps: 32,
        heading: Math.PI / 180 * 40
    }
};
// loop
var loop = function () {
    var now = new Date(),
    secs = (now - state.lt) / 1000;
    setTimeout(loop, 100);
    if (secs >= 1 / state.FPS) {
        update(state, secs);
        state.lt = now;
    }
};
// start loop
loop();
```

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

In a post like this I think that it is impotent to write about making a simple project that shows updating a state object over time rather than just stepping things by a fixed delta value. In oe of the basic examples of setTimeout in this post where I was just going over a basic app loop example of setTimeout I was stepping a value by a fixed delta amount each time the function that is passed to setTimeout fires. This is not always such a great idea because as a project grows in size the amount of time it takes to run a long block of code by change a little from one client system to another. There are other factors of concern that might be going on with the project, or on the page that the code might be running that can change the rate at which things update. So a better solution is to not update things by way of a fixed delta value, but a value that is multiplied by the amount of time that has passed sense the last update. In this section I will be going over a simple javaScript example that will show what I mean by this.

The basic idea here is that I have a variable outside of the loop that stores a Date object time stamp that is the last time that the state object was updated. In the body of the function that is passed to setTimeout I can create another Date object that is the current time, this value can be used with the last time value that will give an amount of time that has passed sense the state was updated last. I can then use the value to update the state of a value based on time rather that just steeping forward by a fixed amount. Once that is done I can set my last time value to the current date time stamp.

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

So the javaScript settimeout method is one way to delay the calling of a method, and can be used in the body of that method as a way to call it over and over again. So in other words it is a way to create a sort of main app loop, or thread, however I would not say that it is true threading, at least not when it is used by itself. 

Using settimeout is by no means the only tool in the toolbox when it comes to setting up this kind of loop. There are several other options such as setinterval, and requestAnimationFrame, but the topic goes beyond that. When using any of these methods in a single event loop that is not the same thing as using them in a collection of event loops when it comes to things like webworker, or the [cluster module](/2018/01/18/nodejs-cluster/), or the [child process module](/2018/02/04/nodejs-child-process/) in nodejs. Thos are of course ways to go about working with more than one event loop, which goes beyond just using set time out by itself in a single event loop.


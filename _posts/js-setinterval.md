---
title: using setInterval in javaScript
date: 2018-03-08 11:31:00
tags: [js,corejs]
layout: post
categories: js
id: 162
updated: 2021-09-05 16:26:36
version: 1.23
---

Many javaScript projects will require some kind of main application loop that will execute over an over again. There are many ways to go about doing this, one of which is the [setInteval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) method. It is not always the best option for doing so, but depending on the nature of the project sometimes it might be what is called for to get an app loop up and running.

The setInterval method will fire a given method after a given millisecond value has elapsed, after which point it will fire again after the given millisecond value has elapsed again, and so on. It is therefor a popular, and well known way of implementing an application loop. It can also be thought of as a starting point that can branch off into other topics such as state management, and the nature of how threading, and event loops in a javaScript environment. However maybe it would be best to look into other options on top of setInterval before getting into any of that.

So then there are alternatives to setInterval to be aware of such as [setTimeout](/2018/12/06/js-settimeout/), and [requestAnimationFrame](/2018/03/13/js-request-animation-frame/) when it comes to client side javaScript. The setTimeout method works the same way more or less as setInterval, but will just fire the given method once after a delay. However the setTimout method can be called from within the body of the method that is begin called that can result in a similar effect to the use of setInterval. In addition to setTimeout the requestAnimationFrame is yet another options to be aware when it comes to client side javaScript that might prove to be a better choice when it comes to making canvas projects.

There is also the topic of threading that often comes up when talking about setInterval, and similar methods when working with what is called an event loop, and ways to have more than one event loop. I see lots of javaScript developers saying that javaScript is a single threaded language, I shy away from saying that because it strikes me as a bit of a half truth actually. In a modern web browser there are ways of sining up more that one event loop, which does result in more than one independent thread, but on a per process basis. So in a way it is true that javaScript is a single threaded language compared to what may be possible with other languages, but it is important to know what you mean by that. 

The subject of what is often refereed to as true threading is a complex topic that is something that is outside the scope of this post, it is not something that can be done with setInterval by itself at least, and possible not with javaScript at all depending on how you go about labeling what true threading is. So in this post I will just be sticking to some basic examples of setInterval, and will not be getting into what can be done with things like webWorker in a client side javaScript environment, and the child process module in nodejs.

<!-- more -->

## 1 - Basic example of setInterval

At a minimum setInterval must be given at least two arguments. The first argument is the function to call, and the second is the minimum amount of time that should pass in milliseconds before the function is called. Once the function is called the function will be called again after the given about of time passes again, and then again, over an over again indefinitely unless clearInterval is used to stop it.

```js
setInterval(function(){
 
    console.log('tick');
 
},1000);
```

The above example will fire the function that logs the string tick to the console ruffly once every second. I say ruffly because it is not always guaranteed that it will fire every one second right on the nose. The reason why is because of the nature of event loops, and javaScripts single threaded like nature, there are things that can hold things up. How ever when it comes to something very simple like this, and only this, the function should fire on time more or less. So now that we have a very basic example covered lets look at some more examples of setInteral in action.

## 2 - The clearInterval for stopping setInterval

Once a loop is started with setInterval it is possible to stop it by using the [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) method. When calling setInterval an interval ID will be returned, this interval ID can then be passed to the Clear Interval method as a way to stop the loop. So for this example here I am using set interval to have a function call every two hundred and fifty milliseconds, when doing so I store the reurned interval id to a variable. I am then using the set timeout method to fire another function that will call clear timeout with the id that is returned when calling set interval.

```js
var t = setInterval(function () {
        console.log('tick');
    }, 250);
 
setTimeout(function () {
    clearInterval(t);
}, 3000);
```

## 3 - Using date objects

There is using setInterval to get a function to call over and over again, and then there is creating a state object that will be updated each time that the loop function is called. So in this example I will be going over a very basic game module, and a state object that contains an instance of that module, and using date objects as a way to update the state of a variable by way of the number of seconds that has passed sense the last update.

So I have a game module object that contains a create method that I can use to create a new game object instance. I will be using this method to create an store an instance of my game object for a main state object. For now this came state does not sore anything ti interesting just some properties that have to do with a current count of money, and how much money the player gets per second, as well as a max seconds value. After the create method I also have an update method that will cap and seconds value that it is given when it is called in the main app loop function. The update loop then just adds an amount of money to the money prop by the money per seconds value and the resulting seconds value.

```js
var gameMod = {
    create: function () {
        return {
            maxSecs: 1,
            moneyPerSecond: 10,
            money: 0
        }
    },
    update: function (model, secs) {
        secs = secs > model.maxSecs ? model.maxSecs : secs;
        model.money += model.moneyPerSecond * secs;
    }
};
 
var state = {
    game: gameMod.create(),
    lt: new Date()
};
 
var loop = function () {
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    gameMod.update(state.game, secs);
    console.log(state.game.money);
};
 
setInterval(loop, 250);
```

In the state object I create an instance of the game object, and I also create a new Date object instance that I set to an lt property. Inside the loop function that I will be using with set interval I find out what the current time is, and then I find out what the elapsed amount of time is from the last update using the state lt property. I can then just divided the amount of elapsed time in milliseconds seconds by one thousand to the a number of seconds which I then pass to my update method with the instance of the game object.

## 4 - Basic state machine example

One of the many use case examples of setInterval is as a means to get some kind of state machine up and running. Many projects will involve ruining the same code over, and over again and often that code can become somewhat complicated. Also it might change depending on the state of the application, there is code that may need to be updated each tick in a menu, and then code that will be updated only when a main game part of an application is running. So with that said if you have a strategy game, it does not make sense to have game code running when you are navigating around a map system for levels, or a main game options menu.

So then breaking code down into many separate states will help to make the project more manageable, and in many cases doing so is just necessary because you do not want all code in the project to be updated all the time, just what needs to be updated based on a current application state. The basic idea would be to have not just one, but several update methods, and a property that is used to know which method to call at the current moment. In addition to this there will need to be a main app loop, this is where something like setInterval might come into play, at least when it comes to just updating a model in a headless way at least.

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

A more advanced example might include some kind of state object constructor with all kinds of methods that can be used for any given state, but you should get the basic idea. Often I do not use setInetravl in projects such as this in favor of another option that may be a better choice when it comes to not just updating a module, but also rendering in addition to that.

## 5 - setInterval vs requestAnimationFrame

In my examples to far I am not doing anything that involves updating a canvas, or DOM element in a client side environment. If that was the case I would opt to use requestAnimationFrame as it is a far better alternative to setInterval or setTimeout. I do not thing I will get to much into detail as to why this is as there are a [number of resources on the open web that outline why it is a good idea to go with request animation frame over that of the set interval or set time out methods](https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout). However there are still some situations in which set interval or set time out have to be used because it is an environment in which request animation frame is not there to work with. This is not just very old web browser that a hand full of people might still be using just because they do n it know better, this is also the case when doing something with web workers, or a nodejs script.

## 6 - Conclusion

That is all for this post at least, but I would not stop there when it comes to reading more about setInterval, as well as the other options for creating an app loop. There is looking into what there is to watch on [you tube when it comes to setInterval](https://www.youtube.com/watch?v=CqDqHiamRHA&t=265s), but maybe the best option is to just start learning by doing. Come up with some of your own projects that make used of an app loop, and get to work making some of your own examples of setInterval.

When it comes to additional example that I have made that make use of an app loop I have mad a whole lot of [canvas examples projects](/2020/03/23/canvas-example/) that might be worth checking out when it comes to this sort of thing. Many of the canvas examples projects that I have made for each post involve an app loop, although I am using request animation frame rater than set interval. Also an app loop is a major part of making a state machine, or some kind of game framework. When it comes to [game frameworks I have one project that I have started](/2021/09/03/js-javascript-example-game-framework/) thus far which I am putting together something like that.
---
title: The lodash _.throttle method.
date: 2017-10-20 11:07:00
tags: [js,lodash]
layout: post
categories: lodash
id: 69
updated: 2021-11-24 10:14:34
version: 1.24
---

There are times when I want to fire a method once an amount of time has passed, and also fire the method over and over again also. When it comes to native javaScript I can always just use [setTimeout](/2018/12/06/js-settimeout/) or [setInterval](/2018/03/08/js-setinterval/), as well as [request animation frame](/2018/03/13/js-request-animation-frame/) when it comes to client side javaScript. There is also using these methods to make my own kind of main event loop or state machine solution from the ground up also when it comes to working with javaScript by itself. However this is a [lodash](https://lodash.com/) post as such I shale be writing about some [\_.throttle](https://lodash.com/docs/4.17.4#throttle) examples, which is one way to make throttled methods using lodash. However I will also be exploring alternatives to the lodash throttle method as well using the vanilla javaScript solution that I have mentioned.

<!-- more -->

## 1 - The Basics of lodash throttle and what else to know first

This is a post on the lodash throttle method as well as vanilla javaScript alternatives to the lodash throttle method that I will be getting to in a later section. In this section I will be starting out with the lodash throttle method though. I assume that you know at least enough about javaScript in other to get started with lodash, or any javaScript project that involve using a user space solution such as lodash to extent what there is to work with when it comes to javaScript alone. If not you are going to want to take a step back and start out with some kind of getting started with lodash guide. If you are still fairly new to javaScript in general you might still want to stick to learning more about [getting started with javaScript](/2018/11/27/js-getting-started/) itself before getting into lodash or any kind of library for that matter.

### The source code examples in this post are on Githun

In my [test lodash repository](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_throttle) I have the source code examples for this post. This is also where I am parking the source code examples for my [other posts on lodash](/categories/lodash/) as well.

### 1.1 -  A lodash _.throttle basic example

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

## 2 - Vanilla js lodash throttle alternative examples

The lodash \_.throttle method is a good example of what can be done with closures, and high order functions. Which are just fancy terms for functions within functions, and functions that accept functions as one or more of there arguments. In this section I will be going over an example of just using javaScript by itself to make a throttle method.

## 2.1 - Basic Lodash throttle clone Using closures.

So I started out with writing a function expression, and then just have it so that function expression returns another function expression. Inside the body of the outer function I have a variable that will store the amount of time that has elapsed sense the function was fist created, or sense the last time the function that is passed as an argument is called. Inside the body of the inner function I am testing if the amount of time that has elapsed is greater than the set rate, if so I am calling the given method, and setting the last time variable to the current time.

So something like this:

```js
// the outer method
var throttle = function (func, rate) {
    var lastTime = new Date();
    func = func || function () {};
    rate = rate || 1000;
    // the inner method
    return function () {
        var now = new Date();
        if (now - lastTime >= rate) {
            func();
            lastTime = now;
        }
    };
};
```

And it works more or less the same way as lodash throttle.

```js
// using it to make a function
// throttled at one sec
var sec = throttle(function () {
        console.log('one sec');
    }, 1000);
// using it in a loop
var loop = function () {
    setTimeout(loop, 33);
    sec();
};
loop();
```

So if you are new to writing closures writing a lodash throttle clone is a good starting point. When it comes to writing a clone of this kind of method there is making it so that it works more or less the same way, and with the same set of features, but there is also adding additional features to make it a custom trailered kind of throttle method.

### 2.2 - A not so basic lodash throttle clone

So I made a more complex version of this lodash throttle clone just for the sake of writing about some additional talking points as to why it might not be such a bad idea to take the time to write a custom method for this sort of thing. In this lodash throttle clone I am still returning a function, but I am also appending some additional methods to the function object for calling the given method right away, and also for ajusting the rate.

```js
// the outer method
var throttle2 = function (func, rate) {
    var lastTime = new Date(),
    getTime = function () {
        var now = new Date();
        return {
            now: now,
            time: now - lastTime
        }
    };
    func = func || function () {};
    rate = rate || 1000;
    // the inner method and api
    var api = function () {
        var t = getTime();
        if (t.time >= rate) {
            func(t.time);
            lastTime = t.now;
        }
    };
    // now method
    api.now = function () {
        var t = getTime();
        func(t.time);
        lastTime = t.now;
    };
    // setRate
    api.setRate = function (r) {
        rate = r;
    };
    return api;
};
```

I then made an example using it where the rate at which the function is called goes up and down.

```js
// using it in a loop
var i = 0, iMax = 50, per, bias, rate = 0;
var throt = throttle2(function (time) {
        per = i / iMax;
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        rate = 25 + 475 * bias;
        console.log(
            'tick time: ' + ('0000' + String(time)).slice(-4) + '; ' +
            'bias: ' + bias.toFixed(2) + '; ' +
            'rate: ' + Math.round(rate));
        i += 1;
        i %= iMax;
    });
var loop = function () {
    setTimeout(loop, 33);
    throt();
    throt.setRate(rate);
};
loop();
```

Maybe this is not a practical use case example, but if I has a more clear idea of an actual project that would make use of a method like lodash throttle then I might want to add some custom functionality to it. Or fine and alternative way all together for this sort of thing actually. The lodash throttle method is no replacement for state machines, or any kind of main app loop that might need to be called at a certain fixed rate.

## 3 - Conclusion

I can not say that I use the lodash throttle method myself often, in fact these days I am not using lodash that much in projects anymore. It is not because I am on some kind of lodash hate bandwagon, I do understand some of the reasons why some developers might still continue using lodash because it is more than just a safety net as many developers thing of it. It is just that more often than not I just go with one of the native javaScript solutions for this sort of thing such as the request animation frame method when it comes to making any kind of main application loop for a project such as a game, or game framework.

So then when it comes to additional examples of this sort of thing there is maybe looking into one or more [canvas examples](/2020/03/23/canvas-example/) which can prove to be a fun way of learning about the native method alternatives to the lodash throttle method. I have canvas example that is an [example of a basic state machine that uses request animation frame and canvas elements](/2020/01/28/canvas-example-state-machine/) when it comes to getting into making state machines.

ANother topic that comes to mind that has to do with lodash throttle as well as the various native methods like setTiemout is how to go about doing true threading with javaScript. True threading in javaScript may or may not be possible depending on what it is that you call true threading. Maybe a better way of putting this then would be how to go about spinning up more than one event loop rather than doing everything in a single event loop. With that said in client side javaScript there is making use of one or more WebWrokers as a way to create an additional event loop to work inside of on the client side. In a nodejs environment there are built in modules like that of the child process module that can also be used as a means to work with more than one process or event loop if such a module is being use to run an additional instance of node.


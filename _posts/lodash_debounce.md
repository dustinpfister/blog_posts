---
title: The lodash _.debounce method for delay of function invoking.
date: 2017-12-03 20:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 104
updated: 2021-12-07 11:30:47
version: 1.22
---

The [\_.debounce](https://lodash.com/docs/4.17.15#debounce) method in [lodash](https://lodash.com/) is great for delaying the invocation of a method for a certain amount of time. In addition it can be canceled, or flushed at once when called which is another feature about it that might be absent in many alternatives to lodash denounce that might come to mind such as the [setTimeout method](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout). Still it is nice to stick to native methods and certin simple copy and past solutions in order to avoid having to depend on a library such as lodash. So in this post I will be going over a few quick examples of the lodash debounce method as well as looking into this subject in detail when it comes to javaScript in general.

<!-- more -->

## 1 - The Lodash debounce method and what to know first

This is a post centered around a single method in the [javaScript utility library known as lodash](/2019/02/15/lodash/) known as debounce, as well as any and all related topics that pop up while I go over a few examples of this method. I assume then that you know enough about [getting stared with javaScript](/2018/11/27/js-getting-started/) to make use of such a method in a [nodejs](/2017/04/05/nodejs-helloworld/) or [client side javaScript environment](/2020/09/21/js-getting-started-file-protocol/). If not you might want to take a step back and read up more on the basics of working with javaScript only, and how to even get started with a user space library such as lodash.

### 1.3 - Basic example of \_.debounce

For this basic debounce method example I just called it and pass the function that I want debounced, and a time in milliseconds as a second argument. Once that is done a debounced function will then be returned, once called the function will be invoked once the given about of time passes.

```js
let bounced = _.debounce(() => {
    console.log('debounced');
}, 1000 * 5);
console.log('Calling bounced');
bounced(); // logs 'debounced' after 5 seconds
```

### 1.2 - Making a loop

Often I might want to make some kind of loop function with a method such as the lodash debounce method. One way to do would be to call the function that is returned by lodash debound within the function that is passed to loash debounce. This is also a similar way of doing this sort of thing with certain native counter ark methods with the exception of a method like the setInterval method. I will be getting into that in greater detail later in this post when I touch base more so on the vanilla javaScript alternatives to that of the lodadh debounce method.

```js
// turn value to step in the loop function
let turn = 0;
// loop function created with debounce
let loop = _.debounce(() => {
    console.log('turn = ' + turn);
    turn += 1;
    // calling loop within loop
    loop();
}, 1000 * 3);
// calling loop for first time
loop();
```

### 1.3 - flushing

A \_.debounce method comes with a flush method that can be used to call the method at once right alway. This flush method can be called off from and object that is returned when calling lodash denounce.

```js
let check = _.debounce(() => {
    console.log('checking something...');
    check();
}, 1000 * 3);
check();
check.flush(); // check now
```

## 2 - Vanilla JavaScript alternatives to lodash debounce

In my lodash posts I have made a habit of at least bring up what the alternatives are of any when it comes to native javaScript methods in core javaScript. With that said in this section I will be going over a few quick examples of two main methods of interest that will work in both client side javaScript as well as in nodejs. These two methods are [setTimeout method](/2018/12/06/js-settimeout/), and [setInterval](/2018/03/08/js-setinterval/).

### 2.1 - Basic setTimeout example

So then for a basic setTimeout method example I just call the setTimeout method and pass the function that I want called after a time out value in milliseconds. That is it then as the return value is not a function but a number that is used as an id for this that can be used to cancel the calling of the function later on with a method known as [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout).

```js
var func = function(){
   console.log('foo');
};
// call func after 3 seconds
setTimeout(func,3000);
```

### 2.2 - Basic app loop example

I can then make a loop example of the setTimeout method in a similar way of that of the loop example using lodash denounce. The difference is that I pass a reference to the function that I pass to setTeout rather than calling the function that is returned because once again it is not a function that is returned by setTimeout.

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

### 2.3 - The setInterval method

The setInterval method is another option that can be used to delay the calling of a function, but it will not just delay the function, but rather call it over and over again.

```js
setInterval(function(){
    console.log('tick');
},1000);
```

## 3 - Nodejs and delaying a function

Now for at least one example of delaying a function in a nodejs environment.

### 3.1 - The argv array in the process global

Here I have an example where I am using the [process global in nodejs](/2018/02/11/nodejs-process/) to get argument values to set the delay, as well as the number of times to call a function.

```js
#!/bin/env node
// parse arguments if any
var count = parseInt(process.argv[2] === undefined ? 3 : process.argv[2]);
var ms = parseInt(process.argv[3] === undefined ? 1000 : process.argv[3]);
// loop
var loop = function(){
    if(count > 1){
        setTimeout(loop, ms);
    }
    count -= 1;
    console.log('count=' + count);
};
// start loop
loop();
```

## 4 - Client side javaScript and delaying a function

Time not for at least one example of delaying a function when it comes to client side javaScript. When it comes to doing so in a client side environment often I will not want to use a method like lodash debounce, but rather something like the [request animation frame method](/2018/03/13/js-request-animation-frame/).

### 4.1 - Request Animation Frame

In this example I am then using the request animation frame to create a simple canvas element animation loop. Of you have not looked into canvas elements yet you will likely want to at some point sooner or later as canvas elements are a major options when it comes to drawing graphics with javaScript code in a client side javaScript environment.

```html
<html>
    <head>
        <title>request animation frame</title>
    </head>
    <body>
        <canvas id="the_canvas" width="640" height="480"></canvas>
        <script>
var canvas = document.getElementById('the_canvas'),
ctx = canvas.getContext('2d'),
x = 0,
lt = new Date(),
fps = 24;

var loop = function(){
    var now = new Date(),
    secs = (now - lt) / 1000;
    // using requestAnimationFrame in place of setTimeout or lodash debounce
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // update x
        x += 256 * secs;
        x %= canvas.width + 128;
        // draw to the canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(Math.round(x - 128), 240 - 64, 128, 128);
        lt = now;
    }
};
loop();
        </script>
    </body>
</html>
```

## 5 - Conclusion

The \_.debounce method in lodash can be useful when making some methods that need to do something every once in a while, but also need to be check right away in some situations. So then the debounce method is very similar to that of native methods like setTimeout only with a few key differences such as the fact that the return value is a function rather than an id that can be used with clearTimeout, and that the delay will start when the returned function is called rater than right away.

If you are interested in some more advanced reading on this subject one major thing to keep in mind here is that methods like the lodash debounce method as well as setTimeout, setInterval, and requestAnimationFrame, are all solutions for this that still work within a single event loop when used by themselves in a single script. To spin up a whole other event loop to work within you will want to look into using [WebWorkers](/2021/11/05/js-webworker/) when it comes to client side javaScript, and modules such as the [child-process module](/2018/02/04/nodejs-child-process/) when it comes to a javaScript nodejs run time environment.


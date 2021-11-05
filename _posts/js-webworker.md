---
title: Webworker in client side javaScript
date: 2021-11-05 07:53:00
tags: [js]
layout: post
categories: js
id: 936
updated: 2021-11-05 09:44:48
version: 1.21
---

When it comes to [client side javaScript a WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) can be used to start a whole other Event loop in which to run some javaScript. In other words a web worker can be used to run background tasks that will not end up delaying the main execution thread of a page that is often used for rendering. So then a web worker can be used to take some work that would otherwise bog down the main thread of a page into its own independent thread, which will then free up the main thread allowing for smoother performance for what is begin done in the main thread. So then when it comes to using web workers the ideal situation might be to just use the main thread for DOM manipulation, canvas element drawing context calls and the like, and update the main model of a project by way of web workers.

<!-- more -->


## 1 - Web Worker basics

So even when it comes to just starting out with a few basic examples of web workers, things are not so basic. There is a whole lot of ground that needs to be covered first even when it comes to Web Worker hello World style examples. Of course it goes without saying that you should be at least a few steps beyond the very [basics of getting started with client side javaScript](/2018/11/27/js-getting-started/), there is also knowing a thing or two about [Constructor functions](/2019/02/27/js-javascript-constructor/), [callback functions](/2019/03/25/js-javascript-callback/), [setTimeout](/2018/12/06/js-settimeout/), [Promises](/2021/10/22/js-promise/), and at least some basic [DOM manipulation](/2021/10/29/js-document/) and [canvas related stuff](/2017/05/17/canvas-getting-started/) first.

I do try to keep the examples in the basic sections of my blog posts as simple as possible, but there is an awful lot to be aware of before hand with this.

### - Must Host your WebWorkr project by way of http, or https and NOT the file protocol

When I first started learning javaScript I was just creating HTML files with embedded javaScript and opening up these files in a web browser, in other words I was [using the file protocol](/2020/09/21/js-getting-started-file-protocol/) rather than http or https. I still thing that this is a good, simple way of getting started mind you, however sooner or later a developer will start to run into problems developing this way, and getting into web workers is one such problem with this.

When getting started with web worker by way of the file protocol a developer will run into security related problems with there web browser. One way to address this would be to loosen up the security settings of there web browser which would be a very bad idea if they are using the same browser to surf the open web while working on a project. So then another way to address this would be to host what it is that they are working on by way of the http, or https protocol and view what they are working on that way, even when working on something on there local system that is not being deployed just yet. There are a number of ways to set up a basic static web sever, for these examples I was using my simple vanilla javaScript static web sever script file, however there is also creating this kind of project with express. Yet another option would be to install some kind of global script for hosting a certain folder on your local file system as a static website, however in any case all of these options are just ways of hosting the files by way of http, or https rather than file when it comes to the address in the address bar of your web browser.

### - These Source code examples are on Github

On Github I have my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-webworker) which is where I am parking the source code examples that I am writing about for this post. This is also where I have all the various source code examples for my [many other posts on vanilla javaScript topics](/categories/js/).

### 1.1 - Web Worker Hello World project

To start out even with a basic hello world example of web worker I am still going to need at least two files on top of also having a way to host what I am working with by way of http rather than the file protocol. This is because when I call the Web Worker constructor function I need to pass a url to a javaScript file that will be the web worker code to use for the web worker instance. So I have a hello.js file that will be the javaScript code for the WbWorker that will just have a single onmessage event hander that will respond with just appending the string Hello to what it is given when calling the post message method of the web worker instance in the main html file.

```js
onmessage = function(e) {
    postMessage('Hello ' + e.data);
};
```

```html
<html>
    <head>
        <title>Web Worker example</title>
    </head>
    <body>
        <textarea id="out" cols="60" rows="15"></textarea>
        <script>
var out = document.getElementById('out'),
worker;
// feature test
if (window.Worker) {
    // create the web worker instance
    worker = new Worker('hello.js');
    // what to do for a message from the worker
    worker.onmessage = function(e) {
       out.value += e.data + '\n';
    };
    // post a message to it
    worker.postMessage('World');
}else{
    out.value += 'Web Worker is not supported.\n'
}
        </script>
    </body>
</html>
```

### 1.2 - Now for something heavy

Now that I have the hello world example out of the way it is time to move on to at least one more example for this basic getting started type section. This time I want to make something that is just a crude example of doing something that will end up taking some time.

```js
onmessage = function (e) {
    opt = e.data || { w: 10, h: 10 };
    var result={ sum: 0 },
    st = new Date(),
    len = opt.w * opt.h,
    i = 0;
    while(i < len){
        var x = i % opt.w,
        y = Math.floor(i / opt.w);
        result.sum += Math.pow(x, y / 1000);
        i += 1;
    }
    result.secs = parseFloat( ((new Date() - st) / 1000).toFixed(2) );
    postMessage(result);
};
```

```html
<html>
    <head>
        <title>WebWorker example</title>
    </head>
    <body>
        <textarea id="out" cols="60" rows="15"></textarea>
        <script>
var out = document.getElementById('out'),
worker;
// feature test
if (window.Worker) {
    // create the web worker instance
    worker = new Worker('heavy.js');
    // what to do for a message from the worker
    worker.onmessage = function(e) {
       out.value += 'sum: ' + e.data.sum + ', secs: ' + e.data.secs + '\n';
    };
    // post a message to it
    worker.postMessage({w: 10000, h: 1000});
}else{
    out.value += 'Web Worker is not supported.\n'
}
        </script>
    </body>
</html>
```


## 2 - Conclusion

Web Workers are then a great tool when and where using them is called for with situations in which rendering is slowing down and getting a bit choppy. There are some concerns though of course, code will break on older browsers that do not support web worker, which is one reason why one should at least maybe still feature test for web worker first and still run things in the main thread. Some other things to keep in mind is that in some cases bothering with web workers might be a bit overkill, I might be using them as a way to avoid taking the time to write more efficient code, or I may be making a project far more complex that it needs to be.

Still The use of one or more Web Workers might very well be needed for certain projects in which I need to preform a lot of heavy lifting in the background. When it comes to client side javaScript the use of web workers is how to go about having more than one actual thread to work with rather than just simulating threading in a single event loop.

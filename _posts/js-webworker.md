---
title: Webworker in client side javaScript
date: 2021-11-05 07:53:00
tags: [js]
layout: post
categories: js
id: 936
updated: 2021-11-05 08:54:36
version: 1.4
---

When it comes to [client side javaScript a WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) can be used to start a whole other Event loop in which to run some javaScript. In other words a web worker can be used to run background tasks that will not end up delaying the main execution thread of a page that is often used for rendering. So then a web worker can be used to take some work that would otherwise bog down the main thread of a page into its own independent thread, which will then free up the main thread allowing for smoother performance for what is begin done in the main thread. So then when it comes to using web workers the ideal situation might be to just use the main thread for DOM manipulation, canvas element drawing context calls and the like, and update the main model of a project by way of web workers.

<!-- more -->


## 1 - Web Worker basics

### 1.1 - Web Worker Hello World project

```js
onmessage = function(e) {
    postMessage('Hello ' + e.data);
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
    worker = new Worker('hello.js');
    // what to do for a message from the worker
    worker.onmessage = function(e) {
       out.value += e.data + '\n';
    };
    // post a message to it
    worker.postMessage('World');
}else{
    out.value += 'Web Woker is not supported.\n'
}
        </script>
    </body>
</html>
```

### 1.2 - Now for something heavy

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
        <title>webWorker example</title>
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
    out.value += 'Web Woker is not supported.\n'
}
        </script>
    </body>
</html>
```


## 2 - Conclusion

Web Workers are then a great tool when and where using them is called for with situations in which rendering is slowing down and getting a bit choppy.

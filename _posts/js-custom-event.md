---
title: Custom events in client side javaScript
date: 2019-07-03 11:39:00
tags: [js]
layout: post
categories: js
id: 498
updated: 2019-07-03 12:25:21
version: 1.2
---

In client side javaScript there is the [custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) constructor that can be used to create my own events that can be attached to html elements. There are a number of other ways of creating custom events when it comes to using a framework like phaser and threejs. However in this post I will be sticking to the custom way of how to go about making custom events in just plain old vanilla javaScript in the browser.

<!-- more -->

## 1 - Custom Event constructor basic example

```html
<html>
    <head>
        <title>custom event in client side javaScript</title>
    </head>
    <body>
        <script src="basic.js"></script>
    </body>
</html>
```

```js
var myEvent = new CustomEvent(
        'my-event', {
        detail: {
            message: 'custom event!',
            time: new Date(),
            n: 42
        },
 
        bubbles: true,
        cancelable: true
    });
 
// define a handler for the event
document.body.addEventListener('my-event', function (e) {
    console.log(e.detail.message); // 'custom event!'
    console.log(e.detail.n); // 42

});
 
// dispatch it
document.body.dispatchEvent(myEvent)
```


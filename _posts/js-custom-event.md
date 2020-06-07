---
title: Custom events in client side javaScript
date: 2019-07-03 11:39:00
tags: [js]
layout: post
categories: js
id: 498
updated: 2020-06-07 16:23:16
version: 1.6
---

In client side javaScript there is the [custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) constructor that can be used to create my own events that can be attached to html elements. There are a number of other ways of creating custom events when it comes to using a framework like phaser and threejs. There are also ways of doing this in a nodejs environment when it comes to the events module. However in this post I will be sticking to the custom way of how to go about making custom events in just plain old vanilla client side javaScript in the browser.

<!-- more -->

## 1 - Custom Event constructor basic example

In this section I will be touching base on just a basic example of the [CustomEvent constructor](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent). The process just involves creating an event with the custom event constructor, and then passing that object to the dispatch event method of a DOM element reference. Once the dispatch event method is called any event handlers that are attached for that custom event will fire.

So lets start out with just some basic html like this and attach to an external javaScript file.

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

In the basic.js file that I am linking to in the html I am creating a custom event object with the Custom Event constructor, attaching a handler to the body element of the htl document for it, and then dispatching the event for the body element like so.

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

This might not be the best example of why creating my own events is a good idea, but you get the basic idea of the process. Just call the Custom event constructor with the new keyword just like any other constructor function in javaScript. When doing so pass the name of the custom event as the first argument, followed by and object. This object should have at least a detail property that contains data about the nature of the event.

## 2 - Conclusion

So now and then it become necessary to create my own events for things when it comes to working out a module for something. For example say I am making a game module and I want to provide a way to have an event that will fire each time and enemy is killed, or when the game is over. In the code that composes my state machine I can then attach event handlers for these to define some code that will run each time that at enemy is killed, or when a game is over that should not be parked in the main game module.

So the having a way to create these kinds of custom events can really come in handy in some cases. There might be alternative ways of doing so, and it can be a greay area as to the idea of doing so is a better idea or not. Ether way I am glad that there is a built in way to do this sort of thing anyway.
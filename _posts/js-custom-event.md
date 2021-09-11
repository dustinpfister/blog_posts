---
title: Custom events in client side javaScript
date: 2019-07-03 11:39:00
tags: [js]
layout: post
categories: js
id: 498
updated: 2021-09-11 09:42:13
version: 1.16
---

In client side javaScript there is the [custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) constructor that can be used to create my own events that can be attached to html elements. I then in my own code define the conditions that will be used to trigger these kinds of custom events by calling the [dispatch event method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) of the element that I attached a handler for the custom event.

There are a number of other ways of creating custom events when it comes to using a framework like phaser and threejs, often such frameworks have ways of creating user defined events for various kinds of things that happen in such frameworks. There are also ways of doing this in a nodejs environment when it comes to the [events module](https://nodejs.org/api/events.html) which would be the node built in way of how to go about making user define events in a sever side javaScript environment. 

However in this post I will be sticking to the custom way of how to go about making custom events in just plain old vanilla client side javaScript in a web browser. The basic process is similar to what needs to happen when simulating a built in event such as a click event on a div element for example. Make sure there is an event handler attached to the element in question for the event, create an event object for the event, and then call the dispatch event method of the element and pass the event object to that method.

<!-- more -->

## 1 - What to know before getting into making custom events

This is a bit more of an advanced post compared to the basics of getting started with events. When it comes to the very basics of events in client side javaScript I have wrote a post on [event listeners](/2019/01/16/js-event-listeners/), and other post on [event objects](/2020/07/23/js-event-object/). It might be a good idea to get a solid grasp on how to work with built in events first before getting into learning how to go about defining custom events. In my post on event objects I have an example that involves how to go about simulating events by following a process that is not so simulate from what it is that I am writing about here actually.

I also assume that you have at least some background when it comes to the very basics of html and javaScript. If you are still fairly new to javaScript you might want to start out with some [getting started type posts on javaScript](/2018/11/27/js-getting-started/) in general.

### 1.1 - The source code for this post, and many others is on my test vjs github repository

The source code for the examples in this post can be found in the [test vjs Github repository found here](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-custom-event). I do get around to editing this content once in a while, but it would be best to make a pull request there, or leave a comment this post if there is something you think needs to change here. I have a whole lot of other posts that I need to edit also, and the squeaky wheel gets the greasing.

## 2 - Custom Event constructor basic example

In this section I will be touching base on just a basic example of the [CustomEvent constructor](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), that can be used to create a custom user defined event object. The process just involves creating an event with the custom event constructor, and then passing that object to the dispatch event method of a DOM element reference. Once the dispatch event method is called any event handlers that are attached for that custom event will fire.

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

In the basic.js file that I am linking to in the html I am creating a custom event object with the Custom Event constructor, attaching a handler to the body element of the html document for it, and then dispatching the event for the body element like so.

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

So the having a way to create these kinds of custom events can really come in handy in some cases. There might be alternative ways of doing so, and it can be a gray area as to the idea of doing so is a better idea or not. Ether way I am glad that there is a built in way to do this sort of thing anyway.

Well that is it for not with custom events in client side javaScipt, at some point in the future if I get some time to expand this post with some more examples I am sure I will edit this one again.
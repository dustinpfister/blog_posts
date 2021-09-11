---
title: Custom events in client side javaScript
date: 2019-07-03 11:39:00
tags: [js]
layout: post
categories: js
id: 498
updated: 2021-09-11 11:33:43
version: 1.30
---

In client side javaScript there is the [custom event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) constructor that can be used to create my own events that can be attached to html elements. I then in my own code define the conditions that will be used to trigger these kinds of custom events by calling the [dispatch event method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) of the element that I attached a handler for the custom event.

There are a number of other ways of creating custom events when it comes to using a framework like phaser and threejs, often such frameworks have a system for creating user defined events for various kinds of things that happen in such frameworks, as well as additional user space code that will run on top of them. There are also ways of doing this in a nodejs environment when it comes to the [events module](https://nodejs.org/api/events.html) which would be the node built in way of how to go about making user define events in a sever side javaScript environment. However there is also the idea of making a core JavaScript solution that will work in the browser as well as node also.

In this post I will be mainly focusing on the ways to go about making custom events in just plain old vanilla client side javaScript in a web browser. This will also include some examples where I am making my own system in core javaScript which can then be used in any javaScript environment. The basic process is similar to what needs to happen when simulating a built in event such as a click event on a div element for example. Make sure there is an event handler attached to the element in question for the event, create an event object for the event, and then call the dispatch event method of the element and pass the event object to that method.

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

## 2 - Making a core javaScript event system that will work in the browser as well as in nodejs

So I covered the basics of how to work with built in client side javaScript features when it comes to making custom events that are tired closely to html elements, and thus client side javaScript only. However what if I want to use some kind of system that is not tied closely to client side, or sever side javaScript, but core javScript. As such such a system should be able to be used quickly when making client side javaScrit as well as sever side javaScript solutions.

In this section then I will be going over the source code of a module that will work in a browser, but I can also use in a nodejs script also. This helps to make my code more portable between a sever, and a client system which can have many benefits for a wide range of reasons.

### 2.1 - The event system module

Here I have the event system mode that I world out for this. Te module follows a pattern that I found out about a while back that is one way to go about making these kinds of modules that will work in a client as well as a sever. I wrote a post on this topic with one of my javaScript examples series posts which was the one where I am [writing about this kind of module pattern](/2021/04/14/js-javascript-example-nodejs-browser-share-code-module/) involving the use of an [IIFE](/2020/02/04/js-iife/), and feature testing for nodejs features when creating the value to append to inside the body of the IIFE.

So then as I see it thus far this kind of user event module will need to have at least three public methods. One method will be used to set up and event for an object, another will be used to add a listener for the event of an object, and the final one will be used to dispatch the event.

So First off lets get to the public method that will be used to create what the event is, and add it to an object. When it comes to this method alone there is a lot to cover when it comes to the various details such as if this kind of property should be attached to the own properties of an object, of if it should be a part of an objects prototype. However for now I do not want to get to far off topic when it comes to this so for now I am thinking that this add event method will just create an event for a single object, so I pass that as one argument with an additional object that contains properties that define what the event is. This includes a method that will fire each time the event is dispatched as well as the key name of the event. The result of calling this method will just set up and event for object. To use the event I need to add at least one listener for the event, and then dispatch the event elsewhere in my code. When defining what the for dispatch method is for an event the return value should be whatever it is that I want for an event object, and the arguments passed to this for dispatch methods are a reference to the object, and the options that where passed when the event was dispatched.

Next I have a add listener method that is what I will be using to define one of more event handlers, or listeners of you prefer that will be called each time an event is dispatched. Inside the body of this pubic method I am getting a reference to the listeners array that should be there after calling the add event method for the object. Once I have a reference to the listeners array it is just a matter of pushing the given callback function to this array of listeners.

The third public method that comes to mind is the method that I will call in my code that will be used to dispatch a given event. When calling this method I given an object with an event set up, and with at least one listener attached as the first argument. Then an event key as the second argument followed by an options object for the event. The method then just gets a reference to the listeners array, and then loops over the array and calls each event listener. When doing so it calls the for dispatch function for the event to create and pass alone the event object for the callback function of the attached listener.

```js
(function (api) {
 
    // add an event for an object
    api.addEvent = function (obj, opt) {
        opt = opt || {};
        // user Event Object
        var userEvent = {};
        // MUST GIVE AN EVENT KEY
        userEvent.eventKey = opt.eventKey;
        // need a forDispatch method that will be called for each dispatch of an event
        userEvent.forDispatch = opt.forDispatch || function (obj, dispatchOpt) {};
        // need an array of listeners
        userEvent.listeners = [];
        // attach to the objects own properties
        obj.ue = obj.ue || {};
        obj.ue[userEvent.eventKey] = userEvent;
        return obj;
    };
 
    // attach a listener for the object that will fire
    // when the event happens
    api.addListener = function (obj, eventKey, callBack) {
        // get listeners for the eventKey
        var listeners = obj.ue[eventKey].listeners;
        // if we have listeners push the callback
        if (listeners) {
            listeners.push(callBack);
        }
        return obj;
    };
 
    // dispatch an event for the given object, passing the event key, and options
    api.dispatch = function (obj, eventKey, dispatchOpt) {
        var eventObj = obj.ue[eventKey];
        // loop listeners array
        eventObj.listeners.forEach(function (cb) {
            // call the listener
            cb.call(eventObj, eventObj.forDispatch.call(eventObj, obj, dispatchOpt));
        });
        return obj;
    };
 
    // this module should work well in nodejs, or client javaScript
}
    (typeof module === 'undefined' ? this['eventMod'] = {}
        : module.exports));
```

### 2.2 - Client side javaScript demo

```html
<html>
    <head>
        <title>custom event in client side javaScript</title>
    </head>
    <body>
        <textarea id="game-console" rows="20" cols="80"></textarea>
        <script src="./event-system.js"></script>
        <script>
 
var player = {
    hp: 10
};
 
// CREATE AND ADD A 'HIT' EVENT FOR THE PLAYER OBJECT
let eventObj = {
    eventKey: 'hit',
    forDispatch: function (obj, dispatchOpt) {
        obj.hp -= dispatchOpt.damage;
        obj.hp = obj.hp < 0 ? 0 : obj.hp;
        // return an event object that will be in the listener
        return {
            target: obj, // ref to the object
            damage: dispatchOpt.damage,
            dead: obj.hp === 0
        };
    }
};
eventMod.addEvent(player, eventObj);
 
// ATTACH A LISTNEER FOR THE 'HIT' EVENT
eventMod.addListener(player, 'hit', function (e) {
    var el = document.querySelector('#game-console');
    if(!e.dead){
        el.value += 'The player was hit, taking ' + e.damage + ' damage.\n';
    }else{
        el.value += 'The player was hit, and has died from taking ' + e.damage + ' damage\n';
    }
});
 
// DISPATCH THE EVENT
eventMod.dispatch(player, 'hit', {
    damage: 3
});
// false 7
eventMod.dispatch(player, 'hit', {
    damage: 7
});
// true 0
 
        </script>
    </body>
</html>
```

### 2.3 - Sever side javaScript demo

```js
let path = require('path'),
eventMod = require(path.join(__dirname, 'event-system.js'));
 
var player = {
    hp: 10
};
 
// CREATE AND ADD A 'HIT' EVENT FOR THE PLAYER OBJECT
let eventObj = {
    eventKey: 'hit',
    forDispatch: function (obj, dispatchOpt) {
        obj.hp -= dispatchOpt.damage;
        obj.hp = obj.hp < 0 ? 0 : obj.hp;
        // return an event object that will be in the listener
        return {
            target: obj, // ref to the object
            damage: dispatchOpt.damage,
            dead: obj.hp === 0
        };
    }
};
eventMod.addEvent(player, eventObj);
 
// ATTACH A LISTNEER FOR THE 'HIT' EVENT
eventMod.addListener(player, 'hit', function (e) {
    console.log(e.dead, e.target.hp);
});
 
// DISPATCH THE EVENT
eventMod.dispatch(player, 'hit', {
    damage: 3
});
// false 7
eventMod.dispatch(player, 'hit', {
    damage: 7
});
// true 0
```

## 3 - Conclusion

So now and then it become necessary to create my own events for things when it comes to working out a module for something. For example say I am making a game module and I want to provide a way to have an event that will fire each time and enemy is killed, or when the game is over. In the code that composes my state machine I can then attach event handlers for these to define some code that will run each time that at enemy is killed, or when a game is over that should not be parked in the main game module.

So the having a way to create these kinds of custom events can really come in handy in some cases. There might be alternative ways of doing so, and it can be a gray area as to the idea of doing so is a better idea or not. Ether way I am glad that there is a built in way to do this sort of thing anyway.

Well that is it for not with custom events in client side javaScipt, at some point in the future if I get some time to expand this post with some more examples I am sure I will edit this one again.
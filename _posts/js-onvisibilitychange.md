---
title: On visibility change event
date: 2020-10-17 15:38:00
tags: [js]
layout: post
categories: js
id: 724
updated: 2021-10-19 11:37:23
version: 1.17
---

The [on visibility change](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) event of the document object in client side javaScript will fire each time the content of a web page will become visible or hidden. So in other words this event will fire each time the tab of a browser window will become visible or invisible as a user switches from one tab to another. So this is event can prove to be helpful when it comes to switching things up a little each time the user navigates away from a website of mine to another tab in a browser window of theirs. For example I can use less resources when it comes to rendering a view, and use any and all available resources just updating a state.

On top of the on visibility change event there is also the [visibility state property](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) of the document object that can be used as a way to probe for the status of the current tab and if it is active or not. Another document property that comes to mind is [document title](/2018/12/28/js-document-title/) which is a way to set what the title text of a tab is as that would be the only way to inform the user of something if the tab is not active.

So if I am ever in a situation in which I need to define a little code that will change things each time a user switches tabs, the use of this kind of event is one way to go about doing it. When a tab is not active it is possible to keep doing things in the background, but often things will change and only so much can happen over a period of time. For example [methods like setTimeout](/2018/12/06/js-settimeout/) will get throttled down, and it will not be possibles to file a method over and over again at a speed faster than one call per second with such a method regardless of what time value I give. 

In this post I might not cover every little detail about everything that will come up with this sort of thing, but I will be writing about at least a few things beyond just the on visibility change event itself.

<!-- more -->

## 1 - Basic example of the on visibility change event

In this section I will be starting out with some fairly simple examples of the on visibility state change event, as well as the visibility state property of the document object. Although I will be trying my best to keep thee examples fairly simple I trust that you have at least some experience with [event handers](/2019/01/16/js-event-listeners/), and [client side javaScript in general](/2018/11/27/js-getting-started/).

### 1.1 - Source code examples in this post

The source code examples in this post can be found in my [test vjs github repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-onvisibilitychange).

### 1.1 - Visibility Change Event and document title

Maybe a good basic example for this kind of event is to just play around with something that is just a single handler that will update the title of the page each time the event fires. Here I have an update method that will update the text of the title element once when the script loaded for the first time, then each time the on visibility change event fires.

```js
<html>
    <head>
        <title></title>
    </head>
    <body>
        <script>
var active = false;
var update = function(){
    active = !active;
    document.title = active;
};
// attach an event hander for the on visibility change event
document.addEventListener("visibilitychange", update);
// call update for first time
update();
        </script>
    </body>
</html>
```

### 1.2 - Visibility State

In the body of my update method I am using the document.title property to set the value of the title text to the current value of the visibility state property of the document object. When this method is called for the first time when the script loads the value should be _visible_ if the page is the current tab in the browser and the window is active. In any case each time this status changes the method will fire again, and the text of the title tag will update to this status.

```html
<html>
    <head>
        <title></title>
    </head>
    <body>
        <script>
var updateTitle = function(e){
    document.title = document.visibilityState;
};
document.addEventListener("visibilitychange", updateTitle);
updateTitle();
        </script>
    </body>
</html>
```

When I have this html as a file and open it up in my browser the text of the title tag will read _visible_ when the page is active and visible. In addition each time I switch to another tab and the page content is thus not visible then the value of the title text will change to _hidden_

### 1.3 - The setTiemout method

Now that I have the general idea of what the on visibility change event as well as the visibility state property is all about, I think I should cover at least one example that is a basic app loop.

```js
<html>
    <head>
        <title></title>
    </head>
    <body>
        <script>
// date
var lt = new Date(),
active = true;
// on visibility change event
document.addEventListener("visibilitychange", function(){
    active = document.visibilityState === 'hidden' ? false: true;
});
// loop using setTiemout
var loop = function(a){
    var now = new Date();
    setTimeout(loop, 33);
    document.title = 'ms: ' + (now - lt) + ', active: ' + active;
    lt = now;
};
loop();
        </script>
    </body>
</html>
```

## 2 - App loop examples

Now that I have the basics of the on visibility change method out of the way it is time to start to get into one or more advanced topics on visibility change events. In the basics section I had a very simple example that involves creating an application loop using the setTiemout method as a way to do so. In this section I will be taking a look at some more advanced examples of app loops that use a main function that calls over and over again using setTiemout, but I will also be looking into what some other options are for this sort of thing.

### 2.1 - App loop example using setTimeout

For this example I am making an app loop example that is a little more advanced compared to what I covered in the basic section of this post. On top of having a main app loop that uses the setTimeout method as a way to call the app loop function over and over again I am also setting up what is a basic state machine object that has more than one state object. The subject of making a state machine is one that I seem to keep revisiting now and then, because I can never seem to get this one just writing when it comes to making my own framework from the ground up. However the general idea is to just break up an application into two ore more states where each state object has at least an update method, but also typical a draw method, and various hooks and data.

```js
<html>
    <head>
        <title>App Loop Demo</title>
    </head>
    <body>
        <div id="disp" style="background:gray;margin:10px;padding:10px;text-align:center;"></div>
        <script>
// info text helper
var infoText = function(sm){
   return 'fps: ' + sm.fps + ', count: ' + sm.game.count;
};
// State Machine (sm) object
var sm = {
    fps: 0,
    secs: 0,
    lt: new Date(),
    game: {
        count: 0
    },
    titleDefault: document.title,
    currentState: 'visible',
    states: {
        hidden: {
            update: function (sm, state, secs) {
                sm.game.count += 1;
                // just update title text
                document.title = infoText(sm);
            }
        },
        visible: {
            update: function (sm, state, secs) {
                sm.game.count += 1;
                // update title text with default text
                document.title = sm.titleDefault;
                // update disp div with fps info
                var disp = document.querySelector('#disp');
                disp.innerText = infoText(sm);
            }
        }
    }
};
// update method
var update = function (sm) {
    var now = new Date();
    sm.secs = (now - sm.lt) / 1000;
    sm.fps = 1 / sm.secs;
    // update fps value
    sm.fps = sm.fps < 1 ? sm.fps.toFixed(2) : Math.floor(sm.fps);
    sm.lt = now;
    // call the update method for the current state
    var state = sm.states[sm.currentState];
    state.update(sm, state, sm.secs);
};
// on visibility change event can be used to switch current states
document.addEventListener("visibilitychange", function () {
    sm.currentState = 'visible';
    if (document.visibilityState === 'hidden') {
        sm.currentState = 'hidden';
    }
});
// app loop using setTimeout
var loop = function () {
    setTimeout(loop, 33);
    update(sm);
};
loop(); // call update for first time
        </script>
    </body>
</html>
```

## 3 - Basic game using Visibility State

The visibility state property of the document object is what can be used in the on visibility change event to find out what the visibility state is. This property can have one of three values 'visible', 'hidden', and 'prerender' although the prerender value is deprecated.

Although this property is often used in conjunction with the on visibility change event, it does not have to be. In the event that I just want to probe this state in an update loop, or any other event, I can do that instead.

So say that I have a basic game loop that will just update the value of a money properly of a state object by a money per second rate. This update loop method is called over and over again by setInterval event 100 ms, and each time the method fires I am using the visibility state property of the document object to check if the content of the page is visible or not. In the event that the content is visible then I set the value of the title tag to the name of the game, and display the current money value in the content of the page. In the event that the content is hidden though I am displaying what the current money value is in the title tag text of the tab.

```html
<html>
    <head>
        <title>Basic Money Game</title>
    </head>
    <body>
        <p id="disp"></p>
        <script>
 
var state = {
    money : 0,
    moneyPerSecond : 1,
    lt : new Date()
};
 
var moneyStr = function(state){
   return state.money.toFixed(2) + '$'
};
 
var update = function(e){
    var now = new Date(),
    t = now - state.lt,
    secs = t / 1000;
    if(document.visibilityState === 'visible'){
        document.title = 'Basic Money Game';
        document.getElementById('disp').innerText = moneyStr(state);
    }else{
        document.title = moneyStr(state);
    }
    state.money += state.moneyPerSecond * secs;
    state.lt = now;
};
setInterval(update, 100);
        </script>
    </body>
</html>
```

So the visibility state property can just be probed in the body of a loop such as this as a way to just know what the current status is at any given moment. So in some situations I might not have to bother with attacking an event handler for the on visibility change event if I have a loop like this being called over and over again. However it might still be best to make use of the event anyway as a way to set a separate mode, and have that be the way to change how data is displayed differently.

One thing that I have noticed when having this run in the browser is that the rate at which the text will update will change when I switch to another tab. When I am viewing the tab the rate at which the text of the money value updates will do so more or less at the rate that I have set with the time value I have passed to setInterval. When I switch to another tab the rate at which the text will update will do so at a slower rate of about one second. Because I am updating the value of the money property by way of the system time this does not cause a problem, but in projects where this is not the case the rate at which an update method will be called will slow down.

## 3 - Conclusion

The on visibility state change event is what can be used to set up one or more handers that will fire each time the user switches to another tab and back again. There is also the visibility state property that can be used to probe for what the current state is for visibility inside and outside of the hander for one of these kinds of events.
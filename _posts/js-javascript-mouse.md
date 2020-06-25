---
title: JavaScript mouse basics including events and pit falls.
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2020-06-25 16:34:02
version: 1.3
---

In client side [javaScript mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) events are a way to get mouse cursor positions as well as the state of one or more mouse buttons. The javaScript mouse events are a collection of several types of events that can be attached to the window object, or just about an html element with a method the [add event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

There are three general event type of interest when working something out with mouse events that are [onmousedown](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousedown), [onmosemove](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmousemove), and [onmouseup](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onmouseup). There are other events of interest, but for the most part I only bother with those three events when working out any kind of user interface that will make use of a mouse if present.

<!-- more -->

## 1 - JavaScript mouse events basics

So for a basic example of javaScript mouse events I quickly put together this example that will just display the current state of a the mouse position, and the state of the left mouse button.

In this example I just have a simple state object as well as some helper methods for setting the position of the state object, as well as rendering the state of the values to an html element. I am then just attaching event handlers to the window object with the add event listener method by calling the add event listener method off of the window object. Each time I call the add event listener method I pass a string value for the desired event type I want to attach for, and then a function that will fire each time the event happens.

```html
<html>
    <head>
        <title>JavaScript mouse basic example</title>
    </head>
    <body>
        <div id="out"><div>
        <script>
// basic state and render stuff
var state = {
    down: false,
    x: null,
    y: null
};
var setPos = function (state, e) {
    state.x = e.clientX;
    state.y = e.clientY;
};
var render = function (state) {
    var out = document.getElementById('out');
    out.innerText = 'pos: (' + state.x + ',' + state.y + ' ); down: ' + state.down + ';';
};
// attach events to window
window.addEventListener('mousedown', function (e) {
    state.down = true;
    setPos(state, e);
    render(state);
});
window.addEventListener('mousemove', function (e) {
    setPos(state, e);
    render(state);
});
window.addEventListener('mouseup', function (e) {
    state.down = false;
    setPos(state, e);
    render(state);
});
render(state);
        </script>
    </body>
</html>
```

When this example is up and running in the browser I end up with the current values of the state object being displayed. moving the mouse around will result in the position being updated, and clicking the mouse button will change the value of the down boolean value.
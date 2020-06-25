---
title: JavaScript mouse basics including events and pit falls.
date: 2020-06-25 11:44:00
tags: [js]
layout: post
categories: js
id: 671
updated: 2020-06-25 11:48:01
version: 1.1
---

In client side [javaScript mouse](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) events are a way to get mouse cursor positions as well as the state of one or more mouse buttons.

<!-- more -->

## 1 - JavaScript mouse events basics

```html
<html>
    <head>
        <title>javascript mouse basic example</title>
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
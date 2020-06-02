---
title: On unload event in javaScript
date: 2020-06-02 13:49:00
tags: [js]
layout: post
categories: js
id: 662
updated: 2020-06-02 13:51:43
version: 1.1
---

In client side javaScript there is the [onunload event](https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event) that can be used o attach an event handler that will fire when a user leaves a page.

<!-- more -->

## 1 - basic on unload example

```html
<html>
    <head>
        <title>ononload example</title>
    </head>
    <body>
        <div id="out"><div>
        <script>

var timeText = localStorage.getItem('unload-demo'),
now = new Date(),
time = timeText ? now - new Date(Number(timeText)) : 0;

document.getElementById('out').innerHTML = time || '';

window.addEventListener('unload', function (e) {
    localStorage.setItem('unload-demo', new Date().getTime());
});
        </script>
    </body>
</html>
```
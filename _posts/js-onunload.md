---
title: On unload event in javaScript
date: 2020-06-02 13:49:00
tags: [js]
layout: post
categories: js
id: 662
updated: 2020-06-25 10:21:07
version: 1.5
---

In client side javaScript there is the [onunload event](https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event) that can be used o attach an event handler that will fire when a user leaves a page. This can be used to save something to local storage such as updating a time stamp value or something to that effect that should happen when the user navigates away from a page or the site completely. 

The onunload event should be attached to the window object rather than and element of one sort of another as this is a event that will not happen with a single element, but when the whole page is unloaded. So it can be though of as the opposite of the  onload event that will fire when a page has finished loading. So lets take a moment to look at a few quick examples of the onunload event in action to get a better sense as to why this event is helpful in many situations that might call for its use in a project.

<!-- more -->

## 1 - basic on unload example using local storage

This basic example of the on unload event makes use of local storage to store a time stamp when the user leaves the page. When the user returns to the page the about of time sense the last visit is displayed.

To do this I just use the get item method of the local storage to get the last time stamp if there is one. I then also get the current time, and use that to get the am9unt of time that has elapsed sense the last visit. In the event that there is not a time stamp from the last visit a value of zero is used for the amount of time. I then use get document by id to get an element by way of an id tag and then set the inner text of that element to the time value.

I am then using the on unload event to attach an event hander for the on unload event. In the body of that handler I am using the set time method of local storage to set the item that is used to get a the time stamp.

```html
<html>
    <head>
        <title>on unload example</title>
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

So there you have it a basic working example of the on unload event in javaScript. This should work without issue in most cases.
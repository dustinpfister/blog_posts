---
title: On visibility change event
date: 2020-10-17 15:38:00
tags: [js]
layout: post
categories: js
id: 724
updated: 2020-10-17 16:43:11
version: 1.4
---

The [on visibility change](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) event of the document object in client side javaScript will fire each time the content of a web page will become visible or hidden. So in other words this event will fire each time the tab of a browser window will become visible or invisible as a user switches from one tab to another. This event can be used with other properties of the document object to define logic that is to be applied each time a page becomes hidden or visible.

On top of the on visibility change event there is also the [visibility state property](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState) of the document object that can be used as a way to probe for the status of the page content. Another document property that comes to mind is document title which is a way to set what there title text of a tab is.

So if I am every in a situation in which I need to define a little code that will change things each time a user switches tabs, the use of this kind of event is one way to go about doing it. When a tab is not active it is possible to keep doing things in the background, but often things will change and only so much can happen over a period of time. For example methods like setTimeout will get throttled down, and it will not be possibles to file a method over and over again at a speed faster that one call per second. In this post I might not cover every little detail about everything that will come up with this sort of thing, but I will be writing about at least a few things beyond just the on visibility change event.

<!-- more -->

## 1 - Basic example of the on visibility change event

For starers maybe a good basic example for this kind of event is to just play around with something that is just a single handler that will update the title of the page each time the event fires. Here I have an update title method that will update the text of the title element once when the script loaded for the first time, then each time the on visibility change event fires.

In the body of my update title method I am using the document.title property to set the value of the title text to the current value of the visibility state property of the document object. When this method is called for the first time when the script loads the value should be _visible_ if the page is the current tab in the browser and the window is active. In any case each time this status changes the method will fire again, and the text of the title tag will update to this status.

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

When I have this html as a file and open it up in my browser the text of the title tag will read _visible_ when the page is active and visible. In addition each time I switch to another tab and the page content is thus  not visible then the value of the title text will change to _hidden_

## 2 - visibility state property

The visibility state property of the document object is what can be used in the on visibility change event to find out what the visibility state is. This property can have one of three values 'visible', 'hidden', and 'prerender' although the prerender value is deprecated.

Although this property is often used in conjunction with the on visibility change event, it does not have to be. In the event that I just want to probe this state in an update loop, or any other event, I can do that instead.

```html
<html>
    <head>
        <title></title>
    </head>
    <body>
        <p id="disp"></p>
        <script>
var money = 0;
var update = function(e){
    if(document.visibilityState === 'visible'){
        document.title = 'Basic money game';
        document.getElementById('disp').innerText = money + '$';
    }else{
        document.title = money + '$';
    }
};
setInterval(update, 100);
        </script>
    </body>
</html>
```

## 3 - Conclusion

The on visibility state change event is what can be used to set up one or more handers that will fire each time the user switches to another tab and back again. There is also the visibility state property that can be used to probe for what the current state is for visibility inside and outside of the hander for one of these kinds of events.
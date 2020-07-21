---
title: Window innerWidth, innerHeight, centering and scaling elements
date: 2020-07-21 16:36:00
tags: [js]
layout: post
categories: js
id: 684
updated: 2020-07-21 16:53:27
version: 1.3
---

For todays post I tough I would take a break from working on some intense stuff to just writing about a not so intense subject that is the [window.innerWidth](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth), and [window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight) properties of the window object.
These properties are used to get the inner width and height of the browser window. This information can then be used as a way to center and position elements using javaScript code, and the style API.

<!-- more -->

## 1 - Basic

The basic idea here is that the window.innerWidth, and window.innerHeight properties will always give the inner width and height of the browser window. So I can attach an on resize event to the window object, and then update the info about the current status of this each time the window resizes.

```html
<html>
    <head>
        <title>window innerWidth and innerHeight</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var out = document.getElementById('out'),
update = function(){
    out.innerHTML = window.innerWidth + ',' + window.innerHeight;
};
update();
window.addEventListener('resize', function(e){
    update();
});
        </script>
    </body>
</html>
```

So that is the basic idea of inner width and height, but now the question is what it is that one would do with that information. There are also a number of other properties that a client side javaScript developer should be aware of that also come in handy when working with properties like this. So lets look at least a few examples of using the window inner width and height properties.

## 2 - Center and element width window inner width and height

So one thing that can be done with this info is to use it to center a fixed position element.

```html
<html>
    <head>
        <title>window innerWidth and innerHeight</title>
    </head>
    <body>
        <div id="container" style="position:fixed;width:640px;height:480px;background-color:black;">hello</div>
        <script>
var div = document.getElementById('container'),
center = function(el){
    var w = window.innerWidth,
    h = window.innerHeight,
    x = w / 2 - el.scrollWidth / 2,
    y = h / 2 - el.scrollHeight / 2;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
};
center(div);
window.addEventListener('resize', function(e){
    center(div);
});
        </script>
    </body>
</html>
```

## 3 - toggle full

In this section I will be writing about a quick little toggle full screen example. It is not really full screen mind you, but it is making it so the element ends up being the whole size of the window, and then back again.

This is like the center element example I just went over before, but now I am adding a toggle full method that will toggle a boolean value. If the boolean value is true then the inner width and height will be used to set the width and height of an element. If the boolean is false then the width and height of the element will be set to some hard coded values that are a kind of standard size for the element. I then have an event handler attached to the element so that when the element is clieck then the element will be toggled to full screen and back.

```html
<html>
    <head>
        <title>window innerWidth and innerHeight</title>
    </head>
    <body>
        <div id="container" style="position:fixed;width:640px;height:480px;background-color:black;"></div>
        <script>
state = {
    div: document.getElementById('container'),
    full: false,
    w: 640,
    h: 480,
    center : function(){
        var w = window.innerWidth,
        h = window.innerHeight,
        el = this.div,
        x = w / 2 - el.scrollWidth / 2,
        y = h / 2 - el.scrollHeight / 2;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
    },
    toggleFull: function(){
        this.full = !this.full;
        var w = this.full ? window.innerWidth: this.w,
        h = this.full ? window.innerHeight: this.h,
        el = this.div;
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        this.center();
    }
},
state.center();
window.addEventListener('resize', function(e){
    state.center();
});
state.div.addEventListener('click', function(e){
   state.toggleFull();
});
        </script>
    </body>
</html>
```
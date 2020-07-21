---
title: Window innerWidth, innerHeight, centering and scaling elements
date: 2020-07-21 16:36:00
tags: [js]
layout: post
categories: js
id: 684
updated: 2020-07-21 16:42:46
version: 1.0
---

For todays post I tough I would take a break from working on some intense stuff to just writing about a not so intense subject that is the [window.innerWidth](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth), and [window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight) properties of the window object.
These properties are used to get the inner width and height of the browser window.

<!-- more -->

## 1 - Basic

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

## 2 - Center

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
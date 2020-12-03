---
title: Window innerWidth, innerHeight, centering and scaling elements
date: 2020-07-21 16:36:00
tags: [js]
layout: post
categories: js
id: 684
updated: 2020-12-03 10:34:32
version: 1.12
---

The [window.innerWidth](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth), and [window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight) properties of the window object are a way to go about getting the current size of a window, but not the total size of a screen. That is that on mobile devices the innerWidth property might work okay go get an idea of what the width of the screen of the device is, however on desktop systems it might not because the user might not have there browser window maximized or in full screen. Even if that is not the case it might not be the best option to know what you are dealing with, there is the subject of zooming, and also logical pixels.

Still these properties are useful for the sake of getting the inner width, and height of a browser window in most cases. This information can then be used as a way to center and position elements using javaScript code, and the style API. However there might be better options for doing so when it comes to just using HTML and CSS, in other words looks for a more simple solution first before resorting to javaScript. 

<!-- more -->

## 1 - Basic

The basic idea here is that the window.innerWidth, and window.innerHeight properties will generally give the inner width, and height of the browser window in pixels. So maybe a good basic example of this would be to attach a on resize event to the window object, and then display info about the current status of these properties each time the window resizes.

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


So that is the basic idea of inner width and height, but now the question is what it is that one would do with that information. Also another thing to be aware of is if these numbers are always the case in every possible situation when it comes to things like zooming, and logical pixels in relation to actual pixels. In chrome and most other browsers for that matter there is pressing the ctrl and then the /+, /-, and /0 keys to zoom in and out and back to normal zoom level. When doing so the numbers will go down and up depending on the current zoom level. So it goes without saying that these values do not reflect actual pixels dimensions, but a kind of logical pixel length that can be effected by the zoom level of the browser.

There are also a number of other properties that a client side javaScript developer should be aware of that also come in handy when working with properties like this. So lets look at least a few examples of using the window inner width and height properties.

## 2 - Center and element width window inner width and height

So one thing that can be done with this info is to use it to center a fixed position element. The left and top css values of an element can be changed with javaScript code via the style API. However first I need to know the values to set for the position of the element. 

The inner width and height properties can be used to find the center of the browser window by just dividing the values by two which is simple enough. Then on top of that I need to subtract half of the width and height of the element that I want to center. To get the width and height of an element there is the [scroll width](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth) and [scroll height](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight) properties of an element reference object that will do nicely.

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

So then these properties of the window object, and an element of interest can be used as a way to go about centering and positioning elements depending on the current width and height of a browser window. However this does string me as an overkill solution for this sort of thing, it might still be best to look into other options for this when it comes to using CSS only as a way to center, and scale elements.

## 3 - toggle full screen

In this section I will be writing about a quick little toggle full screen example. It is not really full screen mind you, but it is making it so the element ends up being the whole size of the window, and then back again.

This is like the center element example I just went over before, but now I am adding a toggle full method that will toggle a boolean value. If the boolean value is true then the inner width and height will be used to set the width and height of an element. If the boolean is false then the width and height of the element will be set to some hard coded values that are a kind of standard size for the element. I then have an event handler attached to the element so that when the element is clicked then the element will be toggled to full screen and back.

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


## 4 - Conclusion

So I like to make posts on simple examples like this now and then, it is a nice break from working on something that takes house or even days to get working. Regardless I have come to find that sometimes simple things like this are not always so simple. I also can not say that using window.innerWidth and height are the best ways to go about centering elements, and toggling to full screen or not. I find myself preferring HTML only solutions for things like this if I can find them actually.
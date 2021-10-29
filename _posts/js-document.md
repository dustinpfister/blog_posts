---
title: Javascript document object
date: 2021-10-29 07:37:00
tags: [js]
layout: post
categories: js
id: 935
updated: 2021-10-29 08:33:52
version: 1.4
---

The [javaScript document](https://developer.mozilla.org/en-US/docs/Web/API/Document) object is the main object of a loaded page, and is a property of the window object which is the global object in client side javaScript. There is a lot of ground to cover with this object that serves as an interface for a whole range of things that have to do with getting, creating, and injecting one or more HTML elements when it comes to working with the Document Object Model or DOM. There are a number of other features in the document object also that are worth looking into at some point such as the location object, and the various events that can be attached for this object.

In this post I will then be doing a general overview of the document object in client side javaScript, and while I am at it touch base on a wide range of other topics that will branch off from the document object, which is a lot.

<!-- more -->


## 1 - Basic of the javaScript document interface

In this section I will be going over a few quick, simple, copy and paste style examples of the javaScript document interface. One thing I should mention here is that this whole post is on just one object to work with in client side javaScript, it is not a kind of [javaScript document in some other sense of what you might be looking for](https://developer.mozilla.org/en-US/docs/Web/JavaScript). With that said if you are still fairly new to javaScript it might be best to start with my [getting started with javaScript post](/2018/11/27/js-getting-started/) rather than starting here.

### 1.1 - Get a reference to an element

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div id="out">Hello </div>
        <script>
var el = document.getElementById('out');
el.innerText += 'World';
        </script>
    </body>
</html>
```

### 1.2 - Get a collection of elements

```html
<html>
    <head>
        <title>js document object example</title>
    </head>
    <body>
        <div>
            <div class="foo"></div>
            <div class="foo"></div>
            <div class="foo"></div>
        </div>
        <script>
var divs = document.querySelectorAll('.foo');
var i = divs.length;
while(i--){
   var d = divs[i];
   d.innerText = 'Hello World';
}
        </script>
    </body>
</html>
```

### 1.3 - Events

```html
<html>
    <head>
        <title>js document object example</title>
    </head>
    <body>
        <div style="width:100px;height:100px;background:gray;"></div>
        <script>
var handler = function(e){
   alert(e.target.nodeName)
}
document.addEventListener('click', handler);
        </script>
    </body>
</html>
```

### 1.4 - Location

```html
<html>
    <head>
        <title>javaScript document object example</title>
    </head>
    <body>
        <div id="out">Hello </div>
        <script>
var el = document.getElementById('out');
el.innerText += document.location.href;
        </script>
    </body>
</html>
```



---
title: Javascript document object
date: 2021-10-29 07:37:00
tags: [js]
layout: post
categories: js
id: 935
updated: 2021-10-29 08:27:03
version: 1.2
---

The javaScript document object is the main object of a loaded page, and is a property of the window object which is the global object in client side javaScript. There is a lot of ground to cover with this object that serves as an interface for a whole range of things that have to do with getting, creating, and injecting one or more HTML elements when it comes to working with the Document Object Model or DOM. There are a number of other features in the document object also that are worth looking into at some point such as the location object, and the various events that can be attached for this object.

<!-- more -->


## 1 - Basic of the javaScript document interface

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



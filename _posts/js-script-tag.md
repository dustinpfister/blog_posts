---
title: script tags in client side javaScript
date: 2019-01-19 18:39:00
tags: [js]
layout: post
categories: js
id: 361
updated: 2019-01-21 18:57:33
version: 1.3
---

[Script tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) come into play with web development when I want to do anything that involves the use of client side javaScript in a website. In this post I will be sharing all the little things there are to know about when working with script tags to get things working with client side javaScript.

<!-- more -->

## 1 - script tags can be used to add in line javaScript code to a website

A script tag can be used to add javaScript to a website by placing the javaScript code between the beginning and ending script tags.

```html
<html>
    <head>
        <title>script tags and inline scripting</title>
    </head>
    <body>
        <script>
var n = 40;
console.log(n+2); // 42
        </script>
    </body>
</html>
```

## 2 - script tags and external javaScript files

It is also possible to load external scripts as well. This can be done by making use of the src attribute of the script tag to point to the url of the external javaScript file.

```html
<html>
    <head>
        <title>script tag</title>
    </head>
    <body>
        <script>
        </script>
        
        <div id="out"></div>
        <script src="main.js"></script>
    </body>
</html>
```

```js
document.getElementById('out').innerText = 'external';
```
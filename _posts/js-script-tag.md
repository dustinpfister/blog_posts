---
title: Script tags in client side javaScript
date: 2019-01-19 18:39:00
tags: [js]
layout: post
categories: js
id: 361
updated: 2019-05-29 14:28:17
version: 1.6
---

In javaScript [script tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) come into play with web development when I want to do anything that involves the use of client side javaScript in a website. Script tags can be used to add in line javaScript, and can also be used to link to external javaScript as well. It is also possible to create javaScript script tags with javaScript as well as a way to load additional external assets with code. In this post I will be sharing all the little things there are to know about when working with script tags to get things working with client side javaScript.

<!-- more -->

## 1 - script tags can be used to add in line javaScript code to a website

A script tag can be used to add javaScript to a website by placing the javaScript code between the beginning and ending script tags. These days there is not need to set the script tags type attribute to javaScript as that is what is assumed these days.

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

I some times used in line javaScript for simple projects, but often the code will ultimately end up in an external javaScript file. When that is the case the src attribute must be used to load the javaScriot file, so lets look at some more examples of the script tag in action.

## 2 - script tags and external javaScript files

It is also possible to load external scripts as well. This can be done by making use of the src attribute of the script tag to point to the url of the external javaScript file.

For example here I have some html, and I am linking to the external javaScript file by adding a script tag in the body element just before the end body tag.

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

I then have this javaScript in the external file that just grabs the div tag with and id of out and just adds some text to that element.

```js
document.getElementById('out').innerText = 'external';
```
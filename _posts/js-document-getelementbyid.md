---
title: document.getElementById and other ways to gain references to elements in javaScript
date: 2018-12-27 19:08:00
tags: [js]
layout: post
categories: js
id: 351
updated: 2018-12-29 17:26:15
version: 1.2
---

With front end javaScript it is important to know how to create references to html elements. That is much of front end javaScript devlopment has to do with interacting with the document object model, so creating a reference to an html element is needed in order to get something from and element, change something about it, or add something to it. So in other words there is a need to get an element by its id, or failing that by some other means, so in this post I will be covering some methods and examples of how to go about doing just this.

<!-- more -->

## 1 - Using document.getElementById to get a reference to an element

One of the most common ways of getting a reference to an html element with javaScript is to use document.getElementById. This is seen in tones of code examples, and is still often a favorite way of going about acessing an element in front end javaScript.

```html
<html>
  <head>
    <title>Demo</title>
  </head>
  <body>
    <div id="foo"><p>bar</p></div>
    <script>
 
    var el = document.getElementById('foo');
    console.log( el.children[0].innerText ); // bar
 
    </script>
  </body>
</html>
```

Works fine assuming that the desired element has an id, and you know what it is. No worries there is of course a great deal of other ways to go about grabbing an element as well, more on that later.

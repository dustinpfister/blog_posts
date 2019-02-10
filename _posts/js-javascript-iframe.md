---
title: Javascript iframe basics
date: 2019-02-10 09:20:00
tags: [js]
layout: post
categories: js
id: 375
updated: 2019-02-10 09:46:10
version: 1.1
---

Sometimes it is called for to do something that involves an [iFrame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) when it comes to developing a client system with javaScript.

<!-- more -->

## 1 - javaScript iFrame basics

To get started with iframes there are two general ways of doing so one would be to add one to the actual hard coded html by editing an html file or template, and the other way would be to create and inject one into a document. In this section I will be coving how to go about doing just this involving a single html file.

```html
<html>
    <head>
        <title>javascript iframe basic example</title>
    </head>
    <body>
        <iframe id="theframe" width="320" height="240"></iframe>
        <script>
let iFrame = document.querySelector('#theframe'),
w = iFrame.contentWindow;
div = document.createElement('div');
 
div.innerHTML ='Hello World';
w.document.body.appendChild(div);
        </script>
    </body>
</html>
```

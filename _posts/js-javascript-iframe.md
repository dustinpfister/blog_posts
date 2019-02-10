---
title: Javascript iframe basics
date: 2019-02-10 09:20:00
tags: [js]
layout: post
categories: js
id: 375
updated: 2019-02-10 09:50:15
version: 1.2
---

Sometimes it is called for to do something that involves an [iFrame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) when it comes to developing a client system with javaScript.

<!-- more -->

## 1 - javaScript iFrame basics

To get started with iframes there are two general ways of doing so one would be to add one to the actual hard coded html by editing an html file or template, and the other way would be to create and inject one into a document. In this section I will be coving how to go about doing just this involving a single html file.

### 1.1 - Working with an iFrame that is hard coded into the html

When working with an iframe that is hard coded into the html the process is to just gain a reference to it by using something like document.querySelector, document.getElementById, or any other means that will result to the hard coded iFrame element in the html of the page.

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

Once a reference to the iFrame is obtained it is possible to access the window object of that iFrame via the contentWindow property of the iFrame element. This works in much the same way as the window object of the page itself as such I can add content to the iFrame in the same manner as i would with the main window object.

---
title: document body property in vanilla js
date: 2019-01-03 21:00:00
tags: [js]
layout: post
categories: js
id: 354
updated: 2019-01-21 12:26:56
version: 1.7
---

The [document.body property](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) of the document object in client side javaScript is a reference to the [body](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) tag in an html document. The body tag is where all additional elements will be placed that have to do with the documents layout and structure. In this post I will be covering some topics when it comes to the document.body property that can be used to quickly reference this html element.

<!-- more -->

## 1 - document body example

The document body property of the document object can always be used to quickly gain a reference to the body element. So it can be used as an alernative to something like document.getElementById, or document.getElementsByTagName when it is only just the single body tag of an html document that is of concern. In this example I am creating a canvas element with the create element method, and then appedning it to the body element of an html document with the append child method.

So for this example I might have some html that looks like this.

```html
<html>
    <head>
        <title>document body</title>
    </head>
    <body>
        <script src="main.js"></script>
    </body>
</html>
```

Here I am linking to an extrenal javaScript file called main.js where I will be creating and appending the the canvas element. The contents of the main.js file are as follows.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
 
// using document body to append a new canvas element
document.body.appendChild(canvas);
 
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle='#000000';
ctx.fillRect(0,0,canvas.width,canvas.height);
```

 If all goes well this example just results in a black blank canvas, nothing to interesting, but you get the idea. So as you can see the document.body property is always there to serve as a quick reference to the body element.
---
title: document body property in vanilla js
date: 2019-01-03 21:00:00
tags: [js]
layout: post
categories: js
id: 354
updated: 2019-07-03 17:39:31
version: 1.13
---

The [document.body property](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) of the document object in client side javaScript is a reference to the [body](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) tag in an html document. The body tag is where all additional elements will be placed that have to do with the documents layout and structure. In this post I will be covering some topics when it comes to the document.body property that can be used to quickly reference this html element.

<!-- more -->

## 1 - document body example

The document body property of the document object can always be used to quickly [gain a reference to the body element](https://stackoverflow.com/questions/26067590/get-body-element-of-site-using-only-javascript). So it can be used as an alternative to something like document.getElementById, or document.getElementsByTagName when it is only just the single body tag of an html document that is of concern. In this example I am creating a canvas element with the create element method, and then appending it to the body element of an html document with the append child method.

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

Here I am linking to an external javaScript file called main.js where I will be creating and appending the the canvas element. The contents of the main.js file are as follows.

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

## 2 - Other ways of getting the body element

There is not much need for other ways to get the body element. The document body property is well supported across browsers these days. Never the less in this section I will be quickly going over some other options when it comes to getting a reference to the body element in client side javaScript.

### 2.1- Using getElementsByTagName to get the document body element with javaScript

Although the document body property is the quickest way to go about getting a reference to the body element of an html document, with javaScript there are of course a number of other ways both new and old to get references to an element including the body element. One such way would be to use the document.getElementsByTagName method.

```js
var body = document.getElementsByTagName('body')[0];
console.log(body);
```

This tired yet true way to go about getting a reference to the body element will return an html collection rather than a reference to the body element. It will always do this for a tag even if there is just one of theme such is the case with body.
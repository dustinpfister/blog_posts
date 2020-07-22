---
title: The Canvas Element in client side javaScript
date: 2020-07-22 15:38:00
categories: canvas
tags: [canvas]
layout: post
id: 685
updated: 2020-07-22 16:04:26
version: 1.5
---

In client side javaScript there is the [canvas element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) that is one of the coolest, if not the coolest elements to with with. The reason why is because it can be used to create graphics and animations using javaScript code. There is a whole bunch of methods for drawing to a canvas element when it comes to drawing lines and shapes, as well as rendering an image to the canvas, and even working with raw image data.

I have wrote a lot of posts on the canvas element then, from getting started posts, to posts on various properties and methods in the 2d drawing context API, to full canvas examples of games, animations, and so forth. So it was only a matter of time until I made a main blog post of sorts that will act as a center point for all things canvas related on this github pages site of mine here.

<!-- more -->

## 1 - Getting started with canvas

This section will be just me briefly going over the very basics of how to get started with canvas elements, if you are an experienced javaScript developer the you will likely want to skip over this section and move on to the good stuff when it comes to working with the canvas element.

So I have wrote a [getting with canvas post](/2017/05/17/canvas-getting-started/) a long time ago, but I will also touch on this subject briefly here as well. The basic idea is that you need to first get a reference to a canvas element, one that is hard coded into the actual html itself, or one that is created and then injected with a little javaScript code.

Once you have a reference to a canvas element, you can then use the getContext method of the canvas element to get a reference to the 2d drawing context of the canvas element. With this context API it is then possible to now draw to the canvas with a whole much of drawing methods, and properties.

### 1.1 - A simple copy and past black screen canvas example

So in this section I will be going over a very simple canvas example that you can copy and past into the javaScript console right now. Just press ctrl+shift+j if you are using chrome, then copy and past the below canvas example into the javaScript console and press return. The result should be a blank canvas element in the upper left corner of the browser window.

```js
(function () {
 
    // create and inject a canvas
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
 
    // append to body
    document.body.appendChild(canvas);
 
    // set actual matrix size of the canvas
    canvas.width = 320;
    canvas.height = 240;
    // fixed position
    canvas.style.position = 'fixed';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
 
    // default the canvas to a solid back background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
}
    ());
```

So there you have a very basic canvas example that just involves creating an injecting a canvas element into a web page. I just created an canvas element, appending it to the body element, set the width and height, set fixed positioning for it via the style API. I then usd the fill style property, and the fill rect method to draw a black rectangle from the upper left corner of the canvas to its with and height to just make a blank black canvas.
---
title: The Canvas Element in client side javaScript
date: 2020-07-22 15:38:00
categories: canvas
tags: [canvas]
layout: post
id: 685
updated: 2020-07-22 15:51:37
version: 1.2
---

In client side javaScript there is the [canvas element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) that is one of the coolest, if not the coolest elements to with with. The reason why is because it can be used to create graphics and animations using javaScript code. There is a whole bunch of methods for drawing to a canvas element when it comes to drawing lines and shapes, as well as rendering an image to the canvas, and even working with raw image data.

I have wrote a lot of posts on the canvas element then, from getting started posts, to posts on various properties and methods in the 2d drawing context API, to full canvas examples of games, animations, and so forth. So it was only a matter of time until I made a main blog post of sorts that will act as a center point for all things canvas related on this github pages site of mine here.

<!-- more -->

## 1 - Getting started with canvas

So I have wrote a [getting with canvas post](/2017/05/17/canvas-getting-started/) a long time ago, but I will also touch on this subject briefly here as well. The basic idea is that you need to first get a reference to a canvas element, one that is hard coded into the actual html itself, or one that is created and then injected with a little javaScript code.

Once you have a reference to a canvas element, you can then use the getContext method of the canvas element to get a reference to the 2d drawing context of the canvas element. With this context API it is then possible to now draw to the canvas with a whole much of drawing methods, and properties.
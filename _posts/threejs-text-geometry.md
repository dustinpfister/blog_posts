---
title: Text Geometry in threejs
date: 2023-07-05 12:20:00
tags: [three.js]
layout: post
categories: three.js
id: 1058
updated: 2023-07-05 12:28:14
version: 1.0
---

When it comes to adding text to threejs projects there might be a number of ways to do so. There is thinking in terms of adding text in the form of canvas textures that are then used with some geometry as a way to add text. There is also working out something where I just have a plain old fashion 2d canvas drawing context and then draw to it with the dom element property of the WebGl Renderer, and then while I am at it use the 2d drawing context to draw some text on top of that which is what I often like to do these days. However todays post will be on the text geometry constructor function that can be added in with a project by way of an additional add in module alone with the core library of threejs itself.

Using the text geometry constructor is a little involved as it will not just require adding the text geometry module, but also an additional loader that is needed to load the JSON files that will contain the data that is the font to be used. Speaking of fonts, yes that is yet another file that will need to be obtained by one means or another. The good news though is that all of this can be found in the threejs github repo if you just want to use what there is to work with there.

<!-- more -->

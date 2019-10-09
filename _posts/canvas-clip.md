---
title: The canvas clip method
date: 2019-10-08 19:44:00
tags: [canvas]
layout: post
id: 542
categories: canvas
updated: 2019-10-09 12:36:21
version: 1.1
---

The [canvas clip method](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip) can be used to set a clipping area for a canvas. This is an area of the canvas that will be drawn to where everything outside of the clip area will not actually be drawn to the canvas. So in other words it is a way to go about making a mask of sorts for a canvas. The canvas clip method is used in a similar way to that of the fill and stroke methods, as it can be used with a path. That is a path can be used as a way to define the clip area and then the canvas clip method is what can be used to set that clip area. This method can also be used with the save and restore methods and layering.

<!-- more -->


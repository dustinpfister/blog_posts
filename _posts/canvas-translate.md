---
title: The canvas translate method
date: 2019-10-09 19:43:00
tags: [canvas]
layout: post
id: 543
categories: canvas
updated: 2019-10-09 19:47:37
version: 1.1
---

The [canvas translate](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) method can be used to add a translation transformation the the current canvas matrix. This is so that when something is drawn to a certain point within the canvas uisng the canvas drawing methods it is actually drawn relative to the translated point, rather that the usual top left corner of the canvas.

<!-- more -->


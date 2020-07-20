---
title: Canvas examples on animation basics and beyond
date: 2020-07-20 09:40:00
tags: [canvas]
layout: post
id: 683
updated: 2020-07-20 10:10:10
version: 1.2
---

This will be just a quick [canvas examples](/2020/03/23/canvas-example/) post on object pools. An object pool is what I have come to call a collection of display object when making a canvas project that calls for them. So these objects will often contain properties like x and y for the current position as well as width, and height as one might expected. Depending on the nature of the canvas project they will often have additional properties like heading, pixels per second, max hit points, damage, and so forth. However than main point of this canvas example is just to show one way of how to go about creating a collection of these kinds of objects.

There is creating a collection pool as just an empty array, and then have code that pushes new display objects into the pool, and purge them out as needed. However there is also creating an array of display objects once of a certain set length, and then have an active property of the display object that is used to set if the display object is currently being used or not. This way I am setting fixed amounts of display objects rather than just pushing them in and out out as needed.

<!-- more -->


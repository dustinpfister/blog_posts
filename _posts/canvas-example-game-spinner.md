---
title: Game Spinner Canvas example
date: 2020-06-07 12:09:00
tags: [canvas]
categories: canvas
layout: post
id: 664
updated: 2020-06-07 16:34:49
version: 1.3
---

This [canvas example](/2020/03/23/canvas-example/) will be of a game spinner. In other words a virtual from of one of those things that you get in many board games that functions as an alternative to dice that has a spinner or arrow type thing attached to the center of a disk with a bunch of sections on it. So this canvas example will involve a module that can be used to create a state object for this sort of thing, and like aways a darw module that is used to draw the state of one of these to a canvas element.

<!-- more -->

## 1 - The spinner.js file for this canvas example

So in this section I will be going over all the features of my spinner.js file that can be used to create an instance of a spinner object. Ther module contains a public API that is used to create an instance of one of these objects, and then a bunch of methods that are used to set up a new spin, and update the state of that spinner object on each frame tick.
---
title: Game Spinner Canvas example
date: 2020-06-07 12:09:00
tags: [canvas]
categories: canvas
layout: post
id: 664
updated: 2020-06-07 19:24:36
version: 1.5
---

This [canvas example](/2020/03/23/canvas-example/) will be of a game spinner. In other words a virtual from of one of those things that you get in many board games that functions as an alternative to dice that has a spinner or arrow type thing attached to the center of a disk with a bunch of sections on it. So this canvas example will involve a module that can be used to create a state object for this sort of thing, and like aways a darw module that is used to draw the state of one of these to a canvas element.

<!-- more -->

## 1 - The spinner.js file for this canvas example

So in this section I will be going over all the features of my spinner.js file that can be used to create an instance of a spinner object. The module contains a public API that is used to create an instance of one of these objects, and then a bunch of methods that are used to set up a new spin, and update the state of that spinner object on each frame tick.

## 2 - The draw.js module

This is a canvas example so like always I will want a module that is packet with methods that I can call to render the state of a spinner state object to a canvas element. Here I went with an object literal module pattern that I usual go with when it comes to these kinds of modules. I also have it so I pass the drawing context, canvas, and any other objects that I need to draw in the given methods rather than grabbing at globals for these things.

## 3 - The main.js and index.html files

So now that I have my spinner.js file, and a draw.js file that can be used to draw the state of a spinner object it is time to test this all out with just a little more javaScript, and some HTML. For this I have my main.js file where I create and inject the html element for the canvas example, and also create an instance of my state object for this example which is a spinner state object created with the create public API method of the spinier.js module the I covered before hand. Here in the main.js file I also have my main app loop, and I also attach events for the spinner state object.
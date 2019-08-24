---
title: A Canvas Example that is a basic Space Shooter game
date: 2019-08-21 19:41:00
tags: [js, canvas]
layout: post
categories: canvas
id: 527
updated: 2019-08-23 20:13:17
version: 1.8
---

So this post might be the first of several [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), this one will be on a space shooter game. This is a project that I threw together in just a few hours, so it is not really a complete game at the time of this writing at least. Still I have some fun with this one, and I might get around to putting more time into this one at some point.

<!-- more -->

## 1 - The Space Shooter Canvas Example

This canvas example consists of several javaScript files and a single html file. The project seems to work just fine via the file protocol, and does not depend on any external assets in terms of images, or scene data. This project is an example of the canvas element in action as well as many other subjects that come up when developing a canvas game with client side javaScript. Many such projects involve the use of a framework such as phaser ce to help save time, but in this post I ma doing everything with native javaScript.

## 2 - The html file

To start off with here is the html file that I have for the canvas example. For this one I am using a hard coded canvas element rather than creating and injecting a canvas element with javaScript. I am also lining to all the extremal javaScript files that I have worked out when it comes to handling display objects, a state machine, events rendering and a main app loop.

```html
<html>
    <head>
        <title>canvas example space shooter</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="disp.js"></script>
        <script src="states.js"></script>
        <script src="events.js"></script>
        <script src="render.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

So now that is out of the way lets get to the actual javaScript.

## 2 - The Display Object Classes
## 3 - The State Machine
## 4 - Events
## 5 - Renderer
## 6 - Main app loop
## 7 - Conclusion
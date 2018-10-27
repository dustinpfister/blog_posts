---
title: Game time that is subject to pause in phaser ce
date: 2018-10-26 20:45:00
tags: [js,phaser]
layout: post
categories: phaser
id: 313
updated: 2018-10-26 20:53:33
version: 1.0
---

When working with time in [phaser ce](https://phaser.io/) it is often important to now use game.time.now, or a new javaScript date object by itself. Unless you are making a project where things do need to progress with real world time, in most projects it is necessary to have game time be a subject to a pause event, or inactivity. The vale that is returned by game.time.elapsed is the about of time in milliseconds that has elapsed sense the last frame tick. In addition it is.a value that will not keep getting larger as real world time goes by when the game is pause or the window is inactive. As such the elapsed time is great for moving display objects by a pixels per second value, as the display objects will not jump forward if the game is inactive for a sec. So in this post I will be going over some use case examples of the elapsed property in the time object in phaser ce.

<!-- more -->

## 1 - What to know before continuing.

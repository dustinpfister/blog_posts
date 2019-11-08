---
title: Canvas move objects by Pixels per second 
date: 2019-11-08 15:33:00
tags: [canvas]
categories: canvas
layout: post
id: 559
updated: 2019-11-08 14:39:56
version: 1.0
---

With canvas moving objects is one of the first things I started to get up to speed with. However years later I am not aware with many different ways to go about moving a display object in a canvas project. In my earliest projects I would just step the position of an object by delta values on each frame tick, but now I know that it is better to go by a pixels per second value and multiply that by the amount of time that has elapsed sense the last update of a state.

<!-- more -->

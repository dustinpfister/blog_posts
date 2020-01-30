---
title: pointer manager mouse and touch canvas example
date: 2020-01-29 20:03:00
tags: [canvas]
categories: canvas
layout: post
id: 599
updated: 2020-01-29 20:10:03
version: 1.0
---

This is a canvas example that makes use of what I am calling a pointer manager. Maybe there are other names for such a thing but until I am aware of a better name that is what I am going to call it. Anyway say you want to make a canvas project that will work well with both mouse and touch events. So in other words you do not want to do anything with muti touch on touch devices, and you want all events for both mouse and touch events to be mapped to certain events that are the same. However in order to do so a bit of parsing, adjusting values, and other things need to be preformed before calling some uniform handers that are to be called for both mouse and touch events.
So thins will be a quick post on such a project that does what I just described so lets take a look.
<!-- more -->

---
title: javaScript inverse functions
date: 2021-07-23 11:08:00
tags: [js]
layout: post
categories: js
id: 917
updated: 2021-07-23 11:18:09
version: 1.3
---

I have made an [experience point system](/2020/04/27/js-javascript-example-exp-system/), It works okay, but it lacks some additional features that I would like to add. So as of late I have been making a few new systems, but I have found that I should maybe take a step back and work on some more basic functions before progressing on to making one or more experience point systems. I say that because I think I need to work out some things when it comes to [inverse functions](https://en.wikipedia.org/wiki/Inverse_function) which is a subject that seems to come up when getting into making an experience point system, at least speaking from my experience with making experience point systems thus far, not pun intended. 

Simply put when I am making an experience point system I like to have two methods that give me an unknown value when I have a known value. As you might expect I like to have a method that will return a level number when an experience point number is given, and another function that will give an experience point number when a level number is given. So in other words I want a kind of get level funcion, and an _inverse_ of this get level function that would be called something like get exp.

<!-- more -->

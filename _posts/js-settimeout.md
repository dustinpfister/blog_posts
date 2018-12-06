---
title: setTimeout in javaScript for delaying function calls and looping
date: 2018-12-06 11:03:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 345
updated: 2018-12-06 11:24:34
version: 1.1
---

When writing a javaScript project of some kind there will often be a need to implement some kind of main application loop. There are a number of ways to go about doing this, but for this post I will be mainly writing about settimeout. This method can be used to delay the calling of a function, or setting up a situation in which a function keeps getting called over and over again at a certain rate. It might not be the best option in all situations, often it might be better to use requestAnimationFrame these days. Still settTimeout, or the similar setInterval is a good choice for some projects where it is called for.

<!-- more -->

---
title: Clamping a vector in threejs
date: 2021-06-16 12:45:00
tags: [three.js]
layout: post
categories: three.js
id: 890
updated: 2021-06-16 12:57:29
version: 1.2
---

When it comes to setting boundaries for objects in a threejs project there is often clamping the values of wrapping the values. That is that there is a situation in which there is a min value, a max value, and having a way to make sure that a value is always inside this range.

<!-- more -->

## 1 - What to know before hand

This is a post on using the Vector3 clamp method to clamp a vector between a min and max range.
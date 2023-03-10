---
title: Camera Planes module threejs example
date: 2023-03-10 08:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1031
updated: 2023-03-10 09:00:18
version: 1.0
---

When working on various threejs projects I have thought that it would be nice to have a way to just simply have a simple 2d layer to display debug info, or when making a final product to just use for any and all overlays that have to do with simple messages and so forth. Anyway of course, as always there is more than one way to go about doing something like this. One way would be to just have an HTML Collection of canvas elements, some of which are the DOM element properties of a threejs renderer, and others are just plane old 2d drawing content canvas elements. That is all fine and good, and maybe that is how I will need to go about doing things with certain projects. However for this threejs project example I am thinking more in terms of just going with a single canvas element that is the DOM element of a WebGL renderer, and making use of mesh objects, plane geometry, and various camera properties to just position, rotate, and scale such mesh objects so they are just in front of a camera at all times.


<!-- more -->

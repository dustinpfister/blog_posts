---
title: The Buffer Geometry Constructor in threejs
date: 2023-08-31 13:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1069
updated: 2023-08-31 13:46:18
version: 1.0
---

There is the core threejs library itself and then there is a whole lot of additional tools to work with as well that can be pulled from the threejs Gitbub repository. One of the manly assets that there are to make use of there is the [buffer geometry utilities module](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils). This module is packed with a wide range of utility methods that are bot backed into the buffer geometry class itself, but might still prove to be useful for many various cases. One method that I have used thus far is the merge Geometries method which as the name suggests is just simply a way to create a single geometry from an array of geometry objects. There are of course a whole lot of other tools in this module a such a I have started this blog post as a way to park some notes on this subject.


<!-- more -->

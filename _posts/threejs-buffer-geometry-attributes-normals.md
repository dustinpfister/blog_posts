---
title: The normal attribute for buffer geometries in threejs
date: 2021-06-08 14:41:00
tags: [three.js]
layout: post
categories: three.js
id: 884
updated: 2021-06-08 14:52:52
version: 1.2
---

Yesterday I wrote a post on the position attribute of a [buffer geometry](https://threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html) in threejs, and today I thought I would continue the trend by writing another post on an attribute of buffer geometry this time the normal attribute. the values in this attaribute are used to find out what the direction is of each point of each triangle in an instance of buffer geometry. These values are then used when it comes to rendering textures for various materials such as with the normal material.

<!-- more -->

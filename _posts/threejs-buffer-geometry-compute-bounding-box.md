---
title: Computing Bounding Box for buffer geometries in threejs
date: 2022-10-07 08:30:00
tags: [three.js]
layout: post
categories: three.js
id: 1008
updated: 2022-10-07 08:40:33
version: 1.0
---

With the buffer geometry class in threejs there is a bounding box property that stores an instance of the Box3 class, and the compute bounding box method of the buffer geometry class is what can be used to create or update this instance of Box3. As the name suggests this bounding box property can be used for collision detection, but it can also be used to find out the size of a geometry which can aid in the process of positioning objects.

<!-- more -->

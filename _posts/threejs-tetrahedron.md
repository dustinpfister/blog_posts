---
title: Pyramid AKA Tetrahedron Geometry in threejs.
date: 2022-12-02 08:23:00
tags: [three.js]
layout: post
categories: three.js
id: 1016
updated: 2022-12-02 08:34:58
version: 1.0
---

When looking into the built in Geometry Classes in threejs for the first time there are a few that can be used to make a Pyramid Type Geometry. Both the Cone Geometry, and the Cylinder Geometry classes can be used to do so if one gives a certin set of arguments when calling them. There is however also a built in Tetrahedron Geometry Class that can also be used to do this bu just simply calling it and giving a radius that will also result in a Pyramid shape as well. However one might run into some problems with this sort of thing when it comes to rotation of the result, and there are also a few addtional reasons why one might want to make some kind of custom geometry for this sort of thing as well. So in this post I will be writing about this built in Tetrahedron Geometry Class, but also an array of altertaive ways to create this kind of geometry inclduing some custom ways to do so while I am at it.

<!-- more -->

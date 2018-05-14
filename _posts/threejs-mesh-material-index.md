---
title: Using an array of materials, and setting material index values in three.js
date: 2018-05-14 09:54:00
tags: [js,three.js]
layout: post
categories: three.js
id: 187
updated: 2018-05-14 10:00:56
version: 1.0
---

When working with a mesh in [three.js](https://threejs.org/) a single instance of some kind of mesh material can be passed to the mesh constructor as the second argument. This is fine if you are okay with every face in the geometry being skinned with the same material, otherwise you might want to pass an array of materials instead. When working with an array of materials there is a property of a face3 instance in the geometry of the mesh that is of interest when setting the material index property of the faces. In this post I will be covering some basic demos of how to work with more than one material, and how to go about setting the material index values of a geometry.

<!-- more -->

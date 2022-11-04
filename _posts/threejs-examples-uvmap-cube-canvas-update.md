---
title: UV map of a cube set up once and then draw to a canvas texture threejs example.
date: 2022-11-04 08:13:00
tags: [three.js]
layout: post
categories: three.js
id: 1012
updated: 2022-11-04 08:23:51
version: 1.0
---

I would like to start at least one if not more threejs project examples that have to do with setting up the uv map of a cube created with the THREE.BoxGeometry constructor in threejs. By default the geometry will have a uv map, it is just that it will use all of the given texture for each face of the cube. 

There are ways of setting differing textures to each face without doing anything with the uv attribute such as having more than one material and setting the material index values of each face by way of the groups object. However when it comes to cubes and geometry in general sooner of later I am going to want to learn more about how to mutate the uv attribute values with a little javaScript code.

There are two general ways of doing what I would like to do with cubes here. One way would be to mutate the uv attributes over time so that the locations in a single texture change. The other way would be to set up the uv attribute once so that the cube will always used fixed locations of the canvas, then use a canvas element as the texture, and update that texture as needed. In this post what I currently have is centered around the later rather than the former, but that might change with future revisions of this when and if I get to it.

<!-- more -->

---
title: UV map of a cube set up once and then draw to a canvas texture threejs example.
date: 2022-11-04 08:13:00
tags: [three.js]
layout: post
categories: three.js
id: 1012
updated: 2022-11-04 10:45:35
version: 1.1
---

I would like to start at least one if not more threejs project examples that have to do with setting up the uv map of a cube created with the THREE.BoxGeometry constructor in threejs. By default the geometry will have a uv map, it is just that it will use all of the given texture for each face of the cube. 

There are ways of setting differing textures to each face without doing anything with the uv attribute such as having more than one material and setting the material index values of each face by way of the groups object. However when it comes to cubes and geometry in general sooner of later I am going to want to learn more about how to mutate the uv attribute values with a little javaScript code.

There are two general ways of doing what I would like to do with cubes here. One way would be to mutate the uv attributes over time so that the locations in a single texture change. The other way would be to set up the uv attribute once so that the cube will always used fixed locations of the canvas, then use a canvas element as the texture, and update that texture as needed. In this post what I currently have is centered around the later rather than the former, but that might change with future revisions of this when and if I get to it.

<!-- more -->

## The cube uv threejs module example and what to know first

### This cube uv threejs module example makes use of r1 of my canvas module

### Some of the example of the cube uv module make use of r0 of my texture loader module

### Source code is up on Github

The source code for the modules as well as the examples can be found in the [for post folder for this post in my test threejs repo on Github](/https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-uvmap-cube-canvas-update). The source code for the canvas module that I am working on can also be found there in the [for post folder for my post on canvas textures](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-canvas-texture). Also the source of the [texture module that I use for some of the examples](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-texture-loader) here can be found in that repo as well.

### Version Numbers matter

The version of threejs that I was using when working on this was r146.

## 1 - The first version of my uvmap cube canvas update module

```js
```

### 1.1 - Basic example

```js

```

---
title: UV map of a cube set up once and then draw to a canvas texture threejs example.
date: 2022-11-04 08:13:00
tags: [three.js]
layout: post
categories: three.js
id: 1012
updated: 2022-11-04 11:04:14
version: 1.2
---

I would like to start at least one if not more threejs project examples that have to do with setting up the uv map of a cube created with the THREE.BoxGeometry constructor in threejs. By default the geometry will have a uv map, it is just that it will use all of the given texture for each face of the cube. 

There are ways of setting differing textures to each face without doing anything with the uv attribute such as having more than one material and setting the material index values of each face by way of the groups object. However when it comes to cubes and geometry in general sooner of later I am going to want to learn more about how to mutate the uv attribute values with a little javaScript code.

There are two general ways of doing what I would like to do with cubes here. One way would be to mutate the uv attributes over time so that the locations in a single texture change. The other way would be to set up the uv attribute once so that the cube will always used fixed locations of the canvas, then use a canvas element as the texture, and update that texture as needed. In this post what I currently have is centered around the later rather than the former, but that might change with future revisions of this when and if I get to it.

<!-- more -->

## The cube uv threejs module example and what to know first

This threejs project example is a module that will mutate the uv attribute of a box geometry made with the box geometry constructor function in the javaScript library known as threejs. On top of the cube uv module itself I am also using a few additional modules and official threejs files as well that i will not be getting into detail with in this post as well. So it goes without saying that this is not at all a post for people that are new to threejs, but rather one of my many threejs project examples in which I am starting to make some kind of involved project rather than just simple demos of various threejs features.

Although I will not be getting into detail with every little thing there is to know about before hand, I will write about at least a few things in this section. Also I will of course link to additional relevant posts where and when needed in which I will get into detail.

### This cube uv threejs module example makes use of r1 of my canvas module

A long time ago now I wrote a [blog post on canvas textures in threejs](/2018/04/17/threejs-canvas-textures/), however this is also a post that I find myself editing often. Anyway to get to the point the cube uv module that I am writing about in this post works on top of my canvas module that I write about in that post. I could have baked some code into the cube uv module alone, but I am thinking that this project will be one if not many projects in which I work on top of that module.

### Some of the example of the cube uv module make use of r0 of my texture loader module

I also wrote a [blog post on the texture loader in threejs](/2021/06/21/threejs-texture-loader/), and with some of the demos of the module I am using the canvas loader abstraction that I write about in that post. This is not as important as the canvas module, and I also have some demos in which I am just using the texture loader directly. Still it is nice to abstract some of that away to make the demos a little lighter in terms of the over all volume of code.

### This IS NOT a getting started post on the uv buffer attribute of buffer geometry.

This is not at all a [getting started post on the uv attribute of buffer geometry](/2021/06/09/threejs-buffer-geometry-attributes-uv/) that has to do with defining the offsets for areas of a texture that are to be rendered to a face of a geometry such as but not limited to a cube.

### This IS NOT a getting started post on buffer geometry in general

There is a whole lot to be aware of when it comes to [buffer geometry in general](/2021/04/22/threejs-buffer-geometry/). The main focus that is relevant here is the uv attribute, but there is also the position and normal attributes of geometry as well. On top of that there is also index and none indexed geometry, groups, and the various properye8s and methods of the Buffer geometry as well as buffer attributes classes along with way more.

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

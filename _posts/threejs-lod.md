---
title:  Level Of Detail Objects in threejs
date: 2023-05-19 08:49:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1042
updated: 2023-05-19 08:54:12
version: 1.0
---

The Level Of Detail LOD Object in threejs is an Object3d class based object that can be composed of a collection of mesh objects where each mesh object is a differing degree of detail for the same LOD Object. It is then possible to set a camera distance for each of these mesh objects that are added to the LOD object so that as an object moves away from the camera the level of detail will go down. Therefore the use of LOD objects is one way to help go about reduce the volume of work that needs to be done when rendering a frame, therefore helping to improve Frame Rate.

<!-- more -->

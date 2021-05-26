---
title: Sphere Geometry in threejs
date: 2021-05-26 11:41:00
tags: [three.js]
layout: post
categories: three.js
id: 875
updated: 2021-05-26 11:47:28
version: 1.1
---

I have wrote a number of posts on the built in geometry constructors in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) all ready, but oddly enough I never got around to writing a thing or two about the [sphere geometry constructor](https://threejs.org/docs/#api/en/geometries/SphereGeometry), and everything that centers around it. Just like any other built in geometry constructor I just call THREE.SpeherGeomerty with the new keyword and what is returned is a buffer geometry instance that will be a sphere, I can then add the geometry as the first argument to a Mesh along with a material and add it to a scene. However there is a great deal more to it than just that, with the constructor itself, and of course a great many things that branch off from it.

<!-- more -->

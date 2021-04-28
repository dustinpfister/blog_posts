---
title: The Euler Class in Threejs
date: 2021-04-28 14:31:00
tags: [three.js]
layout: post
categories: three.js
id: 855
updated: 2021-04-28 14:38:45
version: 1.1
---

In [three js](https://threejs.org/) there is the [Euler Class](https://threejs.org/docs/#api/en/math/Euler) that is the standard class in three.js that has to do with setting angles for the rotation of an object in three.js. For example the rotation property of the Object3d class is an instance of Euler, and the Object3d class is a base Class for many objects in three.js including things like a Mesh, Groups, and Cameras.

The Euler class goes hand in hand with the Vector3 Class as the Euler class has to do with angles, while Vector3 has to do with a position. A great deal of what is done in three.js has to do with moving and rotating objects around, so Vecor3 is what can be used to set a position while Euler is what one will need to use to set the orientation of the object.

<!-- more -->

---
title: Setting the position of objects in threejs
date: 2022-04-04 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 975
updated: 2022-04-04 10:54:56
version: 1.1
---

The [position property of the Object3d class in threejs](https://threejs.org/docs/index.html#api/en/core/Object3D.position) will hold an instance of the [Vector3 class](/2018/04/15/threejs-vector3/), and setting the values of this will set the position of an object on interest. Sense [the Object3d class](/2018/04/23/threejs-object3d/) is a base class of many objects in threejs such as [Mesh objects](/2018/05/04/threejs-mesh/) and [Cameras](/2018/04/06/threejs-camera/) just to name a few, once one learns how to set the position of one object that learn how to set the position of just about almost everything in threejs at least when it comes to objects. The position property of an instance of Buffer geometry is a whole other topic of concern, but many of the basic ideas are the same when it comes to the values that have to do with position.

<!-- more -->

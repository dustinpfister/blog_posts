---
title: Scale Mesh Objects, Groups, and so forth in threejs
date: 2021-05-11 09:40:00
tags: [three.js]
layout: post
categories: three.js
id: 864
updated: 2021-05-11 09:46:49
version: 1.0
---

When it comes to [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) I am trying to think in terms of what the long term plan is, but I have also found that I still need to write a post or two here and there on the basics also, and one thing that I have not got around to yet is the [scale property of the object3d class](https://threejs.org/docs/index.html#api/en/core/Object3D.scale). This scale property contains an instance of vector3 that by default will contain a value of one for each axis. As you might expect setting a fraction for one of the axis values will start to make the object based off of object3d smaller for that axis, while setting a value above one will start to make the object bigger.

<!-- more -->

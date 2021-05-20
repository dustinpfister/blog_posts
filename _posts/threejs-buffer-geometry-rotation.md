---
title: Buffer Geometry Rotation in three.js
date: 2021-05-20 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 871
updated: 2021-05-20 09:27:54
version: 1.0
---

When it comes to rotating things in three.js there is the rotation property of the object3d class that stores an instance of the Euler class. When it comes to a Mesh object that is based off of Object3d that can be used as a way to rotate the mesh as a whole. However it is also worth pointing out that the geometry of a mesh object can also be rotated independently of a mesh objects orientation also.

<!-- more -->

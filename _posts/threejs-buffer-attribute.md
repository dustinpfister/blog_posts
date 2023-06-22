---
title: Buffer Attributes in threejs
date: 2023-06-22 09:02:00
tags: [three.js]
layout: post
categories: three.js
id: 1054
updated: 2023-06-22 09:14:19
version: 1.0
---

In threejs buffer geometry objects are composed of at least one, but typically many instances of the [Buffer Attribute class](https://threejs.org/docs/#api/en/core/BufferAttribute). Each of the buffer attributes are used in the process of creating, and updating the [position of vertices](/2021/06/07/threejs-buffer-geometry-attributes-position/) in space, an [index to reuse such vertices](/2022/12/09/threejs-buffer-geometry-index/), [vertex normals](/2021/06/08/threejs-buffer-geometry-attributes-normals/), [uv mapping values](/2021/06/09/threejs-buffer-geometry-attributes-uv/), and much more actually. With that said having a solid grasp on what there is to work with, and be aware of in the buffer attribute class is necessary in order to create custom geometry, as well as update or extend, or debug problems with existing geometry.

<!-- more -->

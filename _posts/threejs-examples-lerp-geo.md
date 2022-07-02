---
title: Lerping the points of a geometry from one to another
date: 2022-07-01 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 994
updated: 2022-07-02 12:00:36
version: 1.2
---

Not to long ago I wrote a blog post on the [lerp method of the Vector3 class](/2022/05/17/threejs-vector3-lerp/) in [threejs](https://threejs.org/docs/index.html#api/en/math/Vector3). This lerp method of the Vector3 class can be used to transition the state of one vector to another by way of giving a point to transition to and an alpha value between 0 and 1 that is the magnitude to move the point. Lately I thought about using this as a way to lerp the points of a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of one geometry back and forth from one geometry to another.

So in other words I am thinking in terms of having two geometries with similar, and ideally identical count of vertcies in the position attribute. On top of having more or less the same count of vertices the order of the vertices is also of importance I have found as if that is not the case this can result in a less than desired outcome.

<!-- more -->

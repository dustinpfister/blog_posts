---
title: The Edges Geometry in threejs
date: 2021-05-31 12:01:00
tags: [three.js]
layout: post
categories: three.js
id: 878
updated: 2021-05-31 12:11:45
version: 1.3
---

The [edges geometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) is yet another useful little feature of threejs that can be a handy tool when I just want to view the edges of a geometry. I became aware of how this constructor can be useful when I took a second look into how to o about working with [wire frames when updating my post on that subject](/2019/12/19/threejs-wireframe/) in three.js. When it comes to wite frame mode that works more or less as expected, however it will work by showing all the triangles of a geometry, not just the edges of a geometry as a line, or collection of line segments. So when it comes to creating another kind of wire frame mode that is just the edges of a geometry this constructor can help with that when used with the line constructor. However I think that this constructor deserves a quick post on its own, so here it is.

<!-- more -->

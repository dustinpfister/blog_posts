---
title: Lathe Geometry in threejs
date: 2023-07-23 10:38:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1048
updated: 2023-06-07 10:47:31
version: 1.0
---

The [lathe geometry class](https://threejs.org/docs/#api/en/geometries/LatheGeometry) in threejs can be used to create a geometry using an array of 2d points that define a line that is to be repeated along an axis to form a solid shape. For example there is cretaing an array of vector2 objects that form an arc of a half circle and then using that as a way to form a sphere by passing this array of Vector2 object to the THREE.LatheGeometry constructor along with additional argumnets that define the number of segements, and a start and length phi value.

There are all kinds of 3d shapes that acn be fromed by just coming up with a new 2d path of some kind, and passing it to the lathe geometry constructor. In fact the threejs core built in [capsule geometry](/2022/07/22/threejs-capsule-geometry/) class is just an extension of the Lathe Geometry class. When it comes to making an array of vector2 objects there is just working out somes expressions and helper funcitons to create the array of THREE.Vector2 objects, or there is using a 2d curve and calling the getPoints method or some other means when working with curves.

<!-- more -->

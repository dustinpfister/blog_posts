---
title: Quadratic Bezier Curves in threejs
date: 2022-10-21 07:42:00
tags: [three.js]
layout: post
categories: three.js
id: 1010
updated: 2022-10-21 07:57:44
version: 1.0
---

In threejs there is a base [Curve class](https://threejs.org/docs/#api/en/extras/core/Curve) as well as a number of classes that work on top of this Curve Class one of which is [THREE.QuadraticBezierCurve3](https://threejs.org/docs/#api/en/extras/curves/QuadraticBezierCurve3). This [Quadratic Bezier Curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) class creates a Curve that defines a Curve between a start point and end point along with a control point that will effect the curve. This Can then be used for anything the requires a curve such as the tub geometry constrictor function. There are also base curve class methods like the two points method that will return an array of vector3 objects that can then be used to define movement over time, or create a geometry by making use of the set from points method for example.

<!-- more -->

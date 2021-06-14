---
title: Normalizing Vectors in threejs
date: 2021-06-14 12:44:00
tags: [three.js]
layout: post
categories: three.js
id: 888
updated: 2021-06-14 12:52:35
version: 1.2
---

The [Vector3 class](/2018/04/15/threejs-vector3/) in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) has many prototype methods one of which is the [Vector3 normalize](https://threejs.org/docs/#api/en/math/Vector3.normalize) method. Calling the normalize method of a Vector3 instance will preserve the direction of the vector, but it will reduce the euclidean distance of the vector to a length of one. A Vector with a euclidean distance of one is often referred to as a unit vector, and what is nice about this kind of vector is that it can esley be scaled up by just multiplying the values by a desired magnitude that is any value other than one.

<!-- more -->

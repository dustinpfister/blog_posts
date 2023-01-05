---
title: Set From Points Buffer Geometry method in threejs
date: 2023-01-05 09:20:00
tags: [three.js]
layout: post
categories: three.js
id: 1022
updated: 2023-01-05 10:14:39
version: 1.1
---

The [set from points method of the buffer geometry class in threejs](https://threejs.org/docs/#api/en/core/BufferGeometry.setFromPoints) is a way to create a new buffer geometry from an array of [vector3 class objects](/2018/04/15/threejs-vector3/). This new buffer geometry instance will just have a position attribute alone, which is okay when it comes to creating Points, or Lines, but not so much for Mesh objects. That is unless additional steps are taken to add the additional attributes that are needed to get the geometry to work well with mesh objects.

Even if one is just interested in creating a buffer geometry with a position attribute only to be used to just draw lines are points I have found that the set from points method might work okay for creating a geometry, but does not work so great as a way to update a geometry over time in a loop. If I want to not just create a geometry, but also update it over time, then I am not going to want to do so by directly working with a position attribute. And when doing so it would make sense to also just create and set the position attribute the hard way also. 

As far as I can tell, it would seem that this set from points method was added for the sake of making things easier when it comes to quickly creating a geometry from an array of points in the form of Vector3 objects. In this regard I would say that the set from points method is very easy to use. I just create an array of vector3 objects by one means or another, create a blank buffer geometry object, call the set from points method off of the buffer geometry passing the array of points as an argument and I am done. Simple enough sure, but it comes at a cost compared to doing it the hard way. Maybe the hard way of doing this can be avoided when it comes to creating the geometry to begin with, but in any case the hard way is still how it needs to happen when it comes to updating. Also the hard way of doing it is not actually that much harder, so then one might as well just do that actually. Still in this post I will be going over a few basic examples of this set from points method, before getting into more advanced examples.

<!-- more -->

---
title: Indexed Buffer Geometry in threejs
date: 2022-12-09 09:22:00
tags: [three.js]
layout: post
categories: three.js
id: 1017
updated: 2022-12-09 09:39:15
version: 1.0
---

The index property of a buffer geometry instance is a way to define an array of index values in a position attribute that will be used to draw triangles. Simply put it is a way to reuse points stored in the position attribute so that the over all length of the array in the position attribute is lower than it would otherwise have to be. The main reason why I might want to have a geometry indexed is to save memory when it comes to geometries with a lot of points in them. Also it would help to reduce the amount of overhead it would take to update geometry also a little as it is less points that have to be looped over in order to do so. 

However there are also some draw backs with this as well that have to do with the state of the normal attribute the corresponds with the position attribute for example. Also because I am reusing points any kind of effect that has to do with exploding a geometry into a hole bunch of single triangles is not possible as the points are being reused. It is not so hard to convert an index geometry to a non indexed one though, doing so involves just calling the to non indexed method of the buffer geometry class. Things might be a little involved when it comes to the other way around though as it will involve creating a buffer attribute instance and using the set index method.

<!-- more -->

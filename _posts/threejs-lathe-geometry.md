---
title: Lathe Geometry in threejs
date: 2023-07-23 10:38:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1048
updated: 2023-06-07 11:06:00
version: 1.2
---

The [lathe geometry class](https://threejs.org/docs/#api/en/geometries/LatheGeometry) in threejs can be used to create a geometry using an array of 2d points that define a line that is to be repeated along an axis to form a solid shape. For example there is creating an array of vector2 objects that form an arc of a half circle and then using that as a way to form a sphere by passing this array of Vector2 object to the THREE.LatheGeometry constructor along with additional arguments that define the number of segments, and a start and length phi value.

There are all kinds of 3d shapes that can be formed by just coming up with a new 2d path of some kind, and passing it to the lathe geometry constructor. In fact the threejs core built in [capsule geometry](/2022/07/22/threejs-capsule-geometry/) class is just an extension of the Lathe Geometry class. When it comes to making an array of vector2 objects there is just working out some expressions and helper functions to create the array of THREE.Vector2 objects, or there is using a 2d curve and calling the getPoints method or some other means when working with curves.

<!-- more -->

## Lathe Geometry and what to know first

In other to get started with lathe geometry there is a whole lot of things that you might want to read up more on before getting into it. Also in any case there might be some closely related subjects that you might want to refresh on, or at least be prepared to do so to say the least. I have all ready wrote a blog post on [getting started with threejs](/2018/04/04/threejs-getting-started/) that I come around to edit a bit often so I will assume that you have the very basics down at least. So in this section I will just touch base on a few topics that are very relevant to Lathe Geometry alone.

### Read About the Vector2 class and vectors in general

There is reading a thing or two about the [Vector2 class](https://threejs.org/docs/#api/en/math/Vector2) of threejs which is the kind of object that will be used to create all the elements of the points array that will be passed to THREE.LatheGeometry. There are a wide range of useful prototype methods to work with in this class that can be used when creating these kinds of arrays by way of some custom javaScript code rather than just using a curve alone with the getPoints method.

### There is knowing a thing or two about curves

Although what needs to be passed to the late geometry is an array of Vector2 objects that can be created by a wide range of ways. I have found that the [base curve class](/2022/06/17/threejs-curve/), and the various built in extensions of the base curve class are very useful tools for doing what I want to create a 2d path. The getPoints method of the base curve class, or the getSpacedPoints method of the [curve path class](/2023/06/01/threejs-curve-path/) can be used to quickly create an array of vector2 objects from a curve. Also if for some reason I need to do some custom spacing between points along the curve I can do so with the getPoint method of the base class. Just about all of the time the built in options for curves work just fine for what I want to do, and in the event that they do not there is cretaing a custom extension of the base curve class.

### Source code examples are up on Github

The source code examples that I am writing about for this post can also be found in [my test threejs repo up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-lathe-geometry). This is also the repo where I place the source code examples for all the [other blog posts that I have wrote on threejs](/categories/three-js) over the years.

### Version Numbers matter

When I first wrote this blog post I was using r152 of threejs.
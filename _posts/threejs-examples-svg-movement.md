---
title: Using SVG for movement of objects threejs example module
date: 2022-09-23 10:40:00
tags: [three.js]
layout: post
categories: three.js
id: 1006
updated: 2022-09-23 10:55:57
version: 1.1
---

For todays new [threejs project](/2021/02/19/threejs-examples/) example post I started a new project this week in which I am looking into using SVG as a way to create paths that can then be used to define the movement and rotation of objects in a scene. The idea cam to be while working on my blog post for the [SVG loader last week](/2022/09/16/threejs-svg-loader/) where I hit me that SVG is a prerrty cool standard for cretaing paths. There is just one little propblem which is that SVG is very much 2d, so to create a kind of 3d path with SVG I will need to think in terms of two paths for each 3d path. One path that I will be using to define motion for x and z, and then another in which I just use the y value for y in the 3d path.

If I can work out a decent enough system for creating 3d paths then they can be used as a way to update the [position property](/2022/04/04/threejs-object3d-position/) of any [object3d based object](/2018/04/23/threejs-object3d/) over time. This will mean [mesh objects](//2018/05/04/threejs-mesh/), but also any other kind of object3d based object such as a [camera](/2018/04/06/threejs-camera/). Speaking of cameras there is also using these 3d paths created from SVG to update the rotation of objects as well by using the array of Vector3 objects for values to pass to the [look at method](/2021/05/13/threejs-object3d-lookat/) of an object.

<!-- more -->


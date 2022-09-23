---
title: Using SVG for movement of objects threejs example module
date: 2022-09-23 10:40:00
tags: [three.js]
layout: post
categories: three.js
id: 1006
updated: 2022-09-23 10:47:08
version: 1.0
---

For todays new [threejs project](/2021/02/19/threejs-examples/) example post I started a new project this week in which I am looking into using SVG as a way to create paths that can then be used to define the movement and rotation of objects in a scene. The idea cam to be while working on my blog post for the SVG loader last week where I hit me that SVG is a prerrty cool standard for cretaing paths. There is just one little propblem which is that SVG is very much 2d, so to create a kind of 3d path with SVG I will need to think in terms of two paths for each 3d path. One path that I will be using to define motion for x and z, and then another in which I just use the y value for y in the 3d path.


<!-- more -->


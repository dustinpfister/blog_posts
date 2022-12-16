---
title: Using the curve class to create geometry in threejs
date: 2022-12-16 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 1018
updated: 2022-12-16 11:17:46
version: 1.0
---

The Curve class is the base class for several core threejs Clases to create a Curve in space. There is then a Cuve class prototype method called the get point method that can then be used to get any point along a curve in the form of a Vector3 object by passing a zero to one value as an argument. For the most part thus far I have been using curves as a way to define paths than can then be used to set the position of object3d objects over time such as mesh objects, and cameras. I have also been using curves to get vector3 objects that can then be passed to the look at method to set the rotation for objects also. However I have not yet got into using curves as a way to define the position attributes of custom buffer geometry which is what this post will focus on.

<!-- more -->

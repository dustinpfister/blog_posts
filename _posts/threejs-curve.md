---
title: The Curve class and tube geometry in threejs
date: 2022-06-17 14:06:00
tags: [three.js]
layout: post
categories: three.js
id: 993
updated: 2022-06-20 10:38:22
version: 1.2
---

The curve class in threejs is a way to go about creating a curve with a little javaScript logic that can then be used with the tube geometry constructor as the first argument for the function. This curve class is composed of methods that are used to define the points in 3d space that define the curve, rather than a kind of class that acts on a collection of vertex3 class instances. This might then be one of the limitations of the curve class and also the closely corresponding tube geometry constructor when it comes to the idea of that kind of class. However there might be ways of getting around that limitation, or just making use of some kind of alternative to the curve class and tube geometry.

<!-- more -->

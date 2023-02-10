---
title: Cubic Bezier Curves in threejs
date: 2023-02-10 09:37:00
tags: [three.js]
layout: post
categories: three.js
id: 1027
updated: 2023-02-10 09:45:44
version: 1.0
---

I would like to expand more on the use of curves in threejs and maybe part of doing that will involve taking another look at what there is to work with when it comes to built in options with curves. I have all ready wrote a blog post on the THREE.QuadraticBezierCurve3 class so for this post I will be writing about a few quick examples using the THREE.CubicBezierCurve3 class. Both of these options are built on top of the base Curve class of course, so in any case there are Curve class prototype methods that are very useful such as the get point method. However one thing that is nice about this Cubic Bezier Curve Class is that it will allow for two control points rather than just one. This might be one of the major reasons why I see a lot of developers choosing the Cubic option over Quadratic as this will allow for a greater degree of flexibility when creating curves for a project.

<!-- more -->

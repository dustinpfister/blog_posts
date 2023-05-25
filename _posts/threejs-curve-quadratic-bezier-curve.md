---
title: 2D Quadratic Bezier Curves in threejs
date: 2023-05-25 07:43:00
tags: [three.js]
layout: post
categories: three.js
id: 1044
updated: 2023-05-25 07:53:06
version: 1.0
---

When it comes to curves in threejs there is the base Curve class, and then there are a number of both 3D as well as 2D curve classes that extend this base curve class. In this post I will be writing about one of the 2D built in options for curves which is the Quadratic Bezier Curve class.

<!-- more -->


## The THREE.CurveQuadraticBezierCurve class in threejs and what to know first

There are a lot of things that I assume that you know a thing or two about before hand with threejs, as well as client side javaScript in general. Simply put this is not a post for people that are new to threejs as well as various other skills that are required bfore using any kind of javaScript librray for that matter. I will not be getting into every little detail that should be known before hand in this post of course. However I do always like to write about a few subjects that you might want to read about more.

### Be sure to get solid with the base Curve class if you have not done so

The 2D Quadratic Bezier Curves is just one built in curve class that extends the base Curve class in threejs. So with that said it makes snese to learn at least a little abput what there is to work with when it comes to the [base Curve class](/2022/06/17/threejs-curve/) in threejs.
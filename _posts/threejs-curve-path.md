---
title: Curve Paths in threejs
date: 2023-06-01 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 1045
updated: 2023-06-01 10:52:43
version: 1.0
---

There are a number of built in options for extensions of the base curve class of threejs such as CubicBezierCurve3 just to name one. There is also creating ones own curve classes by extending the base curve class as well. These curves can then be used for all sorts of various tasks such as moving an object along the curve, having an object face a point of reference along the curve, creating and updating custom geometries and so forth. So they are great for all kinds of various situations however there is also the idea of having a whole bunch of these curve objects form a single kind of logical curve, and with that this is where curve paths come into play.

<!-- more -->

---
title: threejs wrap module example for wrapping rather than clamping values
date: 2022-09-09 09:21:00
tags: [three.js]
layout: post
categories: three.js
id: 1004
updated: 2022-09-09 09:31:45
version: 1.0
---

The [vector3 class](/2018/04/15/threejs-vector3/) in threejs has a [clamp method](/2021/06/16/threejs-vector3-clamp/) that will clamp a vector3 instance to a given min and max vector range that forms a box area of sorts. On top of this clamp method there is also a clamp length method that will do the same as the clamp method only with respect to the vectors unit length so it will clamp the vector to a sphere like area. In addition to that of the clamp methods in the vector3 class there is also a clamp method in the Math Utils object as well, but I am not seeing any wrap methods in the Vector3 class.

There are two general ways of going about treating bounderies one of which is to clamp them so that it is just not possible to continue out of a desired bounds, the other way though is to wrap them so that the value wraps around to an oposite side. I have [wrote a post on the wraping of the Vector3 class recently](/2022/09/02/threejs-vector3/wrap/), but I thought that I should continue with this and make a more refined wrap module as a [threejs example project](/2021/02/19/threejs-examples/).

<!-- more -->

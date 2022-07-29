---
title: An advanced Lerping module threejs example
date: 2022-07-29 08:37:00
tags: [three.js]
layout: post
categories: three.js
id: 998
updated: 2022-07-29 08:51:44
version: 1.1
---

A while back I wrote a [blog post on the lerp method](/2022/05/17/threejs-vector3-lerp/) of the [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3.lerp) in the javaScript library known as [threejs](https://en.wikipedia.org/wiki/Three.js). The lerp method can be used to move a vector from one state to another given state in the form of another instance of the vector3, and an alpha value as a number between 0 and 1. This method alone works well, when it comes to simple linear lerping. In other words moving a vector from one point to another in the from of a kind of straight line between the two points of interest. Also when doing the typical index over length value as a way to create an alpha value the rate at which the point moves does so in a fixed, single delta value. These limitations then give rise in an interest to find, or develop some kind of advanced lerping module that builds on top of the vector3 method.

<!-- more -->

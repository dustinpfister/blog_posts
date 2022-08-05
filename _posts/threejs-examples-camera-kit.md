---
title: Camera Kit module threejs example
date: 2022-08-05 08:32:00
tags: [three.js]
layout: post
categories: three.js
id: 999
updated: 2022-08-05 08:44:52
version: 1.0
---

This week I started a new [threejs project example](/2021/02/19/threejs-examples/) that I am calling camera kit, that aims to be my module for parking all kinds of methods that has to do with updaing the position and target location of a [camera such as a persepective](/2018/04/07/threejs-camera-perspective/) camera. The idea for this project came to me when woking on [last weeks threejs example which was my aplerp module](/2022/07/29/threejs-examples-aplerp/) which is a project that has to do with cretaing values to use for the alpha argument of the [lerp method of the vector3 class](/2022/05/17/threejs-vector3-lerp/). The aplerp module has to do with moving a point in space from one point to another in a way that is not so linear, that is not a fixed delta for each frame when upading a vector. So for this project I will be building on top of the aplerp module to create another module that is centered around tasks that have to do with updating a camera.


<!-- more -->

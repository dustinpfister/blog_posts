---
title: Layers in threejs
date: 2021-06-04 10:21:00
tags: [three.js]
layout: post
categories: three.js
id: 882
updated: 2021-06-04 10:24:22
version: 1.0
---

There are a number of ways to have control over visibility in threejs such as with this visible property of the obejct3d class or just simple not adding an object to a scene object, or having more than one scene object, so forth and so on. This post however will be on making use of the layers property of an object3d instance as a way to go about setting objects to different layers. It is then possible to set what layers a camera should draw and then use this as a way to have control over visibility.

<!-- more -->

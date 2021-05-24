---
title: Making objects visible or not in three.js
date: 2021-05-24 12:31:00
tags: [three.js]
layout: post
categories: three.js
id: 873
updated: 2021-05-24 12:40:05
version: 1.1
---

There should be standard way to go about making an object in three.js visible or not just like that of the visible and display css properties when it comes to styling some html. It would seem that there is such a standard property which would be the visible property of the Object3d class in threejs, this property is a boolean value that is set to true by default and is used as a way to inform a renderer if the given mesh should even be rendered or not. However it is true there there are also a number of other subjects of interest such as setting the transparency property of materials, and moving mesh objects from one group that is added to a scene to another group that is not. So in this post I will of course be going over the object3d visible property, but I will also be going over a number of other related topics an code examples so that might also be better ways of getting a desired result when it comes to the visibility of an object in three.js.

<!-- more -->

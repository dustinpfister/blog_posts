---
title: Getting world position of any object in three.js
date: 2021-05-25 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 874
updated: 2021-05-25 12:02:41
version: 1.3
---

In [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is getting into using groups as a way to compartmentalize a collection of mesh objects, and when doing so there is using the look at method to get a mesh to look at another child object of the group, or some other group. When doing so it is important to remember that the look at method will always case the object to look at something relative to world space, and not that position retaliative to the group. To help with these kinds of problems there is the [get world position method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition) that when called will return the position of an object relative to world space, rather than the position property of the object which is a position relative to the group rather than world space.
Knowing the difference between world space and space that is relative to a group, or any object that is based off of Object3d is one of the many little details that one should get familiar with at one point or another when it comes to making projects with three.js. So in this post I will be going over a few examples of this sort of thing when it comes to world space and group space in three.js.


<!-- more -->

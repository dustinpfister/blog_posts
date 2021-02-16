---
title: Custom User Data for a Mesh in three.js
date: 2021-02-16 16:20:00
tags: [three.js]
layout: post
categories: three.js
id: 804
updated: 2021-02-16 16:26:48
version: 1.0
---

In [threejs](https://threejs.org/) there is a standard way of adding custom user data for a mash object which is the [user data object](https://threejs.org/docs/#api/en/core/Object3D.userData). The user data object is actually a property of the [object32 class](/2018/04/23/threejs-object32/) which is a class to which a mesh, and many other objects in three.js inherit from.

It is a good idea to place any data that has to do with the applaction in this user data object as that will help to make sure that I do so in a safe way. Many frameworks have some kind of data object that is part of an instnace of some kind of class as a way to park data that I want to have assigned to a given object like a display object, sprite, or in threejs a mesh.

So in the post I will be going over a simple examppe of the user data property of the object3d class.

<!-- more -->

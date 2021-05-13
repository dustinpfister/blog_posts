---
title: The Look At method in three.js
date: 2021-05-13 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 866
updated: 2021-05-13 13:47:19
version: 1.2
---

I thought that I knew everything I needed to know about the [object3d class look at](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), but it turns out that there is a little more to it at least when it comes to some things that branch off from the method. Using the look at method is fairly straight forward I just call the method off of some kind of object in three.js that is based off of the object3d class and then pass an instance of Vector3 or a set of numbers that ether way is a position to look at, and the result is that the object ends up looking at that point in space. However things might not always work the way that I might expect it to, and one reason why is because the look at method will always get an object to look at something that is called world space. This world space is not relative to a group object, or even the scene object also as that is also an instance of object3d that can have its position changed.

<!-- more -->

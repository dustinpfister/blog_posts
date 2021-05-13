---
title: The Look At method in three.js
date: 2021-05-13 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 866
updated: 2021-05-13 13:56:45
version: 1.6
---

I thought that I knew everything I needed to know about the [object3d class look at](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), but it turns out that there is a little more to it at least when it comes to some things that branch off from the method. Using the look at method is fairly straight forward I just call the method off of some kind of object in three.js that is based off of the object3d class and then pass an instance of Vector3 or a set of numbers that ether way is a position to look at, and the result is that the object ends up looking at that point in space. However things might not always work the way that I might expect it to, and one reason why is because the look at method will always get an object to look at something that is called world space. This world space is not relative to a group object, or even the scene object also as that is also an instance of object3d that can have its position changed.

To some extent this is not really a problem as I typically do want to always look at a point relative to world space. However ofter I might end up making some kind of group of mesh objects and I want to have a mesh object look at another mesh object in this group, so in that case I want to look at something relative to the position of the group, not the world. In these kinds of situations I can still use the look at method, it is just that I will need to adjust for the fact that the look at method is relative to world space.

<!-- more -->

## 1 - The look at method in three.js, and what to know first

The look at method in three.js is a prototype method of the Object3d class in a javaScript library known as three.js. I assume that you have some background when it comes to the very basics of getting started with three.js and client side javaScript in general. If not you might want to take a step back for a moment before getting into some more advanced topics when it comes to groups, and having the look at method look at a mesh relative to the group rather than world space. I will not be covering the very basics of three.js in general here, but I will be going over some additional things that you should know first in this section.

### 1.1 - version numbers matter with three.js

When I first wrote this post I was using three.js version r127.

### 1.2 - Read up more on the object3d class and other related topics if you have not done so

The look at method is just one method of the object3d base class, there is a great deal more about the class that is also worth looking into more.
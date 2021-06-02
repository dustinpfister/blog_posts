---
title: Getting parent of an object in threejs
date: 2021-06-01 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 880
updated: 2021-06-02 12:46:49
version: 1.1
---

I have been taking a second long look at everything there is to work with in the object3d class in threejs, and it turns out that there is still a great deal more to the class that I still feel as though I need to get solid with. One such property of the object3d class is the parent property of an object3d instance which is something that can come in handy now and then just like that of the children property. That is where the children property might be a collection of other objects that are descendant of an object, the parent property is well the parent of the current object.

For example say I am looping over all the objects of a scene object and for each mesh object I want to take a look at what the parent object of the mesh object is. Say that in the scene there may be some mesh objects that are part of a group and the user data object of the group may have some data that I will want to use when applying some changes to the mesh object. There are a range of other use case situations where I will want to get at the parent object, such as when working with raycasting and groups of objects.

<!-- more -->

---
title: Making objects visible or not in three.js
date: 2021-05-24 12:31:00
tags: [three.js]
layout: post
categories: three.js
id: 873
updated: 2021-05-24 12:44:49
version: 1.2
---

There should be standard way to go about making an object in three.js visible or not just like that of the visible and display css properties when it comes to styling some html. It would seem that there is such a standard property which would be the visible property of the Object3d class in threejs, this property is a boolean value that is set to true by default and is used as a way to inform a renderer if the given mesh should even be rendered or not. However it is true there there are also a number of other subjects of interest such as setting the transparency property of materials, and moving mesh objects from one group that is added to a scene to another group that is not. So in this post I will of course be going over the object3d visible property, but I will also be going over a number of other related topics an code examples so that might also be better ways of getting a desired result when it comes to the visibility of an object in three.js.

<!-- more -->

## 1 - Visibility of objects in threejs and what to get solid first

This is a post on three.js and how to go about making objects in a scene visible or not. I will not be getting into the very basic of three.js here I assume that you have gone beyond a basic getting started type example when it co es to working with the library at this point, and are not just interested in learning a few things about how to go about setting visibly of objects in a scene. I will be trying to keep many of these examples simple and to the point so that they might still not be that far beyond people that are new to three.js. However there are maybe still a few things that you should be aware of, or refresh on before continuing reading this post. So in this section I will be going over these things.
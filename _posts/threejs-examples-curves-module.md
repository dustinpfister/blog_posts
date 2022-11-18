---
title: Curves Module threejs project example
date: 2022-11-18 07:48:00
tags: [three.js]
layout: post
categories: three.js
id: 1014
updated: 2022-11-18 08:13:38
version: 1.2
---

The [THREE.Curve base class](/2022/06/17/threejs-curve/) can be used as a way to create custom curve constructor functions, but one might need to even bother with that as there are a number of great built in curve constructor functions as well. In any case Curve objects, regardless if they are custom , or built in, are a great way to go about defining paths in 3d space. I am sure that they may also be useful for many other things in threejs such as creating the position attributes of geometry, but for now I am mainly focused on using curves to define paths that can be used to define the movement of objects over time.

In any case I will want to make a [threejs project example](/2021/02/19/threejs-examples/) that is a javaScript module that contains tools to help me do various typical things that I want to do with curves in threejs. This module will have a number of tools that will help me to create Cuves, as well as arrays of vector3 objects using curves. I also have a number of methods that I can use to create what are often called alpha values as well using curves, as well as a number of other methods that can be used to debug what is going on with these sort of things. So in this post I will be writing about the source code of my current standing curves module as well as a number of demos that make us of this module.

<!-- more -->

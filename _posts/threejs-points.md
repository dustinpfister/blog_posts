---
title: Points in threejs
date: 2023-02-23 08:44:00
tags: [three.js]
layout: post
categories: three.js
id: 1029
updated: 2023-02-23 08:51:33
version: 1.0
---

When it comes to adding content to a scene for the most part one will want to make use of Mesh objects, and with that geometry and materials that work with such objects. However when it comes to first starting out learning how to make custom geometry, and for other various reasons one might want to make use of an alternative such as THREE.Points. The THREE.Points class is a way to create a content object with a geometry that can just have a position attribute and nothing else. The position attribute is the first and foremost attribute that one will want to work out when making a custom geometry as it is the actual points in space. So often I might start out using THREE.Points when making a custom geometry when starting out. Once I have the position attribute worked out well I can then move on to working out the various other attributes that will get the geometry to work well with Mesh Objects.

There are a number of other reasons why one might want to use the THREE.Points class. One thing that I find myself using it for all the time is to get a visual idea of what is going on with the state of a Curve Path for example. In any case in this post I will be writing about a general overview of the THREE.Points class, and while I am at it write about a lot of other things that will come up in the process such as position attributes of buffer geometry objects.

<!-- more -->

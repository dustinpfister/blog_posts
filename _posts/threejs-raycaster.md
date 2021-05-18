---
title: Clicking a mesh in three.js with the Raycaster class
date: 2021-05-18 09:46:00
tags: [three.js]
layout: post
categories: three.js
id: 869
updated: 2021-05-18 09:51:14
version: 1.0
---

When making a three.js project there might be situations in which it would be nice to have a way to click on a mesh object in a scene. When dong so this will result in some kind of action being preformed that is even driven. To do this I need a way to cast a ray from the camera outward based on a 2d location of the canvas, and then get a collection of mesh objects that intersect with this ray that is going from the camera outward. Luckily this kind of functionality is built into three.js itself and it is called the RayCaster Class.

<!-- more -->

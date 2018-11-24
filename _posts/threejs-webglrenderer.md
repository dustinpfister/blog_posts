---
title: The webGL renderer in three.js
date: 2018-04-06 11:14:00
tags: [js,three.js]
layout: post
categories: three.js
id: 335
updated: 2018-11-24 13:14:16
version: 1.0
---

There are a few core components to making a [three.js](https://threejs.org/), there needs to be a scene, at least one mesh to look at that is composed of a geometry, and a material. There also needs to be a camera to set the point in space by which to look at the mesh in the scene as well, however there is still one final other component that is needed as well and that is a render. In older versions of three.js there was both a 2d canvas and webgl renderer but in later versions it has been removed, and now when making a three.js project I am pretty much always working with the webgl renderer. As such this post will serve as a general overview of the webgl renderer, I will not get into every little detail here, but I will link to other relevant posts when it is called for.

<!-- more -->

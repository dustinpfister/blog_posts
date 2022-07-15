---
title: THREEJS Looping land animation using the Object grid wrap module
date: 2022-07-25 08:55:00
tags: [three.js]
layout: post
categories: three.js
id: 996
updated: 2022-07-15 09:11:50
version: 1.1
---

This week I took another look at my [object grid wrap module threejs example](/2022/05/20/threejs-examples-object-grid-wrap/) that I made a while ago, and when doing so I made some revised versions of that source code. While I was at it I thought I would start a new project that will be another javaScript file in which I am building on top of this object grid wrap module that is a way to create a grid with a collection of mesh objects that looks like some land in terms of terrain at least. When it comes to using this object grid wrap module I need to define a collection of source objects to clone for each grid location, so for this threejs example I am just cretaing a module that in part creates this collection of objects that incude mesh objects with built in [box geometry](/2021/04/26/threejs-box-geometry/) as well as [exterude geoeries using shapes](/2021/06/01/threejs-shape/).

<!-- more -->

---
title: Compute Vertex Normals for Buffer Geometry in threejs
date: 2022-04-22 10:22:00
tags: [three.js]
layout: post
categories: three.js
id: 980
updated: 2022-04-22 10:26:56
version: 1.0
---

The process of creating a custom geometry, or mutating a built in geometry in threejs might be a little involved, but still there is only so much to be aware of to get started. The first step might be to work out the positions attribute which is the values for the actual points in space. However after that when it is also a good idea to work out what the deal should be with the normals attribute. In some cases I might have to work this out manually, however in most cases just calling the compute vertex normals method will work just fine, which is what this post is about today.


<!-- more -->


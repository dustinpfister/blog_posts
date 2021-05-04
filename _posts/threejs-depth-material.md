---
title: The Depth Material in threejs
date: 2021-05-04 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 859
updated: 2021-05-04 13:29:20
version: 1.2
---

The depth material in [threejs](https://threejs.org/) is a material that shows depth of a mesh object, it s based on the near and far values of a camera and of course the distance of that camera from the mesh. So in this post I thought I would write about a few examples about this kind of material, and in the process of doing so I think I will be touching base on some things that have to do with cameras also. For example there is adjusting the near and far values of a camera as a way to change how the depth material looks and when doing so a method needs to be called each time to update the projection matrix.

<!-- more -->

---
title: The Depth Material in threejs
date: 2021-05-04 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 859
updated: 2021-05-04 13:32:26
version: 1.4
---

The depth material in [threejs](https://threejs.org/) is a material that shows depth of a mesh object, it s based on the near and far values of a camera and of course the distance of that camera from the mesh. So in this post I thought I would write about a few examples about this kind of material, and in the process of doing so I think I will be touching base on some things that have to do with cameras also. For example there is adjusting the near and far values of a camera as a way to change how the depth material looks and when doing so a method needs to be called each time to update the projection matrix.

<!-- more -->

## 1 - The Depth Material and what to know first

This is a post on the depth material in three.js, as such I expect for you to at least understand the basics of creating a three.js project. If not there is looking into one or more getting started type posts on three.js, and also maybe javaScript in general.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js, always be aware of what version of three.js is being used in an example code braking changes are introduced with three.js often.
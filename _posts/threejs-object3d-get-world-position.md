---
title: Getting world position of any object in three.js
date: 2021-05-25 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 874
updated: 2021-05-25 11:50:22
version: 1.1
---

In threejs there is getting into using groups as a way to compartmentalize a collection of mesh objects, and when doing so there is using the look at method to get a mesh to look at another child object of the group, or some other group. When doing so it is important to remember that the look at method will always case the object to look at something relative to world space, and not that position retaliative to the group. To help with these kinds of problems there is the get world position method of the object3d class that when called will return the position of an object relative to world space, rather than the position property of the object which is a position relative to the group rather than world space.

<!-- more -->

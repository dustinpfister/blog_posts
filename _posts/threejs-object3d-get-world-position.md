---
title: Getting world position of any object in three.js
date: 2021-05-25 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 874
updated: 2021-05-25 11:48:27
version: 1.0
---

In threejs there is getting into using groups as a way to comptanmetize a collection of mesh objects, and when doing so there is using the look at method to get a mesh to look at another child object of the group, or some other group. When doing so it is imporanet to remember that the look at method will always case the object to look at something relative to world space, and not that position reltaive to the group.

<!-- more -->

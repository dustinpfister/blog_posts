---
title: Mutating a point in a sphere with threejs
date: 2021-06-10 14:19:00
tags: [three.js]
layout: post
categories: three.js
id: 886
updated: 2021-06-10 14:27:51
version: 1.2
---

This week I was learning more about how to work with a buffer geometry in threejs when it comes to the various attributes that make up such a feature in threejs. There is the position attribute in the geometry which is the attribute that holds the current positions of all the points in the geometry for example. So I think it might be a good idea to wrap this week up with a few simple examples that have to do with mutating the position attributes of built in geometry constructors. one such constructor to work with when it comes to this is the sphere geometry constructor which is just one of many kinds of built in geometry constructors where it might prove to be an interesting learning experience to work out some methods that have to do with changing the geometry a little.

In this post then I will be going over my first quick example that has to do with a helper method that changes the position of a point on a sphere. The process of doing so is not always so easy as there is not just one point that needs to move but all points of all triangles at that point in space actually. So this might prove to be the kind of example that I might come back to now and then in order to find new ways to go about doing this.

<!-- more -->

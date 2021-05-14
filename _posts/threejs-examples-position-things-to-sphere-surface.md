---
title: Position Other Mesh Objects onto the surface of a Sphere Three.js example
date: 2021-05-13 14:40:00
tags: [three.js]
layout: post
categories: three.js
id: 867
updated: 2021-05-14 13:17:23
version: 1.2
---

I still have some more writing when it comes to all the various little methods and classes to worth with in three.js, but I am getting to the point where it is time to start thinking in terms of some actual projects of some kind, so I started  writing some posts about basic threejs project examples. Today I think I will write about another basic project idea and this time it is a simple module for creating a group that contains one Mesh that is a sphere, and then another groups that is a collection of groups that contain a mesh that will be positioned and rotated so that the child of the group is positioned over the surface of the sphere.

I am sure that there are a number of ways of going about doing this sort of thing, but the example that I worked out that I will be writing about here involves rotating a group, and then just changing the position of a child of this group as a way to go about doing this. In any case the general idea that I have in mind here is to actually have some kind of 2d coordinate system when it comes to latitude and longitude type values. That is that i just want to have a way to position a mesh object onto the surface of a sphere by way of just setting two values that will determine the position of the sphere on the surface.

<!-- more -->

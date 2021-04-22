---
title: The Buffer Geometry Constructor in threejs
date: 2021-04-22 16:11:00
tags: [three.js]
layout: post
categories: three.js
id: 851
updated: 2021-04-22 16:18:29
version: 1.2
---

As of revision 125 pf [threejs](https://threejs.org/) The Geometry Constructor has been removed which will result in code breaking changes for a whole Internet of threejs example. So this week I have been editing old posts, and writing some new ones on threejs, and I have noticed that I have not wrote a post on the buffer geometry constructor just yet. I have wrote one on the old Geometry Constructor that I preferred to use in many of my examples, but now that the constructor is no more I am going to need to learn how to just use the Buffer Geometry Constructor when it comes to making my own geometries.

The basic example of a buffer Geometry in the three.js documentation works okay as a starting point, but it does not cover every little detail when it comes to what I should be aware of when making a custom geometry. So in this post I will be going over the basic examples that I have worked out thus far when it comes to just working with some very simple starting points with a custom geometry using the buffer geometry constructor rather than the plain old geometry constructor.

<!-- more -->

---
title: The Points material in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2018-05-12 11:02:01
version: 1.0
---

The use of Vector3 class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. Everything that will be placed in a Scene will contain at least a few points in space made with Vector3, typically combined with a collection of Face3 instances to help compose a geometry representing some kind of solid geometric object. However what if you just want to work with a collection of vectors, and have some kind of way of just displaying some points in space? For this there is the Points constructor that can be used with the Special Points Material that is put in place just for this purpose.

<!-- more -->

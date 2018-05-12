---
title: The Points material in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2018-05-12 11:54:52
version: 1.1
---

The use of [Vector3](/2018/04/15/threejs-vector3/) class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. Everything that will be placed in a [Scene](/2018/05/03/threejs-scene/) will contain at least a few points in space made with Vector3, typically combined with a collection of [Face3](/2018/05/11/threejs-face3/) instances to help compose a [geometry](/2018/04/14/threejs-geometry/) representing some kind of solid geometric object. However what if you just want to work with a collection of vectors, and have some kind of way of just displaying some points in space? For this there is the Points constructor that can be used with the Special Points Material that is put in place just for this purpose.

<!-- more -->

## What to know before getting started

This is a post on three.js, a javaScript library that is used to work with 3d space. It is not a getting stared post on three.js, or javaScript in general. If you are new to three.js you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. Also in this post I will not be getting into detail on every other little thing about three.js, but I do have [many other posts](/categories/three-js/) on this subject.

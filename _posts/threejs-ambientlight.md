---
title: Setting some ambient light in three.js
date: 2018-11-02 20:04:00
tags: [js,three.js]
layout: post
categories: three.js
id: 319
updated: 2018-11-02 20:21:34
version: 1.3
---

When making a [three.js](https://threejs.org/) project, and working with materials that respond to light such as the standard material it might be desirable to add some [ambient light](https://threejs.org/docs/index.html#api/en/lights/AmbientLight) to a scene. Ambient Light differs from other light sources in that it will evenly illuminate materials even;y from all directions. This is very different from spot lights or point lights that radiant out light from a certain point in space and only illuminate surfaces that strike the surfaces that they come in contact with.
<!-- more -->

## 1 - What to know

This is a post on adding ambient light to a three.js project. This is not a getting started post on three.js or javaScript in general, but being aware of ambient light is just one of several options when it comes to adding a light source to a three.js project, so it is something that one should at least be aware of.

---
title: Setting some ambient light in three.js
date: 2018-11-02 20:04:00
tags: [js,three.js]
layout: post
categories: three.js
id: 319
updated: 2018-11-02 20:19:04
version: 1.2
---

When making a [three.js](https://threejs.org/) project, and working with materials that respond to light such as the standard material it might be desirable to add some ambient light to a scene. Ambient Light differs from other light sources in that it will evenly illuminate materials even;y from all directions. This is very different from spot lights or point lights that radiant out light from a certain point in space and only illuminate surfaces that strike the surfaces that they come in contact with.
<!-- more -->

## 1 - What to know

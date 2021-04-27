---
title: The Standard Material in Threejs
date: 2021-04-27 15:25:00S
tags: [three.js]
layout: post
categories: three.js
id: 854
updated: 2021-04-27 15:34:33
version: 1.2
---

A log time ago I wrote a post on the [basic material](/2018/05/05/threejs-basic-material/) in [three js](https://threejs.org/), but oddly enough I never got around to writing a post on the [standard material](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) in threejs. When it comes to materials in threejs the basic material is a nice starting point, and in some examples and projects in which I am not doing anything with light it might even get the job done just fine. However when it comes to working with everything that three.js has to offer when it comes to light sources, and the various kinds of texture maps the standard material is maybe one of the best options to go with.

There are some additional materials that might be worth mentioning as contenders when it comes to a great general use case material in three.js such as the Lambert material. The nice thing about the lamber material is that it might eat up a little less overhead compared to the standard material. However over all the standard material seems to work fine on the systems that I test on, and also it might prove to reproduce more realistic lighting compared to the lamber material.

<!-- more -->

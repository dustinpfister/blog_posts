---
title: The Phong material in three.js
date: 2022-12-29 08:27:00
tags: [three.js]
layout: post
categories: three.js
id: 1020
updated: 2022-12-29 08:40:48
version: 1.0
---

The [Phong material](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) is one of many built in material options in the core of the threejs JavaScript library. What stands out with this material is the support for specular highlights which can be adjusted by way of the shininess option. Although the material is called Phong it actually uses the [Blinn–Phong reflection model](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) rather than a pure [Phong Reflection model](https://en.wikipedia.org/wiki/Phong_reflection_model). If real time performance is of concern then Phong might prove to be a better choice than that of the standard material, and also I have found that I still like to use Phong over the standard material when it comes to just how things simply look regardless of performance also.


<!-- more -->

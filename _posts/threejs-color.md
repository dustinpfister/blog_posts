---
title: Color in threejs
date: 2021-05-03 12:32:00
tags: [three.js]
layout: post
categories: three.js
id: 858
updated: 2021-05-03 12:40:14
version: 1.3
---

When it comes ton[threejs](https://threejs.org/) it looks like I never got around to writing a quick post about some examples of the [THREE.Color](https://threejs.org/docs/#api/en/math/Color) constructor. This constructor can be used to create a class object instance that represents a specific color. When it comes to color in three.js there are a number of places here and there where I might want to use this constructor to create a color. Such as setting the background color, a fog color, and the plain color and emissive colors of a material. So in this post I will be going over a number of typical use case examples of the THREE.Color constructor, and will also likely touch base on a number of other topics while in the process of doing so.

<!-- more -->

## 1 - THREE.Color and what to know first

This is a post on the THREE.Color constructor in three.js that is used to create an object that represents a certain color. This is not a post on the basics of getting started with three.js, and client side javaScript in general, so I assume that you have at least some background, and just want to learn more about color in three.js.
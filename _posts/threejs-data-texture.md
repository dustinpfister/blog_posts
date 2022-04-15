---
title: Creating textures with raw data in threejs
date: 2022-04-15 12:56:00
tags: [three.js]
layout: post
categories: three.js
id: 978
updated: 2022-04-15 13:03:48
version: 1.1
---

I have wrote a number of posts on the use of canvas elements, and also a post on using canvas elements as a way to create textures for mesh objects in threejs. However there is another built in way to create textures with javaScript code other than making use of canvas elements, and this option is [data textures](https://threejs.org/docs/#api/en/textures/DataTexture).

When it comes to using data textures as a way to create textures with javaScrript code in threejs I just need to know how to produce the texture that I want in terms of a Unit8Array with a set of four values for each color channel. That is that I need to create an array with integer values between and including the range of 0 to 255 for red, green, blue and alpha color channels for each pixel.

<!-- more -->

---
title: Merge geometry and more with Buffer Geometry utilities in threejs
date: 2023-08-31 13:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1069
updated: 2023-09-01 14:41:48
version: 1.1
---

There is the core threejs library itself and then there is a whole lot of additional tools to work with as well that can be pulled from the threejs Gitbub repository. One of the manly assets that there are to make use of there is the [buffer geometry utilities module](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils). This module is packed with a wide range of utility methods that are bot backed into the buffer geometry class itself, but might still prove to be useful for many various cases. One method that I have used thus far is the merge Geometries method which as the name suggests is just simply a way to create a single geometry from an array of geometry objects. There are of course a whole lot of other tools in this module a such a I have started this blog post as a way to park some notes on this subject.


<!-- more -->

## Buffer Geometry Utils and what to know first

In this post I am writing about some features that have to do with the buffer geometry utilities module which is one of many additional JavaScript modules that can be found in the Github repository of the JavaScript library. So then this is not just on threejs itself, but an additional file that must be added on top of threejs alone. I also assume that you have a lot of background with the basics of threejs and client side JavaScript in general as well. If not sorry I can not cover every little detail that should be known before hand here. However I will write about a few things that you might want to look into more in this opening section if you have not done so before hand.

### Source examples can also be found in my test threejs github

I also keep copies of the examples I write about here in the [corresponding folder that I have in my test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-utils). This repo is also where I park the source code examples that I have wrote on all the [other posts that I have wrote on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this post I was using [r152 of threejs, and with that I was following the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) that I have set for myself for that revision number. This also means that I am using the module format of threejs itself, and also when it comes to the additional buffer geometry utils as well. If you are using an older version of threejs you might be able to fine plain old javaScript mime type script tag friendly forms of the buffer geometry utils module, but that depends on how old. The js folder in the examples folder of the threejs repo was removed in r148. So if you are using r148+ you will need to use module type script tags.


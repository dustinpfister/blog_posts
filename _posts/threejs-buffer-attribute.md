---
title: Buffer Attributes in threejs
date: 2023-06-22 09:02:00
tags: [three.js]
layout: post
categories: three.js
id: 1054
updated: 2023-06-22 10:03:16
version: 1.1
---

In threejs buffer geometry objects are composed of at least one, but typically many instances of the [Buffer Attribute class](https://threejs.org/docs/#api/en/core/BufferAttribute). Each of the buffer attributes are used in the process of creating, and updating the [position of vertices](/2021/06/07/threejs-buffer-geometry-attributes-position/) in space, an [index to reuse such vertices](/2022/12/09/threejs-buffer-geometry-index/), [vertex normals](/2021/06/08/threejs-buffer-geometry-attributes-normals/), [uv mapping values](/2021/06/09/threejs-buffer-geometry-attributes-uv/), and much more actually. With that said having a solid grasp on what there is to work with, and be aware of in the buffer attribute class is necessary in order to create custom geometry, as well as update or extend, or debug problems with existing geometry.

<!-- more -->

## Buffer attribute objects and what to know first

This is a blog post on the subject of buffer attribute objects which is one of the kind of nested objects that one will find in an instance of buffer geometry when working with the javaScript library known as threejs. This is then not a post for people that are new to threejs, or client side javaScript in general. I will then not be getting into every little detail that you should know before hand in this post, however I do use these opening sections of my posts to write about a few closely related topics that you might want to read more about.

### Buffer Geometry Objects

As I have mentioned a few times now at this point, buffer attribute objects can be found in buffer geometry objects. These buffer attributes objects store the state of a geometry in the form of arrays of data for things like the points in space to begin with, and also just about everything else. Although I will be writing about a lot of examples that have to do with geometry here, this is still not a post that serves as an over all review of [buffer geometry in general as I have all ready wrote a blog post](/2021/04/22/threejs-buffer-geometry/) when it comes to that.

### Source code is up on Github

The source code examples that I write about in this blog post can also be [found in my test threejs repository](/https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-attribute) on Github. This is also the location where I place all the source code examples for the many other [blog posts that I have wrote on threejs](/categories/three-js/) as well.

### Be Aware of Version Numbers

When I first wrote this blog post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md).


## 1 - Basic Examples of Buffer Attribute Objects.

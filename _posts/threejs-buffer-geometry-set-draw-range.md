---
title: The set draw range method of the buffer geometry class in threejs
date: 2023-05-12 13:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1040
updated: 2023-05-12 14:10:34
version: 1.0
---

In the buffer geometry class of threejs there is a [set draw range method](https://threejs.org/docs/#api/en/core/BufferGeometry.setDrawRange) that will change the state of the draw range object of a buffer geometry index. This can be done by calling the method and then passing a start argument along with a count after that. The numbers given should be terms of vertices, or indices depeding if the geometry is indexed or non indexed. With that said there is not just calling this method and passing some values but also being aware of some other aspects of a buffer geometry object. Mainly the position attribiute, and also the index if it has one.

This will then just be a quick blog post on this set draw range method as well as a few other buffer geometry related topics while I am at it.

<!-- more -->

## The Set Draw range method of the buffer geometry class and what to know first

In this post I am wriitng about some javaScript code examples that work on top of the librray known as threejs that make use of a single method of interset in the buffer geometry class known as the set draw range method. As always it should go without saying but this is not a post for people that are [new to threejs](/2018/04/04/threejs-getting-started/) as well as other related skills, mainly client side javaScript. Also even if you have some expwernce with these topcis there are a number of things that you might want to read up on before hand as well, so in this opening seciton I will take a moment to outline what thoese things are.

### There is reading more on the buffer geometry class in general

There is my main blog post on the buffer geometry class that might be a good read for learning a thing or two about the buffer geomerty class in general. There are also a number of other posts of intereset that are relavent to the content of this post such as the one on the position attribuite, and also the index of a buffer geomerty as well. If a geometry has an index then the values that I want to pass to the set draw raneg method should be in terms of the state of the index, otehrwise I want to think more in terms of the count of the position attribute.

### Source code is also up on Github

The Source code exmaples that I write about here can also be found on my [test threejs Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-set-draw-range) repo. This is also where I park the source code examples for the [other blog posts](/categories/three-js/) that I have wrote over the years.


## 1 - Some basic exmaples of the set draw range method

### 1.1 - Working with an indexed geometry

```js
```

### 1.2 - Working with a non indexed geometry

```js
```

## 2 - An Animaiton loop example

```js
```
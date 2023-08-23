---
title: Sprite Objects, and 2d overlays in threejs
date: 2023-08-23 11:26:00
tags: [three.js]
layout: post
categories: three.js
id: 1068
updated: 2023-08-23 11:56:12
version: 1.0
---

There are [Sprite objects](https://threejs.org/docs/#api/en/objects/Sprite) in threejs that are a special kind of Object3d class based object that is a simple 2d image that always faces the camera. These kinds of objects will then come into play with certain kinds of tasks in which they might be called for such as making a 2d overlay, or making the lowest resource heavy kind of state of an object when working out Level Of Detail objects. These kinds of objects will not work with the usual mesh materials, as such there is a special kind of material that needs to be used called just simply the sprite material. There are then a lot of little features to be aware of when it comes to using these objects, and with that the material that is used with them. So I thought I would start at least one post on this subject to write about a few things that I have worked out thus far on the topic of sprite objects in threejs.

<!-- more -->

## Sprite Objects and what to know first

This is  a post in which I am writing about a few source code demos that I have worked out that have to do with sprite objects in the javaScript library known as threejs. I assume that you know at least [a thing or two about threejs](/2018/04/04/threejs-getting-started/), and with that additional skills that are needed when it comes to client side web development in general. As always I will not be getting into every little detail that you shroud know before hand here. However I will write a few things that are closely related to the use of sprite objects to which you might want to read up a bit more on before counting to read the rest of this content.

### Texture Objects and ways to obtain them

In order to do what most people will typically want to do with sprite objects one will need a texture to use with the map option of the sprite material. With that said there is looking into the common [texture class](/2023/06/27/threejs-texture/) a bit more to know how to create these kinds of objects directly and with that also all kinds of features of the base texture class. However there is also the question of how to get, or create, the image data to use with these kinds of objects. With that said there is looking into the [texture loader](/2021/06/21/threejs-texture-loader/), as well as ways to create textures by way of some javaScript code such as with [data textures](/2022/04/15/threejs-data-texture/), and [canvas textures](/2018/04/17/threejs-canvas-texture/).

### Know a thing or two about materials

Although there is only one material option of concern with sprite objects which is the sprite material, there is still a lot to be aware of when it comes to [materials in general](/2018/04/30/threejs-materials/). There is not just what there is to make use of in the sprite material, but also a great deal in the common base material class from which the sprite material extends from.

### There is also the common Object3d class

A sprite object is an example of an object that extends from the [object3d class](/2018/04/23/threejs-object3d/). Other examples of this kind of object include mesh, line, point, group, lights, cameras, various helper objects, and even whole scene objects. The point that I am driving at here is that there is a lot to be aware of when it comes to the common object3d class from which all of these objects, including sprites, extend from.

### Other ways of doing a 2d overlay

Sprite objects are a great way to go about doing a 2d overlay, and maybe more often then not it is the way that it should be done. There are however a number of other ways to do something to that effect that might also work okay, or even work better for a specific use case. The other two general ways of having a 2d overlay including having a collection of canvas elements, and making use of plan geometry with mesh objects.

When it comes to using mesh objects with plane geometry I went so far as to start one of my [threejs project examples around this subject](/2023/03/10/threejs-examples-camera-planes/).

### Source is up on Github also

The source code examples that I am writing about in this post can also be [found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-sprite). This is also where I have the source code exhales for all my [other blog posts on threejs](/categories/three-js) as well.

### Version Numbers Matter

When I first wrote this blog post I was using [r152 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md).







---
title: Textures in threejs
date: 2023-06-27 08:24:00
tags: [three.js]
layout: post
categories: three.js
id: 1055
updated: 2023-06-27 11:19:19
version: 1.2
---

The [texture class in threejs](https://threejs.org/docs/#api/en/textures/Texture) is a way to go about creating the kind of object that is used for the various map options of materials. There are a number of ways to create this kind of object, such using the texture loader, or creating an image with javaScript code by way of canvas of data textures. In any case there are a lot of little details that one will need to be aware of when it comes to what there is to work with when it comes to th texture class alone. Also things can end up branching off into a wide range of other topics while we are at it when it comes to texture in general when it comes to how textures are used with mesh materials, backgrounds, and so forth.

<!-- more -->

## Textures and what to know first

This will be a blog post on the texture class in threejs, and while I am at it I will also have to at least touch base on some closely related topics as well. I will not be getting into detail with various course skills that you should all ready have solid before hand here when it comes to the [basics of threejs](/2018/04/04/threejs-getting-started/). However in any case I do like to always use these opening sections to wrote about a few subjects that you might want to read up on also if you have not done so before hand.

### There are also UV attributes, material index values, and various buffer geometry topics 

When it comes to really getting into how to work with textures the process of doing so is not just with the texture, but also how to work with some details with the geometry that is used as well. For example there is the [UV attribute of buffer geometry objects](/2021/06/09/threejs-buffer-geometry-attributes-uv) that is an attribute of geometry that contains offset values that are used in the process of mapping a 2d image of a texture object to a 3d object in terms of buffer geometry, a mesh material and an overlapping mesh object.

Another feature of geometry to be aware of that is relevant to the use of textures is the [groups array of buffer geometry](/2018/05/14/threejs-mesh-material-index/) objects. This will come into play when using an array of materials, each of which might have there own texture.

### There is also knowing a thing or two about materials

There is a whole lot of [ground to cover when it comes to materials](/2018/04/30/threejs-materials/) that I will not be getting into here of course. When using textures there are certain materials such as the normal, and depth materials to which the various map options of interest are just not supported at all. Also depending on things like adding light or not the various map options will change from one material to the next. A good starting material option would be the [basic material](/2018/05/05/threejs-basic-material/), and just sticking with the map option of that material. Once the basics of textures are solid it is just a material of knowing what map is for what and which needs to change with the state of the texture used for it.
### Source code examples are up on Github

I also have the source code examples that I am writing about here up on [my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-texture). This is also the place on Github where I park the source code examples that I have made for my [many other blog posts on threejs](/categories/three-js/) that I have wrote thus far.

### Version Numbers matter

When I first wrote this blog post I was [using r152](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) for the source code examples of the post.


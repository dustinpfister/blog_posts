---
title: The tangent attribute of buffer geometry and normal maps in threejs
date: 2023-08-17 04:30:00
tags: [three.js]
layout: post
categories: three.js
id: 1067
updated: 2023-08-17 05:15:34
version: 1.0
---

The tangents attribute of [buffer geometry objects in threejs] can be added to a geometry by calling the compute tangents method of a geometry object instance. I have been piecing together some things as to what this is for, and thus far it would seem that this is something that will come into play when making use of normal maps as a way to address a problem that will come up for indexed geometry. You see when making use of an index to reuse points in the position attribute this will result in also only having as many vertex normals as there are position attribute points. This issue can then result in an typically undesired outcome with shading with materials that use light sources, or materials like the normal material. So then there are two general ways of addressing this, one of which is to not use an index, then other is to use a normal map. So with that said in order to use this normal map I will likely want to have a tangent attribute.

In this post then I will be going over what it is that I have together thus far in terms of demos that have to do with the subject of these tangent attributes, and with that everything that goes along with it, which thus far would seem to be to make use of the normal map option of various mesh material options.

<!-- more -->

## Tangent attributes of buffer geometry objects and what to know first

This is then a blog post on the subject of tangent attributes in buffer geometry objects in the JavaScript library known as threejs. It should then go without saying that this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/) as well as the various underlying skills that are required to even get started with that to begin with. There are a lot of things that you should know about before hand then, much of which I will not be getting into detail with here. However I will still write a few quick things that you might want to read about more before continuing with the rest of this content.

### There is the normal map option, and the various other options of mesh materials

Thus far it would seem that the use of tangent attributes will come into play when working out [normal maps](/2021/06/24/threejs-normal-map/) to be used with one of the mesh materials. Speaking of which there is my [main blog post on materials in general](/2018/04/30/threejs-materials/) that you might want to check out if you want to learn more about materials in general. However for the sake of staying on topic, there is just using the [mesh normal material](/2021/06/23/threejs-normal-material/) as that supports the features that I want in order to make use of a normal map and with that the tangent attribute of a geometry.

### Buffer Geometry objects have a lot more going on

I assume that you all ready know a fair amount about [buffer geometry objects](/2021/04/22/threejs-buffer-geometry/) in general, if not you might want to read up more on this subject then. There is first knowing what the deal is with position, normal, and uv attributes as well as the index that is used to reuse points in the position attribute.

### Source code is on Github

The source code examples that I have made for this post can be found in the [folder that corresponds to this post in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-attributes-tangent) on Github. With that said there is also a folder for each of the [other posts that I have wrote on threejs](/categories/three-js/) thus far on this website as well.

### Version Numbers Matter

The revision number that I was using for the demos in this post was [r152, and thus followed the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) I have set for that revision. 

## Conclusion



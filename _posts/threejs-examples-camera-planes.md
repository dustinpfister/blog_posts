---
title: Camera Planes module threejs example
date: 2023-03-10 08:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1031
updated: 2023-03-10 09:16:09
version: 1.3
---

When working on various threejs projects I have thought that it would be nice to have a way to just simply have a simple 2d layer to display debug info, or when making a final product to just use for any and all overlays that have to do with simple messages and so forth. Anyway of course, as always there is more than one way to go about doing something like this. One way would be to just have an HTML Collection of canvas elements, some of which are the DOM element properties of a threejs renderer, and others are just plane old 2d drawing content canvas elements. That is all fine and good, and maybe that is how I will need to go about doing things with certain projects. However for this [threejs project example](/2021/02/19/threejs-examples/) I am thinking more in terms of just going with a single canvas element that is the DOM element of a WebGL renderer, and making use of mesh objects, plane geometry, and various camera properties to just position, rotate, and scale such mesh objects so they are just in front of a camera at all times.


<!-- more -->

## The Camera Planes module threejs example and what to know first

This is a blog post on a project example that works on top of the javaScript library known as threejs. I assume that you have all ready broke ground when it comes to the very basics of threejs, and also know a thing or two about client side javaScript in general, as well as at least a little bit about certain back end javaScript topics. If not then the content of this post might prove to be a little too advanced for you and getting into all of that would be outside the scope of this post. I have all ready wrote [getting started type posts on threejs](/2018/04/04/threejs-examples-camera-planes/), and these various other topics a long time ago at this point. However in this section I will write about at least a few things that you might want to read up more on before reading the rest of this post.

### Read more on the base camera class, and the perspective camera.

There is the base camera class, and also the perspective camera that extends that base camera class. There are a lot of other options when it comes to cameras, but for the most I stick with the perspective camera with most projects.

### Check out plane geometry, mesh objects, and the object3d class

### Source code is up on Github

### Version Numbers matter

When I first wrote this post I was using r146 of threejs.

## 1 - The first version oif the camera planes module, and some demos


### 1.a - The camera planes module ( R0 - r146 style - IIFE format )

```js
```

### 1.1 - Basic demo createing a cmaera planes with default options

```js
```

### 1.2 - Layers demo with custom effect

```js
```


## Conclusion


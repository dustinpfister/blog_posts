---
title: Cameras in three.js
date: 2018-04-06 11:14:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 168
updated: 2019-12-17 10:52:43
version: 1.9
---

If you want to make a [three.js](https://threejs.org/) project you are going to want to know a thing or two about how to go about working with cameras. A Camera must be created with one of several constructor options, once an instance of a camera is obtained it does not need to be added to the scene, but it must be used with a render method in order to view anything in a scene.

In three.js there are a few cameras to work with, but typically you will want to work with a perspective camera most of the time. This post is about the camera class that is shared across all cameras, and can be thought of as a kind of home base for all content on cameras in three.js content on my site here at github pages.

<!-- more -->

## 1 - The Camera Class

The actual [Camera Class](https://threejs.org/docs/index.html#api/cameras/Camera) is the base Class for all camera used in three.js. This class just gives a few properties and methods for doing things like cloning the camera. I never use is directly, but it is the base class for all cameras in threejs.

## 2 - Camera Class Inherits from Object3D

All instances of Camera gain a whole bunch of common properties and methods from Object3D. This allows for me to easily work with the camera by using methods like lookAt.

## 3 - Perspective Camera

read full post on [perspective Camera](/2018/04/07/threejs-camera-perspective/)

The most commonly used camera might be the perspective camera, and if you are only going to stick with one, it might be a good idea to make it this one. The perspective camera mimics the way that the human eye actually sees, and often that is what is desired.

## 4 - Orthographic camera

Another option when it comes to cameras that I might actually use in a project is the [orthographic camera](/2018/05/17/threejs-camera-orthographic/).

## 5 - Conclusion

Sorry that this post is a little thin, I might expand on it more though as I make more demos on three.js.
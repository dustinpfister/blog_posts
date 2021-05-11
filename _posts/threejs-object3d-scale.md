---
title: Scale Mesh Objects, Groups, and so forth in threejs
date: 2021-05-11 09:40:00
tags: [three.js]
layout: post
categories: three.js
id: 864
updated: 2021-05-11 09:58:52
version: 1.4
---

When it comes to [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) I am trying to think in terms of what the long term plan is, but I have also found that I still need to write a post or two here and there on the basics also, and one thing that I have not got around to yet is the [scale property of the object3d class](https://threejs.org/docs/index.html#api/en/core/Object3D.scale). This scale property contains an instance of vector3 that by default will contain a value of one for each axis. As you might expect setting a fraction for one of the axis values will start to make the object based off of object3d smaller for that axis, while setting a value above one will start to make the object bigger.
This then will be a post on using the scale property of the Object3d class that is a base class of Mesh objects, and many other such objects in three.js. In the process of doing so I will end up also writing about many other three.js, and javaScript related topics.

<!-- more -->

## 1 - The Object3d scale property and what to know first

I trust that you have covered the basics at least when it comes to getting up and running with three.js and javaScript, as i will not be getting into detail with that here. This post is intended for people that have at least some background with javaScript, and have worked out at least a few simple examples of three.js for starters. I will be keeping the examples here fairly simple, at least at the top of the post, but there are still some basic things you should know about before continuing to read this.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using revision 127 of three.js

### 1.2 Read up more on Object3d in general if you have not done so

If you are still relatively new to threejs, and have not done so before hand, it would be a good idea to [learn more about the object3d class in detail](/2018/04/23/threejs-object3d/) beyond just that of the scale property. In this post I am just going to be focusing on a few examples that just have to do with this one little property of this base class, but there is much more to know about it in general. The Object3d class is a base class for Mesh objects in three.js, but it is also a base class for many other major classes in he library also such as Camera, Group, and even Scene.


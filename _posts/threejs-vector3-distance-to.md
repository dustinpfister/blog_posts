---
title: Distance from one point to another in threejs
date: 2021-06-15 12:05:00
tags: [three.js]
layout: post
categories: three.js
id: 889
updated: 2021-06-15 13:13:11
version: 1.8
---

When it comes to points or Vectors if you prefer in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is the question of how to get the distance between two points in space. In the Vector3 class there is the [distance to method](https://threejs.org/docs/#api/en/math/Vector3.distanceTo) that can be used as a built in way to go about getting the distance between two points in vector space. So in todays post I will be looking into some simple examples of using this methods in threejs projects.

This post will not just be about the distance to method of course though, I will be touching base on a whole bunch of other methods to work with in the Vector3 class, as well as a whole bunch of other aspects of the threejs library.

<!-- more -->

## 1 - The Vector3 distance to method and what to knwo first

This is a post on the distance to method of the Vector3 class in the client side javaScript library known as three.js. The subject here then is on one specific method of one specific class in a single javaScript library, so then this is not a [getting started post with threejs](/2018/04/04/threejs-getting-started/) let along client side javaScript in general. I will not be getting into every little detail about the library and language here, but I usual write a section like this for every post on threejs where I outline a few things you might want to read up more on before continuing to read the rest of this post.

### 1.1 - Read up more on the Vector3 class in general

The distance to method is just one method of interest in the vector3 class to work with, there are a number of other useful methods when it comes to working with these kinds of class instances. So it would be a good idea to look into the [THREE.Vector3 class in greater detail](/2018/04/15/threejs-vector3/) at some point sooner or later in order to gain a better understanding of everything there is to work with when it comes to the Vector3 class.

### 1.2 - Know the basics of Object3d, and the position property specifically

Another Major class to work with in threejs is the [obejct3d class](/2018/04/23/threejs-object3d/), and when it comes to working with the Vector3 class it is mainly the position property of anything based off of object3d that is of interest. One major use case example of the distance to method is to use it as a way to get the distance between two mesh objects. So then to do so I would want to call the distance to method off of the Vector3 instance of the position property of the Mesh, and then pass the position property of the other mesh as the argument for the method. There is a lot to be aware of when it comes to working with Mesh objects, but what there is to know about Object3d applies to Mesh objects, as well as all kinds of other objects that are based off of object3d.

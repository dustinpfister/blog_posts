---
title: Apply Euler angles to a Vector3 in threejs
date: 2021-06-18 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 892
updated: 2021-06-18 09:28:26
version: 1.1
---

When it comes to moving and rotating objects around in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are two general classed that come to mind [THREE.Vector3](https://threejs.org/docs/#api/en/math/Vector3), and [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler). The Vector3 class has to do with creating an object that represents a Vector in Vector space, and as such the Vector3 class is great for working with a set of numbers that have to do with a specific position in space. 

However a Vector can also be though of as a way to go about having a direction in space when it comes to the distance of the vector from the origin. In fact Vectors are often descried as being a direction and a magnitude, that is a normalized set of values between 0 and one for each axis that is then raised to what is often called a euclidean distance from the origin. There is another way of thinking about this though, such as having angels using the Euler class and using that as a way to set the position, or direction and magnitude of a Vector if you prefer.

<!-- more -->

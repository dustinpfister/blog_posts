---
title: The Clock constructor in threejs
date: 2021-05-28 10:33:00
tags: [three.js]
layout: post
categories: three.js
id: 877
updated: 2021-05-28 10:39:56
version: 1.0
---

When it comes to making an animation loop in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) I have been using the built in JavaScript Date class along with request animation frame, but have not been making use of the Built in [THREE.Clock](https://threejs.org/docs/#api/en/core/Clock) constructor. Turns out that there are still a whole lot of basic features that I have not got around to looking into with three.js when it comes to this constructor and why it might be a good idea to go with this in place of the way that I have been making animation loops thus far. Still better late than never, so in this post I will be looking into the THREE.Clock constructor and also touching base on some client side javaScript features that are closely related to the class such as the [performance global](https://developer.mozilla.org/en-US/docs/Web/API/Performance) mainly the [now method](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) of that.

<!-- more -->

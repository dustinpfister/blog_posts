---
title: Animation Loop Framework threejs project example
date: 2022-09-30 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 1007
updated: 2022-09-30 11:58:41
version: 1.0
---

The subject of creating an animaiton loop is somehting that will come up a lot, not just with threejs alone, but indeed with client side javaScript in general. When it comes to client side javaScript alone there are methods like that of setTimeout, as well as request animation frame. There are also a number of addtional features that are realted to this sort of thing in client side javaScript, but also in the threejs librray such as the [THREE.Clock class](https://threejs.org/docs/#api/en/core/Clock), and thus also [ performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now), and Date.now that the class works on top of. However in todays post I am going to be writing a thing or two about a new javaScript module project that is a kind of framework that builds on top of the core idea of an animation loop.

This is then yet another [threejs example project](/2021/02/19/threejs-examples/) to add on top of the many others that I may continue to work on a bit more off and on in the future. I have a genreal idea of what I would like this project to be in terms of the core set of ideas. That is to have the ushual code that I keep copying and pasing from one project to the next, abstracted away into a module, or framework kind of from which I would say is the case here with this project. That is that with this module I call a main create method and pass an object that contains a method that can be called to set up the scene, camera, and so forth, and then another that will update things over time.

<!-- more -->



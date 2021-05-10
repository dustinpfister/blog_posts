---
title: Nested Groups threejs example
date: 2021-05-10 15:03:00
tags: [three.js]
layout: post
categories: three.js
id: 863
updated: 2021-05-10 15:09:46
version: 1.1
---

This will be a post on a nested groups [threejs example](/2021/02/19/threejs-examples/) that I made today that is a continuation of what I started with my post on use example of the user data object in the object3d class. The user data object of the Object3d class is a standard object for everything based on object3d for parking application or module specific data to help make sure that there are no conflicts with properties that are used with three.js. When making my own code for an over all three.js project I am going to end up with a log of my own properties and javaScript code that updates those properties. I could do something where I keep all of my own code separate, and then apply that to mesh objects, groups, cameras and so forth. However another way of attaching my own user data to anything in three.js that is based off of the object3d class would be to append it to this user data object.

<!-- more -->


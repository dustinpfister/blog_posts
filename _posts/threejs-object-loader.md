---
title: The Object Loader in threejs
date: 2023-07-19 13:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1061
updated: 2023-07-19 13:56:17
version: 1.0
---

The Object Loader in threejs is a loader option that is built into the core of the library itself that can be used to load JSON files that follow the object format. Many other loaders for object formats must be added to threejs by making use of an additional add on file beyond just threejs itself so this alone is one reason why one might be interested in the format. However another nice thing about it is that it is also easy to work with when it comes to creating this kind of json data as just simply calling the toJSON method of the object that I want to convert will create the data in an object format, and then I can just pass that to the JSON.stringify method.

<!-- more -->

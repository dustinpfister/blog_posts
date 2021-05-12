---
title: Get an Object by name not id in three.js
date: 2021-05-12 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 865
updated: 2021-05-12 11:49:46
version: 1.0
---

When it comes to getting a reference to a mesh object in three.js things are not the same as what I have become accustomed to when it comes to working with the Document Object Model. When it comes to html elements there is setting an id to an element, and then having the option to get a reference to that element by id later in a body of javaScript code. When it comes to the Object3d class in three.js there is an id property of each object3d instance, however I have found that this is something that I should not mess around with when it comes to setting my own id strings for mesh objects, groups, cameras and anything based off of object3d. There is another property of Object3d that I can set to what I want, and that is the name property of the Object3d class. There is then the get object by name method of the object3d class that I can then use as a way to get an object in three.js that has a set name for it.

<!-- more -->

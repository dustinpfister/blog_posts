---
title: Get an Object by name not id in three.js
date: 2021-05-12 11:44:00
tags: [three.js]
layout: post
categories: three.js
id: 865
updated: 2021-05-12 12:00:34
version: 1.2
---

When it comes to getting a reference to a mesh object in three.js things are not the same as what I have become accustomed to when it comes to working with the Document Object Model. When it comes to html elements there is setting an id to an element, and then having the option to get a reference to that element by id later in a body of javaScript code. When it comes to the Object3d class in three.js there is an id property of each object3d instance, however I have found that this is something that I should not mess around with when it comes to setting my own id strings for mesh objects, groups, cameras and anything based off of object3d. There is another property of Object3d that I can set to what I want, and that is the name property of the Object3d class. There is then the get object by name method of the object3d class that I can then use as a way to get an object in three.js that has a set name for it.

<!-- more -->

## 1 - Object3d name property, and learning the basics first

This is a post on the name property of the object3d class in three.js that is an empty string by default, but can be used to set a unique value that will act as a way to get a reference to the object at a later point in a body of javaScript code. This is an advanced post on three.js where I am just writing about one little property and some corresponding prototype method in the object3d class. I will not be getting into detail about the object3d class and everything that it is based off of in this post. It should also go without saying that I will not be getting into the basics of creating a three.js project in general also, and assume that you have at least some background working with this javaScript library.

### - 1.1 Version Numbers are a big deal with three.js

When I wrote this post I was using three.js revision r127 of three.js which was a late version of three.js at the time that I first wrote this post in May of 2021. In the future code breaking changes might be made that will case these code examples to no longer work, and such changes might happen sooner rather than later as three.js is a project that is moving fairly fast when it comes to development.
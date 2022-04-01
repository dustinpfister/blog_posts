---
title: The type property of Objects in threejs
date: 2022-04-01 11:46:00
tags: [three.js]
layout: post
categories: three.js
id: 974
updated: 2022-04-01 11:53:14
version: 1.0
---

One major part of learning how to use threejs is to get a solid grasp on what there is to work with in the object3d class. There is not just the base object3d class itself, but also a whole lot of other objects that are based off of the object 3d class. So once one gets an idea as to what the position property of the Object3d class is all about for example, they can also apply that same understanding to Mesh objects, Groups, Cameras and even a whole Scene object of the feel inclined to do so.

So then becuase there are all these diferant kinds of objects in threejs that are all based off of three.js there should be some kind of standard way of finding out what kind of object that I am working with. As with any other kind of class in threejs there is of course using something like the instanceof operator to find out if I am dealing with a given class of object or not. However there is also a type property of all these various types of objects that can also be used as a way to find out what type of object I am dealing with when looping over objects in a scene.

Speaking of looping over objects in a scene there is also the children property of objects, as well as things like the add method of these objects. Array prototype methods like that of the array forach method can be used with the children arrays of these objects, but there are other threejs built in options to work with such as the traverse method that can also be used to loop over the full contents of an object and the children of the object.

<!-- more -->

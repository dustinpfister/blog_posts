---
title: Getting world position of any object in three.js
date: 2021-05-25 11:45:00
tags: [three.js]
layout: post
categories: three.js
id: 874
updated: 2021-05-25 12:16:20
version: 1.8
---

In [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is getting into using groups as a way to compartmentalize a collection of mesh objects, and when doing so there is using the look at method to get a mesh to look at another child object of the group, or some other group. When doing so it is important to remember that the look at method will always case the object to look at something relative to world space, and not that position retaliative to the group. To help with these kinds of problems there is the [get world position method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition) that when called will return the position of an object relative to world space, rather than the position property of the object which is a position relative to the group rather than world space.

Knowing the difference between world space and space that is relative to a group, or any object that is based off of Object3d is one of the many little details that one should get familiar with at one point or another when it comes to making projects with three.js. So in this post I will be going over a few examples of this sort of thing when it comes to world space and group space in three.js.


<!-- more -->

## 1 - Getting world position in threejs and what to know first

In this post I will be writing about the [get world position method in the object3d base class](https://stackoverflow.com/questions/15098479/how-to-get-the-global-world-position-of-a-child-object) in the javaScript library known as three.js. So the content here has to do with just one little issue in an over all larger library that is written in a specific programing language called javaScript. I assume that you have at least some basic working knowledge of how to get up and running with the basics at least, because I am not going to do that here in this post. However I always like to start off my three.js posts with a section like this in which I outline some things that you should be aware of before continuing to read the rest of the content.

### 1.1 - version numbers matter in three.js

When I first wrote this post I was using revision 127 of threejs which was a late version of threejs as of April of 2021. When it comes to just the get world position method of the object3d class I do not think much has changed over the years, however a great deal has changed throughout the library. Code breaking changes are introduced to three.js all the time so if the code examples are not working as expected always check your version numbers first.

### 1.2 - Read my more on the look at method of object3d and what it has to do with world space

### 1.3 - learn a thing or two about groups and object3d in general beyond just this post

## 2 - Basic group example

```js
var createGroup = function () {
    // creating a group
    var group = new THREE.Group();
    // creating and adding a pointer mesh to the group
    var geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
    geo.rotateX(Math.PI * 0.5);
    var pointer = group.userData.pointer = new THREE.Mesh(
            geo,
            new THREE.MeshNormalMaterial());
    pointer.position.set(0, 0, 0);
    pointer.rotation.y = 1.57; // BY DEFAULT THE POINTER IS NOT POINTING AT THE CUBE
    group.add(pointer);
    // creating and adding a cube
    var cube = group.userData.cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.set(0, 0, 4);
    group.add(cube);
    // box helper for the group
    group.add(new THREE.BoxHelper(group));
    return group;
};
 
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
 
var group = createGroup(); // group 1
scene.add(group);
group.position.set(-2.0, 0, -2.0);
var group2 = createGroup(); // group2
scene.add(group2);
group2.position.set(2.0, 0, -2.0);
 
// the first group in am just using the look at method, and passing
// the value of the cube.position instance of vector3. THIS RESULTS IN THE
// CONE NOT POINTING AT THE CUBE, but at the location of the cube if it where
// positioned relative to world space rather than a location relative to the group
group.userData.pointer.lookAt(group.userData.cube.position);
 
// IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
// THAT IS A CHILD OF THE GROUP, THEN I WILL WANT TO ADJUST
// FOR THAT FOR THIS THERE IS THE getWorldPosition Method
group2.userData.pointer.lookAt(group2.userData.cube.getWorldPosition());
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Conclusion

The get world position method of the object3d class seems to work well for the sake of having a way to go about getting an instance of Vector3 that is relative to a fixed static world space rather than a parent instance of object3d such as a group, or even a scene.

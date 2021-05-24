---
title: Making objects visible or not in three.js
date: 2021-05-24 12:31:00
tags: [three.js]
layout: post
categories: three.js
id: 873
updated: 2021-05-24 13:08:38
version: 1.10
---

There should be standard way to go about making an object in [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) visible or not just like that of the visible and display css properties when it comes to styling some html. It would seem that there is such a standard property which would be the visible property of the Object3d class in threejs, this property is a boolean value that is set to true by default and is used as a way to inform a renderer if the given mesh should even be rendered or not. However it is true there there are also a number of other subjects of interest such as setting the transparency property of materials, and moving mesh objects from one group that is added to a scene to another group that is not. So in this post I will of course be going over the object3d visible property, but I will also be going over a number of other related topics an code examples so that might also be better ways of getting a desired result when it comes to the visibility of an object in three.js.

<!-- more -->

## 1 - Visibility of objects in threejs and what to get solid first

This is a post on three.js and how to go about making objects in a scene visible or not. I will not be getting into the very basic of three.js here I assume that you have gone beyond a basic getting started type example when it co es to working with the library at this point, and are not just interested in learning a few things about how to go about setting visibly of objects in a scene. I will be trying to keep many of these examples simple and to the point so that they might still not be that far beyond people that are new to three.js. However there are maybe still a few things that you should be aware of, or refresh on before continuing reading this post. So in this section I will be going over these things.

### 1.1 - Version Numbers matter in three.js

When I wrote this post and made the examples for it I was using threejs version r127, which was still a fairly late version of threejs at the time of this writing. I have found that I just need to mentioning what versions I was suing when writing a post on three.js, and that doing so is impotent more so than many other libraries that move a little slower when it comes to development.

### 1.2 - Might want to read up more on Object3d in general

One way to go about making a mesh object visible or not is to just set the visible property of the mesh to false and be done with it. This visible property is not a property of a Mesh object though but the base class of mesh which is object3d. There are a great number of other features in object3d and other classes in three.js that are based off of object3d such as groups. 

It is not like using the visible property is the only way to go about doing this sort of thing and just using the visible property may fall short. For example by just setting the visible property of a mesh in a group to false that will make it so it will not be visible, but it will still be in the group, and as such will still be subject to any kind of update procedure. So maybe a better way would be to have two groups one added to the scene and one not added to it and just move mesh objects between the two as a way to achieve a similar effect to that of using the visible property. In order to do so I would want to use a number of other features in the object3d class when it comes to adding and removing mesh objects from a parent object such as a group. 

In this post I will be going over some examples that have a lot to do with object3d and how to use features of the class to make objects visible or not. However this object3d class is worth spending a fair about of time to work with just to get a fell for what there is to work with when using this class. So you might want to check out [my main post on object3d](/2018/04/23/threejs-object3d/) that might prove to be a good resource for learning more about this class in general.

### 1.3 - There are also properties of materials that might be of interest

There is a lot to be said about the object3d class and how that can be used to make it so objects will or will not show up in a scene. However there is also maybe a thing or two to be said about the materials that are used to skin mesh objects that are based off of object3d also. Many materials will support a transparency boolean that when set will apply a transparency effect for the material, and opacity property can then be set form 0 to 1 to set the level of transparency for the material.

## 2 - Making a mesh visible or not with the Object3d.visible property

```js
var scene = new THREE.Scene();
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
box.visible = false;
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
fps = 2;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.visible = !box.visible;
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```
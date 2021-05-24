---
title: Making objects visible or not in three.js
date: 2021-05-24 12:31:00
tags: [three.js]
layout: post
categories: three.js
id: 873
updated: 2021-05-24 14:27:57
version: 1.21
---

There should be standard way to go about making an object in [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) visible or not just like that of the visible and display css properties when it comes to styling some html. It would seem that there is such a standard property which would be the [visible property of the Object3d class](https://threejs.org/docs/#api/en/core/Object3D.visible) in threejs, this property is a boolean value that is set to true by default and is used as a way to inform a renderer if the given mesh should even be rendered or not. However it is true there there are also a number of other subjects of interest such as setting the transparency property of materials, and moving mesh objects from one group that is added to a scene to another group that is not. So in this post I will of course be going over the object3d visible property, but I will also be going over a number of other related topics an code examples so that might also be better ways of getting a desired result when it comes to the visibility of an object in three.js.

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

The first and foremost feature in three.js that comes to mind when it comes to making an object visible or not would be to just set the visible boolean of the object to false. This might prove to be one of the most easy ways to go about doing this, so it would make sense to start out with a basic example of just using the visible boolean. Here then I have an example where I am just creating a single mesh object, setting the visible boolean value to false, and then adding the mesh to the scene. I then have a simple loop where I am toggling the boolean value of the visible property between true and false a set number of times per second.

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

That is it more or less when it comes to just using the visible boolean, sure the conditions that are used to set the value of the property might change up a little now and then. However if I just simple want to set the visibly of an object to false without having to do something like removing a reference from one group and placing it into a pool or sorts, or setting the position of the mesh to a distance far away from the camera or something to that effect this will work.

## 3 - There is just moving an object out of range of the camera

The visibility property of an object is one way to make it so an object is not visible, however there are of course many ways to go about getting a similar result. One of which would be to just move the object out of range of the render distance of the camera that is being used with the render method of the renderer that I am using. The typically camera that I often use for an example is the perspective camera and with the kind of camera there is the near and var values of the camera that I can set via arguments when calling the constructor of the perspective camera. If I then just simply move a mesh object to a location where the object is just to near, or to far away from the camera, then the object will not render.

```js
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
 
// some values
var near = 8.25,
far = 20,
maxDist = 10;
 
// CREATING CAMERA WITH NEAR AND FAR VALUES
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 8.25, far);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(box);
 
var lt = new Date(),
frame = 0,
maxFrame = 240,
fps = 15;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // CHANGING POSITION OF BOX SO THAT IT GOES IN ANY OUT OF THE RENDER RANGE OF THE CAMERA
        var dist = maxDist - (maxDist * 2) * bias;
        box.position.x = dist * -1;
        box.position.z = dist * -1;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

In this example I am just simply using the position property of a mesh object to move that mesh object into and out of range of a camera as a way to make the mesh visible and not visible by just making use of the near and far value of the camera as a means to do so. There is also the ides of not moving the mesh object, but moving the camera back and forth as a way to change the visibility of the mesh object. There is also yet even another way to go about doing so which would involve adjusting the near and far values of the camera and keep the camera and mesh in fixed locations. When doing so I need to call the update projection matrix method of the camera to do so.

## 4 - Removing a child from the scene, or a group that was added to the scene

Maybe another important thing to keep in mind is that a mesh object will not render in a scene, if it is not part of that scene. There is creating a mesh object and not adding it to a scene object that is passed to the render method, and when doing so the mesh will of course not render because it is not in that scene. So there is creating a reference to a mesh object, and then adding and removing that mesh object to and from the scene as needed.

```js
var scene = new THREE.Scene();
// Creating and adding the box to the scene
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
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
        // ADDING AND REMOVING CHILD
        var child = scene.getObjectById(box.id);
        if (child) {
            scene.remove(box);
        } else {
            scene.add(box);
        }
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

## 5 - Conclusion

So I hope that this post help to clear up some things when it comes to setting the visibly of on object in three.js. If not then I guess you will just need to work out some additional examples of your own, and keep looking until you find or make something that will work for you. However just about every solution that comes to mind for me will be ways that just change the visibility of an object and that is all, or something that changes other properties of the object, makes the object a child of some other parent object that is not added to the scene, or removing the object completely.

---
title: The Depth Material in threejs
date: 2021-05-04 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 859
updated: 2021-05-04 14:27:37
version: 1.22
---

The [depth material](https://threejs.org/docs/#api/en/materials/MeshDepthMaterial) in [threejs](https://threejs.org/) is a material that shows depth of a mesh object, it is based on the near and far values of a camera and of course the distance of that camera from the mesh. There are a [few materials](/2018/04/30/threejs-materials/) to choose from when it comes to skinning a mesh object, and I typical like to go with the basic material, or the standard material. However there are some good things to write about when it comes to the depth materials, and what branches off from the use of the material.

So in this post I thought I would write about a few examples about this kind of material, and in the process of doing so I think I will be touching base on some things that have to do with cameras also. For example there is adjusting the near and far values of a camera as a way to change how the depth material looks and when doing so a method needs to be called each time to update the projection matrix.

<!-- more -->

## 1 - The Depth Material and what to know first

This is a post on the depth material in three.js, as such I expect for you to at least understand the basics of creating a three.js project. If not there is looking into one or more getting started type posts on three.js, and also maybe javaScript in general. On top of knowing the very basis of getting started on three.js there is maybe a few more things that a developer should look into more with cameras, and certain base classes such as the Vector3 and Object3d classes, but that goes without saying for just about any three.js example. Still in this section I will just be outline a few things that you should know about before continuing reading with this post.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js, always be aware of what version of three.js is being used in an example code braking changes are introduced with three.js often. I have been writing posts on three.js now and then sense r91, and from that point to now I do not think much has changed with the depth material alone. Still I have got into the habit of mentioning  this in every post from now on.

### 1.2 - Might want to read up more on the perspective camera

There are a [few options when it comes to cameras in three.js](/2018/04/06/threejs-camera/), but the typical camera that i use just about all the time would of course be the [perspective camera](/2018/04/07/threejs-camera-perspective/). Each time I create an instance of a perspective camera there are a few arguments that I pass to the constructor such as the filed of view, aspect ratio, and the near and far render values of the camera. When it comes to the depth material it is the position from the camera, and the near and far settings that are used to set what the state of the color should be when rendering a texture for the mesh that uses the depth material.

### 1.3 - Check out Object3d, Vector3, and Euler if you have not done so

So then the near and far values of a camera are used for the depth material, but there is also the position of the mesh from the camera, and also the orientation of the mesh and or camera that will have an effect also. With that said it might be a good idea to look into the [Object3d class](/2018/04/23/threejs-object3d/) a bot more if you are still relative new to three.js at this time. The object3d class is a base class of other class objects in three.js such as Mesh, and Camera. The position property of Object3d is an instance of Vector3 and this can be used to set the position of a Mesh object, and also a camera for that matter. However any mesh might have high and low areas often, so there should be a way to rotate a mesh and or a camera with that there is the rotation property of Object3d that is an instance of Euler.

## 2 - Basic Depth Material example

First off there is starting with a basic example of what the deal is with the depth material. So there is creating a mesh with a geometry and an instance of the depth material. For that I just call the THREE.Mesh constructor and pass an instance of the bx geometry as the first argument, followed by and instance of the depth material by calling the THREE.MeshDepthMatreial constructor. I then save the resulting mesh to a variable called something like box, and then I can position that box by way of the position property that is an instance of vector3 by calling the set method of that class.

I will then want to create the rest of my threejs example just like that of any other example where I will want to have a scene, and add this box mesh to that scene. However I am also going to want a renderer, and a camera, and it is the camera that I should write about a little more with this example as there are two values of interest when it comes to the depth material. When calling the THREE.PerspectiveCamera constructor function the first value is the field of view, the second argument is an aspect ration, but then there are the third and fourth arguments. The third argument is an initial value for the near value of the camera, and the fourth argument is a far value for it.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1, 1.5),
        new THREE.MeshDepthMaterial());
box.position.set(-0.25, 0, -0.25);
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.8, 2.5);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

This example then helps to get a basic idea as to what the depth material is about, but in order to gain an even better understanding there are maybe some things that should change over time. So I think that I should cover at least one more example on the depth material that has to do with using a loop to change some values with the camera and or the position of the mesh.

## 3 - Changing the near and far values of a camera

The near and far values of a camerae are what are mainly used to adjust the outcome of how the depth material looks on top of things like the distance of the object from the camera. So then there is taking a moment to play around with the near and far values of a camera just as a way to confirm this first hand, and also to gain a better sense of what the near and far values of a camera should be for a given project. After all I often seem to just set the values to some kind of value that comes to might that might be a good range, but I never really look into it much more than that.

The thing about adjusting the near and far values of a camera after it has been created though is that after making any kind of change there is a special method of a camera instance that I am going to want to call after changing a value like near or far. This method is called the [update projecting matrix method](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix) of the perspective camera. This method will need to be called in an update loop, or event handler that will mutate a static values of a camera such as the near and far values that are used with the depth material.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1, 1.5),
        new THREE.MeshDepthMaterial());
box.position.set(-0.25, 0, -0.25);
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.8, 2.5);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5;
 
    requestAnimationFrame(loop);
 
    if (secs > 1 / fps) {
        // adjusting near and far values of the camera
        camera.near = 0.4 + 0.4 * bias;
        camera.far = 1 + 2 * bias;
        camera.updateProjectionMatrix();
 
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= maxFrame;
    }
};
loop();
```

There is playing around with the position and rotation of the mesh object also, but this helps to gain what the deal is with the near and far values of a camera and how that can effect how a mesh with the depth material is effected by those values.

## 4 - Conclusion

So the  the depth material is as the name suggests it is a way to go about showing some depth of on object without having to bother with directional light when it comes to other materials that can help to show some sense of depth that way such as with the standard material. More often than not I will end up going with a material like the standard material when it comes to working on an actual project of one kind or another, however the depth material can prove to be useful to know what is going on with values of interest that have to do with depth, and the camera.





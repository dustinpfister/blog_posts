---
title: Clamping a vector in threejs
date: 2021-06-16 12:45:00
tags: [three.js]
layout: post
categories: three.js
id: 890
updated: 2021-06-16 13:33:29
version: 1.17
---

When it comes to setting boundaries for Vectors in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) project there is often clamping the values of wrapping the values. That is that there is a situation in which there is a min value, a max value, and having a way to make sure that a value is always inside this range. However there is the idea of having it so that a number out of range is clamped to a value that is closest to what is in range, and then there is the idea of warping the value back around from the opposite side of the range. In todays post I will be focusing on what there is to work with in the Vector3 class prototype when it comes to clamping values rather that wrapping them.

When it comes to clamping Vectors there is the idea of having two Vectors that will be min and max Vectors, this results in some kind of box like area in which a vector can be clamped into. There is another general idea when it comes to clamping vectors that has to do more so with setting a limit in terms of the Euclidean length which will result in a sphere like area in which values can be clamped to. I suppose that there are all kinds of other ideas that come to mind when it comes to more complex examples of this sort of thing, but those are the two general basic ideas for starters. When it comes to these two general ideas there is the [Vector3.clamp](https://threejs.org/docs/index.html#api/en/math/Vector3.clamp), and [Vector3.clampLength](https://threejs.org/docs/index.html#api/en/math/Vector3.clampLength) methods in the Vector three class to work with.

<!-- more -->

## 1 - What to know before hand

This is a post on using the Vector3 clamp methods to clamp a vector between a min and max range. And when doing so for this post at least I am sticking mainly with where there is to work with in the Vector3 prototype alone rather than looking into additional examples of this sort of thing. So then I trust that you have [covered the very basics when it comes to getting up and running with threejs](/2018/04/04/threejs-getting-started/) in general, and have not got to the point where you are just learning more about working with the Vector3 class.

### 1.1 - Look into the Vector3 class in general

In this post I am just going over a few methods in the [Vector 3 class](/2018/04/15/threejs-vector3/) that has to do with creating and working with one or more Vectors in threejs when it comes to setting bounds for them. However there is a great deal more to learn about the class and Vectors in general.

### 1.2 - Version numbers matter with threejs

When I wrote this post I was using threejs r127 when it comes to testing out source code examples.

## 2 - Basic example of the THREE.Vector3 clamp method.

So in this example I am using the Vector3 clamp method to just make it so that any value that I set for the position of a cube ends up getting clamped within a min and max Vector range.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(5, 5));
 
    // creating a mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    mesh.position.set(0, 0, -5);
    mesh.position.clamp(
        new THREE.Vector3(-2, 0, -2),
        new THREE.Vector3(2, 0, 2));
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Conclusion

I did not get around to every little detail when it comes to setting boundaries for Vector3 values. I think I did more or less cover what there is to work with when it comes to clamping values at least, but I did not get into solutions that have to do with wrapping values.
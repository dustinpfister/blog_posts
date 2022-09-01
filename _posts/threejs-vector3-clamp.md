---
title: Clamping a vector in threejs
date: 2021-06-16 12:45:00
tags: [three.js]
layout: post
categories: three.js
id: 890
updated: 2022-09-01 12:05:47
version: 1.28
---

When it comes to setting boundaries for Vectors in a [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) project there is often clamping the values of wrapping the values. That is that there is a situation in which there is a min value, a max value, and having a way to make sure that a value is always inside this range. However there is the idea of having it so that a number out of range is clamped to a value that is closest to what is in range, and then there is the idea of warping the value back around from the opposite side of the range. In todays post I will be focusing on what there is to work with in the [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3) prototype when it comes to clamping values rather that wrapping them.

When it comes to clamping Vectors there is the idea of having two Vectors that will be min and max Vectors, this results in some kind of box like area in which a vector can be clamped into. There is another general idea when it comes to clamping vectors that has to do more so with setting a limit in terms of the Euclidean length which will result in a sphere like area in which values can be clamped to. I suppose that there are all kinds of other ideas that come to mind when it comes to more complex examples of this sort of thing, but those are the two general basic ideas for starters. When it comes to these two general ideas there is the [Vector3.clamp](https://threejs.org/docs/index.html#api/en/math/Vector3.clamp), and [Vector3.clampLength](https://threejs.org/docs/index.html#api/en/math/Vector3.clampLength) methods in the Vector three class to work with.

<!-- more -->

## Vector3 clamping What to know before hand

This is a post on using the Vector3 clamp methods to clamp a vector between a min and max range. And when doing so for this post at least I am sticking mainly with where there is to work with in the Vector3 prototype alone rather than looking into additional examples of this sort of thing. So then I trust that you have [covered the very basics when it comes to getting up and running with threejs](/2018/04/04/threejs-getting-started/) in general, and have not got to the point where you are just learning more about working with the Vector3 class.

### Look into the Vector3 class in general

In this post I am just going over a few methods in the [Vector 3 class](/2018/04/15/threejs-vector3/) that has to do with creating and working with one or more Vectors in threejs when it comes to setting bounds for them. However there is a great deal more to learn about the class and Vectors in general.

### Version numbers matter with threejs

When I wrote this post I was using threejs r127 when it comes to testing out source code examples. I have got into the habit of making sure that I always mentioning the version of threejs that I am using when it comes to write a post on the subject. The main reason why is because threejs is still a very fast moving project in terms of development and code breaking changes are happing all the time with it as a result.

## 1 - Basic example of the THREE.Vector3 clamp method.

So in this example I am using the Vector3 clamp method to just make it so that any value that I set for the [position](/2022/04/04/threejs-object3d-position/) of a [mesh object](/2018/05/04/threejs-mesh/) that ends up getting clamped within a min and max Vector range. So the way this works is I just call the Vector3.clamp method and pass the vector that I want to clamp as the first argument followed by two additional arguments that are the min and max ranges for the Vector if the form of additional Vector3 instances.

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

## 2 - Animation loop example

```js

(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(4, 4));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // get a random axis
    var randAxis = function () {
        return (0.25 + 1.25 * Math.random()) * (Math.random() < 0.5 ? -1 : 1);
    };
    // create group
    var createGroup = function () {
        var group = new THREE.Group();
        var i = 0,
        len = 20;
        while (i < len) {
            var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
            var ud = mesh.userData;
            var start_dir = ud.start_dir = new THREE.Vector3();
            ud.alpha = 0;
            ud.dr = 0.05 + 0.95 * Math.random();
            start_dir.x = randAxis();
            start_dir.y = randAxis();
            start_dir.z = randAxis();
            mesh.position.copy(start_dir.normalize().multiplyScalar(2));
            group.add(mesh);
            i += 1;
        }
        return group;
    };
    // update group
    var update = function (group, delta) {
        group.children.forEach(function (mesh, i) {
            var ud = mesh.userData;
            var start_dir = ud.start_dir;
            var pos = mesh.position;
            ud.alpha += delta * ud.dr;
            pos.copy(start_dir.clone().normalize().multiplyScalar(ud.alpha));
            pos.clamp(
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(2, 2, 2));
            if (Math.abs(pos.x) === 2 || Math.abs(pos.z) === 2) {
                ud.alpha = 0;
            }
        });
    };
    //-------- ----------
    // LOOP
    //-------- ----------
    var group = createGroup();
    scene.add(group);
    var frame = 0,
    maxFrame = 300,
    fps = 20,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            update(group, 0.1);
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

## 3 - Clamping Vectors by length rather than a box area with Vector3.clampLength

There is clamping vectors into a box like area with the clamp method, but another option is the clamp length method that is more of a sphere like area. This method is somewhat similar to the clamp method only in place of Vector3 instances for setting the min and max values for the range, there is just setting the min and max values with a length values in the from of just javaScript numbers. Another way of thinking about this is an inner and outer radius in terms of two spheres that are both centered over the same origin.

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
 
    mesh.position.set(0, 5, -5);
    mesh.position.clampLength(0.5, 1);
    console.log(mesh.position);
 
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

The subject of clamping a vector by length goes hand in hand with many other related topics such as what a length of a vector is, and also what a normalized vector with a length of 1 is. Getting into this subject might be a little off topic, but the basic idea is that a length of 1 is a radius of 1 from the origin. So by clamping the length of a vector from 0.5 to 1 will make it so that the distance from the origin to the vector will always be between those values.

## Conclusion

So then these clamp methods are helpful for making sure that a given point will never leave a given range, but they are not the best choice for other applications that come to mind. One such other application would have to do with collision detection, where I do not always want to clamp or wrap a point to a rang, but to just simply know if the point is in or out of a given range.

I did not get around to every little detail when it comes to setting boundaries for Vector3 values in general. I think I did more or less cover what there is to work with when it comes to clamping values at least, but I did not get into solutions that have to do with [wrapping values](/2018/07/22/phaser-math-wrap-and-clamp/). When it comes to that it would seem that there is no built in solution for doing so in the Vector3 prototype by itself at least. So it would seem that in order to Wrap values I will need to come up with my own solutions for doing so. 

There is also getting into more advanced solutions when it comes to just clamping values also, as I just covered the two basic ways of doing so here. So hopefully at some point in the future I will get around to expanding this post with additional examples on clamping vector's, and possible also some warping examples to which would be nice.
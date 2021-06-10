---
title: Mutating a point in a sphere with threejs
date: 2021-06-10 14:19:00
tags: [three.js]
layout: post
categories: three.js
id: 886
updated: 2021-06-10 14:36:05
version: 1.6
---

This week I was learning more about how to work with a buffer geometry in threejs when it comes to the various attributes that make up such a feature in threejs. There is the position attribute in the geometry which is the attribute that holds the current positions of all the points in the geometry for example. So I think it might be a good idea to wrap this week up with a few simple examples that have to do with mutating the position attributes of built in geometry constructors. one such constructor to work with when it comes to this is the sphere geometry constructor which is just one of many kinds of built in geometry constructors where it might prove to be an interesting learning experience to work out some methods that have to do with changing the geometry a little.

In this post then I will be going over my first quick example that has to do with a helper method that changes the position of a point on a sphere. The process of doing so is not always so easy as there is not just one point that needs to move but all points of all triangles at that point in space actually. So this might prove to be the kind of example that I might come back to now and then in order to find new ways to go about doing this.

<!-- more -->

## 1 - Mutating sphere geometry and what to know first

This is a post on a threejs example where I am mutating the geometry of a sphere made with the THREE.SphereGeometry constructor in the library. It should do without saying that this post is not intended for people that are new to threejs, and javaScript in general as the topic might prove to be a bit to advanced. So it might be best to start out with a getting started type post with threejs, even if you have some experience with these topics there are still a few things you might want to read up on more first.

### 1.1 - Might want to read up more on the buffer geometry class in general

It might be a good idea to read up more on the buffer geometry class in general, as there are a great number of properties and methods in an instance of buffer geometry that you should be aware of before getting into an example like this.

## 2 - The mutation of sphere example


```js
(function () {
 
    // set location of a vert given an index value in geometry.index
    var setVert = function (geometry, vertIndex, pos) {
        pos = pos || {};
        var posIndex = geometry.index.array[vertIndex] * 3,
        position = geometry.getAttribute('position');
        position.array[posIndex] = pos.x === undefined ? position.array[posIndex] : pos.x;
        position.array[posIndex + 1] = pos.y === undefined ? position.array[posIndex + 1] : pos.y;
        position.array[posIndex + 2] = pos.z === undefined ? position.array[posIndex + 2] : pos.z;
        position.needsUpdate = true;
    };
 
    // update top of sphere
    var updateSphereTopPoint = function (geometry, topPoint) {
        topPoint = topPoint === undefined ? 0.5 : topPoint;
        var position = geometry.getAttribute('position');
        var pos = {
            x: position.array[0],
            y: topPoint,
            z: position.array[2]
        };
        // getting width segments of sphere
        var ws = geometry.parameters.widthSegments;
        var i = 0;
        while (i < ws * 3) {
            setVert(geometry, i, pos);
            i += 1;
        }
    };
 
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(0.5, 30, 10);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(mesh);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(mesh.position);
    scene.add(camera);
 
    // LIGHT
    var light = new THREE.PointLight(0xffffff, 1);
    light.position.set(1, 1, 0);
    camera.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var per = 0,
    bias,
    lt = new Date(),
    maxFrames = 300,
    FPS = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / FPS) {
            per += 1 / (maxFrames / FPS) * secs;
            per %= 1;
            bias = 1 - Math.abs(per - 0.5) / 0.5;
            // calling update sphere helper
            updateSphereTopPoint(geometry, 0.75 - 0.75 * bias);
 
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
 
}
    ());
```
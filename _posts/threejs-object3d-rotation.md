---
title: Setting the rotation of objects in threejs
date: 2022-04-08 12:53:00
tags: [three.js]
layout: post
categories: three.js
id: 976
updated: 2022-04-08 13:33:48
version: 1.7
---

The [rotation property of the object3d class in threejs](https://threejs.org/docs/#api/en/core/Object3D.rotation) stores and instance of the [THREE.Euler class](/2021/04/28/threejs-euler/) and stores the current rotation, or orientation of an object. This rotation property is a key value pair of the [base class known as Object3d](/2018/04/23/threejs-object3d/) so then it can be used to set the rotation of [Mesh Objects](/2018/05/04/threejs-mesh/), [Groups](/2018/05/16/threejs-grouping-mesh-objects/), [Cameras](/2018/04/06/threejs-camera/), and just about anything else that is based off of the Object3D class including event a whole [Scene Object](/2018/05/03/threejs-scene/).

When it comes to just setting the local rotation of an object by way of this property, one way is by using something like the set method of the Euler class to set the rotation of the object to a given set of Euler angles in terms of radian values. In other worlds values between 0, and Math.PI \* \2. If you have a hard time thinking in radians there are tools that can be used to preform a quick conversion in the MathUtils object. There is a bit more to it than just that though, for example in some cases I might want to set the orientation of a geometry of a mesh object rather than the mesh object itself. There are other related tools and topics that I should also take a moment to cover while I am at it.

<!-- more -->

## The rotation property of the object3d class and what to know first

In this post I am going over some examples of the rotation property of the object3d class in the javaScript library known as threejs. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), let alone client side web development in general, so I assume that you have at least some background when it comes to these things.

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs, which was still a fairly new version of threejs at the time I started this post. I take a moment to always mention what version I was using when wrote a post on threejs because I have been using it long enough to know that code breaking changes are made to the library often.

### The Source code examples in this post are on github

The source code examples that I am writing about in this post [are up on Gitub](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-rotation).

## 1 - Basic example of the rotation property of Object3d

To start out with rotation and the object3d class I made this quick static scene example that involves just a few mesh objects created with the box geometry constructor and the normal material.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    [-45, 0, 45, 20].forEach(function(d, i, arr){
        var cube = mkCube(),
        p = i / (arr.length - 1 );
        cube.position.set(-3 + 6 * p, 0, 0);
        cube.rotation.y = THREE.MathUtils.degToRad(d);
        scene.add(cube);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - Animation example of rotation and groups

Now for a simple animation example using the request animation frame method in the body of a loop function. Also while I am at it I also made the cubes all children of a group rather than the scene object. So then in this animation example I am using the rotation property of the object3d class to rotate each child of the group over time, as well as the group as a whole.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    scene.add(new THREE.GridHelper(10, 10));
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var mkCube = function(){
        return new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    };
    var theCubes = new THREE.Group();
    scene.add(theCubes);
    [-45, 0, 45, 20].forEach(function(d, i, arr){
        var cube = mkCube(),
        p = i / (arr.length - 1 );
        cube.position.set(-3 + 6 * p, 0, 0);
        cube.rotation.y = THREE.MathUtils.degToRad(d);
        theCubes.add(cube);
    });
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        bias = 1 - Math.abs(0.5 - per) / 0.5;
        // rotating the group of cubes
        theCubes.rotation.y = Math.PI * 2 * per;
        // rotation of each child
        theCubes.children.forEach(function(cube, i){
            cube.rotation.x = Math.PI * 2 * ( 1 + i * 2) * per;
        });
    };
    // loop
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / fps_update){
            update();
            renderer.render(scene, camera);
            frame += fps_movement * secs;
            frame %= frameMax;
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 3 - Conclusion

The rotation property is then what I often used in order to set the rotation of an object such as a mesh object, group or camera. There is also the position property of the object3d class that holds an instance of the Vector3 class that is what is used to store and change the position of the object as well.


---
title: Using a Mesh in three.js
date: 2018-05-04 12:44:00
tags: [js,three.js]
layout: post
categories: three.js
id: 183
updated: 2018-05-04 13:32:35
version: 1.8
---

A Mesh is used in [three.js](https://threejs.org/) to create triangular polygon based mesh Objects with a [geometry](/2018/04/14/threejs-geometry/), and a [material](/2018/04/30/threejs-materials/). The Mesh Constructor is one of many constructors that you will find yourself using often as you get into making three.js projects. It is typically what is used for any kind of 3d Object that will be placed in a [Scene](/2018/05/03/threejs-scene/)

<!-- more -->

## What to know before continuing

This is a post on making and working with a Mesh in the javaScript library called three.js. It is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone javaScipt in general.

## Basic example of using a mesh

A Basic example of using a mesh would involve creating an instance of Mesh with the THREE.Mesh constructor, passing it the geometry that you want to use. Be default the basic material will be used with a random color, if you want to use something else for a [material](/2018/04/30/threejs-materials/) then you will want to pass that to the Mesh Constructor as the second argument.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Using A Mesh
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),  // geometry
            new THREE.MeshDepthMaterial()  // material
    ));
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);
 
    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // render the scene with the camera
    renderer.render(scene, camera);
 
}
    ());
```

In this demo I am just calling all the relevant constructors to produce a Mesh that will then directly be placed in the Scene. I can get away with this because it is a very basic demo, in more complex projects I will typically want to store the instance of Mesh to a variable so I can later work with it elsewhere.

## Moving a Mesh

it is important to note that THREE.Mesh is just one of many constructors in three.js that inherit from [Object3D](/2018/04/23/threejs-object3d/) which I will not get into detail about here. However for now it is a good idea to just know that Object3D brings a whole bunch of methods, and properties to THREE.Mesh that can be used to do things like moving the mesh around, and changing its rotation.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // The Mesh
    // assigning it to a variable so I can work
    // with it elsewhere
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial());
    scene.add(mesh);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(3, 1, 3);
    camera.lookAt(0, 0, 0);
 
    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
 
    // RENDERER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var frame = 0,
    maxFrame = 50,
    loop = function () {
 
        var per = frame / maxFrame,
        r = Math.PI * 2 * per;
 
        requestAnimationFrame(loop);
 
        // move the mesh with Object3D.position
        mesh.position.x = Math.cos(r) * 2;
        mesh.position.z = Math.sin(r) * 2;
 
        // a Object3D method
        mesh.lookAt(0, 0, 0);
 
        // render the scene with the camera
        renderer.render(scene, camera);
 
        frame += 1;
        frame %= maxFrame;
    }
 
    loop();
 
}
    ());
```

Here I am using the Object3D position property that stores an instance of [Vector3](/2018/04/15/threejs-vector3/) that can be used to change what should be the center point of the Mesh geometry assuming it has been normalized.

That might come off as a mouth full so maybe another way of explaining it is that there is a point in space in which the geometry of the mesh is relative to. The position property can be used to change the value of that point in space.

Also In this demo I am using the lookAt Method, which is another useful methods that is inherited from, use guessed it, Object3D.

## Conclusion

There is not much more to write about with Mesh, at least not at this time. However that is not at all the case with many other topics that branch off from Mesh such as [geometry](/2018/04/14/threejs-geometry/), [materials](/2018/04/30/threejs-materials/), [Object3D](/2018/04/23/threejs-object3d/), [Vector3](/2018/04/15/threejs-vector3/), the [Scenes](/2018/05/03/threejs-scene/), and [many more](/categories/three-js/).
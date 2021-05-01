---
title: Using a Mesh in three.js
date: 2018-05-04 12:44:00
tags: [js,three.js]
layout: post
categories: three.js
id: 183
updated: 2021-05-01 16:44:11
version: 1.19
---

A Mesh is used in [three.js](https://threejs.org/) to create triangular polygon based mesh Object with a [geometry](/2018/04/14/threejs-geometry/), and a [material](/2018/04/30/threejs-materials/) of which there are a number of options to choose form. The [Mesh Constructor](https://threejs.org/docs/#api/en/objects/Mesh) is one of many constructors that I find myself using often as I get into making three.js projects. It is typically what is used for any kind of 3d Object that will be placed in a [Scene](/2018/05/03/threejs-scene/) that will be some kind of object to look at or interact with then the is based off the [Object3d class](/2018/04/23/threejs-object3d/).

<!-- more -->

## 1 - Threejs Mesh objects and what to know before continuing

This is a post on making and working with a Mesh in the javaScript library called three.js. It is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone javaScipt in general. So I assume that you have at least some background with client side javaScript, and know how to set up a basic threejs project.

## 2 - Basic example of using a mesh

A Basic example of using a mesh would involve creating an instance of a Mesh with the THREE.Mesh constructor, passing it the geometry that I want to use. Be default the basic material will be used with a random color, so if I want to use something else for a [material](/2018/04/30/threejs-materials/) then you I want to pass that to the Mesh Constructor as the second argument. The result can then be saved to a variable, or just directly added to the scene as there are ways of still getting a reference to the mesh by way of the children property of the scene object.

So then the Basic idea here is to create a scene object, then create and add a Mesh object to the scene object. However in order to see the mesh I am going to need a camera, for this there are a few options but I typically like to go with the perspective camera. When I add the camera to the scene I am going to want to make sure that I position the camera away from the mesh so that it is not inside the mesh. After that I am going to need some kind of Renderer such as the built in WebGLRenderer. I then just need to call the render method of the renderer and pass the scene and camera to use.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
 
    // CREATEING AND ADDING A MESH TO A SCENE
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial()));
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());
```

So then this is a basic hello world type example of three.js where I am just looking at a cube. Now that I have that out of the way I can start to get to some more complex examples.


## 3 - Moving a Mesh

It is important to note that THREE.Mesh is just one of many constructors in three.js that inherit from [Object3D](/2018/04/23/threejs-object3d/) which would be worth checking out in detail because much of what applies for a mesh will also apply for a camera, groups, a light source, and even a whole scene because all those things are built on top of Object3d. However for now it is a good idea to just know that Object3D brings a whole bunch of methods, and properties to THREE.Mesh that can be used to do things like moving the mesh around, and changing its rotation.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // THE MESH
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 200,
    fps = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        r = Math.PI * 2 * per;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
 
            // MOVE the mesh with Object3D.position property that is an instance of Vector3
            mesh.position.set(Math.cos(r) * 2, 0, Math.sin(r) * 2);
 
            // ROTATE the mesh with the Object3d.rotation property that is an instance of Euler
            mesh.rotation.set(0, r, r * 2);
 
            // render the scene with the camera
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    }
 
    loop();
 
}
    ());
```

Here I am using the Object3D position property that stores an instance of [Vector3](/2018/04/15/threejs-vector3/) that can be used to change what should be the center point of the Mesh geometry assuming it has been normalized. That might come off as a mouth full so maybe another way of explaining it is that there is a point in space in which the geometry of the mesh is relative to. The position property can be used to change the value of that point in space.

Also In this demo I am using the rotation property, which is another useful property that is inherited from, use guessed it, Object3D. This rotation property stores an instance of the [Euler class](/2021/04/28/threejs-mesh/) which is like vercor3 only we are taking angles rather than a matrix position.

## 4 - Using an array of materials

One thing about a mesh is that a [material index](/2018/05/14/threejs-mesh-material-index/) can be with and array of materials when skinning a geometry of a mesh. So then it is possible to pass an array of materials rather than just a single instance of some kind of mesh material. When doing this the material index value of the face instances in the geometry is of interest when it comes to assigning what material is used for what face of the geometry. 

I have a post on this in which I get into this in detail but I can also provide a basic example of this here.

```js
    // a box geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1),
 
    // the materials array
    materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide
        })
    ];
 
    // for all faces
    geometry.faces.forEach(function (face,i) {
 
        // use each of the three materials 2 times
        face.materialIndex = Math.floor(i/2) % 3
 
    });
 
    // add to scene with the Mesh
    scene.add(new THREE.Mesh(
 
            geometry,
            materials));
```

## 5 - Conclusion

There is not much more to write about with Mesh, at least not at this time. However that is not at all the case with many other topics that branch off from Mesh such as [geometry](/2018/04/14/threejs-geometry/), [materials](/2018/04/30/threejs-materials/), [Object3D](/2018/04/23/threejs-object3d/), [Vector3](/2018/04/15/threejs-vector3/), the [Scenes](/2018/05/03/threejs-scene/), and [many more](/categories/three-js/).
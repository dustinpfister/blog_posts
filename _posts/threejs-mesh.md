---
title: Using a Mesh in three.js
date: 2018-05-04 12:44:00
tags: [js,three.js]
layout: post
categories: three.js
id: 183
updated: 2021-05-01 16:16:47
version: 1.14
---

A Mesh is used in [three.js](https://threejs.org/) to create triangular polygon based mesh Object with a [geometry](/2018/04/14/threejs-geometry/), and a [material](/2018/04/30/threejs-materials/) of which there are a number of options to choose form. The [Mesh Constructor](https://threejs.org/docs/#api/en/objects/Mesh) is one of many constructors that I find myself using often as I get into making three.js projects. It is typically what is used for any kind of 3d Object that will be placed in a [Scene](/2018/05/03/threejs-scene/) that will be some kind of object to look at or interact with then the is based off the [Object3d class](/2018/04/23/threejs-object3d/).

<!-- more -->

## 1 - Threejs Mesh objects and what to know before continuing

This is a post on making and working with a Mesh in the javaScript library called three.js. It is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone javaScipt in general. So I assume that you have at least some background with client side javaScript, and know how to set up a basic threejs project.

## 2 - Basic example of using a mesh

A Basic example of using a mesh would involve creating an instance of a Mesh with the THREE.Mesh constructor, passing it the geometry that I want to use. Be default the basic material will be used with a random color, so if I want to use something else for a [material](/2018/04/30/threejs-materials/) then you I want to pass that to the Mesh Constructor as the second argument. The result can then be saved to a variable, or just directly added to the scene as there are ways of still getting a reference to the mesh by way of the children property of the scene object.

So then the Basic idea here is to create a scene object, then create and add a Mesh object to the scene object. However in order to see the mesh I am going to need a camera, for this there are a few options but I typically like to go with the perspective camera. After that I am going to need some kind of Renderer such as the built in WebGLRenderer. I then just need to call the render method of the renderer and pass the scene and camera to use.

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


## 3 - Moving a Mesh

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

## 4 - Using an array of materials

Read my full post on [material index](/2018/05/14/threejs-mesh-material-index/), and arrays of materials

It is possible to pass an array of materials rather than just a single instance of some kind of mesh material such as the [basic material](/2018/05/05/threejs-basic-material/). When doing this the material index value of the face3 instances in the geometry used is of interest when it comes to assigning what material is used for what face. 

I have a post on this in which I get into this in detail but I can also provide a basic example of this here:

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
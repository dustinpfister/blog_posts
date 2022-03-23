---
title: The multiply scalar Vector3 prototype method in threejs
date: 2022-03-23 11:54:00
tags: [three.js]
layout: post
categories: three.js
id: 971
updated: 2022-03-23 12:28:38
version: 1.4
---

One major part of doing anything interesting with threejs is learning how to go about positioning things when it comes to working with the Vector3 class in the library. There are the very basics with this class when it comes to starting out with the set, and copy methods for example. However there are also a number of other useful methods in this class including methods like the [multiply scalar method](https://threejs.org/docs/#api/en/math/Vector3.multiplyScalar) which will be the main focal point of this post today.

<!-- more -->


## 1 - Basic Vector3 multiply scalar example

For a basic example of this multiply scalar method there is starting out with just using the typical set method to set an initial length for the vector that is greater than 0. Once I have a non zero length for the vector I can then use the multiply scalar method to multiply that length by any desired value that I give as the first argument when calling the multiply scalar method.

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var cube2 = cube1.clone();
    scene.add(cube1);
    scene.add(cube2);
 
    // SETTING POSITION WITH Vector3.set and Vector3.multiplyScalar
    cube1.position.set(-1, 0, -1).multiplyScalar(4);
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 2 - Copy and normalize, then use scalar

The copy method of the Vector 3 class allows for me to copy the values of one instance of Vector3 over to another instance. The normalize method of the Vector3 class is also a very useful one that will set the length of a vector to 1 while preserving the direction of the vector. So then I can create a new Instance of Vector3, then copy that to another such as the position object of a mesh, and the normalize the position to a length of one with the same direction of the vector that I copied from. Sense the length is now one, I can then use the multiply scalar method to set a desired length from there easily.

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH OBJECTS
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    var cube2 = cube1.clone();
    var cube3 = cube1.clone();
    scene.add(cube1);
    scene.add(cube2);
    scene.add(cube3);
 
    // SETTING POSITION WITH Vector3.copy, normalize, and Vector3.multiplyScalar
    var radian = THREE.MathUtils.degToRad(90 + 45),
    radius = 4;
    var vec = new THREE.Vector3(
        Math.cos(radian) * radius,
        0,
        Math.sin(radian) * radius
    );
    cube1.position.copy(vec);
    var scalar = 1 + Math.round(2 * Math.random())
    cube2.position.copy(vec).normalize().multiplyScalar(scalar);
    // adjust rotation of cubes
    cube1.lookAt(0, 0, 0);
    cube2.lookAt(0, 0, 0);
    cube3.lookAt(cube1.position);
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

## 3 - Translate, normalize and scalar

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // CREATING ANSD POSITIONING MESH OBJECTS WITH Vector3 METHODS
    // including copy, add, normalize, and multiplyScalar
    var cube1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
 
    var radian = THREE.MathUtils.degToRad(90 + 25),
    radius = 4;
    var vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
    [[0,0,0,0], [-2,1,0,1.5], [-4,2,0,3], [-8,3,0,4.5]].forEach(function(data){
        var mesh = cube1.clone(),
        x = data[0], y = data[1], z = data[2], scalar = data[3];
        mesh.position.copy(vec).add(new THREE.Vector3(x, y, z) ).normalize().multiplyScalar(scalar);
        mesh.lookAt(cube1.position);
        scene.add(mesh);
    });
    scene.children[1].lookAt(scene.children[2].position)
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```


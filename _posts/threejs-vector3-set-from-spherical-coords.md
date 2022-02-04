---
title: Vector3 set from spherical coords method
date: 2022-02-04 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 957
updated: 2022-02-04 11:19:37
version: 1.2
---

When it comes to working out all kinds of simple hello world type project examples using threejs for the sake of learning the basics of threejs, or just gaining a more solid understanding of the library regardless of experience, the Vector three Class might come up often when doing so. There is a while lot to write about when it comes to this class when it comes to things like normalizing an instance of Vector3, or getting the distance between two instances of a Vector3 object. One this that often want to do when making any kind of project with three.js is to position an object in terms of a spherical set of values in terms of a radius, and then two angles that have to do with coronets similar to that of latitude and longitude.

<!-- more -->


## 1 - 

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('black');
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    //camera.position.set(-17, 10, -17);
    camera.position.setFromSphericalCoords(
        25,
        THREE.MathUtils.degToRad(70),
        THREE.MathUtils.degToRad(225)
    );
    camera.lookAt(0, 0, 0);
    scene.add(camera);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);

    // A Mesh with a Sphere for geometry and using the Standard Material
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('red'),
            wireframe: true
        })
    );
    scene.add(mesh);
 
    // USING setFromSphericalCoords to set position of the Mesh
    var radius = 10,
    phi = THREE.MathUtils.degToRad(90),
    theta = THREE.MathUtils.degToRad(270);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
 
    // render
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - 

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('black');
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    //camera.position.set(-17, 10, -17);
    camera.position.setFromSphericalCoords(
        25,
        THREE.MathUtils.degToRad(70),
        THREE.MathUtils.degToRad(225)
    );
    camera.lookAt(0, 0, 0);
    scene.add(camera);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);
 
    // point light
    //var pl = new THREE.PointLight(0xffffff);
    //pl.position.set(2, 5, 3);
    //camera.add(pl);
    //scene.add(pl);
 
    // A Mesh with a Sphere for geometry and using the Standard Material
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('red'),
            wireframe: true
        })
    );
    scene.add(mesh);
 
    // USING setFromSphericalCoords to set position of the Mesh
    var radius = 10,
    phi = THREE.MathUtils.degToRad(90),
    theta = THREE.MathUtils.degToRad(270);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
 
    // render
    renderer.render(scene, camera);
 
}
    ());
```
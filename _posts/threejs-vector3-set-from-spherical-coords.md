---
title: Vector3 set from spherical coords method
date: 2022-02-04 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 957
updated: 2022-02-04 11:32:45
version: 1.3
---

When it comes to working out all kinds of simple hello world type project examples using threejs for the sake of learning the basics of threejs, or just gaining a more solid understanding of the library regardless of experience, the Vector three Class might come up often when doing so. There is a [whole lot to write about when it comes to the Vector3 class](/2018/04/15/threejs-vector3/) such as things like [normalizing an instance of Vector3](/2021/06/14/threejs-vector3-normalize/), or getting the [distance between two instances of a Vector3 object](/2021/06/15/threejs-vector3-distance-to/). 

One this that often want to do when making any kind of project with three.js is to position an object in terms of a spherical set of values in terms of a radius, and then two angles that have to do with coronets similar to that of latitude and longitude. Thus far I have made one [threejs project example that had to do with creating a module that is centered around the single purpose of positioning an object3d based object of one kind or another to the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/). That examples has to do not just with setting a position, but also setting a desired value for the rotation of an object3d based object such as a mesh or camera. The system I made for that example does seem for the most part to work okay, but I still think that there are more ways of doing the same thing, some of which might prove to be better for one reason or another. With that said while I was taking a second look at the Vector3 documentation I have found that there is a prototype method in the vector3 class that has to do with setting the values of a verctor3 instance using a radius, and two angles in radian values called [Vector3.setFromSphericalCoords](https://threejs.org/docs/#api/en/math/Vector3.setFromSphericalCoords).

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
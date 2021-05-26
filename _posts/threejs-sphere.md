---
title: Sphere Geometry in threejs
date: 2021-05-26 11:41:00
tags: [three.js]
layout: post
categories: three.js
id: 875
updated: 2021-05-26 12:14:25
version: 1.2
---

I have wrote a number of posts on the built in geometry constructors in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) all ready, but oddly enough I never got around to writing a thing or two about the [sphere geometry constructor](https://threejs.org/docs/#api/en/geometries/SphereGeometry), and everything that centers around it. Just like any other built in geometry constructor I just call THREE.SpeherGeomerty with the new keyword and what is returned is a buffer geometry instance that will be a sphere, I can then add the geometry as the first argument to a Mesh along with a material and add it to a scene. However there is a great deal more to it than just that, with the constructor itself, and of course a great many things that branch off from it.

<!-- more -->

## 1 - Sphere Geometry in threejs and what to know first

### 1.1 - Version Numbers matter with three.js

## 2 - Basic Sphere Geometry Example

```js
(function () {
 
    // creating a scene
    var scene = new THREE.Scene();
 
    // mesh
    var mesh = new THREE.Mesh(
            // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
            new THREE.SphereGeometry(0.5),
           // standard material
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x404040
            }));
    scene.add(mesh); // add the mesh to the scene
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(0.75, 1, 0.75);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 2 - Width and Height segments

```js
(function () {
 
    // create a sphere at helper
    var createSphereAt = function (x, z, w, h, r) {
        w = w === undefined ? 30 : w;
        h = h === undefined ? 15 : h;
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
                new THREE.SphereGeometry(r, w, h),
                // standard material
                new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                    emissive: 0x404040
                }));
        mesh.position.set(x, 0, z);
        return mesh;
    };
 
    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
 
    scene.add(createSphereAt(-2, 0, 20, 20));
    scene.add(createSphereAt(0, 0, 10, 10));
    scene.add(createSphereAt(2, 0, 5, 5));
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.5, 2.5, 2.5);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Making a dome shape with Sphere Geometry

```js
(function () {
 
    // create a Dome at helper
    var createDomeAt = function (x, z, rPer, r) {
        r = r === undefined ? 0.5 : r;
        // mesh
        var mesh = new THREE.Mesh(
                // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
                new THREE.SphereGeometry(r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5),
                // standard material
                new THREE.MeshStandardMaterial({
                    color: 0xff0000,
                    emissive: 0x404040,
                    side: THREE.DoubleSide
                }));
        mesh.position.set(x, 0, z);
        mesh.geometry.rotateX(Math.PI * 2 * rPer);
        return mesh;
    };
 
    // creating a scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(8, 8, 0xff0000));
 
    scene.add(createDomeAt(0, 0, 0.0));
    scene.add(createDomeAt(0, 1, 0.5));
 
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
    camera.position.set(2.0, 2.0, 2.0);
    camera.lookAt(0, 0, 0);
    var light = new THREE.PointLight(0xffffff); // point light
    light.position.x = 1;
    light.position.y = 1;
    camera.add(light);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 4 - Conclusion

That is it for now when it comes to there sphere geometry constructor in threejs and a hold bunch of other little side topics that stem off from the use of the constructor.


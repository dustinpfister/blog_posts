---
title: Three js plane geometry checker style
date: 2019-06-05 21:02:00
tags: [js,three.js]
layout: post
categories: three.js
id: 473
updated: 2021-05-08 11:35:47
version: 1.12
---

In [three js](https://threejs.org/) there are a lot of built in constructors for making quick geometries that can be used with a material to create a mesh than can the be placed in a scene. One of these is for plane geometry that is just flat simple 2d plane, which is a desired geometry for most simple projects. So it is nice to have a convenience method in the framework that can be used to quickly create such a geometry.

The [three plane](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) constructor allows for setting the width and height, but also a count for section width, and section height as well when creating a plane geometry. There is then the question of how to go about styling a checkered plane in threejs, as well as some other related topics when it comes to working with planes in threejs. So lets take a look at some plane geometry examples in threejs to get a better grasp on how to get up and running with plain geometry in threejs.

<!-- more -->

## 1 - Three Plane basic example

So a plane geometry can be made by just calling the THREE.PlaneGeometry constructor and then passing the desired width and height of the plane in terms of the object size as the first two arguments. When it comes to the segment width and height of the plane an additional two arguments can be used to set that width and height of the plane geometry also. 

The Plane geometry can then be used with a mesh and material object like any other built in geometry constructor in three js to produce a display object that can then be added to a scene. So A Basic example of the three plane geometry constructor might look something like this:

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// add a plane
var width = 10,
height = 10,
widthSegments = 1,
heightSegments = 1;
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height, widthSegments, heightSegments),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane);
 
renderer.render(scene, camera);
```

This will result in a plane that is ten by ten and is broken down into a single segment. If I want a checkered board effect it is not just a question of increasing the segment size arguments. I also need to give an array of materials rather than just one, and I also need to set the material index values as desired. So lets look at some more examples in which I am getting into doing just that.

## 2 - Styling a plane as a checkered board

So when it comes to styling a plane that has some sections with it, doing so can be a little confusing, but might not prove to be to hard. I have found solutions on line at [stack overflow](https://stackoverflow.com/questions/22689898/three-js-checkerboard-plane) that will work okay in some situations but not others depending on the number of sections. I was able to work out a solution for this that seems to work okay with any combination of width and height sections though and in the section I will be going over just that.

### 2.1 - The checker helpers 

Here I have two functions that create a plane geometry that has the material index values set for each tile section in the plane. So in other words when the geometry is used with a mesh that has an array of materials the material index values of 0 and 1 will be used for every other tile section in the plane, just like that of a checker board pattern.

```js
var mkCheckerGeo = function (w, h, sw, sh) {
    w = w === undefined ? 16 : w;
    h = h === undefined ? 16 : h;
    sw = sw === undefined ? 8 : sw;
    sh = sh === undefined ? 8 : sh;
    console.log(sh);
    var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh);
    planeGeo.faces.forEach(function (face, i) {
        var tile = Math.floor(i / 2),
        w = planeGeo.parameters.widthSegments,
        h = planeGeo.parameters.heightSegments,
        y = Math.floor(tile / w);
        if (w % 2) {
            face.materialIndex = tile % 2;
        } else {
            face.materialIndex = y % 2 ? 1 - tile % 2 : tile % 2
        }
    });
    return planeGeo;
};
 
var mkChecker = function (opt) {
    opt = opt || {};
    opt.materials = opt.materials || [
            new THREE.MeshBasicMaterial({
                color: 0xe0e0e0
            }),
            new THREE.MeshBasicMaterial({
                color: 0x505050
            })
        ];
    // add a plane
    var plane = new THREE.Mesh(
            mkCheckerGeo(opt.w, opt.h, opt.sw, opt.sh),
            opt.materials);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    return plane;
};
```

### 2.2 - The checker helpers in action

So now I can use my mkCheker to create a mesh that uses a plane geometry with the material index values set to the right values for each section in the plane.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// standard checker
var check = mkChecker({
        w: 5,
        h: 5
    });
scene.add(check);
 
// odd checker
var oddCheck = mkChecker({
        w: 4,
        h: 5,
        sw: 3,
        sh: 5
    });
oddCheck.position.set(8, 0, 0);
scene.add(oddCheck);
 
renderer.render(scene, camera);
```
---
title: Three js plane geometry checker style
date: 2019-06-05 21:02:00
tags: [js,three.js]
layout: post
categories: three.js
id: 473
updated: 2021-05-09 12:40:00
version: 1.25
---

In [three js](https://threejs.org/) there are a lot of built in constructors for making quick geometries that can be used with a material to create a mesh than can the be placed in a scene. One of these is for plane geometry that is just a flat simple 2d plane, which is a desired geometry for most simple projects. So it is nice to have a convenience method in the framework that can be used to quickly create such a geometry.

The [three plane](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) constructor allows for setting the width and height, but also a count for section width, and section height as well when creating a plane geometry. There is then the question of how to go about styling a checkered plane in threejs, as well as some other related topics when it comes to working with planes in threejs. So lets take a look at some plane geometry examples in threejs to get a better grasp on how to get up and running with plain geometry in threejs.

<!-- more -->

## 1 - Plane Geometry in three.js and what to know first

In this post I am writing about the plane geometry constructor in threejs a javaScript library that has to do with 3d modeling. As such I expect that you have spent at least a little time [learning how to get started with three.js](/2018/04/04/threejs-getting-started/), and how to program in general with client side javaScript. In any case in this section I will be going over a few things that you might want to read up on a bit more before really getting into the plane geometry constructor.

### 1.1 -  version Numbers matter

When I first wrote this post I was using three.js revision r104, and the last time I came around to do a little editing of this post I was using r127. Sense then some code breaking changes have been introduced that will cause some of these examples to break when it comes to having a checkerboard pattern on a plane depending on what version you are using. I am generally keeping the newer code examples to the top of the post, and leaving the older examples at the bottom for the sake of historical reasons, or if for some reason you are still using an older versions of three.js.

### 1.2 - Might want to read up more on Buffer Geometry Class addGroup method, and Material Index values

It might be a good idea to read up more on the [Buffer Geometry class](/2021/04/22/threejs-buffer-geometry/) and the add group method to be more specific when it comes to adding groups to a geometry and working with [more than one material when adding the geometry to a mesh](/2018/05/14/threejs-mesh-material-index/). With many built in geometry constructors such as the Box Geometry constructor groups are added to begin with in the constructor, and in that case one just needs to go through and change material index values as the groups are there to begin with and have starting index values. However as of late versions of three.js this is nit the case with the Plane Geometry Constructor, the groups must be added as there will not be any by default. In this post I will be going over this in some of the more advanced examples, but in never hurts to look into more resources on this topic.

## 2 - Three Plane basic example

So a plane geometry can be made by just calling the THREE.PlaneGeometry constructor and then passing the desired width and height of the plane in terms of the object size as the first two arguments. When it comes to the segment width and height of the plane an additional two arguments can be used to set that width and height of the plane geometry also in terms of the segment width and height.

The Plane geometry can then be used with a mesh and material object like any other built in geometry constructor in three js to produce a display object that can then be added to a scene. So A Basic example of the three plane geometry constructor might look something like this.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// add a plane
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }));
plane.rotation.set(-Math.PI/2,0,0);
scene.add(plane);
 
renderer.render(scene, camera);
```

This will result in a plane that is ten by ten and is broken down into a single segment. If I want a checkered board effect it is not just a question of increasing the segment size arguments from a value of 1 by 1. I also need to give an array of materials rather than just one material like in this example, and I also need to set the material index values as desired that will change a little depending on the effect that I want. Also before I even get to that point as of late versions of three.js I need to add the groups first. So lets look at some more examples in which I am getting into doing things with an array of materials, creating groups, and setting material index values for plane geometries.

## 3 - Adding one or more groups to a plane geometry and working with an array of materials

Often I might want to use more than one material when it comes to skinning a plane geometry. For starers there is just passing an array of two materials rather than just a single material instance object to the mesh constructor that I use with the plane geometry. However that might just be a first step, as with late versions of three.js there will be no groups added by default by just calling the plane geometry constructor. The groups must be added then by calling the [add group](https://threejs.org/docs/#api/en/core/BufferGeometry.addGroup) method of the buffer geometry class. When doing so I need to give a vertex index value as the first argument, followed by a count of vertex index values from that start point, followed by a material index value. If you still find that confusing maybe it would be best to learn by doing and just start playing around with a code example of this.

```js
// An Array of materials
var materialArray = [
    new THREE.MeshBasicMaterial({
        color: 0xe0e0e0,
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        color: 0x505050,
        side: THREE.DoubleSide
    })
];
 
// PLANE
var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 5, 1, 2),
        materialArray);
// USING ADD GROUP METHOD TO SET MATERIAL
// INDEX VLAUES
plane.geometry.addGroup(0, 3, 0);
plane.geometry.addGroup(3, 3, 1);
plane.geometry.addGroup(6, 3, 1);
plane.geometry.addGroup(9, 3, 0);
 
plane.position.set(0, 0, 0);
plane.rotation.set(-Math.PI * 0.5, 0, 0);
 
// add plane to scene
var scene = new THREE.Scene();
scene.add(plane);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(3.5, 5.5, 3.5);
camera.lookAt(0, -1.5, 0);
var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

In this example I am calling the add group method a total of four times, one time for each triangle in this plane geometry that is 1 by 2 in terms of the dimensions of the sections. I could call the the add group method just two times with a different set of values for the start vertex and count of vertex points. And there is also changing up what the material index values are for these add group calls also when it comes to the third argument. Once you get a fell for what the situation is with these arguments and the effect that they end up having, it is time to move on to working out some functions that can help with creating groups and setting material index values.

## 3 - Styling a plane as a checkered board in three.js r104 - r124

So when it comes to styling a plane that has some sections with it, doing so can be a little confusing, but might not prove to be to hard. I have found solutions on line at [stack overflow](https://stackoverflow.com/questions/22689898/three-js-checkerboard-plane) that will work okay in some situations but not others depending on the number of sections. I was able to work out a solution for this that seems to work okay with any combination of width and height sections though and in the section I will be going over just that.

### 3.1 - The checker helpers 

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

### 3.2 - The checker helpers in action

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

## 4 - Conclusion

That will be it for now when it comes to plane geometry in three.js, I have a lot of other posts that I am getting around to editing a little, but I do not always have enough time to give every post the attention that it might need. The plane geometry works okay for what typically use if for, however as of late I often just use a box geometry to sever as a crude yet functional floor.
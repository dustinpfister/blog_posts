---
title: Three js plane geometry checker style
date: 2019-06-05 21:02:00
tags: [js,three.js]
layout: post
categories: three.js
id: 473
updated: 2021-05-09 13:10:53
version: 1.33
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

## 4 - Checker board example

In this section I will be going over a checker board example of plane geometry in three.js. The basic idea here is to just work out a function that will create the groups, and set the material index values for each group in a desired way.

### 4.1 - The helper methods for creating a checker board plane geometry

I worked out two helper method for this example by making a function that will create and return a plane geometry, and another function that will use that method that creates the plane geometry in a mesh.

```js
var mkCheckerGeo = function (w, h, sw, sh) {
    w = w === undefined ? 16 : w;
    h = h === undefined ? 16 : h;
    sw = sw === undefined ? 8 : sw;
    sh = sh === undefined ? 8 : sh;
    var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
    tileIndex = 0,
    len = sw * sh,
    mi,
    y,
    i;
    while(tileIndex < len){
        i = tileIndex * 6;
        mi = tileIndex % 2;
        if (sw % 2) {
            mi = tileIndex % 2;
        } else {
            y = Math.floor(tileIndex / sw);
            mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
        }
        planeGeo.addGroup(i, 3, mi);
        planeGeo.addGroup(i + 3, 3, mi);
        tileIndex += 1;
    }
    return planeGeo;
};
 
var mkChecker = function (opt) {
    opt = opt || {};
    opt.materials = opt.materials || [
            new THREE.MeshBasicMaterial({
                color: 0xe0e0e0,
                side: THREE.DoubleSide
            }),
            new THREE.MeshBasicMaterial({
                color: 0x505050,
                side: THREE.DoubleSide
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

### 4.2 - Demo of the mk checker function

I can then just call my mkChekcer function that will create and return the plane geometry with the groups and material index values set up for me. I then just need to add the returned mesh object to the scene, and the effect seems to work more or less as I would expect it to for just about any values that I set the the width and height of the sections.

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
 
// standard checker
var check = mkChecker({
        w: 10,
        h: 10,
        sw: 12,
        sh: 12
    });
scene.add(check);
 
renderer.render(scene, camera);
```

Although this seems to work okay, I think that it might be even better to pull the logic that has to do with setting material index values out of the function that created the geometry, and have a module where there are a few options for setting material index values.

## 5 - Tile index module example

The example where I am just setting a checker board like pattern is a good start, but now I think I should make a module where there is just creating the groups like that, but pulling the logic that has to do with setting material index values out into a function of its own. There is then experimenting with creating at least a few functions that have to do with setting material index values in different ways.

### 5.1 - The tile module

For this example then I started to make a kind of tile index module that i can use to create and return a mesh object that has a plane geometry with groups set up in a grid like pattern. However the material index values will be set to zero by default for all of the sections, so then there uis having a few additional functions that will set material index values for the mesh objects that I create with this module.

```js
(function (api) {
 
    var MATERIALS = [
        new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x505050,
            side: THREE.DoubleSide
        })
    ];
 
    var planeTileGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        var planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
        tileIndex = 0,
        len = sw * sh,
        mi,
        y,
        i;
        while (tileIndex < len) {
            i = tileIndex * 6;
            mi = 0;
            planeGeo.addGroup(i, 3, mi);
            planeGeo.addGroup(i + 3, 3, mi);
            tileIndex += 1;
        }
        return planeGeo;
    };
 
    // create and return a plane with tile groups
    api.create = function (opt) {
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        // add a plane
        var plane = new THREE.Mesh(
                planeTileGeo(opt.w, opt.h, opt.sw, opt.sh),
                opt.materials);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
 
    // set checkerBoard material index values
    api.setCheckerBoard = function (plane) {
        var w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        tileIndex = 0,
        gi,
        len = w * h,
        mi,
        y;
        while (tileIndex < len) {
            if (w % 2) {
                mi = tileIndex % 2;
            } else {
                y = Math.floor(tileIndex / w);
                mi = y % 2 ? 1 - tileIndex % 2 : tileIndex % 2
            }
            gi = tileIndex * 2;
            plane.geometry.groups[gi].materialIndex = mi;
            plane.geometry.groups[gi + 1].materialIndex = mi;
            tileIndex += 1;
        }
    };
 
    // set checkerBoard material index values
    api.setBoxBoard = function (plane) {
        var w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        tileIndex = 0,
        len = w * h,
        gi,
        mi,
        x,
        y;
        while (tileIndex < len) {
            x = tileIndex % w;
            y = Math.floor(tileIndex / w);
            mi = 0;
            if (y > 0 && y < h - 1) {
                if (x > 0 && x < w - 1) {
                    mi = 1;
                }
            }
            gi = tileIndex * 2;
            plane.geometry.groups[gi].materialIndex = mi;
            plane.geometry.groups[gi + 1].materialIndex = mi;
            tileIndex += 1;
        }
    };
 
}
    (this['TileMod'] = {}));
```

### 5.2 - Demo of the tile index module

Now it is time to test out this module to see if what I worked out is working the way that I would like it to, and it would seem that it is.

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
 
var materialArray = [
    new THREE.MeshBasicMaterial({
        color: 0xeffff00,
        side: THREE.DoubleSide
    }),
    new THREE.MeshBasicMaterial({
        color: 0x2f2f2f,
        side: THREE.DoubleSide
    })
];
 
var plane = TileMod.create({
        materials: materialArray,
        w: 10,
        h: 10,
        sw: 4,
        sh: 4
    });
// set checkerBoard material index values
TileMod.setCheckerBoard(plane);
scene.add(plane);
 
var plane2 = TileMod.create({
        materials: materialArray,
        w: 10,
        h: 10,
        sw: 8,
        sh: 8
    });
// set checkerBoard material index values
TileMod.setBoxBoard(plane2);
plane.position.set(-11, 0, 0);
scene.add(plane2);
 
renderer.render(scene, camera);
```

There is then coming up with additional methods for setting the index values in a whole bunch of different ways, and also making such functions that will take some arguments. However there is not just the material index values of course there is aso working out new ways to add the groups in different ways also. never the less after working out this example I now have a decent grasp on how to go about  feating groups and setting material index values for plane geometries. Also much of what I have worked out here of course applies to buffered geometry in general also.

## 6 - Styling a plane as a checkered board in three.js r104 - r124

This is the older example for a checkered board plane geometry that I made when I first wrote this post, back then I was using three.hs r104, so this will likely break on newer versions of three.js.

When it comes to styling a plane that has some sections with it, doing so can be a little confusing, but might not prove to be to hard. I have found solutions on line at [stack overflow](https://stackoverflow.com/questions/22689898/three-js-checkerboard-plane) that will work okay in some situations but not others depending on the number of sections. I was able to work out a solution for this that seems to work okay with any combination of width and height sections though and in the section I will be going over just that.

### 6.1 - The checker helpers 

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

### 6.2 - The checker helpers in action

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

## 7 - Conclusion

That will be it for now when it comes to plane geometry in three.js, I have a lot of other posts that I am getting around to editing a little, but I do not always have enough time to give every post the attention that it might need. The plane geometry works okay for what typically use if for, however as of late I often just use a box geometry to sever as a crude yet functional floor.
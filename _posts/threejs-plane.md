---
title: Three js plane geometry checker style
date: 2019-06-05 21:02:00
tags: [js,three.js]
layout: post
categories: three.js
id: 473
updated: 2022-10-13 12:19:58
version: 1.41
---

In [three js](https://threejs.org/) there are a lot of built in constructors for making quick geometries that can be used with a material to create a mesh than can the be placed in a scene object. One of these is for plane geometry that is just a flat simple 2d plane, which is a desired geometry for most simple projects. So it is nice to have a convenience method in the framework that can be used to quickly create such a geometry.

The [three plane](https://threejs.org/docs/#api/en/geometries/PlaneGeometry) constructor allows for setting the width and height, but also a count for section width, and section height as well when creating a plane geometry. There is then the question of how to go about styling a checkered plane in threejs, as well as some other related topics when it comes to working with planes in threejs. There are two general ways of doing that sort of thing, one would be to just think in terms of a single material and a single texture, and the other would involve getting into creating and adding groups for the geometry. In any case the plane geometry is a great one to start with when it comes to both of these topics actually.

There are many other little details about this that I should also touch base on such as rotating the geometry rather than  the mesh object that contains it, and setting the side property of the material that I use with the geometry when creating the mesh and so forth. So lets take a look at some plane geometry examples in threejs to get a better grasp on how to get up and running with plain geometry in threejs.
<!-- more -->

## Plane Geometry in three.js and what to know first

In this post I am writing about the plane geometry constructor in threejs a javaScript library that has to do with 3d modeling. As such I expect that you have spent at least a little time [learning how to get started with three.js](/2018/04/04/threejs-getting-started/), and how to [program in general with client side javaScript](/2018/11/27/js-getting-started/). In any case in this section I will be going over a few things that you might want to read up on a bit more before really getting into the plane geometry constructor.

<iframe class="youtube_video" src="https://www.youtube.com/embed/PvBaddSz-xs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Might want to read up more on Buffer Geometry Class addGroup method, and Material Index values

It might be a good idea to read up more on the [Buffer Geometry class](/2021/04/22/threejs-buffer-geometry/) and the add group method to be more specific when it comes to adding groups to a geometry and working with [more than one material when adding the geometry to a mesh](/2018/05/14/threejs-mesh-material-index/). With many built in geometry constructors such as the Box Geometry constructor groups are added to begin with in the constructor, and in that case one just needs to go through and change material index values as the groups are there to begin with and have starting index values. However as of late versions of three.js this is nit the case with the Plane Geometry Constructor, the groups must be added as there will not be any by default. In this post I will be going over this in some of the more advanced examples, but in never hurts to look into more resources on this topic.

### Source code is up on Github

The source code examples that I am writing about in this post can also be found in my [test threejs Github Reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-plane).

### Version Numbers matter

When I first wrote this post I was using three.js revision r104, and the last time I came around to do a little editing of this post I was using r140. Sense then some code breaking changes have been introduced that will cause some of these examples to break when it comes to having a checkerboard pattern on a plane depending on what version you are using. I am generally keeping the newer code examples to the top of the post, and leaving the older examples at the bottom for the sake of historical reasons, or if for some reason you are still using an older versions of three.js.

As of this writing I have all of the new examples working well with r140. The one old section on the face3 class at the bottom of this post was still working on r111 and at this time I am only going to be interested in maintaining the examples that are newer.

## 1 - Basic examples of plane geometry

In this section I will be starting out with just a few fairly basic examples of plane geometry without going to much into detail with various advanced topics that I will be getting into in later sections in this blog post. For now there is just setting up the usual set of objects as with any threejs project, using the arguments of the Plane geometry constructor, and other various little details that have to do with materials and buffer geometry in general.

### 1.1 - Plane geometry hello world, and setting size of the geometry

So a plane geometry can be made by just calling the THREE.PlaneGeometry constructor and then passing the desired width and height of the plane in terms of the object size as the first two arguments. The Plane geometry can then be used with a mesh and material, like that of the [basic material](/2018/05/05/threejs-basic-material/) for example, like any other built in geometry constructor in three js to produce a display object that can then be added to a scene. So A basic example of the three plane geometry constructor might look something like this.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - USING PLANE GEOMETRY, SETTING SIZE
    // ---------- ----------
    var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 4),
        new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

This will result in a plane that is eight by 4 and is broken down into a single segment as that is the default for the additional arguments that have to do with that. If I want a checkered board effect it is not just a question of increasing the segment size arguments from a value of 1 by 1. I also need to give an array of materials rather than just one material like in this example, and I also need to set the material index values as desired that will change a little depending on the effect that I want. There is however just still going with a plane that is just 1 by 1 but thinking more in terms of the texture that will be used and the state of the uv attribute of the geometry. There are all far more advanced topics though that I will be getting to in later sections in this post. For now lets just stick with covering some of the basics here.

### 1.2 - The side option of mesh materials, and buffer geometry rotation

When I rotate a mesh object that contains a plane geometry around by way of the [object3d rotation property](/2022/04/08/threejs-object3d-rotation/), and just go with the default option for the side property of the material, the back side of the plane will not render. This is to be expected as the default value for the side option of mesh materials is THREE.FrontSide, and with many geometries this is the value that I would want to use. However there are some exceptions, and having just a plane geometry in a sean is one such exception as I will typically want to have both sides render. So then it is common practice to make sure that the side option of the material that i use with the mesh objects is set to the THREE.DoubleSide value.

Speaking of rotation there is not just rotation of the mesh object, but also [rotation of the geometry as well](/2021/05/20/threejs-buffer-geometry-rotation/). Often I will want to adjust the rotation of a plane geometry just once, and then use the object3d rotation values over and over again in an animation loop.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - Plane Geometry
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshNormalMaterial());
    scene.add(mesh1);
    mesh1.position.set(-2, 2, 0);
    // MESH2 IS USING THE THREE.DoubleSide OPTION
    // FOR THE MATERIAL
    var mesh2 = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshNormalMaterial({ side: THREE.DoubleSide}));
    mesh2.position.set(2, 2, 0);
    scene.add(mesh2);
    // ROTATION OF GEOMETRY
    var mesh3 = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshNormalMaterial({ side: THREE.DoubleSide}));
    mesh3.geometry.rotateX( Math.PI * 0.5 );
    mesh3.position.y = -0.025;
    scene.add(mesh3);
    // ---------- ----------
    // LOOP
    // ---------- ----------
    const fps_move = 30, fps_update = 12;
    let f = 0, fm = 300, lt = new Date();
    const loop = () => {
        const now = new Date();
        const secs = (now - lt) / 1000;
        const a = f / fm;
        requestAnimationFrame(loop);
        if(secs >= 1 / fps_update){
            mesh1.rotation.y = Math.PI * 8 * a;
            mesh2.rotation.y = Math.PI * 8 * a;
            mesh3.rotation.y = Math.PI * 2 * a;
            f += fps_move * secs;
            f %= fm;
            renderer.render(scene, camera);
            lt = now;
        }
    };
    loop();
}
    ());
```


## 2 - Adding one or more groups to a plane geometry and working with an array of materials

Often I might want to use more than one material when it comes to skinning a plane geometry. For starers there is just passing an array of two materials rather than just a single material instance object to the mesh constructor that I use with the plane geometry. However that might just be a first step, as with late versions of three.js there will be no groups added by default by just calling the plane geometry constructor. The groups must be added then by calling the [add group](https://threejs.org/docs/#api/en/core/BufferGeometry.addGroup) method of the buffer geometry class. When doing so I need to give a vertex index value as the first argument, followed by a count of vertex index values from that start point, followed by a material index value. If you still find that confusing maybe it would be best to learn by doing and just start playing around with a code example of this.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - ADDING GROUPS
    // ---------- ----------
    // An Array of materials
    const materialArray = [
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
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 7, 1, 2),
        materialArray);
    // USING ADD GROUP METHOD TO SET MATERIAL
    // INDEX VLAUES
    plane.geometry.addGroup(0, 3, 0);
    plane.geometry.addGroup(3, 3, 1);
    plane.geometry.addGroup(6, 3, 1);
    plane.geometry.addGroup(9, 3, 0);
    plane.geometry.rotateX(Math.PI * 0.5);
    scene.add(plane);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

In this example I am calling the add group method a total of four times, one time for each triangle in this plane geometry that is 1 by 2 in terms of the dimensions of the sections. I could call the the add group method just two times with a different set of values for the start vertex and count of vertex points. And there is also changing up what the material index values are for these add group calls also when it comes to the third argument. Once you get a fell for what the situation is with these arguments and the effect that they end up having, it is time to move on to working out some functions that can help with creating groups and setting material index values.

## 3 - Checker board example

In this section I will be going over a checker board example of plane geometry in three.js. The basic idea here is to just work out a function that will create the groups, and set the material index values for each group in a desired way.

### 3.1 - The helper methods for creating a checker board plane geometry

I worked out two helper method for this example by making a function that will create and return a plane geometry, and another function that will use that method that creates the plane geometry in a mesh.

I can then just call my mkChekcer function that will create and return the plane geometry with the groups and material index values set up for me. I then just need to add the returned mesh object to the scene, and the effect seems to work more or less as I would expect it to for just about any values that I set the the width and height of the sections.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPER FUNCTIONS
    // ---------- ----------
    // make just a geo with groups set up
    const mkCheckerGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        const planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
        len = sw * sh;
        let tileIndex = 0,
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
    // set up a mesh
    const mkChecker = function (opt) {
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
        const plane = new THREE.Mesh(
            mkCheckerGeo(opt.w, opt.h, opt.sw, opt.sh),
            opt.materials);
        plane.geometry.rotateX( Math.PI * 0.5 );
        return plane;
    };
    // ---------- ----------
    // MESH - 
    // ---------- ----------
    var check = mkChecker({
        w: 10,
        h: 10,
        sw: 12,
        sh: 12
    });
    scene.add(check);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

Although this seems to work okay, I think that it might be even better to pull the logic that has to do with setting material index values out of the function that created the geometry, and have a module where there are a few options for setting material index values.

## 4 - Tile index module example

The example where I am just setting a checker board like pattern is a good start, but now I think I should make a module where there is just creating the groups like that, but pulling the logic that has to do with setting material index values out into a function of its own. There is then experimenting with creating at least a few functions that have to do with setting material index values in different ways.

### 4.0 - The tile module

For this example then I started to make a kind of tile index module that i can use to create and return a mesh object that has a plane geometry with groups set up in a grid like pattern. However the material index values will be set to zero by default for all of the sections, so then there uis having a few additional functions that will set material index values for the mesh objects that I create with this module.

```js
// tilemod.js - r0 - from threejs-plane
// https://dustinpfister.github.io/2019/06/05/threejs-plane/
(function (api) {
    // default materials
    const MATERIALS = [
        new THREE.MeshBasicMaterial({
            color: 0xe0e0e0,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0x505050,
            side: THREE.DoubleSide
        })
    ];
    // make plane tile geo
    const planeTileGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
        const planeGeo = new THREE.PlaneGeometry(w, h, sw, sh),
        len = sw * sh;
        let tileIndex = 0,
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
        const plane = new THREE.Mesh(
                planeTileGeo(opt.w, opt.h, opt.sw, opt.sh),
                opt.materials);
        plane.geometry.rotateX( Math.PI * 0.5 );
        return plane;
    };
    // set checkerBoard material index values
    api.setCheckerBoard = function (plane) {
        const w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        len = w * h;
        let tileIndex = 0,
        gi,
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
        const w = plane.geometry.parameters.widthSegments,
        h = plane.geometry.parameters.heightSegments,
        len = w * h;
        let tileIndex = 0,
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
    ( this['TileMod'] = {} ));
```

### 4.1 - Demo of the tile index module

Now it is time to test out this module to see if what I worked out is working the way that I would like it to, and it would seem that it is.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 100);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, -2, 0);
    scene.add(camera);
    // render
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // ---------- ----------
    // MESH - Making Mesh Object with TileMod module r0
    // ---------- ----------
    const plane = TileMod.create({
        w: 10,
        h: 10,
        sw: 4,
        sh: 4
    });
    // set checkerBoard material index values
    TileMod.setCheckerBoard(plane);
    scene.add(plane);
    const plane2 = TileMod.create({
        w: 10,
        h: 10,
        sw: 8,
        sh: 8
    });
    // set checkerBoard material index values
    TileMod.setBoxBoard(plane2);
    plane.position.set(-11, 0, 0);
    scene.add(plane2);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

There is then coming up with additional methods for setting the index values in a whole bunch of different ways, and also making such functions that will take some arguments. However there is not just the material index values of course there is also working out new ways to add the groups in different ways also. never the less after working out this example I now have a decent grasp on how to go about  adding groups and setting material index values for plane geometries. Also much of what I have worked out here of course applies to buffered geometry in general also.

## 5 - Styling a plane as a checkered board in three.js r104 - r124 with face3

This is the older example for a checkered board plane geometry that I made when I first wrote this post, back then I was using three.hs r104, so this will likely break on newer versions of three.js.

When it comes to styling a plane that has some sections with it, doing so can be a little confusing, but might not prove to be to hard. I have found solutions on line at [stack overflow](https://stackoverflow.com/questions/22689898/three-js-checkerboard-plane) that will work okay in some situations but not others depending on the number of sections. I was able to work out a solution for this that seems to work okay with any combination of width and height sections though and in the section I will be going over just that.

### 5.1 - The checker helpers and face3

Here I have two functions that create a plane geometry that has the material index values set for each tile section in the plane. So in other words when the geometry is used with a mesh that has an array of materials the material index values of 0 and 1 will be used for every other tile section in the plane, just like that of a checker board pattern.

So now I can use my mkCheker to create a mesh that uses a plane geometry with the material index values set to the right values for each section in the plane.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    var mkCheckerGeo = function (w, h, sw, sh) {
        w = w === undefined ? 16 : w;
        h = h === undefined ? 16 : h;
        sw = sw === undefined ? 8 : sw;
        sh = sh === undefined ? 8 : sh;
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
    //-------- ----------
    // MESH
    //-------- ----------
    // standard checker
    var check = mkChecker({
        w: 5,
        h: 5
    });
    scene.add(check);
    check.position.set(-4, 0, 0);
    // odd checker
    var oddCheck = mkChecker({
        w: 4,
        h: 5,
        sw: 3,
        sh: 5
    });
    oddCheck.position.set(4, 0, 0);
    scene.add(oddCheck);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

## Conclusion

That will be it for now when it comes to plane geometry in three.js, I have a lot of other posts that I am getting around to editing a little, but I do not always have enough time to give every post the attention that it might need. The plane geometry works okay for what typically use if for, however as of late I often just use a box geometry to sever as a crude yet functional floor.
---
title: Making custom geometry in three.js
date: 2018-04-14 16:03:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 174
updated: 2018-04-14 20:28:44
version: 1.6
---

When working with [three.js](https://threejs.org/) there are many built in geometry constructors that can be used to quickly make many simple, common, solid shapes like cubes, and spheres. However when getting into making an actual three.js project rather than just yet another simple rotating cube demo, there is going to be a need for a way to make custom geometry.

<!-- more -->

There are ways of importing geometry from an external source that was created with a 3d modeling program like blender. However what is you want to make a geometry my way of some javaScript, rather than json data? This is where the Geometry constructor comes into play.


## What to know before hand.

I assume that you know a thing or two about javaScript, also it would be a good idea to [learn the basics](/2018/04/04/threejs-getting-started/) of three.js first if you have not. This is an advanced post on the [three.js Geometry constructor](https://threejs.org/docs/index.html#api/core/Geometry) that is an easy, but maybe not so efficient way of creating geometry that can be used in a Mesh that can be viewed, and worked with in a scene in three.js.

This post is also on the regular Geometry constructor, rather than BufferGeometry.

## Geometry vs BufferGeometry

In three.js there is [BufferGeometry](https://threejs.org/docs/index.html#api/core/BufferGeometry), and then regular [Geometry]((https://threejs.org/docs/index.html#api/core/Geometry)) constructors. The reason for this is that the regular Geometry constructor is easier to work with as the vertices, faces, and so forth are stored directly. However this comes at a performance loss.

Still if you are new to making custom geometry it would make sense to start with the regular Geometry first, then progress into the more advanced BufferGeometry to know how to make your projects run faster.

## BuferGeomeetry from Geometry

I will not be getting into buffered geometry and why it is faster, at least not in this post. I think that it is at least worth mentioning that there is a method of Buffered Geometry instance that can be used to create a Buffered Geometry from an instance of regular geometry. So it is possible to create something with the regular geometry constructor, and then just convert it later.

```js
var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
```

So don't worry about it to much, at least for now, as you might find the regular geometry constructor easier to work with.

## Basic three.js Geometry example.

The basic process is to first create an instance of Geometry by calling the constructor, and saving the instance of Geometry to a variable. Once you have your instance of Geometry you can now start adding some vertices to it, these are just points in space that are created using the [Vector3](https://threejs.org/docs/index.html#api/math/Vector3) constructor. 

After You have an array of vertices to work with you can start adding faces if it is a geometry that will be used with a Material that makes use of faces. This will be an array of Face3 instances that expect three arguments that are the index values of the vertices in which a face is to be drawn between 3 points. An easy way to do this is to think of it like connect the dots, each vertex has an index value to it, and you are just drawing triangles between them.

Once you have your vertices, and faces you might want to call computeVertexNormals, and normalize the geometry. More on that later.

Here is an example of what it is I am talking about here.

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(3, 2, 1);
    camera.lookAt(0, 0, 0);
 
    // GEOMETRY
    var geometry = new THREE.Geometry();
 
    // create an array of vertices by way of
    // and array of vector3 instances
    geometry.vertices.push(
 
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 1, 0),
 
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(0, 1, -1));
 
    // create faces by way of an array of
    // face3 instances. (you just play connect
    // the dots with index values from the
    // vertices array)
    geometry.faces.push(
 
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 0, 2),
        new THREE.Face3(4, 5, 6),
        new THREE.Face3(7, 4, 6),
 
        new THREE.Face3(0, 4, 1),
        new THREE.Face3(1, 4, 5),
        new THREE.Face3(3, 7, 2),
        new THREE.Face3(2, 7, 6));
 
    // compute Normals
    geometry.computeVertexNormals();
 
    // normalize the geometry
    geometry.normalize();
 
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
 
            // geometry as first argument
            geometry,
 
            // then Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            })));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

In this example I am repeating the use of Vector3, and Face3 constructors over and over again for each instance. However in more advanced examples you can of course get into making helper functions that will involve loops that will involve the use of these constructors in just one line of your code.

## Creating a helper method that returns a Geometry

As a project grows more complex it might be a good idea to make methods that create, and return a geometry, just like the build in constructors that do just that. To pull that off I just need to have a method that returns an instance of Geometry that is created by way of some javaScript rather than just hard coded data.

```js
(function () {
 
    var genPanes = function (count) {
 
        var geometry = new THREE.Geometry(),
 
        offset,
        pane,
        x = 0,
        y = 0,
        z = 0;
 
        count = count || 6;
 
        // generate vertices
        pane = 0;
        while (pane < count) {
 
            var i = 0,
            per = pane / count,
            len = 4;
            while (i < len) {
 
                x = Math.floor(i % 2) + pane * 1.5;
                y = Math.floor(i / 2);
                z = pane * per;
 
                geometry.vertices.push(new THREE.Vector3(x, y, z));
 
                i += 1;
            }
 
            pane += 1;
        }
 
        // generate faces
        pane = 0;
        while (pane < count) {
 
            offset = pane * 4;
 
            geometry.faces.push(
                new THREE.Face3(0 + offset, 1 + offset, 2 + offset),
                new THREE.Face3(3 + offset, 2 + offset, 1 + offset));
            pane += 1;
        }
 
        // compute Normals
        geometry.computeVertexNormals();
 
        // normalize the geometry
        geometry.normalize();
 
        return geometry;
 
    };
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
 
    // MESH with Geometry, and Basic Material
    scene.add(new THREE.Mesh(
 
            genPanes(20),
 
            // Material
            new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
            })));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## Normalizing Geometry

A common task to do when you have an off centered geometry, is to center it. In addition it may Also be desirable to have it set within a bounding sphere of area that has a radius of one, so that it is easily scaled up or down from there. To achieve this you will want to use the normalize method.

```js
    // creating a custom geometry
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
 
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(5, 5, 0),
        new THREE.Vector3(0, 5, 0));
    geometry.faces.push(
 
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(3, 0, 2));
 
    // geometry is not centered, and it ranges
    // out of the range of 1
    console.log(geometry.vertices[0].x); // 0
    console.log(geometry.vertices[1].x); // 5
 
    // normalize
    geometry.normalize();
    geometry.computeVertexNormals();
 
    // geometry is now centered to the origin
    // and is inside the range of one
    console.log(geometry.vertices[0].x); // -0.707...
    console.log(geometry.vertices[1].x); // 0.707...
```

This is typically what I will always want to do with a geometry, after all it is going to be placed in a Mesh, at which point I will use methods that come with the mesh to move, and rotate the geometry further from there. Having the geometry centered to the origin will only be relative to the instance of Geometry that will be in a Mesh, not the over all Scene.

In Other words think of this Geometry as being relative to the center of a Cube, or Sphere if you prefer, and then you are going to move and rotate this object in a Scene that might contain many such objects. So chances are you are going to want it centered to this relative origin, and scaled to a certain standard.

## Scale a geometry

If you want to scale a geometry, it can be done with the scale method. This is something that might typically be done only once if it is a static Geometry. There is also a scale method with the Mesh that will be available when using the geometry, this is what should be typically used in a loop.

```js
geometry.scale(5,5,1);
```

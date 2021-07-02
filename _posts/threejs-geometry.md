---
title: Making custom geometry in three.js
date: 2018-04-14 16:03:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 174
updated: 2021-07-02 12:14:53
version: 1.23
---

In [three.js](https://threejs.org/) there are ways of importing geometry from an external source that was created with a 3d modeling program like blender. However what if I want to make a geometry by way of some javaScript code, rather than external json data? This is where the [Geometry constructor](https://threejsfundamentals.org/threejs/lessons/threejs-custom-geometry.html) comes into play, or at least it did before version r125 of threejs. With that said, when I first wrote this post back in 2018 I was using threejs version r91 which had two constructor options for creating a custom geometry. One was the [Buffered Geometry](https://threejs.org/docs/index.html#api/core/BufferGeometry) constructor, and the other was the Geometry constructor. This post is on the plain Geometry constructor that is now deprecated as r125+ of threejs, so it would be best these days to look into my [post on the Buffer Geometry constrcor](/2021/04/22/threejs-buffer-geometry/) at this time.

<!-- more -->

There are many built in geometry constructors that can be used to quickly make many simple, common, solid shapes like cubes, and spheres. However when getting into making an actual three.js project rather than just yet another simple rotating cube demo, there is going to be a need to have a way to make custom geometry.

So then the examples here as of this writing will break in late versions of threejs. It might be possible to get the old Geometry constructor working on a later version of threejs at some point in the future by making use of a file in the examples folder of the threejs github repository. The same has happed in the past with other features that where removed from the core of threejs, however at this time it might be best to just not use the Geometry constructor, and just learn how to use the Buffered Geometry constructor alone.

For now I will be leaving this post up, however as of this writing the content here should only apply to situations in which one might still be using older versions of threejs where the code here will still not break. In late versions it will of course not work as it will result in calling undefined. I have been keeping an eye out for a javaScript file in the examples folder that will work for helping to get legacy code up and running fast, but for now it seems that there is no working official option for doing so.

## 1 - What to know before hand with three geometry

I assume that you know a thing or two about javaScript, also it would be a good idea to [learn the basics](/2018/04/04/threejs-getting-started/) of three.js first if you have not. This is a post on the three.js Geometry constructor that is an easy, but maybe not so efficient way of creating geometry that can be used in a Mesh that can be viewed, and worked with in a scene in three.js, or at least is was.

### 1.1 - THE GEOMETRY CONSTRUCTOR IS NO MORE as of threejs revision 125+

When it comes to using new versions of threejs that are of revision 125 or higher the Geometry constructor is no longer part of the core of threejs by itself. From now on it would make more sense to just directly work with buffered  geometry as the only alternatives would be to use older versions of threejs, or get the Geometry constructor to work again by making use of some additional external file.

## 2 - Geometry vs BufferGeometry

In three.js there is BufferGeometry, and then regular Geometry constructors. The reason for this is that the regular Geometry constructor is easier to work with as the vertices, faces, and so forth are stored directly. However this comes at a performance loss.

Still if you are new to making custom geometry it would make sense to start with the regular Geometry first, then progress into the more advanced BufferGeometry to know how to make your projects run faster.

## 3 - BuferGeomeetry from Geometry

Now that the Geometry Constructor has been deprecated this might not be a topic of interest when it comes to updating older code that made use of the Geometry Constructor. Having a quick, duck tape like solution for this might be nice for starters, but ultimately the best way to do so would be to just use the buffered Geometry constructor. Never the less I will be covering this here when it comes to any and all future edits of this post for what it is worth.

### 3.1 - The BufferGeomorty.fromGeomoty method

As of r125+ it would seem that this method has been removed from the core of threejs. As such in late versions of threejs this is no longer an effective way of converting an old Geometry constructor instance into a buffed geometry instance as it will result in calling undefined.

If by chance you are using an older version of threejs that has this method, then of course it should still work assuming that it is there.

```js
var bufferGeometry = new THREE.BufferGeometry().fromGeometry(geometry);
```


## 4 - Basic three.js Geometry example.

The basic process is to first create an instance of Geometry by calling the constructor, and saving the instance of Geometry to a variable. Once you have your instance of Geometry you can now start adding some vertices to it, these are just points in space that are created using the [Vector3](https://threejs.org/docs/index.html#api/math/Vector3) constructor. 

After You have an array of vertices to work with you can start adding faces if it is a geometry that will be used with a Material that makes use of faces. This will be an array of [Face3](/2018/05/11/threejs-face3/) instances that expect three arguments that are the index values of the vertices in which a face is to be drawn between 3 points. An easy way to do this is to think of it like connect the dots, each vertex has an index value to it, and you are just drawing triangles between them. However the order of the index values is important, so if you are running into issues that might be a reason why.

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

In this example I am repeating the use of [Vector3](/2018/04/15/threejs-vector3/), and [Face3](/2018/05/11/threejs-face3/) constructors over and over again for each instance. However in more advanced examples you can of course get into making helper functions that will involve loops that will involve the use of these constructors in just one line of your code.

## 5 - Creating a helper method that returns a Geometry

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

## 6 - Normalizing Geometry

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

## 7 - Scale a geometry

If you want to scale a geometry, it can be done with the scale method. This is something that might typically be done only once if it is a static Geometry. There is also a scale method with the Mesh that will be available when using the geometry, this is what should be typically used in a loop.

```js
geometry.scale(5,5,1);
```

## 8 - Conclusion

The geometry constructor was a good place to start when it comes to learning how to make custom geometry from code, and it still is when it comes to using older versions of threejs. However when it comes to working with later versions it is no longer an option, at least as of r125 for the moment. In the past when features where removed there was often files that would appear in the examples folder of the github repository that would bring that feature back by way of making that external file part of stack of a project. For example that was the case when it came to the removal of the 2d canvas renderer which can still be used, it is just no longer built into threejs itself. I assume that the same will happen with the Geometry constructor, and if so I will come around to editing this post again when it comes to using that.

 In time I will likely update this post at least a few times when and if I become aware of more options when it comes to transitioning from using the Geometry constructor to bufferedGeomorty only. 

Be sure to also read up more on [Vector3](/2018/04/15/threejs-vector3/), and [Face3](/2018/05/11/threejs-face3/) if you have not done so before hand as these are also important constructors that are related to the Geometry constructor in three.js.


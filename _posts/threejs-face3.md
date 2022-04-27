---
title: The Face3 constructor in three.js
date: 2018-05-11 12:58:00
tags: [js,three.js]
layout: post
categories: three.js
id: 185
updated: 2022-04-27 09:33:15
version: 1.30
---

The [Face3 constructor has been removed](https://github.com/mrdoob/three.js/pull/21161) in [three.js](https://threejs.org/) as of [revision 126](https://github.com/mrdoob/three.js/releases/tag/r126). Before that change the Face3 Constructor was used to define a Face when making a custom geometry with the [Geometry Constructor](/2018/04/14/threejs-geometry/) which has also been removed as of revision 125. It might still be possible to get the old geometry constructor working on new versions of threejs, but it would be best to make custom geometries with the [Buffered Geometry](/2021/04/22/threejs-buffer-geometry/) constructor when it comes to making use of late versions of threejs.

When using any kind of built in geometry, instances of Face3 are created automatically, or at least they where, and still are if you are using an older version of threejs. So whenever making a custom geometry from code, or trying to figure out some problems that may exist with how faces are being rendered it is necessary to understand a few things about Face3 when using the old Geometry Constructor. One of the main properties of interest with an instance of Face3 is the material index property, this comes into play when it comes to working with an array of materials, rather than just a single material when using a geometry with a Mesh Object. 

In new versions of threejs it is now the groups array of a geometry that would seem to be where these kinds of objects are now, and the use of the add group method is how to create them. This is still an old post on the face3 constructor, but when it comes to this edit, as well as many future edits this is what I am gong to start to write about at the top of the post, and start to push the older face3 stuff to the bottom of this content piece.

<!-- more -->

## The face3 constructor, and what to know before you continue reading

This is an advanced post on three.js which is a javaScript library that is used to work with things in 3d space. If you are new to three.js you might want to start with my [getting started post on three.js](/2018/04/04/threejs-getting-started/) first. Face3 is just one of several constructors of interest when making a custom geometry. Other constructors of interest are [Vector3](/2018/04/15/threejs-vector3/), and of course [Geometry](/2018/04/14/threejs-geometry/).

## MANY OF THE CODE EXAMPELS IN THIS POST BREAK IF YOU ARE USING A NEW VERSION OF THREEJS (r125+)

This is a post on the old Face3 constructor of the three.js library that is used to work with 3d graphics using javaScript. The code examples here might still work okay on older versions of threejs, but on newer versions of threejs the code will of course break. As of revision r125 the Geometry Constructor was removed, and as of revision r126 the Face3 constructor was also removed.

I will be looking into making some new examples where I am doing the same things that I wanted to get done when working with face3 but with the new versions of threejs where this class is no longer part of the core of the library. As I work out those examples I am sure I will get around to editing this post with new examples to do those things without Face3.

Still I might leave this post up for the sake of historical reasons, if you are still using older versions of threejs, or have found a way to add the Geometry and Face3 constructors back to three.js by way of some additional plug ins then the examples here should still work.

### Version numbers Matter

As of this writing three.js is a project that is still being developed fairly fast, so version numbers are of great concern. In this post I was using [three.js 0.91.0 aka r91](https://github.com/mrdoob/three.js/tree/r91/build) when I first make the source code examples, and the last version that I tested the threejs examples of face4 constructor with was r111. The last time I came around to doing some editing of this post I included one example that has to do with the groups property of a buffer geometry instance that would be the modern replacement for this, and with that example I was using r135.

### The source code examples here are on github

The source code examples here are [in my test threejs github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-face3) repository. When it comes to making a pull request that would be where to do so, there is also the comments of this post that can also be used as a way to bring something up.

### Other posts on related topics ( material index )

One of the main reasons I would bother with the Face3 constructor has to do with creating faces to begin with if they are not there. However even when using a built in geometry constrictor with the face3 objects in place to begin with, I might still want to change the material index value. So the Face3 class is closely related to working with an array of materials for a mesh rather than just one. In my post on [Mesh objects and working with an array of materials](/2018/05/14/threejs-mesh-material-index/) I have got around to touching base on how to use an array of materials with late versions of threejs using the groups array of a buffer geometry.

## 1 - Example of using Groups in r125+ (face3 replacement )

Now that the face3 constructor is a really old feature of threejs that only applies to revisions of threejs that are fairly out of date now I am thinking that I should have at least one example of the groups array that is what I am using as a replacement for the face3 class now. To get an index of what this is about one quick way to do so would be to use an array of materials for a mesh object and play around with the material index values of a box geometry that is used with the mesh.

```js
(function () { 
    // SCENE, CAMERA, RENDER
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // USING GROUPS
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    [ 0, 1, 2, 0, 1, 2 ].forEach( function(mi, i){
        geometry.groups[i].materialIndex = mi;
    });
    // MESH
    var mesh = new THREE.Mesh(geometry, [
        new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
        new THREE.MeshBasicMaterial( { color: 0x00ffff } ),
        new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    ]);
    scene.add(mesh);
    // render
    renderer.render(scene, camera);
}());
```

## 2 - Basic Example of Face3

For a basic demo of face3 I put together an example where I am just making a single triangle from an array of just three vertices. The Geometry constructor is used to create an instance of geometry, once I have that I will want to populate the instance of geometry with vertices by adding an array of Vector3 instances. Vector3 of course is another constructor that is used in three.js to create a point in space.

Once I have an array of vertices I will want a way to define faces that exist between them, this is where Face3 comes into play. The first three arguments given to Face3 are the index values in the vertices array that I want to make a triangular face with. The order of the index values does matter as it is used to determine the orientation of the face when it comes to rendering a texture to the face, more on that later.

So for now I have something like this:

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
 
    // vertices made with Vector3
    geometry.vertices = [
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(1, -1, 0),
        new THREE.Vector3(1, 1, 0)
    ];
 
    // face 3 arguments assigned to variable with comments
    var a = 0, // vert index a
    b = 1, // vert index b
    c = 2, // vert index c
    normal = new THREE.Vector3(0, 0, 1), // this sets the face normal
    color = new THREE.Color(0xffaa00), // sets a face color
    materialIndex = 0, // useful when working with an array of materials
 
    // FACE3 example
    face = new THREE.Face3(a, b, c, normal, color, materialIndex);
 
    //add the face to the geometry's faces array
    geometry.faces.push(face);
 
    // compute face and vertex normals
    geometry.computeVertexNormals();
    geometry.computeFaceNormals();
 
    // create a mesh using the geometry
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // adding face and vertex normals helper so I can
    // see what is going on with the normals
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - The order of indexes with face3

To some extent when making faces I am just playing connect the dots with vertices, but it is not always just that simple, as the order of index values does matter. When creating a mesh with the geometry, I also give a material. When it comes to materials there is the side property of a material which is used to set which side of a face3 instance that is to be rendered with the material. This property expects an integer value the default of which is stored in the [constant THREE.FrontSide](https://threejs.org/docs/#api/constants/Materials) which as of this writing is a value of zero.

What I am driving at here is that the order of the indexes is what is used to find out what side of the face is the front side. If you are running into some kind of weird issue where some of your faces are rendering and others are not it could be because you are not getting the index order right.

There are two ways of fixing this one is to just make it so both sides are always rendered no matter what by setting the side value of your material to THREE.DoubleSide. This will make it so that both sides of the face are always rendered with the material, but the best way of fixing this would be to just get the index order right.

### 3.1 - Setting Three.DoubleSide for the side property of the material

One way to address this problem is to just make it so that both side of a face will be rendered rater than just the front side of the face. However one major draw back of this is that it will eat up more overhead of course, so it really is best to just know how to set what side of a face is the front side.

```js
var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
}));
scene.add(mesh);
```

This is also just a useful property to be aware of for use with certain Models anyway, for example if I have a plane and I want a material rendered on both sides.

### 3.2 - Just getting the vertex index order right for the Face3 instances

The other way is to just get the index values right in which case the default THREE.FrontSide is not a problem when rendering. So it is a good idea to just figure out what the proper order is for the index values to given the the Face3 constructor.

Consider the following:

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.Geometry();
    // create an array of vertices by way of
    // and array of vector3 instances
    geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, -1, 0));
    // FACE3
    geometry.faces.push(
        new THREE.Face3(0, 1, 2),  // THIS IS FACING ONE WAY
        new THREE.Face3(5, 4, 3)); // THIS IS FACING THE OTHER WAY
    // compute Normals
    geometry.computeVertexNormals();
    geometry.computeFaceNormals();
    geometry.normalize(); // normalize the geometry
 
    // MESH with GEOMETRY, and Normal MATERIAL
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
    // renderer, camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

Notice that with the first instance of Face3 I am starting with index 0 then counting up, while with the other instance I am staring with the last index and counting backwards. This results in the Front side of both faces being on opposite sides relative to each other.

## 4 - The Material index property

If in case you did not know, it is possible to give an array of materials to the mesh constructor, rather than just one. In this case there should be some way to set which material should be used for which insistence of face3. For this there is the material index property of a face3 instance. So the process of having control over this is to just loop over the array of face3 objects, and set the desired material index value for each face.

Say for example I want to have a cube with three different materials that will each be used for three of the six sides of the cube. To pull that off I might do something like this:

```js
(function () {
    // an array of materials
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];
    // create the mesh
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // set material index values
    var len = materials.length;
    geometry.faces.forEach(function (face3, i) {
        face3.materialIndex = Math.floor(i % (len * 2) / 2);
    });
    // create the mesh
    var mesh = new THREE.Mesh(
            geometry,
            materials);
    // SCENE
    var scene = new THREE.Scene();
    // add mesh to scene
    scene.add(mesh);
    // some helpers
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
 
    // camera, orbit controls, renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

The value that I give to material index should be the index value of the material I want to use in the array of materials.

## Conclusion

The Face3 constructor is something that I might not need to bother with anymore, at least when it comes to using newer versions of threejs. There are only so many things that I might need to do when it comes to working with a geometry, or a mesh, and one of which is to set the material index values to use with each face of an object. The way to do that might have been to set the material index of face3 instances, but now with newer versions of threejs there is no Geometry of Face3 constructor, at least not in the core of the library. So a modern way of doing that must be followed in place of continuing to bother with older versions of threejs.


---
title: Capsule geometry in threejs
date: 2022-07-22 08:00:00
tags: [three.js]
layout: post
categories: three.js
id: 997
updated: 2022-07-22 08:52:34
version: 1.11
---

There are many built in geometry constructors in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) that can be used to create an instance of buffer geometry by way of calling a function and passing a few arguments to define certain aspects of the geometry that is created by way of a [javaScript constructor function](/2019/02/27/js-javascript-constructor/). One such option that I will be writing about today is the [capsule geometry constructor](https://threejs.org/docs/#api/en/geometries/CapsuleGeometry). This is a geometry that is like the cylinder geometry, but with a half sphere like cap on each side of the cylinder.

The nature of the capsule geometry is interesting as with a little code it can maybe be used as an alternative to tube geometry that often presents itself as a road block of sorts when learning how to use these various geometry constructors. One major reason why is because in order to use the tube geometry one will need to create an [instance of a curve](/2022/06/17/threejs-curve/) which is needed as the first argument when calling the tube geometry constructor. This might prove to be a little hard to work with as it is a way to create a 3d path by way of javaScript code purely by way of some logic, rather than say data for each point in space. So in this post I will be going over a basic getting started type example of the capsule geometry, but I will then also be looking into how to go about drawing a 3d path in space using a group of mesh objects where each mesh object contains a capsule geometry.

<!-- more -->

## Capsule Geometry and what to know first

This is not a getting started with threejs type post, let alone with javaScript in general as well. So I assume that you have at least some background with threejs to begin with, if not you might find this post hard to follow. Even if you have some background with threejs you might want to read up more on some additional topics before continuing with the rest of this post. In the opening of this post I mentioned the curve class as well as the tube geometry, which is one of many ways to go about drawing a something that is like a line in 3d space. However there are a number of other ways to do so that are also worth looking into when it comes to this sort of thing, some of wich I will be briefly covering in this section.

## 1 - Basic hello world style example of the capsule geometry

I always like to start out a post like this with a very basic getting started type example, so in this section I will be getting this one out of the way so I can then move on to the good stuff. Here as with any other quick simple threejs example I am creating a scene object, camera, and setting up a renderer. After that I will want to cerate a single mesh object ans add it as a child of the scene object and when doing so I will of course be using the capsule geometry constructor for this mesh object. When doing so the first argument is the radius of the capsule, followed by length, and values for the number of cap and radius sub divisions. When it comes to materials I am just going with the normals material for this example as I do not care to do anything fancy with light and textures for this example.

```js
// SCENE, CAMERA, RENDERER
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
// CREATEING A MESH WITH A CapsuleGeometry as The GEOMETRY
var mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 2, 20, 20),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
 
// RENDER THE SCENE
renderer.render(scene, camera);
```

## 2 - Group of mesh objects using the capsule geometry

Now that I have got the basic example out of the way it is time to start to get into some more involved examples. For this section I am starting to look into he idea of creating a kind of path in space with mesh objects and capsule geometries. The general idea of this is that I will have an array of vector3 class instances that each represent a point in space, and I will then need to create a capsule geometry with a length that is a distance between two of these vectors, and I will also need to set the rotation of the mesh object so that the geometry is facing the next vector in the array of vectors. One additional thing that needs to happen is that I need to find a way to get a vector that is between a current vector3 and the next vercor3 in the array, and I also often need to rotate the geometry in order to get things to work well with the look at method if that is the way that I am going to set the rotation value of each mesh object.

```js
//******** **********
// SCENE, CAMERA, RENDERER
//******** **********
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(-10, 5, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// GROUP OF MESH OBJECTS
//******** **********
// array of vector values
var vectors = [
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
];
// turn vectors array into an array of vector3 instances
vectors = vectors.map(function(a){
    return new THREE.Vector3( a[0], a[1], a[2] );
});
// create a group and add that to the scene
var group = new THREE.Group();
scene.add( group );
// make mesh objects and add them to the group
var i = 0,
thickness = 0.75,
len = vectors.length;
while(i < len - 1){
    var v = vectors[i],
    nv = vectors[i + 1],
    d = v.distanceTo(nv); // distance from current vector to next vector
    var mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(thickness, d, 10, 20),
        new THREE.MeshNormalMaterial({wireframe: true}));
    // position should be a mid point between v and nv
    var mv = v.add(nv).divideScalar(2);
    mesh.position.copy(mv);
    // adjust geo to work well with lookAt
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.lookAt(nv)
    // add to group
    group.add(mesh);
    i += 1;
}
//******** **********
// RENDER THE SCENE
//******** **********
renderer.render(scene, camera);
```

## Conclusion

The capsule geometry is then yet another built in way to go about creating a geometry for a mesh object. Although there may be some drawbacks with doing so I have found that the capsule geometry works okay for creating a tube like path in 3d space, but I am still thinking that the best way to go about doing this sort of thing would be to use curves and tube geometry, or some kind of sultion for doing so. 
---
title: Capsule geometry in threejs
date: 2022-07-22 08:00:00
tags: [three.js]
layout: post
categories: three.js
id: 997
updated: 2023-02-16 13:55:45
version: 1.24
---

There are many built in geometry [constructors](/2019/02/27/js-javascript-constructor/) in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) that can be used to create an instance of [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) by way of calling a function and passing a few arguments to define certain aspects of the geometry. One such option that I will be writing about today is the [capsule geometry constructor](https://threejs.org/docs/#api/en/geometries/CapsuleGeometry). This is a geometry that is like the cylinder geometry, but with a half sphere like cap on each side of the cylinder resulting in as the name suggests a kind of capsule like shape.

The nature of the capsule geometry is interesting as with a little code it can maybe be used as an alternative to tube geometry that often presents itself as a road block of sorts when learning how to use these various geometry constructors. One major reason why is because in order to use the tube geometry one will need to create an [instance of a curve](/2022/06/17/threejs-curve/) which is needed as the first argument when calling the tube geometry constructor. This might prove to be a little hard to work with as it is a way to create a 3d path by way of javaScript code purely by way of some logic, rather than say data for each point in space. There are some built in curve classes that help make working with tube geometry easier, but again this capsule geometry can be used to create a kind of crude alternative to that.

In this post I will be going over a basic getting started type example of the capsule geometry, but I will then also be looking into how to go about drawing a 3d path in space using a group of mesh objects where each mesh object contains a capsule geometry.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/2iJYFI6axsY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Capsule Geometry and what to know first

This is not a [getting started with threejs](/2018/04/04/threejs-getting-started/) type post, let alone with javaScript in general as well. So I assume that you have at least some background with threejs to begin with, if not you might find this post hard to follow. Even if you have some background with threejs you might want to read up more on some additional topics before continuing with the rest of this post. In the opening of this post I mentioned the curve class as well as the tube geometry, which is one of many ways to go about drawing a something that is like a line in 3d space. However there are a number of other ways to do so that are also worth looking into when it comes to this sort of thing, some of which I will be briefly covering in this section.

### Read up more on the Vector3 class

In the more advance examples that I am writing about in this post I am making heavy use of [Vector3 class features](/2018/04/15/threejs-vector3/). This is a major class in threejs that has to do with a state of a vector in 3d space. It is useful for many various tasks that have to do with specific points in space, as such it is used for things like the position property of anything based off of the [obect3d base class](/2018/04/23/threejs-object3d/) such a [mesh objects](/2018/05/04/threejs-mesh/).

### There is also the Line constructor for drawing lines in space

Another option for drawing lines in space would be the [THREE.Line constructor](/2018/04/19/threejs-line/) that can easily be used to draw a line in space with an array of points rather that an instance of the curve class. However one major drawback of this is that it will only work with line materials rather than mesh materials. So if I want to add texture and various maps and make use of other feature sin the various mesh materials I will want to use tube geometry, or make use of some kind of solution that involves a collection  of mesh objects using the capsule geometry.


### Source code can also be found on Github

The source code examples that I am writing about in this post as well as my [many other posts on threejs](/categories/three-js/) can be found in [my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-capsule-geometry).

### Version Numbers matter

When I first wrote this post I was using r140 of threejs with the source code examples and things where working fine on my end with that version of the library. This capsule geometry constructor is still a fairly new feature in threejs and as such the source code examples here will break on any version of theejs that is older than [r139 as that is the revision at which this capsule geometry feature was added to the core of treejs](https://github.com/mrdoob/three.js/releases/tag/r139).

## 1 - Basic hello world style example of the capsule geometry

I always like to start out a post like this with a very basic getting started type example, so in this section I will be getting this one out of the way so I can then move on to the good stuff. Here as with any other quick simple threejs example I am creating a scene object, camera, and setting up a renderer. After that I will want to cerate a single mesh object and add it as a child of the scene object and when doing so I will of course be using the capsule geometry constructor for this mesh object. When doing so the first argument is the radius of the capsule, followed by length, and values for the number of cap and radius sub divisions. 

When it comes to materials I am just going with the [mesh normal material](/2021/06/23/threejs-normal-material/) for this example as I do not care to do anything fancy with light and textures for this example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATEING A MESH WITH A CapsuleGeometry as The GEOMETRY
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.5, 2, 20, 20),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// RENDER THE SCENE
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Group of mesh objects using the capsule geometry setting length of geometry as distance between vectors instances

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

## 3 – Animation loop example that works by updating object3d values

Say I would like to make an animation in which I have two sets of vectors and I would like to lerp between them to create a current third set of vectors. This third set of vectors would then be used to update the state of the group of capsule geometry mesh objects.

There are two general ideas that come to mind when it comes to this one of which would be to create a new geometry on each update and set the state of the geometry of each mesh object to this new geometry, while the other would just one a single geometry for all mesh objects and just scale the mesh object rather than creating a new geometry for each mesh object each time. For this section I am doing the deal that involves just scaling.

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
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-3, 6, 0).normalize();
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.03))
//******** **********
// HELPERS
//******** **********
// update a capsule line group with the given array of vector3 class instances
var updateCapsuleLine = function(group, vectors, thickness){
    // defaults for arguments
    vectors = vectors || [];
    thickness = thickness === undefined ? 0.25: thickness;
    var i = 0,
    len = vectors.length;
    while(i < len - 1){
        var v = vectors[i] || new THREE.Vector3(),
        nv = vectors[i + 1] || new THREE.Vector3(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        var mesh = group.children[i];
        // set scale
        mesh.scale.set(thickness, thickness, d / 2.0);
        // position should be a mid point between v and nv
        var mv = v.clone().add(nv).divideScalar(2);
        mesh.position.copy(mv);
        //  and set rotation
        mesh.lookAt(nv);
        i += 1;
    }

};
// create and return a new group of mesh objects using the capsule geometry
// using a aray of vector3 class instances
var createCapsuleLine = function(vectors, material, capsuleGeo){
    // defaults for arguments
    vectors = vectors || [];
    material = material || new THREE.MeshNormalMaterial({});
    capsuleGeo = capsuleGeo || new THREE.CapsuleGeometry(0.25, 1.5, 20, 20);
    // create a group and add that to the scene
    var group = new THREE.Group();
    // make mesh objects and add them to the group
    var i = 0,
    len = vectors.length;
    while(i < len - 1){
        var v = vectors[i] || new THREE.Vector3(),
        nv = vectors[i + 1] || new THREE.Vector3(),
        d = v.distanceTo(nv); // distance from current vector to next vector
        var mesh = new THREE.Mesh(
            capsuleGeo,
            material);
        // adjust geo to work well with lookAt
        mesh.geometry.rotateX(Math.PI * 0.5);
        group.add(mesh);
        i += 1;
    }
    // update for first time
    updateCapsuleLine(group, vectors, 1);
    // return the group
    return group;
};
// array of array of axis values to array of Vector3 class instances
// if it is all ready an array of vector3S then return clones
var vectorArrayToVector3Array = function(vectorArray){
    return vectorArray.map(function(a){
        if(a instanceof Array){
            return new THREE.Vector3( a[0], a[1], a[2] );
        }
        // assume that it is all ready a Vector3 and return a clone
        return a.clone();
    });
};
//******** **********
// VECTORS AND CAPSULE GROUP ONE
//******** **********
var vectors1 = vectorArrayToVector3Array([
    [0, 0, 0 ],
    [ 0, -5, -5 ],
    [ 0, -5, 0 ],
    [ 0, 1, 4 ],
    [ 4, 1, 4 ],
    [ 4, 5, 4 ],
    [ 4, 5, -5 ],
    [ -5, 5, -5 ]
]);
var vectors2 = vectorArrayToVector3Array([
    [0, 3, 0 ],
    [ 10, -6, -8 ],
    [ -5, -5, 0 ],
    [ 0, -2, 4 ],
    [ 8, 1, 4 ],
    [ 0, 5, 4 ],
    [ 4, 6, -5 ],
    [ -5, -5, -5 ]
]);
var vectors = vectorArrayToVector3Array(vectors1);
var g1 = createCapsuleLine(vectors, new THREE.MeshStandardMaterial());
scene.add( g1 );
//******** **********
// LOOP
//******** **********
var fps = 30,
lt = new Date(),
frame = 0,
maxFrame = 300;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps){
        // lerp between vectors1 and vectors2 for vectors
        vectors = vectors.map(function(v, i){
            var v1 = vectors1[i],
            v2 = vectors2[i];
            return v1.clone().lerp(v2, bias);
        });
        // update g1 with current state of vectors
        updateCapsuleLine(g1, vectors, 2 - 1.5 * bias);
        // render, step frame
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

Although this seems to work okay the capsules start to look more like weird oval like shapes. So I might want to look into making a similar example to this that involves creating a new geometry for each mesh object on each update.

## Conclusion

The capsule geometry is then yet another built in way to go about creating a geometry for a mesh object. Although there may be some drawbacks with doing so I have found that the capsule geometry works okay for creating a tube like path in 3d space, but I am still thinking that the best way to go about doing this sort of thing would be to use curves and tube geometry, or some kind of solution for doing so. 

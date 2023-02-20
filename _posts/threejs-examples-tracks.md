---
title: Train Track threejs module project example
date: 2023-02-17 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 1028
updated: 2023-02-20 13:56:06
version: 1.6
---

When it comes to my beta world collection of videos I have started a timer video project that involves a train that goes along a track. There is a lot that I like about this project, but also a whole lot that I would change if I where to start over. Anyway one thing about the project is that I have the land all as one big solid geometry, then I worked out a curve path for a train to go along on top of the single geometry in the single mesh. This seems to work okay, but if I where to start to make another video project like this, and then another, and so forth I would like to make some other kind of system for this. Mainly I do not think that I would want to have one solid geometry, but rather a collection of source objects to which I clone, and adjust one by one as a way to create an over all scene. So with that said this [threejs project example](/2021/02/19/threejs-examples/) is about a module that has some methods that can be used to create such a project.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/bGTK8ezC8Hk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The tracks threejs module example and what to know first

This is a post on a javaScript module that I use on top of threejs to create a kind of train track like project that can be used to create a single curve path. I can then use this curve path to move one or more mesh objects along to create a kind of train set like project then. This is not a post for people that are new to threejs and javaScript then, but rather for people that have at least some background with these things are a looking for project ideas. I will not be getting into the very basics of what should be known before hand here then, but I think I should at least write about a few things that you might want to read up more on here in this opening section.

### Check out more on curves if you have not done so yet

There are a few built in options for classes that extend the [base curve class](/2022/06/17/threejs-curve/) in threejs that work great and as such help to save a lot of time compared to making a custom curve class. In fact what I am writing about here is me continuing with what I started with my [post on the cubic bezier curve3 class](/2023/02/10/threejs-curves-cubicbeziercurve3/) that I wrote last week.

### Know a thing or two about the user data object, and other object3d class features

My tracks module makes use of the [user data object](/2021/02/16/threejs-userdata/) of the [object3d class](/2018/04/23/threejs-object3d/) as a way to park some data that is used by the various methods of the tracks module. The object3d class is the base class of mesh objects, cameras, and anything else that would be added to a scene object as a child. Also scene objects themselves are examples of objhect3d class based objects. However not everything in threejs is an object3d based object such as curves, which is where I make use of the user data object as a way to store a curve for each source object. However when it comes to using the curve object from a cloned copy the position of the curve will be relative to worked space, so to fix this I create new curves from this curve objects but add the [position of the parent object](/2022/04/04/threejs-object3d-position/) to the values of the curve stored in the user data object to do so.

### Source code is also up on Github

The source code exmaples here can also be found in my [test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-tracks). This is also where I store the source code for all the various [other blog posts that I have wrote on threejs](/categories/three-js/) thus far as well.

### Version numbers matter

When I was working on this project last I was using r146 of threejs.

## 1 - The first version of the tracks module, and some demos

For this first section I will be writing about what I have when it comes to the very first version of this tracks module. Also I will want to have at least a few demos to test out that the core features that I have in place all ready work okay before even toying with the idea of making my first revision of this or not. There is a lot more that I would want to add and change at this point, but for this first version at least I wanted to just make sure that the very crude basic idea that I had in mind will work out okay. Thus far it would seem that it does.

### 1.a - The tracks module \( R0 \)

This first version of the tracks module is then yet another one of my modules that follows the tired old IIFE pattern. There are three public methods of the module, one to create source objects, another to create a track object from a collection of source objects, and one last method to create the final track curve. Each source object has a curve that is attached to the user data object of the source object. The process of creating a final track curve then is to run over all the objects created from the source objects, and then create a copy of the curve stored in the track object. There is then creating a new curve from the values of the source curve but adding the position of the track object as well.


```js
/*  tracks.js - r0 - from threejs-examples-tracks
 *
 */
( function(api){
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // I like to think in terms of deltas from center of what would be a string line
    const createCurve = (v_start, v_end, v_d1, v_d2) => {
        v_d1 = v_d1 || new THREE.Vector3();
        v_d2 = v_d2 || new THREE.Vector3();
        const v_c1 = v_start.clone().lerp(v_end, 0.25).add(v_d1);
        const v_c2 = v_start.clone().lerp(v_end, 0.75).add(v_d2);
        return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
    };
    // rotate a curve
    const rotateCurve = (curve, r, negateX, negateZ) => {
        r = r === undefined ? 0 : r;
        negateX = negateX === undefined ? false : negateX;
        negateZ = negateZ === undefined ? false : negateZ;
        let vi = 0;
        while(vi < 4){
            const v = curve['v' + vi];
            const e = new THREE.Euler();
            e.y = Math.PI * 2 / 4 * r;
            v.applyEuler(e);
            const v3_negate = v.clone().negate();
            if(negateX){
               v.set(v3_negate.x, v.y, v.z );
            }
            if(negateZ){
               v.set(v.x, v.y, v3_negate.z );
            }
            vi += 1;
        };
    };
    // ---------- ----------
    // PUBLIC API
    // ---------- ----------
    // create a source object
    api.createSourceObject = (w, d, sx, sz, ex, ez, dx1, dz1, dx2, dz2 ) => {
        const obj1 = new THREE.Group();
        const gud = obj1.userData;
        const v_start = new THREE.Vector3(sx, 1.0, sz);
        const v_end =  new THREE.Vector3(ex, 1.0, ez);
        const v_d1 =  new THREE.Vector3(dx1, 0.0, dz1);
        const v_d2 =  new THREE.Vector3(dx2, 0.0, dz2);
        gud.curve = createCurve(v_start, v_end, v_d1, v_d2);
        obj1.add( new THREE.Mesh( new THREE.BoxGeometry(w, 1, d), new THREE.MeshNormalMaterial()) )
        //const geo_points = new THREE.BufferGeometry().setFromPoints( gud.curve.getPoints(19) );
        //obj1.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
        return obj1;
    };
    // create a curve to be used as a track curve from a tack object
    api.createTrackCurvePart = (obj_track) => {
        const c1 = obj_track.userData.curve;
        const v_objpos = new THREE.Vector3();
        obj_track.getWorldPosition(v_objpos);
        const v_start = v_objpos.clone().add(c1.v0);
        const v_c1 = v_objpos.clone().add(c1.v1);
        const v_c2 = v_objpos.clone().add(c1.v2);
        const v_end = v_objpos.clone().add(c1.v3);
        return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
    };
    // create a track object for the scene
    api.createTrackObject = (group_source, index, x, z, dy, r, negateX, negateZ) => {
        dy = dy === undefined ? 0 : dy;
        const obj_source = group_source.children[index];
        const track = obj_source.clone();
        track.userData.curve = obj_source.userData.curve.clone();
        track.position.set(x, 0.5 + dy, z);
        track.rotation.y = Math.PI * 2 / 4 * r;
        rotateCurve(track.userData.curve, r, negateX, negateZ);
        return track;
    };
}( this['trackMod'] ={} ));
```

### 1.1 - A tracks module hello world demo in which I have a kind of oval loop

For my first hello world type example I would like to make a simple kind of oval loop track using just two source objects. One is a kind of straight track object, and the other is a single kind of turn object. To create my track then I just need to work out an array of argument values to pass to the create track object method of the track module.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SOURCE OBJECTS - The source objects that I will be using to create a track
// ---------- ----------
const group_source = new THREE.Group();
group_source.add( trackMod.createSourceObject(1.0, 4.0,   0.0,-2.0,    0.0, 2.0,   0.0, 0.0,  0.0, 0.0) );
group_source.add( trackMod.createSourceObject(4.0, 4.0,   1.5,-2.0,   -2.0, 1.5,   0.8, 0.8,  1.8, 1.0) );
// ---------- ----------
// TRACK OBJECTS - creating the tracks objects from the source objects
// ---------- ----------
const curve = new THREE.CurvePath();
[
    [0,  4.5, -1.0,  0.0,  0],
    [1,  3.0,  3.0,  0.0,  0],
    [0, -1.0,  4.5,  0.0,  3],
    [1, -5.0,  3.0,  0.0,  3],
    [0, -6.5, -1.0,  0.0,  2],
    [1, -5.0, -5.0,  0.0,  2],
    [0, -1.0, -6.5,  0.0,  1],
    [1,  3.0, -5.0,  0.0,  1]
].forEach((data)=>{
    const track = trackMod.createTrackObject(group_source, data[0], data[1], data[2], data[3], data[4]);
    scene.add(track);
    curve.add( trackMod.createTrackCurvePart(track) );
});
// curve
//const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
//scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(8,8,8);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    //const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const a3 = ( a1 * 0.94 + 0.05 ) % 1;
    mesh.position.copy( curve.getPoint(a1) );
    mesh.lookAt( curve.getPoint( a3 ) );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

### 1.2 - Testing out the flip feature

So there is rotating the source objects, but I have found that I am also going to want to negate the curves as well while I am at it. For this demo I am then testing out not just the rotation of the curves, but also the features that have to do with flipping the curves by making use of the vector3 negate method.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SOURCE OBJECTS - Just want one source object for this flip demo that is a single turn
// ---------- ----------
const group_source = new THREE.Group();
group_source.add( trackMod.createSourceObject(4.0, 4.0,   1.5,-2.0,   -2.0, 1.5,   0.8, 0.8,  1.8, 1.0) );
// ---------- ----------
// TRACK OBJECTS - creating the tracks objects from the source objects
// ---------- ----------
const n = 6;
const curve = new THREE.CurvePath();
[
    [0,   9.0,  2.0,  0.0,  0, false, false],
    [0,   5.0,  5.0,  0.0,  1, true, false],
    [0,   2.0,  9.0,  0.0,  0, false, false],
    [0,  -2.0,  9.0,  0.0,  3, false, false],
    [0,  -5.0,  5.0,  0.0,  2, true, false],
    [0,  -9.0,  2.0,  0.0,  3, false, false],
    [0,  -9.0, -2.0,  0.0,  0, true, true],
    [0,  -5.0, -5.0,  0.0,  1, false, true],
    [0,  -2.0, -9.0,  0.0,  0, true, true],
    [0,   2.0, -9.0,  0.0,  3, true, true],
    [0,   5.0, -5.0,  0.0,  2, false, true],
    [0,   9.0, -2.0,  0.0,  3, true, true]
].forEach((data)=>{
    const track = trackMod.createTrackObject(group_source, data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
    scene.add(track);
    curve.add( trackMod.createTrackCurvePart(track) );
});
// curve
const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(15, 15, 15);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 200;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a3 = ( a1 * 0.94 + 0.05 ) % 1;
    mesh.position.copy( curve.getPoint(a1) );
    mesh.lookAt( curve.getPoint( a3 ) );
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

Although what I have thus far with this is looking good I am sure that there is a lot that I will want to refine, and add with at least one revision before I even think about making any kind of real project with this. I hope that i do get around to making at least an R1 of this as I find this to be a fun project thus far. However I do have a lot of other things that I need to focus on, so I might not get the time.



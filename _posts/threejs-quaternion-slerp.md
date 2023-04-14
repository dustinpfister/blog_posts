---
title: Quaternion slerp method
date: 2023-04-14 08:34:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1036
updated: 2023-04-14 10:22:41
version: 1.6
---

The [slerp method of the quaternion class in threejs](https://threejs.org/docs/#api/en/math/Quaternion.slerp) is a way to go about transitioning from one quaternion state to another. The method can be called off of an instance of a quaternion object, then another quaternion object to transition to can be given as the first argument, followed by an alpha value. The alpha value is then a number between 0 and 1 that is used to transition the quaternion object. This slerp method will mutate in place, however it can be used in conjunction with other methods like copy and clone to address that.

<!-- more -->

## The slerp method of the quaternion class and what to know first

In this post I am writing about just one little method of a Quaternion class in the javaScript library known as threejs. There is then a whole lot of things that I assume that you know a thing or two about before hand if not you might want to do some additional reading before reading the rest of this post. I have [getting started posts on threejs](/2018/04/04/threejs-getting-started/) and [javaScript in general](/2018/11/27/js-getting-started/), but there is also a lot of other things that I should write about in this first what to know first type section.

### Read My main blog post on the quaternion class

I have wrote a [main blog post on the Quaternion class in general](/2023/03/24/threejs-quaternion/) that you might want to read if you are new to this kind of class. Getting started with these was a little intense, but there is only so much to be aware of when it comes to getting started with a core set of methods and using these to help with tasks that have to do when setting the orientation of obejcts.

### Start out with Object3d.lookAt, Euler, and Buffer Geometry Rotation Methods

Quaternion objects are a more advanced option for setting the orientation of things in threejs. There are situations that come up where one of these kinds of objects will help, but still there are easier to work with options that one should know about first before getting into these kinds of objects. When it comes to [Object3d class based objects](/2018/04/23/threejs-object3d/) there is the [Object3d.lookAt](/2021/05/13/threejs-object3d-lookat/) method and the [Object3d.rotation](/2022/04/08/threejs-object3d-rotation/) property that stores and instance of the [Euler class](/2021/04/28/threejs-euler/) for setting the local rotation of an object. Also when it comes to mesh objects there is also the geometry of the mesh and with that there are a [number of rotation methods in the buffer geometry class](/2021/05/20/threejs-buffer-geometry-rotation/) for preforming a rotation on geometry rather than an object3d class based object such as mesh, camera, and so forth.

### Source code is up on Github

The source code examples that I am [writing about here can also be found up on github in my test threehs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-quaternion-slerp). This is also where I park the source code examples for my many [other blog posts on threejs](/categories/three-js/) that I have wrote thus far.

### Version Numbers matter

When I first wrote this blog post I was using r146 of threejs. There is a whole lot that has changed from older revisions of threejs, and also looking forward it would seem that many more code breaking changes will also happen in the future as well. Always be mindful of what the revision number of threejs is being used when looking at source code examples on various resources as this is a very fast moving project still.

## 1 - Basic example of the slerp method

For this first basic example of the slerp I create two quatrenion objects and slerp from one to another when setting the quaternion state of a mesh object. To create these quaternion objects I am making use of the set from axis angle method to do so as one way or another I need to set the state of the objects first. Once I have two quaternion objects I can then use them to update the quaternion object of the mesh object by copying the first quaternion to the quaternion of the mesh, after which I can then call the slerp method and pass the second one. I then pass an alpha value as the second argument for the slerp method of 0.5 which should result in the state of the mesh object being between the two quaternions and it is.

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
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    material);
scene.add(mesh);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const axis1 = new THREE.Vector3(0,1,0);
const q1 = new THREE.Quaternion().setFromAxisAngle(axis1, 0);
const axis2 = new THREE.Vector3(1,0,0);
const q2 = new THREE.Quaternion().setFromAxisAngle(axis2, THREE.MathUtils.degToRad(90) );
mesh.quaternion.copy(q1).slerp(q2, 0.5)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3,3,3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 2 - loop demo

I started a loop demo of this kind of method to gain a better sense of how this can be used to slerp from one to another. I have a very general idea of what I wanted working but I will need to get around to refining this more at some point. The basic idea here is to create an array of quaternion objects and then slerp between a current index, and the next index. In the event that an index goes out of range it wraps back around to the starting index. So then I am using the from array method of the vector3 class along with the map array prototype method as well as the set from unit vectors method of the quatrenion class to create the array of quaternion objects that I want.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const canvas_3d = renderer.domElement;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 20, 20),
    new THREE.MeshNormalMaterial({ wireframe: true}));
scene.add(mesh);
// ---------- ----------
// QUATERNION OBJECTS ARRAY
// ---------- ----------
const q_array = [
    [ [0,1,0], [0,1,0] ],
    [ [0,1,0], [1,0,0] ],
    [ [0,1,0], [0,0,1] ],
    [ [0,1,0], [0,1,0] ]
].map(( (data) => {
    const v1 = new THREE.Vector3().fromArray(data[0]).normalize();
    const v2 = new THREE.Vector3().fromArray(data[1]).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(v1, v2);
    return q;
}));
// ---------- ----------
// UPDATE HELPER
// ---------- ----------
const rotateWithQarray = (obj3d, q_array, a1) => {
    const len = q_array.length;
    const i = Math.round( ( len - 1 ) * a1);
    const q1 = q_array[ i ];
    const q2 = q_array[ (i + 1) % len];
    let a2 = len * a1 % 1;
    obj3d.quaternion.copy(q1).slerp(q2, a2);
};
// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, canvas_2d);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 100,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    rotateWithQarray(mesh, q_array, a1);
};
const render2d = (sm) => {
    ctx.clearRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

The basic idea of this loop demo is working okay in the sense that the slerp method is indeed slerping between two quaternion objects. There is just maybe a bit more that I would like to do when it comes to setting the starting state of each rotation using the slerp method. One way might just have to involve having two sets of unit vectors, one for a start state and then another to lerp to. However I might also be able to work something out using the premultiply method as that often comes in handy when I am in a situation in which I need to preform a few rotations rather than just one.

## Conclusion

The slerp method then might come in handy often when working with these quaternion objects, and then as such it might prove to be a kind of core set of must know methods with the class. There are a few other methods that are very impotent thought such as the set from axis angle method which is a good option for setting the state of a quarenion in order to have one to slerp to begin with. There are some other options for that though such as the [set from unit vectors method](/2023/04/07/threejs-quaternion-setfromunitvectors/) which also works well for setting the state of quaternion objects as well.

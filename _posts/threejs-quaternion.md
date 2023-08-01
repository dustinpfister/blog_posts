---
title: Quaternion rotation objects in threejs
date: 2023-03-24 06:28:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1033
updated: 2023-08-01 13:44:09
version: 1.23
---

There is a lot of ground to cover when it comes to [quaternions in threejs](https://threejs.org/docs/#api/en/math/Quaternion), but one has to start somewhere with them so here we are. Quaternions and prove to be very confusing at first compared to what you might be used to for setting rotations, but with a little effort some of that confusion can be addressed to get to at least a basic, functional , level of understanding. They are far more complex than Euler objects, but that complexly is justified for some situations that can come up when working on projects.

When it comes to setting the rotation of an object such as a mesh object, camera, or any kind of object3d based object one might just use the [look at method of the object3d](/2021/05/13/threejs-object3d-lookat/) class and move on with ones life. No judgment with that, it is a very useful method, I use it all the time myself. However I do so with an understanding that the look at method does have some limitations when it comes to setting the rotation of an object. The same can be said of directly working with the rotation property that stores the current object rotation in the form of a Euler object. Euler objects might be easy to understand in terms of what the deal is with the public properties of such objects, but I pay a price for that simplicity and can end up dealing with problems like [Gimbel lock](https://en.wikipedia.org/wiki/Gimbal_lock).

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/4X4qaK0ei28" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Quaternion objects and what to know first

In this post I am writing about [Quaternion](https://en.wikipedia.org/wiki/Quaternion) in the form of Quaternion class objects in the javaScript library known as threejs. This is not in any way a [getting started post on threejs](/2018/04/04/threejs-getting-started/), the javaScript programming language, and other basic skills that are required before hand. In the basic section of this post I do try to keep the source code examples as simple as possible, but it should go without saying that I am making a lot of assumptions here. It is okay if you find this subject a little overwhelming at first because this is very much a more advanced subject compared to a lot of other features of threejs. In any case, regardless of skill level or experience, you might want to learn more, or refresh on a few things first.

### Start with Euler angles, buffer geometry rotation methods, and Object3d.lookAt first if you are new to rotations

If you are still fairly new to threejs and you have not looked into things like the [Euler class](/2021/04/28/threejs-euler/), and the [Object3d.lookAt](/2021/05/13/threejs-object3d-lookat/) method I would suggest that would be a good starting point first. Working with those features are a whole world easier, it is only when you start to run into problems with them that you might want to start looking into alternatives to those features. Also when it comes to geometry there are a number of [rotation methods in the buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/) class. Using those methods might be expensive in terms of system resources, but they are often used just once to adjust the state of a geometry, and in any case they are another way to go about rotating things.

### The source code examples here are also on github

I have the source code examples that I am writing about here up on my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-quaternion). This is also where I park all the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well. In addition cloning down the repo, installing the packages, and starting the server might be the fastest way to get these examples as well as the many others working on your end.

### Version Numbers matter

When I first wrote this post I was using [r146 of threejs, and as such the examples follow the style rules that I have set for that revision](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). With that said I am still using old script tags over that of JSM with these examples. There are a lot of other little details with this revision, why I am not moving forward with newer revisions at this time at least with editing older content, and the direction that threejs is going in general. I will not be getting into those details in depth here of course however in any case I have found that I just need to always have a little section such as this to make it clear what the deal is with this sort of thing.

If you used threejs as long as I have then you know what the deal is, if not threejs is a fast moving project and code breaking changes are made to if often. Always be aware of what revision you are using and of possible what revision an author of content on threejs was suing when they wrote or updated the post last.

## 1 - Some basic getting started examples of Quaternion objects

In this section I will be writing about some basic examples of quaternions. However I think that I have to say that even when it comes to basic examples of quaternions things might prove to be not so basic. They are a little complex and that is just simply the nature of them compared to Euler objects. However they are still only so hard and with a little effort you can at least understand what the deal is with the public properties of these kinds of objects. SO I think that will be the main thing that I will focus on in this basic section.

### 1.1 - Directly setting the quaternion of a mesh object using the set from axis method

When it comes to mesh objects, and any object3d class based object for that matter, there is directly working with the [quaternion property of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.quaternion). This is an alternative to the [object3d rotation property](/2022/04/08/threejs-object3d-rotation/) which is an instance of Euler rather than that of quaternion. As such any change to the quaternion object3d property should also update the state of the rotation property and vice versa as they are both ways to getting and setting the local rotation of an object.

Maybe the best way to get started with quaternion objects would be to start working with the set from axis angle method of the quaternion class. There is also directly working with the various properties, but doing so is not as easy as what you might be used to with the Euler class, more on that later in this section. For now there is just calling the set from axis angle method off of the quaternion property and passing a vector3 object that will be used to define the direction of the axis, and then an angle in radians. 

Two points about these argument values to keep in mind, the vector3 normalize method and unit conversion of angles. The Vector3 object that is passed to the set from axis angle method should be normalized to a vector unit length of 1. That was the case to begin with but I am doing it anyway as a way to help be clear about this. If you are fuzzy on what what this is about then it might be a good idea to read up more on the [Vector3 normalize method](/2021/06/14/threejs-vector3-normalize/), and about vectors in general. When it comes the the angle value the method expects a radian value, if you would like to work with degrees then there is working out the simple expressions of making use of functions that there are to work with in the [math utils object](/2022/04/11/threejs-math-utils/) to help with this kind of conversion.

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
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const axis = new THREE.Vector3( 1, 0, 0 );
const degree = 45;
mesh1.quaternion.setFromAxisAngle( axis.normalize(), THREE.MathUtils.degToRad(degree) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.2 - The deal with setting properties directly

Thus far when it comes to setting the rotation of an object I often end up just using the look at method or directly work with the Euler class instance stored in the rotation property. When working with a Euler object is is fairly easy to just directly mutate the public properties of the object. Each axis value of a Euler object is just simply a radian value so I just need to set a value in that range for x, y, and z and that is all there is to it. However doing the same with a quaternion is not so easy, and this is one thing that one should be aware of right away when starting to work with this kinds of objects. 

If you are like me and you want to know how to directly work with these properties then maybe a good idea for a starting point would be to [look at the source code for the set from axis angle method](https://github.com/mrdoob/three.js/blob/r146/src/math/Quaternion.js). At least this is what I did in order to start to get a better idea of what is going on here. For this demo I have a set rotation by axis helper function that works in a very similar way to that of the set from axis angle method. The reason why is because it is based on the actual threejs source code that is used for the method. I just made a few very simple changes that have to do with things like normalizing the given axis vector3 object and tagging a degree rather than radian value.

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
// Helpers
// ---------- ----------
const setRotationByAxis = (q, v_axis, n_degree) => {
    const vector = v_axis.normalize();
    const radian = THREE.MathUtils.degToRad(n_degree);
    const halfAngle = radian / 2, s = Math.sin( halfAngle );
    q.x = vector.x * s;
    q.y = vector.y * s;
    q.z = vector.z * s;
    q.w = Math.cos( halfAngle );
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.CylinderGeometry(0, 0.25, 1), new THREE.MeshNormalMaterial());
mesh1.geometry.rotateX(Math.PI * 0.5);
//mesh1.lookAt(0, 0, 1);
scene.add(mesh1);
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
// vector does not need to be normalized, and
// I can use degree values for the angle with this custom
// set rotation by axis method
const v_axis = new THREE.Vector3( 0, 10, 0);
const degree = 45;
setRotationByAxis(q, v_axis, degree);
mesh1.rotation.setFromQuaternion(q);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

The main point here is to look at what is going on when it comes to setting the x,y,z, and w values of Quaternion object. It is very different from what you might be used to when it comes to working with Euler objects. Just directly setting the values for the properties is not as straight forward. However there is a certain methodology here, it is a little hard to follow maybe, but still only so hard.

## 2 - Methods of the Quaternion class

Just like with any other class in threejs there are a number of prototype methods to work with. I am not going to be getting around to all of them here but I think I should have a section in this post where I wrote a thing or two about maybe some of the most impotent ones to be aware of for starters. In the basic section I wrote a thing or two about the set from axis angle method and it would seem that of you are only going to bother with one method that seems like a very impotent one. However I am sure that many others will prove to be useful as well.

### 2.1 - The set from axis angle method

From what I have gathered this far it seems like often quaternions are described as having a vector part and a scalar part. This is what the set from axis angle method comes up a lot as this just seems like a fast easy way to set the vector and scalar part of these kinds of objects. When using the set from axis method the first argument shroud be a normalized vector3 object, and then the next argument should be an angle in radians.

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
scene.add( new THREE.GridHelper( 10,10 ) );
const geo = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 6});
const mesh1 = new THREE.Mesh( geo, material);
scene.add(mesh1);
const arrowHelper = new THREE.ArrowHelper();
arrowHelper.setLength(1.5);
arrowHelper.line.material.linewidth = 6;
scene.add(arrowHelper);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-2, 2, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v_axis = new THREE.Vector3();
const e_axis = new THREE.Euler();
//mesh1.geometry.rotateZ(e.z); // can rotate the geometry once two if i want
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = a1 * 8 % 1;
    const a3 = Math.sin(Math.PI * (a1 * 2 % 1) );
    e_axis.z = Math.PI / 180 * (45 * a3);
    v_axis.set(0,1,0).applyEuler(e_axis);
    mesh1.quaternion.setFromAxisAngle( v_axis, Math.PI * 2 * a2 );
    mesh1.rotation.z += e_axis.z;
    arrowHelper.setDirection(v_axis);
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

### 2.2 - The slerp method

There should be at least one or more methods that can be used to transition from one quaternion object to another quaternions object as this is often the case with many other objects in threejs. For example when it comes to the Vector3 class there is of course the lerp method that allows for me to quickly transition from one vector3 object to another vector3 object by passing the new target vector and then an alpha value that is the magnitude between the current vector and target vector to move. It would look like this is no lerp method, but there is a [slerp method](/2023/04/14/threejs-quaternion-slerp/) which is more or less the quaternion equivalent of that.

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
// HELPER FUNCTIONS
// ---------- ----------
const setQ = (q, x, y, z, degree) => {
    q.setFromAxisAngle( new THREE.Vector3( x, y, z ).normalize(), THREE.MathUtils.degToRad(degree) );
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// QUATERNION OBJECTS
// ---------- ----------
const q1 = new THREE.Quaternion();
setQ(q1,0,1,0,0);
const q2 = new THREE.Quaternion();
setQ(q2,0,1,0, -45);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    mesh1.quaternion.copy(q1).slerp(q2, a2);
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

### 2.3 - The premultiply method

Often it would seem that I am in a situation in which I need to preform not one, but two or more rotations. With that said it would seem that the [premultiplication method](/2023/03/31/threejs-quaternion-premultiply/) is a decent tool for preforming this kind of task with quaternions. In this demo I am creating not one, but two quaternion objects. I am then have three mesh objects, one of which I set to the state of the first quaternion, the next I set to the other quaternion, and then I use the copy method along with the premultiply to update the third mesh object to a Premultiplication of the first and second quatrenion object.

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
// HELPERS
// ---------- ----------
const makeMesh = () => {
    const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
    const mesh_parent = new THREE.Mesh(
        new THREE.SphereGeometry(1, 12, 12),
        material);
    const mesh_child = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.25, 0.5, 8, 8),
        material);
    mesh_child.position.y = 1.25;
    mesh_parent.add(mesh_child);
    return mesh_parent;
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = makeMesh();
mesh1.position.set(0, 0, -2.5);
scene.add(mesh1);
const mesh2 = makeMesh();
mesh2.position.set(0, 0, 2.5);
scene.add(mesh2);
const mesh3 = makeMesh();
mesh3.position.set(0, 0, 0);
scene.add(mesh3);
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
const q1 = q.clone();
const q2 = q.clone();
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( 4, 4, 4 );
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const axis1 = new THREE.Vector3( 0, 0, 1 );
const e1 = new THREE.Euler();
const axis2 = new THREE.Vector3( 1, 0, 0 );
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = a1 * 1 % 1;
    const a3 = a1 * (16 * Math.sin(Math.PI * a1) ) % 1;
    const radian1 = Math.PI * 2 * a2;
    e1.x = Math.cos(radian1);
    e1.y = 0;
    e1.z = Math.sin(radian1);
    axis1.set( 0, 1, 0 ).applyEuler(e1);
    const deg1 = 90;
    const deg2 = 360 * a3;
    // set q1 and q2 using setFromAxisAngle method
    q1.setFromAxisAngle( axis1.normalize(), THREE.MathUtils.degToRad(deg1) );
    q2.setFromAxisAngle( axis2.normalize(), THREE.MathUtils.degToRad(deg2) );
    // update mesh object local rotations with quaternion objects
    // where mesh1 and mesh 2 are just the current state of q1 and q2
    // and the rotation of mesh3 is q1 premultiplyed by q2
    mesh1.quaternion.copy(q1);
    mesh2.quaternion.copy(q2);
    mesh3.quaternion.copy(q1).premultiply(q2);
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

### 2.4 - The set from unit vectors method

For the most part I like to use the set from axis angle method as a way to define the state of a quaternion object. However another great method for this is the [set from unit vectors method](/2023/04/07/threejs-quaternion-setfromunitvectors/) which allows me to define the state in the form of a from and to vector3 object. This way I can think in terms of having a vector3 object that is a direction that I want to set, and other vector3 that is the direction that I am coming from to this new direction. Because I am using the vector3 class here I can make [use of methods like the lerp method](/2022/05/17/threejs-vector3-lerp/) of the vector3 class to update the state of the to vector3 object starting at the from vector3 to the desired end vector3 object.

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
// V3 ARRAY
// ---------- ----------
const v3array = [
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1]
].map( (arr) => {
    return new THREE.Vector3().fromArray(arr).normalize();
});
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 20, 20),
    new THREE.MeshNormalMaterial({ wireframe: true}));
scene.add(mesh1);
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
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,     // 30.888 / 450
   frame: 0,          // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const q_home = new THREE.Quaternion();
q_home.setFromAxisAngle( v3array[1], Math.PI * 0.5 );
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = a1 * v3array.length % 1;
    const a3 = 1 - Math.abs(0.5 - a2) / 0.5;
    const vi1 = Math.floor( v3array.length * a1 );
    const vi2 = ( vi1 + 1 ) % v3array.length;
    const v1 = v3array[vi1];
    const v2 = v3array[vi2];
    const v_from = v1.clone();
    const v_to = v_from.clone().lerp(v2, a3).normalize();
    const q2 = new THREE.Quaternion().setFromUnitVectors(v_from, v_to);
    mesh1.quaternion.copy(q2);
};
const render2d = (sm) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
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

## 3 - The Euler class and Quaternion class

The Euler class is still often used to set an orientation of an object. Also there are a lot of reasons why I might want to use a Euler object over a Quaternion, for one thing they are easier to work with, and if I can use one without running into any major problems with it for the most part i would say they work fine. There are still limitations of Euler objects, so in this section I will be writing about what those limitations are and how Quaternions help to address them. Also I will want to touch base on how to convert from Euler to quaternion and back again as well, as well as anything else that might come up when it comes to Euler objects and how they related to quaternion.

### 3.1 - Converting Euler to and from Quaternion

If I am dealing with the rotation and quaternion properties of any object3d class based object then conversion to and from Euler is done automatically. If I change the state of the Euler object stored at the rotation property of a mesh, camera, or any other object3d based object that in turn will also update the state of the quaternion property of such objects as well. It is only when dealing with stand alone objects where I might need to use the set from Euler method of the Quaternion class or the set from Quaternion method of the Euler class.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const addMesh = (obj_parent, x, y, z) => {
    const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
    mesh.position.set(x, y, z);
    obj_parent.add(mesh);
    return mesh
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = addMesh(scene, -1,  0,  1);
const mesh2 = addMesh(scene,  1,  0,  1);
const mesh3 = addMesh(scene, -1,  0, -1);
const mesh4 = addMesh(scene,  1,  0, -1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( 3, 2, 3 );
camera.lookAt( 0,0,0 );
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    // A CHANGE to the Euler of mesh1.rotation will also update mesh1.quaternion
    // the same happens the other way around. So with an Object3d class based object
    // conversion to and from Euler and quaternion is done automatically
    mesh1.rotation.y = Math.PI * 2 * a1;
    mesh2.quaternion.copy(mesh1.quaternion);
    // when working with Objects by themselves there are methods like the setFromEuler method
    // of the quaternion class...
    const e1 = new THREE.Euler();
    e1.x = Math.PI * 2 * a1;
    const q1 = new THREE.Quaternion();
    q1.setFromEuler(e1);
    mesh3.quaternion.copy(q1);
    // ...and the setFromQuaternion method of the Euler class
    const q2 = new THREE.Quaternion();
    const v_axis = new THREE.Vector3(1 - 2 * a1,1,-1 + 2 * a1).normalize();
    q2.setFromAxisAngle( v_axis, Math.PI * 2 * a1 );
    const e2 = new THREE.Euler();
    e2.setFromQuaternion(q2)
    mesh4.rotation.copy(e2);
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

### 3.2 - Gimbal Lock demo Of Euler compared to doing the same with Quaternion

One major draw back with the Euler class is that I can end up running into problems that have to do with Gimbal lock. This is an issue where two axis of rotation will become aligned with each other and as such I and up losing an axis of control, or one kind of rotation will turn into another. For example in this demo I have two objects that are comped of a collection of mesh objects that look like airplanes kind of. I also have two rotation update methods for them, one of which makes use of Euler objects and the other makes use of Quaternion objects to do so. Both objects update just fine when pitch is at 90, but when I pitch both objects up 90 to 0 so they are both pointing up, yaw turns into roll for the object that is updated by way of Euler angles. However with the quaternion object yaw is still yaw and things are working as expected.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const mkObject = function(){
    const material = new THREE.MeshNormalMaterial({});
    const mesh_body = new THREE.Mesh(
       new THREE.SphereGeometry(0.5, 20, 20),
       material);
    const mesh_nose = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.25, 1, 20, 20),
        material
    );
    mesh_nose.geometry.translate(0,1,0);
    mesh_body.add(mesh_nose);
    const mesh_wing = new THREE.Mesh(
        new THREE.BoxGeometry(0.125,0.3,3),
        material
    );
    mesh_body.add(mesh_wing);
    const mesh_tail = new THREE.Mesh(
        new THREE.BoxGeometry(0.5,0.4,0.125),
        material
    );
    mesh_tail.geometry.translate(0.75,0,0);
    mesh_tail.geometry.rotateZ(Math.PI / 180 * -60);
    mesh_body.add(mesh_tail);
    return mesh_body;
};
// get an alpha that is a part of an alpha
const getPartAlpha = (a1, a_start, a_length) => {
    return (a1 - a_start) / a_length;
};
// get pitch and yaw in deg values
const getPitchYaw = (a1) => {
    const result = { yaw:0, pitch:90 };
    if(a1 < 0.25){
        const a2 = getPartAlpha(a1, 0, 0.25);
        result.yaw = 45 * Math.sin( Math.PI * 4 * a2 );
    }
    if(a1 >= 0.25 && a1 < 0.5){
       let a2 = getPartAlpha(a1, 0.25, 0.25);
       result.pitch = 90 - 90 * a2;
       result.yaw = 22 * Math.sin( Math.PI * 8 * a2 );
    }
    if(a1 >= 0.5 && a1 < 0.75){
        const a2 = getPartAlpha(a1, 0.5, 0.25);
        result.pitch = 0;
        result.yaw = 45 * Math.sin( Math.PI * 4 * a2 );
    }
    if(a1 >= 0.75){
       let a2 = getPartAlpha(a1, 0.75, 0.25);
       result.pitch = 90 * a2;
       result.yaw = 22 * Math.sin( Math.PI * 8 * a2 );
    }
    return result;
};
// update By Euler ( object3d.rotation )
const updateByEuler = (obj, a1) => {
    const result = getPitchYaw(a1);
    obj.rotation.z = Math.PI / 180 * result.pitch;
    obj.rotation.y = Math.PI / 180 * (90 - result.yaw);
};
// update By Quaternion ( object3d.quaternion )
const updateByQuaternion = (obj, a1) => {
    const result = getPitchYaw(a1);
    const v_axis_pitch = new THREE.Vector3(1, 0, 0);
    const q_pitch = new THREE.Quaternion().setFromAxisAngle(v_axis_pitch, THREE.MathUtils.degToRad(result.pitch) );
    const v_axis_yaw = new THREE.Vector3(0, 0, 1);
    const q_yaw = new THREE.Quaternion().setFromAxisAngle(v_axis_yaw, THREE.MathUtils.degToRad(result.yaw) );
    obj.quaternion.setFromUnitVectors(v_axis_yaw, v_axis_pitch).premultiply(q_yaw).premultiply(q_pitch);
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const obj1 = mkObject();
obj1.position.set(0,0, 0);
scene.add(obj1);
const obj2 = mkObject();
obj1.position.set(0,0, -3);
scene.add(obj2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-4, 4, 4);
camera.lookAt(0,0,-1.5);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    updateByEuler(obj1, a1);
    updateByQuaternion(obj2, a1);
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

## 4 - User space methods for quaternions

There are a whole lot of great prototype methods to work with in the Quaternion class, however there is not going to be everything of course. Some times I might just need to have some kind of user space methods because some kind of function is just not baked into the prototype at all. Other times there might be something to work with, but there might be some reason to have something that does the same thing in a slightly different way.

### 4.1 - A get axis angle method

As I have covered in the methods section there is the set from axis angle method that can be used to set the state of a quaternion with a normalized vector3 object and an angle in radians for the scalar. However what if I need to [get those values from a quaternion in the event that they are not known](https://stackoverflow.com/questions/62457529/how-do-you-get-the-axis-and-angle-representation-of-a-quaternion-in-three-js)? For this demo I have a get axis radian from quaternion method that will get the axis angle from a quaternion. The w value of the quaternion is very much what I want when it comes to this. However I will need to make use of an expression that involves the use of [Math.acos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acos) in other to get a workable radian value.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const getAxisRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
//-------  ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// Getting axis angle from quaternion
// ---------- ----------
// creating a quaternion from Euler
const e1 = new THREE.Euler();
e1.y = THREE.MathUtils.degToRad(35);
e1.x = THREE.MathUtils.degToRad(0);
const q1 = new THREE.Quaternion().setFromEuler(e1);
mesh1.quaternion.copy(q1);
// getting axis angle in radians
const radian_axis = getAxisRadianFromQuaternion(q1);
console.log(THREE.MathUtils.radToDeg(radian_axis)); // 35
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 4.2 - Get axis vector method

On top of getting a workable axis angle from a quantization in the event that it is not known I might also end up in situations in which I would want to get a vector3 object of the axis from a quaternion as well.

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
// helper functions
// ---------- ----------
const getAxisFromQuaternion = (q) => {
  let s = 1;
  if ( !(1 - q.w * q.w < Number.MIN_VALUE) ) {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return new THREE.Vector3(q.x / s, q.y / s, q.z / s);
};
const getAxisRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
// get a vector to use to make an arrow for an angle
const getAngleVector = (deg) => {
    const v = new THREE.Vector3();
    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(deg);
    return v.set(1,0,0).applyEuler(e);
};
// create an arrow and set the direction to the given vector3
const createArrow = (v3, x) => {
    const arrow = new THREE.ArrowHelper();
    arrow.position.set(x, 0.01, 0);
    arrow.setDirection(v3);
    return arrow;
};
// ---------- ----------
// QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
const v_axis = new THREE.Vector3( -1, 1, 0 ).normalize();
const deg = 360 - 0.001;
q.setFromAxisAngle( v_axis, Math.PI / 180 * deg );
// ---------- ----------
// GET AXIS AND ANGLE FROM QUATERNION
// ---------- ----------
const v_axis2 = getAxisFromQuaternion(q);
const deg2 = THREE.MathUtils.radToDeg( getAxisRadianFromQuaternion(q)  );
console.log( v_axis, deg);
console.log( v_axis2, deg2 );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
scene.add( createArrow(v_axis, 0) );
scene.add( createArrow(v_axis2, 1) );
scene.add( createArrow(getAngleVector(deg), 0) );
scene.add( createArrow(getAngleVector(deg2), 1) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 1, 3);
camera.lookAt(0.5,0,0);
renderer.render(scene, camera);
```

## 5 - Sphere rotation animation loop project using the Quaternion Class

Thus far I have one decent animation loop example that I have made for this post that makes use of several features of the Quaternion Class. The goal here is to rotate a sphere, but do so in a way in which I am always rotating the sphere on the axis. This means that I am always going to want to have the very top and bottom of this sphere lined up with the axis. I am then going to want to move the axis around while always rotating the sphere on this axis. So then in a way I am going to need to always preform two rotations, one to make the sphere lined up with the axis, and then another to rotate it on the axis.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/C_BMlJqrJIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


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
scene.add( new THREE.GridHelper( 10,10 ) );
const geo = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 3});
const mesh1 = new THREE.Mesh( geo, material);
scene.add(mesh1);
const arrowHelper = new THREE.ArrowHelper();
arrowHelper.setLength(1.5);
arrowHelper.line.material.linewidth = 6;
scene.add(arrowHelper);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v_up = new THREE.Vector3(0, 1, 0);
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 0.75 - 0.75 * a1; //1 - Math.abs(0.5 - (a1 * 4 % 1)) / 0.5;
    const a3 = a1 * 1 % 1;
    const a4 = a1 * 6 % 1;
    // axis vector
    const v_axis = v_up.clone();
    const e = new THREE.Euler();
    e.y = Math.PI / 180 * ( 180 * a2);
    e.z = Math.PI / 180 * ( 360 * a3 );
    v_axis.applyEuler(e);
    // two Quaternion objects using 
    // setFromUnitVectors and setFromAxisAngle methods
    const q1 = new THREE.Quaternion();
    q1.setFromUnitVectors(v_up, v_axis);
    mesh1.quaternion.copy(q1);
    const q2 = new THREE.Quaternion();
    q2.setFromAxisAngle(v_axis, Math.PI * 2 * a4);
    // premultiply with q2
    mesh1.quaternion.premultiply(q2);
    arrowHelper.setDirection(v_axis);
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

There is a whole lot more to wrote about when it comes to these kinds of objects of course. I am sure that I will come around to edit and expand this post a bit now and then sure. However there are many things where I think it would be best to write a whole other post maybe rather than going off the deep end when it comes to future edits of this.

---
title: Quaternion rotation objects in threejs
date: 2023-03-24 06:28:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1033
updated: 2023-03-24 11:30:48
version: 1.10
---

There is a lot of ground to cover when it comes to [quaternions in threejs](https://threejs.org/docs/#api/en/math/Quaternion), but one has to start somewhere with them so here we are. Quaternions and prove to be very confusing at first compared to what you might be used to for setting rotations, but with a little effort some of that confusion can be addressed to get to at least a basic, functional , level of understanding. They are far more complex than Euler objects, but that complexly is justified for some situations that can come up when working on projects.

When it comes to setting the rotation of an object such as a mesh object, camera, or any kind of object3d based object one might just use the [look at method of the object3d](/2021/05/13/threejs-object3d-lookat/) class and move on with ones life. No judgment with that, it is a very useful method, I use it all the time myself. However I do so with an understanding that the look at method does have some limitations when it comes to setting the rotation of an object. The same can be said of directly working with the rotation property that stores the current object rotation in the form of a Euler object. Euler objects might be easy to understand in terms of what the deal is with the public properties of such objects, but I pay a price for that simplicity and can end up dealing with problems like [Gimbel lock](https://en.wikipedia.org/wiki/Gimbal_lock).

<!-- more -->

## Quaternion objects and what to know first

In this post I am writing about [Quaternion](https://en.wikipedia.org/wiki/Quaternion) in the form of Quaternion class objects in the javaScript library known as threejs. This is not in any way a [getting started post on threejs](/2018/04/04/threejs-getting-started/), the javaScript programming language, and other basic skills that are required before hand. In the basic section of this post I do try to keep the source code examples as simple as possible, but it should go without saying that I am making a lot of assumptions here. It is okay if you find this subject a little overwhelming at first because this is very much a more advanced subject compared to a lot of other features of threejs. In any case, regardless of skill level or experience, you might want to learn more, or refresh on a few things first.

### Start with Euler angles, buffer geometry rotation methods, and Object3d.lookAt first if you are new to rotations

If you are still fairly new to threejs and you have not looked into things like the [Euler class](/2021/04/28/threejs-euler/), and the Object3d.lookAt method I would suggest that would be a good starting point first. Working with those features are a whole world easier, it is only when you start to run into problems with them that you might want to start looking into alternatives to those features. Also when it comes to geometry there are a number of rotation methods in the buffer geometry class. Using those methods might be expensive in terms of system resources, but they are often used just once to adjust the state of a geometry, and in any case they are another way to go about rotating things.

### The source code examples here are also on github

I have the source code examples that I am writing about here up on my test threejs repository on Github. This is also where I park all the source code examples for my many other blog posts on threejs as well. In addition cloning down the repo, installing the packages, and starting the server might be the fastest way to get these examples as well as the many others working on your end.

### Version Numbers matter

When I first wrote this post I was using r146 of threejs, and as such the examples follow the style rules that I have set for that revision.
With that said I am still using old script tags over that of JSM with these examples. There are a lot of other little details with this revision and the direction that threejs is going. However in any case I have found that I just need to always have a little section such as this to make it clear what the deal is with this sort of thing. If you used threejs as long as I have then you know what the deal is, if not threejs is a fast moving project and code breaking changes are made to if often. 

## 1 - Some basic getting started examples of Quaternion objects

In this section I will be writing about some basic examples of quaternions. However I think that I have to say that even when it comes to basic examples of quaternions things might prove to be not so basic. They are a little complex and that is just simply the nature of them compared to Euler objects. However they are still only so hard and with a little effort you can at least understand what the deal is with the public properties of these kinds of objects. SO I think that will be the main thing that I will focus on in this basic section.

### 1.1 - Directly setting the quaternion of a mesh object using the set from axis method

When it comes to mesh objects, and any object3d class based object for that matter, there is directly working with the [quaternion property of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.quaternion). This is an alternative to the object3d rotation property which is an instance of Euler. As such any change to the quaternion should also update the state of the rotation property and vice versa.

Maybe the best way to get started with quaternion objects would be to start working with the set from axis angle method of the quaternion class. There is also directly working with the various properties but doing so is not as easy as what you might be used to with the Euler class.

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

There should be at least one or more methods that can be used to transition from one quaternion object to another quaternions object as this is often the case with many other objects in threejs. for example when it comes to the Vector3 class there is of course the lerp method that allows for me to quickly transition from one vector3 object to another vector3 object by passing the new target vector and then an alpha value that is the magnitude between the current vector and target vector to move. It would look like this is no lerp method, but there is a slerp method which is more or less the quaternion equivalent of that.

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

## Conclusion

There is a whole lot more to wrote about when it comes to these kinds of objects of course. I am sure that I will come around to edit and expand this post a bit now and then sure. However there are many things where I think it would be best to write a whole other post maybe rather than going off the deep end when it comes to future edits of this.

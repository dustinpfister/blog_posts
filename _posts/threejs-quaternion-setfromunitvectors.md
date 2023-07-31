---
title: Quaternion set from unit vectors method in threejs
date: 2023-04-07 13:21:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1035
updated: 2023-07-31 08:43:25
version: 1.4
---

As of late I have been working on demos that have to do with [Quaternion objects](https://threejs.org/docs/#api/en/math/Quaternion) in order to gain a better understanding of them. Thus far I have found that there is a core set of prototype methods that I am going to want to use to start working with these. Maybe the very first method that one will want to get solid with is the set from axis angle method, but I have found that the set from unit vectors method is also often fairly useful as well as a tool for just setting the state of one of these objects to begin with. I say that because often I will want to set a starting orientation to begin with, and then from the preform one or more additional rotations. With that said todays post will be on this set from unit vectors method of the quaternion class.

<!-- more -->

## The set from unit vectors method of the Quaternion class and what to know first

This is a post centered around the set from unit vectors method of the quaternion class of the javaScript library called threejs. With that said it should go without saying that this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/), as this is a fairly advanced topic when it comes to the use of this library. However in any case, even if you have some experience, it might be a good idea to refresh a bit on some things before continuing with reading the rest of this content. So I will take a moment to outline what some of those things might be here.

### There is starting out with Euler angles, and the Object3d.lookAt method.

If you are new to rotations using threejs there are a lot of features that you should be aware of first. [Euler angles](/2021/04/28/threejs-euler/) for example are generally easier to work with, and if what you need to do can be done with them it might be best to do so and move on. It is only when you run into problems with using Euler angles, and other options such as the [look at method of the Obejct3d class](/2021/05/13/threejs-object3d-lookat/), that you should get into using more complex options such as Quaternion objects, and with that the set from unit vectors method of the Quaternion class.

### Do not forget about Buffer Geometry rotation methods

There is setting the orientation of an object3d class based object itself such as a mesh object, and then there is [rotating the geometry](/2021/05/20/threejs-buffer-geometry-rotation/) of a mesh object without doing anything with the state of the mesh objects rotation. If you are not aware of what there is to work with in the buffer geometry class now might be a good time to look into that more as well.

### Check out my main blog post on Quaternion objects

There is also taking a look at my [main blog post on the subject of using these quaternion objects](/2023/03/24/threejs-quaternion/) as well. As I write more content on these kinds of objects I am sure that I will be doing a fair amount of editing with that post, but I am not so sure that I will be doing the same for this one.

### Source code examples are up on Github

The source code examples that I am writing about here, as well as additional notes for future edits and so forth can be [found in my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-quaternion-setfromunitvectors). This is also where I park the source code examples for all the [other blog posts that I have wrote on threejs](/categories/three-js/) as well.

### Version Numbers matter

When I first wrote this blog post I was [using r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) and thus I follwed the style rules that I have set for that revision.

## 1 - Basic getting started examples of the Set From Unit Vectors method

Just as with everything else in threejs one has to start somewhere. In this section I will be starting out with a few basic examples of the set from unit vectors quaternion method. While doing so I will also end up having to write a whole lot about some Vector3 class methods as well that are closely related to the use of this method.

### 1.1 - Just using the Vector3 constructor alone

For this very first basic example I am going to start out my making the Vector3 objects that will be used with the set from unit vectors method by just using the THREE.Vector3 constructor function alone, and not any additional prototype methods. When doing so I will want to make sure that I keep the vector unit length of these at 1 as the set from unit vectors method assumes that is the case. One way to do so, and to keep things very easy for starters to to just use vectors like 0,1,0, and 0,0,1 for the from and to vector3 objects

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
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const v_from = new THREE.Vector3(0, 1, 0);
const v_to = new THREE.Vector3(0, 0, 1);
mesh.quaternion.setFromUnitVectors(v_from, v_to);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.2 - Using the lerp, clone, and normalize methods of the Vector3 class

Now that I got the very basic example out of the way, in this demo I am now making use of a few prototype methods in the Vector3 class toolbox. The clone method is great for making a new Vector3 object from another vector3 object, the [lerp method](/2022/05/17/threejs-vector3-lerp/) is useful for getting a vector between two vectors, and also the [normalize method](/2021/06/14/threejs-vector3-normalize/) can be used to set a vector to a unit length of 1 while preserving the direction of the vector.

With all of that said I am once again starting out with two vector3 objects that are 0,1,0, and 1,0,0. However I am making my from vector cloning the first vector. Then when it comes to the to vector I can clone the from vector, and then lerp to v2 by way of a given alpha value. I can then also use the normalize method when doing all of this to make sure that the unit length of these vector3 objects is always 1 as well.

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
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);
// ---------- ----------
// ROTATE WITH QUATERNIONS
// ---------- ----------
const alpha = 0.5;
const v1 = new THREE.Vector3(0, 1, 0);
const v2 = new THREE.Vector3(1, 0, 0);
const v_from = v1.clone();
const v_to = v_from.clone().lerp(v2, alpha).normalize();
mesh.quaternion.setFromUnitVectors(v_from, v_to);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.3 - The apply Euler method of Vector3 to change direction

Euler objects might have there limitations, but in some cases they can still prove to be useful. The thing to keep in mind here is that quaternions are to be used on top of Euler angles, not as a total replacement for them. With that said I have found that Euler angles are still work great when used in conjunction with the [apply Euler method of the vector3 class](/2021/06/18/threejs-vector3-apply-euler/) to create a vector3 object with a desired direction. The vector3 object can then be used to set the position of an object, and on top of that I can just call the clone and normalize methods off of the position to get a vector of 1 unit length to use with the set from unit vectors quaternion method without mutation the vectro3 object of the object position.

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
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh1 = new THREE.Mesh( geometry, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry, material);
mesh2.scale.set(0.25, 0.25, 0.25);
scene.add(mesh2);
// ---------- ----------
// SET MESH2 POSITION - using euler objects amd vector3 class methods
// ---------- ----------
const e2 = new THREE.Euler(0, 0, 0);
e2.y = Math.PI / 180 * 270;
e2.z = Math.PI / 180 * 40;
let radius2 = 3.5;
mesh2.position.set(1, 0, 0).applyEuler(e2).multiplyScalar(radius2);
// ---------- ----------
// ROTATE MESH1 WITH QUATERNIONS
// ---------- ----------
const v_from = new THREE.Vector3(0, 1, 0);
const v_to = mesh2.position.clone().normalize();
mesh1.quaternion.setFromUnitVectors(v_from, v_to);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 2 - Animation loop demos

Often I think that in order to really gain a sense of what a threejs feature is really useful for I need to work out at least one or more animation loop examples. So then in this section I will be doing just that with a few demos that involve a main animation loop function and result in mutation of quaternion object values over time using mainly the set From Unit Vectors method.

### 2.1 - Vector3 array demo

For this demo I wanted to look into the idea of having an array of vector3 objects that are then used to create to and from vector3 objects. The end goal would then be have a way to preform a whole bunch of rotations based on this list of two and from vector3 objects. For the most part this demo seems to work okay, but I think I might like to get around to refining this a bit more before I write much more about it.

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

### 2.2 - Animation of the basic apply Euler demo

This animation loop demo is based off of what I started with the apply Euler basic section example. This far this seems to work very well as a way to set the orientation of an object over time.

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
scene.add(new THREE.GridHelper(10, 10));
const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
const geometry = new THREE.SphereGeometry(2, 20, 20);
const mesh1 = new THREE.Mesh( geometry, material);
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry, material);
mesh2.scale.set(0.25, 0.25, 0.25);
scene.add(mesh2);
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
camera.position.set(5, 5, 5);
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
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = Math.sin( Math.PI * (a1 * 32 % 1) );
    const e2 = new THREE.Euler(0, 0, 0);
    e2.y = Math.PI / 180 * (360 * a1);
    e2.z = Math.PI / 180 * (90 * Math.sin( Math.PI * 8 * a1 ) ) ;
    const radius2 = 3 + 1.5 * a2;
    mesh2.position.set(1, 0, 0).applyEuler(e2).multiplyScalar(radius2);
    const v_from = new THREE.Vector3(0, 1, 0);
    const v_to = mesh2.position.clone().normalize();
    mesh1.quaternion.setFromUnitVectors(v_from, v_to);

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
    ctx.fillText('frame: ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
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

## Conclusion

Thus far I have to say that this set from unit vectors might be a core set of must know functions of the quaternion class. It is a great way to set the state of the orientation with a set of vectors that contain from and to directions. It is still not a replacement for the set from axis angle method though, and in any case I think that the premultiply methods might be one of the most importance methods to get solid when it comes to this class. You see there is setting the first state of a quaternion object, and then there is adding from that first state with another rotation. This set from unit vectors method is good for setting the first state that I want, then after that there is using premulitply one or more times from there.




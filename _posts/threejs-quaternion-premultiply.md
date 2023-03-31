---
title: Quaternion premultiply method in threejs
date: 2023-03-31 06:38:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1034
updated: 2023-03-31 09:09:40
version: 1.6
---

The [premultiply method of the quaternion class in threejs](https://threejs.org/docs/#api/en/math/Quaternion.premultiply) comes in handy when I find myself in a situation in which I need to preform not one but two rotations. Say that I have a sphere and I want to rotate the sphere on an axis that is say 45 degrees so that the top and bottom of the sphere geometry is aligned with the sphere, and on top of that I want to rotate the sphere on this axis. So in a way I actually have two axis vectors and two angles. One set of axis and angle is aligned with the geometry to begin with, and the other is to adjust the geometry to an additional orientation that I want. In this post then I will be going over a number of code examples that make use of this method as this is a major part of working with quaternion objects for setting the orientation of objects.

<!-- more -->

## The premultiply quaternion method and what to know first

This is a blog post on the premultiply method os the quaternion class in the javaScript library known as threejs. This is then not a post for people that are new to the quaternion class in general, threejs as a whole, or any underlaying skills that are needed before even getting into that. I will do my best to try to keep these examples fairly simple, but it might still be best to start out with a [getting started with threejs type post](/2018/04/04/threejs-getting-started/) if you are new to the library. Regardless of kill level or experience there might still be a few things you might want to refresh on first as well, so I will take a moment to write about a few of those things in this section.

### Start out with Object3d.lookAt if you are new to rotations

If you have zero experience when it comes to rotations of objects in threejs, it might be best to start out with using the [object3d look at method](/2021/05/13/threejs-object3d-lookat/). This is a very easy to use tool for setting rotation, and also in many cases it will work just fine when it comes to setting the orientation of an object. I think it is best to always start out with the most basic tool, and only bother getting into complex solutions such as quaternion objects when I find myself in a situation in which I have to.

### There is also Object3d.rotation and the Euler class

If the look at method is not cutting it there is then looking into the [rotation property of the object3d class](/2022/04/08/threejs-object3d-rotation/), and with that the [Euler class](/2021/04/28/threejs-euler/) that is the value of the rotation property. Euler angles are must easier to work with that quaternions, but in some situations they might prove to be an oversimplification of the situation which would lead one to get into quaternion objects.

### There is my main blog post on quaternion objects

There is checking out my [main blog post on quaternion objects](/2023/03/24/threejs-quaternion/) to get a general overview of the quaternion class as a whole. There are a whole lot of other methods in the class as well of course, so this post would be better for starting out with quaternion in threejs. The post is also just simply the post that has received the most time and attention with this subject as well, and it might be a while until I get around to editing this post.

### Source code examples are up on Github.

The [source code examples that I am writing about in this post](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-quaternion-premultiply), as well as the examples for [my many other posts on threejs](/categories/three-js/), can be found in my test threejs repository on Github. It might be best to clone down that repo and start the server as a way to get things up and ruining on your end as well. I do try my best to keep these examples copy and paste friendly, but there are a lot or reasons why that will not always work out, it part because threejs moves so fast in terms of development.

### Version Numbers matter

When I first wrote this post I was using r146 of threejs and the examples here where working just fine on my end with that revision number. However code breaking changes are made to the library all the time.

## 1 - Basic example

The general idea here is that I have not one, but two quaternion objects. I can then use the copy method of the quaternion class to copy one quaternion object to the quaternion object of an object3d class based object such as a mesh object to set the first rotation. Then I can call the premultiply method and pass the next quaternion object as well to get the final rotation that I want.

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
const axis1 = new THREE.Vector3(1,0,0);
const axis2 = new THREE.Vector3(0,1,0);
const q1 = new THREE.Quaternion().setFromAxisAngle(axis1, Math.PI * 0.25);
const q2 = new THREE.Quaternion().setFromAxisAngle(axis2, Math.PI / 180 * 5);
mesh.quaternion.copy(q2).premultiply(q1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3,3,3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

I could also just directly call the set from axis angle method off of the quaternion of the mesh object, and then just have one stand along quaternion object. In any case the deal here is to think in terms of what needs to happen in the form of two or more rotations to get to the desired end result.

## 2 - Animaiton examples

For this section I will be going over at least a few if not more animation examples.

### 2.1 - Rotate sphere on axis, with premutiply and slerp

Fir this animation loop example I wanted to have a nice little project that really helps me get a good feel for what the premultilly method is all about. While I am at it also gain a better  sense of what the slerp method can do also. You see there is of course the order in which I use the quaternion objects, so it would be nice to slerp between these two so I can switch back and forth between these two different orders. As such I can switch between having the sphere rotate on an axis, and rotating around the axis.

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
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// QUATERION
// ---------- ----------
const axis1 = new THREE.Vector3(0, 1, 0);
const axis2 = new THREE.Vector3(1, 0, 0);
const q1 = new THREE.Quaternion();
const q2 = q1.clone();
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(1.25, 16, 16),
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
// ALPHA CONTROLS
// ---------- ----------
const ac = {
    x: 420, y:20,
    h: 125, w: 200,
    items: {}
};
ac.items.angel = { desc: 'Axis Angle', a: 0.5 };
ac.items.speed = { desc: 'Rotaiton Speed', a: 0.5 };
ac.items.slerp = { desc: 'Slerp', a: 0 };
ac.itemCount = Object.keys(ac.items).length;
// for each item method
ac.forEachItem = (forItem) => {
    const keys = Object.keys(ac.items);
    keys.forEach( (key, i, arr) => {
        const item = ac.items[key];
        forItem(item, i, arr);
    });
};
// get an item by index
ac.getItem = (i) => {
    const keys = Object.keys(ac.items);
    return ac.items[keys[i]];
};
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   pointer: new THREE.Vector2(),
   uidown: false,
   pointerdown: false,
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 900,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = a1 * (8 * ac.items.speed.a) % 1;
    const angle1 = Math.PI * 2 * a2;
    const angle2 = Math.PI * 0.5 * ac.items.angel.a
    q1.setFromAxisAngle(axis1, angle1);
    q2.setFromAxisAngle(axis2, angle2);
    const q3 = q1.clone().slerp(q2, ac.items.slerp.a);
    const q4 = q2.clone().slerp(q1, ac.items.slerp.a);
    mesh1.quaternion.copy(q3).premultiply(q4)
};
const render2d = (sm) => {
    // background
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw webGl renderer dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
    // debug info
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left'
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
    ctx.fillText('pointer : ' + sm.pointer.x.toFixed(2) + ',' + sm.pointer.y.toFixed(2), 5, 50);
    // alpha controls
    ctx.fillStyle = 'gray';
    ctx.fillRect(ac.x, ac.y, ac.w, ac.h);
    ac.forEachItem( (item, i, arr) => {
        ctx.fillStyle = 'cyan';
        ctx.strokeStyle = '#8a8a8a';
        const h = ac.h / arr.length;
        ctx.beginPath();
        ctx.rect(ac.x, ac.y + h * i, ac.w * item.a, h);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = Math.floor(h / 4) + 'px arial'
        ctx.fillText(item.desc, ac.x + ac.w / 2, ac.y + h / 2 + h * i);
    } );
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
// ---------- ----------
// EVENTS
// ---------- ----------
const boundingBox = function (x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(
        (y1 + h1) < y2 ||
        y1 > (y2 + h2) ||
        (x1 + w1) < x2 ||
        x1 > (x2 + w2));
};
const pointerEventCommon = (e) => {
    const el = e.target;
    const bx = el.getBoundingClientRect();
    // update pointer
    sm.pointer.x = e.clientX - bx.left;
    sm.pointer.y = e.clientY - bx.top;
};
canvas_2d.addEventListener('pointerdown', (e) => {
    sm.pointerdown = true;
    sm.uidown = false;
    pointerEventCommon(e);
    if( boundingBox(sm.pointer.x, sm.pointer.y, 1, 1, ac.x, ac.y, ac.w, ac.h) && sm.pointerdown){
        sm.uidown = true;
        let a_y = (sm.pointer.y - ac.y) / ac.h;
        a_y = THREE.MathUtils.clamp(a_y, 0, 0.99);
        a_x = (sm.pointer.x - ac.x) / ac.w;
        a_x = THREE.MathUtils.clamp(a_x, 0, 0.99);
        sm.i_item = Math.floor(ac.itemCount * a_y);
        ac.getItem(sm.i_item).a = a_x;
    }
    if(THREE.OrbitControls){
        controls.enabled = !sm.uidown;
    }
});
canvas_2d.addEventListener('pointermove', (e) => {
    pointerEventCommon(e);
    if(sm.uidown){
        let a_x = (sm.pointer.x - ac.x) / ac.w;
        a_x = THREE.MathUtils.clamp(a_x, 0, 0.99);
        ac.getItem(sm.i_item).a = a_x;
    }
});
canvas_2d.addEventListener('pointerup', (e) => {
    sm.pointerdown = false;
    sm.uidown = false;
    pointerEventCommon(e);
    if(THREE.OrbitControls){
        controls.enabled = true;
    }
});
```

### 2.2 - Animation loop of three spheres

For this animation loop example I wanted to make something that involves three sphere objects two of which are of a single state of a quaternion object, while the final one is the result of a premultiply call involving the other two.

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

## 3 - Conclusion

The premultiply method is one or the core set of quaternion methods that I will want to work with in order to use these kinds of objects to set orientation of object3d class based objects in threejs. There is knowing how to set the state of just one of these quaternion objects first and foremost though and for that there is the set from axis angle method. There is also knowing how to just directly mutate the public values of one of these objects but doing that is not as easy as what one might be used to with Euler objects. Anyway once one knows how to set the orientation of one quaternion object, there is doing so with another, and then using both of those to set an orientation of yet another and one way to do so is with premultiply.

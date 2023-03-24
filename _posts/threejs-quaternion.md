---
title: Quaternion rotation objects in threejs
date: 2023-03-24 06:28:00
tags: [js,three.js]
layout: post
categories: three.js
id: 1033
updated: 2023-03-24 08:31:02
version: 1.2
---

There is a lot of ground to cover when it comes to quaternions in threejs, but one has to start somewhere with them so here we are.

<!-- more -->

## 1 - Some basic getting started examples of Quaternion objects

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
---
title: Vector3 apply axis method
date: 2021-06-17 14:35:00
tags: [three.js]
layout: post
categories: three.js
id: 891
updated: 2023-06-10 13:06:16
version: 1.34
---

This week I have been taking a deeper look into what there is to work with when it comes to the Vector3 class in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), and today I thought I would work out a few demos with the [apply to axis angle method](https://threejs.org/docs/#api/en/math/Vector3.applyAxisAngle). This is a prototype method of the Vector3 class, which will mutate the value of the Vector in place, and as the name suggests is has to do with rotating the vector along an axis that is defined with another vector that is the direction of the axis, and the second argument is then angle to apply with this given direction.

The thing to keep in mind here is that this is a Vector3 prototype method, so it has to do with changing the value of a vector, and not the state of a Euler, or Quaternion object when it comes to setting local rotation of objects. Vectors can be used to represent direction, and there is some over lap between Vectors and Euler angles, bit it is still a good idea to be aware of what the limitations are here. There will be situations now and then where I will want to do something like what the apply to axis method does, but by mutating the state of a Euler class instance.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/MSn5uVL-kss" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Vector3 class Apply to axis method and what to knwo first

This is a post on a method of the Vector3 class in the javaScript library called threejs called the app axis method. I am then writing about something that is very specific when it comes to client side web programming, and also requires at [least a little background with javaScript](/2018/11/27/js-getting-started/), and the basics of working with the threejs library in a project. If you feel that the content here might be a little to advanced for now there is taking a step back and starting out with a [getting started type post on the subject of threejs](/2018/04/04/threejs-getting-started/). If you have some experience with threejs, but still feel stuck with this there are maybe a few more things you should read up on more before looking at these examples. I will take a moment to go over these things here in this section.

### Read up more on the Vector3 class in general

In this post the focal point is just one little method in the Vector3 class prototype, there are many others that you should become familiar with at one point or another. There are also some basic things you should be aware of at this point such as the fact that the position property of the [Object3d class](/2018/04/23/threejs-object3d/) is an instance of the Vector3 class. Also there are things like the fact that the object3d class is a base class for a whole lot of object in threejs such as Mesh objects, Cameras, and so forth. So it would make sense to read up more on the [Vector3 class](/2018/04/15/threejs-vector3/) in general, and not just stop with this post when doing so.

### There is also the Euler and Quaternion objects for setting rotation

The Vector3 class is used for, well, vectors in what might often be called Vector space. There is some overlap between position, and rotation, but when it comes to the rotation property of an Object3d class instance that is an instance of the [Euler class](/2021/04/28/threejs-euler/). The Euler class id often a good start when it comes to working out things with local rotation of objects, but when it comes to really getting into rotations there is the [Quaternion](/2023/03/24/threejs-quaternion/) Class.

### Source code examples are on Github

The source code examples that I am writing about in this post can also be [found up on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-apply-axis-angle). This is also the repo where I store all the source code examples for my [many other blog posts on threejs](/categories/three-js/) that I have wrote over the years.

### Version Numbers matter

When I wrote this post I was testing one the source code examples in r127 of threejs, and the last time I came around to do a little editing I was able to make updated examples that work well with [r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Always be mindful of the version of threejs you are using, and the version that the author of a source code examples was suing when it comes to threejs examples on the open web. This library is still moving very fast compare to many other projects, and code braking changes happen often.

## 1 – Some Basic examples of the apply axis angle vector3 class method

For this section I will be starting out with a few basic examples of the apply axis angle method. Although I will be keeping these examples as simple as possible I still assume that you know enough as to how to get started with code examples like this. I will also be touching base on a lot of other features of the Vector3 class in this section as well as the usual features of threejs that are needed to see anything at all.

### 1.1 - Basic example of the Vector3.applyAxisAngle method

Here I have a mesh object that makes use of the [cone geometry constructor](/2019/07/31/threejs-cone/), and the [Mesh normal material](/2021/06/23/threejs-normal-material/). I am using the set method of the Vector3 class instance of the position property of the mesh to set the position to something other than that of 0,0,0. 

After I have my mesh object added to the scene, and positioned, I am using the apply axis angle method using a vector with a direction that is going straight up on the y axis, and with a vector unit length of 1, but I am sure any length can be used. In addition to the vector that will serve as the axis, I can also pass an angle, and for now I am just pulling a full 180 for this example.


```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 30, 30),
        new THREE.MeshNormalMaterial());
mesh.geometry.rotateX(Math.PI * 0.5);
mesh.position.set(1, 0, 1);
scene.add(mesh);
// ---------- ---------- ----------
// USING APPLY AXIS ANGLE
// ---------- ---------- ----------
const v = new THREE.Vector3(0, 1, 0);
mesh.position.applyAxisAngle(v, Math.PI / 180 * 180);
console.log( mesh.position.clone().round() ); // {x: -1, y: 0, z: -1}
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.2 - Using copy, normalize, and multiply scalar

The first example in this section might have been an okay starting point for this sort of thing. However I have to say that I do not thing that I would often use the apply axis angle method alone but rather I might choose to use it along with a bunch of other vector3 class features. There is for example the copy method which is what I can use to copy one vector3 object to another, the normalize method that will set the vector unit length to 1, and then multiply scalar that will then scale a Vector to a desired unit length. You see this apply axis angle method is useful in the process of setting the direction of a vector, but there is also the length, magnitude, or distance if you prefer as well.

In this example then I have a helper function that I can use to create a mesh object of a cone, and then I am creating a whole bunch of cones by calling the array for each method off of a data array. This data array then contains data that I am feeding to another method that I am using to set the position of each of these cone objects that I am creating and adding to the scene object. This update cone helper the makes use of the apply axis angle, but then also method like copy that I use to set the start direction and unit length of the vector first. I am then also using normalize to set the length to 1 while preserving the direction, then setting the desired direction from there using the multiply scalar method.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPERS
// ---------- ---------- ----------
const createCone = () => {
    const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.125, 0.5, 30, 30),
        new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    return mesh;
};
// update a cone position
const updateCone = (mesh, v_home, v_axis, deg, unit_length ) => {
    const radian = Math.PI / 180 * deg;
    mesh.position.copy(v_home).applyAxisAngle(v_axis, radian).normalize().multiplyScalar(unit_length);
    mesh.lookAt(0, 0, 0);
};
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
const V_HOME = new THREE.Vector3(1, 0, 0);
const V_AXIS = new THREE.Vector3(0, 1, 0);
[
    [0, 1], [45, 1], [90, 1], [200, 1], [220, 1],
    [0, 2], [90, 2], [180, 2], [270, 2]
].forEach((data)=>{
    const cone = createCone();
    scene.add(cone);
    updateCone(cone, V_HOME, V_AXIS, data[0], data[1] );
});
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```


## 2 - Animaiton loop examples

So now that I have the basic example out of the way I think I should make at least one more demo of this method that will involve an animation loop. 

## 2.1 - Animation loop example of apply to axis

In this example I am doing more or less the same thing as in the basic example only now I am just adding in a loop method that makes use of request animation frame to create a loop method. In this loop method I am calling an update function, that will use a values in seconds as the argument to update the state of something in this case the position property of a mesh using, you guessed it the apply axis angle Vector3 method.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 30, 30),
        new THREE.MeshNormalMaterial());
mesh.geometry.rotateX(Math.PI * 0.5);
mesh.position.set(1, 0, 1);
scene.add(mesh);
// ---------- ---------- ----------
// LOOP
// ---------- ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
const v = new THREE.Vector3(0, 1, 0);
const fps = 30;
let lt = new Date();
// update method
const update = function (secs) {
    v.x += 0.25 * secs;
    v.x %= 1;
    const degree = 45 * secs;
    mesh.position.applyAxisAngle(v, Math.PI / 180 * degree);
    mesh.lookAt(0, 0, 0);
};
// loop method
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs);
        renderer.render(scene, camera);
        lt = now;
    }
};
loop();
```

## 2.2 - Group Animation loop example of apply to axis angle method

For this animation loop example I will be working out something for the first demo video for this blog post. This will then just be a quick demo of the method that involves a group of mesh objects rather than just one mesh object. Also this time around I did a better job of starting to break things down more by having a few helper functions. With that said I have one function that creates a single mesh object, another that creates a group of mesh objects, and a final update method that will update the position of the mesh objects of the group. The update helper function is then the main function of interest here as this is where I am using the apply axis angle method to set the position of the mesh objects.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPERS
// ---------- ---------- ----------
// make a single mesh object
const makeMesh = () => {
    const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 30, 30),
        new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(1, 0, 1);
    return mesh;
};
// update a group by an alpha value
const updateGroup = (group, alpha) => {
    const len = group.children.length;
    const gud = group.userData;
    group.children.forEach( (mesh, i) => {
        const v = gud.v;
        const degree = gud.angle / len * i * alpha;
        mesh.position.set(1, 0, 0).applyAxisAngle(v.normalize(), Math.PI / 180 * degree).multiplyScalar(gud.unitLen);
        mesh.lookAt(0, 0, 0);
    });
};
// make a group of mesh objects
const makeGroup = (opt) => {
    opt = opt || {};
    opt.count = opt.count === undefined ? 10 : opt.count;
    const group = new THREE.Group();
    const gud = group.userData;
    gud.v = opt.v || new THREE.Vector3(0, 1, 0);
    gud.angle = opt.angle === undefined ? 360 : opt.angle;
    gud.unitLen = opt.unitLen === undefined ? 1 : opt.unitLen;
    let i = 0;
    while(i < opt.count){
        group.add( makeMesh() );
        i += 1;
    }
    updateGroup(group, 1);
    return group;
};
// ---------- ---------- ----------
// GROUP
// ---------- ---------- ----------
const group1 = makeGroup( { count: 10, angle: 360, v: new THREE.Vector3(0, 1, 0), unitLen: 5 } );
scene.add(group1);
const group2 = makeGroup( { count: 10, angle: 270, v: new THREE.Vector3(0, 1, 1), unitLen: 5  } );
scene.add(group2);
const group3 = makeGroup( { count: 10, angle: 360, v: new THREE.Vector3(1, 1, 0), unitLen: 5  } );
scene.add(group3);
// ---------- ---------- ----------
// LOOP
// ---------- ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
const v = new THREE.Vector3(0, 1, 0);
const fps = 30;
const frameMax = 100;
let frame = 0;
let lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updateGroup(group1, a2);
    updateGroup(group2, a2);
    updateGroup(group3, a2);
};
// loop method
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame, frameMax);
        renderer.render(scene, camera);
        frame += 1;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

## Conclusion

I am not sure if I will be using this method that often in future projects, not because I do not thing that it brings something of value, but because there are just many other ways to get a similar effect. Often I might want to change the orientation of an object in a way in which it is rotating on an axis, and to do that typically I will want to do something like this but with one of the angles of a Euler class instance rather than this method. Also even if I want to do something like this with a Vector3 class instance I might still want to do so with another method that might prove to be a little more robust, with additional options. With that said I have found that I do prefer to use the apply Euler method of the Vector3 class rather than this method.

Still taking a moment to look into the various methods to work with in the Vector3 class ins worth while, I am sure that I might not use all of them all the time, but there are many basic ones that will come in handy once in a while.
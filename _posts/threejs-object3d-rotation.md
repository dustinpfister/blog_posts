---
title: Setting the rotation of objects in threejs
date: 2022-04-08 12:53:00
tags: [three.js]
layout: post
categories: three.js
id: 976
updated: 2023-03-28 07:24:54
version: 1.35
---

The [rotation property of the object3d class in threejs](https://threejs.org/docs/#api/en/core/Object3D.rotation) stores a instance of the THREE.Euler class for the current local rotation of an object. What is nice about Euler objects is that they are easy to work with compared to some alternative options such a [Quaternion objects](https://threejs.org/docs/#api/en/math/Quaternion), however it is possible to run into problems like [Gimbal Lock](https://en.wikipedia.org/wiki/Gimbal_lock) that can be addressed with such alternatives.

This rotation property is just one value of the base class known as Object3d that is the base of many objects in the library such as [Mesh Objects](/2018/05/04/threejs-mesh/), [Groups](/2018/05/16/threejs-grouping-mesh-objects/), [Cameras](/2018/04/06/threejs-camera/), and many others including even whole [Scene Objects](/2018/05/03/threejs-scene/).

When it comes to just setting the local rotation of an object by way of this rotation property, one way is by using something like the set method of the Euler class prototype to set the rotation of the object to a given set of Euler angles in terms of radian values in the form of javaScript numbers. In other worlds angles as values between 0, and Math.PI \* 2. If you have a hard time thinking in radians there are tools that can be used to preform a quick conversion in the [MathUtils object](/2022/04/11/threejs-math-utils/), also the expressions are not so hard to just work out when it comes to vanilla javaScript code. 

There is a bit more to this sort of thing beyond just setting rotation with number values though, for example in some cases I might want to set the orientation of a geometry of a mesh object rather than the mesh object itself. For example I might want to set the orientation of a cone geometry so that the tip of the cone is the front face. With this sort of this there is setting the rotation of the geometry once, then using the object3d rotation property from there. That is just one example that I will be getting to in this post along with many others such as setting rotation from position and the inverse of doing so.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/837fOzGk7XA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The rotation property of the object3d class and what to know first

In this post I am going over some examples of the rotation property of the object3d class in the javaScript library known as threejs. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), let alone client side web development in general. I do what I can to try to keep these examples easy to follow of course, but I am still taking some liberties as to what it is that you are ware of before hand. I will not be getting into every little detail about threejs and client side javaScript here, but I will take a moment to mention a few things in this opening section that are related to the rotation of object3d based objects.

### The Euler class is worth checking out in detail of course

The value of the rotation property in the object3d class is an instance of the [Euler class which is worth checking out in detail](/2021/04/28/threejs-euler/). There is not a whole lot to work with in terms of prototype methods, which is one reason why alternatives to the Euler class are often used. Still there is looking into the class itself more as this is the kind of object that is stored at the rotation property of an object3d class based object.

### There is also the quaternion property and with that the Quaternion class

There is the rotation property of the object3d class, but there is also the quatrenion property as well. Both of these properties of the Object3d class can be used to rotate a object. However Euler objects, and with that the rotation property of the object3d class, have some limitations that can often be resolved by making use of the quaternion class. Quaternion objects are far more complex compared to Euler objects, so if you are just looking for the next step beyond using the look at method Euler objects might still be a better next step before getting into Quaternions. Although I have a section in this post on quaternion objects as an althertive to Euler Objects, it might be best to check out my main post on the subject of [quaternion objects](/2023/03/24/threejs-quaternion).

### There is also the position property of object3d, and the Vector3 class

When it comes to setting the position of an object3d class based object there is the position property which is an instance of the [Vector3 class](/2018/04/15/threejs-vector3/). There is a whole lot to be aware with respect to the methods that there are to work with in this Vector3 class an how many of them relate to, or work with Euler class instances. There is also just having some basic idea of what a Vector ins in general. Many people might think that it is the state of a position, and it is, but it is also direction and what is often called vector unit length.

### A whole lot more to know with object3d, and also the various objects based off of object3d

The [object3d class](/2018/04/23/threejs-object3d/) is a base class of many objects in threejs such as cameras and mesh objects. The rotation property of this class is just one property of the class along with additional properties that have to do with things like position and the scale of the object. There is then also a whole lot of useful methods with this class that one should also be aware of that are related to setting the rotation of the class, as well as doing just about everything else I would want to do with an object that is based off of this class.

There is then also what to be aware of when it comes to additional properties on top of the object3d class. For example a Mesh object will also have a geometry and a material property. An instance of a perspective camera will have a field of view property and methods to update the state of the camera when certain camera specific values are mutated.

### The Source code examples in this post are on github

The source code examples that I am writing about in this post [are up on Gitub](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-rotation). This is also where I place the soure code examples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs, which was still a fairly new version of threejs at the time I started this post. The last time I came around to do some editing I made sure all the examples are still working fine with r146. I take a moment to always mention what version I was using when wrote a post on threejs because I have been using it long enough to know that code breaking changes are made to the library often.

## 1 - Basic example of the rotation property of Object3d

To start out with rotation and the object3d class I made this quick static scene example that involves just a few mesh objects created with the [box geometry constructor](/2021/04/26/threejs-box-geometry/) and the [normal material](/2021/06/23/threejs-normal-material/). After setting up the scene object, camera, and renderer I then have a simple create cube helper that will create and return one of these cubes. I am then just calling the array for each method off of an array if values that I want to use for rotations of the y value for each cube that I will be creating and adding to the scene in the body of a function that I give to array for each.

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
const mkCube = function(){
    return new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
};
// ---------- ----------
// OBJECTS
// ---------- ----------
[-45, 0, 45, 20].forEach(function(d, i, arr){
    const cube = mkCube(),
    p = i / (arr.length - 1 );
    cube.position.set(-3 + 6 * p, 0, 0);
    cube.rotation.y = THREE.MathUtils.degToRad(d);
    scene.add(cube);
});
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

The x, y, and z properties for each axis can be updated this way, or the set method can be used to do so. In any case I want to think in terms of radians, or convert degrees to radian values if I prefer to think that way which I often do. Another way to set the state would be to mutate a separate instance of the Euler class and then use the copy method of the Euler class at the rotation property and pass this separate Euler class instance.


## 2 - The look at method as an altertaive way to set rotation

There is working with the rotation property of an object directly, but then there is also using the [lookAt method of the object3d class](/2021/05/13/threejs-object3d-lookat/) as a way to set rotation. This look at method works by just passing a position in terms of a set of three numbers that are values for x, y and z values, or an instance of Vector3 such as the position property of an object that is the position that I want an object to look at.

For this example then I am creating a group of cubes by using a while loop to create and position each cube that I want. I am then looping over the children of the group and calling the look at method for each cube having each child look at the child in front of it, or behind in the case of the last child in the group. In the body of the function that I give to the for each method that I call of the array of children of the group I am just using the index argument as a way to know what I am dealing with in order to get the desired index value of the other cube in the collection that I want to have the current child cube look at.

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
// MESH OBJECTS
 // ---------- ----------
const mkCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
};
// creating and positioning mesh objects
const theCubes = new THREE.Group();
scene.add(theCubes);
let i = 0, len = 7;
while(i < len){
    const cube = mkCube(),
    p = i / (len - 1 );
    //position of each cube
    const x = -3 + 6 * p,
    y = -1.5 + 3 * p,
    z = -4 + Math.sin(Math.PI * p) * 6;
    cube.position.set(x, y, z);
    theCubes.add(cube);
    i += 1;
}
// using look at for each cube to set rotation of each cube
theCubes.children.forEach(function(cube, i, arr){
    let i2 = i + 1, cube2;
    if(i === 0){
        i2 = 1;
    }
    if(i >= arr.length - 1){
        i2 = arr.length - 2;
    }
    cube2 = arr[i2];
    cube.lookAt(cube2.position);
});
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2, 4, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

The end result is more or less what I had in mind for this example, but I think that I will need to write about at least one if not more examples about this sort of thing. The situation here works okay because each of the cubes look more or less the same on each side, for some other mesh objects this might not always be the case with the nature of the geometry. The thing about this is that the rotation property and the look at method are ways of setting the rotation of the object, but not the geometry of a mesh object. In some cases I might want to adjust the rotation not just of a mesh object, but also the geometry at least once in order to change what the 'front' of the geometry is.

## 3 - Rotating geometry and Mesh objects

The rotation property effects just the local rotation of the object in which I set the rotation property. In addition to this there is also setting the rotation properties of any nested children, or in the case of Mesh objects there is rotating or changing the state of the geometry that is used with the Mesh. With that said there are a number of [buffer geometry class prototype methods that have to do with the rotaiton of a geometry](/2021/05/20/threejs-buffer-geometry-rotation/), rather than the local rotation of a mesh object.

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
// MESH OBJECTS
// ---------- ----------
const mkCone = function(){
    const cone = new THREE.Mesh(
       new THREE.ConeGeometry(0.125, 0.66, 30, 30),
       new THREE.MeshNormalMaterial());
    // Rotating the geometry of each cone once
    cone.geometry.rotateX(1.57);
    return cone;
};
// get position helper
const getPos = function(i, len){
    const p = i / (len - 1 ),
    x = -8 + 15 * p,
    y = -1.5 + 3 * p,
    z = -8 + Math.sin(Math.PI * p) * 12;
    return new THREE.Vector3(x, y, z);
};
// creating and positioning mesh objects
const theCones = new THREE.Group();
scene.add(theCones);
let i = 0, len = 20;
while(i < len){
    const cone = mkCone();
    //cone.position.set(x, y, z);
    cone.position.copy(getPos(i , len))
    theCones.add(cone);
    i += 1;
}
// using look at for each cube to set rotation of each cube
theCones.children.forEach(function(cone, i, arr){
    let i2 = i + 1, 
    cone2, vec;
    if(i === 0){
        i2 = 1;
    }
    if(i >= arr.length - 1){
        vec = getPos(len, len);
    }else{
        vec = arr[i2].position;
    }
    cone.lookAt(vec);
});
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
camera.position.set(2, 4, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 4 - Setting position from rotation with the apply Euler method of the Vector3 class

A really cool and useful method in the Vector3 class is the apply Euler method which is the usual go to method for setting the state of a vector3 class based on the state of a Euler class such as the one at the rotation property of a an object3d class based object such as a mesh object. 

When I use the apply Euler method I will often define some kind of start position and start out my copying that to the position property of what I want to effect. This start position is more for the purpose of defining what the start direction should be rather than vector unit length. After I set a start position I can then use the apply Euler method as a way to change the direction relative to the start direction, normalize, and then use a method like multiply scalar to set the desired vector unit length.

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
const makeMesh = () => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial() );
};
const degToRad = (deg) => {
     return THREE.MathUtils.degToRad(deg);
};
const getBias = (a, b, count) => {
    count = count === undefined ? 1 : count;
    return THREE.MathUtils.pingpong(  a / b  * ( 2  * count ), 1);
}; 
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = makeMesh();
scene.add(mesh1);
const mesh2 = makeMesh();
scene.add(mesh2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const vStart = new THREE.Vector3(0, 0, 1);
const update = function(frame, frameMax){
    const per = frame / frameMax;
    // setting rotation of mesh1
    mesh1.rotation.x = degToRad(90 * getBias(frame, frameMax, 1));
    mesh1.rotation.y = degToRad(360) * per;
    mesh1.rotation.z = 0;
    // using the state of the rotation of mesh1 to effect the position of mesh2
    let radius = 5 - 4 * getBias(frame, frameMax, 4);
    mesh2.position.copy(vStart).applyEuler( mesh1.rotation ).normalize().multiplyScalar(radius);
    mesh2.lookAt(mesh1.position);
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

## 5 - Setting rotation from position using the set from Vector3 Euler class method

Okay so there is using the apply Euler method of the Vector3 class to set position based on rotation, but what if I want to do the inverse of that? In other words to set the rotation of an object based on the state of a Vector3 class instance. In the Euler class there is a set from Vector3 method, so there you go the name says it all.

In this example I am creating and updating a Vector3 class instance. With mesh1 I am just simply coping the current state of this vector3 instance to the position property as a way to know the current state of the Vector. With that out of the way with mesh2 I am using this set from vector method to set the rotation of the mesh object based on the state of this vector3 instance. When doing so I might want to clone and normalize the vector depending on the desired outcome.

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
const makeMesh = () => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial() );
};
const degToRad = (deg) => {
     return THREE.MathUtils.degToRad(deg);
};
const getBias = (a, b, count) => {
    count = count === undefined ? 1 : count;
    return THREE.MathUtils.pingpong(  a / b  * ( 2  * count ), 1);
}; 
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = makeMesh();
scene.add(mesh1);
const mesh2 = makeMesh();
scene.add(mesh2);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const v = new THREE.Vector3(0, 0, 0);
const update = function(frame, frameMax){
    // state of vector
    v.x = 2;
    v.y = 1.5 - 3 * getBias(frame, frameMax, 8);
    v.z = -5 + 10 * getBias(frame, frameMax, 1);
    // just set position of mesh1 to the vector
    mesh1.position.copy(v);
    // setting mesh2 rotation based on state of vector
    mesh2.rotation.setFromVector3(v.clone().normalize());
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

## 6 - Using Quaternion objects as an altertaive to Euler Objects

There are limitations to using Euler objects, and the look at method. I will not be getting into to much detail about them here but if you spend enough time playing around with threejs you will find out what they are first hand I am sure. In this section I am going over just a few quick examples of using Quaternion objects as an alternative to using Euler objects. In other words using the object3d.quaternion property to set local rotation over that of object3d.rotation.

### 6.1 - Basic Quaternion demo using the set from axis angle method

The best way to get started with with Quaternion would be to make use of the set from axis angle method. This method works by passing a normalized Vector3 object that will be used to define an axis. The second argument is then a radian value that will be used to rotate the object on this axis. These quaternion objects are often described as having a vector part, and a scalar part, and this method is more or less one way how to go about setting those two parts.

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
const mkCube = function(){
    return new THREE.Mesh(
       new THREE.BoxGeometry(1, 1, 1),
       new THREE.MeshNormalMaterial());
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = mkCube();
scene.add(mesh1);
// ---------- ----------
// SETTING LOCAL ROTATION BY WAY OF QUATERNION RATHER THAN EULER
// ---------- ----------
const v_axis1 = new THREE.Vector3(1,1,-1).normalize();
const radian1 = THREE.MathUtils.degToRad(45);
mesh1.quaternion.setFromAxisAngle(v_axis1, radian1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 6.2 - Demo Showing the deal with the Euler Gimbal Lock and how Quaternion can be used to address it

This is a demo in which I am showing what the deal is with Gimbal Lock, which is something that happens with Euler objects, and how Quaternion can be used to break free from it. I have two objects that are both created from the same helper function that form what looks like a crude kind of airplane type object. I then have not one but two update methods one of which updates the rotation of one of these objects by way of Euler angles, and the other buy way of Quaternion. Both update methods work find when I yaw the objects back and forth, however when I pitch up 90, the object that is using the Euler update method ends up rolling rather than yawing. On the other hand the update method that uses Quaternion works as exspected.

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
// RENDER
// ---------- ----------
camera.position.set(-4, 4, 4);
camera.lookAt(0,0,-1.5);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
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

## 7 - Animation example of rotation and groups

Now for a simple animation example using the request animation frame method in the body of a loop function. Also while I am at it I also made the cubes all children of a group rather than the scene object. So then in this animation example I am using the rotation property of the object3d class to rotate each child of the group over time, as well as the group as a whole.

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
// MESH OBJECTS
// ---------- ----------
const mkCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
};
const theCubes = new THREE.Group();
scene.add(theCubes);
[-45, 0, 45, 20].forEach(function(d, i, arr){
    const cube = mkCube(),
    p = i / (arr.length - 1 );
    cube.position.set(-3 + 6 * p, 0, 0);
    cube.rotation.y = THREE.MathUtils.degToRad(d);
    theCubes.add(cube);
});
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0,0,0);
// APP LOOP
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frame = 0,
frameMax = 600,
lt = new Date();
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    // rotating the group of cubes
    theCubes.rotation.y = Math.PI * 2 * per;
    // rotation of each child
    theCubes.children.forEach(function(cube, i){
        cube.rotation.x = Math.PI * 2 * ( 1 + i * 2) * per;
    });
};
// loop
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        update();
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```


## Conclusion

The rotation property is then what I often used in order to set the rotation of an object such as a mesh object, group or camera. There is also the position property of the object3d class that holds an instance of the Vector3 class that is what is used to store and change the position of the object as well. There are a whole lot of other properties as well as method to be aware of in the object3d class that come into play allot when making one or more threejs projects such as the scale property and the lookAt method just to name a few.


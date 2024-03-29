---
title: Linear lerping with the Vector3 lerp method
date: 2022-05-17 10:48:00
tags: [js,three.js]
layout: post
categories: three.js
id: 987
updated: 2023-07-25 09:46:16
version: 1.32
---

When working on a project that involves threejs and a little javaScript, I am often in a situation in which I have an object at one position and I want to translation the object from that one starting position to a new end position. There are a number of ways of doing that, but in the [Vector3 class there is a method that can be used to quickly preform a kind of linear lerp](https://threejs.org/docs/#api/en/math/Vector3.lerp) from one point to another that I think I should write a blog post on.

This lerp method can just be called off of an instance of Vector3, and when doing so the point I want to lerp to can be passed as the first argument, and an alpha value can then also be passed as a second argument. This alpha value is just simply a value between 0 and 1 that is a magnitude between these two points that the vector should be changed. Often I will not want to just use the lerp method alone though, often I use it in combination with other vector3 class methods such as the clone, copy, and set methods. There is also a thing or two to say about how to go about coming up with alpha values, and other alternatives for moving a point in space from one point to another.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/1YyELW3Z8lA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Lerp Vector3 class method and what to know first

This is a post that centers around just a single method of the Vector3 class in the javaScript library known as threejs. There is a lot of other ground to cover that I am not going to be getting into detail in this post, When it comes to the [very basics of threejs I have all ready wrote a post](/2018/04/04/threejs-getting-started/) on that. However I often use this opening section as a place to write about a few things that you should know about before hand.

### Read up more on the Vector3 class in general

There are a lot of other methods in the [Vector3 class that are also work checking out in greater detail](/2018/04/15/threejs-vector3/). Many of these methods will be used in the various source code examples in this post, so there is a lot to look into with the various other methods in order to start doing things that are interesting with lerping. For example often I will not want to just call lerp off of a Vector3 instance, I might want to clone it first which is another Vector3 class method that will return a copy of the Vector3 so I then lerp off of that copy rather than mutating the state of a source vector3.

### The source code examples in this post are on Github

The source code examples in this post can also be found in my [test threejs Github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-lerp). This is also where I park the source code examples for my [many other blog posts on threejs](/categories/three-js/) as well. Also cloning down the repo, installing packages and starting the server might be the best way to quickly get these examples and many more working on your end.

### Version numbers matter

When I first wrote this post I was using r135 of threejs, and the last time I came around to do some editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). A lot has been changing with threejs as of late, and there is now even more to write about when it comes to the deal with revision numbers. As of this writing I am still sticking to using old script tags over that of JSM. That will have to change at some point as three.min.js will no longer be supported in a future revision. There is also the fact that code breaking changes are made in fairly often so if things so not working so great on your end that would be the first thing I would check.

## 1 - Basic vector3 lerp example

For this basic section example I will be setting the position of just one mesh object with two vector3 class objects along with copy and of course the lerp vector3 class prototype methods. The v1 Vector3 is then the start point that I want and with that I can use the copy method to copy the values of this vector3 to the vector3 of the position property of the mesh object. After that I can use the lerp method to set the position to a point that is say in quarter of the way between v1 and v2 by passing v2 as the first argument and the 0.25 as the alpha value.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(mesh1);
// v1 and v2 vectors
const v1 = new THREE.Vector3(-5, 0, 0);
const v2 = new THREE.Vector3(5, 0, 0);
// position mesh1 at 0.25 alpha between v1 and v2
mesh1.position.copy(v1).lerp(v2, 0.25);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - The Vector3 lerp method, arrays of vectors, and lines

In this section I will be going over some examples that have to do with creating an array of vectors class objects with the helper of the lerp method. There is then all kinds of things that can be done with a collection of Vector3 class objects such as creating a line in space.

### 2.1  - Using the Vector3 clone, lerp, and add methods to create lines with an array of Vector3 instances

A few years back I wrote a [post on the subject of lines in threejs](/2018/04/19/threejs-line/) which is an alternative to using a Mesh object in which I am just dealing with lines in 2d space. Anyway the general way that I would go about making a line is to create an array of Vector3 class instances and then pass that array to the set from points method of the buffer geometry class. I can then use the resulting geometry with the THREE.Line constructor along with a choice in line materials to create a line object that I can then add to the scene object.
So sense the process of creating a line involves making an array of Vector3 class instances I can then use the clone method alone with lerp as a way to draw a line in space. This however will result in a straight line though which kind of defeats the purpose of having a lengthly array of points if they are all on the same slop though. However I can of course just use the lerp method as part of the process of creating the points along with a method like the add method of the vector3 class which I can use to ad deltas to points that are along the straight line if that makes any sense.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// V3 ARRAY
//-------- ----------
// creating an array of Vector3 instances
// using clone, LERP, and add methods
const points = [];
const v1 = new THREE.Vector3(5, 0, 5),
v2 = new THREE.Vector3(-5, 0, -5);
let i = 0, len = 100;
while (i < len) {
    const per = i / (len - 1),
    x = Math.cos(Math.PI * 6 * per),
    y = -2 + 4 * per;
    points.push(v1.clone().lerp(v2, per).add(new THREE.Vector3(x, y, 0)));
    i += 1;
}
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
// geometry from points array
const geometry = new THREE.BufferGeometry().setFromPoints(points);
// line object
const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: 0x0000ff,
            linewidth: 6
        }));
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.2 - Using the apply Euler method with lerp and add as well with lines

Another cool method of the [Vector3 class is the apply Euler method](/2021/06/18/threejs-vector3-apply-euler/), and speaking of the apply Euler method there is also the [Euler class as well](/2021/04/28/threejs-euler/). The Euler class is like the Vector3 class only it has to do with angles rather that Vectors, for example the rotation property of anything based off of object3d is an instance of Euler.

Anyway for this example of the vector3 lerp method I wanted to just do something with the lerp method combines with the apply Euler method and add methods of the Vector3 class. The result this time is a weird and interesting kind of line that I made with these methods.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// V3ARRAY
//-------- ----------
// creating an array of Vector3 instances
// using clone, LERP, and add methods
const points = [];
const v1 = new THREE.Vector3(5, 0, 5),
v2 = new THREE.Vector3(-5, 0, -5);
let i = 0, len = 100;
while (i < len) {
    const per = i / (len - 1),
    e1 = new THREE.Euler();
    e1.x = Math.PI * 8 * per;
    e1.z = Math.PI * 8 * per;
    // vector3
    const v3 = new THREE.Vector3();
    v3.y = Math.pow(2, 2 * per)
        points.push(v1.clone().lerp(v2, per).applyEuler(e1).add(v3));
    i += 1;
}
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
// geometry from points array
const geometry = new THREE.BufferGeometry().setFromPoints(points);
// line object
const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: 0x0000ff,
            linewidth: 6
        }));
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Curves as an alternative to vector3 lerp

The lerp method is a great little tool, but there are some alternative [options when it comes to curves](/2022/06/17/threejs-curve/), at least when it comes to moving objects around in a scene. The same effect that can be done with the Vector3 lerp method can also be done with THREE.LineCurve3 and the get point method of the base curve class along with the copy method of the Vector3 class. However there are also a number of other options when it comes to creating curve objects that allow for one or more control points in space as well.

## 3.1 - Basic LineCurve3 example

To start out with this there is making a curve that is actually just a line. This might not really be a curve in a sense, but it is a object that has all the base curve class prototype methods such as the get point method that will return a vector3 object along this line. Also I would like to start this section off with a basic example and what is nice about THREE.LineCurve3 is that is just needs to vector3 objects when calling it which are a start point and an end point.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, 0);
const v_end = new THREE.Vector3(5, 0, 0);
const curve = new THREE.LineCurve3(v_start, v_end);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(mesh1);
console.log(curve.getPoint(0));
mesh1.position.copy( curve.getPoint(0.25) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So then the same thing can be done more or less with curves, but the nice thing about curves is that there are of course other built in options for them other than THREE.LineCurve3.

### 3.2 - Cubic Bezier curve3 demo

So I have covered the basic example using LineCurve3 that can be used to do more or less the same thing as with the lerp method, but now it is time to see about making use of one of the other built in curve options that allow for one or more control point arguments. When making the control point vectors I can make use of vector3 class methods like clone and lerp to create a new vector3 from the start vector3, and then lerp to a point along a straight line that is half way or another other point that is a good place to start depending on the number of control points.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, 0);
const v_end = new THREE.Vector3(5, 0, 0);
const v_control1 = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector3(0,5,-10) );
const v_control2 = v_start.clone().lerp(v_end, 0.75).add( new THREE.Vector3(0,-5,10) );
const curve = new THREE.CubicBezierCurve3(v_start, v_control1, v_control2, v_end);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
let i = 0;
const count = 24;
while(i < count){
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 20, 20),
        new THREE.MeshNormalMaterial());
    const a_pos = ( i + 0.5) / count;
    mesh.position.copy( curve.getPoint(a_pos) );
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-4, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 4 - Animation examples

In order to really gain a good sense of what the lerp method is all about I should work out at least a few if not more animation examples. these are then examples in which I am using the vector3 lerp method, but also many other tools to create animation loop projects. There is starting out with simple ones, but then also exploring all kinds of other use case examples with this feature of the library.

### 4.1 - Basic animation loop example

For this basic animation loop example of the Vector3 lerp method I will be using the vector3 set method as a way to set the position property of a mesh object to a given home location of 5,0,0 and then use the lerp method to lerp from 5,0,0 to -5,0,0 over the course of a certain number of frames and back again. The end result is then a basic hello world style example of what the lerp method is all about I have two points in which I want to move an object between based on a value between 0 and 1.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
const light = new THREE.PointLight(0xffffff);
light.position.set(1, 2, 4);
scene.add(light);
//-------- ----------
// SCENE CHILDREN
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const geo = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00
    });
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date(),
f = 0,
fm = 300;
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000;
    const p = f / fm,
    b = 1 - Math.abs(0.5 - p) / 0.5;
    requestAnimationFrame(loop);
    // BASIC LERP EXPRESSION between 5,0,0 and -5,0,0
    mesh.position.set(5, 0, 0).lerp(new THREE.Vector3(-5, 0, 0), b);
    // render
    renderer.render(scene, camera);
    f += 30 * secs;
    f %= fm;
    lt = now;
};
loop();
```

So that is the basic idea of what the lerp method is for, now the rest of this post will just be yet even more examples that branch off of this lerp method.

### 4.2 - Using Math pow in an expression to create an alpha value

Now that I have the basic example out of the way it is clear what the lerp method does, but now there is the question of how to go about lerping in a way that is not so linear. One way would be to just go about working out some kind of expression for the alpha value that makes used of the [Math.pow method](/2019/12/10/js-math-pow/) for example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
const light = new THREE.PointLight(0xffffff);
light.position.set(1, 2, 4);
scene.add(light);
//-------- ----------
// HELPERS
//-------- ----------
// MESH
const mkMesh = function () {
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00
        }));
};
// HELPER METHOD USING LERP AND MATH POW
const lerpPow = function (a, b, n, alpha) {
    const alphaPow = Math.pow(n, 1 + ((n - 1) * alpha)) / Math.pow(n, n);
    return a.clone().lerp(b, alphaPow);
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const mesh1 = mkMesh();
scene.add(mesh1);
const mesh2 = mkMesh();
scene.add(mesh2);
const mesh3 = mkMesh();
scene.add(mesh3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let lt = new Date(),
f = 0,
fm = 300;
const v1 = new THREE.Vector3(5, 0, 0);
const v2 = new THREE.Vector3(-5, 0, 0);
const loop = function () {
    const now = new Date();
    const secs = (now - lt) / 1000;
    const p = f / fm,
    b = 1 - Math.abs(0.5 - p) / 0.5;
    requestAnimationFrame(loop);
    mesh1.position.copy(lerpPow(v1, v2, 4, b));
    mesh2.position.copy(lerpPow(
            v1.clone().add(new THREE.Vector3(0, 0, 2)),
            v2.clone().add(new THREE.Vector3(0, 0, 2)),
            6, b));
    mesh3.position.copy(lerpPow(
            v1.clone().add(new THREE.Vector3(0, 0, 4)),
            v2.clone().add(new THREE.Vector3(0, 0, 4)),
            8, b));
    // render
    renderer.render(scene, camera);
    f += 30 * secs;
    f %= fm;
    lt = now;
};
loop();
```

## Conclusion

The lerp method is then a great way to go about transitioning the state of one Vector3 to another state of Vector3. However depending on how I want to go about transition the state of a Vector3 class instance I often will nit want to just use the method alone, but in combination with other Vector3 class methods as well as various core javaScritp features as well.
---
title: The multiply scalar Vector3 prototype method in threejs
date: 2022-03-23 11:54:00
tags: [three.js]
layout: post
categories: three.js
id: 971
updated: 2023-07-13 12:02:39
version: 1.35
---

One major part of doing anything interesting with threejs is learning how to go about positioning things when it comes to working with the Vector3 class in the library. There are the very basics with this class when it comes to starting out with the set, and copy methods for example. However there are also a number of other useful methods in this class including methods like the [multiply scalar method](https://threejs.org/docs/#api/en/math/Vector3.multiplyScalar) which will be the main focal point of this post today.

The multiply scalar method is a way to adjust the unit length of the vector, without changing anything with the direction. In other words it is a way to change the position of the vector, but only along a line that passes threw the origin that is found by way of the current values of the Vector. I often use this multiply scalar method in combination with other Vector3 methods such as the normalize method that will set the unit length of the vector to that of one, which would be a good starting point before using a method like the multiply scalar. There are also a wide range of other vector3 class methods that have to do with adjusting the direction in combination of the length so I will be writing about those as well here of course.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/lNvsC4Zjbi8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The multiply scalar methods of the Vector3 class and what to know first

This is not a getting [started type post with threejs](/2018/04/04/threejs-getting-started/), and I also assume that you have at least a little experience with [client side javaScript in general](/2018/11/27/js-getting-started/) also. There are a few other topics beyond the basics of threejs that you should also be aware of at this point as well. I am not going to be going over all of this from one blog post to the next of course, however I do still like to use these opening sections to write about a few things that you might want to brush up on regardless of skill level or experience that is relevant to the use of the multiply scalar method of the vector3 class in threejs.

### Be Aware of the normalize method as well

I have wrote a post on the [normalize method](/2021/06/14/threejs-vector3-normalize/) of the Vector3 class a while back also which is something that is worth looking into more if you have not done so. What this method does is it sets the unit length of a vector to that of one while preserving the direction of the vector. From there a method like that of multiply scalar can be used to easily set any desired vector unit length. In other words think in terms of a ray starting at an origin and then moving outward into space from there. Every point that lays on this ray going outward has the same direction, but the length is what will be different.

### Read up more on the vector3 class in general

There are many other useful methods in the [Vector3 class](/2018/04/15/threejs-vector3/) that can be used together in a chain such as the add method that can be used to translate from a given vector with another vector. I will be touching base on a lot of these methods in this post but it would be best to look into Vector3 as a whole in greater detail.

### The source code examples in this post are also on Github

I have the source code examples in this post up on [my test threejs Github Repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-vector3-multiply-scalar). This is also where I am packing the source code examples for my [many oter posts on threejs](/categories/three-js) as well.

### Be mindful of version numbers

The version of threejs that I was using when I first wrote this post was r135, and the last time I came around to do some editing I was [using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Code breaking changes are made to threejs often so check your version numbers first and for most if any of these code examples are breaking on versions of threejs later than r146.

## 1 - Some Basic examples of multiply scalar

As always I will be start tout off this post with a few basic examples to get things started. These examples will be just simple static scenes, and in general I will try to keep things as simple, and to the point as possible. The main thing to focus on here I think though is not just the multiply scalar method, but also some other closely related vector class methods as well that are all closely tied to the nature of vectors.

### 1.1 - Basic Vector3 multiply scalar example

For a basic example of this multiply scalar method there is starting out with just using the typical set method to set an initial position and therefor also unit length of the vector. It is not required but it is generally a good idea to make sure that the vector unit length is one, more on that a bit later. Anyway once I have a non zero unit length for the vector I can then use the multiply scalar method to multiply the current length of the vector by any desired value that I give as the first argument when calling the multiply scalar method.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
scene.add(cube1);
scene.add(cube2); 
// SETTING POSITION WITH Vector3.set
cube1.position.set(1, 0, 0);
cube1.position.multiplyScalar(1.5);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Uisng the normalize method and multiply scalar

Now that I have a basic example of just the multiply scalar method out of the way I think I should now have at least one if not more examples that make use of the normalize method as well as the length method. These are two other vector3 class methods that I would say are very close to the use of the multiply scalar method.

If I want to find out what the current unit length of a vector is I can call the length method to get that value. However if I want to set a vector to a given unit length I can use the normalize method to set the length of the Vector to 1. After the length of the vector is one I can then use multiply scalar to set the vector to the desired unit length.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const cube1 = new THREE.Mesh( new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
const cube3 = cube1.clone();
scene.add(cube1);
scene.add(cube2);
scene.add(cube3); 
// This should help to show the deal with what normalize is about
cube2.position.set(2, 0, 3).multiplyScalar( 1.5 );
console.log(cube2.position.length().toFixed(2)); // '5.41'
cube3.position.set(2, 0, 3).normalize().multiplyScalar(1.5);
console.log(cube3.position.length().toFixed(2)); // '1.50'
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - The copy method, and other Vector3 class methods

The copy method of the Vector 3 class allows for me to copy the values of one instance of Vector3 over to another instance. The normalize method of the Vector3 class is also a very useful one that will set the length of a vector to 1 while preserving the direction of the vector. So then I can create a new instance of Vector3, then copy that to another such as the position object of a mesh, and then normalize the position to a length of one with the same direction of the vector that I copied from. Sense the length is now one, I can then use the multiply scalar method to set a desired length from there easily.

This is where things might start to get a little complex, but for the most part this is just a section where I am now pulling in the use of the copy method as a way to set the starting state of a vector. Also While I am at it I will also want to write a fair amount on many of the other useful methods in the vector3 class that go hand in hand with the use of the multiply scalar method.

### 2.1 - Copy and normalize, then use scalar

For this demo I am creating a vector in space by using the Math.sin and Math.cos core javaScript features to set the starting values for x and z. After that I can then call the copy method off of vector3 of the position property of a mesh object and pass this vector. After that I can then normalize and multiply.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
const cube3 = cube1.clone();
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
//-------- ----------
// SETTING POSITION WITH Vector3.copy, normalize, and Vector3.multiplyScalar
//-------- ----------
const radian = THREE.MathUtils.degToRad(90 + 45);
const radius = 4;
const vec = new THREE.Vector3(
    Math.cos(radian) * radius,
    0,
    Math.sin(radian) * radius
);
cube1.position.copy(vec);
const scalar = 1 + Math.round( 2 * Math.random() )
cube2.position.copy(vec).normalize().multiplyScalar(scalar);
// adjust rotation of cubes
cube1.lookAt(0, 0, 0);
cube2.lookAt(0, 0, 0);
cube3.lookAt(cube1.position);
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Nothing major it is just that often I do find myself using the copy method over set as I always have another vector3 object that I have obtained by one means or another, and this is just a fast way to copy the values of one vector to another without mutating the source vector.

### 2.2 - Translate, normalize and scalar

One additional method that I might also pull into the mix is the add method that can be used to translate from a set point. This add method can be used to add another Vector to the vector value after the use of a method like that of copy or set if I want to make adjustments to direction before normalizing and scaling. Or it can be used after doing so as a way to adjust things after normalizing and scaling.

For this example I am not also creating and positioning mesh objects in the body of a function that I am passing to the [array for each method](/2019/02/16/js-javascript-foreach/). The array that I am calling for each off of then contains data for each method object that I want in the form of nested arrays with number values that can be used to set position and a scalar value to use after normalizing that position..

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATING ANSD POSITIONING MESH OBJECTS WITH Vector3 METHODS
// including copy, add, normalize, and multiplyScalar
//-------- ----------
const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
const radian = THREE.MathUtils.degToRad(90 + 25), radius = 4;
const vec = new THREE.Vector3(Math.cos(radian) * radius, 0, Math.sin(radian) * radius);
[[0,0,0,0], [-2,1,0,1.5], [-4,2,0,3], [-8,3,0,4.5]].forEach(function(data){
    const mesh = cube1.clone(),
    x = data[0], y = data[1], z = data[2], scalar = data[3];
    mesh.position.copy(vec).add(new THREE.Vector3(x, y, z) ).normalize().multiplyScalar(scalar);
    mesh.lookAt(cube1.position);
    scene.add(mesh);
});
scene.children[1].lookAt(scene.children[2].position)
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.3 - Using curves for start points

Another use case of the copy and multiply scalar vector3 class methods would be to create [a curve](/2022/06/17/threejs-curve/), and then use the get point method of the base curve class to get a vector along the curve. Once again a point along the curve can be passed to the copy method of a vector that I want to set the position with. There is then using additional vetor3 class methods including multiply scalar to set another position relative to that point.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3( -5, 0, 5 );
const v2 = new THREE.Vector3( 1, 0, 2 );
const v3 = new THREE.Vector3( 1, 0, -5 );
const c1 =  v2.clone().lerp( v3, 0.5 ).add( new THREE.Vector3(5,0,0) );
const curve_path = new THREE.CurvePath();
curve_path.add( new THREE.LineCurve3(v1, v2) );
curve_path.add( new THREE.QuadraticBezierCurve3(v2, c1, v3) );
//-------- ----------
// HELPER
//-------- ----------
const createMesh = (color = new THREE.Color(1,1,1) ) => {
    return new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 20, 20),
        new THREE.MeshBasicMaterial({ color: color})
    );
};
//-------- ----------
// CREATE AND POSITON MESH OBJECTS USING CURVE, Vector3.copy, and Vector3.multiplyScalar
//-------- ----------
let i = 0;
const count = 10;
while(i < count){
    const v_curve = curve_path.getPoint( i / ( count - 1 ) );
    // createing a mesh at the point along the curve
    const mesh1 = createMesh();
    mesh1.position.copy( v_curve );
    scene.add( mesh1 );
    // using normalize and multiply scalar to create additional mesh objects
    // with positions that are on the same direction, but with differing lengths
    const mesh2 = createMesh( new THREE.Color( 1, 0, 0 ) );
    mesh2.position.copy( v_curve ).normalize().multiplyScalar( mesh1.position.length() + 1 );
    scene.add( mesh2 );
    const mesh3 = createMesh( new THREE.Color( 0, 1, 0 ) );
    mesh3.position.copy( v_curve ).normalize().multiplyScalar( mesh1.position.length() - 1 );
    scene.add( mesh3 );
    i += 1;
}
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Apply Euler and setting direction along with length

Another Vector3 class method that has proven to be useful is the apply Euler method. Where a vector3 class is used to define a direction and a unit length from the direction, or just simply a position in space, the Euler class is all about angles. So then say that I want to have a way to set the position of a mesh in space by giving a vector unit length, and then a few more arguments that are used to define what the direction is. Such a method can be made by making use of the apply Euler method along with the multiply scalar method.

In this example I have a helper function called set by length where I give a mesh object, and then a vector unit length that I want. After that I can give two angles and if I want a custom start direction to adjust from.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// set position of mesh based on vector unit length along with a and b values
// relative to a standard start position
const setByLength = function(mesh, len, a, b, startDir){
    startDir = startDir || new THREE.Vector3(1, 0, 0);
    const pi2 = Math.PI * 2,
    eul = new THREE.Euler(
        0, 
        a % 1 * pi2,
        b % 1 * pi2);
    // using copy to start at startDir, then applying the Euler. After that normalize and multiplyScalar
    return mesh.position.copy( startDir ).applyEuler( eul ).normalize().multiplyScalar(len);
};
// get a bias value
const getBias = function(n, d, count){
    let per = n / d * count % 1;
    return 1 - Math.abs(0.5 - per) / 0.5;
};
//-------- ----------
// OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 300,
fps = 20,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // USING SET BY LENGTH HELPER
        let len = 1 + 4 * getBias(frame, maxFrame, 6);
        let a = frame / maxFrame;
        let b = -0.125 + 0.25 * getBias(frame, maxFrame, 10);
        setByLength(mesh1, len, a, b);
        // look at, render, step, ...
        mesh1.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
```

## 4 - Animation loops examples of Vector3.multiplyScalar

Like always I will want to make at least a few animation loop examples for this post. So these examples will continue with various things that where covered in the above sections, but now the focus is more so on working out some interesting animations. Many of these will just involve the mutation of the [position property of the objects](/2022/04/04/threejs-object3d-position/) over time. However much of what is being done here can also be applied to things like the [position attributes of buffer geometry objects](/2021/06/07/threejs-buffer-geometry-attributes-position/) as well.

### 4.1 - Art Animation loop example for video one

I think I have the basic idea of the multiply scalar method covered now and then some when it comes to some additional methods that will often come into play along with it. In this example I want to make a kind of art project type thing where the goal is to just make a collection of mesh objects that look interesting when they move around in the scene. As with by apply Euler example in this post I am once gain using that helper function that I worked out in that example, but now with some additional helper functions that can be used to create and update a standard kind of group object.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
let dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-10, 3, -5);
scene.add(dl);
let al = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(al);
//-------- ----------
// HELPERS
//-------- ----------
// set position of mesh based on vector unit length along with a and b values
// relative to a standard start position
const setByLength = function(mesh, len, a, b, startDir){
    startDir = startDir || new THREE.Vector3(1, 0, 0);
    const pi2 = Math.PI * 2,
    eul = new THREE.Euler(
        0, 
        a % 1 * pi2,
        b % 1 * pi2);
    // using copy to start at startDir, then applying the Euler. After that normalize and multiplyScalar
    return mesh.position.copy( startDir ).applyEuler( eul ).normalize().multiplyScalar(len);
};
// get a bias value
const getBias = function(alpha, count){
    let per = alpha * count % 1;
    return 1 - Math.abs(0.5 - per) / 0.5;
};
// update a group
//const updateGroup = function(group, gAlpha, alphaAdjust, lenBiasCount, bBiasCount){
const updateGroup = function(group, gAlpha, opt){
    gAlpha = gAlpha === undefined ? 0 : gAlpha; 
    opt = opt || {};
    opt.alphaAdjust = opt.alphaAdjust === undefined ? 1 : opt.alphaAdjust;
    opt.lenBiasCount = opt.lenBiasCount === undefined ? 5 : opt.lenBiasCount;
    opt.bBiasCount = opt.bBiasCount === undefined ? 5 : opt.bBiasCount;
    opt.lenRange = opt.lenRange || [3, 8];
    opt.bRange = opt.bRange || [-0.125, 0.125];
    let i = 0, count = group.children.length;
    while(i < count){
        let mesh = group.children[i];
        let iAlpha = i / count;
        let alpha = ( iAlpha + gAlpha ) / opt.alphaAdjust;
        let len = opt.lenRange[0] + (opt.lenRange[1] - opt.lenRange[0]) * getBias(alpha, opt.lenBiasCount);
        let a = alpha;
        let b = opt.bRange[0] + (opt.bRange[1] - opt.bRange[0]) * getBias(alpha, opt.bBiasCount);
        setByLength(mesh, len, a, b);
        // next child
        nextChild = group.children[i + 1];
        if(i === count - 1){
           nextChild = group.children[i - 1];
        }
        mesh.lookAt(nextChild.position);
        i += 1;
    }
    return group;
};
// create a group
const createGroup = function(count, s){
    count = count === undefined ? 10 : count;
    s = s === undefined ? 1 : s;
    let i = 0;
    let group = new THREE.Group();
    while(i < count){
        let mesh = new THREE.Mesh(
            new THREE.BoxGeometry(s, s, s),
            new THREE.MeshPhongMaterial({
            }));
        group.add(mesh);
        i += 1;
    }
    updateGroup(group, 0);
    return group;
};
//-------- ----------
// OBJECTS
//-------- ----------
let group1 = createGroup(120, 0.6);
scene.add(group1);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 900,
fps = 20,
lt = new Date();
const loop = function () {
    let now = new Date(),
    secs = (now - lt) / 1000,
    fAlpha = frame / maxFrame;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        updateGroup(group1, fAlpha, {
            lenRange: [1, 6],
            bRange: [-0.125, 0.2 * getBias(fAlpha, 8)]
        });
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
//-------- ----------
// CONTROLS
//-------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
```

### 4.2 - Move many mesh objects along

This is just a quick animation demo in which I move a bunch of mesh objects between a min and max unit length values. To do so I make use of the user data objects of the mesh objects which are a great way to store user defined data for various projects that work on top of threejs. when creating the mesh objects I just append data for a min unit length, max unit length, and any additional data I might want to add such as values that can be used to set directions for vectors. In the update helper function I can then loop over all the mesh objects and then set the direction and unit length for each by making use of the set, apply Euler, and multiply scalar vector3 class methods.

<iframe class="youtube_video" src="https://www.youtube.com/embed/JBli1qv_mOI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const updateGroup = (group, alpha) => {
    group.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            const mesh = obj;
            const mud = mesh.userData;
            const e = new THREE.Euler();
            e.y = THREE.MathUtils.degToRad( mud.degY === undefined ? 0 : mud.degY );
            e.z = THREE.MathUtils.degToRad( mud.degZ === undefined ? 0 : mud.degZ );
            const unit_length = mud.minLength + (mud.maxLength - mud.minLength) * alpha;
            mesh.position.set(1,0,0).applyEuler(e).multiplyScalar(unit_length);
            const s = 0.5 + 1.5 * alpha;
            mesh.scale.set(s,s,s);
        }
    });
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
const group = new THREE.Group();
scene.add(group);
[
    { minLength: 1, maxLength: 4, degY: 0, degZ : 0 },
    { minLength: 2, maxLength: 5, degY: 90, degZ : 0 },
    { minLength: 2, maxLength: 3, degY: 180, degZ : 0 },
    { minLength: 3, maxLength: 5, degY: 270, degZ : 0 },
    { minLength: 2, maxLength: 5, degY: 270, degZ : -45 },
    { minLength: 1, maxLength: 3, degY: 0, degZ : 90 },
    { minLength: 1, maxLength: 3, degY: 0, degZ : 270 }
].forEach( (data) => {
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.5, 20, 20), new THREE.MeshNormalMaterial() );
    mesh.userData = Object.assign(mesh.userData, data);
    group.add(mesh);
});
updateGroup(group, 0);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 10);
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
    const a2 = Math.sin( Math.PI * 1 * (a1 * 8 % 1));
    updateGroup(group, a2);
    camera.position.x = 10 - 20 * a1;
    camera.lookAt( 0, 0, 0 );
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

So then the multiply scalar method is one of many tools in the toolbox that is the Vector3 class. This Vecotr3 class comes up when it comes to just about anything that has to do with a single point in space, so it is used for the value of the position attribute of the [Object3d class](/2018/04/23/threejs-object3d/) as well as with many other features in the over all library. With that said the multiply scalar method is a great tool for increasing the unit length of a vector without messing around with the direction of it.

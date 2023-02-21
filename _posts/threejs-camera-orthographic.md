---
title: The Orthographic Camera in three.js
date: 2018-05-17 16:24:00
tags: [js,three.js]
layout: post
categories: three.js
id: 189
updated: 2023-02-21 12:33:53
version: 1.46
---

In [threejs](https://threejs.org/) there are [a few cameras to work with](https://threejs.org/docs/#api/en/cameras/Camera), typically in most cases I would use the [perspective camera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera), however there is also the [orthographic camera](https://threejs.org/docs/#api/en/cameras/OrthographicCamera). With this  orthographic camera an object size will remain the same regardless of this distance in which the object is from the camera, as compared to the perspective camera which will change the size as the distance from the camera goes up. 

I often do use the perspective camera as with most of the projects I work on I want to use a camera that works like that of the human eye, but the main other camera of interest outside of that would be the orthographic camera first and foremost. With that said in this post I will be writing about the orthographic camera, and how it compares to the perspective camera. There might be a few siuations in which I might want to use this kind of camera here and there. In any case thought it is also a good idea to work out at least a few examples with a camera option other than the perspective camera just for the sake of getting a little more solid with what there is to work with in threejs.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/zX6tx9w2lF8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Orthographic Camera and what to know first

This is a post on the Orthographic Camera in the javaScript library known as threejs, it is [not a getting started post on ether threejs](/2018/04/04/threejs-getting-started/), or [javaScript in general](/2018/11/27/js-getting-started/). I trust that you have took the time to work out at lest a few basic examples with threejs, and you are now at a point where you are looking into what your options are when it comes to cameras. So I will not be getting into all kinds of various little details about threejs and JavaScript in general here of course. However in this section I will be going over some points you should be aware of before continuing to read the rest of the content.

### Might be a good idea to look into other camera options

In most situations the Orthographic Camera may not be the best choice for a project so there is looking into what the [other options are with cameras](/2018/04/06/threejs-camera/). For most typical projects I would go with the [Perspective camera](/2018/04/07/threejs-camera-perspective/) that reproduces the way that the human eye sees. 

### Be mindful of the base camera and object3d classes

There is also reading up more on the [base camera class in threejs](https://threejs.org/docs/#api/en/cameras/Camera) that contains what there is to worth with across all types of cameras. There are properties in the base class like isCamera as well as methods like the get world direction. On top of the base camera class there is also the [object3d class](/2018/04/23/threejs-object3d/) that is not only a base class of the camera class, but also a base class of many objects in threejs including mesh objects, groups, and even whole scene objects. So when it comes to doing soemthing like setting the posiiton of a camera, the same can also be done with mesh objects, and anything else that is based off of the object3d class.

### The source code in this post is on github

The [source code examples](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-camera-orthographic) in this post can be found on my test threejs repository. So if you would like to make a pull request, or just pull down this source code along with the source code for all my other blog posts on threejs that would be worth checking out. This is also the repo where I store the source code examples and addtional assets for all my [other blog posts on threejs as well](/categories/three-js/).

### Version numbers matter in three.js

When I first wrote this post back in May of 2018 I as using revision r91 of three.js. As of this writing I was using r135 of threejs last time I came around to doing a little editing with this post as well. It would seem that not to much has change with cameras over that time, at least not with the camera options that I have been sticking with. However that does not meen that code breaking chnages are not made to the librray offten, as that is indeed the case. If any example here is not working be sure to check what version you are using first.

## 1 - A basic example of the Orthographic Camera

First off it would be best to just start out with a simple getting started type example with the orthographic camera. So in this example I am just creating an instance of the orthographic camera with the THREE.OrthographicCamera [constructor function](/2019/02/27/js-javascript-constructor/), and storing the returned instance of the camera to a variable called camera. When doing so the set of arguments that I pass to the constructor will differ a little from the usual perspective camera constructor as the arguments are used to define a box like area. In other words in place of values that have to do with field of view, aspect ratio and so forth there are values for setting the left, right, top, and bottom values of a box like shape in space rather than that of a pyramid. After that there is just setting the near and far render distance values just like with the perspective camera to define a render distance as always.

```js
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// CAMERA
//-------- ----------
const left = -3.2, right = 3.2,
top2 = 2.4, bottom = -2.4,
near = 0.01, far = 100;
const camera = new THREE.OrthographicCamera(left, right, top2, bottom, near, far);
// mesh
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Once I have my instance of the orthographic camera I can use camera and object3d base classes and properties as with any other camera. For example I can use the instance of vector3 stored at the position property to set the position of the camera in space, and the look at method as a way to set rotation both of which are object3d features.

After setting up the camera the way I want it I then created a scene object, added a mesh to look at and also set up the renderer that i want to use for the example. I can now use the render method of the renderer with a scene object, and my camera object to draw the contents of the scene using the orthographic camera.

## 2 - A Orthographic Camera example involving a fun little code stack module

In this example I am just using the Orthographic Camera alone to look at a random cube stack module instance thing that I made for this post alone. This cube stack thing resembles a small cityscape or something to that effect, but it is really just to have something that is composed mainly of a bunch of cubes that are all the same uniform size.

### 2.a - The Cube Stack Model

In order to appreciate the differences between the orthographic, and perspective cameras in three.js I will first need some kind of scene that will help express that well. So that being said I made a model that I think will help make a scene that can do that very well.

For this first version of the cube stack module I just have a function returned that will generate a group object. I made the main function and only function that is returned a constructor function, so I will be using the new keyword when calling it in the main javaScript file that will make use of this.

```js
// cube-stack.js - r0 - from threejs-camera-orthographic
var CubeStack = (function () {
    // the stack constructor
    return function (opt) {
        var boxCount,
        box,
        x,
        y,
        z,
        plane,
        boxArray = [],
        boxIndex = 0;
        opt = opt || {};
        this.boxCount = opt.boxCount === undefined ? 15 : opt.boxCount;
        this.gx = 5;
        this.gy = 5;
        // this is what can be added to the scene
        this.group = new THREE.Group();
        plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(this.gx, this.gy, this.gx, this.gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    emissive: 0x0a0a0a
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        this.group.add(plane);
        // place some boxes on the plane
        while (boxIndex < this.boxCount) {
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        emissive: 0x0a0a0a
                    }));
            x = Math.floor(this.gx * Math.random());
            y = 0;
            z = Math.floor(this.gy * Math.random());
            if (boxArray[z] === undefined) {
                boxArray[z] = [];
            }
            if (boxArray[z][x] === undefined) {
                boxArray[z][x] = [];
            }
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
            box.position.set(
                -2 + x,
                y,
                -2 + z);
            this.group.add(box);
            boxIndex += 1;
        }
    };
}());
```

So I have this saved as cube_stack.js, and I link to it in my html after three.js, and before the rest of my demo where I will be using this. I could get into this in detail, and yes it is far from perfect, but that would be off topic. For now if three.js is loaded in the browser, and then this is loaded I will have a constructor that I can use in a three.js demo like this:

```js
var stack = new CubeStack();
scene.add(stack.group);
```

I could have it be a lot more that what it is but for the purpose of the subject of this post by doing this it will just add a group that contains a bunch of Mesh Object instances positioned in a way that might resemble a city. The reason why this is of interest comes when switching between the kinds of cameras used to view something like this.

### 2.1 - The main.js file for the basic orthographic camera example

Now for the main javaScript file in which I am making use of this cube stack module, and creating an instance of the camera. When creating an instance of the orthographic camera the arguments are a little different from that of the perspective camera. The first argument is not a fire of view value but a Camera frustum left plane, followed by right, top, and bottom Camera frustum values. Then after these frustum values there is the near and far values when it comes to the drawing range of the camera. I will then want to save an instance of the camera object that is returned by the new THREE.OrthographicCamera constructor just like with any other camera.

After that I can use set method of the Vector3 instance of the position property of the camera to set the position, and I also like to use the lookAt method as a way to set the orientation of the camera. If I set a static value like the zoom value of the camera I will need to call the update projection matrix method which is also the case with the perspective camera that I am used to. In this example I have chose to add a light source relative to the camera in the form of a point light, as such in order for that light source to work in a scene I am going to want to add the camera object as a whole to the scene.

```js
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ORTHOGRAPHIC CAMERA
//-------- ----------
const width = 3.2,
height = 2.4,
left = width * -1,
right = width,
top2 = height,
bottom = height * -1,
near = 1,
far = 20;
const camera = new THREE.OrthographicCamera( left, right, top2, bottom, near, far);
camera.zoom = 0.75;
camera.updateProjectionMatrix();
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight();
pl.position.set(0, 2, 3);
scene.add(pl); 
//-------- ----------
// CUBE STACK
//-------- ----------
const stack = new CubeStack({
        boxCount: 25
    });
stack.group.position.set(0, 0.5, 0);
scene.add(stack.group);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 3 + Math.sin(radian) * 2,
    z = Math.sin(radian) * 5;
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
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

I then created and added to the scene an instance of this cube stack model that I made. After that is set and done I set up and append to the html an instance of a WebGl renderer. I am then going to want to have a main animation loop in which I will be changing the position of the camera and make it so that the camera will orbit around this cube stack module.

## 3 - The Three.js Orthographic Camera Example compared to the perspective camera

This cube stack modules that I made is kind of cool, but there is a lot more that I would like to add to it and fix. I will also want to make a demo that will show the difference between the two most common camera types by comparing what is rendered using an orthographic camera to that of a perspective camera. To do this I will want to use more than one camera in my demo by having an array of cameras rather than just one camera and switch between the two as part of an update loop.

### 3.a - The new cube stack module for this example

I will be getting to what I did in the main javaScript example for thus post shortly, however for now I will want to go over what I changed in this cube stack module. For one thing I wanted to go with a module destine that is more in line with how I go about making these kinds of modules now where I have a create public method that I call to create the main object. Speaking of the main object I also now like to make it so that the main object is something based off the object3d class such as  mesh object or in this case a group.

In this new cube stack module I made a whole bunch of little fixes and changes when it comes to arguments and how the position of cubes is adjusted. However one of the coolest changes that I have made is to make use of [data textures](/2022/04/15/threejs-data-texture/) as a way to add at least a little texture to the mesh objects that I am adding to each stack of cubes.

```js
// cube-stack.js - r1 - from threejs-camera-orthographic
var CubeStack = (function () {
    // the public api
    var api = {};
    // create data texture helper
    var createDataTexture = function (width, height) {
        // data texture
        width = width || 16,
        height = height || 16;
        var size = width * height;
        var data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            var stride = i * 4;
            var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
            data[stride] = v;
            data[stride + 1] = v;
            data[stride + 2] = v;
            data[stride + 3] = 255;
        }
        var texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create the plane
    var createPlane = function (opt) {
        opt = opt || {};
        var plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(opt.gx, opt.gy, opt.gx, opt.gy),
                // materials
                new THREE.MeshStandardMaterial({
                    color: 0x00ff00,
                    map: createDataTexture(opt.gx * 4, opt.gy * 4),
                    emissive: 0x0a0a0a,
                    side: THREE.DoubleSide
                }));
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        return plane;
    };
    // append mesh objects
    var appendBoxMeshObjects = function (group, opt) {
        opt = opt || {};
        opt.boxCount = opt.boxCount === undefined ? 30 : opt.boxCount;
        var boxIndex = 0,
        boxArray = [],
        x,
        y,
        z,
        box;
        // place some boxes on the plane
        while (boxIndex < opt.boxCount) {
            box = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshStandardMaterial({
                        color: 0x00ffff,
                        map: createDataTexture(8, 8),
                        emissive: 0x1a1a1a
                    }));
            x = Math.floor(opt.gx * Math.random());
            y = 0;
            z = Math.floor(opt.gy * Math.random());
            if (boxArray[z] === undefined) {
                boxArray[z] = [];
            }
            if (boxArray[z][x] === undefined) {
                boxArray[z][x] = [];
            }
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
            box.position.set(
                (opt.gx / 2 * -1 + 0.5) + x,
                y,
                (opt.gy / 2 * -1 + 0.5) + z)
            group.add(box);
            boxIndex += 1;
        }
    };
    // public create method
    api.create = function (opt) {
        opt = opt || {};
        opt.gx = opt.gx === undefined ? 5 : opt.gx;
        opt.gy = opt.gy === undefined ? 5 : opt.gy;
        var group = new THREE.Group();
        appendBoxMeshObjects(group, opt)
        var plane = createPlane(opt);
        group.add(plane);
        return group;
    };
    // retrun public api
    return api;
}
    ());

```

### 3.1 - The Main javaScript file in which I am creating an array of cameras

In order to get a good sense of the difference between the orthographic camera compared to the typical perspective camera, I will want an array of cameras. One will be an instance of THREE.PerspectiveCamera that is what I often use in most projects, while the other will be THREE.OrthographicCamera. So then in the main javaScript file I created this array of cameras actually than just the usual single perspective camera that I do in just about almost all of my threejs examples. Any code that I will want to apply to all cameras I will of course put in the forEach loop, such as setting the position, and zoom level of the cameras.

```js
// ---------- ----------
// SCENE, RENDERER, LIGHT
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.25, 0.25, 0.25);
scene.add(new THREE.GridHelper(10,10));
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CAMERAS
// ---------- ----------
const width = 3.2,
height = 2.4;
const camera_array = [
    // camera 0 will be the typical Perspective Camera
    new THREE.PerspectiveCamera(45, width / height, .5, 100),
    // and camera 1 will be Orthographic
    new THREE.OrthographicCamera(
        -width,
        width,
        height,
        -height,
        .1,
        50)
];
let camera = camera_array[0];
// for each camera
camera_array.forEach(function (camera) {
   // set to same position, and look at the origin
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    // set zoom
    camera.zoom = .75;
    camera.updateProjectionMatrix();
    scene.add(camera);
    // add orbit controls if there
    if (THREE.OrbitControls) {
        new THREE.OrbitControls(camera, renderer.domElement);
    }
});
// ---------- ----------
// STACK
// ---------- ----------
const stack = CubeStack.create({gx: 7, gy: 4, boxCount: 35});
stack.position.set(0, 0.6, 0)
scene.add(stack);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight();
pl.position.set(0, 3, 6);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const ci = Math.floor(a1 * 8 % 2);
    camera = camera_array[ci];
    stack.rotation.set(0, Math.PI * 2 * a1, 0);
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

When all goes well this will result in a rotating scene that looks like a bunch of buildings. The example will switch between camera 0 \(perspective\), and camera 1 \(orthographic\). If you take the time to reproduce this you will notice that it is easier to tell what the size is of things.

## 4 - updating the parameters of a orthographic camera over time

Just like that of the perspective camera there is also an update projection matrix method of the camera that I will want to call when changing any of the values that are set when calling the constructor for the first time. So if I want to change the left, right, top, bottom, near, or far values in an update loop I will want to call this function after making the changes or else what I have done will not take effect.

```js
//-------- ----------
// SCENE, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.25, 0.25, 0.25);
scene.add(new THREE.GridHelper(10,10));
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight();
pl.position.set(0, 3, 6);
scene.add(pl);
//-------- ----------
// CAMERA
//-------- ----------
const width = 4.0,
height = 4.0;
const camera = new THREE.OrthographicCamera( -width, width, height, -height, 0.01, 100);
camera.position.set(5,2,5);
camera.lookAt(0, 0, 0);
//-------- ----------
// MESH
//-------- ----------
const material = new THREE.MeshNormalMaterial();
const m1 = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), material );
m1.position.set(0, 0.5, 0);
scene.add( m1 );
const m2 = new THREE.Mesh( new THREE.BoxGeometry(1,3,1), material );
m2.position.set(-3, 1.5, 1);
scene.add( m2 );
const m3 = new THREE.Mesh( new THREE.BoxGeometry(1,3,1), material );
m3.position.set(3, 1.5, -1);
scene.add( m3 );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    const width = 4 + 4 * a2;
    const height = 4 - 2 * a2;
    camera.left = width * -1;
    camera.right = width;
    camera.top = height;
    camera.bottom = height * -1;
    // CALLING UPDATE PROJECTION MATRIX METHOD
    camera.updateProjectionMatrix();
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

In just about all three.js projects I am typicality going to want to go with the perspective camera actually when it comes to features of three.js that I am actually using most of the time. Still if I am going to use a camera other that the perspective camera I would say that the orthographic camera is at the top if the list. It does result in a cool kind of visual look that I think will also prove to be useful for certain games, and animations that I might choose to make from time to time.

However in any case I think the coolest thing that I made while working on this post was this cube stack module that I might want to come back to again and again every once in a while. In fact I think it might be a good idea to crate another threejs project example in which I am creating and working with a grid of these with different settings when it comes to the count of cube in each cube stack.


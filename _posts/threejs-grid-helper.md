---
title: The Grid Helper in three.js
date: 2022-02-18 12:00:00
tags: [three.js]
layout: post
categories: three.js
id: 961
updated: 2023-07-13 12:08:47
version: 1.35
---

I have wrote a number of posts on the various helpers in threejs that can be used to get a better idea of what the visual state of things is with something in a threejs project such as with the [arrow helper](/2018/11/10/threejs-arrow-helper/) for example. However thus far I have not wrote one on the [grid helper](https://threejs.org/docs/#api/en/helpers/GridHelper), so todays post will be just a few examples of using this kind of helper in a threejs project.

There are a number of other things that can be done in place of using the grid helper, such as having one or more objects in the scene that can replace what the grid helper is used for, as well as be a part of the scene content itself. One of the typical things to do with that would be to use the [plane geometry constructor](/2019/06/05/threejs-plane/) to create a crude yet effective kind of ground mesh. When it comes to that kind of geometry. There are ways to have an [array of materials](/2018/05/14/threejs-mesh-material-index/), and then also work out some kind of pattern when it comes to using what material with what grid location. There is also just making a single texture for the surface of the plane geometry as well, using another option such as the box geometry, or going so far as making some kind of custom geometry by starting out with a [custom position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/).

However when it comes to just having a grid in the scene to just make sure that objects are where they should be, or to just get a sense of what is going on with things when it comes to working out some kind of animation, the grid helper is a nice quick way of having a grid to look at rather than just space. There are a few things to be aware of when using this Grid helper constructor, so at least a few quick example of this are called for that I will be parking in this content.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/ac8r80MsvO8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Grid helper in threejs and what to know first

This is then a post on the Grid helper one of many helper objects in the javaScript library called threejs. The grid helper is typically added directly to a scene object as a way to just know what the current state of affairs are when it comes to the center location of the scene, and where certain objects are relative to each other. However the Grid helper can be added to any object based off of the object3d class beyond just that of the scene object. Speaking of the object3d class I assume that you have at least a little knowledge of that and of course the [basics of threejs](/2018/04/04/threejs-getting-started/) as well as javaScript in general. I will be writing about a few things you show know before hand here in this section but will not be getting into to much detail as I do nt want to go to far of topic.

### Read up more on Object3d class in general

A grid helper is one of many objects in threejs that is based off of the [Object3d class](/2018/04/23/threejs-object3d/). Other examples of objects that are based off of object3d include Mesh objects, cameras, and even whole scene objects. What this means is that there are a collection of properties and methods for a grid helper that can also be used with any object in general that is based off of this object3d class. So then this is a class that is worth reading up more on if you are new to threejs, and also if you have a fair amount of experience also actually as I am still learning more about this class and many others also even though I have been at this sort of thing for a long time now.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-grid-helper) on Github. This is also where I park the source code examples for my many other [blog posts on threejs](/categories/three-js/) as well.

### Version numbers matter

When I first wrote this post I was using [r135 of threejs](https://github.com/mrdoob/three.js/releases/tag/r135), and the last time I came around to do a little editing I updated the code examples to my [r146 code style](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). At time time of this writing there are a lot of code breaking changes that will be coming up in the future when it comes to making use of plain old script tags rather than JSM.

## 1 - Some Basic examples of the GridHelper

In this basic section I will just be writing about a few quick, basic examples of the Grid helper. There is just setting up a basic set of usual suspect objects, creating an instance of a grid helper, and then adding that to the scene object. When doing so there is covering what the options are with arguments. Also there is maybe going a bit beyond that to write about things like setting the line width as well. Doing so has to do with setting options for the material that is used for the grid helper, also line width will not work on all platforms which is one reason why one might want to do with some other option if the over all look is of concern.

### 1.1 - A Basic grid helper example

To start out with this Grid helper there is just having a very simple scene that just has the grid helper and nothing else at all. So then for this basic getting started type example I first create a [scene object](/2018/05/03/threejs-scene/), and then I create the grid helper and add the grid helper to the scene object. When calling the THREE.GridHelper [constructor function](/2019/02/27/js-javascript-constructor/) there are at least two argument that i will want to pass. The first is the over all size of the grid in terms of a size that will be used for both the width and height of the grid. The second argument is the number of divisions to have in the grid. With that said if I want a grid that is 8 by 8 with 1 by 1 tiles for each grid location, then I will want to pass 8 as the size, and 8 for the number of divisions.

I will then want to create a camera such as an instance of the [perspective camera](/2018/04/07/threejs-camera-perspective/) and position the camera in a location to which I can get a good view of the helper. After moving the camera I will also want to set the orientation of the camera to make sure it is looking at the grid helper. One way to go about doing that would be to use the look at method to set a position that the camera should be looking at such as the 0,0,0 location.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// GRID HELPERS
//-------- ----------
const size = 8;
const divisions = 8;
scene.add(new THREE.GridHelper(size, divisions));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Now that I have a scene with the grid helper attached, and a camera that can be used to look at it, I now just need to [create a renderer](/2018/11/24/threejs-webglrenderer/). Once I have my renderer set up I can can the render method of the renderer and pass the scene and camera to render the scene from the perspective of the given camera.

### 1.2 - Line color

There are a few additional options for the THREE.GridHelper Constructor, both of which have to do with setting the colors of the grid lines. If I want to change the center lines, if there are any, that will be done with the third argument, while the fourth argument can be use to set the color from the rest of the lines. The values given for a color can be a hex number, or an instance of [THREE.Color](/2021/05/03/threejs-color/) that can be used to create a color by a wide range of ways including just plain old name strings such as lime.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// GRID HELPERS
//-------- ----------
const size = 8;
const divisions = 8;
const colorLinesCenter = 0xffffff;
const colorLinesGrid = new THREE.Color('lime');
const helper = new THREE.GridHelper(size, divisions, colorLinesCenter, colorLinesGrid);
scene.add(helper);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Setting the line width of a grid helper

Like many of the helpers in threejs the grid helper makes use of the line segments material which has a line width property. However setting any width higher than that of 1 might not work for all platforms. From my experience setting a line width higher than one works for me in Raspberry PI OS for example, but not in windows 10. This is then one reason why it might be a good idea to look into alternative options for this kind of thing, such as making use of a plane geometry and a mesh object for example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// GRID HELPERS
//-------- ----------
const size = 8;
const divisions = 8;
const colorLinesCenter = 0xffffff;
const colorLinesGrid = new THREE.Color('lime');
const helper = new THREE.GridHelper(size, divisions, colorLinesCenter, colorLinesGrid);
// SETTING LINE WIDTH OF MATERIAL
// !!! THIS WLL NOT WORK ON ALL PLATFORMS !!!
helper.material.linewidth = 6;
scene.add(helper);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

A lot of other things can be changed by way of just changing options for the material of the helper. For example there is setting the transparent option to true, and the adjusting the opacity. However because it is an instance of the line segments material one is limited to the options of that material, and the underlying base material class.

## 2 - Animation loop examples

I should make at least one if not more animation loop demos that make use of the grid helper. Some of these will involve the mutation of properties of objects other than that of the grid helper. However at least some of them should involve mutation of various aspects of the grid helper as this is a post on the subject of course. It is just that when it comes to real life use of this threejs feature the grid helper is often used as a way to just get an idea of what is going on when it comes to the state of things, but at pone pointer or another the grid helper will be removed. However it is not to say that there are not things that can be done to adjust the look and size of a grid helper over time.

### 2.1 - Moving a camera around a scene animation example

I am thinking that I might want to have at least one advanced example of this grid helper that has to do with a basic animation loop of some kind. With this example I just made a slight revision of an example that I made for [my post on camera movement](/2019/12/17/threejs-camera-move/) as a way to have this kind of example here. This example once again has a scene, and a grid helper attached to the scene. On top of that though I also added a mesh object and a whole lot more logic that has to do with moving a camerae around in the scene.

```js
// SCENE, RENDERER
const scene = new THREE.Scene();
const renderer = new THREE.WebGL1Renderer();
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ----------
// HELPERS
//-------- ----------
const getBias = function(per){
    return 1 - Math.abs(per - 0.5) / 0.5;
};
// create camera helper
const createCamera = function(opt){
    opt = opt || {};
    const width = 640, height = 480,
    fieldOfView = 40, aspectRatio = width / height,
    near = 0.1, far = 1000,
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
    camera.userData.subject = new THREE.Vector3();
    return camera;
};
const camMoveMethod = {};
// follow subject1 method
camMoveMethod.flyAround = function(camera, per){
    let bias = getBias(per),
    radian = Math.PI * 2 * per,
    x = Math.cos(radian) * 10,
    y = 10 - 5 * bias,
    z = Math.sin(radian) * 10;
    return {
        position: new THREE.Vector3(x, y, z), 
        lookAt: camera.userData.subject
    };
};
// move camera update helper
const moveCamera = function (camera, per, moveFunc) {
    const camState = moveFunc(camera, per);
    // set the position and lookAt values with the
    // data in the returned camState object
    camera.position.copy(camState.position)
    camera.lookAt(camState.lookAt);
};
//-------- ----------
// CAMERA
//-------- ----------
const camera = createCamera();
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(8, 8))
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
mesh.position.set(3, 0, 0);
scene.add(mesh);
camera.userData.subject = mesh.position;
//-------- ----------
// APP LOOP
//-------- ----------
let methodSecs = 0,
methodIndex = 0,
frame = 0,
lt = new Date();
const fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60,       // fps rate to move camera
frameMax = 600;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = Math.round(frame) / frameMax,
    bias = getBias(per);
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        methodSecs += secs;
        if(methodSecs >= 5){
            methodSecs = 0;
            methodIndex += 1;
            methodIndex %= Object.keys(camMoveMethod).length;
        }
        // calling camera update method
        const methodName = Object.keys(camMoveMethod)[methodIndex];
        moveCamera(camera, per, camMoveMethod[methodName]);
        // moving mesh
        mesh.position.x = -4 + 8 * bias;
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
```

### 2.1 - Opacity of the material changed over time

The material that is used for the gird helper is an instance of the line segments material. There are a lot of limitations for this kind of material compared to many of the mesh materials. However one feature that does work is transparency and with the the opacity option of the base material class that can be used to adjust the global opacity of the material.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// ADD A MESH
// ---------- ---------- ----------
const helper = new THREE.GridHelper(10, 10, 0xff0000, 0x00aa00);
helper.material.transparent = true;
scene.add(helper);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0,0,0);
const WAVE_COUNT = 12;
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = Math.sin( Math.PI * (a1 * WAVE_COUNT % 1) );
    helper.material.opacity = a2;
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

So the grid helper has become a kind of started thing to add to a scene when I am working out one or more simple demos of doing some kind of task in a basic threejs project of one kind or another. This is the main reason why I have wrote a post on this actually, so that I can have a content piece to link to from a whole lot of [other posts on threejs that I have wrote over the years](/categories/three-js) that I edit now and then in which I am using the Grid Helper.

I guess that there is not much more to write about when it comes to the GridHelper alone, but maybe there is more to cover when it comes to other options for having something that will function as something that I often use the Grid helper for. The thing about it is that I often use the grid helper as a place holder for some other kind of object that should be a best or group actually that is a floor, or ground of some kind. I have mentioned the plane geometry, but I could also use a [Box geometry](/2021/04/26/threejs-box-geometry/), or a geometry that is loaded by way of an extremal file created in blender or something to that effect. Maybe the best way to go about loading an external file would be to look into the [dea file AKA Collada file standard](/2021/04/30/threejs-dae-collada-loader/). Yet another option would be to find a way to generate some terrain by directly working with the [buffer geometry constructor](/2021/04/22/threejs-buffer-geometry/).

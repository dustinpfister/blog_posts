---
title: Spotlights in three.js, creating them, and updating them.
date: 2018-04-11 13:24:00
tags: [three.js]
layout: post
categories: three.js
id: 171
updated: 2023-06-19 11:33:05
version: 1.49
---

In this post will will be covering the subject of adding light to a scene in [threejs](https://threejs.org/), but with an emphases on [spotlights](https://threejs.org/docs/index.html#api/lights/SpotLight). When it comes to the [options to work with in threejs with lighting](/2022/02/25/threejs-light/) a spotlight is just one tool in the tool box along with many other options such as [point lights](/2019/06/02/threejs-point-light/), [directional light](/2019/06/04/threejs-directional-light/), and [ambient light](/2018/11/02/threejs-ambientlight/) just to name a few of them.

Spotlights as the name suggests is a light that will concentrate light in a cone like shape at a given target location. This kind of light then differs a great deal from other options that will just brighten things up in general such as with ambient light, or give a cylinder like beam of light where all rays move in a single parallel direction such as the case with directional light. So then in addition to adding directional or ambient light to a project, spotlights can be used as an additional kind of light source that can be moved around, and focus light in on a specific area.

For the most part the use of a spotlight is pretty straightforward, just create an instance of it with the [constructor function](/2019/02/27/js-javascript-constructor/) and add it to the scene object. However there is a fair amount to write about when it comes to the options that are passed when calling the constructor function, and also a great deal when it comes to how to go about updating the state of a spot light.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/L3-Dbqc3S8Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Spotlights in threejs, and what to know before hand

This is not a [getting started](/2018/04/04/threejs-getting-started/) post on threejs, or [javaScript in general](/2018/11/27/js-getting-started/) for that matter. I then assume that you have at least a basic working knowledge on javaScript, and that you have got your feet wet with threejs on tp of that. If not the content of this post might still prove to be a little to advanced for you until you get up to speed with the core skills that are required before hand that are outside the scope of this post.

Regardless of what your level of experience is with threejs there is a whole lot that branches off from the use of spot lights. At times it might be required to refresh on cretin things here and there. As such in this section I will be going over what some of those things might be.

### Materials matter with spotlights and light in general

I will not be getting into every little detail about [materials as that is a matter for one or more other posts completely](/2018/04/30/threejs-materials/). However I will say that one major thing to check if you are running into problems is to double check what kind of material you are using to skin your mesh objects. Many materials like that of the [basic material](/2018/05/05/threejs-basic-material/), [normal material](/2021/06/23/threejs-normal-material/), and the [depth material](/2021/05/04/threejs-depth-material/) WILL NOT respond to a light source at all. Also when it comes to materials that WILL respond to light they will not do so in the same way, for example I have come to find that [I like to use the phong material](/2022/12/29/threejs-phong-material/), or the [standard material](/2021/04/27/threejs-standard-material/), over the [lamber material](/2018/04/08/threejs-lambert-material/) when it comes to using spotlights in a project.

### The source code example for this post and many others are on github

The source code examples that I am writing about in this post can be found in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-spotlights). This is also where I park the source code for my many other blog [posts on threejs](/categories/three-js/).

### The Threejs version matters

The last time I edited this post I was [using three.js r135](https://github.com/mrdoob/three.js/releases/tag/r135) that came out in November of 2021, and when I first wrote this post I was using [threejs r91](https://github.com/mrdoob/three.js/releases/tag/r91) released in March of 2018. If you run into problems with the code examples here there are a lot of things to check, and the version number is without question one of them

This is something that I should mention in every three.js post, three.js is a javaScript project where the version number is very important, more so than usual I would say. New versions of three.js come out all the time, and when they do it's not exactly just some spelling fixes in the readme file. Often there are many major, project breaking changes that are made with the public API of the library that will result in code breaking changes with a whole worked of code examples on the open web.

## 1 - Basic example of spotlight use

When starting out with a basic example of a spotlight in three.js, at a very minimum I would want to create an instance of a spotlight by calling the THREE.SpotLight constructor with the new keyword, and then assign that instance to a variable. Once I have my instance of a spotlight I would want to change its position using the set method of the instance of Vector3 at the position property of the spotlight to a point far away from the object that I want to shine light on.

```js
// SPOTLIGHT
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(350, 340, 170);
scene.add(spotLight);
```

Assuming that I have a mesh of some kind at the origin of my scene that is equipped with a material that responds to light such as the [standard material](/2021/04/27/threejs-standard-material/), I should have a basic working example of a spotlight going on. That is that if I also have the usual scene, renderer, and camera all set up to make this an actual functioning demo of a spotlight.

Also when creating the instance of a spotlight there are a total of 6 arguments that can be given to the constructor that set various relevant values for the spotlight. The first is the color of the light, and then the intensity which is the standard for just about all lights in threejs actually. After that there are values that have to do just with a spotlight, such as the distance over which the light will decay, the angle from the center of the cone at which the spotlight will cover, as well as penumbra and decay rate values.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(6.5, 6.5, 8.5);
camera.lookAt(-0.5, -3.0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// SPOTLIGHT, AMBIENT LIGHT
//-------- ----------
const color = new THREE.Color('white'),
intensity = 1,
distance = 30,
angle = Math.PI * 0.05,
penumbra = 0.25,
decay = 0.5;
const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
spotLight.position.set(8, 8, 0);
scene.add(spotLight);
scene.add( new THREE.AmbientLight(0xffffff, 0.07));
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh_cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
mesh_cube.position.set(0, 1, 0);
scene.add(mesh_cube);
const mesh_floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshStandardMaterial({
            color: 0x008800
        }));
scene.add(mesh_floor);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

By default a spotlight will point at the origin \(0,0,0\), because the mesh I am using in this demo is located at the origin, and I am not moving anything around, this works just okay with the default settings when it comes to the target value of the spotlight. However if I want to change the target point that the spotlight is pointing at, and tweak some additional values, there is a great deal more to know about spotlights. 

There is more to know about materials as well, after all a material is what will respond to a light source such as the spotlight here. There is also a helper class that can be used to get a sense of what is going on with the spotlight by showing some lines that indicate it's present status with respect to it's position, angle, and what it is pointing at. In addition there is what to do in order to get shadows working if interested, so not that I have a basic example out of the way lets now move on to some additional examples of the spotlight.

## 2 - Changing the target of the spotlight

The target property of the spotlight is what is of interest if you want to change what it is that the spotlight is pointing at. This can be something like an instance of Object3D, or a mesh in the scene. If you just want to change the target position of the spotlight, you will still want to add it's target to the scene when you create the spotlight. If you do not at least do that, then any change to the spotlights target position will not take effect.

For this example then I am going to go with an example of this that involves a [simple animation loop using requestAnimatioFrame to do so](/2018/03/13/js-request-animation-frame/).

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0f0f0f');
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
// ---------- ----------
// SPOTLIGHT
// ---------- ----------
const color = new THREE.Color('white'),
intensity = 1,
distance = 30,
angle = Math.PI * 0.05,
penumbra = 0.25,
decay = 0.5;
const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
spotLight.position.set(8, 8, 0);
scene.add(spotLight);
scene.add( new THREE.AmbientLight(0xffffff, 0.07));
// ---------- ----------
// MESH OBJECTS
// ---------- ----------
const mesh_cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
mesh_cube.position.set(0, 1, 0);
scene.add(mesh_cube);
const mesh_floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 1, 10),
        new THREE.MeshStandardMaterial({
            color: 0x008800
        }));
scene.add(mesh_floor);
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 8, 12);
camera.lookAt(0,0,0);
// APP LOOP
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frame = 0,
frameMax = 600,
lt = new Date(),
spotTarget = new THREE.Object3D(); // spotlight target
spotLight.target = spotTarget; // set spotLight target for spotLight
scene.add(spotTarget); // add spotLight target to the scene
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    radian = Math.PI * 2 * per,
    x = Math.cos(radian) * 8, 
    y = 10,
    z = Math.sin(radian) * 8;
    spotLight.position.set(x, y, z);
    spotTarget.position.set(0, 0, -3 + 6 * bias);
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

## 3 - Getting shadows to work with a spotlight

Spotlights are a type of light in three.js that can be used to cast shadows. This is something that will not just work right out of the gate, as properties need to be set for the spotLight, renderer, and the objects in your scene that will cast, and receive shadows. Also shadows will not work with some renderer's, but It should in most cases work just fine with the webGL renderer. 

One thing to keep in mind though is that shadows will of course eat up more processing power compared to not using them, which is why you might consider putting in an option to turn them off when designing your project.

### 3.1 - Setting up the renderer for shadows

First off make sure you are using a renderer that supports shadows in the first place, the plane old 2d canvas renderer for instance does not. If you are using a renderer that does support shadows, and think you might do okay with the default settings for the shadow map of the renderer then all you have to do, for the renderer at least, is to set the shadowMap.enabled boolean to true.

```js
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
```

### 3.2 - Setting up Objects for shadows

The Object3D class has castShadow, and receiveShadow properties that both default to false. You will want to set one, the other, or both of these booleans to true for any and all objects in your scene that you want to have cast or receive shadows.

```js
var cube = new THREE.Mesh(
    new THREE.BoxGeometry(200, 200, 200),
    new THREE.MeshLambertMaterial({
        color: 0xff0000
}));
cube.position.set(0, 150, 0);
cube.castShadow = true; // my cube will cast a shadow
scene.add(cube);
```

Notice that I am also using the Lambert material with my cube that will respond to light, be sure you are using a material like that unless for some reason you want an object that will cast a shadow, but not reflect a light source.

### 3.3 - Setting up the spotLight, and full shadow demo

Just like the objects that will case or receive shadows, you will want to set the castShadow boolean of the spotLight instance to true. In addition there are some more properties of the spotLight that you may want to play with that have to do with setting the resolution of the shadow map, and the geometry of the cone of the spotlight.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 5000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 150, 0);
    cube.castShadow = true;
    scene.add(cube);
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3000, 3000, 8, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true; // the plane will receive a shadow
    scene.add(plane);
    // ---------- ----------
    // SPOTLIGHT
    // ---------- ----------
    var spotLight = new THREE.SpotLight(0xffffff);
    // I must at least set the caseShadow boolean
    // of the spotLight to true
    spotLight.castShadow = true;
    // additional shadow properties of interest
    spotLight.shadow.mapSize.width = 64;
    spotLight.shadow.mapSize.height = 64;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
    // additional spotlight properties of interest
    spotLight.intensity = 2;
    spotLight.penumbra = .5;
    spotLight.angle = Math.PI / 2.5;
    spotLight.distance = 1000;
    spotLight.position.set(-250, 350, 250);
    scene.add(spotLight);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}());
```

## 4 - Spotlight geometry and other metrics

There are a number of properties that can be used to change the geometry of the cone that composes the area of the spotlight. two major values that may come to mind are the angle of the cone, as well as the distance. It is nit to say that there are not many other properties of interest when it comes to spot lights though, other values that I might want to adjust over time world be intensity and color, but as far as geometry of the cone is concerted it is mainly just the distance and angle values.

So then I can update angle and distance of the cone like this:

```js
spotLight.angle = Math.PI / 2.5;
spotLight.distance = 1000;
```

These can be used to set the geometry of the cone, in addition to that there are more values that have to do with the intensity of the light, and the [penumbra](https://en.wikipedia.org/wiki/Umbra,_penumbra_and_antumbra#Penumbra) of the spotlight.

```js
spotLight.intensity = 2;
spotLight.penumbra = .5;
```

There are many other properties and values that can be used to adjust the state of a spot light of course, but much of that has to do with object3d class properties and values that are true of any other scene object in threejs.

### 4.1 - Full example of this

Now for an animation loop example in which I am mutating values of a spotlight over time. For this example I have placed everything of interest when it comes to this specific topic in the update method in the code. I am changing the angle over time as well as intensity, and on top of that I am using the position property of the object3d class to move the spot light also.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, RENDERER
    // ---------- ----------
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 8, 12);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // SPOTLIGHT
    // ---------- ----------
    var color = new THREE.Color('white'),
    intensity = 1,
    distance = 30,
    angle = Math.PI * 0.05,
    penumbra = 0.25,
    decay = 0.5;
    var spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
    spotLight.position.set(5, 20, 0);
    scene.add(spotLight);
    scene.add( new THREE.AmbientLight(0xffffff, 0.07));
    // ---------- ----------
    // MESH OBJECTS
    // ---------- ----------
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 1, 0);
    scene.add(cube);
    var floor = new THREE.Mesh(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshStandardMaterial({
                color: 0x008800
            }));
    scene.add(floor);
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date(),
    spotTarget = new THREE.Object3D(); // spotlight target
    spotLight.target = spotTarget; // set spotLight target for spotLight
    scene.add(spotTarget); // add spotLight target to the scene
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        radian = Math.PI * 2 * per;
        spotLight.intensity = 0.1 + bias;
        spotLight.angle = 0.05 + 0.15 * bias;
        spotTarget.position.set( Math.cos(radian) * 3, 0, Math.sin(radian) * 3);
    };
    // loop
    var loop = function () {
        var now = new Date(),
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
}
    ());
```

## 5 - Static spotlight helper example

If you want to see what is going on with the spotlight, by having a way of showing the current area of the cone with some lines, there is no need to make your own object for dong so. There is a special helper class in three.js just for this purpose. To use this helper I just need to create an instance of new THREE.SpotLightHelper and pass a reference to the spotlight that I want to use the helper with. I will then want to pass reference to the resulting spot like helper to the spotlights add method so that the helper is a child of the spotlight.

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f0f0f');
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
    camera.position.set(5, 8, 12);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // ---------- ----------
    // SPOTLIGHT WITH HELPER
    // ---------- ----------
    var spotLight = new THREE.SpotLight(new THREE.Color('white'), 0.5, 10, 0.5, 1);
    spotLight.position.set(3, 3, 0);
    spotLight.add(new THREE.SpotLightHelper(spotLight))
    scene.add(spotLight);
   // MESH OBJECTS
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 1, 0);
    scene.add(cube);
    var floor = new THREE.Mesh(
            new THREE.BoxGeometry(10, 1, 10),
            new THREE.MeshStandardMaterial({
                color: 0x008800
            }));
    scene.add(floor);
    // RENDER
    renderer.render(scene, camera);
}());
```

## 6 - Spotlight helper animation loop example

So I have a static scene example of the spotlight helper, but I am thinking that I should also have an animation loop example for this sort of thing also. The only main thing that I need to do is to just simply call the update method of the spot light helper object in the loop after updating the state of the spot light that I made the helper for.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    // CAMERA
    var camera = new THREE.PerspectiveCamera(40, 320 / 240, 1, 5000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 0, 0);
    // CUBE
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xaffe00,
                emissive: 0x0a0a0a,
                side: THREE.DoubleSide
            }));
    cube.position.set(0, 0.5, 0);
    cube.castShadow = true;
    scene.add(cube);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.getElementById('demo').appendChild(renderer.domElement);
    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLight.castShadow = true;
    spotLight.position.set(-2.5, 3.5, 2.5);
    spotLight.intensity = 2;
    spotLight.penumbra = 0.5;
    spotLight.angle = Math.PI * 0.15;
    spotLight.distance = 6;
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    scene.add(spotLight.target);
    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(8, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00afaf,
                emissive: 0x202020,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);
    // INIT
    renderer.setSize(640, 480);
    // LOOP
    var frame = 0,
    maxFrame = 500,
    lt = new Date(),
    fps = 24;
    loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = 1 - Math.abs(0.5 - per) / 0.5,
        r = Math.PI * 2 * per,
        x = Math.cos(r) * 3,
        y = Math.sin(r) * 3,
        z = 2;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            spotLight.position.set(x, z, y);
            spotLight.target.position.set(-1 * 2 * bias, 0, 0);
            spotLightHelper.update();
            renderer.render(scene, camera);
            frame += fps * secs;
            frame = frame % maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

Te sport light helper then gives me a great idea of what is going on with the state of the spotlight, I can the adjust the various values for the spotlight until I get something that will work well with the project that I am working on.

## Conclusion

There is much more to know about spotlights, and lights in general as well as the differences in the materials that respond to lights like the spotlight as well as with light in general. Yet another kind of light to work with in three.js is the [point light](/2019/06/02/threejs-point-light/) that can be used to shine light in all directions from a given point in the scene. This is the kind of light that I often fine myself using in examples as I tend to like that kind of nature of the point light. 

There is also zeroing in a usual option when it comes to materials also, and with that I often like to go with the standard material. I have my reasons why I like the standard material, and those reasons get a little involved, but simple put it just strikes me as a well balanced material. It is not to say that there are not contenders when it comes to the other options though, such as the phong material that is pretty cool because it supports highlights.

As I author more content on three.js, and create more demos, I often get around to updating my older content on three.js now and then as well, and this post is no exception to this. When I first wrote this post back in 2018 I was using r91 of three.js, and as of this writing I was using r135, and it would look like not much of anything has changed when it comes to spotlights at least.


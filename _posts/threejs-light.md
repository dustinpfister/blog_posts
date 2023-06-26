---
title: Light options in threejs
date: 2022-02-25 12:29:00
tags: [three.js]
layout: post
categories: three.js
id: 963
updated: 2023-06-26 07:28:45
version: 1.34
---

When making a [threejs](https://en.wikipedia.org/wiki/Three.js) project there will be at least some projects in which I might want to add one or more light sources to a [scene object](/2018/05/03/threejs-scene/). There are a lot of options to choose from when it comes to light sources, and sense this post will be a general overview of light in threejs I will be going over what some of those options are. However there are also a whole lot of other things that branch off from the use of light sources that I am also going to want to write about also here while I am at it.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/CmQt0C3dE24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Light in threejs and what to know first

There is not just going over what the options are when it comes to having one or more light sources in a scene, there is also a lot to cover when it comes to many other things that branch off from the use of lights. Although I will be trying to keep this examples fairly simple, this is still not any kind of getting started with javaScript and [threejs type post](/2018/04/04/threejs-getting-started/). I will then not be getting into detail with every little thing that will come up, however in this opening section I will mention a few things that you might want to read up more on before getting into everything that has to do with light. 

### Know at least a thing or two about materials

When adding mesh objects to a scene I have to give a material, and some materials will not show up at all if it just has say a color value and no light source. This is because the color property of a material is treated differently from one material to another and will not work the same way when compared to another. This is the case when comparing the [standard material](/2021/04/27/threejs-standard-material/) to that of the [basic material](/2018/05/05/threejs-basic-material/), the standard material will react to light sources while the basic material will not. 

So in some cases I might need to add at least one light source in order to see anything at all, this will of course be the case if the scene is composed of mesh that all use a material like the standard material, and I do not have an emmisve color, or [emissive map](/2021/06/22/threejs-emissive-map) for example. 

Speaking of emmsive maps and colors that is just one of many things that also comes to mind when thinking about everything there is to work with when it comes to light and materials in threejs. I should also write at last a thing or two about materials also while I am at it, because the choice of material matters a lot when it comes to light. For example when I was first starting out with threejs I was using materials like the [Normal Material](/2021/06/23/threejs-normal-material), Basic material, and [Depth materials](/2021/05/04/threejs-depth-material/), these are great options for many various reasons, but not of them will work with light sources. I have also wrote a [main post on materials](/2018/04/30/threejs-materials/) as well if you would like to check out my overview of materials in general before coming back to light.

## Read up more on the Object3d class if you have not done so yet

Many of the light options such as point lights, and spotlights require the use of many features of the object3d class in order to get a desired end result with them. So it is a good idea to know thing or two about various properties in the [object3d class](/2018/04/23/threejs-object3d/) namely the position and rotation properties. 

With some light sources such as ambient light the position of the light does not matter, however it does matter with many other kinds of lights. When it comes to spot lights for example I will want to set the position of the light, and also the orientation of the light so that it is focus on a desired target of interest in the scene.

### The source code examples in this post are on Github

The source code example that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-light). This is also where I part the source code examples for my [many other threejs posts](/categories/three-js/) that I work on at least a little almost every day.

### Version numbers matter

When I first wrote this post I was using r135 of threejs, and the last time I came around to do a little editing I was [using r146, and thus I was using the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) that I set for that revision. If you run to any problems the first thing you will want to check is the version number that you are using. Threejs is a fast moving project in terms of its development and code breaking changes are made to it now and then with each revision number moving forward.

## 1 - Basic Static Ambient light example

Maybe one of the best options to choose from to get started with when it come to light would be an [Ambient Light](/2018/11/02/threejs-ambientlight/). This kind of light will just add a base amount of light to all surfaces of all mesh object in a scene evenly. There is nothing going on with this light source when it comes to position and rotation so it can just be added to the scene and thats it.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// ADDING AMBIENT LIGHT TO THE SCENE
// ---------- ----------
const al = new THREE.AmbientLight(0x2a2a2a, 0.5);
scene.add( al );
// ---------- ----------
// ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshStandardMaterial( { color: new THREE.Color('red') } )
);
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
renderer.render(scene, camera);
```

## 2 - Static directional light example

[Directional light](/2019/06/04/threejs-directional-light/) in a way is just a slightly more advanced kind of ambient light in which the position of the direction light matters. As the name suggests light travels in one direction, but it does so in a parallel kind of way rather than being focused in a specific area light with spotlights, or outward in all directions like with point lights. For this reason a directional light might be one of the best options for having a sun light effect, but when doing so I might still want to have ambient light as well to still have a base amount of light for all surfaces.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ADDING DIRECTIONAL AND AMBIENT LIGHT TO THE SCENE
// ---------- ----------
const dl = new THREE.DirectionalLight(0x2a2a2a, 2.5);
dl.position.set(25, 50, -25);
scene.add(dl);
scene.add(new THREE.AmbientLight(0x2a2a2a, 0.25));
// ---------- ----------
// ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('red') } )
);
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER
// ---------- ----------
renderer.render(scene, camera);
```

## 3 - Hemisphere Light

For the most part I like to stick with a certain core set of light options such as directional light, and ambient light. However there are a few other options that could prove to be a good choice for certain projects, such as the [Hemisphere light](https://threejs.org/docs/#api/en/lights/HemisphereLight). This is a kind of light source that comes from above the scene and it will rage from a sky color to a ground color given in the form of the first two arguments when calling the constructor function.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(2,2,2);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// Hemisphere Light
// ---------- ----------
const hl = new THREE.HemisphereLight( 0x00afff, 0xffaf00, 1 );
scene.add( hl );
// ---------- ----------
// ADDING MESH OBJECT TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('white') } )
);
mesh1.rotation.set(0, Math.PI * 1.95, Math.PI * 0.35)
scene.add(mesh1);
// ---------- ----------
// RENDER static scene
// ---------- ----------
renderer.render(scene, camera);
```

## 4 - Point Lights

Another great option for lighting is [point lights](/2019/06/02/threejs-point-light/) which as the name suggests will shine light outward in all directions.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// POINT LIGHT
// ---------- ----------
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(0, 0, 0);
scene.add( pl );
// ---------- ----------
// MESH
// ---------- ----------
const mesh = new THREE.Mesh(
     new THREE.TorusGeometry(1, 0.25, 150, 150),
     new THREE.MeshPhongMaterial()
);
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
camera.lookAt(mesh.position);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 5 - Animation loop examples

In this section I will now be going over a few source code examples that involve the use of an animation loop rather than that of a static scene. There are a lot of features that are just best represented by way of a little animation rather than just a single rendered view of some objects after all.

### 5.1 - Directional light animation example

To gain a better sen of what is going on with directional light it might be a good idea to work in some controls that can be used to change the position of the directional light, or have some kind of animation loop. For this example I will be doing the latter and will also be writing about additional examples such when it comes to other light source examples in the post from here on out.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// ADDING DIRECTIONAL AND AMBIENT LIGHT TO THE SCENE
// ---------- ----------
const light = new THREE.DirectionalLight(0x2a2a2a, 2.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x2a2a2a, 0.25));
// ---------- ----------
// ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.75),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('red') } )
);
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 60, // fps rate to move camera
frame = 0,
frameMax = 600,
lt = new Date();
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    radian = Math.PI * 2 * per,
    x = Math.cos(radian) * 25, 
    y = 0,
    z = Math.sin(radian) * 25;
    light.position.set(x, y, z);
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

### 5.2 - SpotLights

Spotlights are a pretty cool feature to play around with, and in certain projects I might want to use one or more of them. I have [wrote a post in which I get into spotlights in detail](/2018/04/11/threejs-spotlights/), with very simple getting started type examples upwards to examples that make use of most of the features to be aware f when using spotlights. For this post I will be going over a custom example that I made just for this post that I think covers all of the various feature that I would want to be aware of when making use of them when it comes to the argument values, and also updating what the target and helper values in an animation loop.

When it comes to the THREE.Spotlight constructor the first two arguments are for the color and intensity which is the standard set of values for all lights as usual. After that there is distance, angle, penumbra, and decay. The distance is the distance over which the light will effect a surface, while the angle is the angle from the center of the code. The additional values that I might want to adjust then are penumbra, and decay. The penumbra is a kind of shading for the outer part of the spotlight area, and decay as the name suggests is the rate at which the light will decay over the distance.

Another major aspect of a spotlight is the target property f the light which is the object that the spot light should be focus on. This object can be a mesh object, or any object based off of the object3d class including just a plain object3d instance which is what I was using in this example. So I can then move the spot light itself, and also move the target object as a way to control the origin at which the light is coming from as well as what the spotlight is focused on.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SPOTLIGHT
// ---------- ----------
let distance = 10,
angle = Math.PI / 180 * 20,
penumbra = 1,
decay = 0.5;
const light = new THREE.SpotLight(0xffffff, 1, distance, angle, penumbra, decay);
const target = new THREE.Object3D();
const lightHelper = new THREE.SpotLightHelper(light);
light.target = target;
light.add( lightHelper );
scene.add(target);
scene.add(light);
scene.add(new THREE.AmbientLight(0x2a2a2a, 0.3));
// ---------- ----------
// ADDING A FEW MESH OBJECTS TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('cyan') } )
);
mesh1.rotation.x = -1.57;
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30, // fps rate to move camera
frame = 0,
frameMax = 120,
lt = new Date();
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5,
    radian = Math.PI * 2 * per;
    // setting target position
    target.position.set(Math.cos(radian) * 1.5, 0, Math.sin(radian) * 1.5);
    // setting spot light position
    light.position.set(-2 + 4 * bias, 0.25 + 1.25 * bias, 0);
    lightHelper.update();
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

One more additional feature that I like to use when adjusting things with a spot light is the spot light helper which will help to get a visual idea of what is going on with a spot light. There is also the update method of this kind of object that I will want to call when changing values of the spotlight instance over time.

### 5.3 - Point light Loop

For this demo I am now working out a loop example that will make use of point lights.

```js
// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
// creating a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINT LIGHT
// ---------- ----------
const light = new THREE.PointLight(0xffffff, 1);
light.add(new THREE.Mesh(new THREE.SphereGeometry(0.05, 20, 20)));
scene.add(light);
scene.add(new THREE.AmbientLight(0x2a2a2a, 0.3));
// ---------- ----------
// ADDING A FEW MESH OBJECTS TO THE SCENE
// ---------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    new THREE.MeshPhongMaterial( { color: new THREE.Color('cyan') } )
);
mesh1.rotation.x = -1.57;
scene.add(mesh1);
// ---------- ----------
// CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
// ---------- ----------
// APP LOOP
let secs = 0,
fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30, // fps rate to move camera
frame = 0,
frameMax = 120,
lt = new Date();
// update
const update = function(){
    const per = Math.round(frame) / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    light.position.set(-2 + 4 * bias, 2, 0);
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

I have wrote a number of posts on light in threejs thus far, but I have not yet write a post on light in general until now. I am sure that there is a great deal about light in threejs that I have missed, so there will be edits of this post in the future for sure, and maybe at a higher frequency that usual when it comes to editing. I just about always have some ideas drafted out when it comes to what to do with future edits of a post and this post on light in general with threejs is not exception of course. I will want to add at least a few more examples that have to do with more advanced topics for sure, but when it comes to that I still need to figure it out for myself.


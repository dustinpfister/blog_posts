---
title: spotlights in three.js
date: 2018-04-11 13:24:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 171
updated: 2021-05-02 10:05:52
version: 1.13
---

There are lights, and there is having a camera, and then there is having some action or movement in a scene. In this post will will be covering all three of those things in [three.js](https://threejs.org/), but with an emphases on [spotlights](https://threejs.org/docs/index.html#api/lights/SpotLight). Spotlights as the name suggests is a directional light that will concentrate light in a cone like shape at a given target. This kind of light source differs from other options that will just brighten things up in general such as with ambient light, or give a cylinder like beam of light that where all rays move in a single parallel direction such as the case with directional light. In addition to adding directional light to a project, spotlights can be used to generate shadows, if the render used can do so, and is set up to render shadows.

<!-- more -->

## 1 - What to know before hand

This is not a [getting started](/2018/04/04/threejs-getting-started/) post on three.js, or javaScript in general. I assume that you have at least a basic working knowledge on javaScript, and that you have your feet wet with three.js. If not I have other posts that may help.

In this post I will not be covering materials in three.js in detail, but I also assume that you know that in three.js some materials respond to a light source, and others do not.

## 1.1 - The Three.js version matters

This is something that I should mention in every three.js post, yes three.js is a javaScript project where the version number is very important. New versions of three.js come out all the time, and when they do it's not exactly just some spelling fixes in the readme file. Often there are many major, project breaking changes that are made.

The last time I edited this post I was using three.js 0.127.0 \( or just simply r127 \) that came out in March of 2021, and when I first wrote this post I was using three.js 0.91.0  released in March of 2018.

## 2 - Basic example of spotlight use

When starting out with a basic example of  a spotlight in three.js, at a very minimum I would want to create an instance of a spotlight by calling the THREE.SpotLight constructor with the new keyword, and then save that instance to a variable. Once I have my instance I would want to change its position using the Object3D position.set method to a point far away from the origin, or position it wherever I want it to be. I will then want to also make sure that the spotlight is facing the object that i want to shine light on.

```js
// SPOTLIGHT
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(350, 340, 170);
scene.add(spotLight);
```

Assuming that I have a mesh of some kind at the origin of my scene that is equipped with a material that responds to light such as the [Lambert material](/2018/04/08/threejs-lambert-material/), I should have a basic working example of reflectance going on. I will also need the usual scene, renderer, and camera all set up to make this an actual function demo.

like this:
```js
(function () {
 
    // SPOTLIGHT
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(4.2, 3.4, 1.7);
 
    // scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
    // ADD THE SPOTLIGHT TO THE SCENE
    scene.add(spotLight);
 
    // A MESH with Lambert Material
    // which responds to a light source.
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    scene.add(cube);
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0,0,0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(640, 480);
    // render what we have
    renderer.render(scene, camera);
 
}
    ());
```

By default a spotlight will point at the origin (0,0,0), because the mesh I am using in this demo is located at the origin, and I am not moving anything around, this works just okay with the default settings when it comes to things like the angle of the cone, and the light intensity. However if I want to change the target point that the spotlight is pointing at, and tweak some additional values, there is a great deal more to know about spotlights. Also there is more to know about materials as well, after all a material is what will respond to a light source. There is also a helper class that can be used to get a sense of what is going on with the spotlight by showing some lines that indicate it's present status with respect to it's position, angle, and what it is pointing at. In addition there is what to do in order to get shadows working if interested, so lets get to it.

## 3 - Changing the target of the spotlight

The target property of the spotlight is what is of interest if you want to change what it is that the spotlight is pointing at. This can be something like an instance of Object3D, or a mesh in the scene. If you just want to change the target position of the spotlight, you will still want to add it's target to the scene when you create the spotlight. If you do not at least do that then any change to the spotlights target position will not take effect.

```js
    // spotlight
    var spotLight = new THREE.SpotLight(0xffffff);
    scene.add(spotLight);
    scene.add(spotLight.target);
 
    // now I can change both postion, and target
    spotLight.position.set(-200, 200, 200);
    spotLight.target.set(100,0,200);
```

It is also possible to set the target of the spotlight to a mesh that you have in the scene before hand.

```js
spotLight.target = mesh;
```

## 4 - Getting shadows to work with a spotlight

Spotlights are a type of light in three.js that can be used to cast shadows. This is something that will not just work right out of the gate, as properties need to be set for the spotLight, renderer, and the objects in your scene that will cast, and receive shadows. Also shadows will not work with some renderer's, but It should in most cases work just fine with the webGL renderer. 

One thing to keep in mind though is that shadows will of course eat up more processing power compared to not using them, which is why you might consider putting in an option to turn them off when designing your project.

### 4.1 - Setting up the renderer for shadows

First off make sure you are using a renderer that supports shadows in the first place, the plane old 2d canvas renderer for instance does not. If you are using a renderer that does support shadows, and think you might do okay with the default settings for the shadow map of the renderer then all you have to do, for the renderer at least, is to set the shadowMap.enabled boolean to true.

```js
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
```

### 4.2 - Setting up Objects for shadows

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

### 4.3 - Setting up the spotLight, and full shadow demo

Just like the objects that will case or receive shadows, you will want to set the castShadow boolean of the spotLight instance to true. In addition there are some more properties of the spotLight that you may want to play with that have to do with setting the resolution of the shadow map, and the geometry of the cone of the spotlight.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);
 
    // Camera
    camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 5000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);
 
    // A CUBE
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            new THREE.MeshLambertMaterial({
                color: 0xff0000
            }));
    cube.position.set(0, 150, 0);
    cube.castShadow = true;
    scene.add(cube);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.setSize(320, 240);
 
    // SpotLight
    var spotLight = new THREE.SpotLight(0xffffff);
    // I must at least set the caseShadow boolean
    // of the spotLight to true
    spotLight.castShadow = true;
 
    // additional shadow properties of interest
    spotLight.shadow.mapSize.width = 128;
    spotLight.shadow.mapSize.height = 128;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 1000;
 
    // additional spotlight properties of interest
    spotLight.intensity = 2;
    spotLight.penumbra = .5;
    spotLight.angle = Math.PI / 2.5;
    spotLight.distance = 1000;
 
    spotLight.position.set(-250, 350, 250);
    scene.add(spotLight);
 
    // add plane to the scene
    var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(3000, 3000, 8, 8),
            new THREE.MeshStandardMaterial({
                color: 0x00afaf,
                side: THREE.DoubleSide
            }));
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true; // the plane will receive a shadow
    scene.add(plane);
 
    // render what we have
    renderer.render(scene, camera);
 
}
    ());
```

## 5 - Spotlight geometry and other metrics

There are a number of properties that can be used to change the geometry of the cone that composes the area of the spotlight. two major values that may come to mind are the angle of the cone, as well as the distance.

```js
spotLight.angle = Math.PI / 2.5;
spotLight.distance = 1000;
```

These can be used to set the geometry of the cone, in addition to that there are more values that have to do with the intensity of the light, and the [penumbra](https://en.wikipedia.org/wiki/Umbra,_penumbra_and_antumbra#Penumbra) of the spotlight.

```js
spotLight.intensity = 2;
spotLight.penumbra = .5;
```

## 6 - Spotlight helper

If you want to see what is going on with the spotlight, by having a way of showing the current area of the cone with some lines, there is no need to make your own object for dong so. There is a special helper class in three.js just for this purpose.

```js
    var spotLight = new THREE.SpotLight(0xffffff),
    spotLightHelper = new THREE.SpotLightHelper(spotLight);
 
    // add a spotlight helper to the spotlight
    spotLight.add(spotLightHelper);
    scene.add(spotLight);
    scene.add(spotLight.target);
 
    // when changing the spotlight position
    // or target I will want to update the helper
    spotLight.position.set(-100, 100, -100);
    spotLight.target.position.set(20, 5, 5);
    spotLightHelper.update();
```

## 7 - Conclusion

There is much more to know about spotlights, and lights in general as well as the differences in the materials that respond to lights like the spotlight. As I author more content on three.js, and update more demos, I often get around to updating by older content on three.js now and then, and this post is no exception to this.
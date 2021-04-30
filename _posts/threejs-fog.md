---
title: Adding fog to a scene in three.js
date: 2018-04-16 11:59:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 176
updated: 2021-04-30 15:17:51
version: 1.9
---

Adding Fog to a Scene in [three.js](https://threejs.org/) is a fairly easy, and straight forward process, so this should be a quick post for today. However there are still a few basic things that a developer should be aware of when it comes to adding fog, such as the fact that one can not just use any material, and that typically the background color of a scene should be same color used for the color of the fog when creating it with the [THREE.FogExp2 constructor](https://threejs.org/docs/#api/en/scenes/FogExp2).

 A Fog is a nice effect to have for most projects as it allows for a more graceful transition from rendering within range to no longer rendering when an object is to far from the camera, as apposed to the object just all of a sudden disappearing. Even if you have the far value of the camera set to a high value so that the object is just a single pixel before it is no longer rendered, it can still be a nice additional effect on top of the object just simply getting smaller.
 
So in this post I will be going over a basic example of fof in a three.js project.

<!-- more -->

## 1 - What to know before hand

This is a post on how to go about adding fog to a three.js project. You should have some knowledge of three.js, and javaScript development in general in order to get any benefit from this post. I have written a post on how to [get started with three.js](/2018/04/04/threejs-getting-started/) if you are completely new on how to work with three.js. The version of three.js is something that is important when writing post on it, and in this post I am using three.js [r91](https://github.com/mrdoob/three.js/tree/r91).

## 2 - Adding a Fog to a Scene in three.js

A fog is something that you add or do not add to a three.js [Scene](https://threejs.org/docs/index.html#api/scenes/Scene). By default the value of the fog property of a Scene instance is null, so if you do not add one there will not be one by default.

```js
    // Scene
    var scene = new THREE.Scene();
    fogColor = new THREE.Color(0xffffff);
 
    scene.background = fogColor;
    scene.fog = new THREE.Fog(fogColor, 0.0025, 20);
```

You pass the Fog constructor three arguments the first is the color, the second is the near distance, and the final is the far distance of the fog effect. This is similar to the camera as well where there are also values that are the near and far distances for the cameras view of a scene in which it is used.

Typically you will also want to set the Fog color, as the same color as the background. You also might want to have the near, and far distances correspond to your camera as well.

## 3 - Full Fog Demo

A full working demo will require all the usual components that make up a fully functioning three.js project. There is nothing out of the norm when it comes to setting up the renderer as compared to working with things like shadows.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    // ADDING BACKGROUND AND FOG
    fogColor = new THREE.Color(0x00af00);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.5);
 
    // A Material that DOES SUPPORT FOG
    // being use in a Mesh
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                emissive: 0x080808
            }));
    scene.add(mesh);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    camera.add(new THREE.PointLight(0xffffff));
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // Loop
    var frame = 0,
    maxFrame = 500,
    target_fps = 30;
    lt = new Date();
    var loop = function () {
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5,
        now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / target_fps) {
            mesh.position.z = 1 + 4 * bias;
            mesh.rotation.x = Math.PI * 2 * 4 * per;
            mesh.rotation.y = Math.PI * 2 * 2 * per;
            camera.lookAt(mesh.position);
            renderer.render(scene, camera);
            frame += target_fps * secs;
            frame = frame % maxFrame;
            lt = now;
        }
    };
 
    loop();
}
    ());
```

In this demo I put in a simple loop to to have a camera move back and forth from a simple mesh as a way to show off the fog effect.

## 4 - Check your materials

You will want to make sure that you are using a material that can be effected my shadows. Some materials will not work with a fog, such as the [MeshNormalMaterial](https://threejs.org/docs/index.html#api/materials/MeshNormalMaterial). To help with this you can check the fog boolean which is a property of the base [Material class](https://threejs.org/docs/index.html#api/materials/Material).

```js
    var material = new THREE.MeshNormalMaterial();
 
    console.log(material.fog); // false
 
    var material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            emissive: 0x080808
        });
 
    console.log(material.fog); // true
```

## 5 - linear vs exponential fog

There are two fog constructors in three.js, for the most part I have just covered the normal linear Fog constructor where the fog grows at a constant rate as the distance grows farther until the far distance is exceeded. There is another constructor that does the same thing, only at an exponential rate that can be defined by one of its arguments with not near, or far values. This fog just takes two arguments then, the color, and a value that represents the exponential rate at which the fog will grow denser.

```js
scene.fog = new THREE.FogExp2(fogColor, 0.1);
```

## 6 - Conclusion

That is it for now when it comes to just fog along in three.js, which is a nice feature to have at the ready when toying around with things. Also I am sure that it is a feature that I will want to use in certain actually full projects in the future for certain scenes.



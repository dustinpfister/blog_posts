---
title: Adding a Fog effect in three.js
date: 2018-04-16 11:59:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 176
updated: 2022-02-20 12:17:33
version: 1.44
---

Adding fog to a Scene object in [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) generally means just creating an instance of [THREE.Fog](https://threejs.org/docs/#api/en/scenes/Fog) or [THREE.ForExp2](https://threejs.org/docs/#api/en/scenes/FogExp2) constructor functions, and setting that to the fog property of a scene object. However there are still a few basic things that a developer should be aware of when it comes to adding fog, such as the fact that one can not just use any material, and that typically the background color of a scene should be same color used for the color of the fog.

A Fog is a nice effect to have for most projects as it allows for a more graceful transition from rendering something that is within range of a render distance, to no longer rendering when an object is to far from the camera, as apposed to the object just all of a sudden disappearing. Even if you have the far value of the camera set to a high value so that the object is just a single pixel before it is no longer rendered, it can still be a nice additional effect on top of the object just simply getting smaller. However with that said that alone is just one of many little additional details that have to do with the over all process of working fog into a scene. That is taking into account what the current values are for the near and far values of the camera and do then need to be tweaked, or given some kind of UI control also.
 
In this post then, I will be going over a basic example of fog in a three.js project, and after that I will be getting into at least a few more examples also while I am at it. So then in the process of covering fog in threejs, I will also be touching base on a few other three.js rated topics such as the nature of the [ mesh standard material](/2021/04/27/threejs-standard-material/) which is one option when it comes to [using a material](/2018/04/30/threejs-materials/) that will work with fog, among many other things that will come up while adding fog to a scene.

<!-- more -->

## Threejs fog and What to know before hand

This is a post on how to go about adding fog to a scene object when making a project with the javaScript library known as three.js. You should have some knowledge of three.js to begin with there, and also additional skills that are required before even getting into threejs, such as basics javaScript development in general. Otherwise you might have a hard time befitting from what I am writing about in this post. 

I have written a post on how to [get started with three.js](/2018/04/04/threejs-getting-started/) if you are completely new on how to work with three.js that might be a decent starting point. When it comes to [getting started with javaScript in general](/2018/11/27/js-getting-started/) I have wrote a number of posts on that before hand as well, so I will not be getting into detail about the basics of threejs and javaScript here. However In this section I will be going over some things that you might want to read up on more that are closely related to the topic of fog in threejs though.

### The source code examples here can be found on github

The source code examples that I am writing about here can be found on my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-fog) repository, along with many other examples for all my other posts. So if you see something wrong with one of the source code examples here that is where a pull request can be made. There is also the comments section of this blog post that can be used to bring something up that might need to be changed, or added.

### Version numbers matter with three.js

The version of three.js is something that is important when writing post on it, often many code breaking changes are introduced that will result in older examples no longer working. When I first started writing this post I am using three.js [r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I edited this [post I as using r127](https://github.com/mrdoob/three.js/tree/r127). It would seem that not much of anything has changed with fog alone at least thus far, but still this is always something that a developer should be aware of when it comes to the fact that three.js is a fairly fast moving target in terms of development.

### Be mindful of what material you are using when adding fog

Not all materials will work with fog, for example the Normal Material will not work with fog, but the Lambert and standard materials will. If you have not done so before hand it might be a good idea to go over all the materials that there are to work with out of the box with threejs, and work out some basic examples of each. Also play around with lights and so forth in order to get a better sense of what the options are for materials that will not just work well with fog, but also light sources. I have [my post on materials in general](/2018/04/30/threejs-materials/), but for this post I will be sticking to the standard material as that seems to be one of the best general middle of the road type material options for light, fog, performance, and appearance.

### Read up more on the scene object in general

The scene.fog property is of course a feature of the THREE.Scene class, and there is a [great deal more to know about this scene class](/2018/05/03/threejs-scene/) and the objects that it creates beyond just that of the fog property. For example there is the background property of the scene object which can be used to set a solid color background, or a [cube texture](/2018/04/22/threejs-cube-texture/) for the scene. 

There is also a great deal that branches off from the scene object such as the fact that a scene object is one of many objects in threejs that is based on the [Object3d class](/2018/04/23/threejs-object3d/). It is Also a good idea to become familiar with the [THREE.Color](/2021/05/03/threejs-color/) class that can be used to create a color object for the background, as well as for the fog color of a scene. This color constructor can also be used to set solid color properties for the materials used with a mesh also such as the color property that will respond to light.

## 1 - Simple static scene example of Fog in threejs

I always like to make the first example of a post a simple, hello world type example. With that said this example will just involve creating a fog for a very basic static scene that just involves a single mesh, along with just a few more objects such as a camera and a grid helper, and that is it.

One thing that I think I should mention right away before going on to any and all additional sections is that for this example I will be setting the same color for both the fog, and the solid background color. This can end up giving a false impression as to what the fog effects though by getting people to think that the fog will effect both the materials of mesh objects as well as the background. However this is not the case it is just that I am using a simple solid color background, and that solid background colo is the same as the fog color.

```js
(function () {
    // SCNEN
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(8, 8, 0xffffff, 0x000000))
 
    // ADDING BACKGROUND AND FOG
    var fogColor = new THREE.Color(0xffffff);
    scene.background = fogColor; // Setting fogColor as the background color also
    scene.fog = new THREE.Fog(fogColor, 0.25, 4);
 
    // Use a Material that SUPPORTS FOG
    // when making a Mesh such as the standard material
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    scene.add(mesh);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(2, 0.75, 2);
    camera.lookAt(0, 0, 0);
    // adding a point light to the camera
    var light = new THREE.PointLight(0xffffff);
    light.position.y = 0.5;
    camera.add(light);
    scene.add(camera);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    renderer.render(scene, camera);
}
    ());
```

## 2 - An animation loop example of Fog

A full working demo will require all the usual components that make up a fully functioning three.js project. There is nothing out of the norm when it comes to setting up the renderer as compared to working with things like shadows for example where there are some special properties that have to be set for the renderer, as well as mesh objects. With fog I just need to create a Fog for the scene.fog property using the THREE.FoxExp2 constructor, setting the color and density for the fog via the arguments.

```js
(function () {
 
    // SCNEN
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(8, 8, 0xffffff, 0x000000))
 
    // ADDING BACKGROUND AND FOG
    fogColor = new THREE.Color(0x00af00);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(fogColor, 0.5);
 
    // Use a Material that SUPPORTS FOG
    // when making a Mesh such as the standard material
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff0000
            }));
    scene.add(mesh);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
    camera.position.set(2, 0.75, 2);
    camera.lookAt(0, 0, 0);
    // adding a point light to the camera
    var light = new THREE.PointLight(0xffffff);
    light.position.y = 0.5;
    camera.add(light);
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

In this demo I put in a simple loop to have a mesh move back and forth from the camera as a way to show off the fog effect. The effect seems to work just as I would expect, and adjusting the density value will make the fog more or less dense when it comes to playing around with this a little.

## 3 - Check your materials

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

## 4 - linear vs exponential fog

There are two fog constructors in three.js, for the most part I have just covered the normal linear Fog constructor where the fog grows at a constant rate as the distance grows farther until the far distance is exceeded. There is another constructor that does the same thing, only at an exponential rate that can be defined by one of its arguments with not near, or far values. This fog just takes two arguments then, the color, and a value that represents the exponential rate at which the fog will grow denser.

```js
scene.fog = new THREE.FogExp2(fogColor, 0.1);
```

## 5 - Conclusion

That is it for now when it comes to just fog alone in three.js, which is a nice feature to have at the ready when toying around with things. Also I am sure that it is a feature that I will want to use in certain actual full projects in the future for sure, but I am thinking that I will want to maybe look more into some kind of custom shader for this sort of thing when it comes to some kind of real project. The three.js fog features built into the core of the library are a great start with fog at least, but it would be nice to at least have a hight argument for a fog effect also.

There are a number of other similar features about three.js that might also be worth looking into when it comes to backgrounds and fog, for example there is having a [cube texture](/2018/04/22/threejs-cube-texture/) for the background rather than just a solid color background.



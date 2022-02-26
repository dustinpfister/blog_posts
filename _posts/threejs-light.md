---
title: Light options in threejs
date: 2022-02-25 12:29:00
tags: [three.js]
layout: post
categories: three.js
id: 963
updated: 2022-02-26 07:56:20
version: 1.8
---

When making a [threejs](https://en.wikipedia.org/wiki/Three.js) project there will be at least some projects in which I might want to add one or more light sources to a [scene object](/2018/05/03/threejs-scene/). When adding one or more mesh objects to a scene I have to give a material, and some materials will not show up at all if it just has say a color value and no light source. This is because the color property of a material is treated differently from one material to another and will not work the same way from one material to another. 

There are a lot of options to choose from when it comes to light sources, and sense this post will be a general overview of light in threejs I will be going over what those options are. However there are also a whole lot of other things that branch off from the use of light sources that I am also going to want to write about also here.

## Light in threejs and what to knwo first

That being said there is not just going over what the options are when it comes to having one or more light sources in a scene, there is also a lot to cover when it comes to many other things that branch off from the use of light objects. For example there is also knowing how to move a light source around, so I will also have to cover a thing or two about various properties in the [object3d class](/2018/04/23/threejs-object3d/) while I am at it and much more that will pop up here and there. With some light sources such as ambient light the position of the light does not matter, however it does matter with many other kinds of lights such as directional lights and spotlights. Also when it comes to spot lights it is not the position but also rotation that matters so there is covering certain things with it comes to working with Vector3 and Euler classes.

### Know at least a thing or two about materials

In some cases I might need to ad at least one light source in order to see anything at all, this will of course be the case the scene is composed of mesh that all use a materials like the [standard material](/2021/04/27/threejs-standard-material/) and do not have an emmisve color or [emissive map](/2021/06/22/threejs-emissive-map). Speaking of emmsive maps and colors that is just one of many things that also comes to mind when thinking about everything there is to work with when it comes to light in threejs. 
I should also write at last a thing or two about materials also while I am at it, because the choice of material matters a lot when it comes to light also. For example when I was first starting out with threejs I was using materials like the Normal material, basic material, and depth materials, these are great options for many various reasons, but not of them will work with light sources.

<!-- more -->

### 1 - Basic Static Ambient light example

Maybe one of the best options to choose from to get started with when it come to light would be an [Ambient Light](/2018/11/02/threejs-ambientlight/). This kind of light will just add a base amount of light to all surfaces of all mesh object in a scene evenly. There is nothing going on with this light source when it comes to position and rotation so it can just be added to the scene and thats it.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(6, 6));
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING AMBIENT LIGHT TO THE SCENE
    // ---------- ----------
    var light = new THREE.AmbientLight(0x2a2a2a, 0.5);
    scene.add(light);
    // ---------- ----------
    // ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5),
            new THREE.MeshStandardMaterial( { color: new THREE.Color('red') } )
    );
    scene.add(mesh1);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

### 2 - Static directional light example

[Directional light](/2019/06/04/threejs-directional-light/) in a way is just a slightly more advanced kind of ambient light in which the position of the direction light matters.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(6, 6));
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING DIRECTIONAL AND AMBIENT LIGHT TO THE SCENE
    // ---------- ----------
    var light = new THREE.DirectionalLight(0x2a2a2a, 2.5);
    light.position.set(25, 50, -25);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x2a2a2a, 0.25));
    // ---------- ----------
    // ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.5),
            new THREE.MeshPhongMaterial( { color: new THREE.Color('red') } )
    );
    scene.add(mesh1);
    // ---------- ----------
    // CALLING RENDER OF RENDERER
    // ---------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 3 - Directional light animation example

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, AND RENDERER
    // ---------- ----------
    // creating a scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(6, 6));
    // camera
    var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.6, 100);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // ---------- ----------
    // ADDING DIRECTIONAL AND AMBIENT LIGHT TO THE SCENE
    // ---------- ----------
    var light = new THREE.DirectionalLight(0x2a2a2a, 2.5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x2a2a2a, 0.25));
    // ---------- ----------
    // ADDING A MESH WITH, SPHERE GEOMETRY, AND THE STANDARD MATERIAL TO THE SCENE
    // ---------- ----------
    var mesh1 = new THREE.Mesh(
            new THREE.SphereGeometry(0.75),
            new THREE.MeshPhongMaterial( { color: new THREE.Color('red') } )
    );
    scene.add(mesh1);
    // ---------- ----------
    // CALLING RENDER OF RENDERER IN AN ANIMATION LOOP
    // ---------- ----------
    // APP LOOP
    var secs = 0,
    fps_update = 30,   // fps rate to update ( low fps for low CPU use, but choppy video )
    fps_movement = 60, // fps rate to move camera
    frame = 0,
    frameMax = 600,
    lt = new Date();
    // update
    var update = function(){
        var per = Math.round(frame) / frameMax,
        radian = Math.PI * 2 * per,
        x = Math.cos(radian) * 25, 
        y = 0,
        z = Math.sin(radian) * 25;
        light.position.set(x, y, z);
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

## 4 - Conclusion


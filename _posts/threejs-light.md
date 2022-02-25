---
title: Light options in threejs
date: 2022-02-25 12:29:00
tags: [three.js]
layout: post
categories: three.js
id: 963
updated: 2022-02-25 12:45:21
version: 1.2
---

When making a threejs project there will be at least some projects in which I might want to add one or more light sources to a scene. This will of course be the case if I want to see anything at all with certain materials if they do not have an emmisve color or emissive map. Speaking of emmsive maps and colors that is just one of many things that also comes to mind when thinking about everything there is to work with when it comes to light in threejs. That being said there is not just going over what the options are when it comes to having one or more light sources in a scene, there is also a lot to cover when it comes to the materials that will respond to light sources also. There is also knowing how to move a light source around if it is a kind of light where the position of the light matters, so I will also have to cover a thing or two about various properties in the object3d class while I am at it and much more that will pop up here and there.

<!-- more -->

### 1 - Basic Static Ambient light example

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


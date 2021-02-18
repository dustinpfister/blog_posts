---
title: Setting some ambient light in three.js
date: 2018-11-02 20:04:00
tags: [js,three.js]
layout: post
categories: three.js
id: 319
updated: 2021-02-18 17:41:18
version: 1.9
---

When making a [three.js](https://threejs.org/) project, and working with materials that respond to light such as the standard material it might be desirable to add some [ambient light](https://threejs.org/docs/index.html#api/en/lights/AmbientLight) to a scene. Ambient Light differs from other light sources in that it will evenly illuminate materials even;y from all directions. This is very different from spot lights or point lights that radiant out light from a certain point in space and only illuminate surfaces that strike the surfaces that they come in contact with.
<!-- more -->

## 1 - What to know

This is a post on adding [ambient light](https://en.wikipedia.org/wiki/Shading#Ambient_lighting) to a three.js project. This is not a getting started post on three.js or javaScript in general, but being aware of ambient light is just one of several options when it comes to adding a light source to a three.js project, so it is something that one should at least be aware of.

## 2 - Basic example of ambient light

Setting up some ambient light for a project is not to hard at all. I just need to call the THREE.AmbientLight constructor, and pass it a color value that will be used for the color of the AmbientLight.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
 
// MESH
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);
 
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
//renderer.physicallyCorrectLights = true;
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Adjust the intensity

There is often at least one additional little thing that I like to do when adding ambient light to a project and that is to tone down the intensity at least a little. On top of that I will often add yet another light source to the project that is a direction light rather than an ambient light that will effect all materials evenly.

```js
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
 
```

## 4 - Conclusion

Ambient light is just on way of adding some light to a scene in general. It will result in light evenly hitting all surfaces of all objects in the scene, this differs from other options when it comes to lighting in three.js such as [spotlights](/2018/04/11/threejs-spotlights/).

---
title: Setting some ambient light in three.js
date: 2018-11-02 20:04:00
tags: [js,three.js]
layout: post
categories: three.js
id: 319
updated: 2021-05-13 16:03:35
version: 1.18
---

When making a [three.js](https://threejs.org/) project, and working with materials that respond to light such as the standard material it might be desirable to add some [ambient light](https://threejs.org/docs/index.html#api/en/lights/AmbientLight) to a scene. Ambient Light differs from other light sources in that it will evenly illuminate materials evenly from all directions, actually direction is not really even taken into account with this kind of light source. By adding an ambient light it will just simply light up all surfaces of all mesh objects that are skinned with a material that will respond to light when it is added to the scene object. 

This kind of light source is very different from spot lights or point lights that radiant out light from a certain point in space and only illuminate surfaces that strike the surfaces that they come in contact with. However it is often a good idea to combine ambient light with one of these kinds of lights in order to see a kind of depth. I also like to tone down the intensity of an ambient light so that it does not end up making all the surfaces fully intense canceling out the effects of any additional direction light sources I might have added.

So then in this post I will just be going over a few quick examples of using ambient light in a three.js project. In the process of doing so I will also be covering a few other loosely related topics when it comes to light in general, such as the kinds of materials that can be used that will be effected by light.

<!-- more -->

## 1 - What to know

This is a post on adding [ambient light](https://en.wikipedia.org/wiki/Shading#Ambient_lighting) to a three.js project to set a base amount of light for all mesh object materials. This is not a getting started post on three.js or javaScript in general as getting into the very basics is outside the scope of this post. So I assume that you have gone beyond the hello world stage of three.js at thins point and are now just trying to figure out some of the basics when it comes to light sources. Being aware of ambient light is just one of several options when it comes to adding a light source to a three.js project, so it is something that one should at least be aware of.

## 2 - Basic example of ambient light

Setting up some ambient light for a project is not to hard at all. I just need to call the THREE.AmbientLight constructor, and pass it a color value that will be used for the color of the AmbientLight. I will then want some kind of mesh to look at that makes use of a material that will respond to light. One example of this kind of material would be the standard material, but there are additional alternatives such as the Lambert material. In any case for this example at least I just went with a simple cube geometry and the standard material as a way to skin it.

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

So the result of this is that I have a red cube in front of me in the canvas element. If I did not have any light at all I would not be able to see the cube. When it comes to materials like the basic material for example that is a material that does not work with light at all. So when using the basic material I can just see whatever the color of a cube is without having to bother with light.

Ambient light is not and end all solution for light though, I often do add at least one additional direction light source such as a point light and position that light in such a way as to be able to see some kind of depth with the cube.

## 3 - Adjust the intensity

There is often at least one additional little thing that I like to do when adding ambient light to a project and that is to tone down the intensity at least a little. On top of that I will often add yet another light source to the project that is a direction light rather than an ambient light that will effect all materials evenly.

```js
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
```

## 4 - Add a point light, with ambient light that has reduced intensity

So adding an ambient light is just a way to set a kind of even baseline amount of light. Doing so if often a good idea because if there is no light at all then materials that respond to light but do not have any kind of emissive map will not show up at all. However an ambient light is not a replacement for directional light, I often do add at least one direction light source to a scene such as a point light.

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
 
// ADD AmbientLight, and reduce the intensity
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
 
// ADD a Point Light and position the light away from the camera
var pointLight = new THREE.PointLight('white');
pointLight.position.set(20, 30, 40);
pointLight.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        new THREE.MeshBasicMaterial({
            color: 'white'
        })));
scene.add(pointLight);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
 
//renderer.physicallyCorrectLights = true;
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

So this might prove to be a better situation when it comes to adding a basic lighting setup for a threejs example. However there is maybe even A bit more to cover whe it comes to ambient light. Also it should go without saying that there is a great deal to cover when it comes to additional light sources as well as materials that respond to light. There is also the emissive maps of materials also, that is making a mesh that will have its own light as it where.

## 5 - Conclusion

Ambient light is just on way of adding some light to a scene in general. It will result in light evenly hitting all surfaces of all objects in the scene, this differs from other options when it comes to lighting in three.js such as [spotlights](/2018/04/11/threejs-spotlights/) which is a kind of directional light. I do jot often use spotlights though, the light directional light source that I often go with is a [point light](/2019/06/02/threejs-point-light/) that will throw light in all directions from the position at which the point light is placed.

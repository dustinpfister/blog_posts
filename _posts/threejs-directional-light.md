---
title: directional light in three js
date: 2019-06-04 09:08:00
tags: [js,three.js]
layout: post
categories: three.js
id: 472
updated: 2022-05-14 14:44:53
version: 1.31
---

In [three js](https://threejs.org/) there is an option to use [directional light](https://threejs.org/docs/#api/en/lights/DirectionalLight) which is one of several types of light to choose from when getting into the subject of [adding light to a scene](/2022/02/25/threejs-light/) object. Other options that I find myself using the most thus far include [point lights](/2019/06/02/threejs-point-light/), and [ambient light](/2018/11/02/threejs-ambientlight/), but in some cases I might want to use directional light in place of or on top of these other options that I seem to prefer at this time.

A directional light is like ambient light in the sense that it is a good way to go about simulating day light, but it is not the same thing, because with directional light, the light is coming from a certain direction. With ambient light a base light intensity is just applied for all materials in a scene and the location of the ambient light in world space does not really matter. It is still not the same thing as a point light through as the light is coming in one direction all throughout the scene rather than radiating outward from a point.

So then directional light is kind of like that of point lights and [spotlights](/2018/04/11/threejs-spotlights/) in that I want to set a desired value for the position property of the object that is returned when calling the THREE.DirectionalLight constructor. However when doing so I can also make use of a normalized Vector3 instance value, as the direction and not so much the magnitude of that directional that matters with directional light. When it comes to spot lights and point lights it is both direction and position that matter.

<!-- more -->

## Directional light in threejs and what to know first

The subject of light in threejs can get a little involved, but should not be to hard to do for most javaScript developers that have some experience. I would say that there are mainly a few things that one should at least be aware of when it comes to materials as not all materials will even work with lights to begin with. There are a few more things beyond that, but much of it is stuff that you should all ready know at least a little about when starting out with your first few hello world type examples involving materials like the normal material, depth material, or basic material that will not work with light.

If you still need to take a step back when it comes to the very basics of threejs I will be keeping these examples fairly simple, but it would likely be best to start out with some kind of [getting started post on threejs](/2018/04/04/threejs-getting-started/). So I will not be getting into the very basics of threejs and javaScript here. However I will mention a few things in this section that you should have an understanding of before continuing.

### Know a thing or two about materials

It is require to know that not all materials will respond to light sources, such as the mesh basic material, and the mesh normal material just to name a few that are not going to work with light. When I work with light I often go with the [standard material](/2021/04/27/threejs-standard-material/), but there are some additional options such as the Lambert material and the Phong material.

### The Vector3 class, and the object3d position property

At this time you should know at least a little about the [object3d class](/2018/04/23/threejs-object3d/), and mainly the [position property of the object3d class](/2022/04/04/threejs-object3d-position/) that is an instance of the [Vector3 class](/2018/04/15/threejs-vector3/). When it comes to a directional light the position property is what is used to set, well, the direction.

### The version number of threejs is important

When I made the code examples for this post I was using threejs revision 127. I do not think that much has changed with direction light for a real long time, however I can not say the same for a whole lot of other features of threejs. At some point in the future it is possible that the code examples here might break, so it is a good idea to always take into account what the version number is that you are using as well as the version number that was used by the author of a code example on the open web.

## 1 - Directional Light threejs example

So here I have a basic example of a directional light as a way to have some light in a scene that will work with a material that responds to light such as the standard material. To create an instance of directional light in three js I just need to call the THREE.DirectionalLight constructor and add the resulting instance of that constructor to the scene object. When calling the constructor I can pass a color as the fist argument, and an intensity level as a value between zero and one as the second argument.

```js
// SCENE
var scene = new THREE.Scene();
// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(1.2, 1.2, 1.2);
camera.lookAt(0, 0, 0);
// RENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
// Something in the scene
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0a0a0a
        }));
scene.add(mesh);
// render
renderer.render(scene, camera);
```

By default the position of the directional light is 0,1,0 and the target of the directional light is the origin at 0,0,0.

## 2 - Moving a directional light

A directional light like most lights and objects that are placed in a scene in three js inherits from the object 3d class, so it has a position property than can be used to set the position of the directional light to a point other than that of the default position.

```js
var scene = new THREE.Scene();

// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);

var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(10, 15, 10);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
var material = new THREE.MeshStandardMaterial({color: 0xff0000,emissive: 0x0a0a0a});
var mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),material);
mesh.position.y=2;
scene.add(mesh);
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), material);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane)

// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // change directional light position
    dl.position.set(Math.cos(r)*10, 2, Math.sin(r)*10);
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

Changing the position of the directional light is just on f two points of interest when it comes to changing the direction of the light. The other point of interest is the target property of the directional light that can also be changed to something other than the default as well.

## 3 - Very basic house example with vase AmbientLight and shadows

So I am thinking that directional light might be one of the best choices when it comes to simulating sunlight. Still I think that I might only want to use directional light in conjunction with at least one additional light source such as ambient light. So in this example I am working out the beginnings of a very simple outdoor scene that will juts make use of a mesh made with the Box geometry as a way to represent a house, and a plain geometry based mesh to represent ground.

```js
var scene = new THREE.Scene();

// directional light
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
scene.add(dl);
 
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
 
// add AmbientLight
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var materials = {
    house_sides: new THREE.MeshStandardMaterial({
        color: 0xffffff
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00
    })
};
 
var house = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), materials.house_sides);
house.position.y = 1;
house.castShadow = true; //default is false
house.receiveShadow = false; //default
scene.add(house);
 
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
 
// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

When this is up and running I have directional light working as expected, but when the direction light is not longer hitting the surface of a mesh the ambient light is still doing its thing to make sure that there is still a base amount of light.

## Conclusion

So then direction light is one of a few options for light sources that can be used with, or as a replacement for ambient light in a scene. However I would always use ambient light and then maybe directional light, as I have found that it is still a good idea to always have a base amount of light for materials.

I went a little farther with the house example of this post and ended up making a slightly more advanced model of a house that is not just a box geometry but a group of meshes being used together to create something that I am calling a house. If you would like to check it out it is one of my many [three.js example](/2021/02/19/threejs-examples/) posts, I have it listed there along with all the other basic project examples I have together thus far.

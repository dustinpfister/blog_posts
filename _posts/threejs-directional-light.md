---
title: directional light in three js
date: 2019-06-04 09:08:00
tags: [js,three.js]
layout: post
categories: three.js
id: 472
updated: 2021-06-02 09:58:37
version: 1.16
---

In [three js](https://threejs.org/) there is an option to use [directional light](https://threejs.org/docs/#api/en/lights/DirectionalLight) which is one of several types of light to choose from when getting into the subject of adding light to a scene. Other options that I find myself using the most thus far include [point lights](/2019/06/02/threejs-point-light/), and [ambient light](/2018/11/02/threejs-ambientlight/), but in some cases I might want to use directional light in place of or on top of these other options that I seem to prefer. 

A directional light is like ambient light in the sense that it is a good way to go about simulating day light, but it is not the same thing, because with directional light, the light is coming from a certain direction to a certain target location. With ambient light a base light intensity is just applied for all materials in a scene and the location of the ambient light in world space does not really matter. A directional light is also like a spot light in the sense that it is coming from a certain location to a certain target location, but not in a cone like manner as with the spot light. With direction light it is just direction that is really of concern and that is just it, so it differs greatly from point lights and spot lights. So in this post I thought I would work out just a few quick examples of this kind of lighting option. 

<!-- more -->

## 1 - What to know first

The subject of light is a little involves with three.js, but should not be to hard to do for most javaScript developers that have some experience. On top of adding a light source to a scene of course you need to know how to even get that far first when it comes to the very basics of getting started with three.js. Beyond knowing how to add a light source it is also required to know that not all materials will respond to light such as the basic and normal materials. When I work with light I often go with the standard material, but there are some additional options when it comes to materials.

## 2 - Directional Light threejs example

So here we have a basic example of a directional light as a way to have some light in a scene that will work with a material that responds to light. To create an instance of directional light in three js I just need to call the THREE.DirectionalLight constructor. When calling the constructor I can pass a color as the fist argument, and an intensity level as a value between zero and one as the second argument.

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

## 3 - Moving a directional light

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

## 4 - Very basic house example with vase AmbientLight and shadows

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

## 5 - Conclusion

I went a little farther with the house example of this post and ended up making a slightly more advanced model of a house that is not just a box geometry but a group of meshes being used together to create something that I am calling a house. If you would like to check it out it is one of my many [three.js example](/2021/02/19/threejs-examples/) posts, I have it listed there along with all the other basic project examples I have together thus far.
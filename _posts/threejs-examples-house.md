---
title: Simple house model example in threejs
date: 2021-04-23 11:47:00
tags: [three.js]
layout: post
categories: three.js
id: 852
updated: 2021-04-23 13:16:16
version: 1.20
---

Today I thought I would make another [threejs example](/2021/02/19/threejs-examples/) type post, this time by making yet another simple model of something, this time of a basic house. I do not care to make anything that complex with this one just a very simple, basic house like model that might end up being part of a larger scene of some kind if a future project. My general idea that I have in mind is that if I make enough of these kinds of models I can use them to make an over all larger scene that will include a house model like this, along with some trees, cars, people and other similar objects that can then be used to make some kind of crude animation.

<!-- more -->

## 1 - What to know before continuing with this Three.js house model

This is a post on using the javaScript library known as three.js to create a simple 3d scene with built in geometries and the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry). I trust that you have at least some background with three.js and javaScript otherwise you might end up having a hard time gaining something of value from this post. Of course you should at this post have a solid understating of the basics at least when it comes to creating a scene in three.js, and also how to use [Groups](/2018/05/16/threejs-grouping-mesh-objects/), and [Orbit Controls](/2018/04/13/threejs-orbit-controls/).

### 1.1 - Version Numbers matter with three.js

When I started this post I was using three.js r127 which was a later version of three.js in April of 2021, in the future this version will most likely be out of data and the code might break. So if you are running into problems where this code is not working for you the first thing to check might be to make use that you are using a version of three.js that will work with this to begin with.

## 2 - The House Module

So now for the house module where I will be pulling all the javaScript code that I am using to create this simple crude model of a house. Inside the body of an IIFE I have an object that contains default materials to use with the house that can be replaced when using the model.

I then have a house triangle helper method that makes use of the Buffer Geometry constructor to create just a single triangle that I will be using to built part of the house. You see I think the basic idea here is that I will be using a three.js built in Box Geometry constructor to create he base of the house, and use the plane Geometry constructor to create the roof. However I am then going to need some triangle areas to fill in the gaps on each side, so then this is where this helper comes into play.

I then have the create method of the module which as of this writing is the one and only public method of the model. I am not thinking that a model like this will be needing some kind of update method. If I am going to make some kind of weird animation in which a house is something that ends up becoming very animated maybe I will cross that bride when and if I come to it. Anyway in this create method I am using the THREE.Group constructor to create a group that will contain all the mesh objects for this model. I am using a Box Geometry for the base of the house, meshes that make use of the plane geometry for parts of the roof. I am then also using my Triangle helper to create th mesh objects that I need to fill in the gaps between the base and the roof.

```js
(function (HouseMod) {
 
    // default materials
    var materials_default = {
        base: new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshStandardMaterial({
            color: 0xaf0000,
            side: THREE.DoubleSide
        }),
        roof: new THREE.MeshStandardMaterial({
            color: 0x202020,
            side: THREE.DoubleSide
        })
    };
 
    // create a triangle part of the house
    var HouseTriangle = function(materials){
        materials = materials || materials_default;
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
                -1, 0, 0,
                0.5, 1.5, 0,
                2, 0, 0
            ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals(); // compute vertex normals
        geometry.addGroup(0, 3, 0); // just one group
        return new THREE.Mesh(
            geometry, 
            materials.tri);
    };
 
    // create and return a house
    HouseMod.create = function(materials){
        materials = materials || materials_default;
        // mian house group
        var house = new THREE.Group();
 
        // base of house is just a BOX
        var base = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.base);
        house.add(base);
 
        // house triangle parts
        var tri1 = HouseTriangle(materials);
        tri1.position.set(-0.5, 1 , 2);
        house.add(tri1);
        var tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1 , -2);
        house.add(tri2);
 
        // roof
        var roof1 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        house.add(roof1);
        var roof2 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof2.position.set(1, 1.51, 0);
        roof2.rotation.set(Math.PI * 0.5, Math.PI * -0.25, 0);
        house.add(roof2);
 
        // house should cast a shadow
        house.castShadow = true;
        house.receiveShadow = false;
        return house;
    };
 
}
    (this['HouseMod'] = {}));
```

## 3 - Now for a Demo of this

So now I am going to want to test out this house model by setting up a scene, and maybe at least one more attentional mesh that will serve as the ground of an over all larger scene. When it comes to really using this I will want to have at least a few more mesh objects, and models like this including a person model, but maybe that is all a matter for another post.

For now I start out by creating the scene and then set the background color for the scene to something other than the default black. I am then choosing to use some directional light along with some ambient light because the use of this hose module will always be some kind of outdoor scene, and this is a good way to simulate daylight I have found. I am then also going to set things up so that the light will case a shadow.

I am then setting up a camera and a web GL renderer to use for this demo, nothing out of the ordinary with this aside from maybe a few changes to allow for shadows. I am then creating an instance of my house model, and then having a simple plane geometry based mesh to serve as a crude yet effective ground for now.

For this example I am also making use of orbit controls ans a way to move around and make sure things look okay at least from all directions, and I also set up a basic app loop to change the position of the directional light and anything else that I might choose to animate for this.

```js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
 
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
 
// add the house
var house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);
 
// ground
var materials = {
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
};
var plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
 
// CONTROLS
var controls = new THREE.OrbitControls(camera, renderer.domElement);
 
// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
var loop = function () {
    setTimeout(loop, 33);
    var per = frame / maxFrame,
    r = Math.PI * 2 * per;
 
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    controls.update();
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

When this demo is up an running things seem to be working as I would expect for this thus far. I have a simple little house on a plane, and the directional light is resulting in shadows being casted onto the plain from the house. There is nit much more to write about at this point, but if I come up with some additional things to play with maybe I can come up with something a little ore interesting.

## 3 - Conclusion

So this is not much to look at for now, but as I make more models like this I think I will eventually start something where I am working with a bunch of models like this to produce an over all larger project. I am not interested in making games with three.js at this time, I think a project like that would end up eating up to much time, however simple crude animations might work it I am willing to put in enough time.


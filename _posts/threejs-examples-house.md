---
title: Simple house model example in threejs
date: 2021-04-23 11:47:00
tags: [three.js]
layout: post
categories: three.js
id: 852
updated: 2023-01-28 12:04:13
version: 1.32
---

This will be another [threejs example](/2021/02/19/threejs-examples/) type post, this time it will be about making yet another simple model of something, just using threejs itself rather than making and loading an external file of some kind. This time I am thinking I will like to make a crude yet effective house model. I do not care to make anything that complex with this one, just a very simple, basic house like model that might end up being part of a larger scene of some kind in one or more future projects. 

This time it will be yet another one of my models that is [just a group](/2018/05/16/threejs-grouping-mesh-objects/) collection of [mesh objects](/2018/05/04/threejs-mesh/) using the built in threejs geometry constructors rather than an external file of one type or another such as the DAE file standard. However there will be one little part in which I am making a custom geometry as well.

My general idea that I have in mind is that if I make enough of these kinds of models I can use them to make an over all larger scene that will include a house model like this, along with some trees, cars, people and other similar objects that can then be used to make some kind of crude animation.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/Hor4TTLhIvo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What to know before continuing with this Three.js house model

This is a post on using the javaScript library known as three.js to create a simple 3d scene with built in geometries and the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry). I trust that you have at least some background with [threejs](/2018/04/04/threejs-getting-started/) and javaScript otherwise you might end up having a hard time gaining something of value from this post. Of course you should at this post have a solid understating of the basics at least when it comes to creating a scene in three.js, and also how to use [Groups](/2018/05/16/threejs-grouping-mesh-objects/).

### I have many other examples like this one

This is not my first threejs project example in which I make this kind of module this kind of way. The first project like this that I made would be my [guy one module](/2021/04/29/threejs-examples-guy-one/) that I made back in 2018. I also made a an example that is the [guy one module and a hamster wheel](/2021/04/19/threejs-examples-hamster-wheel/) type model as well taking this kind of approach. I have a number of other examples on top of that of course but you get the idea with this. What I am doing is just creating geometry with the built in geometry constructors, using that with mesh objects, and the positioning and rotating them in ways to make something that forms an over all object of some kind.

### I have a newer house threejs project example that involves loading an external DAE file

Although I might still find myself making this kind of model now and then, I am starting to go more in the direction of creating geometry using a software tool like blender and then exporting to a file format like Collada. With that said I have [made a whole other threejs example project where the goal is to just make a simple house model in the from of a Collada file](/2023/01/27/threejs-examples-house-two) and then it is just a matter of loading that file, as well as additional texture files into threejs.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/8aEF1H5nlYA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


This is still very much just a crude start, and it is just a shell of a house as well. However it is a step in an over all better direction when it comes to starting to create assets that I might in fact actually use in some kind of over all greater project.

### There is also looking into external file formats

Although creating groups of mesh objects might work okay, in the long run it might still be best to look into what the options are with external file formats. With that there is also looking into software tools to create and edit these kinds of external file formats. It might prove to be a bit of a pain to do so, but then again so is making these kinds of mesh group models also.

Thus far I have found that I like the [DAE file format](/2021/04/30/threejs-dae-collada-loader/) as it is a text format, and is also very open and HTML friendly. There are a whole lot of other options that should be consider such as the [buffer geometry loader](/2018/04/12/threejs-buffer-geometry-loader/) which is nice because that is baked into the core of the threejs library alone.

### Source code is also up on Github

The source code for [this threejs example is up on Github in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-house). This is also where I park the source code for my [many other posts on threejs as well](/categories/three-js/).

### Version Numbers matter with three.js

When I started this post I was using three.js r127 which was a later version of three.js in April of 2021, and the last time I came around to do some editing I was using r146 of threejs. When updating the code for r146 I made use of the THREE.WebGL1Renderer as I was getting errors relating to using Webgl2. So if you are running into problems where this code is not working for you the first thing to check might be to make use that you are using a version of three.js that will work with this to begin with.

## 1 - Updated source code of this threejs example \( r1 \)

Sense I first wrote this post it would seem that this example is getting a little traffic, so I took a closer look at the source code and found a number of things that needed to be fixed. For one thing I made sure that the custom geometry that I am using to fill in a gap has a [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) which I failed to do in the first version of the source code. In addition to this I also rotated and adjusted some things when it comes to the state of the geometry so that it will still work okay at least with materials that do not use the THREE.DoubleSide constant with the side property. I still want to use the THREE.DoubleSide constant with the roof mesh objects, however it is now option with the other mesh objects that compose the over all house.

```js
// house.js - r1 - from threejs-examples-house
(function (HouseMod) {
    // default materials
    const materials_default = {
        base: new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        roof: new THREE.MeshStandardMaterial({
            color: 0x202020,
            side: THREE.DoubleSide
        })
    };
    // create a triangle part of the house
    const HouseTriangle = function(materials){
        materials = materials || materials_default;
        const geometry = new THREE.BufferGeometry();
        const vertices1 = new Float32Array([
                -1, 0, 0,
                0.5, 1.5, 0,
                2, 0, 0
            ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
        geometry.computeVertexNormals(); // compute vertex normals
        geometry.addGroup(0, 3, 0); // just one group
        // uv attribute
        const vertices2 = new Float32Array([
                0, 0,
                1, 0,
                1, 1
            ]);
        geometry.setAttribute('uv', new THREE.BufferAttribute(vertices2, 2));
        return new THREE.Mesh(
            geometry, 
            materials.tri);
    };
    // create and return a house
    HouseMod.create = function(materials){
        materials = materials || materials_default;
        // mian house group
        const house = new THREE.Group();
        // base of house is just a BOX
        const base = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.base);
        house.add(base);
        // house triangle parts
        const tri1 = HouseTriangle(materials);
        tri1.geometry.rotateY(Math.PI);
        tri1.position.set(0.5, 1 , 2);
        house.add(tri1);
        const tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1 , -2);
        house.add(tri2);
        // roof
        const roof1 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof1.geometry.rotateY(Math.PI);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        house.add(roof1);
        const roof2 = new THREE.Mesh(
            new THREE.PlaneGeometry(2.84, 4.5), 
            materials.roof);
        roof2.geometry.rotateY(Math.PI);
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

### 1.1 - Demo of the New House Module \( r1 \)

There are two new main things that I am doing in this new demo of the house module. One is that I am using a custom set of materials when creating the house, and the other is that I am using [canvas textures](/2018/04/17/threejs-canvas-texture/). In the old version of the house model a texture would not look right as there was now uv attribute for the custom triangle geometry, but now it looks okay.

```js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer(); // using WebGL1
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
scene.add(dl);
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
// add AmbientLight
const light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.4;
scene.add(light);
//-------- ----------
// CANVAS ELEMENT, TEXTURE
//-------- ----------
const size = 64;
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = size;
canvas.height = size;
let i = 0;
const w = 20;
const len = w * w;
const pxSize = size / w;
while(i < len){
    const x = i % w;
    const y = Math.floor( i / w );
    const px = x * pxSize;
    const py = y * pxSize;
    const v = 0.25 + 0.75 * Math.random();
    const c = new THREE.Color(v, v, v);
    ctx.fillStyle = c.getStyle();
    ctx.fillRect(px, py, pxSize, pxSize);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
//-------- ----------
// MATERIALS
//-------- ----------
const materials = {
    base: new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        map: texture
    }),
    tri: new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        map: texture
    }),
    roof: new THREE.MeshStandardMaterial({
       color: 0x202020,
        map: texture,
       side: THREE.DoubleSide
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        map: texture
    })
};
//-------- ----------
// ADD THE HOUSE, AND OTHER OBJECTS
//-------- ----------
// add the house
const house = HouseMod.create(materials);
house.position.set(-2, 1.05, 0);
scene.add(house);
// add a plane
const plane = new THREE.Mesh(new THREE.PlaneGeometry(15, 15, 1, 1), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
//-------- ----------
// APP LOOP
//-------- ----------
// CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Loop in which the directional light position changes
let frame = 0;
const maxFrame = 100;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame,
    r = Math.PI * 2 * per;
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    controls.update();
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

## 2 - The Old House Module \( r0 \)

So now for the house module where I will be pulling all the javaScript code that I am using to create this simple crude model of a house. Inside the body of an IIFE I have an object that contains default materials to use with the house that can be replaced when using the model.

I then have a house triangle helper method that makes use of the Buffer Geometry constructor to create just a single triangle that I will be using to built part of the house. You see I think the basic idea here is that I will be using a three.js built in Box Geometry constructor to create he base of the house, and use the plane Geometry constructor to create the roof. However I am then going to need some triangle areas to fill in the gaps on each side, so then this is where this helper comes into play.

I then have the create method of the module which as of this writing is the one and only public method of the model. I am not thinking that a model like this will be needing some kind of update method. If I am going to make some kind of weird animation in which a house is something that ends up becoming very animated maybe I will cross that bride when and if I come to it. Anyway in this create method I am using the THREE.Group constructor to create a group that will contain all the mesh objects for this model. I am using a Box Geometry for the base of the house, meshes that make use of the plane geometry for parts of the roof. I am then also using my Triangle helper to create th mesh objects that I need to fill in the gaps between the base and the roof.

```js
// house.js - r0 - from threejs-examples-house
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
}(this['HouseMod'] = {}));
```

### 2.1 - Now for a Demo of this old module

So now I am going to want to test out this house model by setting up a scene, and maybe at least one more attentional mesh that will serve as the ground of an over all larger scene. When it comes to really using this I will want to have at least a few more mesh objects, and models like this including a person model, but maybe that is all a matter for another post.

For now I start out by creating the scene and then set the background color for the scene to something other than the default black. I am then choosing to use some directional light along with some ambient light because the use of this hose module will always be some kind of outdoor scene, and this is a good way to simulate daylight I have found. I am then also going to set things up so that the light will case a shadow.

I am then setting up a camera and a web GL renderer to use for this demo, nothing out of the ordinary with this aside from maybe a few changes to allow for shadows. I am then creating an instance of my house model, and then having a simple plane geometry based mesh to serve as a crude yet effective ground for now.

For this example I am also making use of orbit controls ans a way to move around and make sure things look okay at least from all directions, and I also set up a basic app loop to change the position of the directional light and anything else that I might choose to animate for this.

```js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 10, 7);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer(); // using WebGL1
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
scene.add(dl);
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
// add AmbientLight
const light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.1;
scene.add(light);
//-------- ----------
// ADD THE HOUSE, AND OTHER OBJECTS
//-------- ----------
// add the house
const house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);
// ground
const materials = {
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    })
};
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
//-------- ----------
// APP LOOP
//-------- ----------
// CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Loop in which the directional light position changes
let frame = 0;
const maxFrame = 100;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame,
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

## Conclusion

So this is not much to look at for now, but as I make more models like this I think I will eventually start something where I am working with a bunch of models like this to produce an over all larger project. In fact sense I first wrote this post I have got around to writing another post on another examples that is a more advanced version of this example that is just that. I have come to just simply calling it [the backyard scene example](/2021/05/07/threejs-examples-backyard/) and it includes this house model along with many others that I have made thus far.

I am not interested in making games with threejs at this time, I think a project like that would end up eating up to much time. However simple crude animations might work if I am willing to put in enough time and energy to do so. What I like about videos also is that I do not have to care as much about bugs, and predominance. As long as my frames render the way that I want them to I have a finished product and I can then move on with my life which is great. These are the kinds of projects that I would use something like this with where what is most important is just how it looks and if it fits in with an over all style.



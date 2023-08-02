---
title: Adding Ambient Light, as well as other options in threejs
date: 2018-11-02 20:04:00
tags: [js,three.js]
layout: post
categories: three.js
id: 319
updated: 2023-08-02 11:10:10
version: 1.33
---

When making a [three.js](https://threejs.org/) project, and working with [materials](/2018/04/30/threejs-materials/) that respond to light such as the [standard material](/2021/04/27/threejs-standard-material/) it might be desirable to add some [ambient light](https://threejs.org/docs/index.html#api/en/lights/AmbientLight) to a scene. Ambient Light differs from [other light sources](/2022/02/25/threejs-light/) in that it will evenly illuminate materials evenly from all directions, actually direction is not really even taken into account with this kind of light source. By adding an ambient light it will just simply light up all surfaces of all mesh objects that are skinned with a material that will respond to light when it is added to the scene object. 

This kind of light source is very different from spot lights or point lights that radiant out light from a certain point in space and only illuminate surfaces that strike the surfaces that they come in contact with. However it is often a good idea to combine ambient light with one of these kinds of lights in order to see a kind of depth. I also like to tone down the intensity of an ambient light so that it does not end up making all the surfaces fully intense canceling out the effects of any additional direction light sources I might have added.

So then in this post I will just be going over a few quick examples of using ambient light in a three.js project. In the process of doing so I will also be covering a few other loosely related topics when it comes to light in general, such as the kinds of materials that can be used that will be effected by light.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/tZYqkZYOK2I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Ambient light in three.js and what to know before getting into light.

This is a post on adding [ambient light](https://en.wikipedia.org/wiki/Shading#Ambient_lighting) to a three.js project to set a base amount of light for all mesh object materials. This is not a getting started post on three.js or javaScript in general as getting into the very basics is outside the scope of this post. So I assume that you have gone beyond the hello world stage of three.js at thins point and are now just trying to figure out some of the basics when it comes to light sources. Being aware of ambient light is just one of several options when it comes to adding a light source to a three.js project, so it is something that one should at least be aware of.

### Check your materials, and know your options when it comes to materials

One thing to keep in might with light in threejs is that not all materials will work with light sources. The [basic material](/2018/05/05/threejs-basic-material/) for example will not work with light, and the same can be said of the [Normal material](/2021/06/23/threejs-normal-material/) and the depth material. However materials like the [standard material](/2021/04/27/threejs-standard-material/), Lamber material, and [Phong material](/2022/12/29/threejs-phong-material/) will work with light sources. There are subtle differences between these materials, and other note worth considerations when it comes to performance. However I generally like to go with the standard material when it comes to getting into using light with a project.

### Many other options for Lights

Ambient light is just on way of adding some light to a scene in general. It will result in light evenly hitting all surfaces of all objects in the scene, this differs from other options when it comes to lighting such as [spotlights](/2018/04/11/threejs-spotlights/) which is a kind of directional light at a target. However I would not confuse spot lights with [directional lights](/2019/06/04/threejs-directional-light/) as that is yet another option when it comes to choosing a light option. I do jot often use spotlights though, the light directional light source that I often go with is a [point light](/2019/06/02/threejs-point-light/) that will throw light in all directions from the position at which the point light is placed.

### Source code examples and much more are on Github

The source code examples that I am writing about here can also be found in my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-ambientlight) reposatory up on Github. This is also where I part the source code for my [many other posts on threejs](/categories/three-js/) as well.

### What version of threejs are you using?

When I first wrote this post I was using r98 of three.js, and the last time I cam a round to do a little updating of the code examples I was using three.js [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). I do not think that much has changed with ambient light in sense then, but a whole lot has changed with threejs outside of ambient light for sure. 

There is still a lot changing with threejs real fast, so it is possible that some of these code examples here might break at some point in the future for this reason. So always be mindful of what revision number of the librray you are using.

## 1 - Basic examples of Ambient light

For this first opening section I will just be writing about some quick basics of ambient light in threejs.

### 1.1 - Ambient light hello world demo

Setting up some ambient light for a project is not to hard at all. I just need to call the THREE.AmbientLight constructor, and pass it a color value that will be used for the color of the AmbientLight. I will then want some kind of mesh to look at that makes use of a material that will respond to light. One example of this kind of material would be the standard material, but there are additional alternatives such as the Lambert material. In any case for this example at least I just went with a simple cube geometry and the standard material as a way to skin it.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo')|| document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff);
scene.add(al);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshStandardMaterial({
        color: 0xff0000
    }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So the result of this is that I have a red cube in front of me in the canvas element. If I did not have any light at all I would not be able to see the cube. When it comes to materials like the basic material for example that is a material that does not work with light at all. So when using the basic material I can just see whatever the color of a cube is without having to bother with light.

Ambient light is not and end all solution for light though, I often do add at least one additional direction light source such as a point light and position that light in such a way as to be able to see some kind of depth with the cube.

### 1.2 - Adjust the intensity

There is often at least one additional little thing that I like to do when adding ambient light to a project and that is to tone down the intensity at least a little. On top of that I will often add yet another light source to the project that is a direction light rather than an ambient light that will effect all materials evenly.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo')|| document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(al);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);
//-------- ----------
// RENDER LOOP
//-------- ----------
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
let f = 0;
const fm = 300;
const loop = () => {
    const a1 = f / fm;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    requestAnimationFrame(loop);
    al.intensity = a2;
    renderer.render(scene, camera);
    f += 1;
    f %= fm;
};
loop();
```

## 2 - Other light options

Ambient light is a great basic option for adding light to a scene, but I would never use ambient light on its own. Typically this ambient light option will be used in conjunction with at least one other light option that will be the light source that will help to show some depth. Now there are a lot of options to go about showing depth mid you that do not have to involve the use of light sources. However this is very much a post on ambient light, so I should have a section here on at least a few more light sources options that are typically used in conjunction with ambient light.

### 2.1 - Directional Light, with Ambient Light that has reduced intensity

The typical additional option for working with light that I add on top of ambient light would be [directional light](/2019/06/04/threejs-directional-light/). This is a kind of light that will shine light in a uniform parallel direction. The position property of the light object is what I can use to change this direction and it is just the direction part of the vector that matters for this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(1, 3, -2);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.10);
scene.add(al);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

### 2.2 - Add a Point Light on top of Ambient Light

Another option for adding additional light to a scene that will help wot show some depth would be to add a [point light](/2019/06/02/threejs-point-light/). This kind of light source will send light out in all directional from a given point that can be set, and updated over time by changing the state of the vector3 object of the position property of the light object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 64 / 48, 0.1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo')|| document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const al = new THREE.AmbientLight(0xffffff);
scene.add(al); 
// ADD a Point Light and position the light away from the camera
const pl = new THREE.PointLight('white');
pl.position.set(20, 30, 40);
pl.add(new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        new THREE.MeshBasicMaterial({
            color: 'white'
        })));
scene.add(pl);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        }));
scene.add(mesh);
//-------- ----------
// RENDER LOOP
//-------- ----------
let f = 0;
const fm = 300;
const loop = () => {
    const a1 = f / fm;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    requestAnimationFrame(loop);
    al.intensity = a2;
    renderer.render(scene, camera);
    f += 1;
    f %= fm;
};
loop();
```

So this might prove to be a better situation when it comes to adding a basic lighting setup for a threejs example. However there is maybe even A bit more to cover whe it comes to ambient light. Also it should go without saying that there is a great deal to cover when it comes to additional light sources as well as materials that respond to light. There is also the emissive maps of materials also, that is making a mesh that will have its own light as it where.

## Conclusion

Ambient light is then one of many options when it comes to adding light sources to a scene. When it comes to ambient light it does not matter what the position of the light source is which is not the case for many other light source objects. The effect of that ambient light is to set a kind of base amount of light for all surfaces of all objects in a scene. There are material options thought for getting a similar effect such is the case when it comes to the emissive color, and also creating [emissive maps](/2021/06/22/threejs-emissive-map/) for materials as well.





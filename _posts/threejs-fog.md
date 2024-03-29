---
title: Adding a Fog effect to a threejs project
date: 2018-04-16 11:59:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 176
updated: 2023-08-03 13:02:30
version: 1.63
---

Adding fog to a Scene object in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) generally means just creating an instance of [THREE.Fog](https://threejs.org/docs/#api/en/scenes/Fog) or [THREE.ForExp2](https://threejs.org/docs/#api/en/scenes/FogExp2), and setting that to the fog property of a [scene object](/2018/05/03/threejs-scene/). However there are still a few basic things that a developer should be aware of when it comes to adding fog, such as the fact that one can not just use any material for example. There are also other basic getting started type things that come up such as making sure that the background color of a scene should be same color used for the color of the fog.

A Fog is a nice effect to have for most projects as it allows for a more graceful transition from rendering something that is within range of a render distance, to no longer rendering when an object is to far from the camera. Even if I have the far value of the camera set to a high value so that the object is just a single pixel before it is no longer rendered, it can still be a nice additional effect on top of the object just simply getting smaller. 
 
In this post then, I will be going over a basic example of fog in a three.js project, and after that I will be getting into at least a few more examples also while I am at it. What I am at it I will also be touching base on a few other three.js rated topics such as the nature of the [ mesh standard material ](/2021/04/27/threejs-standard-material/) which is one option when it comes to [using a material](/2018/04/30/threejs-materials/) that will work with fog. There is also writing at least a thing or two about the subject of color, and not just setting the fog color but the background color as well.

<!-- more -->

## Threejs fog and What to know before hand

This is a post on how to go about adding fog to a scene object when making a project with the javaScript library known as threejs. With that said you should have some knowledge of threejs to begin with, and also additional skills that are required before even getting into threejs. I thus assume that you have at least a little experience with javaScript development in general then. Otherwise you might have a hard time getting something of value from what I am writing about on in this post

I have written a post on how to [get started with three.js](/2018/04/04/threejs-getting-started/) if you are completely new on how to work with threejs that might be a decent starting point. When it comes to [getting started with javaScript in general](/2018/11/27/js-getting-started/) I have wrote a number of posts on that before hand as well, so I will not be getting into detail about the basics of threejs and javaScript here. However In this section I will be going over some things that you might want to read up on more that are closely related to the topic of fog in threejs though.


<iframe class="youtube_video" src="https://www.youtube.com/embed/qDhzsXUyuY8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Be mindful of what material you are using when adding fog

Not all materials will work with fog, for example the Normal Material will not work with fog, but the Lambert and standard materials will. If you have not done so before hand it might be a good idea to go over all the materials that there are to work with out of the box with threejs, and work out some basic examples of each. Also play around with lights and so forth in order to get a better sense of what the options are for materials that will not just work well with fog, but also light sources. I have [my post on materials in general](/2018/04/30/threejs-materials/), but for this post I will be sticking to the standard material as that seems to be one of the best general middle of the road type material options for light, fog, performance, and appearance.

So then you will want to make sure that you are using a material that can be effected by fog to begin with. Some materials will not work with a fog at all then actually, one such material would be the [MeshNormalMaterial](https://threejs.org/docs/index.html#api/materials/MeshNormalMaterial). To help with this you can check the fog boolean which is a property of the base [Material class](https://threejs.org/docs/index.html#api/materials/Material). For example if I create an instance of the normal material the fog boolean for that material is false, while the fog boolean for a material that does support for such as the [Lambert material](/2018/04/08/threejs-lambert-material/) will return true for this value.

```js
    var material = new THREE.MeshNormalMaterial();
    console.log(material.fog); // false
    var material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
            emissive: 0x080808
        });
    console.log(material.fog); // true
```


### Read up more on the scene object in general

The scene.fog property is of course a feature of the THREE.Scene class, and there is a [great deal more to know about this scene class](/2018/05/03/threejs-scene/) and the objects that it creates beyond just that of the fog property. For example there is the background property of the scene object which can be used to set a solid color background, or a [cube texture](/2018/04/22/threejs-cube-texture/) for the scene. 

There is also a great deal that branches off from the scene object such as the fact that a scene object is one of many objects in threejs that is based on the [Object3d class](/2018/04/23/threejs-object3d/). There is a great deal to write about when it comes to object3d and I would say it is a major part of the library that any developer that is new with the library should get solid with right away.

### Check out the Color Class in threejs

When I make a fog object I will want to set a color for the fog. Also I will want to typically make the solid color background of the scene the same a s the fog color as well for most projects that I have made thus far at least. The reason why I say that is that the fog will effect just the materials of mesh objects that support fog, and if the fog color does not mach up the the background I might not get a desired look. However in any case, speaking about color there is a nice built in class called [THREE.Color](/2021/05/03/threejs-color/) that can be used to create a color object and use that to set the fog and background color to the same color object. I can then change the state of this color object and that will update the state of the background and fog color at once. The Color class is also great for just working with color in general both inside and outside of threejs away so it is worth reading about a bit more.

### The source code examples here can be found on github

The source code examples that I am writing about here can be found on my [test threejs](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-fog) repository, along with many other examples for all my other posts. So if you see something wrong with one of the source code examples here that is where a pull request can be made. There is also the comments section of this blog post that can be used to bring something up that might need to be changed, or added.

### Version numbers matter with three.js

The version of threejs is something that is important when writing post on it, often many code breaking changes are introduced that will result in older examples no longer working. When I first started writing this post I am using three.js [r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I edited this [post I as using r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). It would seem that not much of anything has changed with fog alone at least thus far, but still this is always something that a developer should be aware of when it comes to the fact that three.js is a fairly fast moving target in terms of development.


## 1 - Basic fog examples

There are two built in fog constructors in threejs, one of which is linear in terms of the fog effect, while the other is exponential with it. The simple linear fog is the THREE.Fog constructor that takes three arguments, the first is the fog color, and then the other two are the near and far distance values for the fog effect. The other option is THREE.FogExp2 which will just take two arguments the first again is the color, and then next is a density value that will be the rate at which the fog will grow dense.

### 1.1 - Simple static scene example of Fog in threejs

I always like to make the first example of a post a simple, hello world type example. With that said this example will just involve creating a fog for a very basic static scene that just involves a single mesh, along with just a few more objects such as a camera, point light, and a grid helper, and that is it.

One thing that I think I should mention right away before going on to any and all additional sections is that for this example I will be setting the same color for both the fog, and the solid background color. This can end up giving a false impression as to what the fog effects though by getting people to think that the fog will effect both the materials of mesh objects as well as the background. However this is not the case it is just that I am using a simple solid color background, and that solid background color is the same as the fog color. Simply put the fog will just effect materials in the scene that will be effected by fog and that is it.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(8, 8, 0xffffff, 0x000000));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FOG AND BACKGROUND
//-------- ----------
// ADDING BACKGROUND AND FOG
const fogColor = new THREE.Color(0xffffff);
scene.background = fogColor; // Setting fogColor as the background color also
scene.fog = new THREE.Fog(fogColor, 0.25, 4);
//-------- ----------
// MESH
//-------- ----------
// Use a Material that SUPPORTS FOG such as the basic material
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Using the FogExp2 class

For this basic demo I am now going with the FogExp2 class for the fog that will be used with the scene.fog property. While I am at it I am now going with the phong material, and with that also using light and emissive color.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(9, 9, 0xffffff, 0x000000));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// FOG AND BACKGROUND
//-------- ----------
const fogColor = new THREE.Color(0xffffff);
scene.background = fogColor; 
scene.fog = new THREE.FogExp2(fogColor, 0.6);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0xffffff,
        emissiveIntensity: 0.25
    }));
scene.add(mesh);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 5, 3).normalize();
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - An animation loop example of Fog

A static scene is a good way to start out but in order to really gain a sense of what is going on with fog I am ether going to want to add some kind of controls to change the position and orientation of the camera, or start some kind of main application loop that will update the position of the camera or objects in the scene over time. For this example I will be going with a basic animation loop, so then this is going to be just like that of the static scene example, but with an animation loop function that uses the requestAnimatioFrame method to create an animation loop.

### 2.1 - Just moving a mesh object back and forth

Inside the body of the animation loop I am then going to want to move the mesh object, and or the camera. For this example I went with moving and rotating the mesh object, while keeping the camera fixed in terms of position by using the look at method to keep the camera fixed on the mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(8, 8, 0xffffff, 0x000000));
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
// adding a point light to the camera
const light = new THREE.PointLight(0xffffff);
light.position.y = 0.5;
camera.add(light);
scene.add(camera);
//-------- ----------
// ADDING BACKGROUND AND FOG
//-------- ----------
fogColor = new THREE.Color(0x00af00);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.5);
// Use a Material that SUPPORTS FOG
// when making a Mesh such as the standard material
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: 0xff0000
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const per = frame / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    mesh.position.z = 1 + 4 * bias;
    mesh.rotation.x = Math.PI * 2 * 4 * per;
    mesh.rotation.y = Math.PI * 2 * 2 * per;
    camera.lookAt(mesh.position);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

In this demo I put in a simple loop to have a mesh move back and forth from the camera as a way to show off the fog effect and how the intensity of the fog will change depending on the distance of the object from the camera. The effect seems to work just as I would expect, and adjusting the density value with the THREE.ForExp2 fog will make the fog more or less dense when it comes to playing around with this a little. Speaking of that I think I should write more about the density value, as well as the near and far values when it comes to the linear fog that is created with the THREE.Fog constructor in a later section in this post. For now I just wanted to have an example that I just one little step forward from a simple static scene.

## Conclusion

That is it for now when it comes to just fog alone in three.js, which is a nice feature to have at the ready when toying around with things. Also I am sure that it is a feature that I will want to use in certain actual full projects in the future for sure, but I am thinking that I will want to maybe look more into some kind of custom shader for this sort of thing when it comes to some kind of real project. The three.js fog features built into the core of the library are a great start with fog at least, but it would be nice to at least have a hight argument for a fog effect also.

There are a number of other similar features about three.js that might also be worth looking into when it comes to backgrounds and fog, for example there is having a [cube texture](/2018/04/22/threejs-cube-texture/) for the background rather than just a solid color background.



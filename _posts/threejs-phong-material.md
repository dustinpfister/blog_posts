---
title: The Phong material in three.js
date: 2022-12-29 08:27:00
tags: [three.js]
layout: post
categories: three.js
id: 1020
updated: 2022-12-29 11:02:53
version: 1.7
---

The [Phong material](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) is one of many built in material options in the core of the threejs JavaScript library. What stands out with this material is the support for specular highlights which can be adjusted by way of the shininess option. Although the material is called Phong it actually uses the [Blinn-Phong reflection model](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) rather than a pure [Phong Reflection model](https://en.wikipedia.org/wiki/Phong_reflection_model). If real time performance is of concern then Phong might prove to be a better choice than that of the [standard material](/2021/04/27/threejs-standard-material/), and also I have found that I still like to use Phong over the standard material when it comes to just how things simply look regardless of performance also.


<!-- more -->

## The Phong Material and what to know first

First off before getting into detail with the Phong Mesh Material there are a number of things that I should write about that one should know about before hand. I assume that you are at the point where you have completed a hello world style program using threejs, and you also have a fair amount of experience with client side JavaScript. If not you are going to want to take a step back and maybe read a [getting started with threejs](/2018/04/04/threejs-getting-started/) type post first. In any case in this opening section I will mention a thing or two about certain other threejs features you might want to read up more on before continue to read the rest of this post.

### Many other options for Mesh materials

There are a whole lot of other options when it comes to [mesh materials](/2018/04/30/threejs-materials/) so it would be a good idea to review them all.

### Light Sources

The Phong material is one of several options that will respond to one or more [light sources](/2022/02/25/threejs-light/) in a scene.

### Source code is up on Gihub

The source code examples that I write about in this post can also be found up on [Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-phong-material).

### Version numbers matter

When I first wrote this blog post I was using r146 of threejs.

## 1 - Some basic examples of the Phong Material

As always I like to start my blog posts on threejs with one or more basic examples, which will once again be what this section is about. So then even if you are still fairly new to threejs these examples should prove to be fairly easy to follow. The general deal with creating an instance of the Phong material is the same as any of the other mesh object materials where there is a main [constructor function](/2019/02/27/js-javascript-constructor/) that is called to create an instance of the material. When calling the material there is an options object that can be passed to set a number of initial values for the various options. On top of creating instance of the Phong material in this section I will also be touching base on a whole lot of other topics that have to do with things like creating textures with JavaScript code, and making use of light sources.

### 1.1 - Using an emissive color without a light source

The very first example should be as basic as I can make things, so with that said I think the first example should involve making use of the phong material without a light source. The problem with that is that the default color of a scene object is black, and setting the color option of the Phong material will not have the ame effect as what some devlopers that are new to threejs might be used to when it comes to the [basic material](/2018/05/05/threejs-basic-material/). I rember way back when I was frist starting out with threejs that I have found this to be a little confusing, so I will try my best to adress that here in this basic section.

Because the Phong material is an example of a mesh material option that will respond to light, the color option of the phong material is used to set the color that will be used with a light source. If you want to have the same effect with the color option of the basic material, with the Phong material, or any material that responds to light, then the emissive color is what you want to set.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial({
    emissive: new THREE.Color(1,1,1)
});
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    material_phong);
scene.add(mesh);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

The Phong material, and other mesh materials can still be used in the same way as the basic material. It is just a matter of knowing what options to set that can now be used in place of what is used with the basic material. The difference is now that on top of setting base solid color and texture that will show up regardless of what the situation is with light in a scene, additional colors and textures can be set that will work with light sources.

### 1.2 - Light Source example

If I am going to add one or more light sources to a scene object, then I can just create the Phong material without any options. For this example I am making use of a [directional light](/2019/06/04/threejs-directional-light) as a way to set a light source for the scene. This kind of light source is my default go to light source these days, there are of course a number of other options to consider but getting into that would be off topic. The directional light is night because I do not have to care about the position of the light source as it is used to create light in a way that is like that of day light. In this example I may be setting the position value, however it is just the direction of the [Vector3 object](/2018/04/15/threejs-vector3/) that is of concern and not the unit length. So then any vector that is [normalized](/2021/06/14/threejs-vector3-normalize/) to a value of one will work just fine. It would also seem that it is also okay if the Vector is not normalized in such cases the higher or lower length will be ignored and again it is just the direction that matters.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// LIGHT
// ---------- ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.1, 0.7, 0.2);
scene.add(dl);
// ---------- ---------- ----------
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial();
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
   new THREE.SphereGeometry(1, 30, 30),
    material_phong);
scene.add(mesh);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

### 1.3 - Using textures

For this example I will now be adding some textures into the mix, as such this is where things will start to get a little involved. There are a number of ways to create a texture object that can then be used with one or more of the various map options there are to work with in the Phong material. I could for example make use of the [texture loader](/2021/06/21/threejs-texture-loader/) as a way to load one or more external image files that I can then use for the material. However in this basic section i would like to keep these examples very copy and paste friendly as such I will be going with [canvas textures](/2018/04/17/threejs-canvas-texture/).

Canvas textures are a great way to go about creating one or more textures by way of a little JavaScript code rather than having to load an external image asset. The main reason why is because I can make use of ever little native browser feature there is to work with when it comes to the 2d drawing context of canvas elements to create the textures. So I can create a canvas element, get a reference to the drawing context, draw to it with some JavaScript code, and then pass the canvas element to the THREE.CanvasTexture constructor function to create a texture. I can the use the resulting texture objects with options of the Phong material such as the map, and [emissiveMap](/2021/06/22/threejs-emissive-map) options as I am doing here.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// LIGHT
// ---------- ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 0.4, -0.6);
scene.add(dl);
// ---------- ---------- ----------
// TEXTURES
// ---------- ---------- ----------
const createCanvasTexture = function (draw, size) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
// texture for the map property
const texture_map = createCanvasTexture( (ctx, canvas) => {
   const w = 30, h = 30;
   const len = w * h;
   let i = 0;
   while(i < len){
      const x = i % w;
      const y = Math.floor(i / w);
      const pw = canvas.width / w;
      const ph = canvas.height / h;
      const px = pw * x;
      const py = ph * y;
      const color = new THREE.Color(0,0,0);
      color.r = 0.2 + 0.6 * Math.random();
      ctx.fillStyle = color.getStyle();
      ctx.fillRect(px, py, pw, ph);
      i += 1;
   }
}, 64);
// texture for the map property
const texture_emissive = createCanvasTexture( (ctx, canvas) => {
   const w = 32, h = 32;
   const len = w * h;
   let i = 0;
   while(i < len){
      const x = i % w;
      const y = Math.floor(i / w);
      const pw = canvas.width / w;
      const ph = canvas.height / h;
      const px = pw * x;
      const py = ph * y;
      let v  = x % 2 === 0 ? 1 : 0;
      const color = new THREE.Color(v, v, v);
      ctx.fillStyle = color.getStyle();
      ctx.fillRect(px, py, pw, ph);
      i += 1;
   }
}, 64);
// ---------- ---------- ----------
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial({
   map: texture_map,
   emissive: new THREE.Color(1,1,1),
   emissiveMap: texture_emissive,
   emissiveIntensity: 0.05
});
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 30, 30),
    material_phong);
scene.add(mesh);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

## Conclusion

The Phong material is then a pretty good over all material that might prove to be the standard go to material for many good reasons. As of late I would have to say that this is the case with me thus far as I am starting to prefer using the Phong material over the standard material, and the Lambert material.


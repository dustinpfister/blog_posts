---
title: The Phong material in three.js
date: 2022-12-29 08:27:00
tags: [three.js]
layout: post
categories: three.js
id: 1020
updated: 2023-06-20 10:45:34
version: 1.12
---

The [Phong material](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) is one of many built in material options in the core of the threejs JavaScript library. What stands out with this material is the support for specular highlights which can be adjusted by way of the shininess option. Although the material is called Phong it actually uses the [Blinn-Phong reflection model](https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model) rather than a pure [Phong Reflection model](https://en.wikipedia.org/wiki/Phong_reflection_model). If real time performance is of concern then Phong might prove to be a better choice than that of the [standard material](/2021/04/27/threejs-standard-material/), and also I have found that I still like to use Phong over the standard material when it comes to just how things simply look regardless of performance also.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/IXwmoSKA8dA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Phong Material and what to know first

First off before getting into detail with the Phong Mesh Material there are a number of things that I should write about that one should know about before hand. I assume that you are at the point where you have completed a hello world style program using threejs, and you also have a fair amount of experience with client side JavaScript. If not you are going to want to take a step back and maybe read a [getting started with threejs](/2018/04/04/threejs-getting-started/) type post first. In any case in this opening section I will mention a thing or two about certain other threejs features you might want to read up more on before continue to read the rest of this post.

### Many other options for Mesh materials

There are a whole lot of other options when it comes to [mesh materials](/2018/04/30/threejs-materials/) so it would be a good idea to review them all. The Phong material is a good choice when it comes to how an object looks when one or more materials are used, mainly because of the shinny over all look. Still even when it comes to just caring about how things look the Phong might not be the only solution. If a surface of an object should be a kind of unpolished wood, then it might be a good idea to tone down the shininess option of the Phong Material, or maybe even use a whole other material such as the [Lambert Material](/2018/04/08/threejs-lambert-material).

### Light Sources

The Phong material is one of several options that will respond to one or more [light sources](https://threejs.org/docs/#api/en/lights/Light) in a scene. The options for light objects in threejs is a whole other matter that I would not like to get into in detail in this post. In these source code examples I will just be sticking mainly with the directional light, if you want to [read more about lights then you will need to do so outside of this post](/2022/02/25/threejs-light/).

### Source code is up on Gihub

The source code examples that I write about in this post can also be found up on [Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-phong-material). This is also where I park the source code for my [many other blog posts on threejs](/categories/three-js/).

### Version numbers matter

When I first wrote this blog post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). With that said at the time of this writing there are a whole lot of code breaking changes that will be happening up ahead when it comes to future revisions of the library. Please always be aware of what revision you are using and if possible try to find out what revision an author of code examples was using at the time they wrote a post of possible as well. Threejs is still a very fast moving library in terms of development.

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

### 1.4 - The Shininess and Specular Options

One of the major features of the Phong material is that it can be used to add a specular effect that will result in a shine kind of effect for the material that will be effected by light sources. There is a shininess option that will default to a value of 30 that can be used to increase or decrease the magnitude of this shine effect. There is also a specular option that is like the color and emissive options I  that it can be used to set a color value, however this time it will effect the color that is used for this shine effect. There is also a specular map option, but that is a more advanced option that will come into play when working out [environment maps](/2018/04/22/threejs-cube-texture/).

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
const dl = new THREE.DirectionalLight(0xffffff, 0.8);
dl.position.set(0.25, 0.88, -0.38);
scene.add(dl);
// ---------- ---------- ----------
// MATERIAL
// ---------- ---------- ----------
const material_phong = new THREE.MeshPhongMaterial({
   color: new THREE.Color(1,0,0),          // color to use for light, default is white
   shininess : 60,                         // shininess default is 30
   specular: new THREE.Color(0.2,0.2,0.5), // Color to use for the specular default is 0x111111
});
// ---------- ---------- ----------
// MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(2, 60, 60),
    material_phong);
scene.add(mesh);
// ---------- ---------- ----------
// RENDER
// ---------- ---------- ----------
renderer.render(scene, camera);
```

## Conclusion

The Phong material is then a pretty good over all material that might prove to be the standard go to material for many good reasons. As of late I would have to say that this is the case with me thus far as I am starting to prefer using the Phong material over the standard material, and the [Lambert material](/2018/04/08/threejs-lambert-material). Keep in mind though many of the projects that i work on are geared more with a situation where the way that things look is the most important thus far, and then predominance related concerns come second. If performance is the most important thing thus far then it might be the Lambert material that you might want to take into account first and foremost if you are going to and a material that will work with lights.




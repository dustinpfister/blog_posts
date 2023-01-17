---
title: directional light in three js
date: 2019-06-04 09:08:00
tags: [js,three.js]
layout: post
categories: three.js
id: 472
updated: 2023-01-17 11:26:20
version: 1.42
---

In [threejs](https://threejs.org/) there is an option to use [directional light](https://threejs.org/docs/#api/en/lights/DirectionalLight) as one of several types of light to choose from when [adding light to a scene](/2022/02/25/threejs-light/) object. Other options that I find myself using the most thus far include [point lights](/2019/06/02/threejs-point-light/), and [ambient light](/2018/11/02/threejs-ambientlight/), but in some cases I might want to use directional light in place of or on top of these other options.

A directional light is like ambient light in the sense that it is a good way to go about simulating day light. With ambient light a base light intensity is just applied for all materials in a scene and the location of the ambient light in world space does not really matter. Directional light however as the name implies is a situation in which light is coming in from a given direction, but not in the same way as with a point light, or spot light. The rays are all coming in at a parallel, uniform direction, rather from a fixed point outward. Directional light alone might not still be the best way to simulate daylight though, I often find myself using a combination of directional light and ambient light to do so.

So then directional light is kind of like that of point lights and [spotlights](/2018/04/11/threejs-spotlights/) in that I want to set a desired value for the position property of the object that is returned when calling the THREE.DirectionalLight constructor. However when doing so I can also make use of a normalized Vector3 instance value, as the direction and not so much the magnitude of that directional that matters with directional light. When it comes to spot lights and point lights it is both direction and position that matter.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/E8KhyOsQr_U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Directional light in threejs and what to know first

The subject of light in threejs can get a little involved, but should not be to hard to do for most javaScript developers that have some experience. I would say that there are mainly a few things that one should at least be aware of when it comes to materials as not all materials will even work with lights to begin with. There are a few more things beyond that, but much of it is stuff that you should all ready know at least a little about when starting out with your first few hello world type examples involving materials like the normal material, depth material, or basic material that will not work with light.

If you still need to take a step back when it comes to the very basics of threejs I will be keeping these examples fairly simple, but it would likely be best to start out with some kind of [getting started post on threejs](/2018/04/04/threejs-getting-started/). So I will not be getting into the very basics of threejs and javaScript here. However I will mention a few things in this section that you should have an understanding of before continuing.

### Know a thing or two about materials

It is required to know that not all materials will respond to light sources. For example mesh material options such as the [mesh basic material](/2018/05/05/threejs-basic-material/), and the [mesh normal material](/2021/06/23/threejs-normal-material/) just to name a few that are not going to work with light. When I work with light I often go with the [standard material](/2021/04/27/threejs-standard-material/), but there are some additional options such as the [Lambert material](/2018/04/08/threejs-lambert-material/) and the [Phong material](/2022/12/29/threejs-phong-material/) that one should also take into account. Light is also a major thing to be aware of when it comes to getting into writing custom GLSL shaders with the [shader material](/2023/01/13/threejs-shader-material/) as well. Getting into every little detail with this would of course be way off topic though so there is checking out one or more of these materials or starting out with some kind of [main post on the subject of materials](/2018/04/30/threejs-materials/) if you feel as though you may need to research more on them first.

### The Vector3 class, and the object3d position property

At this time you should know at least a little about the [object3d class](/2018/04/23/threejs-object3d/), and mainly the [position property of the object3d class](/2022/04/04/threejs-object3d-position/). This position property of the object3d base class stores an instance of the [Vector3 class](/2018/04/15/threejs-vector3/) as the value of the property. When it comes to a directional light the position property is what is used to set the direction of the light. Although it may be the position property it is really just the direction of the vector that matters and not so much the unit length.


### The source code examples in this post are on Github

The source code exmaples in this post can also be found in [my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-directional-light) on Github. This is also where I park the source code examples, and various other assets that I write about in my [many other blog posts on threejs](/categories/three-js).

### The version number of threejs is important

When I made the code examples for this post I was using threejs revision 127, and the last time I came around to do some editing here I was using r135. I do not think that much has changed with directional light for a real long time, however I can not say the same for a whole lot of other features of threejs. At some point in the future it is possible that the code examples here might break, so it is a good idea to always take into account what the version number is that you are using as well as the version number that was used by the author of a code example on the open web.

## 1 - Directional Light threejs example

So here I have a basic example of a directional light as a way to have some light in a scene that will work with a material that responds to light such as the standard material. To create an instance of directional light in three js I just need to call the THREE.DirectionalLight constructor and add the resulting instance of that constructor to the scene object. When calling the constructor I can pass a [color](/2021/05/03/threejs-color/) as the fist argument, and an intensity level as a value between zero and one as the second argument.

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
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 10, 5);
scene.add(dl);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0x0a0a0a
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

By default the position of the directional light is 0,1,0 and the target of the directional light is the origin at 0,0,0.

## 2 - Moving a directional light

A directional light like most lights and objects that are placed in a scene in threejs inherits from the object 3d class. So it has a position property than can be used to set the position of the directional light to a point other than that of the default position. However when it comes to directional light it is really just the direction and not the unit length, or distance from the origin that matters.

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
const dl = new THREE.DirectionalLight(0xffffff, 1);
scene.add(dl);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const material = new THREE.MeshStandardMaterial({color: 0xff0000,emissive: 0x0a0a0a});
const box = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2),material);
box.position.y=2;
scene.add(box);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), material);
plane.rotation.set(-Math.PI / 2, 0, 0);
scene.add(plane)
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 15, 10);
camera.lookAt(0, 0, 0);
let frame = 0, maxFrame = 100;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame,
    r = Math.PI * 2 * per;
    // change directional light position
    dl.position.set(Math.cos(r) * 10, 2, Math.sin(r) * 10);
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

## 3 - AmbientLight, Shadows, textures, and intensity

So I am thinking that directional light might be one of the best choices when it comes to simulating sunlight. Still I think that I might only want to use directional light in conjunction with at least one additional light source such as ambient light. So in these examples I am working out the beginnings of a very simple outdoor scene that will just make use of a mesh object made with the Box geometry as a way to represent a house, and a plain geometry based mesh to represent ground. On top of using directional light as before, and moving that directional light around I am also using the ambient light to set a kind of base amount of light that will always be in effect regardless of the current direction of the directional light source. Also while I am at it I will be making use of other threejs features with these examples to create something that starts to look like a final project of some kind such as shadows, textures, the intensity values of lights, and so forth.

### 3.1 - Ambient Light and shadows

This is then an example that is more or less the same as my movement example above. However now I am making use of ambient light as a way to set a base amount of light that will always be in effect no matter what. On top of this I am also now adding shadows to the scene, and I am also now using more than one material as well while I am at it.

When this is up and running I have directional light working as expected, but when the direction light is not longer hitting the surface of a mesh the ambient light is still doing its thing to make sure that there is still a base amount of light.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT - directional and ambient
//-------- ----------
// directional light
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.castShadow = true;
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff);
al.intensity = 0.1;
scene.add(al);
//-------- ----------
// MATERIALS
//-------- ----------
const materials = {
    house_sides: new THREE.MeshStandardMaterial({
        color: 0xffffff
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0x00ff00
    })
};
//-------- ----------
// MESH
//-------- ----------
const house = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), materials.house_sides);
house.position.y = 1;
house.castShadow = true; //default is false
house.receiveShadow = false; //default
scene.add(house);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(house.position);
let frame = 0,
maxFrame = 100;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame,
    r = Math.PI * 2 * per;
    // change directional light position
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

### 3.2 - Canvas textures, maps, emissive maps, and Intensity

There are a number of ways to start to add textures into a project, and when doing so there are a lot of ways to use a texture with one or more materials. First off for this example I will be making use of [canvas textures](/2018/04/17/threejs-canvas-texture/) as a way to add texture to a scene by way of a little JavaScript code rather than making use of the [texture loader](/2021/06/21/threejs-texture-loader/) to load an external image to use with the project in an effort to make this code copy and paste friendly.

In any case once a texture is there to work with, there are a lot of options when it comes to using that texture with a material. What options there are to work with will change from one material to the next. With the standard material the map option can be used to set a texture that will work with a light source. Also there is making use of the emissive map option of the standard material to define a texture that will show up regardless of what the situation is with light. 

There is also playing around with intensity both with the light sources as well as the emissive intensity options of the materials.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT - directional and ambient
//-------- ----------
// directional light
const dl = new THREE.DirectionalLight(0xffffff, 0.9);
dl.castShadow = true;
dl.shadow.mapSize.width = 256;
dl.shadow.mapSize.height = 256;
dl.shadow.camera.near = 0.5;
dl.shadow.camera.far = 15;
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
//-------- ----------
// HELPERS
//-------- ----------
// create and return a canvas texture
const createCanvasTexture = function (draw, size_canvas) {
    size_canvas = size_canvas === undefined ? 32 : size_canvas;
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size_canvas;
    canvas.height = size_canvas;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
const draw_grid_fill = (ctx, canvas, iw, ih, getColor) => {
    getColor = getColor || function(color){ return color };
    const len = iw * ih;
    const pxW = canvas.width / iw;
    const pxH = canvas.height / ih;
    let i = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while(i < len){
        const x = i % iw;
        const y = Math.floor(i / iw);
        const color = getColor( new THREE.Color(), x, y, i);
        ctx.fillStyle = color.getStyle();
        const px = x * pxW;
        const py = y * pxH;
        ctx.fillRect(px, py, pxW, pxH);
        i += 1;
    }
};
//-------- ----------
// TEXTURES
//-------- ----------
const texture_grass = createCanvasTexture((ctx, canvas)=>{
    draw_grid_fill(ctx, canvas, 16, 16, (color, x, y, i) => {
        const g = 0.25 + 0.75 * Math.random();
        color.setRGB(0, g, 0);
        return color;
    });
}, 32);
const texture_emissive = createCanvasTexture((ctx, canvas) => {
    const size = 8;
    draw_grid_fill(ctx, canvas, size, size, (color, x, y, i) => {
        let v = 0;
        if(x === 0 || x === size - 1 || y === 0 || y === size - 1){
           v = 1;
        }
        color.setRGB(v, v, v);
        return color;
    });
}, 32);
//-------- ----------
// MATERIALS
//-------- ----------
const materials = {
    house: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveMap: texture_emissive,
        emissiveIntensity: 0
    }),
    ground: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: texture_grass,
        emissive: 0xffffff,
        emissiveMap: texture_emissive,
        emissiveIntensity: 0
    })
};
//-------- ----------
// MESH
//-------- ----------
const house = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), materials.house);
house.position.y = 1;
house.castShadow = true; //default is false
house.receiveShadow = false; //default
scene.add(house);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(12, 12, 8), materials.ground);
plane.rotation.set(-Math.PI / 2, 0, 0);
plane.castShadow = false; //default is false
plane.receiveShadow = true; //default
scene.add(plane);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(house.position);
let frame = 0,
maxFrame = 300;
const loop = function () {
    setTimeout(loop, 33);
    const a1 = frame / maxFrame;
    const a2 = 1 - Math.abs(0.5 - a1)  / 0.5;
    // light intesity
    dl.intensity = 0.9 - 0.9 * a2;
    al.intensity = 0.1 - 0.1 * a2;
    // emmisve intensity
    materials.house.emissiveIntensity = a2;
    materials.ground.emissiveIntensity = a2;
    // change directional light position
    const r = Math.PI * 2 * a1;
    dl.position.set(Math.cos(r) * 5, 5, Math.sin(r) * 5 );
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

## Conclusion

So then direction light is one of a few options for light sources that can be used with, or as a replacement for ambient light in a scene. However I would always use ambient light and then maybe directional light, as I have found that it is still a good idea to always have a base amount of light for materials.

I went a little farther with the house example of this post and ended up making a slightly more advanced model of a house that is not just a box geometry but a group of meshes being used together to create something that I am calling a house. If you would like to check it out it is one of my many [three.js example](/2021/02/19/threejs-examples/) posts, I have it listed there along with all the other basic project examples I have together thus far.

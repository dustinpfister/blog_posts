---
title: The Standard Material in Threejs
date: 2021-04-27 15:25:00
tags: [three.js]
layout: post
categories: three.js
id: 854
updated: 2023-06-08 09:07:07
version: 1.50
---

The [standard material](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) is one of [several options with mesh materials](https://blog.cjgammon.com/threejs-materials/) that make use of [light sources](https://r105.threejsfundamentals.org/threejs/lessons/threejs-lights.html). When it comes to mesh materials like the normal material, and the basic material might prove to be a nice starting point as they do not require light to work which helps to simplify code examples. Also when it comes to projects in which I do not make use of light sources at all they might work just fine and I can just move on. However when it comes to working with everything that threejs has to offer when it comes to light sources, and the various kinds of texture maps there are to work with, the standard material is one of a few options that might prove to be a better all around go to material.

There are some additional materials that might be worth mentioning as contenders when it comes to a great general use case material in threejs such as the [Lambert material](/2018/04/08/threejs-lambert-material/), and the [phong material](/2022/12/29/threejs-phong-material/). The nice thing about the Lambert material is that it might eat up a little less processing overhead compared to the standard material, which might come in handy when trying to make code run faster. When it comes to how things look without much care of how expensive it might be in terms of system resources the phong material might prove to be a better option because of the specular feature of the material which is a nice touch. However over all the standard material seems to work fine for the most part, it seems to reproduce more realistic lighting compared to the Lambert material. So then the standard material is kind of an nice balance between reduced overhead, while still looking decent for most surfaces.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/hVai9au72Ns" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The standard material and what to know first

This is a post on the standard material in threejs that is used along with a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) to skin a [Mesh object](/2018/05/04/threejs-mesh/) that can then be added to a [scene object](/2018/05/03/threejs-scene/). There is a great deal that one should be aware of before getting into the depth of what there is to know about when it comes to mesh materials. So in other words this is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/) let alone [javaScript in general](/2018/11/27/js-getting-started/). As such I assume that you have worked out at least a few basic examples of threejs, and now a thing or two about client side javaScript. I will not be going over all the little basics that you should know at this point, but I will be going over a few things that you might want to read up more on in this section.

### There are many other options with materials

The standard material is still just one of many options with the various [mesh materials](/2018/04/30/threejs-materials/) to work with in threejs. The standard material is a good option when it comes to creating a final state of a project, however there are a number of other options that work well as place holders when it comes to focusing on other aspects of a project that have to do with the state of a geometry. 

There is the [Mesh Normal Material](/2021/06/23/threejs-normal-material/) that is great for seeing what is going on with the current state of the [normal attribute of a geometry](/2021/06/08/threejs-buffer-geometry-attributes-normals/). Another good starting option is the [depth material](/2021/05/04/threejs-depth-material/) that will render the faces of a geometry based on the position of the geometry to a camera and the near and far settings of the camera.

### Be mindful of the differences with the color property compared to the baisc material

One of the major reasons why I would use the standard material is because I want to do something involving one or more [light sources](/2022/02/25/threejs-light/). When it comes to the [Basic Material](/2018/05/05/threejs-basic-material/) I just need to worry about the color property when it comes to setting a solid color for the mesh. I then will maybe just use a color map with the basic material as a way to go about adding some texture. 

I can do the same with the standard material as I would with the basic material, it is just that now I would want to set a solid color for the mesh using the emissve property rather than the color property in order to get the same effect. Also when it comes to adding a texture that will not need a light source to show up I need to do so with an [emissive map](/2021/06/22/threejs-emissive-map/). The reason why is that any color that I set with the color property with the standard material will only show up when a light source of some kind is present.

So then with a material like the standard material the color property is the base color that will react to light, and the map property is how to set a texture that will react to light. I then use the emissive property to set a color that will show up no matter what, and the emissive map property is how to set this kind of texture.

### Know the options when it comes to light sources

There are a number of options to chose from when it comes to light sources, the two I generally find myself going with are the [point light](/2019/06/02/threejs-point-light/), and an [ambient light](/2018/11/02/threejs-ambientlight/), but there are a lot of other options of course. The [directional light](/2019/06/04/threejs-directional-light/) for example is a great way to set a kind of base directional light for a whole scene that is like that of sun light for a project.

## The source code examples in this post can be found on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-standard-material). This is also where I park the source code examples for my many other [blog posts on threejs](/categories/three-js/) that I have wrote thus far.

### Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js which was a later version of threejs in early 2021, and the last time I came around to do a little editing I was using r146. I do not think much has changed with the standard material in some time now, but code breaking changes are made every now and then with many other aspects of the library.

## 1 - Some basic Examples of the Standard material

First off in this section I will be starting out with some very basic getting started type examples of the standard material.

### 1.1 - Basic example of the standard material

So lets start with a very basic example of the standard material, by creating a cube using the [Box Geometry constructor](/2021/04/26/threejs-box-geometry/) for a geometry to use for the mesh object. Next I will create an instance of the standard material for the mesh that will use a solid color of red. However this will not work out as you might expect when it comes to using the basic material, as when I just use the standard material itself without a light source I will not see anything. The reason why is because a light source is needed in order to see the color.

For this example though I am not going to do anything to advanced when it comes to the emissive property and other related properties just a solid color and that is it. So I create the Mesh object with the THREE.Mesh constructor, and then pass the geometry that I want as the first argument, followed by the instance of the standard material created with the THREE.MeshStandardMaterial constructor. When I call the standard material constructor function I pass an object with just one option for now in which I am setting the color and that is it for now.

I will then want to add at least one if not more light sources to the scene object so that the color will show up. For this example I am going with the Point light which I create with the THREE.PointLight constructor. I could position this point light by itself and add it directly to the scene, but I often like to make it a child of another object in the scene such as another mesh object, or even a child of the camera. For this example I made it a child of a mesh object where I am using the sphere geometry for it along with the basic material. This way I can see where the point light is located in the scene.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.0, 1.7, 2.0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 4, 2);
scene.add(dl);
//-------- ----------
// CREATING A MESH WITH THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 'red'
});
scene.add( new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material ) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);

```

Just like any other threejs example I will also want a camera and a renderer, for this example I went with the [perspective camera](/2018/04/07/threejs-camera-perspective/) and the [WebGL renderer](/2018/11/24/threejs-webglrenderer/) which are my usual suspects for just about everything that I do with threejs. With this example up and running I get a red cube, but the color will be a little different depending on the position of the point light and the location of the face of the cube.

### 1.2 - The Emissive color and the standard material

This is now an example that is more or less the same as the first one only now I am adding an emissive color that is white. On top of that I am also setting and emissive Intensity property value that is lower than that of 1. This is a way to set a color that will always show up no matter that is going on with the situation involving light in a scene. There is also getting into a color map as well as an emissive map as well with this sort of thing, but I will be saving that for a latter section in this post.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1,1,1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 3, -5);
scene.add(dl);
//-------- ----------
// CREATING A MESH WITH THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1, 0, 0),
    emissive: new THREE.Color(1, 1, 1), // WHITE emissive COLOR
    emissiveIntensity: 0.25             // Intensity of emissive COLOR
});
scene.add( new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 80, 80),
    material) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Using textures with the standard material

What is great about the standard material is that there are a lot of texture maps that can be used, more so than other options. There is still having a regular color map like that of the basic material, it is just that one needs to use a light source with it just like with the plain solid color setting. If I want the same effect as with the basic material, I can use Ambient light or what is called an emissive map.

There are a number of ways to create a texture, typically I might want to load an external file to do so by making use of the [texture loader](/2021/06/21/threejs-texture-loader/). However for these kinds of examples I like to go with some kind of solution that avoids bothering with external images by making use of a solution that involves using [canvas elements and a little javaScript code to create textures](/2018/04/17/threejs-canvas-texture/). Once I have a texture there are a number of texture map options with the standard material, so in this section I will be taking a look at some of them.

### 2.1 - Using a color map and a light source

To create canvas textures I will want to use the canvas texture constructor in theejs, but first I will need a canvas element with the desired texture drawn on it to pass to the constructor. The topic of working with canvas elements is beyond the scope of this post of course, however I have a [getting started post on canvas](/2017/05/17/canvas-getting-started/). I have also wrote a lot of [canvas project example](/2020/03/23/canvas-example/) type posts when it comes to learning how to work with canvas elements. In any case once I have a canvas element, and have drawn something to the canvas I can just pass it to the THREE.CanvasTexture constructor and the return value of the is the a texture that can be used with the map option.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2,0.2);
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TEXTURE
//-------- ----------
const colorMap = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
}, 64);
//-------- ----------
// MESH, LIGHT
//-------- ----------
// creating a box with the standard material
const box = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        new THREE.MeshStandardMaterial({
            map: colorMap
        }));
// add the box mesh to the scene
scene.add(box);
// adding a light source
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
//-------- ----------
// LOOP
//-------- ----------
const frameMax = 300;
let lt = new Date(), frame = 0;
const loop = function () {
    const now = new Date();
    requestAnimationFrame(loop);
    // alphas
    const a1 = frame / frameMax;
    // update sun pos
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= frameMax;
    lt = now;
};
loop();
```

### 2.2 - The emissive map and other related properties

Now for one more map example this time using the emissve map option to make it so that the material will still show something at least even if there is not light at all. With the basic material there is just having a color map, but with the standard material the color map will only should up when there is some light. The functionally of the basic material color map can still show up though I just need to do so by having an emissve map.

In this example I am doing more or less the same thing with it comes to my color map example, but now I am also using the map I created with a canvas element for the emissve map also. When doing so I will want to set the solid emissive color to something other than black, and I will also typically want to adjust the intensity of this effect also.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2,0.2);
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TEXTURE
//-------- ----------
const colorMap = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'lime';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
}, 64);
const emmisveMap = createCanvasTexture(function (ctx, canvas) {
    const w = 8, h = 8;
    let i = 0, len = w * h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = canvas.width / w * x;
        const py = canvas.height / h * y;

        const v = 0.50 * Math.random().toFixed(2);
        const color = new THREE.Color(v,v,v);
        ctx.fillStyle = color.getStyle();
        ctx.fillRect(px, py, canvas.width / w, canvas.width / h);
        i += 1;
    }
}, 64);
//-------- ----------
// MESH
//-------- ----------
// creating a box with the standard material
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1,1,1),
    map: colorMap,
    emissive: new THREE.Color(1,1,1),
    emissiveIntensity: 0.25,
    emissiveMap: emmisveMap
});
const box = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    material
);
scene.add(box);
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
//-------- ----------
// LOOP
//-------- ----------
const frameMax = 300;
let lt = new Date(), frame = 0;
const loop = function () {
    const now = new Date();
    requestAnimationFrame(loop);
    // alphas
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 5 % 1 ) / 0.5;
    // update emissive intensity
    box.material.emissiveIntensity = a2;
    // update sun pos
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),---
title: The Standard Material in Threejs
date: 2021-04-27 15:25:00
tags: [three.js]
layout: post
categories: three.js
id: 854
updated: 2022-12-29 11:28:30
version: 1.49
---

The [standard material](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) is one of [several options with mesh materials](https://blog.cjgammon.com/threejs-materials/) that make use of [light sources](https://r105.threejsfundamentals.org/threejs/lessons/threejs-lights.html). When it comes to mesh materials like the normal material, and the basic material might prove to be a nice starting point as they do not require light to work which helps to simplify code examples. Also when it comes to projects in which I do not make use of light sources at all they might work just fine period actually. However when it comes to working with everything that threejs has to offer when it comes to light sources, and the various kinds of texture maps there are to work with, the standard material is one of a few options that might prove to be a better all around go to material.

There are some additional materials that might be worth mentioning as contenders when it comes to a great general use case material in threejs such as the [Lambert material](/2018/04/08/threejs-lambert-material/), and the [phong material](/2022/12/29/threejs-phong-material/). The nice thing about the Lambert material is that it might eat up a little less processing overhead compared to the standard material, which might come in handy when trying to make code run faster. When it comes to how things look without much care of how expensive it might be in terms of system resources the phong material might prove to be a better option because of the specular feature. However over all the standard material seems to work fine for the most part, it seems to reproduce more realistic lighting compared to the Lambert material.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/hVai9au72Ns" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The standard material and what to know first

This is a post on the standard material in threejs that is used along with a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) to skin a [Mesh object](/2018/05/04/threejs-mesh/) that can then be added to a [scene object](/2018/05/03/threejs-scene/). There is a great deal that one should be aware of before getting into the depth of what there is to know about when it comes to mesh materials. So in other words this is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/) let alone [javaScript in general](/2018/11/27/js-getting-started/). As such I assume that you have worked out at least a few basic examples of threejs, and now a thing or two about client side javaScript. I will not be going over all the little basics that you should know at this point, but I will be going over a few things that you might want to read up more on in this section.

### There are many other options with materials

The standard material is still just one of many options with the various [mesh materials](/2018/04/30/threejs-materials/) to work with in threejs. The standard material is a good option when it comes to creating a final state of a project, however there are a number of other options that work well as place holders when it comes to focusing on other aspects of a project that have to do with the state of a geometry. 

There is the [Mesh Normal Material](/2021/06/23/threejs-normal-material/) that is great for seeing what is going on with the current state of the [normal attribute of a geometry](/2021/06/08/threejs-buffer-geometry-attributes-normals/). Another good starting option is the [depth material](/2021/05/04/threejs-depth-material/) that will render the faces of a geometry based on the position of the geometry to a camera and the near and far settings of the camera.

### Be mindful of the differences with the color property compared to the baisc material

One of the major reasons why I would use the standard material is because I want to do something involving one or more [light sources](/2022/02/25/threejs-light/). When it comes to the [Basic Material](/2018/05/05/threejs-basic-material/) I just need to worry about the color property when it comes to setting a solid color for the mesh. I then will maybe just use a color map with the basic material as a way to go about adding some texture. 

I can do the same with the standard material as I would with the basic material, it is just that now I would want to set a solid color for the mesh using the emissve property rather than the color property in order to get the same effect. Also when it comes to adding a texture that will not need a light source to show up I need to do so with an [emissive map](/2021/06/22/threejs-emissive-map/). The reason why is that any color that I set with the color property with the standard material will only show up when a light source of some kind is present.

So then with a material like the standard material the color propery is the base color that will react to light, and the map property is how to set a tetxure that will react to light. I then use the emissive property to set a color that will show up no matter what, and the emissive map propery is how to set this kind of tetxure.

### Know the options when it comes to light sources

There are a number of options to chose from when it comes to light sources, the two I generally find myself going with are the [point light](/2019/06/02/threejs-point-light/), and an [ambient light](/2018/11/02/threejs-ambientlight/), but there are a lot of other options of course. The [directional light](/2019/06/04/threejs-directional-light/) for example is a great way to set a kind of base directional light for a whole scene that is like that of sun light for a project.

## The source code examples in this post can be found on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-standard-material).

### Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js which was a later version of threejs in early 2021, and the last time I came around to do a little editing I was using r146. I do not think much has changed with the standard material in some time now, but code breaking changes are made every now and then with many other aspects of the library.

## 1 - Some basic Examples of the Standard material

First off in this section I will be starting out with some very basic getting started type examples of the standard material.

### 1.1 - Basic example of the standard material

So lets start with a very basic example of the standard material, by creating a cube using the [Box Geometry constructor](/2021/04/26/threejs-box-geometry/) for a geometry to use for the mesh object. Next I will create an instance of the standard material for the mesh that will use a solid color of red. However this will not work out as you might expect when it comes to using the basic material, as when I just use the standard material itself without a light source I will not see anything. The reason why is because a light source is needed in order to see the color.

For this example though I am not going to do anything to advanced when it comes to the emissive property and other related properties just a solid color and that is it. So I create the Mesh object with the THREE.Mesh constructor, and then pass the geometry that I want as the first argument, followed by the instance of the standard material created with the THREE.MeshStandardMaterial constructor. When I call the standard material constructor funciton I pass an object with just one option for now in which I am setting the color and that is it for now.

I will then want to add at least one if not more light sources to the scene object so that the color will show up. For this example I am going with the Point light which I create with the THREE.PointLight constructor. I could position this point light by itself and add it directly to the scene, but I often like to make it a child of another object in the scene such as another mesh object, or even a child of the camera. For this example I made it a child of a mesh object where I am using the sphere geometry for it along with the basic material. This way I can see where the point light is located in the scene.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1.0, 1.7, 2.0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 4, 2);
scene.add(dl);
//-------- ----------
// CREATING A MESH WITH THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 'red'
});
scene.add( new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        material ) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);

```

Just like any other threejs example I will also want a camera and a renderer, for this example I went with the [perspective camera](/2018/04/07/threejs-camera-perspective/) and the [WebGL renderer](/2018/11/24/threejs-webglrenderer/) which are my usual suspects for just about everything that I do with threejs. With this example up and running I get a red cube, but the color will be a little different depending on the position of the point light and the location of the face of the cube.

### 1.2 - The Emissive color and the standard material

This is now an example that is more or less the same as the first one only now I am adding an emissive color that is white. On top of that I am also setting and emissive Intensity property value that is lower than that of 1. This is a way to set a color that will always show up no matter that is going on with the situation involving light in a scene. There is also getting into a color map as well as an emissive map as well with this sort of thing, but I will be saving that for a latter section in this post.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1,1,1);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(8, 3, -5);
scene.add(dl);
//-------- ----------
// CREATING A MESH WITH THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1, 0, 0),
    emissive: new THREE.Color(1, 1, 1), // WHITE emissive COLOR
    emissiveIntensity: 0.25             // Intensity of emissive COLOR
});
scene.add( new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 80, 80),
    material) );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Using textures with the standard material

What is great about the standard material is that there are a lot of texture maps that can be used, more so than other options. There is still having a regular color map like that of the basic material, it is just that one needs to use a light source with it just like with the plain solid color setting. If I want the same effect as with the basic material, I can use Ambient light or what is called an emissive map.

There are a number of ways to create a texture, typically I might want to load an external file to do so by making use of the [texture loader](/2021/06/21/threejs-texture-loader/). However for these kinds of examples I like to go with some kind of solution that avoids bothering with external images by making use of a solution that involves using [canvas elements and a little javaScript code to create textures](/2018/04/17/threejs-canvas-texture/). Once I have a texture there are a number of texture map options with the standard material, so in this section I will be taking a look at some of them.

### 2.1 - Using a color map and a light source

To create canvas textures I will want to use the canvas texture constructor in theejs, but first I will need a canvas element with the desired texture drawn on it to pass to the constructor. The topic of working with canvas elements is beyond the scope of this post of course, however I have a [getting started post on canvas](/2017/05/17/canvas-getting-started/). I have also wrote a lot of [canvas project example](/2020/03/23/canvas-example/) type posts when it comes to learning how to work with canvas elements. In any case once I have a canvas element, and have drawn somehting to the canvas I can just pass it to the THREE.CanvasTexture constcruor and the return value of the is the a texture that can be used with the map option.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2,0.2);
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TEXTURE
//-------- ----------
const colorMap = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
}, 64);
//-------- ----------
// MESH, LIGHT
//-------- ----------
// creating a box with the standard material
const box = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        new THREE.MeshStandardMaterial({
            map: colorMap
        }));
// add the box mesh to the scene
scene.add(box);
// adding a light source
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
//-------- ----------
// LOOP
//-------- ----------
const frameMax = 300;
let lt = new Date(), frame = 0;
const loop = function () {
    const now = new Date();
    requestAnimationFrame(loop);
    // alphas
    const a1 = frame / frameMax;
    // update sun pos
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= frameMax;
    lt = now;
};
loop();
```

### 2.2 - The emissive map and other related properties

Now for one more map example this time using the emissve map option to make it so that the material will still show something at least even if there is not light at all. With the basic material there is just having a color map, but with the standard material the color map will only should up when there is some light. The functionally of the basic material color map can still show up though I just need to do so by having an emissve map.

In this example I am doing more or less the same thing with it comes to my color map example, but now I am also using the map I created with a canvas element for the emissve map also. When doing so I will want to set the solid emissive color to something other than black, and I will also typically want to adjust the intensity of this effect also.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2,0.2);
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
//-------- ----------
// TEXTURE
//-------- ----------
const colorMap = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'lime';
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
}, 64);
const emmisveMap = createCanvasTexture(function (ctx, canvas) {
    const w = 8, h = 8;
    let i = 0, len = w * h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = canvas.width / w * x;
        const py = canvas.height / h * y;

        const v = 0.50 * Math.random().toFixed(2);
        const color = new THREE.Color(v,v,v);
        ctx.fillStyle = color.getStyle();
        ctx.fillRect(px, py, canvas.width / w, canvas.width / h);
        i += 1;
    }
}, 64);
//-------- ----------
// MESH
//-------- ----------
// creating a box with the standard material
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1,1,1),
    map: colorMap,
    emissive: new THREE.Color(1,1,1),
    emissiveIntensity: 0.25,
    emissiveMap: emmisveMap
});
const box = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    material
);
scene.add(box);
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
//-------- ----------
// LOOP
//-------- ----------
const frameMax = 300;
let lt = new Date(), frame = 0;
const loop = function () {
    const now = new Date();
    requestAnimationFrame(loop);
    // alphas
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 5 % 1 ) / 0.5;
    // update emissive intensity
    box.material.emissiveIntensity = a2;
    // update sun pos
    const radian = Math.PI * 2 * a1;
    const x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= frameMax;
    lt = now;
};
loop();
```

Another options when it comes to something like this is to use some ambient light on top of a point light as this will make sure that the color map will always show up at least a little. However one nice thing about this is that I can make the emissive map something completely different from that of the regular color map.

## Conclusion

More often than not the standard material is my default go to material that I use with just about every project in which I start playing around with light. There is a great deal more to write about when it comes to the various kind of maps to work with when it comes to using this material. When it comes to getting more into the details of this material I might come around to edit this post, or write some new ones as I get around to it. For now there is my main post on [mesh materials](/2018/04/30/threejs-materials/) in general in which I briefly go over most of the materials that are built into three.js.

I do get around to editing my posts on threejs now and then, so at some point I would like to expand this post with additional examples that make use of more of the features there are to work with when it comes to the standard material. One feature I would like to look into more is the metalness property.


```js
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'red', metalness: 1}));
```

There is also a kind of map that allows for me to set want areas of a face that will be effected more so than others when it comes to this feature. There are a number of other kinds of maps that I should work out examples for when it comes to this materials, the most pressing of which might be the environment map.

    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
    // render
    renderer.render(scene, camera);
    // step frame
    frame += 1;
    frame %= frameMax;
    lt = now;
};
loop();
```

Another options when it comes to something like this is to use some ambient light on top of a point light as this will make sure that the color map will always show up at least a little. However one nice thing about this is that I can make the emissive map something completely different from that of the regular color map.

## Conclusion

More often than not the standard material is my default go to material that I use with just about every project in which I start playing around with light. There is a great deal more to write about when it comes to the various kind of maps to work with when it comes to using this material. When it comes to getting more into the details of this material I might come around to edit this post, or write some new ones as I get around to it. For now there is my main post on [mesh materials](/2018/04/30/threejs-materials/) in general in which I briefly go over most of the materials that are built into three.js.

I do get around to editing my posts on threejs now and then, so at some point I would like to expand this post with additional examples that make use of more of the features there are to work with when it comes to the standard material. One feature I would like to look into more is the metalness property.


```js
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'red', metalness: 1}));
```

There is also a kind of map that allows for me to set want areas of a face that will be effected more so than others when it comes to this feature. There are a number of other kinds of maps that I should work out examples for when it comes to this materials, the most pressing of which might be the environment map.

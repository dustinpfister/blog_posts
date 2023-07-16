---
title: Materials in three.js a general overview of the options
date: 2018-04-30 09:14:00
tags: [three.js]
layout: post
categories: three.js
id: 181
updated: 2023-07-16 15:38:49
version: 1.50
---

In [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are a few materials to choose from to help skin a mesh object that all share the same [Material base class](https://threejs.org/docs/index.html#api/en/materials/Material). There are also additional materials for rendering lines, points, shadows, and sprites that stand out from the various materials that are used to change the look of solid mesh objects.

There are materials that will respond to a light source, and then there are materials that will not. When it comes to materials that respond to light some will preform a little better than others, but will result in a different look compared to others that are a little more resource heavy. When it comes to mesh materials that will not respond to a light source there are materials like the basic mesh material that is a good choice when it comes to just having a simple color map for the mesh. There are a few other materials that render textures based on the state of the normal property of the geometry used, or based on the depth in terms of a distance from the camera.

This post will serve as a general overview of the mesh materials in general in three.js then as a starting point for learning what the options are with this. I will give a very basic overview of the base Material class, and get into some of the differences between materials used with a Mesh, as well as the other kinds of materials. I will of course not be getting into every key little detail with each of them, some of these will deserve a full post explaining them in further detail, and I will link to those posts from here as I write them.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/EouYzHldZd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Materials in threejs and what to know first

This is not my [getting started post on threejs](/2018/04/04/threejs-getting-started/), if you are new to three.js you might choose to start with a post in which the basic of the library are covered. This is a post on three.js in which I assume you have basic knowledge of how to make a three.js project, and now only seek to have a deeper understanding of materials to work with when it comes to creating mesh objects.

### The Material base Class

All materials inherit from the [Material base class](https://threejs.org/docs/index.html#api/materials/Material). This base class contains a lot of properties some of which are superseded by properties in a certain material. I will not be getting into the Base class in detail here, as I still need to write more demos with many of the properties. Also This post is going to be pretty lengthy to begin with anyway. However I think I should at least cover some of the most important properties to be aware of in the base material class that I have dealt with thus far.

### The color, and emissive properties of materials

Many materials have a way to set a solid color property for the material, but how this works will change a little from one material to another. For example the basic material will not do anything with light, so when a solid color is set for the basic material that will just be the solid color for all the faces of the geometry used in the mesh. So then one might assume that will be the case in all other materials, but that is not true. The color property in the standard material is more or less the same thing, but it works in conjunction with what is going on when it comes to light in a scene. So if I set a solid color for an instance of a standard material, but do not add light to a scene, then I will not see anything. So when it comes to the standard materials there is another property that comes into play called the emissive property. It is this emissive property that I use to set a color that will always show up not matter what when it comes to what might be going on with light.

### The Material.side property

When dealing with a material that will be used on a mesh in which faces will be viewed from both sides, the side property of the material base class may be of interest.

```js
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
});
```
As you might guess this will make it so the material is used on both sides of the faces used in a mesh. By default it is the THREE.FrontSide constant, there is also a THREE.BackSide constant as well.

### Material.transparent, and Material.opacity

These two properties have to do with the opacity of the material. The transparent property expects a boolean value, which will turn transparency on or off depending on the value. If it is set true, and you do not see any opacity effect it could be because the default value for material.opacity is 1 which means fully opaque. Set the opacity property to a value between 0 and 1 to set the opacity of the material of transparency is enabled.

```js
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .4
});
```

### Writing custom shaders

In this post I am writing about what there is to work with mainly in terms of built in materials. However in some cases the only way to do what one wants to do with a material will have to involve finding, or writing one or more custom shaders. Maybe the best way to get started with this sort of thing would be to start reading a thing or two about [THREE.ShaderMaterial](/2023/01/13/threejs-shader-material/) rather than THREE.RawShaderMaterial as a lot of things are set up to begin with that allow one to not have to write all the GLSL code from the ground up. 

### Source is also on Github

The source for these examples is [also on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-materials) in my test threejs repo. This is also where I place all the source code that I work out for my many [other blog posts on various threejs topics](/categories/three-js/).

### Version number matters with three.js

Threejs is a project in which the version number matters a whole lot as older posts on three.js often contain examples that will break on newer revisions and vise versa. When I first started writing this post I was using [three.js 0.91.0 (r91)](https://github.com/mrdoob/three.js/tree/r91). However the last time I came around to edit this post I updated all of the demos to what I have layed down for my [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md).

## 1 - First Things First, A Basic Mesh example

One of the best ways to get started is to just create a box geometry to create a mesh object. When it comes to a mesh material options that will help show some depth without a light source a good one for that would be the mesh normal material. I will be going over what all the mesh material options are in a section later in this post, but for now there is just getting that very first simple demo up and working.

So after setting up the usual collection of objects when it comes to things like the main scene object, camera, and renderer I then create an instance of the mesh normal material. When doing so I am not going to bother with any options at all. There are of course options for the mesh normal material, as well as base material class options as well as a whole lot about geometry as well. However much of that will have to come up in the more advanced sections of this post.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE NORMAL MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
//-------- ----------
// MESH with Box Geometry with the 
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
scene.add( new THREE.GridHelper(10, 10) )
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Overview of Mesh Material Options

There might be points and lines, but for the most part just about every threejs project will make use of Mesh objects, or a similar kind of objects that will also make use of one of the Mesh Material Options. There is a whole lot to be aware of with these so it is called for to run over each of them and at least write a thing or two about that each material is good for and why.

Keep in mind that if you feel that you are getting overwhelmed with all of this the most important thing is application. If you want to go with a certain style the involves low poly models, a simple color map, and not bother at all with light in any capacity then just going with the MeshBasicMaterial might prove to work okay. Things just get a little complex when you start pulling light into the mix, or you need to do some kind of weird custom rendering to which even none of these might work okay and as such you might need to go with the shader material and some custom GLSL code. However getting into that is a whole other matter for now.. 

### 2.1 - Mesh Basic Material

The [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) is as the name suggests, it is the kind of material that I would use if I do not aim to do anything special with light. The basic material will not respond to a light source, and the faces will be filled with a solid color, or a given texture when it comes to the use of the map option. So with that said the way to get something other than a solid mass of color on the screen with this one would require the use of adding textures. There is then doing some shading when drawing the textures themselves that are to be used with the geometry that is worked out.

Another option would involve adding a child object of some kind such as lines that use a geometry that is created by pissing the geometry of the parent object into the edge geometry constructor. There are a whole lot of other options for maps and other features that are supported by the basic material, and also there are some common material class features that can be used with this such as vertex colors. However for now I think I should just work out a basic example of this and move on.


```js
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE BASIC MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10))
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera); // render
```

This comes in handy when I just want to quickly add some solid color to a mesh, but one draw back is that it will always show the geometry as one bug blob of color. In order to show and kind of sense of depth it is called for to add some texture to the mesh object by way of some kind of texture. There are a number of ways of going about doing this such as using the [texture loader](/2021/06/21/threejs-texture-loader/) to load in a texture from an external image, but there are also a number of ways of doing so that will involve the use of some javaScript code to create a texture. Once option would be to use [canvas elements](/2018/04/17/threejs-canvas-texture/), and another would be to make use of the [data texture constructor](/2022/04/15/threejs-data-texture/) as a way to create a texture from raw color channel data.

### 2.2 - Mesh Depth Material

This is another basic material that is not used for anything advanced involving a light source, and shadows. The [depth material](/2021/05/04/threejs-depth-material/) can be used to show some depth to a mesh, rather than just having a solid color painted on each face like with the basic material without a texture map.

```js
//-------- ----------
// SCENE CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
// NEAR AND FAR VALUES MATTER WITH THE DEPTH MATERIAL
const near = 0.5,
far = 100;
const camera = new THREE.PerspectiveCamera(45, 4 / 3, near, far);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || docuemnt.body).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE DEPTH MATERIAL
//-------- ----------
const material = new THREE.MeshDepthMaterial();
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.GridHelper(10, 10) );
scene.add( new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Depth is based off the near, and far plane of the camera when can be set when creating the camera, and can also be changed in a loop by calling a special update method. White areas indicate that an area of the mesh is closer to the camera, while darker areas indicate that the area of the mesh is farther away.

There does not appear to be much to write about in terms of other properties to know about with this one aside from the fact that the depth packing encoding can be changed from the default which is basic depth packing. The only other constant seems to be rgba packing.

```js
const material = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking
});
```

### 2.3 - The Lambert material

Read my [full post](/2018/04/08/threejs-lambert-material/) on the Lambert material

This is the first material I started working with when getting into the use of lights and shadows. In some ways the [Lambert material](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial) is a good choice for a reflective material as the algorithm used for reflecting light is more efficient compared to the other options, although I might not say that it is th best looking compared to the alternatives.

```js
//-------- ----------
// Scene
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE LAMBERT MATERIAL
//-------- ----------
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xff0000,
    emissiveIntensity: 0.5
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(4, 2, 1);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera); ;
```

the main thing to understand here is when just setting a solid color, the color that is set with the color property is actually the color that will show up when a white light source shines on it. The emissive property is what is used to set a solid color that is to show up no matter what, which differs from you might be used to with the basic material that you might have started with like I did.

### 2.4 - Mesh Normal Material

The [normal material](/2021/06/23/threejs-normal-material/) has to do with [vector normals](https://en.wikipedia.org/wiki/Normal_%28geometry%29) that exist in the [normal attribute of a buffer geometry instance](/2021/06/08/threejs-buffer-geometry-attributes-normals/) that is used with the mesh object. Coloring of the shape is based on the direction of the vector normals then, but the material does not take into account anything that is going on with light in a scene unlike other materials that make use of the normal attribute of the geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE NORMAL MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
//-------- ----------
// MESH with Box Geometry with the 
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
scene.add( new THREE.GridHelper(10, 10) )
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.5 - Mesh Phong Material

The [phong material](/2022/12/29/threejs-phong-material/) is another option for a material that will respond to a light source. Unlike the Lambert material this is a better option for specular highlights making it a good choice for any kind of surface that should be shiny like metal or varnished wood.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE PHONG MATERIAL
//-------- ----------
const material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 120
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

To get this material working great It might be best to use some kind of directional light source such as a spotlight. The specular property can be used to set the color of the shine, by default it is a very dark gray.

### 2.6 - Mesh Standard Material

The [standard material](/2021/04/27/threejs-standard-material/) might be the best option for most surfaces if a more realistic rather than speedy rendering is desired when it comes to doing something with light. The standard material will also work with a wide range of various texture maps, and is somewhat of an industry standard, thus the name standard material. I tend to like to go with this material as it is generally a great all around material that results in a decent look when it comes to working on a final result.

Because this material supports light it is called for to use this material with a light source in order for anything to be seen when it comes to the color and map attributes of the material. If a light source is not going to be used it is still possible to have something to see with this material it is just that values need to be set with the emissive and emissive map properties rather than color and map alone witch is the case with the basic material.

Unlike the phong material this material does not support specular highlights, but it would appear that is the only feature lost of interest compared to phong.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.7 - Mesh Physical 

Another two materials in three.js that can be used with a mesh are the [Physical](https://threejs.org/docs/index.html#api/materials/MeshPhysicalMaterial), and [Toon](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial) materials. Both of these materials are like that of the standard material, and phong materials respectfully, but with additional features. The physical material is like the standard material but gives a greater deal of control over reflectivity, while the toon material is just like phong only with toon shading.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE PHYSICAL MATERIAL
//-------- ----------
const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000 });
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 2.8 - Toon Physical

Demo of toon material

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE TOON MATERIAL
//-------- ----------
const material = new THREE.MeshToonMaterial({ color: 0xff0000 });
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.SphereGeometry(1, 30, 30), material ));
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(4, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - The Points Material

There is one Material in three.js that can be used to display just the points in a geometry which can come in handy some times. If for some reason I want to create my own custom geometry in which I only care about points in space and nothing at all then I will want to have at least a [position attribute of the buffer geometry instance](/2021/06/07/threejs-buffer-geometry-attributes-position/) that I will the use with the THREE.Points constructor rather than the usual mesh constructor.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
document.getElementById('demo').appendChild(renderer.domElement);
//-------- ----------
// POINTS MATERIAL
//-------- ----------
const material = new THREE.PointsMaterial( { color: 0x00afaf } );
//-------- ----------
// GEOETRY WITH JUST A POSITION ATTRIBUTE
//-------- ----------
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0,
    1, 0, 0,
    1, 1, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

For more on Points and the points material I have [written a post](/2018/05/12/threejs-points-material/) on the subject, it's fun to just play with points in space when you have some time.

## 4 - Lines Material

Another object to work with that is an alternative to a mesh object would be [THREE.Line](/2018/04/19/threejs-line/) or THREE.LineSegments. There are two material options to choose from when it comes to using these kinds of objects which include THREE.LineBasicMaterial and THREE.LineDashedMaterial. They work just like mesh objects in the sense that the first argument that is passed when making one is a geometry. Just like that of THREE.Points though it is just the position attribute of the geometry of these that matter. This is a good reason why as this the use of these kinds of objects help to simplify the process of creating custom geometry. However it is also one of the best reasons why not to use them as well. If you care about how the final product looks you might want to look into [curves and the tube geometry](/2023/06/02/threejs-tube-geometry/) class as an tentative to the use of these kinds of objects and materials.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LINE MATERIAL
//-------- ----------
const material = new THREE.LineBasicMaterial({
    linewidth: 3,
    color: new THREE.Color('lime'),
    transparent: true,
    opacity: 0.25
});
//-------- ----------
// GEO, SCENE CHILD OBJECTS
//-------- ----------
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const edgeGeo = new THREE.EdgesGeometry(boxGeo);
const line = new THREE.LineSegments( edgeGeo, material );
line.rotation.y = Math.PI / 180 * 12;
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 5 - The Common Base Material class

There are a number of options in the base material class that should work with all materials then, but there are some exceptions with some of these features.

### 5.1 - Transparent and opacity options

The transparent boolen can be used to set transparency on and off for a material. In the event that transparency is on the opacity value can be used to set the global alpha value of the transparency for the material. This feature seems to work okay for just about all mesh materials, and also for points and lines as well.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTION
//-------- ----------
const createCube = function (size, material, x, y, z) {
    const geometry = new THREE.BoxGeometry(size, size, size, 8, 8, 8),
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    return cube;
};
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// mesh objects and mesh materails using opacity
scene.add( createCube(1, new THREE.MeshNormalMaterial( { transparent: true, opacity: 0.4 } ), 0, 0, 0) );
scene.add( createCube(1, new THREE.MeshBasicMaterial( { transparent: true, opacity: 0.7 } ), -1.4, -0.5, 0) );
scene.add( createCube(1, new THREE.MeshPhongMaterial( { transparent: true, opacity: 0.2 } ), -0.4, -0.5, -2) );
// points
const material_points = new THREE.PointsMaterial({ size: 0.2, transparent: true, opacity: 0.05 });
const points = new THREE.Points( new THREE.SphereGeometry(2, 20, 20), material_points );
scene.add(points);
// light
const dl = new THREE.DirectionalLight();
dl.position.set(3, 2, 1)
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

So far I have just only scratched the surface when it comes to materials in threejs as there is a whole lot more to cover when it comes to additional things that branch off from the topic of just materials. it should go without saying that there is a great deal more to write about when it comes to th finer points of each mesh material. In addition there is more to say about the base material class, and other matters with materials such as using an array of materials with a mesh object rather than just one and how to set up or change material index values.

This is one of my oldest posts on threejs that I wrote, and when I first started the source code examples I was using r91 which was what I was using back in 2018. Sense then a whole lot has changed with threejs in terms of features that have changed and in some cases have been out right remove completely. As such I do get around to editing my content now and then, and I all ready have some plans in place when it comes to future edits of this post.

---
title: Materials in threejs an overview options and features
date: 2018-04-30 09:14:00
tags: [three.js]
layout: post
categories: three.js
id: 181
updated: 2023-07-21 11:02:48
version: 1.64
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

## 1 - Basic getting started type exmaples of matreials

There is a whole lot to say about materials in general, so this is going to be a very lengthy post. However there is just going over a few very basic examples of materials that should help to address most general concerns when first getting started with threejs. The main focus in this post then will just be one the fact that there is more than one kind of material for more than one kind of object. That is that there are mesh objects, and other options like lines, and that any one material will have its own options, as well a common options that are shared across all materials.

### 1.1 - First Things First, A Basic Mesh example

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
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// INSTANCE OF THE NORMAL MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
//-------- ----------
// MESH with Box Geometry with the 
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - More than one kind of object, so more than one kind of material

Most of the time I do very much use mesh objects, but there are also line and point objects as well that can be used as a way to display some content. For this example then I am creating a mesh and using the basic material for the mesh. This will often result in just a solid mass of color in the canvas when just used with the color option and nothing else. There is of course using a texture as a way to show some depth with this kind of material, but another way would be to add points, lines or both in this case as child objects of the mesh.

When it comes to using a line I must use the LineBasicMaterial or the LineBasicMaterial. When it comes to points there is just the point material alone that can be used to add style to these kinds of objects. There are some options that are just for each kind of material alone. For example the size option is just for points, and the lineWidth options is just for lines. However there are common options as well such as color in this example.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIALS
//-------- ----------
const material_mesh = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const material_line = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 6});
const material_points = new THREE.PointsMaterial({ color: 0xff0000, size: 0.25 });
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const geometry_edge = new THREE.EdgesGeometry( geometry );
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( geometry, material_mesh );
mesh.add( new THREE.LineSegments( geometry_edge, material_line ) );
mesh.add( new THREE.Points( geometry_edge, material_points ) );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.3, 1.5, 1.3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Just getting started with texture and materials

One of the first things that many will want to figure out right away is how to go about getting started with textures and how to apply these textures to objects. Of course there is a great deal to cover when it comes to this, and not just with respect to the lengthy volume of options for materials that will take a texture as the value. There is a great deal of overlap with geometry as well when it comes to advanced topics surrounding the uv attribute of geometry and so forth. Still one has to start somewhere when it comes to textures and materials, so lets start out with a basic example of that then.

Although there is a lot to say about the geometry on top of the material option used, for this demo the focus is just going to be on how to get a texture to begin with. There is of course loading one or more images and then using those images as a way to create texture object. However there is also the subject of how to go about creating textures by way of some javaScript code. With that said the best way to go about doing that might very well be by way of canvas textures. This is a way to go about creating a texture object by passing a canvas element, and when it comes to creating the content of that canvas one can use everything there is to work with when it comes to the 2d drawing context, or any context for that matter.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 32; canvas.height = 32;
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// MATERIAL - using basic material with the map option
//-------- ----------
const material = new THREE.MeshBasicMaterial({ map: texture });
//-------- ----------
// GEOMETRY, MESH
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.4 - Arrays of materials

One of the many subjects that I see being overlooked in other blog posts on materials in general in threejs is the subject of using an array of materials. This subject alone can quickly turn into a time consuming black hole if one lets it become that and I have many times off an on over the years. There is a lot of overlap with this subject as there is not just simply passing an array of materials but also adding or chaning the state of the groups propety of the geometry. For the sake of this basic section demo though there is just using the box geometry constructor as this has a groups property set up to begin with. Also on top of that the groups are set up to make use of six materials one for each side of the box which would often be the case when doing this sort of thing. So to get starte with this as least one will just need to pass an array of six materials rather than just one when making the mesh object that will use the box geometry.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) ); 
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    [
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 1.0, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 1.0, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1.0, side: THREE.DoubleSide })
    ]
);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0.75, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Do not let this fool you though if you thing that this is how to add texture to 3d objects. The first and foremost way to do this would typically be to use just one material, with one texture, and a well worked out uv attributive for the geometry. However some times there are in fact situations in which it would be a good idea to use more than one material for a mesh, and this is how to get started with it. Once again the groups are set up to begin with in this demo though, so when it comes to working on an asset of some kind one might need to work out the state of the groups array.

### 1.5 - Uvmapping and textures

Although an array of materials can be used as a way to skin each side of a Box Geometry, this is not the way to go about skinning a geometry in general. The first and foremost way to skin a Box Geometry, or any geometry for that matter is to create, or in this case mutate the values of the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/). This attribute of a geometry contains offset values for each point in the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of the geometry which is the actual points in space.

Anyway when it comes to a box geometry the UV attribute is set up for us to begin with. However by default the values are set in such a way that all of the content of the texture will be used for all of the faces of the box. Often this might very well be what I would want to happen when creating this kind of geometry anyway. However in some cases I might want to map just one area of a texture to one face, and then another area to another face and so forth. To do that I will need to write a little logic to set the values of the uv attributes to what I want for that kind of situation which is what I am doing in this demo.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 8;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '100px arial';
ctx.lineWidth = 3;
while( i  < len ){
    const a_cell = (i + 5) / (len + 15);
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#5f5f5f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp / 2);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp / 2);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// MATERIAL - using basic material with the map option and the texture from canvas
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geo.getAttribute('uv');
const cellX = 5, cellY = 3; // cellX and cellY can be used to set the cell to draw in the texture
const cx = 1 / w * cellX;
const cy = 1 / w * cellY;
const faceIndex = 2; // the face index to use
const i2 = faceIndex * 4;
att_uv.setXY(i2,     0.000 + cx, 1.000 - cy);
att_uv.setXY(i2 + 1, 0.125 + cx, 1.000 - cy);
att_uv.setXY(i2 + 2, 0.000 + cx, 0.875 - cy);
att_uv.setXY(i2 + 3, 0.125 + cx, 0.875 - cy);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So what is going on with this demo on basic UV mapping and materials is that once again I am just passing a texture for the map option of an instance of the Basic Material. However this time when it comes to the nature of the texture I have worked out a little logic where I am drawing a whole bunch of cells in the texture. I will then want to have a way to draw a given cell in the texture to a given face index, and that is what I am doing with the additional logic that has to do with the mutation of the UV attribute values.

There is a whole lot more to write about this sort of subject of course that I will have to get into more later in this post in the texture section. However I wanted to work out at least one basic section demo of this along with the material array index values demo just to make it clear right away that an array of materials and the groups array is just one tool that is not a replacement for UV mapping.

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

The toon material seems to shade with a limited number of tones. This feature can be adjusted by making use of a texture for the gradientMap option which would seem to be a unique texture map option for this material. When working out this kind of texture the colors of the texture should be in gray scale.

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
// CANVAS ELEMENT for gradientMap used in toon material
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 64; canvas.height = 64;
const s = 8;
const len = s * s;
const ps = canvas.width / s;
let i = 0;
while( i < len ){
    const x = i % s;
    const y = Math.floor( i / s );
    let gValue = ( x / s + y / s ) / 2;
    ctx.fillStyle = new THREE.Color( gValue, gValue, gValue).getStyle();
    ctx.fillRect(x * ps, y * ps, ps, ps);
    i += 1;
}
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
//-------- ----------
// INSTANCE OF THE TOON MATERIAL
//-------- ----------
const material = new THREE.MeshToonMaterial({ color: 0xff0000, gradientMap: texture });
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

There are a number of options in the base material class that should work with all materials, but there are some exceptions with some of these features. For example the side option is very much a part of the base material class, but this option has no effect when used with line or point materials. Still there are lots of options in the base material class that do work with more or less all materials and in this section I will be going over a few key examples of these base material class features.

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

### 5.2 - Blending

It would seem that the blending property of the base material class is it itself just one feature of the class that deserves its own section in this post, and maybe even a whole other deep dive content piece actually. In any case for the sake of this one demo in this over all base material class section it goes without saying that I should have at least one demo on this subject here to touch base on this at least. 

For now I worked out this demo where I am setting the blending value of all materials used to the THREE.NoBlending constant over that of what the default is for materials which is THREE.NormalBlending.

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
// MATERIALS
//-------- ----------
// array of materials for a box geometry where each 
// material is using THREE.NoBlending over the default of THREE.NormalBlending
const materials_box = [
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0x00ffff, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0x00ff00, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xffff00, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xff0000, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xff00ff, transparent: true, opacity: 0.10 } ),
    new THREE.MeshBasicMaterial({ blending: THREE.NoBlending, color: 0xffffff, transparent: true, opacity: 0.10 } )
];
// line material for grid. Also using THREE.NoBlending
const material_grid = new THREE.LineBasicMaterial({
    blending: THREE.NoBlending,
    vertexColors: true,
    linewidth: 8,
    transparent: true,
    opacity: 0.1
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_box = new THREE.Mesh(geometry, materials_box);
scene.add(mesh_box);
const grid = new THREE.GridHelper( 10, 10, 0x00ff00, 0x00ff00 );
grid.material = material_grid;
scene.add(grid);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.5, 1, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 6 - Blending options 

I covered one demo of the blending option in the above section in which I go over many of the features of the main material class. However I would say that the blending option does very much deserve a section of its own.

### 6.1 - No Blending compared to default normal blending

I have all ready covered one demo of the no blending value for the blending option. However there are some things that I should do different in this section of blending in depth. To start oput this section I am once again going to go with a demo that makes use of the no blending option over that of the default blending mode which is normal blending. However this time I am going to have two objects with two materials to have something to compare to. 

Also I am doing something out of the usual when it comes to rendering in this example and will also be doing so for the rest of these demos. The thing that I am doing different here is that I am using a canvas element that I draw to with the plain old 2d drawing content as the element that I am appending to my hard coded HTML. I am then drawing to this plain old 2d canvas with the drawImage method of the 2d canvas and I am passing the canvas of the webgl renderer as the image to draw with. This then allows me to use the 2d drawing context to draw a background that will show up when the canvas of the webgl renderer is transparent.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER, 2D CANVAS
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.style.display = 'block';
canvas.width = 640;
canvas.height = 480;
(document.getElementById('demo') || document.body).appendChild(canvas);
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({ 
    blending: THREE.NoBlending, 
    color: 0xff0000,
    transparent: true,
    opacity: 0.1
});
const material_compare = new THREE.MeshBasicMaterial({ 
    blending: THREE.NormalBlending,
    color: 0x00ff00,
    transparent: true,
    opacity: 0.1
});
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.SphereGeometry( 1, 60, 60 );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh_1 = new THREE.Mesh(geometry, material);
mesh_1.position.x = -1.25;
scene.add(mesh_1);
const mesh_2 = new THREE.Mesh(geometry, material_compare);
mesh_2.position.x = 1.25;
scene.add(mesh_2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 3, 3);
camera.lookAt(0, 0, 0);
scene.background = 0x000000;
renderer.setClearColor(0x000000, 0.75);
renderer.render(scene, camera);
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "black");
gradient.addColorStop(0.5, "white");
gradient.addColorStop(1, "black");
ctx.fillStyle = gradient;
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.drawImage(renderer.domElement, 0,0, canvas.width, canvas.height );
```

## 7 - The Material loader, and other loader related concerns


Creating a material by calling one of the constructor functions as a way to obtained a material is one thing. However when it comes to starting to work on real projects I will want to have a way to pack a lot of the data that has to do with one or more materials into some kind of external file format. With that said baked into the core of threejs itself is the MatreialLoader. However there are also a lot of other options for loading not just a material but other objects that compose one or more whole objects, even a whole scene. There is then a lot to say about how to go about loading materials, as well as everything else that one would want to load into a project by way of some external data as well. So in this section I will be writing a thing or two about loaders and materials.

### 7.1 - Parse a JSON string of a material using THREE.MaterialLoader

The toJSON method of a material can be used to convert a material to a JSON object format, that Object can then be passed to JSON.stringify to create a JSON text form that can then be used with the THREE.MaterialLoader. However for this demo I am hand coding a string of json and I would like to parse it into a workable material that I can then use with a mesh object. To create a material from one of these strings I can pass the string threw the JSON.parse method to get an object to which I can then pass to the parse method of an instance of the material loader. The end result of the call of the parse method is then  a material that I can then use with a mesh object just like with any other.

So then it would look like the JSON string of this demo could then be saved as a json file, and this JSON file can then also be loaded with the material loader as well.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// MATERIAL JSON AS HARD CODED STRING
// ---------- ----------
const str_material = `{
  "metadata":
    {
      "version":4.5,
      "type":"Material",
      "generator":"Hand Coded"
    },
    "uuid":"3106bcfd-f862-49cd-9f87-d4807d818af2",
    "type":"MeshBasicMaterial",
    "color":16711680
}`;
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 8 - Textures

In the basic section I covered a simple getting started type example of the use of textures and materials. However there is of course a whole lot more to write about [when it comes to textures](/2023/06/27/threejs-texture), and how they overlap with geometry, and yes mesh material options that require a texture as the value to be given. In the basic example I was using the map option for the texture which is a good start but there are of course many other options from one material to another. So in this section the focus is going to be more so on textures, but while I am at it I will of curse need to focus on features of buffer geometry objects as well, mainly the uv attribute. I will also have to at least touch base on mnay other various features of threejs that are relevant to the use of textures with materials such as light sources.

However this is still very much a section on the subject of materials in general with threejs. So there will still be a lot to say about the various options when it comes to the kinds of maps there are to work with from one material to another.

### 8.1 - Repeating The WrapS and WrapT properties of textures

One thing that might come up when dealing with a texture, geometry, and the material that is being used with a mesh is a situation that will happen when dealing with uv attributes values that will go out of range of the texture. I have found that it is a good practice to try to keep the uv attributes values in a range between 0, and 1. However that is more of a guild line than a rule it would seem on my part as I see a lot of uv generator code that does very much result in UV values that go out of that range. This might not present much of a problem though as long as you know about what the deal is with the wrapS and wrapT values of the texture object mind you.

By default the wrapS and wrapT properties of a texture will be set to the THREE.ClampToEdgeWrapping, which again should not be a problem as along as you keep the UV values in the 0 to 1 range. However if UV values are going are of range, and you can not work out how to go about addressing that, then you might try setting the wrapS and wrapT property values to THREE.RepeatWrapping. The demo in this section will do a good job of showing what the deal is with this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS ELEMENT, 2D DRAWING CONTEXT, TEXTURE - Whole Bunch of cells
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 1024; canvas.height = 1024;
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
const w = 2;
const wp = canvas.width / w;
const len = w * w;
let i = 0;
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '500px arial';
ctx.lineWidth = 8;
while( i  < len ){
    const a_cell = i / len;
    const x = i % w;
    const y = Math.floor( i / w );
    ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
    ctx.fillRect(x * wp, y * wp, wp, wp);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#8f8f8f';
    ctx.fillText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    ctx.strokeText(i, x * wp + wp / 2, y * wp + wp * 0.6);
    i += 1;
}
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
// USING THREE.RepeatWrapping OVER THE DEFAULT VALUE OF
// THREE.ClampToEdgeWrapping FOR wrapS and WrapT
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
//-------- ----------
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.PlaneGeometry(2, 2, 1, 1);
geo.rotateX( Math.PI * 1.5 );
const att_uv = geo.getAttribute('uv');
console.log( att_uv.array );
att_uv.setXY(0, -0.25,  1.25);
att_uv.setXY(1,  0.25,  1.25);
att_uv.setXY(2, -0.25,  0.75);
att_uv.setXY(3,  0.25,  0.75);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( geo, material );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set( 1.7, 1.2, 1.7 );
camera.lookAt( 0, -0.5, 0 );
renderer.render(scene, camera);
```

### 8.2 - Light, standard material, Set UVmapping of BoxGeometry, diffuse and emissive maps

This example features a helper function that can be called over and over again to create not one, but many textures using canvas elements. I am then using this create canvas texture helper to create not one but two textures. One texture will be used for the map option of an instance of the standard material, and the other texture will be used for the emissive map of the material. 

As I have covered in the mesh materials section the standard material is an example of the kind of material that will respond to a light source. As such the map option does not work the same way as it does in say the basic material as the texture will only show up when some light is shining on it. There is however the emissive color, and with that the emissive map that will work like what one might be used to when it comes to the use of the basic material. So for the instance of the standard material in this demo I am using one texture for the map option, and another for the emissive map option. I am also using the emissive option to set what the emissive color is as I will want it to be something other than the default black color, and there is also the emissive intensity option that will of course adjust the intestacy of the emissive effect.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, .025, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// function to help create a texture with javaScript code
const createCanvasTexture = (opt) => {
    opt = opt || {};
    opt.size = opt.size === undefined ? 1024 : opt.size;
    opt.userData = opt.userData || {};
    opt.draw = opt.draw || function (ctx, canvas, state) {};
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = opt.size;
    canvas.height = opt.size;
    opt.draw(ctx, canvas, opt.userData);
    const texture = new THREE.CanvasTexture(canvas);
    texture.userData = Object.assign(texture.userData, opt.userData);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture
};
// mutate the state of a BoxGeometrys UV attribute
const setUVBoxFace = (geo, w = 8, face_index = 0, v_cell = new THREE.Vector2( 0, 0 ), offset = new THREE.Vector2( 0, 0 )) => {
    const att_uv = geo.getAttribute('uv');
    const cx = 1 / w * v_cell.x + offset.x;
    const cy = 1 / w * v_cell.y + offset.y;
    const i2 = face_index * 4;
    att_uv.setXY(i2, 0.000 + cx, 1.000 - cy);
    att_uv.setXY(i2 + 1, 0.125 + cx, 1.000 - cy);
    att_uv.setXY(i2 + 2, 0.000 + cx, 0.875 - cy);
    att_uv.setXY(i2 + 3, 0.125 + cx, 0.875 - cy);
};
//-------- ----------
// TEXTURES
//-------- ----------
// diffuse color map texture composed of a grid where each cell has and index number
const texture_map = createCanvasTexture({
    userData: {
        w : 8
    },
    draw: (ctx, canvas, userData) => {
        const w = userData.w;
        const wp = canvas.width / w;
        const len = w * w;
        let i = 0;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '100px arial';
        ctx.lineWidth = 3;
        while (i < len) {
            const a_cell = (i + 5) / (len + 15);
            const x = i % w;
            const y = Math.floor(i / w);
            ctx.fillStyle = new THREE.Color(0, a_cell, 1 - a_cell).getStyle();
            ctx.fillRect(x * wp, y * wp, wp, wp);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#5f5f5f';
            ctx.fillText(i, x * wp + wp / 2, y * wp + wp / 2);
            ctx.strokeText(i, x * wp + wp / 2, y * wp + wp / 2);
            i += 1;
        }
    }
});
// texture for the emissive map where I have just random gray scale blocks
const texture_emissive = createCanvasTexture({
    userData: {
        w : 32
    },
    draw: (ctx, canvas, userData) => {
        let i = 0;
        const w = userData.w;
        const pw = canvas.width / w;
        const len = w * w;
        while(i < len){
            const x = i % w;
            const y = Math.floor( i / w );
            const v = 0.25 * 0.75 * Math.random();
            ctx.fillStyle = new THREE.Color( v, v, v ).getStyle();
            ctx.fillRect(x * pw, y * pw, pw, pw)
            i += 1;
        }
    }
});
//-------- ----------
// MATERIAL - 
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    map: texture_map,
    emissive: new THREE.Color(1, 1, 1),
    emissiveMap: texture_emissive,
    emissiveIntensity: 1
});
//-------- ----------
// GEOMETRY - mutation of uv attribute
//-------- ----------
const geo = new THREE.BoxGeometry(1, 1, 1);
const v_cell = new THREE.Vector2( -0.5, -0.5 );
setUVBoxFace(geo, 8, 2, v_cell)
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.7);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 9 - Light and Materials

Of course I am going to need to write at least a few things about light sources and materials in general in threejs. The first thing that people that are new to threejs should know is that not all materials will work with light sources to begin with. Another major thing is that some of the options of materials will work a little differently between certain materials. I would say that this is the case with the color option of the basic material compared to that of a material that will work with light such as the standard material. So in this section I will be focusing on at least some of these basic details about light. You might want to check out my [main blog post on light in threejs](/2022/02/25/threejs-light/) if you would like to read up more on this subject though.

### 9.1 - Getting started with Directional Light

A good option to start with I think would be directional light as a light source. This is a kind of object where I just set the direction part of the Vector of the position property of the directional light object to create a situation in which light is moving in an even, parallel direction along the direction part alone of the position. Sense it is just the direction part of the vector that matters with this light option I might choose to [normalize the vector](/2021/06/14/threejs-vector3-normalize/) to a length of 1.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1).normalize();
scene.add(dl);
//-------- ----------
// INSTANCE OF THE STANDARD MATERIAL
//-------- ----------
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
//-------- ----------
// GRID AND MESH
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
scene.add(new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 1, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

So far I have just only scratched the surface when it comes to materials in threejs as there is a whole lot more to cover when it comes to additional things that branch off from the topic of just materials. it should go without saying that there is a great deal more to write about when it comes to th finer points of each mesh material. In addition there is more to say about the base material class, and other matters with materials such as using an array of materials with a mesh object rather than just one and how to set up or change material index values.

This is one of my oldest posts on threejs that I wrote, and when I first started the source code examples I was using r91 which was what I was using back in 2018. Sense then a whole lot has changed with threejs in terms of features that have changed and in some cases have been out right remove completely. As such I do get around to editing my content now and then, and I all ready have some plans in place when it comes to future edits of this post.

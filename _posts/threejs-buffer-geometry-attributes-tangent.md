---
title: The tangent attribute of buffer geometry and normal maps in threejs
date: 2023-08-17 04:30:00
tags: [three.js]
layout: post
categories: three.js
id: 1067
updated: 2023-08-18 11:45:23
version: 1.4
---

The tangents attribute of [buffer geometry objects in threejs] can be added to a geometry by calling the compute tangents method of a geometry object instance. I have been piecing together some things as to what this is for, and thus far it would seem that this is something that will come into play when making use of normal maps as a way to address a problem that will come up for indexed geometry. You see when making use of an index to reuse points in the position attribute this will result in also only having as many vertex normals as there are position attribute points. This issue can then result in an typically undesired outcome with shading with materials that use light sources, or materials like the normal material. So then there are two general ways of addressing this, one of which is to not use an index, then other is to use a normal map. So with that said in order to use this normal map I will likely want to have a tangent attribute.

In this post then I will be going over what it is that I have together thus far in terms of demos that have to do with the subject of these tangent attributes, and with that everything that goes along with it, which thus far would seem to be to make use of the normal map option of various mesh material options.

<!-- more -->

## Tangent attributes of buffer geometry objects and what to know first

This is then a blog post on the subject of tangent attributes in buffer geometry objects in the JavaScript library known as threejs. It should then go without saying that this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/) as well as the various underlying skills that are required to even get started with that to begin with. There are a lot of things that you should know about before hand then, much of which I will not be getting into detail with here. However I will still write a few quick things that you might want to read about more before continuing with the rest of this content.

### There is the normal map option, and the various other options of mesh materials

Thus far it would seem that the use of tangent attributes will come into play when working out [normal maps](/2021/06/24/threejs-normal-map/) to be used with one of the mesh materials. Speaking of which there is my [main blog post on materials in general](/2018/04/30/threejs-materials/) that you might want to check out if you want to learn more about materials in general. However for the sake of staying on topic, there is just using the [mesh normal material](/2021/06/23/threejs-normal-material/) as that supports the features that I want in order to make use of a normal map and with that the tangent attribute of a geometry.

### A texture will be needed for the normal map

In order to use the normal map option of a material I will need a texture. There is creating a texture in an image editor and loading it in with the texture loader. However for this posts I typically like to use [canvas textures](/2018/04/17/threejs-canvas-texture/) and [data textures](/2022/04/15/threejs-data-texture/) as they are a way to create texture with a little javaScript code, or hard coded data that I can work into a nice copy and paste friendly demo.

### Buffer Geometry objects have a lot more going on

I assume that you all ready know a fair amount about [buffer geometry objects](/2021/04/22/threejs-buffer-geometry/) in general, if not you might want to read up more on this subject then. There is first knowing what the deal is with position, normal, and uv attributes as well as the index that is used to reuse points in the position attribute.

### Source code is on Github

The source code examples that I have made for this post can be found in the [folder that corresponds to this post in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-attributes-tangent) on Github. With that said there is also a folder for each of the [other posts that I have wrote on threejs](/categories/three-js/) thus far on this website as well.

### Version Numbers Matter

The revision number that I was using for the demos in this post was [r152, and thus followed the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) I have set for that revision. 

## 1 - Basic Examples of Tangent attributes

As always I like to start out my post with at least one if not more basic examples of the main subject of the post. With that said in this section I will be starting out with just that. One way to quickly get started would be to just call the compute tangents method, and if I do so with a built in geometry this will often work as the various attributes are there with maybe a few exceptions. When it comes to custom geometry though I will need a position, normal, uv, and index buffer attributes set up first.

### 1.1 - A problem that happens with indexed geometry

One problem that seems to happen when making an indexed geometry is that when reusing points this results in less vertex normals compared to what the situation would be with a non indexed geometry. This will then result in shading that will not work the way that one would typically expect. Maybe a good way to just start out with what the situation here is to begin with would be to just start with a TetrahedronGeometry and then a custom geometry in which I am trying to get the same look with shading. Only when making my custom geometry I will be adding an index, where the  TetrahedronGeometry is very much not indexed.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY - TetrahedronGeometry
// ---------- ----------
const geometry1 = new THREE.TetrahedronGeometry(1, 0);
// ---------- ----------
// GEOMETRY - custom
// ---------- ----------
const geometry2 = new THREE.BufferGeometry();
const data_pos = [ 0,1,0,    0,0,1,    1,0,-1,    -1,0,-1 ];
geometry2.setAttribute('position', new THREE.BufferAttribute( new Float32Array( data_pos ), 3 ) );
geometry2.setIndex( [0,1,2,0,2,3,0,3,1,1,3,2] );
geometry2.computeVertexNormals();
const data_uv = [ 0.5, 0.5,    0,0,    1,1,    0,1];
geometry2.setAttribute('uv', new THREE.BufferAttribute( new Float32Array( data_uv ), 2 ) );
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial();
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( geometry1, material);
mesh1.position.x = -3;
scene.add(mesh1);
const mesh2 = new THREE.Mesh( geometry2, material);
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - The Compute Tangents method to add a tangent attribute, and normal maps

So then once agian I am working out a kind of Tetrahedron Geometry in that it is just four triangles, but by way of resuing points by adding an index, and thus using the same four points in the position attribute rather than having a non indexed geometry of 12 points. So when I call compute vertex normals I end up with four vertex normals as well, which presents the problem. So then in order to address this I can call the compute tangents method to create a tangent attribute after setting up the uv attribute. Now that I have that I can use a normal map to address this, but first I need a texture. So with that said I set up a data texture to just have somehting to work with to find out what the effect is with this.

```js

// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
const data_pos = [ 0,1,0,    0,0,1,    1,0,-1,    -1,0,-1 ];
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array( data_pos ), 3 ) );
geometry.setIndex( [0,1,2,0,2,3,0,3,1,1,3,2] );
geometry.computeVertexNormals();
const data_uv = [ 0.5, 0.5,    0,0,    1,1,    0,1];
geometry.setAttribute('uv', new THREE.BufferAttribute( new Float32Array( data_uv ), 2 ) );
geometry.computeTangents();
// ---------- ----------
// TEXTURE FOR NORMAL MAP
// ---------- ----------
const data_normalmap = [
    255,0,0,255,    0,0,0,255,    0,0,0,255,    0,0,0,255,
    0,255,0,255,    0,255,0,255,  0,0,0,255,    0,0,0,255,
    0,0,0,255,    0,255,0,255,  0,255,0,255,  0,0,0,255,
    0,255,0,255,    0,255,0,255,  0,255,0,255,  0,255,0,255
];
const texture_normal = new THREE.DataTexture( new Uint8Array( data_normalmap ), 4,  4 );
texture_normal.needsUpdate = true;
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial({
    normalMap: texture_normal
});
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( geometry, material);
scene.add(mesh);
// ---------- ----------
// LOOP
// ---------- ----------
const contorls = new OrbitControls(camera, renderer.domElement);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

It is then clear that by working out what the propper RGB values are for the texture I can then adjust the shading to get the object to look the way that it should if it where not indexed.

## Conclusion

That will be it then for tangent attributes of buffer geometry objects in threejs for now then. I might get around to expanding this post more at some point if I gain more ground in this area. I do however have a lot of other posts on threejs that I aim to expand on more so, and I can not say that this is something that comes up that much for me thus far. In any case I do at least have the general idea of what this is about worked out to say the least, tangent attributes have a lot to do with normal maps, and normal maps are something of interest when I work out an indexed geometry.




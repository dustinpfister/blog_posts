---
title: Morph Attributes of buffer geometry objects
date: 2023-02-03 10:02:00
tags: [three.js]
layout: post
categories: three.js
id: 1026
updated: 2023-02-03 10:52:27
version: 1.2
---

The morph attributes property of a buffer geometry instance will store an object which contains buffer attributes that are used to mutate the state of other buffer attributes of the geometry over time. Simply put it is a way to go about creating animation by having say additional position attributes for several other kinds of states for the points of a buffer geometry. These additional attributes that are used to morph a buffer geometry can contain absolute values foe each item, or they can be delta values that store a rate of change for each item as well.


<!-- more -->


## 1 - Some Basic Examples of using morph attributes

Before I start getting into some examples that are are some real over all examples of morph attributes in this section i will be starting out with a few very simple hello world style examples first. The general idea here is to create an additional buffer attribute with the same item size and count of items as the buffer attribute that I want to mutate. Then I create a property of the morph attributes object that is the same key as the name of the attribute I want to mutate and the value should be an array. I can then push this additional buffer attribute as an item of this array. Once that is all set and down it is just a matter of setting the morph targets influences alpha value to set how much an additional buffer attribute in the morph attributes array will impact the state of the buffer attribute I want to mutate.

Still confused? Well thats okay this is a little involved, but it is still only so hard, and maybe it would be best to just read some source code examples here. These examples will just involve one more attribute and I will be sticking to just the position attribute of the buffer geometry. Also for now I will be sticking to using built in geometry constructor functions, and also just keep these as simple static scenes as will in order to focus on just what is more important with this.

### 1.1 - Random points to move the points of a sphere to.

For this basic example I am creating a sphere geometry, and then creating a single buffer attribute of random points the count of which is the same as the position attribute of the sphere geometry. Some times one just has to start somewhere so this just seems like a real simple way to go about getting started with morph attributes.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const geo = new THREE.SphereGeometry(0.5,20,20);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_rnd = [];
for ( let i = 0; i < pos.count; i ++ ) {
    data_rnd.push( -0.5 + Math.random(), -0.5 + Math.random(), -0.5 + Math.random() );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_rnd, 3 );
// ---------- ----------
// MATERIAL, MESH
// ---------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.morphTargetInfluences[ 0 ] = 0.10;
mesh.geometry.computeVertexNormals();
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.2 - Box to sphere example

One of the first examples that I looked at to get an idea of how to do this was to look at the source code of one of the [official threejs examples on more attributes that can be found here](https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html). This example was a good resource for getting started with buffer attributes, but I have found that it is just a little to complex for a basic getting started type example. So I remove some of the code that has to go with adding a twist and keep the code that has to do with just mutating the buffer geometry state from a box to that of a sphere.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// base on this: https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_pos = [];
for ( let i = 0; i < pos.count; i ++ ) {
     const x = pos.getX( i );
     const y = pos.getY( i );
     const z = pos.getZ( i );
     data_pos.push(
         x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
         y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
         z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
     );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos, 3 );
// ---------- ----------
// MATERIAL, MESH
// ---------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.morphTargetInfluences[ 0 ] = 0.75;
mesh.geometry.computeVertexNormals();
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

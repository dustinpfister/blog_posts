---
title: Morph Attributes of buffer geometry objects
date: 2023-02-03 10:02:00
tags: [three.js]
layout: post
categories: three.js
id: 1026
updated: 2023-02-03 12:27:41
version: 1.6
---

The [morph attributes property of a buffer geometry instance](https://threejs.org/docs/#api/en/core/BufferGeometry.morphAttributes) will store an object which contains buffer attributes that are used to mutate the state of other buffer attributes of the geometry over time. Simply put it is a way to go about creating animation by having say additional position attributes for several other kinds of states for the points of a buffer geometry. These additional attributes that are used to morph a buffer geometry can contain absolute values foe each item, or they can be delta values that store a rate of change for each item as well.


<!-- more -->

## Morph Attributes of buffer geometry and what to know first

This is a blog post on more attributes of buffer geometry objects in the javaScript library known as threejs. If you are fairly new to threejs this post my prove to be a little too advanced as there is a whole lot to be aware of before getting into this sort of thing. For one thing there is knowing a thing or two about what buffer attributes of buffer geometry objects are to begin with. So in this section I will be writing about a few quick key things that you might want to read up a bit more on before counting to read the rest of thing post.

### Source code is also up on Github

The source code examples as well as additional assets that i am using in this post can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-morph-attributes).


### Version Numbers matter

When I first wrote this post I was using r146 of threejs.


## 1 - Some Basic Examples of using morph attributes

Before I start getting into some examples that are are some real over all examples of morph attributes in this section I will be starting out with a few very simple hello world style examples first. The general idea here is to create an additional buffer attribute with the same item size and count of items as the buffer attribute that I want to mutate. Then I create a property of the morph attributes object that is the same key as the name of the attribute I want to mutate and the value should be an array. I can then push this additional buffer attribute as an item of this array. Once that is all set and down it is just a matter of setting the morph targets influences alpha value to set how much an additional buffer attribute in the morph attributes array will impact the state of the buffer attribute I want to mutate.

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


## 2 - Custom geometry and morph attributes

Now that I have a few basic examples out of the way in this section I will be getting into a few more advanced examples not just of more attributes but many buffer geometry features for that matter. These examples will then involve creating a custom geometry from the ground up using hard coded javaScript array literals for the data. However some of the examples will also involve exporting this kind of data into a JSON format that can then be used with the buffer geometry attribute. With that said one of the goals here is to export how to go about making an over all model that will involve morph attributes.

### 2.1 - A custom geometry with more than one morph attribute 

For this fist example and all the other examples in this section I am going to be making a very crude bird like model that contains just 12 points in the position attribute. I will then draw triangles using these 12 points by figuring out what the values should be for the index of the position attribute of the buffer geometry. So this geometry will contain just a few points, but it will still be enough to have some parts of the geometry that resemble wings, and the rest of what can be considered a kind of body. However what is really important here is just having a way to define not just one, but a few buffer attributes for this geometry. You see I would like to move the wings, move the head back and froth, and move the tail up and down. On top of all of this I would like to control the state of each of these Independently from each other.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.7, 0.7, 0.7);
scene.add( new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.BufferGeometry();
geo.morphAttributes.position = [];
// USING MORPH TARGETS RELATIVE
geo.morphTargetsRelative = true;
// home data position
const data_pos = [
  // body
  -0.5,-1.0, 1.0,  -1.0,-1.0, 0.0,
   0.0,-1.5,-4.0,   1.0,-1.0, 0.0,
   0.0,-2.0, 0.0,   0.0, 0.0, 0.0,
   // wings
   1.0, 1.0,-0.7,   1.0, 1.0, 0.7,   2.0, 1.0, 0.0,
  -1.0, 1.0,-0.7,  -1.0, 1.0, 0.7,  -2.0, 1.0, 0.0
];
geo.setAttribute('position', new THREE.Float32BufferAttribute(data_pos, 3) );
geo.setIndex([ 0,5,1, 0,3,5, 0,4,3, 0,1,4, 5,3,2, 4,2,3, 4,1,2, 1,5,2, 6,7,8, 5,7,6, 10,9,11, 5,9,10 ]);
geo.computeVertexNormals();
// position deltas 0 - move tail up and down
const data_pos_deltas0 = [
   // body
   0, 0, 0,   0, 0, 0,   0, 1, 0,
   0, 0, 0,   0, 0, 0,   0, 0, 0,
   // wings
   0, 0, 0,   0, 0, 0,   0, 0, 0,
   0, 0, 0,   0, 0, 0,   0, 0, 0,
];
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos_deltas0, 3 );
// position deltas 1 - move head side to side
const data_pos_deltas1 = [
   1, 0, 0.0,   0, 0, 0.5,   0, 0, 0,
   0, 0,-0.5,   0, 0, 0.0,   0, 0, 0,
   // wings
   0, 0, 0.0,   0, 0, 0.0,   0, 0, 0,
   0, 0, 0.0,   0, 0, 0.0,   0, 0, 0
];
geo.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( data_pos_deltas1, 3 );
// position deltas 2 - move wings
const data_pos_deltas2 = [
   0, 0, 0,   0, 0, 0,   0, 0, 0,
   0, 0, 0,   0, 0, 0,   0, 0, 0,
   // wings
   0,-2,-1,   0,-2,-1,   0,-2,-1,
   0,-2,-1,   0,-2,-1,   0,-2,-1
];
geo.morphAttributes.position[ 2 ] = new THREE.Float32BufferAttribute( data_pos_deltas2, 3 );
// ---------- ----------
// COLOR ATTRIBUTE
// ---------- ----------
const data_color = [
    1, 1, 0,   0, 1, 0,   1, 0, 0,
    0, 1, 0,   0, 1, 1,   0, 0, 1,
    // wings
    1, 1, 1,   1, 1, 1,   1, 1, 0,
    1, 1, 1,   1, 1, 1,   1, 1, 0
];
geo.setAttribute('color', new THREE.Float32BufferAttribute(data_color, 3) );
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight();
dl.position.set(2,1,0)
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(al);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshPhongMaterial({
     vertexColors: true,
     side: THREE.DoubleSide
});
// ---------- ----------
// MESH
// ---------- ----------
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 1, 3);
camera.lookAt(0, -1, -1);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 8 % 1) / 0.5;
    const a3 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
    const a4 = 1 - Math.abs(0.5 - a1 * 20 % 1) / 0.5;
    // using morph target influences to set current state of each position attribite
    mesh.morphTargetInfluences[ 0 ] = a2;
    mesh.morphTargetInfluences[ 1 ] = a3;
    mesh.morphTargetInfluences[ 2 ] = a4;
    mesh.geometry.computeVertexNormals();
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

### 2.2 - Making a non indexed geometry

Indexed geometry is great but one thing that I need to be aware of when making them is that it will not just reduce the count of points in the position attribute but also other attributes such as the normal attribute. This will result in just one vertex normal for each point which can result in rendering problems if I want to use the mesh normal material, or any material where the state of the normal attributes is of dire importance in rendering the state of the textures for each face. The good news with this though is that there is the to non indexed method of the buffer geometry that can be used to quickly create a non indexed geometry form an indexed one. I then have points for each triangle and with that independent vertex normal values as well so when I call the compute vertex normals method I get vertex normal values for each of these points that are not the same for each original vertex value.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.7, 0.7, 0.7);
scene.add( new THREE.GridHelper(10, 10) )
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 1, 4);
camera.lookAt(0, -1, -1);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.BufferGeometry();
geo.morphAttributes.position = [];
geo.morphTargetsRelative = true;
// home data position
const data_pos = [
  -0.5,-1.0, 1.0, -1.0,-1.0, 0.0, 0.0,-1.5,-4.0, 1.0,-1.0, 0.0, 0.0,-2.0, 0.0, 0.0, 
   0.0, 0.0, 1.0, 1.0,-0.7, 1.0, 1.0, 0.7, 2.0, 1.0, 0.0, -1.0, 1.0,-0.7, -1.0, 1.0, 0.7, -2.0, 1.0, 0.0
];
geo.setAttribute('position', new THREE.Float32BufferAttribute(data_pos, 3) );
geo.setIndex([0,5,1, 0,3,5, 0,4,3, 0,1,4,  5,3,2, 4,2,3, 4,1,2, 1,5,2,     6,7,8, 5,7,6,   10,9,11, 5,9,10 ]);
// position deltas 0 - move tail up and down
const data_pos_deltas0 = [
   0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos_deltas0, 3 );
// position deltas 1 - move head side to side
const data_pos_deltas1 = [
   1, 0, 0,0, 0, 0.5,0, 0, 0,0, 0,-0.5,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0
];
geo.morphAttributes.position[ 1 ] = new THREE.Float32BufferAttribute( data_pos_deltas1, 3 );
// position deltas 2 - move wings
const data_pos_deltas2 = [
   0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0, 0, 0,0,-2,-1,0,-2,-1,0,-2,-1,0,-2,-1,0,-2,-1,0,-2,-1
];
geo.morphAttributes.position[ 2 ] = new THREE.Float32BufferAttribute( data_pos_deltas2, 3 );
// ---------- ----------
// MATERIAL
// ---------- ----------
const material = new THREE.MeshNormalMaterial({
     side: THREE.DoubleSide
});
// ---------- ----------
// GEOMETRY 2 - non indexed geometry from geo
// ---------- ----------
const geo2 = geo.toNonIndexed();
// ---------- ----------
// MESH
// ---------- ----------
const mesh = new THREE.Mesh(geo2, material);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1 * 8 % 1) / 0.5;
    const a3 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
    const a4 = 1 - Math.abs(0.5 - a1 * 20 % 1) / 0.5;
    mesh.morphTargetInfluences[ 0 ] = a2;
    mesh.morphTargetInfluences[ 1 ] = a3;
    mesh.morphTargetInfluences[ 2 ] = a4;
    mesh.geometry.computeVertexNormals();
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

So the mesh normal material is looking great as well as the animations. So now that this is all in great working state it is just a question of getting the uv attribute set for this as well at which point I can ad textures to the geometry.


## Conclusion

So it would seem that morph attributes are a great way to go about defining some animations for a geometry. However they might still not be the end all way to go about mutating the state of a geometry over time. In some cases I might want to mutate one state of geometry to another, but not do so in a way in which all the points move in a steerage line from one set of values to another. When it comes to doing something like that I might still need to directly change the state of the arrays of buffer attributes and do so with a little custom javaScript code.
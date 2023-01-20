---
title: Material Vertex Color and the buffer geometry attribute used for doing so
date: 2023-01-20 09:35:00
tags: [three.js]
layout: post
categories: three.js
id: 1024
updated: 2023-01-20 09:57:47
version: 1.1
---

One of the core features of the base material class in threejs is a vertex colors Boolean that when set to true will case the material to be rendered using color channel data stored in am attribute of the buffer geometry used. This feature will not work with all materials mind you, and with some a light source might still be needed or something to that effect. However it is still very much a feature of the base material class, unless there is something else going on that will override this it should work on most materials.

The color attribute is not one of the major must have attributes of a buffer geometry mind you. However it is an example of an additional attribute that can be added to a geometry to allow for coloring of a mesh. It is not at all a replacement for uv mapping, and the various material options that can be used with textures. However it is an alternative way of coloring a mesh object that works by adding data to geometry rather than bothering with images. In some cases I might want to use vertex colors as a quick way to have something other than just a single solid color, but I am not sure I would take this kind of approach in the long run, at least not with the built in materials anyway.

The main thing that got me into vertex colors is that recently I get around to writing a new blog post on the shader material. Simply put it is a way to go about creating a custom material using GLSL \( openGL Shader Language \). When doing so I have found that vertex coloring might be a nice way to go about styling a geometry, and when it comes to creating my own materials that opens the door for custom attributes that will allow for not just creating one color attribute but several such attributes.

<!-- more -->


## 1 - Some basic examples of the vertex color buffer geometry attribute

### 1.1 - Vertex colors hello world example

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 4, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material1 = new THREE.MeshBasicMaterial({
    vertexColors: true
});
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, material1);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.2 - Mesh Material options

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
camera.position.set(4, 2, 5);
camera.lookAt(2.5, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);

// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 0.5, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// MESH OBJECT FOR EACH BUILT IN MESH MATERIAL
// ---------- ----------
const meshOpt = {
    vertexColors: true
};
// looks like vertex colors work with just about all of them, with the exception of Depth and Normal materials
'Basic,Depth,Lambert,Matcap,Normal,Phong,Physical,Standard,Toon'.split(',').forEach( (matStr, i) => {
    const x = i % 5;
    const y = Math.floor(i / 5);
    const material = new THREE['Mesh' + matStr + 'Material'](meshOpt);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(0.5 + x, 0, 0.5 + y)
    scene.add(mesh);
});
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2,1,0)
scene.add(dl);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

### 1.3 - Lines

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1.50, 20);
camera.position.set(5, 4, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 3, 10, 10 );
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// Line - vertexColors boolen is a Material base class prop, so it works with LineBasicMaterial
// ---------- ----------
const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 6 });
const line = new THREE.Line(geo, material);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

## 2 - Updating a color attribute over time

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, -1.25, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// just make a color array
const make_color_array = (geo, a1, a2, a3) => {
    a1 = a1 === undefined ? 1 : a1;
    a2 = a2 === undefined ? 1 : a2;
    a3 = a3 === undefined ? 1 : a3;
    const len = geo.getAttribute('position').count;
    const color_array = [];
    let i = 0;
    while(i < len){
        const a_index = i / len;
        const a_indexbias = 1 - Math.abs(0.5 - a_index) / 0.5;
        color_array.push(a1, a_indexbias * a2, 1 - a_indexbias * a3);
        i += 1;
    }
    return color_array;
};
// update color attribute
const update_color_attribute = (geo, a1, a2, a3) => {
    const color_array = make_color_array(geo, a1, a2, a3);
    const color_attribute = geo.getAttribute('color');
    if(color_attribute){
        color_attribute.array = color_attribute.array.map((n, i) => {
            return color_array[i];
        });
        color_attribute.needsUpdate = true;
    }else{
        const new_color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
        geo.setAttribute('color', new_color_attribute);
    }
};
// get bias alpha helper
const getBias = (a1, count) => {
    return 1 - Math.abs(0.5 - a1 * count % 1) / 0.5;
};
// ---------- ----------
// GEOMETRY, MATERIAL, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 4.00, 1.75, 80, 80 );
geo.rotateX(Math.PI * 0.55)
update_color_attribute(geo, 1, 1, 1);
const material1 = new THREE.MeshPhongMaterial({
    vertexColors: true,
    shininess: 15,
    specular: new THREE.Color(0.75, 0.75, 0.75)
});
const mesh1 = new THREE.Mesh(geo, material1);
scene.add(mesh1);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(5, 3, 1);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(al);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = getBias(a1, 1);
    const a3 = getBias(a1, 8);
    const a4 = getBias(a1, 16);
    update_color_attribute(geo, a2, a3, a4);
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

## Conclusion



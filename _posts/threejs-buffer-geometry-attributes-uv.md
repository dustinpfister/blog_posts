---
title: Texture offsets of buffer geometries in threejs with the uv attribute
date: 2021-06-09 09:44:00
tags: [three.js]
layout: post
categories: three.js
id: 885
updated: 2023-06-12 16:51:01
version: 1.32
---

When working out a [custom geometry](/2021/04/22/threejs-buffer-geometry/) or playing around with a built in geometry in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), there are a number of attributes of interest if the geometry is to be used with a mesh object. When it comes to using THREE.Points or THREE.Line I just need to worry about the [position](/2021/06/07/threejs-buffer-geometry-attributes-position/). However when it comes to mesh objects I am also going to want to have a [normal](/2021/06/08/threejs-buffer-geometry-attributes-normals/) attribute that has to do with the direction that points of the position attribute are facing. 

Today though I will be getting into the uv attribute that is used to position the textures that are used when skinning a geometry with a [material](/2018/04/30/threejs-materials/) that will make use of such an attribute. It is a way to change the locations of where the texture is to be applied for a given face that will be using the texture, by creating an array of values for each vertex. Each vertex has a horizontal and vertical value for it in the array so this might differ a little in terms of the number of values for each vertex compared to the other attributes. So for example if a geometry is a plane that has a vertex count of 4 then there will be two numbers for each vertex that will result in a length of 8 values when it comes to the uvs for that plane.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/Ntz_B7Ye130" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The uv attribute of a buffer geometry and what to know first

This is a post on an advanced topic in threejs that has to do with creating, or mutating an array of uv values for an instance of buffer geometry. This is then not a [getting started type post with threejs](/2018/04/04/threejs-getting-started/) or [javaScript in general](/2018/11/27/js-getting-started/) and I assume that you have logged a fair amount of time working with threejs before hand. In any case in this section I will be going over some things that you should maybe be aware of before hand, or maybe read up on a bit more before reading the rest of this post.

### One way or another you are going to need a texture to use with a material

The uv attribute has to do with how a texture is to be applied to a face of a geometry in a mesh. So in order to make use of uvs and to play around with them you are going to need a texture to use as a color map of a material. In this post I am [creating textures using canvas elements](/2018/04/17/threejs-canvas-texture/) which is one way to go about making some textures with javaScript code rather than an external image. There are a number of other options though when it comes to having a texture to use though such as [data textures](/2022/04/15/threejs-data-texture/), using the [texture loader](/2021/06/21/threejs-texture-loader/) to load external images, or just directly call the texture constructor and pass an image if you have some other way to load images.

### There is much more to read about when it comes to buffer geometry in general

The way that I think about it is that learning about the uv attribute of a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) comes after learning about the normal, and position attributes. Those attributes of a geometry are also very important as they define the position of the points in space, and the directions that they are facing which is something that is used when it comes to light or the use of the normal material. However there is even more to a geometry beyond the position, normal, and uv attributes, when it comes to prototype methods of buffer geometry class instance as well as other properties such as groups and material index values.

### Do not confuse uvs with the material index values of groups.

The uvs have to do with how a texture is to be applied to a face when it comes to offsets in the image. When it comes to a box geometry for example the uv attribute is set up by default to use all of the image for all sides. Often this might be what I want to happen but often I might want to do something else. I could edit the uv attribute so that I use only certain parts of a single texture for certain faces of the cube, but another option would be to use more than one image for more than one material. Then it is just a matter of what image I want to use for what face.

For the most part I think it is a good idea to learn a thing or two about how to edit the uv attribute and use just one texture. However I think I should still at least mention here that there is another option that might need to be used in some cases that has to do with [setting the material index values of group objects](/2018/05/14/threejs-mesh-material-index/), and creating the groups in the first place. However getting into that here would be to far off topic.

### Source code examples are up on Github

The source code examples that I am writing about in this post can also be found in my [test threejs repo on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-attributes-uv). This is also where I park the source code for my [many other posts on threejs as well](/categories/three-js/).

### Always check your version numbers

When I first wrote this post I was using r127 of threejs, and the last time I came around to do some editing I was using r146 of the library. The examples here where working okay with both versions of threejs on my end just fine. In time code breaking changes might be made to the library that will result in these examples no longer working until I get around to editing this post yet again.

## 1 - Basic examples of the uv attribute of buffer geometry

In this section I will be starting out with just some basic examples of the uv attribute of the buffer geometry class in threejs. This will involve examples where I am mutating a uv attribute that is all ready there to begin with such as with built in geometries. However i will also be going over at least one example that involves creating a custom geometry from the ground up as well.

### 1.1 - Basic uv mutation example using a Plane, and a canvas texture

To get a general idea of what the uvs are for when it comes to textures it might be best to start working with a plane geometry and look at the values of uv attribute of the plane that is created when using the built in geometry constructor. For example if I create a plane geometry that is a size of 1 by 1 and also has a section size of 1 by 1 then that results in a geometry composed of just 4 points, and because there are 2 uv values for each point it will result in just 8 values in the uv attribute. This is then a nice simple starting point when it comes to playing around with these values to gain a sense of what happens when the values are changed.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
ctx.fillStyle = '#004040'; // fill
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';
ctx.fillStyle = 'red';
ctx.beginPath(); // draw red and white circle
ctx.arc(10, 10, 8, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.beginPath(); // draw white square
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.stroke();
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
//-------- ----------
// GEOMETRY - Mutation of a plane
//-------- ----------
const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
const uv = geometry.getAttribute('uv'),
position = geometry.getAttribute('position');
// the position attribute
console.log(position.count); // 4 ( the are points or vertices )
console.log(position.array.length); // 12 ( x, y, and z for each point )
// THE UV ATTRIBUTE
console.log(uv.count); // 4 ( the are points or vertices )
console.log(uv.array.length); // 8 ( there is a u and v value for each point )
// MUTATING THE UV VALUES
uv.array[0] = 0.27;
uv.array[1] = 0.73;
uv.array[2] = 0.73;
uv.array[3] = 0.73;
uv.array[4] = 0.27;
uv.array[5] = 0.27;
uv.array[6] = 0.73;
uv.array[7] = 0.27;
//-------- ----------
// MESH
//-------- ----------
// use the geometry with a mesh
const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: texture
        }));
mesh.position.set(1, 0, 0);
scene.add(mesh);
// another mesh where I am not doing anything to the uv values
const geometry2 = new THREE.PlaneGeometry(1, 1, 1, 1);
const mesh2 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: texture
        }));
mesh2.position.set(-1, 0, 0);
scene.add(mesh2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

The values that I will typically want to use will be just 0, and 1 which is what will happen when I want to use all of the texture for a face. Numbers between 0 and one imply what I am using just some of the image, while numbers above 1 mean that I am using the whole of the image for just part of the face actually.

### 1.2 - Basic triangle custom geometry example with uv attribute added.

This next example involves adding a uv attribute to a clean new buffer geometry that is made from scratch. Sense this is a basic section of this post this custom geometry will be just three points in space, so in other words a single triangle. The first step is to create a new buffer geometry by calling the main THREE.BufferGeomerty constructor function. After that the returned result will be a clean, new Buffer geometry instance however it will not have any attributes at all, including a position attribute. 

So then I will want to start by adding the position attribute which will be the actually position of three points in space. To do this I will want to create a  [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) of numbers where each three numbers are the x y and z positions of each point in space. Sense I want to make just a single triangle here this will be 9 numbers in the array then. I can then use this array to create a new instance of [Buffer Attribute](https://threejs.org/docs/#api/en/core/BufferAttribute) which I can then use to set the position attribute of this new geometry by calling the [set attribute method](https://threejs.org/docs/#api/en/core/BufferGeometry.setAttribute), and giving the string ‘position for the name of the attribute’.

Next I will want to add a normal attribute to this as well, one quick way to do this that will work well more often that not will be to just call the compute vertex normal's method of the buffer geometry instance. 

Now that I have a position and normal attribute I can now add the uv attribute to define what areas of a 2d texture should be drawn to the surface of this triangle. Once again as with my position attribute I will want to create an instance of a Float32Array but this time I will only have two values for each point as these are the 2d image offsets for each point in the triangle. I can then use this array as the first argument for a new instance of buffer attribute and this time I will be making the item size of the attribute 2. This can then be used to set the uv attribute of the buffer geometry by once again calling the set attribute method.


```js

//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10))
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 8;
canvas.height = 8;
ctx.fillStyle = '#004040';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = 'red';
ctx.fillRect(2, 2, 2, 2);
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
//-------- ----------
// GEOMETRY - Custom Triangle
//-------- ----------
// position attribuite
const geometry = new THREE.BufferGeometry();
const vertices1 = new Float32Array([
            0, -0.5, -0.75,
            0, 0.5, 0.25,
            0, -0.5, 0.25
        ]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));
// normals
geometry.computeVertexNormals();
// uv attribute
const vertices2 = new Float32Array([
            0.2, 0.2,
            0.9, 0.9,
            0.2, 0.9
        ]);
geometry.setAttribute('uv', new THREE.BufferAttribute(vertices2, 2));
//-------- ----------
// MESH
//-------- ----------
// use the geometry with a mesh
const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: texture
        }));
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1, 0.5, 1);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Minimap for help with UV mapping

I have found that a good way to gain a sense of what is going on with a UV attribute is to have a mini map of sorts that shows what the current state is with the UV attribute of a geometry. That is to have some kind of display that is a scaled down, or up image of the texture that is being used with the geometry. Then use the UV attribute of the geometry to also draw lines over this scaled texture to show what areas of the texture are being used for what triangle. In this section that I am going to be writing about some of these kinds of demos that are great for working out logic that will be used to set or update the UV attribute.

### 2.1 - Starting with just a Single triangle


<iframe class="youtube_video" src="https://www.youtube.com/embed/CNLUqN7b2ew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


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
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
canvas_2d.style = 'block';
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const updateUVRotation = (geometry, a_rotation = 0, radius = 0.5, center = new THREE.Vector2(0.5, 0.5) ) => {
    const att_uv = geometry.getAttribute('uv');
    const radian_start = Math.PI * 2 * a_rotation;
    let i = 0;
    while(i < att_uv.count){
        const a_count = (i / att_uv.count);
        const radian = (radian_start + Math.PI * 2 * a_count) % Math.PI * 2;
        const v = new THREE.Vector2();
        v.x = center.x + Math.cos(radian) * radius;
        v.y = center.y + Math.sin(radian) * radius;
        att_uv.setXY(i, v.x, v.y);
        i += 1;
    }
    att_uv.needsUpdate = true;
};
const createMiniMap = ( pos = new THREE.Vector2(), size = 256, geometry = null) => {
    const minimap = {
        pos: pos,
        size: size,
        v2array: []
    };
    if(geometry){
        setV2array(minimap, geometry);
    }
    return minimap;
};
// create the v2 array for the minimap based on the given geometry
const setV2array = (minimap, geometry) => {
    const att_uv = geometry.getAttribute('uv');
    const v2array = [];
    let i = 0;
    const len = att_uv.count;
    while(i < len){
        v2array.push( new THREE.Vector2( att_uv.getX(i), 1 - att_uv.getY(i) ) );
        i += 1;
    }
    minimap.v2array = v2array;
};
// get a vector2 from the v2 array that is scaled based on size
const getMiniMapV2 = (minimap, i) => {
    return minimap.v2array[i].clone().multiplyScalar(minimap.size);
};
// draw the minimap
const drawMinimap = (minimap, ctx) => {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.translate(minimap.pos.x, minimap.pos.y);
    ctx.drawImage(canvas_texture, 0, 0, minimap.size, minimap.size);
    let i = 0;
    const len = minimap.v2array.length;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'rgba(0,255,255, 0.2)';
    ctx.lineWidth = 2;
    while(i < len){
        const v1 = getMiniMapV2(minimap, i);
        const v2 = getMiniMapV2(minimap, i + 1);
        const v3 = getMiniMapV2(minimap, i + 2);
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        i += 3;
    }
    ctx.restore();
};
// ---------- ----------
// TEXTURE
// ---------- ----------
const canvas_texture = document.createElement('canvas');
const ctx_texture = canvas_texture.getContext('2d');
canvas_texture.height = canvas_texture.width = 32;
const gradient = ctx_texture.createLinearGradient(0, 32, 32, 0);
gradient.addColorStop(0.00, 'red');
gradient.addColorStop(0.40, 'yellow');
gradient.addColorStop(0.50, 'lime');
gradient.addColorStop(0.60, 'cyan');
gradient.addColorStop(1.00, 'blue');
ctx_texture.fillStyle = gradient;
ctx_texture.fillRect(0,0, 32, 32);
const texture = new THREE.CanvasTexture(canvas_texture);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
// position
const data_pos = [ -1,-1,0,  -1,1,0,  1,-1,0];
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array(data_pos), 3) );
// normal
geometry.computeVertexNormals();
// uv
const data_uv = [
  0.20,0.90,
  0.95,0.90,
  0.01,0.01
];
geometry.setAttribute('uv', new THREE.BufferAttribute( new Float32Array(data_uv), 2) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid
const grid = new THREE.GridHelper( 10,10 );
grid.material.linewidth = 3;
scene.add( grid );
// mesh1
const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map:texture });
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new OrbitControls(camera, canvas_2d);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const minimap = createMiniMap( new THREE.Vector2(430, 10), 200 );
camera.position.set(1, 1, 2);
camera.lookAt(0.4,0.1,0);
const sm = {
   FPS_UPDATE: 30,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,   // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 450,
   secs: 0,
   frame_frac: 0,      // 30.888 / 450
   frame: 0,           // 30 / 450
   tick: 0,            //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a_frame = sm.frame / sm.FRAME_MAX;
    const a2 = 1 - Math.abs( 0.5 - a_frame ) / 0.5;
    const a3 = 0.01 + 0.49 * a_frame;
    updateUVRotation(geometry, a2, a3);
    setV2array(minimap, geometry);
};
const render2d = (sm) => {
    // background
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    // draw dom element
    ctx.drawImage(renderer.domElement, 0, 0, canvas_2d.width, canvas_2d.height);
    // draw uv minimap
    drawMinimap(minimap, ctx);
    // text overlay
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('frame : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 5);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
```

## 3 - Set Face method for Box Geometry

This is a demo based on code that I wrote for my [ mutation of the uv attribute of a Box geometry threejs project example](/2022/11/04/threejs-examples-uvmap-cube-canvas-update/). The goal with that project was to make some code that I can use to quickly set the faces of a box geometry to given cells in a 2d image. So simply put I have this set face method that will take a uv attribute, face index, cell index, and order array, and a cell size as arguments and set the uv attribute with those values. So then I call the set face method, pass the uv and then the face index of the cube in the 0 - 5 range. I then pass a cell index that I want to use in the texture that I am using with the material, the value of which will differ based on the cell size argument that is given. The order array is then the order of the vertex to use when mapping the part of the image to the face.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCITONS
//-------- ----------
// get a uvData array for a given uv face index and cell index
const getUVData = (faceIndex, cellIndex, gridSize) => {
    faceIndex = faceIndex === undefined ? 0: faceIndex;
    cellIndex = cellIndex === undefined ? 0: cellIndex;
    gridSize = gridSize === undefined ? 4: gridSize;
    const cellX = cellIndex % gridSize;
    const cellY = Math.floor(cellIndex / gridSize);
    // for each set of uvs for the face
    let di = 0;
    const uvd = 1 / gridSize;
    let uvData = [];
    while(di < 4){
        const i = faceIndex * 4 + di;
        const x = di % 2;
        const y = 1 - 1 * Math.floor(di / 2);
        // get u and v using cellX and cellY
        const u = uvd * cellX + x * uvd;
        const v = 1 - uvd * ( cellY + 1 ) + y * uvd;
        uvData.push({i:i,u:u,v:v});
        di += 1;
    }
    return uvData;
};
// set uvs with the uvData, and order arrays
const setUVData = (uv, uvData, order ) => {
    order = order || [0, 1, 2, 3]; // normal
    uvData.forEach((a, di, uvData) => {
        const b = uvData[ order[di] ]
        uv.setXY(a.i, b.u, b.v);
    });
    uv.needsUpdate = true;
};
// main helper
const setUVFace = (uv, faceIndex, cellIndex, order, gridSize) => {
    const uvData = getUVData(faceIndex, cellIndex, gridSize);
    setUVData(uv, uvData, order );
};
//-------- ---------- 
// CANVAS
//-------- ----------
const CELL_SIZE = 4;
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
// set canvas native size
canvas.width = 128;
canvas.height = 128;
// draw to canvas
let i = 0;
const len = CELL_SIZE * 2;
const cellsize = canvas.width / CELL_SIZE;
const COLORS = 'red,lime,blue,yellow,purple,cyan'.split(',');
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '32px arial';
while(i < len){
    const gx = i % CELL_SIZE;
    const gy = Math.floor( i / CELL_SIZE );
    const x = cellsize * gx;
    const y = cellsize * gy 
    // gradient for background
    const gradient = ctx.createLinearGradient(x, y, x + cellsize, y + cellsize);
    gradient.addColorStop(0.00, 'black');
    gradient.addColorStop(0.50, COLORS[i] || '#888888');
    gradient.addColorStop(1.00, 'black');
    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, cellsize, cellsize);
    ctx.fillStyle = 'white';
    ctx.fillText(i + 1, x  + cellsize / 2, y + cellsize / 2);
    i += 1;
}
// draw to cells
//-------- ---------- 
// GEOMETRY
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_uv = geometry.getAttribute('uv');
//-------- ---------- 
// texture
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
texture.magFilter = THREE.NearestFilter;
//-------- ---------- 
// MATERIAL
//-------- ----------
const material = new THREE.MeshBasicMaterial({
    map: texture
});
//-------- ---------- 
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
    geometry,
    material
);
scene.add(mesh1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0, 0);
// constant values and state for main app loop
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20,     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900,
CLOCK = new THREE.Clock(true); // USING THREE.Clock in place of new Date() or Date.now()
let secs = 0,
frame = 0,
lt = CLOCK.getElapsedTime();
// update
const ORDERS = [
   [0,1,2,3],
   [0,2,1,3],
   [2,3,0,1],
   [3,1,2,0]
];
const update = (frame, frameMax) => {
    const a1 = frame / frameMax;
    mesh1.rotation.y = Math.PI * 2 * a1;
    mesh1.rotation.x = Math.PI * 8 * a1;
    if(frame % 30 === 0){
        let index_face = 0;
        while(index_face < 6){
            const index_cell = Math.floor( Math.random() * 6 );
            const order = ORDERS[ Math.floor( ORDERS.length * Math.random() ) ];
            setUVFace(att_uv, index_face, index_cell, order, CELL_SIZE);
            index_face += 1;
        }
    }
};
// loop
const loop = () => {
    const now = CLOCK.getElapsedTime(),
    secs = (now - lt);
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

## 4 - Updating uvs at run time in an Animation loop

Just because the array of uvs can be updated at run time that does not mean that doing so is a good idea. I think that generally uvs are something that should be set up once and only once and if I want to do something that involves more than one texture for a face it might be better to think in terms of more than one texture file and material and updating the textures used with materials rather than messing around with uvs.

Still if for some reason I do need to change the state of the uvs over time in a loop I just need to make sure that I keep setting the needs update property of the uv attribute back to true each time.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 32;
canvas.height = 32;
ctx.fillStyle = '#004040'; // fill
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';
ctx.fillStyle = 'red';
ctx.beginPath(); // draw red and white circle
ctx.arc(16, 16, 8, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.beginPath(); // draw white square
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.stroke();
const texture = new THREE.Texture(canvas);
texture.needsUpdate = true;
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const uv = geometry.getAttribute('uv');
const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            map: texture
        }));
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 20; // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function (frame, frameMax) {
    const a = frame / frameMax;
    const bias = 1 - Math.abs(a - 0.5) / 0.5;
    uv.array[0] = -2 + 2 * bias;
    uv.array[1] = 2 - 1 * bias;
    uv.needsUpdate = true;
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / FPS_UPDATE) {
        // update, render
        update(Math.floor(frame), FRAME_MAX);
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

The uvs of a geometry are for setting up the [texture cornets](http://paulyg.f2s.com/uv.htm) of a geometry when it comes to what portions of a texture should be used when applying it to the face of geometry. This array of values should not be confused with other values of a geometry such as the groups that are used when setting material index values. That is that another part of creating a custom geometry would involve also creating an array of groups, and each group object would contain a material index value to use for a given set of triangles when using an array of materials for a mesh object that will be used with a buffer geometry.

That is it for now when it comes to the uv attribute, at some point in the future I might be able to get around to doing some editing for this post as I often do for my threejs content. Some additional examples that have to do with creating a geometry from the ground up might be called for, as well as some other ways of explaining what uvs are all about might help.

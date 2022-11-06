---
title: UV map of a cube set up once and then draw to a canvas texture threejs example.
date: 2022-11-04 08:13:00
tags: [three.js]
layout: post
categories: three.js
id: 1012
updated: 2022-11-06 08:17:01
version: 1.15
---

I would like to start at least one if not more [threejs project examples](/2021/02/19/threejs-examples/) that have to do with setting up the [uv map](https://en.wikipedia.org/wiki/UV_mapping) of a cube created with the THREE.BoxGeometry constructor in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). By default the geometry will have a uv map, it is just that it will use all of the given texture for each face of the cube. 

There are ways of setting differing textures to each face without doing anything with the uv attribute such as having more than one material and setting the material index values of each face by way of the groups object. However when it comes to cubes and geometry in general sooner of later I am going to want to learn more about how to mutate the uv attribute values with a little javaScript code.

There are two general ways of doing what I would like to do with cubes here. One way would be to mutate the uv attributes over time so that the locations in a single texture change. The other way would be to set up the uv attribute once so that the cube will always used fixed locations of the canvas, then use a canvas element as the texture, and update that texture as needed. In this post what I currently have is centered around the later rather than the former, but that might change with future revisions of this when and if I get to it.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/FhLLRbutY7M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The cube uv threejs module example and what to know first

This threejs project example is a module that will mutate the uv attribute of a box geometry made with the box geometry constructor function in the javaScript library known as threejs. On top of the cube uv module itself I am also using a few additional modules and official threejs files as well that i will not be getting into detail with in this post as well. So it goes without saying that this is not at all a post for people that are new to threejs, but rather one of my many threejs project examples in which I am starting to make some kind of involved project rather than just simple demos of various threejs features.

Although I will not be getting into detail with every little thing there is to know about before hand, I will write about at least a few things in this section. Also I will of course link to additional relevant posts where and when needed in which I will get into detail.

### This cube uv threejs module example makes use of r1 of my canvas module

A long time ago now I wrote a [blog post on canvas textures in threejs](/2018/04/17/threejs-canvas-texture/), however this is also a post that I find myself editing often. Anyway to get to the point the cube uv module that I am writing about in this post works on top of my canvas module that I write about in that post. I could have baked some code into the cube uv module alone, but I am thinking that this project will be one if not many projects in which I work on top of that module.

### Some of the example of the cube uv module make use of r0 of my texture loader module

I also wrote a [blog post on the texture loader in threejs](/2021/06/21/threejs-texture-loader/), and with some of the demos of the module I am using the canvas loader abstraction that I write about in that post. This is not as important as the canvas module, and I also have some demos in which I am just using the texture loader directly. Still it is nice to abstract some of that away to make the demos a little lighter in terms of the over all volume of code.

### This IS NOT a getting started post on the uv buffer attribute of buffer geometry.

This is not at all a [getting started post on the uv attribute of buffer geometry](/2021/06/09/threejs-buffer-geometry-attributes-uv/) that has to do with defining the offsets for areas of a texture that are to be rendered to a face of a geometry such as but not limited to a cube.

### This IS NOT a getting started post on buffer geometry in general

There is a whole lot to be aware of when it comes to [buffer geometry in general](/2021/04/22/threejs-buffer-geometry/). The main focus that is relevant here is the uv attribute, but there is also the position and normal attributes of geometry as well. On top of that there is also index and none indexed geometry, groups, and the various properye8s and methods of the Buffer geometry as well as buffer attributes classes along with way more.

### Source code is up on Github

The source code for the modules as well as the examples can be found in the [for post folder for this post in my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-uvmap-cube-canvas-update). The source code for the canvas module that I am working on can also be found there in the [for post folder for my post on canvas textures](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-canvas-texture). Also the source of the [texture module that I use for some of the examples](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-texture-loader) here can be found in that repo as well.

### Version Numbers matter

The version of threejs that I was using when working on this was r146.

## 1 - The first version of my uvmap cube canvas update module

This is the source code of the first version of my uv map cube module. The main features of interest here are the private helper functions that I am using to get the desired uv values that I will want to set for a given face index, cell index and grid size for the texture. When it comes to the first method up top called getUVData I pass a uv attribute reference along with a face index, cell index and grid size to get an array of index values along with u and v values to set for that index to get a desired outcome.
For this first version of the module I am thinking in terms of breaking down a texture into a number of divisions that are the same for both height and width. This is what the grid size argument is about as that is the number of divisions that I would like to have. You see the resolution of the textures that I use always need to be a power of 2, and they always need to be square. However I can divide up the area of the texture anyway that I would like, and for now I am thinking just in terms of a grid that is 4 by 4 by default. So then if I use a texture that is say 128 by 128, then the resolution of each cell will be 32 by 32.

So then if a 128 by 128 resolution texture is divided up into 32 by 32 cells there will then be cell index locations of each of these cells. In this case there will be 16 cells and if we are talking zero relative numbers that means the index range will be from 0 to 15. The face index value then is the index for a face on a cube and the range for that would be 0 to 5.

When I create an instance of getUvData I will then want to use this to set the state of the uv attribute. For this I have my setUVData helper where I pass the uv that I will like to mutate, along with the uvData area created with my getUVData helper, and then and order array that will default to \[0,1,2,3\] which so far seems to work okay, but I might need to adjust when it comes to setting the rotation of the uv points. However with this project there is also doing a rotation when it comes to drawing to the canvas texture that I am using as well which is what I prefer for this revision of the module at least when and if I need to do so even to begin with.

```js
// uvmap-cube.js - r0 - from threejs-examples-uvmap-cube-canvas-update
(function (api) {
    //-------- ----------
    //  HELPERS
    //-------- ----------
    // get a uvData array for a given uv face index and cell index
    const getUVData = (uv, faceIndex, cellIndex, gridSize) => {
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
        const uvData = getUVData(uv, faceIndex, cellIndex, gridSize);
        setUVData(uv, uvData, order );
    }
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    api.drawFace = ( mesh, drawto, imgArgs ) => {
        const mud = mesh.userData;
        mud.drawto = drawto;
        mud.imgArgs = imgArgs;
        canvasMod.update(mud.canObj);
    };
    // create and return a cube
    api.create = (opt) => {
        opt = opt || {};
        const cs = opt.cubeSize = opt.cubeSize === undefined ? 1 : opt.cubeSize;
        // CREATE BOX GEO
        const geo = new THREE.BoxGeometry(cs, cs, cs);
        // SET UP THE UV ATTRIBUTE
        const uv = geo.getAttribute('uv');
        // set the uvs once!
        let faceIndex = 0;
        const cellNames = opt.cellNames || { front: 0, back: 1, top: 2, bottom: 3, right: 4, left: 5};
        const cellIndices = opt.cellIndices || [5, 7, 1, 9, 4, 6];
        while( faceIndex < 6){
            setUVFace(uv, faceIndex, cellIndices[faceIndex], [0,1,2,3], 4);
            faceIndex += 1;
        }
        // CREATE Mesh User Data
        const mud = {};
        mud.cellNames = cellNames;
        mud.cellIndices = cellIndices;
        mud.drawto = 'front';
        mud.pxa = opt.pxa === undefined ? 0.4 : opt.pxa;
        // images array and arguments used to set current index as well as offsets
        mud.images = opt.images || [ 
            canvasMod.create({ draw: 'rnd', size: 128, state:{ gSize: 16} } ).canvas
        ];
        mud.imgArgs = {
            i: 0,
            sx: 0, sy: 0, sw: 32, sh: 32
        };
        // set ws and sh to full size of image 1 if there.
        const img0 = mud.images[0];
        if(img0){
            mud.imgArgs.sw = img0.width;
            mud.imgArgs.sh = img0.height;
        }
        mud.canObj = canvasMod.create({
            size: opt.canvasSize === undefined ? 256 : opt.canvasSize,
            state: mud,
            update_mode: opt.update_mode || 'canvas',
            palette: opt.palette || ['white', 'black'],
            draw: function(canObj, ctx, canvas, mud){
                 // get current ci value
                 const ci = mud.cellIndices[mud.cellNames[mud.drawto]];
                 const cellSize = canvas.width / 4;
                 const pxa = mud.pxa;
                 const x = ci % 4;
                 const y = Math.floor(ci / 4);
                 const px = x * cellSize - pxa;
                 const py = y * cellSize - pxa;
                 // draw current image with current settings
                 const img = mud.images[mud.imgArgs.i];
                 if(img){
                     ctx.clearRect(px, py, cellSize, cellSize);
                     ctx.drawImage(img, 
                         mud.imgArgs.sx, mud.imgArgs.sy, mud.imgArgs.sw, mud.imgArgs.sh, 
                         px, py, cellSize + pxa * 2, cellSize + pxa * 2);
                 }
            }
        });
        // MATERIAL
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(1, 1, 1),
            map: mud.canObj.texture,
            emissive: new THREE.Color(1, 1, 1),
            emissiveMap: mud.canObj.texture
        });
        // MESH OBJECT
        const mesh = new THREE.Mesh(geo, material);
        mesh.userData = mud;
        // first draw face calls
        api.drawFace(mesh, 'front', mud.imgArgs);
        api.drawFace(mesh, 'back', mud.imgArgs);
        api.drawFace(mesh, 'top', mud.imgArgs);
        api.drawFace(mesh, 'bottom', mud.imgArgs);
        api.drawFace(mesh, 'left', mud.imgArgs);
        api.drawFace(mesh, 'right', mud.imgArgs);
        // return a mesh object
        return mesh;
    };
}
    (this['uvMapCube'] = {}));
```

I then have my public api that contains a create method and a single draw face method. The create method will set up and return a mesh object that uses a geometry created with the THREE.BoxGeometry constructor, and also with the THREE.MeshPhongMaterial. However this is not just any mesh object as I am using the [user data object of the object3d class based mesh object](/2021/02/16/threejs-userdata/) to store an instance of an object created with my canvas module as well as other data that I will be using to update the state of the texture that is used for the map and emissive map options of the phong material.

I then have a draw face method that will allow me to draw to a given face of a given mesh object that was created with the create method of this module. I use it by passing the mesh object as the first argument, and then a face name of the cube that I would like to draw to. I can then pass an object that contains info in terms of the source image to use, along with 2d offset, with and height values to use. So then this method will just draw once face per call.

### 1.1 - Basic example of the uv map cube module

This is what I have together for a hello world of this project. Here I am setting up a typical threejs project scene by creating the scene object, camera, and renderer. I like to work on Raspberry PI OS actually so I am going with the web gl 1 renderer to avoid problem that I have noticed starting  with r141 which is why I was sticking with r140 for a while.
So when it comes to the sources images that I will be using I am again using my canvas module and with that the built in rnd draw method that just creates a random texture for a given grid size in this case I am setting the grid size to 16. I have then made a make canvas options helper that has all the settings that I want when making my canvas object and I am then just calling that for each image that I will be using only making changes for the palette option.

I then create my mesh object with the create method of the uv map cube module and then use the draw face method to update what faces to what faces to what. This time I am only updating two faces of the cube to image 1 while leaving everything else to the default image used which is image 0.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10 ));
    scene.background = new THREE.Color(0.5, 0.5, 0.5);
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    const mkCanvasOpt = (palette) => {
        const canOpt = {
            draw: 'rnd', 
            update_mode: 'canvas', 
            palette: palette || ['white', 'black'], 
            size: 128, 
            state:{ gSize: 16 } };
        return canOpt;
    };
    // ---------- ----------
    // CREATE AND UPDATE MESH
    // ---------- ----------
    // create the mesh object
    const mesh = uvMapCube.create({
        images: [ 
            canvasMod.create( mkCanvasOpt() ).canvas,
            canvasMod.create( mkCanvasOpt(['red', 'blue', 'purple']) ).canvas
        ]
    });
    scene.add(mesh);
    // I can now use the draw face method
    uvMapCube.drawFace(mesh, 'front', {i:1, sx: 0, sy: 0, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'top', {i:1, sx: 0, sy: 0, sw: 128, sh: 128});
    // ---------- ----------
    // RENDER
    // ---------- ----------
    renderer.render(scene, camera);
}());
```

### 1.2 - Face example

This is an example where I worked out a custom draw method that I might build into future revisions of the canvas module. The draw method works by giving an array of palette index values to draw on a grid cell by grid cell basis. I have found that this is just one way that I like to draw to a canvas element by way of some data and javaScript code that is my own weird standard. When it comes to sticking to certain standards though there is also working out something where I have color channel data for each pixel and for that there is all ready a good browser built in standard of course, but I will not be getting into that in detail here though.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10 ));
    scene.background = new THREE.Color(0.5, 0.5, 0.5);
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
    // ---------- ---------- ----------
    // CUSTOM DRAW METHOD
    // ---------- ---------- ----------
    // palette grid draw method
    const palette_grid = (canObj, ctx, canvas, state) => {
        const w =  state.w === undefined ? 16 : state.w;
        const h =  state.h === undefined ? 16 : state.h;
        const data = state.data || [];
        const len = w * h;
        const pxW = canObj.size / w;
        const pxH = canObj.size / h;
        let i = 0;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const ci =  data[i] || 0;
            const x = i % w;
            const y = Math.floor(i / w);
            ctx.fillStyle = canObj.palette[ci];
            const px = x * pxW;
            const py = y * pxH;
            ctx.fillRect(px, py, pxW, pxH);
            i += 1;
        }
    };
    // create a canObj with a palette and grid data
    const createGridCanvas = (data, palette, w, h, size) => {
        const canObj = canvasMod.create({
            draw: palette_grid,
            size: size === undefined ? 128: size,
            palette: palette || ['white', 'black', 'red', 'lime', 'blue'],
            state:{
                data: data || [],
                w: w === undefined ? 32: w, 
                h: h === undefined ? 32: h
            }
        });
        //canObj.canvas.style.imageRendering = 'pixelated';
        return canObj;
    };
    const data_smile = [
         2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,1,0,0,1,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,1,0,0,1,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,1,0,0,1,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,1,1,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
 
         2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,0,0, 0,0,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,0,0,0, 0,0,0,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,0,0,0,0,0,0, 0,0,0,0,0,0,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
 
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         2,2,2,2,2,2,2,2, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
 
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
    ];
    // ---------- ---------- ----------
    // CREATE AND UPDATE MESH
    // ---------- ---------- ----------
    // create the mesh object
    let mesh = uvMapCube.create({
        pxa: 0.4,
        images: [
            createGridCanvas(data_smile).canvas
        ]
    });
    scene.add(mesh);
    // I can now use the draw face method
    uvMapCube.drawFace(mesh, 'front', {i:0, sx: 0, sy: 0, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'back', {i:0, sx: 32, sy: 0, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'right', {i:0, sx: 0, sy: 32, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'left', {i:0, sx: 32, sy: 32, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'top', {i:0, sx: 0, sy: 64, sw: 32, sh: 32});
    uvMapCube.drawFace(mesh, 'bottom', {i:0, sx: 32, sy: 64, sw: 32, sh: 32});
    // ---------- ----------
    // ORBIT CONTROLS
    // ---------- ----------
    if(THREE.OrbitControls){
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){};
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
}());
```

### 1.3 - Texture loader example

In this example I am using an external image as the texture rather than using canvas elements. To do so I am making use of the threejs built in texture loader as a way to go about loading just a single image for now. However I am still doing so in a way in which things should still work well when it comes to using more than one texture also.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10 ));
    scene.background = new THREE.Color(0.5, 0.5, 0.5);
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
    //-------- ----------
    // URLS, TEXTURE OBJECT
    //-------- ----------
    const URLS_BASE = '/img/smile-face/';
    const URLS = [
        'smile_sheet_128.png'
    ];
    const textureObj = {};
    // ---------- ----------
    // ORBIT CONTROLS
    // ---------- ----------
    if(THREE.OrbitControls){
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
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
    //-------- ----------
    // MANAGER
    //-------- ----------
    const manager = new THREE.LoadingManager();
    // starting
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    // done
    manager.onLoad = function ( ) {
        console.log( 'Loading complete!');
        // ---------- ---------- ----------
        // CREATE AND UPDATE MESH
        // ---------- ---------- ----------
        // create the mesh object
        let mesh = uvMapCube.create({
            pxa: 1.42,
            images: [
                textureObj['smile_sheet_128'].image
            ]
        });
        scene.add(mesh);
        uvMapCube.drawFace(mesh, 'front', {i:0, sx: 0, sy: 0, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'back', {i:0, sx: 64, sy: 0, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'top', {i:0, sx: 0, sy: 32, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'bottom', {i:0, sx: 32, sy: 32, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'left', {i:0, sx: 32, sy: 0, sw: 32, sh: 32});
        uvMapCube.drawFace(mesh, 'right', {i:0, sx: 96, sy: 0, sw: 32, sh: 32});
        // ---------- ---------- ----------
        // START THE LOOP
        // ---------- ---------- ----------
        loop()
    };
    // progress
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    // ERROR
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };
    //-------- ----------
    // TEXTURE LOADER
    //-------- ----------
    const loader = new THREE.TextureLoader(manager);
    URLS.forEach((url) => {
        // set base utl path
        loader.setPath(URLS_BASE);
        // load files from base
        loader.load(url, (texture) => {
            // get file name from url
            const file_name = url.split('/').pop().split('.')[0];
            // keying the textureObj by using file name as the key
            textureObj[file_name] = texture;
        });
    });
}());
```

### 1.4 - texture module load example

Here I am once again using external image assets but now I am using my texture module however now I am using a texture module that [I would out for my post on the threejs texture loader](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-texture-loader). What I would out in that project might be something that I should build into this module in future revisions, or yet again maybe not as it is something that I might want to just develop and maintain  when it comes to working with textures in general actually. In any case by pulling the code that has to do with loading textures they way that i would like to lad them into a separate file that helps to reduce the complexly of the demo here which is nice.

```js
(function () {
    // ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ----------
    const scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10 ));
    scene.background = new THREE.Color(0.5, 0.5, 0.5);
    const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    ( document.getElementById('demo') || document.body ).appendChild( renderer.domElement );
    // ---------- ----------
    // LIGHT
    // ---------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 2, 3);
    scene.add(dl);
    // ---------- ----------
    // ORBIT CONTROLS
    // ---------- ----------
    if(THREE.OrbitControls){
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
    }
    // ---------- ----------
    // APP LOOP
    // ---------- ----------
    const state = {
        mesh: null
    };
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
        const alpha = frame / frameMax;
        const bias = 1 - Math.abs(0.5 - alpha) / 0.5;
        // animate face
        const cx = Math.floor(3.99 * bias);
        drawCell(state.mesh, 'front', 1, cx, 0);
        const d = -45 + 90 * bias;;
        state.mesh.rotation.y = Math.PI / 180 * d;
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
    // draw cell helper
    const drawCell = (mesh, drawto, i, x, y, size) => {
        i = i === undefined ? 0: i;
        x = x === undefined ? 0: x;
        y = y === undefined ? 0: y;
        size = size === undefined ? 32: size;
        uvMapCube.drawFace(mesh, drawto, {i:i, sx: x * size, sy: y * size, sw: size, sh: size});
    };
    // ---------- ---------- ----------
    // USING LIST LOADER r0
    // ---------- ---------- ----------
    textureMod.load({
        URLS_BASE: '/img/smile-face/',
        URLS: ['smile_sheet_128.png', 'smile_creepy_128.png']
    })
    // then if all goes well
    .then( (textureObj) => {
        // ---------- ---------- ----------
        // CREATE AND UPDATE MESH
        // ---------- ---------- ----------
        // create the mesh object
        const mesh = state.mesh = uvMapCube.create({
            pxa: 1.42,
            images: [
                textureObj['smile_sheet_128'].image,
                textureObj['smile_creepy_128'].image
            ]
        });
        mesh.material.emissiveIntensity = 0.15;
        scene.add(mesh);
        drawCell(mesh, 'front', 1, 3, 0);
        drawCell(mesh, 'back', 0, 2, 0);
        drawCell(mesh, 'top', 0, 0, 1);
        drawCell(mesh, 'bottom', 0, 1, 1);
        drawCell(mesh, 'left', 0, 1, 0);
        drawCell(mesh, 'right', 0, 3, 0);
        // ---------- ---------- ----------
        // CREATE MESH
        // ---------- ---------- ----------
        const mesh2 = new THREE.Mesh(mesh.geometry, mesh.material);
        mesh2.position.set(-2, 0, -2);
        scene.add(mesh2);
        // ---------- ---------- ----------
        // START THE LOOP
        // ---------- ---------- ----------
        loop()
    })
    // error
    .catch((url)=>{
        console.log('Error when trying to load: ' + url);
    });
}());
```

## Conclusion

This module seems to work okay so far as of r0 all ready have the basic idea of what I wanted working. When and if I get around to it I will still like to make a few changes of course when it comes to any possible future revisions of this project. For one this I would like to have at least a few more options when it comes to how I go about dividing up a sprite sheet that I use to skin the cube. Although I am going in the direction of just setting the uvs once I might still want to add some methods that give me greater control over updating the uvs over time and maybe not so much the texture that I am using.

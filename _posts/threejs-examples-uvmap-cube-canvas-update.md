---
title: UV map of a cube set up once and then draw to a canvas texture threejs example.
date: 2022-11-04 08:13:00
tags: [three.js]
layout: post
categories: three.js
id: 1012
updated: 2022-11-04 11:43:50
version: 1.6
---

I would like to start at least one if not more [threejs project examples](/2021/02/19/threejs-examples/) that have to do with setting up the uv map of a cube created with the THREE.BoxGeometry constructor in threejs. By default the geometry will have a uv map, it is just that it will use all of the given texture for each face of the cube. 

There are ways of setting differing textures to each face without doing anything with the uv attribute such as having more than one material and setting the material index values of each face by way of the groups object. However when it comes to cubes and geometry in general sooner of later I am going to want to learn more about how to mutate the uv attribute values with a little javaScript code.

There are two general ways of doing what I would like to do with cubes here. One way would be to mutate the uv attributes over time so that the locations in a single texture change. The other way would be to set up the uv attribute once so that the cube will always used fixed locations of the canvas, then use a canvas element as the texture, and update that texture as needed. In this post what I currently have is centered around the later rather than the former, but that might change with future revisions of this when and if I get to it.

<!-- more -->

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

When I create an instance of getUvData I will then want to use this to set the state of the uv attribute. For this I have my setUVData helper where I pass the uv that I will like to mutate, along with the uvData area created with my getUVData helper, and then and order array that will default to \[0,1,2,3\] which so far seems to work okay, but I might need to adjust when it comes to setting the rotation of the uv points. However with this project there is also doing a rotation when it comes to drawing to the canvas texture that I am using as well which is what I prefer for this revision of the module at least.

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

### 1.1 - Basic example

```js
```

### 1.2 - Face example

```js
```

### 1.3 - texture loader example

```js
```

### 1.4 - texture module load example

```js
```

## Conclusion

This module seems to work okay so far as of r0 all ready have the basic idea of what I wanted working. When and if I get around to it I will still like to make a few changes of course when it comes to any possible future revisions of this project. For one this I would like to have at least a few more options when it comes to how I go about dividing up a sprite sheet that I use to skin the cube. Although I am going in the direction of just setting the uvs once I might still want to add some methods that give me greater control over updating the uvs over time and maybe not so much the texture that I am using.

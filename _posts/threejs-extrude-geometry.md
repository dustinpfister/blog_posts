---
title: Extrude Geometry in threejs
date: 2023-06-13 09:32:00
tags: [three.js]
layout: post
categories: three.js
id: 1051
updated: 2023-06-14 13:07:01
version: 1.7
---

The [THREE.ExtrudeGeometry](https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry) class in threejs is one of the built in geometry classes that can be used to create a buffer geometry from a [THREE.Shape](https://threejs.org/docs/#api/en/extras/core/Shape) object. The other built in option to create a geometry form a shape is the [THREE.ShapeGeometry](https://threejs.org/docs/#api/en/geometries/ShapeGeometry) class that is just a simple plain of the 2d shape.

Getting started with this feature of threejs is easy enough when it comes to just creating a simple shape object and passing that as the first argument and just going with that. However there is a whole lot more beyond just that of course and just like everything else in threejs this can quickly turn into a major time and energy sucking black hole if one allows it to turn into that. This might prove to be the case with far more advanced topics that branch off from Extrude geometry when it comes to the topic of the custom UV generator option of the geometry constructor for example.

<!-- more -->

## THREE.Extrudegeometry and what to know first

This is a blog post in which I am writing about THREE.Extrudegeometry and various other closely related feature of the javaScript library called threejs. I assume that you have at least a little background with [getting started with a threejs project](/2018/04/04/threejs-getting-started/) at least, if not you are going to have a hard time with applying what I am writing about here. I will not be getting into every little detail that you should know before hand here in this post. However I will write about a few things that you should learn or refresh on a little before reading the rest of this post.

### Read more on THREE.Shape, and THREE.Path

In order to create an istance of THREE.ExtrudeGeometry you will first need a [THREE.Shape instance](/2021/06/01/threejs-shape/) to pass as the first argument. I will be wriitng about THREE.Shape a little in this post as I have to, however you might still want to look into this feature of threejs a bit more. While you are at it there is also reading more on the [path class](https://threejs.org/docs/#api/en/extras/core/Path) as well sense that is the base class of Shape to which Shape extends from.

### There are a few things to be aware of with the Vector2 class

The [Vector2 class](/2023/06/09/threejs-vector2/) is also something that you might want to read more about as there are a lot of methods to work with in that class that and prove to be useful in the process of creating paths, or curves, than can then be used to make shapes that can then be used to make extrude geometry.

### There is also the SVG loader

The [SVG loader](/2022/09/16/threejs-svg-loader/) is an optional add on to the core threejs module that helps with the process of loading, and then parsing SVG files into Shape Objects that can then be used to create extrude geometry. Often I might want to create extrude geometry this way actually at least when it comes to the 2d shape part that will be used to create such a geometry.

### Source code is up on Github

The code exmaples that I made for this post can also be found in [my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-extrude-geometry).

### Version Numbers matter

The version of threejs that I was using when I first wrote this blog post was [r152](https://github.com/dustinpfister/test_threejs/tree/master/views/demos/r152).

## 1 - Basic examples of Extrude Geometry

For this Basic section I am going to just write about a few basic examples of extrude geometry. This will then have to involve at least a few examples of how to create a Shape Object to begin with, as well as touch base on some of the additional options when calling THREE.ExtrudeGeometry. However I will not be writing about some of the options, mainly the option for a custom UV generator as that is without question way to complex for a basic section.

### 1.1 - Create the Shape from a vector2 array

One way or another, in order to create an Extrude Geometry I first need to have a Shape object to pass as the first argument. One way to create a shape object is to call THREE.Shape, and pass an array of vector2 objects as the first argument when calling that to create the shape. Once I have the shape I can then just pass that to THREE.ExtrudeGeometry to ge the geometry that I can then in turn use with the usual mesh object.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// VECTOR2 POINTS / SHAPE
// ---------- ----------
const v2array = [
    new THREE.Vector2( 0.0,  -0.8),
    new THREE.Vector2( 0.5,   0.0),
    new THREE.Vector2( 0.0,   0.8),
    new THREE.Vector2(-1.5,   0.0)
];
const shape = new THREE.Shape(v2array);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh1)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(-0.3, 0, 0);
renderer.render(scene, camera);
```

For this demo I am not going to do anything fancy when it comes to creating the array of Vector2 objects. This is after all the very first demo of this basic section so I am just directly calling THREE.Vector2 for each point that will compose the shape object. There are a lot of other ways to create this kind of array actually, but when it comes to just getting started this will do for now when it comes to just getting started. Also for this demo I have not got into any of the options of extrude geometry just yet, so lets take a look at some more basic, simple, static examples.

### 1.1 - Create The Shape by way of using Paths

Taking a look at the [threejs source code for THREE.Shape](https://github.com/mrdoob/three.js/blob/r152/src/extras/core/Shape.js) it would seem that the Shape class does in fact extend the base THREE.Path class. So another way to create the shape to begin with is to just create a blank THREE.Shape object and just start using these Path class prototype methods by just calling them off of the shape object. This Path class is very similar to that of the paths of the 2D drawing context, so if you know how to use that this will be easy for you. Otherwise you start out by using the move to method to pick a start location for the path and then start using path prototype methods like lineTo and bezierCurveTo to create the path. Again once I have the shape set up just the way that I like it I can then just pass that to THREE.ExtrudeGeometry.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHAPE / PATH
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo(  0,-1 );
shape.bezierCurveTo( 0.25,-0.25,    0.25,0,    1,0 );
shape.lineTo(  1,1 );
shape.lineTo( -1,1 );
shape.bezierCurveTo(-2,0,   -2,-1,   0,-1 );
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.ExtrudeGeometry(shape);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial() );
scene.add(mesh1)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 3);
camera.lookAt(-0.3, 0, 0);
renderer.render(scene, camera);
```

## 2 - Working out a Custom UV Generator for use with THREE.ExtrudeGeometry

I think that the most note worthy advanced feature of THREE.ExtrudeGeometry would be the UVGenerator option. To use this I need to give an object with two functions that both return an array of vector2 objects that will in turn be used to create the UV attribute for the buffer geometry that is created by THREE.ExtrudeGeometry. If you have no idea at all what a [UV attribute is I have my main blog post on the subject](/2021/06/09/threejs-buffer-geometry-attributes-uv/) in which I get into detail with this, but to save you a click the skinny is that it is a way to map a 2D image to a 3d object.

I have found that the default UV Generator just about never works the way that I would like it to. So then it would make sense to take advantage of this option and see about making at least a few custom UV generators. Doing so is a little involved, and there are some tools that I would say help to make the process of working out logic for this sort of thing easier. In my main blog post on UV Mapping I have a whole section on some code that has to do with creating a kind of minimap that helps me get a way better idea of what is going on with the current state of the UV attribute. That feature will also be showing up in these demos as well.

### 2.1 - Getting started with a custom UV Generator

This is then the demo that I have that is just a start point for this custom UV Generator feature of extrude geometry. To start out with this I will just want to have a very basic shape, and I am also going to want to just have static UV values for each triangle.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
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
    //ctx.fillStyle = 'rgba(0,255,255, 0.025)';
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
        //ctx.fill();
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
// CUSTOM UV GENERATOR
// ---------- ----------
const UVGenerator = {
    generateTopUV: function ( geometry, vertices, indexA, indexB, indexC ) {
        return [
            new THREE.Vector2( 0.05, 0.45 ),
            new THREE.Vector2( 0.05, 0.95 ),
            new THREE.Vector2( 0.95, 0.45 ),
        ];
    },
    generateSideWallUV: function ( geometry, vertices, indexA, indexB, indexC, indexD ) {
        return [
           new THREE.Vector2( 0.05, 0.05 ),
           new THREE.Vector2( 0.20, 0.05 ),
           new THREE.Vector2( 0.20, 0.20 ),
           new THREE.Vector2( 0.05, 0.05 )
        ];
    }
};
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo( 0.00, -0.80);
shape.lineTo( 0.75,  0.00);
shape.lineTo( 0.00,  1.20);
shape.lineTo(-0.75,  0.00);
const geometry = new THREE.ExtrudeGeometry(shape, {
    UVGenerator: UVGenerator,
    depth: 0.3,
    bevelEnabled: false
});
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
// RENDER
// ---------- ----------
const minimap = createMiniMap( new THREE.Vector2(430, 10), 200, geometry );
camera.position.set(2, 1, 2);
camera.lookAt(0.4,0.1,0);
setV2array(minimap, geometry);
renderer.render(scene, camera);
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
```

### 2.2 - Better logic for top parts, start of a helper function

I wanted to start working out some better logic for the top parts, for now I think it will still be okay for both sides to overlap the same area. When and if I get to it I might further improve these demos when it comes to scaling and positioning the various parts of the uvs. 

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
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
// create a custom uv generator for the given shape
const createUVGenerator = (shape) => {
    // x max and min values
    const shapeGeo = new THREE.ShapeGeometry(shape);
    shapeGeo.computeBoundingBox();
    const v3_max = shapeGeo.boundingBox.max;
    const v3_min = shapeGeo.boundingBox.min;
    // box2 class to get range vector2
    const box2_top = new THREE.Box2( new THREE.Vector2(v3_min.x, v3_min.y), new THREE.Vector2(v3_max.x, v3_max.y) );
    const v_range = new THREE.Vector2();
    box2_top.getSize( v_range );
    // get axis helper
    const getAxisAlpha = (n, axis = 'x') => {
        const b = axis === 'x' ? v3_min.x : v3_min.y;
        const c = axis === 'x' ? v_range.x : v_range.y;
        return new THREE.Vector2(n, 0).distanceTo( new THREE.Vector2(b, 0) ) / c;
    };
    // the generator object
    const UVGenerator = {
        generateTopUV: function ( geometry, vertices, vert_indexA, vert_indexB, vert_indexC ) {
            const xa = getAxisAlpha( vertices[ vert_indexA * 3] , 'x');
            const ya = getAxisAlpha( vertices[ vert_indexA * 3 + 1] , 'y');
            const xb = getAxisAlpha( vertices[ vert_indexB * 3] , 'x');
            const yb = getAxisAlpha( vertices[ vert_indexB * 3 + 1] , 'y');
            const xc = getAxisAlpha( vertices[ vert_indexC * 3] , 'x');
            const yc = getAxisAlpha( vertices[ vert_indexC * 3 + 1] , 'y');
            return [
                new THREE.Vector2( xa, ya ),
                new THREE.Vector2( xb, yb ),
                new THREE.Vector2( xc, yc ),
            ];
        },
        generateSideWallUV: function ( geometry, vertices, indexA, indexB, indexC, indexD ) {
            return [
               new THREE.Vector2( 0, 0 ),
               new THREE.Vector2( 1, 0 ),
               new THREE.Vector2( 1, 1 ),
               new THREE.Vector2( 0, 0 )
            ];
        }
    };
    return UVGenerator;
};
// create the minimap object
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
    //ctx.fillStyle = 'rgba(0,255,255, 0.025)';
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
        //ctx.fill();
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
// SHAPE/GEOMETRY
// ---------- ----------
const shape = new THREE.Shape();
shape.moveTo( 0.00, -0.80);
shape.bezierCurveTo( 0.3,0,   0.2,0.3,  0.75,  -0.20);
shape.bezierCurveTo( 0.8,0.5,   0.4,0.5,   0.00,  1.20);
shape.bezierCurveTo( -1,0.5, -1,-0.5,   0.00,  -0.80);
const geometry = new THREE.ExtrudeGeometry(shape, {
    UVGenerator: createUVGenerator(shape),
    depth: 0.3,
    bevelEnabled: false
});
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
// RENDER
// ---------- ----------
const minimap = createMiniMap( new THREE.Vector2(430, 10), 200, geometry );
camera.position.set(2, 1, 2);
camera.lookAt(0.4,0.1,0);
setV2array(minimap, geometry);
renderer.render(scene, camera);
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
```

## Conclusuon

The Extrude geometry is then often the main constructor if interest that I might want to use when it comes to doing something with a Shape object that was created by one means or another. When it comes to a real project though there is a whole lot of other features of the library that I would want to use. Also things can get a little time consuming when it comes to certain advanced features of the extrude geometry class such as working out a custom UV Generator.

---
title: Working with a scene object in three.js
date: 2018-05-03 09:36:00
tags: [js,three.js]
layout: post
categories: three.js
id: 182
updated: 2023-03-21 15:36:46
version: 1.48
---

A [Scene](https://threejs.org/docs/index.html#api/scenes/Scene) object in [threejs](https://threejs.org/) is an instance of the THREE.Scene constructor that can be used to place everything that makes up an environment in a threejs project. It can contain cameras, lights, mesh objects composed of a geometry and material, along with any other [object3d base class](/2018/04/23/threejs-object3d/) object. The scene object can then be passed to the render function of a renderer such as the [Webgl renderer](/2018/11/24/threejs-webglrenderer/) along with a [camera](/2018/04/06/threejs-camera/) to render a view of the scene from the perspective of the given camera object.

There is a great deal of other things to cover when it comes to a scene object though, such as the background and fog properties, and the fact that it inherits from the Object3d base class. Because the scene object is yet another object3d based object this allows for things like having a whole scene positioned, rotated, and scaled just like mesh objects, cameras and anything based off of Object3d. So in this post I will be going over at least a few details that revolve around the topic of scene objects.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/T0tM14OummQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The scene object What to know first

This is an post on [threejs](https://threejs.org/) and even then this is just a general post that covers just one little constructor function known as [THREE.Scene](https://threejs.org/docs/index.html#api/scenes/Scene). If you are new to threejs you might want to start with [my getting started post on three.js](/2018/04/04/threejs-getting-started/) to learn a thing or two about the very basics that should be known before hand. If you are new to javaScript in general I have wrote a few [getting started type posts with javaScript](/2018/11/27/js-getting-started/) that might be worth checking out as there is always more to learn when it comes to javaScript alone. 

I then assume that you have at least some basic working knowledge of the basics of threejs and JavaScript, so I will not be getting into that here. However in this section I will quickly cover a few things that you might want to read up more on when it comes to getting a more solid understanding of threejs over all, and some other related topics that you show know in order to do something with a scene object.

### In order to view a scene you will want to known how to set up a renderer

The scene object is a main object that will contain all of the objects that compose the over all scene that we are going to be looking at. However in order to view the state of one of these scene objects it is called for to use some kind of renderer as a way to view the current state of the scene object with a camera. 

The typical render that I often go with these days as of r146 is the [Web Gl renderer](/2018/11/24/threejs-webglrenderer/), as browser support for web gl is now pretty good compared to the way things where a few years ago. In older versions of threejs including the ones I was using when I first wrote this post there was also the 2d canvas renderer. However it looks like that is no longer supported even as an option add on.

It is still possible to use [some alternative renderer's](https://github.com/mrdoob/three.js/tree/r146/examples/js/renderers) which can be found in the examples folder of the threejs Github repository.

### In order to use a renderer with a scene you will also need a camera

In order to use the render function of a renderer I will need to pass the scene object to it, but I will also need to pass a camera to use also. There is a lot to cover when it comes to what the options are with cameras, but I typically like to just go with the [perspective camera](/2018/04/07/threejs-camera-perspective/). 

The camera object can or can not be added to the scene object, but often I will add it to the scene anyway. If I add some kind of child object to the camera that I want to effect the scene such as a light source then I will have to add the camera to the scene or else those children will not be in the scene naturally.

### Mesh objects, Geometry, Materials, and the Object3d base class

In order to have something to look at in a scene I am going to want to create and add at least one or more [mesh objects](/2018/05/04/threejs-mesh/). In order to create a mesh object I will want to have a geometry, and one or more [materials](/2018/04/30/threejs-materials/) by which to style that geometry. 

There is also a lot to cover when it comes to the base class of a Mesh object which is also a base class of a scene object called Object3d. For example when I call the add method of a scene object and add an object as a child of the scene object that is a method of the object3d class and not the scene class. The same add method can be used with mesh objects, cameras, groups, and anything else that is based off of object3d.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can be found on Github in [my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-scene). This is also where I park the source code examples for my [many other blog posts](/categories/three-js/) on threejs as well.

### Version Numbers matter with threejs

When I first wrote this post I was using three.js r91, and the last time I edited this post and did some testing and editing of the source code examples I was using r146. I have made an effort of making sure I mention what version of threejs I am using when making these posts as threejs is a pretty fast moving project, and code breaking changes happen often.

## 1 - Basic example of THREE.Scene

First off I will want to create the scene by just calling the THREE.Scene constructor with the new keyword, and assigning the result of that to a variable. This result will be my scene object but there at least a little more to do if I want to actual see something. At a minimum beyond just having a scene object I will want to have at least some kind of mesh object to look at added to a Scene.  For now this mesh object could just be a mesh that used a geometry from one of the built in geometry constructors in three.js such as [THREE.BoxGeometry](https://threejs.org/docs/index.html#api/geometries/BoxGeometry), and then I can use something like the Normal material which does not require a light source.

Unless I aim to do something headless with a scene and one or more mesh objects, I will also want a camera and a renderer to look at what it is that I am doing with this scene object. There are a number of options when it comes to a camera, but I typically like to go with the [perspective camera](/2018/04/07/threejs-camera-perspective/). In some cases I might want to add the camera to the scene, but in any case I will want to have this ready to be used with a renderer where I will pass a scene object, and a camera which will then be used to render to a canvas element.

So a basic example of THREE.Scene might look something like this:

```js
//-------- ----------
// SCENE OBJECT
//-------- ----------
const scene = new THREE.Scene();
//-------- ----------
// CAMERA, and RENDERER TO USE WITH THE SCENE OBJECT
//-------- ----------
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
camera.position.set(2, 1, 2); // position the camera away from the mesh
camera.lookAt(0, 0, 0); // look at 0,0,0
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD A MESH OBJECT TO THE SCENE OBJECT
//-------- ----------
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// RENDER THE SCENE OBJECT 
//-------- ----------
renderer.render(scene, camera);
```

If I did not give a normal material when creating the mesh then by default a Mesh will use the Basic material with a random color used to paint the faces of the geometry. Of course I could create an instance of some other material, or give a color or texture to another instance of basic material that I would then give as the second argument to the Mesh constructor. However getting into materials in depth might be a bot off topic, I have wrote a a post on materials in general anyway so I do not care to repeat that all here. I will however be getting into the properties of THREE.Scene including the material override property, more on that later.

## 2 - Adding Fog to a scene

A property of interest in a scene instance is the [scene fog Property](/2018/04/16/threejs-fog/) which can be used to add a fog effect to that will effect mesh objects that use materials that are effected by a fog. When adding a fog I typically keep the background color, and the color of the fog the same, and stick to using materials that will work with a fog like that of the standard material.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const fogColor = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD FOG A SCENE
//-------- ----------
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
// add a Mesh to look at with the Standard Material
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshStandardMaterial( { emissive: 0xff0000 } ));
scene.add(mesh);
// render the scene with the camera
camera.position.set(2, 1, 2); // position the camera away from the mesh
camera.lookAt(0, 0, 0); // look at 0,0,0
renderer.render(scene, camera);
```

There are two kinds of fog that can be added to a scene in three.js which are [Fog](https://threejs.org/docs/index.html#api/scenes/Fog), and [FogExp2](https://threejs.org/docs/index.html#api/scenes/FogExp2). The regular Fog constructor will add a fog that works in a linear way, while the FogExp2 constructor works in an exponential way.

## 3 - Changing the background of the Scene with Scene.background

It goes without saying that an important part of the scene instance is the background property. By default the value of the background is null but there are a number of kinds of values that can be set to this background property to have differing kinds of backgrounds for a scene object. The easy option is to just have a solid color background, but a texture as well as cube texture are other options if you want to get fancy with things.

### 3.1 - Basic static color background example

The easy option is to just set a simple solid color for the background of the scene. For this the best option might be to go with the THREE.Color class as a way to create and return a color object to set to the scene.background property. When doing so I can give three numbers in the range of 0 to 1 for the red, green, and blue color channels. There are a number of other options in the color class for setting a desired color, be sure to check out my [post on the THREE.Color constructor](/2021/05/03/threejs-color/) to get a better idea of what all the options are with this class.

```js
//-------- ----------
// SCENE OBJECT - SETTING SOLID BACKGROUND COLOR
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0, 0.4, 0.6);
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2); 
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.2 - Canvas texture example of background

Apart from setting a solid color for the background another option would be to use a simple 2d texture for a background. There are of source a whole lot of options for this sort of thing when it comes to loading a texture in terms of an external file, or generating one with javaScript code. For this example I am using a [canvas element as a way to create a texture](/2018/04/17/threejs-canvas-texture/) with a little java Script code rather than loading an external image assets. In any case the image width and height should be a power of two, and while I am at it I might want to also adjust the offset and repeat Vector2 instance values to [adjust the aspect ration of the image that is used with the background](https://stackoverflow.com/questions/52624261/three-js-scaling-background-image-to-fit-window-without-stretching-it).

```js
//-------- ----------
// SCENE OBJECT - CREATING A TEXTURE WITH CANVAS
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE CANVAS, GET CONTEXT, SET SIZE
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 512;  // width and height need to be powers of two
canvas.height = 256;
//-------- ----------
// DRAW TO CANVAS USING 2D DRAWING CONTEXT
//-------- ----------
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.lineWidth = 3;
ctx.arc(256, 128, 100, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
//-------- ----------
// CREATE TEXTURE FROM CANVAS, AND SET TO scene.background
//-------- ----------
const texture = new THREE.CanvasTexture(canvas);
//texture.offset = new THREE.Vector2(0, 0); // can adjust offset
scene.background = texture;
//-------- ----------
// ADJUSTING TEXTURE OFFSET AND REPEAT
//-------- ----------
// scaling background image to fit, without stretching it
// https://stackoverflow.com/questions/52624261/three-js-scaling-background-image-to-fit-window-without-stretching-it
const targetAspect = 640 / 480;
const imageAspect = 512 / 256;
const factor = imageAspect / targetAspect;
// When factor larger than 1, that means texture 'wilder' than target。 
// we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
scene.background.repeat.y = factor > 1 ? 1 : factor;
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshNormalMaterial());
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2); 
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.3 - Cube texture background example

I have written a [post on how to used a cube texture](/2018/04/22/threejs-cube-texture/) in which I get into how to go about doing just that in detail. However I will cover a JavaScript solution for doing this sort of thing here to save you the trip. The easy part is just simply creating a cube texture, to do so I just need six images, or in this case use the same image for all six sides. In any case after the easy part is done the hard part is getting the textures to look right rather than having a look where it is obvious that we are in a box sort of speak.

This JavaScript solution for resolving this issue seems to work okay, but I have not battle tested it as of this writing. Again you might want to check out my post on cube texture as I might have more up to date example there that I have not covered here just yet. However the genera idea is to start out with one or more grids that have my raw seamless image data, and then run it threw a function that will remap the color data to make it look the way that it should.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// create a canavs texture
const createCanvasTexture = function (draw, size) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 64;
    canvas.height = size || 64;
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
// get an px index if x and y are known
const getIndex = (grid, vx, y) => {
    const px = THREE.MathUtils.euclideanModulo(vx, grid.w);
    const py = THREE.MathUtils.euclideanModulo(y, grid.w);
    const index = py * grid.w + px;
    return index;
};
// get Vector2 if index is known but not x and y
const getVector2 = (grid, i) => {
    let pi = THREE.MathUtils.euclideanModulo(i, grid.pxData.length);
    let pX = pi % grid.w;
    let pY = Math.floor(pi / grid.w);
    let v2 = new THREE.Vector2(pX, pY);
    return v2;
};
// create a remaped grid
const createRemapedGrid = (grid1, r1) => {
    r1 = r1 === undefined ? Math.floor(grid1.w / 4) : r1;
    const hw = grid1.w / 2;
    const vHalf = new THREE.Vector2(hw - 0.5, hw - 0.5);  //!!! May have to adjust this between even and odd
    const mDist = vHalf.distanceTo( new THREE.Vector2(0, 0) );
    const grid2 = {
        w: grid1.w,
        pxData: grid1.pxData.map((currentColorIndex, i) => {
            const v2 = getVector2(grid1, i);
            const dist = v2.distanceTo( vHalf );
            // dist alpha value, and angle to center
            const dAlpha = dist / mDist;
            const a = Math.atan2(v2.y - vHalf.y, v2.x - vHalf.x) + Math.PI;
            // get another color index from closer to center
            const x = v2.x + Math.round(Math.cos(a) * r1 * (1 - dAlpha));
            const y = v2.y + Math.round(Math.sin(a) * r1 * (1 - dAlpha));
            const refIndex = getIndex(grid1, x, y);
            return grid1.pxData[refIndex];
        }),
        pal: grid1.pal
    };
    return grid2;
};
// get a canvas texture from the given grid
const getTextureFromGrid = (grid, canvasSize) => {
    canvasSize = canvasSize === undefined ? 64 : canvasSize;
    return createCanvasTexture((ctx, canvas) => {
        ctx.fillStyle='white';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        let i = 0, len = grid.pxData.length;
        while(i < len){
            let pX = i % grid.w;
            let pY = Math.floor(i / grid.w);
            let c = grid.pal[ grid.pxData[i] ];
            let color = new THREE.Color(c[0], c[1], c[2]);
            ctx.fillStyle = color.getStyle();
            let pxW = canvas.width / grid.w;
            let pxH = canvas.height / grid.w;
            ctx.fillRect(pX * pxW, pY * pxH, pxW, pxH);
            i += 1;
        }
    }, canvasSize);
};
//-------- ----------
// GRID AND RE MAPED GRID
//-------- ----------
const grid1 = {
    w: 16,
    pxData: [
        0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
        0,3,1,1,1,2,2,1,1,2,2,1,1,1,3,0,
        0,3,1,4,4,4,4,4,4,4,4,4,4,1,3,0,
        0,3,1,4,1,1,1,1,1,1,1,1,4,1,3,0,
        0,3,2,4,1,3,3,3,3,3,3,1,4,2,3,0,
        0,3,2,4,1,3,1,1,1,1,3,1,4,2,3,0,
        0,3,1,4,1,3,1,2,2,1,3,1,4,1,3,0,
        0,3,1,4,1,3,1,2,2,1,3,1,4,1,3,0,
        0,3,2,4,1,3,1,1,1,1,3,1,4,2,3,0,
        0,3,2,4,1,3,3,3,3,3,3,1,4,2,3,0,
        0,3,1,4,1,1,1,1,1,1,1,1,4,1,3,0,
        0,3,1,4,4,4,4,4,4,4,4,4,4,1,3,0,
        0,3,1,1,1,2,2,1,1,2,2,1,1,1,3,0,
        1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,
        0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
    ],
    pal: [ [1,1,1], [0,0,0], [0,1,0], [0,0.6,0], [0, 0.3, 0] ]
};
const grid2 = createRemapedGrid(grid1, 4);
//-------- ----------
// BACKGROUND
//-------- ----------
const texture =  getTextureFromGrid(grid2, 256);
// same texture for all sides
cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture.image));
cubeTexture.needsUpdate = true;
scene.background = cubeTexture;
//-------- ----------
// SPHERE
//-------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 30, 30), 
    new THREE.MeshBasicMaterial({
       envMap: texture
    }) 
);
scene.add(sphere);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(14, 6, 14);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const vs = new THREE.Vector3(0, 0, 1);
let vector_unit_length = 20;
const update = function(frame, frameMax){
    const a = frame / frameMax;
    const b = THREE.MathUtils.pingpong(a * 2, 0.5) * 2;
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a;
    e.x = Math.PI / 180 * (45 * b);
    camera.position.copy( vs.clone().normalize().applyEuler(e).multiplyScalar(vector_unit_length) );
    camera.lookAt(0, 0, 0);
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

### 3.4 - Transparent background example

You might be here because you are looking for a way to have a [transparent background for a scene object](https://stackoverflow.com/questions/20495302/transparent-background-with-three-js). There are a few options of the webgl renderer to be aware of when it comes to this, however I have found that in late versions of threejs such as r146 that I am using here I will want to call the set clear color method. When doing so I will want to make sure that the background is null, this is the default value, but for this example at least I will make it explicit. When calling the set clear method for first argument can be a color that I want the clear color to be, however I can pass null which will result in black being set for this value. In any case the color does not really matter if I want to set a fully transparent background, for that I just want to make sure that I pass 0 for the alpha value as the second argument for the set clear color method.

```js
// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// TRANSPARENT BACKGROUND - 
//    * The default for scene.background is null, but just make sure that is in fact the case.
//    * use the setClearColor method passing a null for color, and 0 for the alpha value
// ---------- ---------- ----------
scene.background = null;
renderer.setClearColor(null, 0);
// ---------- ---------- ----------
// ADD A MESH
// ---------- ---------- ----------
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 4 - Using Scene.overrideMaterial to add a material that overrides all materials

There is the scene override property of a scene that will do exactly as you would expect, override all materials used in the scene with the material given to the material override property of the scene instance.

```js
//-------- ----------
// create a Scene
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OVERRIDE MATERIAL
//-------- ---------- 
// can set an override material for everything
scene.overrideMaterial = new THREE.MeshDepthMaterial();
//-------- ----------
// OBJECTS
//-------- ---------- 
// just adding a 1x1x1 cube with the default
// MeshBasicMaterial and random color for faces
// when added to the scene like this
scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
// adding another 1x1x1 cube but this time I am giving
// and instance of MeshBasicMaterial in which I am setting
// the face color of the faces to red
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00
    }));
cube2.position.set(-2, 0, 0);
scene.add(cube2);
// a sphere using the lamber material in wire frame mode
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 20, 20),
    new THREE.MeshLambertMaterial({
        emissive: 0x00004a
}));
sphere.position.set(0, 0, -2);
scene.add(sphere);
//-------- ----------
// RENDER
//-------- ---------- 
// render the scene with the camera
camera.position.set(2.5, 2.5, 2.5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

In the above demo I created a simple scene with a few instances of Mesh that each use a different material and or settings for the material. By setting an instance of THREE.MeshDepthMaterial as the value of Scene.overrideMaterial, all the other materials are ignored and the depth material is just used for everything.

This can be useful if you want to have a feature that allows for doing something like setting everything in the scene to wire frame mode.


## 5 - Using Object3D methods with a Scene Object

Be sure to read my full [post on the Object3D](/2018/04/23/threejs-object3d/) class in order to help gain more insight into what the Object3d class is all about, and why it is a big deal. However simply put, like a lot of things in threejs the Scene Class inherits from the Object3D class. This Object3d class gives THREE.Scene properties and methods like Object3D.position, Object3D.rotation and Object3D.add which can be used to add additional objects to the scene.

### 5.1 - Rotation of a scene object

Just like with any other object3d based object there is the [rotation property](/2022/04/08/threejs-object3d-rotation/) of the scene object. This rotation property has an instance of the [Euler class](/2021/04/28/threejs-euler/) as its values which is similar to that of the Vector3 class only the values for each axis are radian value rather than that of any number value along the various axis.

```js
//-------- ----------
// CREATE A SCENE
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 1, 2);
camera.lookAt(0, 0, 0);
let frame = 0,
maxFrame = 50;
const loop = function () {
    const per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    // using Object3D properties to change
    // the rotation of a scene
    scene.rotation.set(Math.PI * 2 * per, 0, 0);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
```

### 5.2 - Scaling a whole scene object

Another feature of the base [object3d class is the scale property](/2021/05/11/threejs-object3d-scale/). This is a property that contains a vector3 class object as its value with a default values of 1,1,1. Setting any of the values higher or lower will scale the whole scene object up and down on a given axis.

<iframe class="youtube_video" src="https://www.youtube.com/embed/Yr3rHJlJVbY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


```js
//-------- ----------
// CREATE A SCENE
//-------- ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
// mesh objects
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({
    color: 0xff0000
}));
mesh1.position.set(0, 1, 0)
scene.add(mesh1);
const mesh2 = new THREE.Mesh( new THREE.SphereGeometry(2, 20, 20), new THREE.MeshPhongMaterial({
    color: 0x00ff00
}));
mesh2.position.set(-4, 2.0, 4);
scene.add(mesh2);
const mesh3 = new THREE.Mesh( new THREE.ConeGeometry(2, 5, 20, 20), new THREE.MeshPhongMaterial({
    color: 0x0000ff
}));
mesh3.position.set(-4, 2.5, -4);
scene.add(mesh3);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - (a1 * 8 % 1) ) / 0.5;
    const sx = 1 - 0.5 * a2;
    const sy = 0.25 + 0.75 * a1;
    const sz = 1;
    scene.scale.set(sx,sy,sz);
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

### 5.3 - Position of a scene object relative to world space

There is a lot that could be written about this, and how it applies the a scene object, but one interesting thing is that if I play with the instance of [Vector3](/2018/04/15/threejs-vector3/) that is stored in the position property of my scene instance this will change the position of the whole Scene, and everything in it that is added relative to the scene.

## Conclusion

That is all that I have to say about these scene of a threejs project example for now. There is a great deal more to write about when it comes to a scene in threejs, but much of that might branch off into just about everything with the library actually. A scene is a major part of any threejs project, along with other vital components such as a camera, and a renderer all of which just about every threejs example I have made includes each of those.

The best way to learn more about the THREE.Scene constructor and everything else that is used with it would be to just start making some actual projects of some kind with threejs and just start learning as one goes. With that said I have some simple project examples to start off with in my [post on threejs examples](/2021/02/19/threejs-examples/) that might be worth checking out when it comes to getting some ideas for actual projects of some kind.
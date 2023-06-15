---
title: Box Geometry in Threejs
date: 2021-04-26 13:33:00
tags: [three.js]
layout: post
categories: three.js
id: 853
updated: 2023-06-15 11:09:17
version: 1.58
---

In [threejs](https://threejs.org/) the [Box Geometry Constructor](https://threejs.org/docs/#api/en/geometries/BoxGeometry) is one of many options for quickly creating a geometry for a project. To create a geometry this way I just need to call the THREE.BoxGeometry constructor function with the new keyword, and pass some arguments for the dimensions of the box area that I want. While I am at it I can also pass some additional arguments that have to do with how many additional sections the box should have to make it more dense. The returned result can then be stored to a variable, or directly passed as the geometry for a mesh object, or anything else that calls for a geometry.

Starting out with this built in geometry constructor function is simple enough, but then there is getting into how to go about skinning a cube with textures, and how to go about having one texture on just one side, and other on an other side. So then there is looking into how to go about using the [group property of buffer geometry](/2018/05/14/threejs-mesh-material-index/), and or the [UV attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) when it comes to this. With that said looking into the box geometry in depth is a good way to lean more about more advanced topics with geometry in general when it comes to the various features of a buffer geometry instance.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/B52qkEjf8K8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Box Geometry in thee.js and what to know first

This is a post on the Box Geometry Constructor in threejs, and many little related topics that branch off from that specific constructor function in the javaScript library. This is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), but many of the examples here will not be so far beyond that point. Still I assume that you know how to set up a basic client side javaScript project as I will not be getting into the very basics of setting things up here. 

If however you have got your hello world example up and running but would like to learn more about just playing around with a cube, or box of some kind with threejs and a little javaScript code you might gain something of value from reading this post. In any case in this section I will be going over a few things that you might want to read up more before really getting into using the box geometry constructor, as well as the object3d class based objects that are often used with such a geometry.

### Source code examples are also up on Github

The source code examples that I am writing about here can also be found on Github in my [test threejs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box-geometry). This is also where I park the source code examples for all the [other blog posts that I have wrote on threejs](/categories/three-js/) as well.

### Version Numbers matter with threejs

When I first wrote this post I was using threejs r127, and many code breaking changes where made in recent revisions such as the removal of the THREE.Geometry class. The last time I came around to do some editing I have made new examples and have updated everything here to the [style rules that I have set for r146](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Still always take note of what version of threejs you are using when working with code on the open internet, it might be out of date, or the other way around if you are sticking with an older revision.

## 1 - Some Basic examples of Box Geometry

In this section I will then be starting out with just a few very basic examples of THREE.BoxGeometry.

### 1.1 - Basic Box Geometry example using Normal Material

To create a basic box threejs example using the Box Geometry Constructor the First thing I am going to want to do is create a Mesh. This Mesh will accept a geometry as the first argument such as one that is created using the Box Geometry Constructor. However I am also going to want to pass a material as the second argument for the Mesh also. For this example I have choses to go with the Normal Material as this is a nice quick choice for skinning a Mesh because the default Basic material will just show the whole area as one solid color.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH USING THREE.BoxGeometry and THREE.MeshNormalMaterial
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial() );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Using THREE.Points, and additional arguments for section counts

I will always want to give at leash a height, width, and depth for the box geometry. However in some cases I might also want to make use of the additional arguments that define the number of segments for each of these as well. Be default there will be just one segment each for height, width, and depth, so the next three arguments can be used to set a few or all of these to something other than one.

There are some situations in which I might want to do this when working with mesh objects. However what comes to mind is some fairly complex stuff that has to do with morph attributes. So for the sake of keeping things basic, in this basic section of box geometry, I will just be using THREE.Points as a way to show what the deal is with these additional arguments.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(5, 5) );
const material = new THREE.PointsMaterial( { size: 0.05, color: 0x00ff00 } );
// 1
const points1 = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1, 1, 1, 1),
    material );
points1.position.set(-2, 0, 0);
scene.add(points1);
// 2
const points2 = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1, 6, 6, 6),
    material );
points2.position.set(0, 0, 0);
scene.add(points2);
// 3
const points3 = new THREE.Points(
    new THREE.BoxGeometry(1, 1, 1, 16, 4, 16),
    material );
points3.position.set(2, 0, 0);
scene.add(points3);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Position and rotation

Once that basic hello world cube example is up and running, the first thing I remember wanting to do next was to learn how to rotate and move the box. When it comes to doing this there is rotating and translating the box geometry, and then there is rotating and translating the mesh object that contains the geometry. There is also just leaving the box at a fixed location and moving rotating the camera while having it continue to look at the box. It will also involve setting up a basic animation loop using request animation frame, or some other means to go about calling a method over and over again changing the state of values and drawing the scene each time the method is called.

With that said reading up more on the Mesh Class and really [Object3d class](/2018/04/23/threejs-object3d/) would be best when it comes to the core of positing and rotating things by way of the Mesh object. When it comes to rotating an positioning a box by changing the state of the geometry there is looking into the buffer geometry constructor in general to learn more about how to do such things that way.

### 2.1 - Rotation and position of the box geometry

First off in this example I will be looking at how to go about rotating and positioning a cube by mutating the state of the geometry rather than the mesh object, or any kind of parent object to that of the mesh object. When it comes to doing positing and rotating this way I will typically want to only do this one just for the sake of changing the position and orientation relative to the containing mesh object. When it comes to changing these values over and over again in a loop it would be better to mutate the object3d values of the containing mesh object which I will be geting to in later in this section.

The thing to keep in mind here is that when working with the box geometry I am working with an instance of buffer geometry and when it comes to that class there are methods like [rotateX, rotateY, and rotateZ than can be used as a way to adjust the geometry rotation](/2021/05/20/threejs-buffer-geometry-rotation/). When it comes to adjusting the position of the geometry there is the translate method of the buffer geometry class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 1, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH box1
//-------- ----------
const box1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
);
// ROTATING THE GEOMERTY
box1.geometry.rotateX(Math.PI / 180 * 45);
box1.geometry.rotateY(Math.PI / 180 * 22);
 // TRANSLATING THE GEOMMETRY
box1.geometry.translate(0, 1, 0);
// BOX HELPER
box1.add( new THREE.BoxHelper(box1, new THREE.Color('red')) );
scene.add(box1);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 2.2 - Rotation and position of the mesh object that contains the box geometry by way of object3d class features

The two properties of interest here are the rotation property and position properties of the mesh when creating a box with the Box Geometry constructor and a material. The rotation property is an instance of [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler), and the position property is an instance of [THREE.Vector3](/2018/04/15/threejs-vector3/). With that said it would be best to look into each of these classes in detail to know everything there is to work with them. However the main methods of interest with both of these classes are the set and copy methods.

In this example I am using the copy method to copy the instances of Euler and Vector 3 in my state object as the values for the corresponding properties for position and rotation. However there is also the set method that can be used to set the values of these class instances of a mesh. Both set methods will take three values, only with a Vector3 instance I will want to given position values for x, y, and z, and with a Euler instance I will want to give radian values for the angles of the rotation.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box.add(new THREE.BoxHelper(box, new THREE.Color('red'))); // box helper
scene.add(box);
const box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('lime')
        }));
box2.geometry.rotateY(Math.PI * 0.25); // Rotating geometry
box2.add(new THREE.BoxHelper(box2, new THREE.Color('red'))); // box helper
box2.position.set(-2, 0, 0);
scene.add(box2);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0,
    radian: 0,
    r: new THREE.Euler(0, 0, 0),
    p: new THREE.Vector3(0, 0, 0)
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    state.radian = Math.PI * 2 * state.bias;
    state.p.z = -2 * Math.cos(Math.PI * 2 * state.bias);
    state.p.x = 1 + -1 * Math.sin(Math.PI * 8 * state.bias);
    // changing values
    state.r.x += 1 * secs;
    state.r.y += 2 * secs;
    state.r.z += 3 * secs;
    // copy the state of the THREE.Euler instance in the state object
    // as the new rotation value of the box
    box.rotation.copy(state.r);
    // using the copy method for Vector3 also
    box.position.copy(state.p);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
```

In this example I am also setting up an animation loop, there is a whole lot of different ways to go about setting up this sort of thing. I would not worry to much about the fine details about animation loop functions, but I still think it is a good idea to use request animation frame, or something that is an abstraction if it, and to do something to limit the frame rate a little so that I am not slamming the client system to much. It might be best to have a user interface where the user can adjust the frame rate capping, but when it comes to setting a fixed value the lower the better until the video gets to choppy.

## 3 - Using an Array of Materials

An Array of materials can be passed to the Mesh constructor rather than just a single material. When doing so by default I would want to pass an array of six materials, one for each face. However it is possible to pass less than six materials when doing this, it is just that when doing so I might want to change what the material index values are for the Box geometry. In this section I will be going over a few quick basic cube examples using the Box Geometry constructor and an array of materials. 

For more on this kind of subject you might want to check out my post on [material index values when working with geometries and a array of materials with a mesh](/2018/05/14/threejs-mesh-material-index/). I do not care to get into this subject in depth here, but I think I should go over at least a few quick basic examples making use of just the box geometry.

### 3.1 - Using an array of six materials

A property of interest when working with a buffer geometry as of late versions of three.js is the groups array of the geometry. This is, or at least should be an array of objects where each objects is a material index for a side, or face if you prefer of the geometry. When making a custom geometry this groups array will have to be created manually by making use of the add group method, however with the built in Box Geometry constructor this array should all ready be there.

Out of the box there should be six objects in the groups array, and the material index values for each should go from  and including 0 to 5. So if I am doing going to change any of those values I will want to give an array of six materials, one for each side.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
const materials = [
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'orange'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'purple'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    }),
    new THREE.MeshBasicMaterial({
        color: 'cyan'
    })
];
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materials);
scene.add(box)
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = {
    x: 0,
    y: 0,
    z: 0
};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.x += 1 * secs;
    state.y += 2 * secs;
    state.z += 3 * secs;
    box.rotation.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    lt = now;
};
loop();
```

### 3.2 - Using an array of materials more or less than six

When using an array of materials that is more or less than six chances are that I am going to want to change what the material index values are for the Box Geometry. To do this I just need to loop over the groups array of the box geometry and set the material index values for each group t the desired index value in the array of the materials.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
// the array of materials that is only two materials
const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshDepthMaterial()
];
// create the box geometry
const geo = new THREE.BoxGeometry(1, 1, 1);
// The objects in the groups array is what there is to
// use to set material index values for each face
geo.groups.forEach(function (face, i) {
    face.materialIndex = face.materialIndex % materials.length;
});
// now create the box like always passing the geometry first,
// and the array of materials second
const box = new THREE.Mesh(
        geo,
        materials);
scene.add(box)
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date();
const state = { x: 0, y: 0, z: 0};
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.x += 1 * secs;
    state.y += 2 * secs;
    state.z += 3 * secs;
    box.rotation.set(state.x, state.y, state.z);
    renderer.render(scene, camera);
    lt = now;
};
loop();
```

## 4 - Canvas Generated Textures, maps, light, and light responding materials.

Now it is time to get into something fun with a simple cube in three.js using the Box Geometry Constructor for the geometry. In this section I will be creating textures using canvas elements, and then use the state of those canvas elements to create textures for the various kind of maps when it comes to skinning faces of a cube.

To create a canvas texture I am first going to have a canvas element, and something drawn to it to use as a texture. This is of course a topic that is beyond the scope of this post. I have my [getting started post on canvas elements](/2017/05/17/canvas-getting-started/) that might be a good starting point if you are new to canvas, and I have also made a number of canvas example type posts that might also be worth checking out on this topic.

### 4.1 - Basic color map example using the Basic Material

All of the examples here make use of this create canvas texture helps method. In each example I can just call this method and then pass a single draw method. In this draw method I can then create a texture using the 2d drawing context of a canvas element. After that the question is what to do with the texture when making one or more materials for a cube.

If I do not want or need to do anything fancy with lighting, transparency and so forth I can just use the Basic material. The problem with using the basic material without a texture is that iw will end up being a solid mass of color, and because the basic material does not respond to a light source there is no way of showing some depth for the cube, unless a color map is used.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
//-------- ----------
// TEXTURE
//-------- ----------
const texture_map = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
});
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        map: texture_map
    })
);
scene.add(box);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 4.3 - Using the standard material and a light source

The basic material works okay if I just want to have a color map, and I do not want to bother with light at all. However when it does come to working with light I will want to use a material that will respond to a light source. There are a few options when it comes to this kind of material, however I often like to go with the standard material.

When it comes to using the standard material over the basic material the process is more or less the same as the basic material, when it comes to what it is that I do with the texture. Once again I am going to want to set the texture as the value for the map property of the material. However now nothing will show up, unless of course I use a light source. When it comes to light sources there are once again many options, however I often light to use the point light.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const createCanvasTexture = function (draw, size) {
    const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = size || 32;
    canvas.height = size || 32;
    draw(ctx, canvas);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
};
//-------- ----------
// TEXTURE
//-------- ----------
const texture_map = createCanvasTexture(function (ctx, canvas) {
    ctx.fillStyle = 'lime';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
    ctx.stroke();
});
const texture_emissive = createCanvasTexture(function (ctx, canvas) {
    let i = 0;
    const w = 8, h = 5, len = w * h;
    const pw = canvas.width / w;
    const ph = canvas.height / h;
    while(i < len){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = x * pw;
        const py = y * ph;
        const v = Math.random();
        const color = new THREE.Color(v, v, v);
        ctx.fillStyle =  color.getStyle();
        ctx.fillRect(px, py, pw, ph);
        i += 1;
    }
});
//-------- ----------
// MESH
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshPhongMaterial({
        map: texture_map,
        emissive: new THREE.Color(1,1,1),
        emissiveMap: texture_emissive,
        emissiveIntensity: 0.25
    })
);
scene.add(box);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(6, 1, 2);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 5 - The edge geometry constructor and the line segments constructor

There is the subject of setting one or more materials that are being used with a box geometry in a mesh into wire frame mode. However there is a number of ways of getting a similar look that might prove to be a more desirable result. I mean wire frame mode of a material like the mesh basic material will work okay, but it will draw all the triangles of a mesh and not just the edges of the mesh. So another way of getting a similar result would be to use the [edges geometry](/2021/05/31/threejs-edges-geometry/) constructor to create a new geometry from the box geometry, and then pass that to the line segments constructor. This will result in a look that is like that of wire frame mode, but it will just be the edges of the box, not all the tingles which I  for one like better.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.5, 10);
camera.position.set(1.5, 1.5, 1.5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX GEO, LINE
//-------- ----------
// bog geometry and an edge geometry created from it
const boxGeo = new THREE.BoxGeometry(1, 1, 1),
edgeGeo = new THREE.EdgesGeometry(boxGeo);
// Line Segments
const line = new THREE.LineSegments(
    edgeGeo,
    new THREE.LineBasicMaterial({
        linewidth: 3,
        color: new THREE.Color('red')
    })
);
line.rotation.y = Math.PI / 180 * 12;
scene.add(line)
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

There might be a number of other ways to go about creating a wire frame look rather than just making use of the wire fame mode of mesh materials. I would say that this is not the end all solution for this sort of thing because there is one draw back when it comes to setting the line width. It would seem that I can not set the thickness of the lines to anything other that 1, so maybe there is yet another way to do something like this that might have to involve some kind of custom geometry or other advanced use case.

## Conclusion

So then the Box geometry is a great starting point when it comes to begging to explore everything that there is to work with when it comes to three.js. Much of what applies for a Box geometry will also apply for other built in geometries, custom geometries, and the buffer geometry class in general so to some extent by learning a thing or two about box geometry one learns a thing or two about geometry in general with threejs.

Sooner or later it might be called for to get into creating a custom geometry using the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry/) directly rather than using one of the built in geometries. However it is also possible to just create simple, crude, yet effective models of things using just groups of the built in geometry constructors such as the Box Geometry constructor.



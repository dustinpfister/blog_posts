---
title: Box Geometry in Threejs
date: 2021-04-26 13:33:00
tags: [three.js]
layout: post
categories: three.js
id: 853
updated: 2021-05-31 14:35:48
version: 1.39
---

After looking over my old content on [three js](https://threejs.org/) it would seem that I never took a moment to write a post On the [Box Geometry Constructor](https://threejs.org/docs/#api/en/geometries/BoxGeometry). I guess I thought that I knew what I need to know about it and thus I could move on to more advanced topics, if so maybe that was a mistake. Better late than never though so I thought I would take a moment to work out some examples centered around just using the basic Box Geometry constructor in three.js as a way to create a Geometry to be used with a Mesh in a three.js scene.

This will then be a basic post, or at least it will start out that way, for those of you that have some more experienced with three.js I might get into some more advanced topics towards then end of the post, just for the sake of not letting this post end up being to thin. There is just starting out with a simple moving cube example which is not so hard, but then there is getting into how to go about skinning a cube with textures, and not just simple solid color maps with the basic material in that regard.

<!-- more -->

## 1 - Box Geometry in thee.js and what to know first

This is a post on the Box Geometry Constructor in three.js, and many little related topics that branch off from that specific constructor function in the javaScript library known as threejs. This is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), but many of the examples here will be not so far beyond that point. Still I assume that you know how to set up a basic client side javaScript project as I will not be getting into the very basics of setting things up. If however you have got your hello world example up and running but would like to learn more about just playing around with a cube, or box of some kind with threejs and a little javaScript code you might gain something of value from reading this post. In any case in this section I will be going over a few things that you might want to read up more before really getting into using the box geometry constructor, as well as the Mesh objects that are often used with such a geometry.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using three.js r127, and many code breaking changes where made recently. Always take note of what version of three.js you are using.

## 2 - Basic Box Geometry example using Normal Material

To create a basic Box three.js example using the Box Geometry Constructor the First thing I am going to want to do is create a Mesh. This Mesh will accept a geometry as the first argument such as one that is created using the Box Geometry Constructor. However I am also going to want to pass a material as the second argument for the Mesh also. For this example I have choses to go with the Normal Material as this is a nice quick choice for skinning a Mesh because the default Basic material will just show the whole area as one solid color.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Position and rotation

Once that basic hello world cube example is up and running, the first thing I remember wanting to do next was to learn how to rotate and move the box. When it comes to doing this there is rotating and translating the box geometry, and then there is rotating and translating the mesh object that contains the geometry. 

With that said reading up more on the Mesh Class and really [Object3d class](/2018/04/23/threejs-object3d/) would be best when it comes to the core of positing and rotating things by way of the Mesh object. When it comes to rotating an positioning a box by changing the state of the geometry there is looking into the buffer geometry constructor in general to learn more about how to do such things that way.

### 3.2 - Rotation and position of the box geometry

First off in this example I will be looking at how to go about rotating and positioning a cube by mutating the state of the geometry rather than the mesh object, or any kind of parent object to that of the mesh object.

```js
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10)); // grid helper
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box.add(new THREE.BoxHelper(box, new THREE.Color('red'))); // box helper
scene.add(box);
 
var box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box2.geometry.rotateY(Math.PI * 0.25); // ROTATING THE GEOMERTY
box2.geometry.translate(0, 1, 0); // TRANSLATING THE GEOMMETRY
box2.add(new THREE.BoxHelper(box2, new THREE.Color('red'))); // box helper
box2.position.set(2, 0, 0); // SETTING THE POSITION OF THE MESH
scene.add(box2);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

### 3.2 - Rotation and position of the mesh object that contains the box geometry

The two properties of interest here are the rotation property and position properties of the mesh when creating a box with the Box Geometry constructor and a material. The rotation property is an instance of [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler), and the position property is an instance of [THREE.Vector3](/2018/04/15/threejs-vector3/). With that said it would be best to look into each of these classes in detail to know everything there is to work with them. However the main methods of interest with both of these classes are the set and copy methods.

```js
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10)); // grid helper
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('gray')
        }));
box.add(new THREE.BoxHelper(box, new THREE.Color('red'))); // box helper
scene.add(box);
 
var box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('lime')
        }));
box2.geometry.rotateY(Math.PI * 0.25); // Rotating geometry
box2.add(new THREE.BoxHelper(box2, new THREE.Color('red'))); // box helper
 
box2.position.set(-2, 0, 0);
scene.add(box2);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 100,
    per: 0,
    bias: 0,
    radian: 0,
    r: new THREE.Euler(0, 0, 0),
    p: new THREE.Vector3(0, 0, 0)
};
var loop = function () {
    var now = new Date(),
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

In this example I am using the copy method to copy the instances of Euler and Vector 3 in my state object as the values for the corresponding properties for position and rotation. However there is also the set method that can be used to set the values of these class instances of a mesh. Both set methods will take three values, only with a Vector3 instance I will want to given position values for x, y, and z, and with a Euler instance I will want to give radian values for the angles of the rotation.

## 4 - Using an Array of Materials

An Array of materials can be passed to the Mesh constructor rather than just a single material. When doing so by default I would want to pass an array of six materials, one for each face. However it is possible to pass less than six materials when doing this, it is just that when doing so I might want to change what the material index values are for the Box geometry. In this section I will be going over a few quick basic cube examples using the Box Geometry constructor and an array of materials. 

For more on this kind of subject you might want to check out my post on [material index values when working with geometries and a array of materials with a mesh](/2018/05/14/threejs-mesh-material-index/). I do not care to get into this subject in depth here, but I think I should go over at least a few quick basic examples making use of just the box geometry.

### 4.1 - Using an array of six materials

A property of interest when working with a buffer geometry as of late versions of three.js is the groups array of the geometry. This is, or at least should be an array of objects where each objects is a material index for a side, or face if you prefer of the geometry. When making a custom geometry this groups array will have to be created manually by making use of the add group method, however with the built in Box Geometry constructor this array should all ready be there.

Out of the box there should be six objects in the groups array, and the material index values for each should go from  and including 0 to 5. So if I am doing going to change any of those values I will want to give an array of six materials, one for each side.

```js
var materials = [
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'red'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'lime'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    }),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    })
];
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        materials);

var scene = new THREE.Scene();
scene.add(box);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
state = {
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
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

### 4.2 - Using an array of materials more or less than six

When using an array of materials that is more or less than six chances are that I am going to want to change what the material index values are for the Box Geometry. To do this I just need to loop over the groups array of the box geometry and set the material index values for each group t the desired index value in the array of the materials.

```js
// the array of materials that is only two materials
var materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshDepthMaterial()
];
// create the box geometry
var geo = new THREE.BoxGeometry(1, 1, 1);
// The objects in the groups array is what there is to
// use to set material index values for each face
geo.groups.forEach(function (face, i) {
    face.materialIndex = face.materialIndex % materials.length;
});
// now create the box like always passing the geometry first,
// and the array of materials second
var box = new THREE.Mesh(
        geo,
        materials);
 
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xafafaf);
scene.add(box);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);

var lt = new Date(),
state = {
    x: 0,
    y: 0,
    z: 0
};
var loop = function () {
    var now = new Date(),
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

## 5 - Canvas Generated Textures, maps, light, and light responding materials.

Now it is time to get into something fun with a simple cube in three.js using the Box Geometry Constructor for the geometry. In this section I will be creating textures using canvas elements, and then use the state of those canvas elements to create textures for the various kind of maps when it comes to skinning faces of a cube.

To create a canvas texture I am first going to have a canvas element, and something drawn to it to use as a texture. This is of course a topic that is beyond the scope of this post. I have my [getting started post on canvas elements](/2017/05/17/canvas-getting-started/) that might be a good starting point if you are new to canvas, and I have also made a number of canvas example type posts that might also be worth checking out on this topic.

### 5.1 - First off the Create Canvas texture helper

All of the examples here make use of this create canvas texture helps method. In each example I can just call this method and then pass a single draw method. In this draw method I can then create a texture using the 2d drawing context of a canvas element. After that the question is what to do with the texture when making one or more materials for a cube.

```js
(function (utils) {
 
    utils.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 32;
        canvas.height = size || 32;
        canvas.style.imageRendering = 'pixelated';
        ctx.imageSmoothingEnabled = false;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
 
}
    (this['utils'] = {}));
```

### 5.2 - Basic color map example using the Basic Material

If I do not want or need to do anything fancy with lighting, transparency and so forth I can just use the Basic material. The problem with using the basic material without a texture is that iw will end up being a solid mass of color, and because the basic material does not respond to a light source there is no way of showing some depth for the cube, unless a color map is used.

```js
var colorMap = utils.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();
    });
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            map: colorMap
        }));
var scene = new THREE.Scene();
scene.add(box);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.render(scene, camera);
```

### 5.3 - Using the standard material and a light source

The basic material works okay if I just want to have a color map, and I do not want to bother with light at all. However when it does come to working with light I will want to use a material that will respond to a light source. There are a few options when it comes to this kind of material, however I often like to go with the standard material.

When it comes to using the standard material over the basic material the process is more or less the same as the basic material, when it comes to what it is that I do with the texture. Once again I am going to want to set the texture as the value for the map property of the material. However now nothing will show up, unless of course I use a light source. When it comes to light sources there are once again many options, however I often light to use the point light.

```js
var colorMap = utils.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();
    });
 
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        // using the standard material
        new THREE.MeshStandardMaterial({
            map: colorMap
        }));
var scene = new THREE.Scene();
scene.add(box);
 
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(1),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 8, 4);
scene.add(sun);
 
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.render(scene, camera);
```

## 6 - The edge geometry constructor and the line segments constructor

There is the subject of setting one or more materials that are being used with a box geometry in a mesh into wire frame mode. However there is a number of ways of getting a similar look that might prove to be a more desirable result. I mean wire frame mode of a material like the mesh basic material will work okay, but it will draw all the triangles of a mesh and not just the edges of the mesh. So another way of getting a similar result would be to use the [edges geometry](/2021/05/31/threejs-edges-geometry/) constructor to create a new geometry from the box geometry, and then pass that to the line segments constructor. This will result in a look that is like that of wire frame mode, but it will just be the edges of the box, not all the tingles which I  for one like better.

```js
(function () {
 
    // bog geometry and an edge geometry created from it
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo);
 
    // Line Segments
    var line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
 
    // Scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

There might be a number of other ways to go about creating a wire frame look rather than just making use of the wire fame mode of mesh materials. I would say that this is not the end all solution for this sort of thing because there is one draw back when it comes to setting the line width. It would seem that I can not set the thickness of the lines to anything other that 1, so maybe there is yet another way to do something like this that might have to involve some kind of custom geometry or other advanced use case.

## 7 - Conclusion

So then the Box geometry is a great starting point when it comes to starting to explore everything that there is to work with when it comes to three.js. Much of what applies for a Box geometry will also apply for other built in geometries when it comes to geometries and the index values for a geometry. However sooner or later it might be called for to get into creating a custom geometry using the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry/) directly rather than using one of the built in geometries. However it is also possible to just create simple, crude, yet effective models of things using just groups of the built in geometry constructors such as the Box Geometry constructor.



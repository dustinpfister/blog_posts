---
title: Working with lines in three.js
date: 2018-04-19 15:21:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 178
updated: 2023-06-14 10:39:12
version: 1.32
---

When it comes to making a [threejs](https://threejs.org/) project it is typically the mesh object class that is used to create and add objects to a scene. However there are a few other options that can be used as a way to add content to a scene such as Points which can be used to just simply show the location of the points of a position attribute of buffer geometry, and then Lines. For this post I will be focusing more so on using Lines then as an alternative to using mesh objects as I have another post in which the main focus is on [points](/2018/05/12/threejs-points-material/).

<!-- more -->

There is only so much to write about with the [Line](https://threejs.org/docs/#api/en/objects/Line), and [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) constructors in threejs, so to help keep this post from being too thin I will also be writing about other closly realted topics such as how to come up with the points in the first place, and the Materials that can be used with Lines. With lines I can not use any of the mesh object materials as such I must stick with the [LineBasicMatreial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial) and [LineDashedMaterial](https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial). Also there is a lot of ground to cover when it comes to the subject of how to create a v3array, or a curve to create such an array from, so forth and so on.

<iframe class="youtube_video" src="https://www.youtube.com/embed/Cs5QXW0xldQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What you should know before hand

This is a post on just one little aspect of threejs which is a javaScript project that allows for doing things involving solid geometry. It is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), or any additional aspects of [javaScript in general](/2018/11/27/js-getting-started/) that are required in order to work with the library. So then I will not be covering any basic things that one should know before reading the rest of this post, however I do often use the opening sections of these posts to write about some things that are closely related to the main over all topic of the post.

### There is also Tube Geometry

Lines are great, but they still do have there limitations that will cause one to want to create lines that are actually tubes. These tube line geometries will then contain not just a position attribute, but also normal, uvs, and index, and so forth that will allow them to work well with THREE.Mesh, and thus also Mesh Materials and thus all the features of such materials. For this kind of geometry there is looking into the [THREE.TubeGeometry](/2023/06/02/threejs-tube-geometry) class, and with that also the [THREE.Curve](/2022/06/17/threejs-curve/) base class to learn how to get started with that sort of thing.

### Vector3 and buffer geometry position attributes

You will want to know about the [Vector3 constructor](/2018/04/15/threejs-vector3/) as that is what is used to define points in 3d space in threejs to begin with often. However when it really comes down to it what one will really want to learn about is the [position attribute of buffer geometry objects](/2021/06/07/threejs-buffer-geometry-attributes-position/) as this is what is used to define the paths of lines. 

### A word On Materials when working with lines.

If you are just making lines, and nothing that will compose a solid object or face, then it does not make sense to use a material that is designed to be used with something that is just a string of points in space. So if you aim to just draw some lines, and not something that will compose a solid object there are two special materials in threejs that are intended to be used with just lines. The materials are the LineBasicMaterial, and the LineDashedMaterial materials. Apart from that most features in the [base material class](https://threejs.org/docs/#api/en/materials/Material) will still apply. So if you want to do something with vertex color attributes, transparency, or anything that involves the use of a feature in the base material class that should still work just fine.

### Using the Dashed Line material

If you are trying to use the dashed line material rather than the basic material, but are scratching your head wondering why it is that it is not dashed, then changes are you have not called a

```js
var line = new THREE.Line(geometry, new THREE.LineDashedMaterial({
    color: 0x0000ff,
    linewidth: 3,
    scale: .1,
    dashSize: .3,
    gapSize: .1
}));
line.computeLineDistances();
scene.add(line);
```

Certain properties such as the line width might not work as expected on all platforms, as such it might be best to always expect a width of only 1, or at least be happy with how it looks when it is just 1.

### The Line, and LineSegments Constructors

One of the best ways to go about getting started with lines in threejs is to just use the Line constructor. There is also the LineSegments constructor that works pretty much the same way only it uses a different rendering method. A basic example of one of these would be to just create a geometry, push points to an array, and then use that geometry with a line material to create an instance of Line that can then be added to a scene. However the process of doing so has changed a little when it comes to more recent versions of threejs

#### Using the BufferGeometry Constructor

In general I will want to use the Buffer Geometry constructor to create the geometry of a line. In fact in late versions of threejs this is the only way to do so now.

```js
    var points = [];
    points.push(
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(-10, 10, 0));
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    // CREATE THE LINE
    var line = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
```

#### Using the Geometry Constructor \( removed as of r125+ \)

When I first wrote this post I was using r91 of threejs, back then I could make likes by using the geometry constructor. I guess I can still level these examples up but I will of course have to just make it clear that code like this will break on recent versions of threejs unless you can bring back the geometry constructor by some kind of means involving additional external files.

```js
var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3(0, -10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(0, 10, 0));
 
scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 0x0000ff
})));
```

### Source code examples are up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-line). This is also where I place the [threejs source code examples for the many other blog posts](/categories/three-js/) that I ahve wrote over the years.

### Version Numbers matter

As I say in every post of mine on threejs, the library is a project in which the version number matters big time. When I first wrote this post I was using [threejs r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I edited the post I was using r146. Sense then many code breaking changes have happened in threejs with all sorts of things. One major change is that when it comes to lines, and anything that works with geometry from that matter, the geometry now has to be an instance of Buffer Geometry.

## 1 - Full basic line demo examples

As with any threejs example that is fully complete there must be a scene, camera, and renderer on top of the use of the Line constructor, geometry, and line materials. In this section I will be going over a few basic hello world style example that are full working examples that take everything into account. 

### 1.1 - First off a new threejs r127 example using BufferGemoetry

If I am using a late version of threejs that is r125 or higher I have to use the Buffer Geometry Constructor for the geometry of the line as the old Geometry constructor has been removed from that point forward. So then the first thing I need to do is create an array and then use the vecor3 class to create the points that I want for the line. After that I can use the setFromPoints method of a Buffer Geometry instance to create an instance of buffer geometry with this array of points. The resulting geometry can then be used with the THREE.Line constructor by passing the geometry as the first argument followed by the kine of line material that I want to use.

Once I have my instance of THREE.line I can then add it to a scene, then create a camera, and a renderer and use the scene and camera with the render just like any other example.

```js
//-------- ---------
// SCENE, CAMERA, RENDERER
//-------- ---------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(0, 0, -30);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(649, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ---------
// CREATE THE LINE
//-------- ---------
const points = [];
points.push(
    new THREE.Vector3(-10, -10, 0),
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(-10, 10, 0));
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
);
scene.add(line);
//-------- ---------
// RENDERER
//-------- ---------
renderer.render(scene, camera);
```

### 1.2 - My old r91 example Using the now removed Geometry constructor as of r125+

If I am using an older version of threejs or can somehow get the old geometry constructor on a new version of threejs I can create the geometry that way. Aside from that there is not much of any difference when it comes to everything else. I can not say that I will be creating actual projects like this any more, but I thought I should leave this up for historical reasons.

```js
(function () {
    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    // GEOMETRY
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, 10, 0));
    // LINE
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
    scene.add(line);
    // RENDER
    renderer.render(scene, camera);
}
    ());
```

I often place these examples just to have a complete copy and paste, functioning example, and also to cover some additional things that must be done with respect to the other components that make up a threejs project. Although in this case nothing special needs to be done compared to any other example this time around. Just the usual pitfalls to look out for such as making sure the camera is positioned away from, and looking at, what you are working with.


## 2 - Create the Points for the Lines

So far in the basic section I created points for the lines by creating arrays of Vector3 objects and then using the array of Vector3 objects to create a geometry with a position attribute by passing this array of vector3 objects to the set from points method of the buffer geometry class. However thus far I have created this array of vector3 objects by just calling the class over and over again for each point that I want in a line. That might be okay when it comes to very basic hello world style examples, sure, however in this section I will be focusing more so on what the next step is after that. So then the main focus here will be on other ways to create the array of points that make use of things like helper functions, and features of other classses in threejs such as the Curve class.

### 2.1 - Create Points helper function

I made a demo video for this post that can be seen above, when doing so I made a create points helper for the sake of making a demo that is a little more interesting than what I have thus far with examples of the THREE.Line constructor. So I thought I should have a quick section in which I have the source code that I was suing for the demo in that video.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ---------- 
// create points helper
const createPoints = function(len, rotationCount, height, maxRadius){
    rotationCount = rotationCount === undefined ? 8 : rotationCount;  // number of rotations
    height = height === undefined ? 5 : height;
    maxRadius = maxRadius === undefined ? 5 : maxRadius;
    const yDelta = height / len;
    const points = [];
    let i = 0, v, radian, radius, per;
    while(i < len){
        per = i / ( len - 1 );
        radian = Math.PI * 2 * rotationCount * per;
        radius = maxRadius  * per;
        v = new THREE.Vector3();
        v.x = Math.cos(radian) * radius;
        v.z = Math.sin(radian) * radius;
        v.y = i * yDelta;
        points.push(v);
        i += 1;
    };
    return points;
};
// update lines group
const updateLinesGroup = function(lines, rs, rDelta, height, radius){
    lines.children.forEach(function(line, i, arr){
        const per = (i + 1) / arr.length;
        line.geometry.setFromPoints( createPoints(150, rs + rDelta * per, height, radius) );
    });
};
//-------- ----------
// LINE
//-------- ----------
// create lines group
const lines = new THREE.Group();
const lineCount = 12;
const colors = [0x00ff00, 0xff0000, 0x0000ff, 0xff00ff, 0x00ffff, 0xffff00];
let i = 0;
while(i < lineCount){
    const per = i / lineCount;
    const points = createPoints(100, 1 + 0.2 * per, 0, 5);
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = scene.userData.line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
            color: colors[i % colors.length],
            linewidth: 6
        }));
    lines.add(line);
    i += 1;
}
scene.add(lines);
updateLinesGroup(lines, 0.5, 1.4, 10, 4);
lines.position.y = -8;
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 2.2 - Using a Curve to create points for a line

The curve class of threejs is a very helpful tool for creating lines in space I threejs. There is working out how to go about making a custom [curve class](/2022/06/17/threejs-curve/) by extending the base class, however I have found that more often then not one of the built in curve classes such as [THREE.QuadraticBezierCurve3](/2022/10/21/threejs-curve-quadratic-bezier-curve3) Works just fine for what it is that I typically want to do with curves. In any case one way to create points to then use to create a line with a curve would be to create a curve by way of the Quadratic Bezier Curve three built in curve class, then I can just call the get points method of the base curve class to create an array of say one hundred points that are along that curve. The result of the get points method call can then be passed as the argument value for the buffer geometry set from points method.

```js
//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ---------- 
const v_start = new THREE.Vector3(0,0,5);
const v_end = new THREE.Vector3(-5,0,-5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3( 14.7, 0, -5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
//-------- ----------
// POINTS, GEOMETRY, LINE
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 100 ) )
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3}));
line.position.y = 0.1;
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

Simple enough sure but there are a few draw backs, for one thing the spacing between points will always be constant. This can be addresses by making use of the get point method of the curve class rather than the plural get points method which allows me to define what the alpha values should be along the curve on a point by point basis.

## 3 - Using 2d lines made in a canvas project with threejs

I have wrote a [full post on using canvas to make a texture](/2018/04/17/threejs-canvas-texture/) in threejs, and when doing so there is drawing 2d lines on a canvas element and then using that to skin the face of a geometry. So then because I wrote a post on that in great detail I will not be getting into that here, but I think it is worth mentioning in this post.

How it is done in a nut shell is to use the 2d canvas drawing context line methods to draw a line like normal, then pass the canvas to the Texture constructor, or better yet the CanvasTexture constructor that is put in place for this specific purpose. The texture can then be used with a material that is used in a Mesh for the various types of maps such as the plain color map, alpha map, and so forth. The Mesh can then use any geometry that will have one or more faces that will make use of the texture.

### 3.1 - Example using canvas to draw a line for a texture

The Basic idea here is to just create a canvas, draw lines to the canvas using the 2d drawing context, and then create a texture with the canvas element. When it comes to using a canvas to create a texture in threejs there is the canvas texture constructor, but the regular texture constructor can also be used by just setting the needs update Boolean to true. The resulting texture can the be used with a materials such as the basic material by making the texture the value of something like the map property of the material.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(1.4, 1.4, 1.4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CANVAS
//-------- ----------
const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
canvas.width = 128;
canvas.height = 128;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#ff00ff';
ctx.lineWidth = 1;
ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
const texture = new THREE.Texture(canvas);
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
texture.needsUpdate = true;
//-------- ----------
// GEOMETRY, MATERIAL, MESH
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
        map: texture
    });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

I will not be getting into the canvas 2d drawing API in detail here, but because it is another way of drawing lines in threejs it is sure worth mentioning to say the least.

## Conclusion

So that is it for now when it comes to drawing lines in threejs, I am sure that there might be more to write about on this topic in the future but I have to get some time to work on some more examples first. There is not just using the Line constructor, but also creating some kind of custom tube line geometry that can then be skinned with any of the materials that are used for solid geometries. That is something that I would like to look into more sooner or later when I can get around to it.

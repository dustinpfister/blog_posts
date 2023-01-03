---
title: Working with lines in three.js
date: 2018-04-19 15:21:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 178
updated: 2023-01-03 08:15:57
version: 1.28
---

When it comes to making a [threejs](https://threejs.org/) project it is typically the mesh object class that is used to create and add objects to a scene. However there are a few other options that can be used as a way to add content to a scene such as Points which can be used to just simply show the location of the points of a position attribute of buffer geometry, and then Lines. For this post I will be focusing more so on using Lines then as an alternative to using mesh objects as I have another post in which the main focus is on [points](/2018/05/12/threejs-points-material/).

<!-- more -->

There is only so much to write about with the [Line](https://threejs.org/docs/#api/en/objects/Line), and [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) constructors in threejs, so to help keep this post from being to thin I will also be writing about other closly realted topucs such as how to come up with the points in the first place, and the Materials that can be used with Lines. With lines I can not use any of the mesh object materials as such I must stick with the [LineBasicMatreial](https://threejs.org/docs/index.html#api/materials/LineBasicMaterial) and [LineDashedMaterial](https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial). 

<iframe class="youtube_video" src="https://www.youtube.com/embed/Cs5QXW0xldQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What you should know before hand

This is a post on just one little aspect of threejs which is a javaScript project that allows for doing things involving solid geometry. It is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), or any additional aspects of [javaScript in general](/2018/11/27/js-getting-started/) that are required in order to work with the library. So then I will not be covering any basic things that one should know before reading the rest of this post, however I do often use the opening sections of these posts to write about some things that are closely related to the main over all topic of the post.

### Vector3 and buffer geometry position attributes

You will want to know about the [Vector3 constructor](/2018/04/15/threejs-vector3/) as that is what is used to define points in 3d space in threejs to begin with often. However when it really comes down to it what one will really want to learn about is the [position attribute of buffer geometry objects](/2021/06/07/threejs-buffer-geometry-attributes-position/) as this is what is used to define the paths of lines. 

### A word On Materials when working with lines.

If you are just making lines, and nothing that will compose a solid object or face, then it does not make sense to use a material that is designed to be used with something that is just a string of points in space. So if you aim to just draw some lines, and not something that will compose a solid object there are two special materials in threejs that are intended to be used with just lines. There materials are the LineBasicMaterial, and the LineDashedMaterial materials.

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

The source code examples that I am written about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-line).

### Version Numbers matter

As I say in every post of mine on threejs, the library is a project in which the version number matters big time. When I first wrote this post I was using [threejs r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I edited the post I was using r135. Sense then many code breaking changes have happened in threejs with all sorts of things. One major change is that when it comes to lines, and anything that works with geometry from that matter, the geometry now has to be an instance of Buffer Geometry.

## 1 - Full basic line demo examples

As with any threejs example that is fully complete there must be a scene, camera, and renderer on top of the use of the Line constructor, geometry, and line materials. In this section I will be going over a few basic hello world style example that are full working examples that take everything into account. 

### 1.1 - First off a new threejs r127 example using BufferGemoetry

If I am using a late version of threejs that is r125 or higher I have to use the Buffer Geometry Constructor for the geometry of the line as the old Geometry constructor has been removed from that point forward. So then the first thing I need to do is create an array and then use the vecor3 class to create the points that I want for the line. After that I can use the setFromPoints method of a Buffer Geometry instance to create an instance of buffer geometry with this array of points. The resulting geometry can then be used with the THREE.Line constructor by passing the geometry as the first argument followed by the kine of line material that I want to use.

Once I have my instance of THREE.line I can then add it to a scene, then create a camera, and a renderer and use the scene and camera with the render just like any other example.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
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
    scene.add(line);
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(649, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

### 1.2 - My old r91 example Using the now removed Geometry constructor as of r125+

If I am using an older version of threejs or can somehow get the old geometry constructor on a new version of threejs I can create the geometry that way. Aside from that there is not much of any difference when it comes to everything else. I can not say that I will be creating actual projects like this any more, but I thought I should leave this up for historical reasons.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(0, 0, -30);
    camera.lookAt(0, 0, 0);
 
    // GEOMETRY
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0, -10, 0),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(0, 10, 0));
 
    // The Line
    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x0000ff
            }));
    scene.add(line);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

I often place these examples just to have a complete copy and paste, functioning example, and also to cover some additional things that must be done with respect to the other components that make up a threejs project. Although in this case nothing special needs to be done compared to any other example this time around. Just the usual pitfalls to look out for such as making sure the camera is positioned away from, and looking at, what you are working with.

## 2 - Create Points helper function

I made a demo video for this post that can be seen above, when doing so I made a create points helper for the sake of making a demo that is a little more interesting than what I have thus far with examples of the THREE.Line constructor. So I thought I should have a quick section in which I have the source code that I was suing for the demo in that video.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
     var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // create points helper
    var createPoints = function(len, rotationCount, height, maxRadius){
        rotationCount = rotationCount === undefined ? 8 : rotationCount;  // number of rotations
        height = height === undefined ? 5 : height;
        maxRadius = maxRadius === undefined ? 5 : maxRadius;
        var yDelta = height / len;
        var points = [];
        var i = 0, v, radian, radius, per;
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
    var updateLinesGroup = function(lines, rs, rDelta, height, radius){
        lines.children.forEach(function(line, i, arr){
            var per = (i + 1) / arr.length;
            line.geometry.setFromPoints( createPoints(150, rs + rDelta * per, height, radius) );
        });
    };
 
    // create lines group
    var lines = new THREE.Group();
    var lineCount = 12;
    var colors = [0x00ff00, 0xff0000, 0x0000ff, 0xff00ff, 0x00ffff, 0xffff00];
    var i = 0;
    while(i < lineCount){
        var per = i / lineCount;
        var points = createPoints(100, 1 + 0.2 * per, 0, 5);
        var geometry = new THREE.BufferGeometry().setFromPoints( points );
        var line = scene.userData.line = new THREE.Line(
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
 
    // Render
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Using 2d lines made in a canvas project with threejs

I have wrote a [full post on using canvas to make a texture](/2018/04/17/threejs-canvas-texture/) in threejs, and when doing so there is drawing 2d lines on a canvas element and then using that to skin the face of a geometry. So then because I wrote a post on that in great detail I will not be getting into that here, but I think it is worth mentioning in this post.

How it is done in a nut shell is to use the 2d canvas drawing context line methods to draw a line like normal, then pass the canvas to the Texture constructor, or better yet the CanvasTexture constructor that is put in place for this specific purpose. The texture can then be used with a material that is used in a Mesh for the various types of maps such as the plain color map, alpha map, and so forth. The Mesh can then use any geometry that will have one or more faces that will make use of the texture.

### 3.1 - Example using canvas to draw a line for a texture

The Basic idea here is to just create a canvas, draw lines to the canvas using the 2d drawing context, and then create a texture with the canvas element. When it comes to using a canvas to create a texture in threejs there is the canvas texture constructor, but the regular texture constructor can also be used by just setting the needs update Boolean to true. The resulting texture can the be used with a materials such as the basic material by making the texture the value of something like the map property of the material.

```js
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.4, 1.4, 1.4);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    canvas.width = 8;
    canvas.height = 8;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    // GEOMETRY
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // MATERIAL
    var material = new THREE.MeshBasicMaterial({
            map: texture
        });
    // MESH
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // render
    renderer.render(scene, camera);
```

I will not be getting into the canvas 2d drawing API in detail here, but because it is another way of drawing lines in threejs it is sure worth mentioning to say the least.

## Conclusion

So that is it for now when it comes to drawing lines in threejs, I am sure that there might be more to write about on this topic in the future but I have to get some time to work on some more examples first. There is not just using the Line constructor, but also creating some kind of custom tube line geometry that can then be skinned with any of the materials that are used for solid geometries. That is something that I would like to look into more sooner or later when I can get around to it.

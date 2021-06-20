---
title: The Standard Material in Threejs
date: 2021-04-27 15:25:00
tags: [three.js]
layout: post
categories: three.js
id: 854
updated: 2021-06-20 10:16:12
version: 1.17
---

A long time ago I wrote a post on the [basic material](/2018/05/05/threejs-basic-material/) in [three js](https://threejs.org/), but oddly enough I never got around to writing a post on the [standard material](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) which is on of several options with materials that make use of light sources. When it comes to [mesh materials](/2018/04/30/threejs-materials/) in threejs the basic material is a nice starting point, and in some examples and projects in which I am not doing anything with light it might even get the job done just fine. However when it comes to working with everything that three.js has to offer when it comes to light sources, and the various kinds of texture maps there are to work with, the standard material is maybe one of the best all round options.

There are some additional materials that might be worth mentioning as contenders when it comes to a great general use case material in three.js such as the [Lambert material](/2018/04/08/threejs-lambert-material/), and the phong material. The nice thing about the lamber material is that it might eat up a little less overhead compared to the standard material, which might come in handy with certain kinds of projects. However over all the standard material seems to work fine on the systems that I test on, and also it might prove to reproduce more realistic lighting compared to the lamber material.

<!-- more -->

## 1 - The standard material and what to know first

This is a post on the standard material in three.js that is used along with a geometry to skin a Mesh object that can then be added to a scene when making a three.js project. There is a great deal that you should be aware of before getting into the depth of what there is to know about when it comes to materials, so in other words this is not a getting started post on three.js let alone javaScript in general. So I assume that you have worked out at least a few basic examples of three.js and are not just looking into what the options are when it comes to skinning a mesh object.

### 1.1 - Version Numbers matter with three.js

When I wrote this post I was using r127 of three.js.

## 2 - Basic example of the standard material

First off lets start with a very basic example of the standard material, by creating a cube using the Box Geometry constructor for the geometry to use for the mesh. Next I will create an instance of the standard material for the mesh that will use a solid color of red. However this will not work out as you might expect when it comes to using the basic material, as if you just use the standard material itself without a light source you will not see anything.

There are ways of using the standard material without a light source by making use of the emissve property, and better yet an emissve map. However when it comes to using the standard material with the color property I am going to want to have a light source. When it comes to light sources there are many options, but I usually like to go with a point light.

```js
// creating a box with the standard material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 'red'}));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// adding a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 4, 2);
scene.add(sun);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0.8, 1.3, 0.8);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Using a color map and a light source

What is great about the standard material is that there are a lot of texture maps that can be used with the standard material. There is having a regular color map like that of the basic material, it is just that one needs to use a light source with it just like with the plain solid color setting. There are a number of ways to create a texture, typically I might want to load an external file to do so. However for these kinds of examples I like to go with some kind of solution that avoids bothering with external images by making use of a solution that involves using canvas elements and a little javaScript code.

To create canvas textures I will want to use the canvas texture constructor in thee.js, but first I will need a canvas element with the desired texture drawn on it to pass to the constructor. The topic of working with canvas elements is beyond the scope of this post of course, however I have a [getting started post on canvas](/2017/05/17/canvas-getting-started/), as well as a lot of [canvas example](/2020/03/23/canvas-example/) type posts when it comes to learning how to work with canvas elements. For more on this sort of thing when it comes to using canvas elements to create textures there is my post on the [canvas texture constructor](/2018/04/17/threejs-canvas-texture/).

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
 
var colorMap = utils.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();
    });
 
// creating a box with the standard material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshStandardMaterial({
            map: colorMap
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// adding a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
radian = 0;
 
var loop = function () {
 
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
 
    requestAnimationFrame(loop);
 
    radian += 1.57 * secs;
    radian %= Math.PI * 2;
 
    var x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
 
    renderer.render(scene, camera);
};
loop();
```

## 4 - The emissive map and other related properties

Now for one more map example this time using the emissve map option to make it so that the material will still show something at least even if there is not light at all. With the basic material there is just having a color map, but with the standard material the color map will only should up when there is some light. The functionally of the basic material color map can still show up though I just need to do so by having an emissve map.

In this example I am doing more or less the same thing with it comes to my color map example, but now I am also using the map I created with a canvas element for the emissve map also. When doing so I will want to set the solid emissive color to something other than black, and I will also typically want to adjust the intensity of this effect also.

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
 
var colorMap = utils.createCanvasTexture(function (ctx, canvas) {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.rect(1, 1, canvas.width - 2, canvas.height - 2);
        ctx.stroke();
    });
 
// creating a box with the standard material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshStandardMaterial({
            map: colorMap,
            emissive: 'white',
            emissiveIntensity: 0.3,
            emissiveMap: colorMap
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// adding a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(2, 6, 16);
scene.add(sun);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(6, 6, 6);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
radian = 0;
 
var loop = function () {
 
    var now = new Date(),
    secs = (now - lt) / 1000;
    lt = now;
 
    requestAnimationFrame(loop);
 
    radian += 1.57 * secs;
    radian %= Math.PI * 2;
 
    var x = Math.cos(radian) * 5,
    y = 2 - 2 * Math.cos(radian),
    z = Math.sin(radian) * 5;
    sun.position.set(x, y, z);
 
    renderer.render(scene, camera);
};
loop();
```

Another options when it comes to something like this is to use some ambient light on top of a point light as this will make sure that the color map will always show up at least a little. However one nice thing about this is that I can make the emissive map something completely different form that of the regular color map.

## 5 - Conclusion

More often than not the standard material is my default go to material that I use with just about every project in which I start playing around with light. There is a great deal more to write about when it comes to the various kind of maps to work with when it comes to using this material. When it comes to getting more into the details of this material I might come around to edit this post, or write some new ones as I get around to it. For now there is my main post on [mesh materials](/2018/04/30/threejs-materials/) in general in which I briefly go over most of the materials that are built into three.js.


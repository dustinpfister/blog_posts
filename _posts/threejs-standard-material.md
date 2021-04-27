---
title: The Standard Material in Threejs
date: 2021-04-27 15:25:00S
tags: [three.js]
layout: post
categories: three.js
id: 854
updated: 2021-04-27 15:50:50
version: 1.5
---

A log time ago I wrote a post on the [basic material](/2018/05/05/threejs-basic-material/) in [three js](https://threejs.org/), but oddly enough I never got around to writing a post on the [standard material](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) in threejs. When it comes to [mesh materials](/2018/04/30/threejs-materials/) in threejs the basic material is a nice starting point, and in some examples and projects in which I am not doing anything with light it might even get the job done just fine. However when it comes to working with everything that three.js has to offer when it comes to light sources, and the various kinds of texture maps the standard material is maybe one of the best options to go with.

There are some additional materials that might be worth mentioning as contenders when it comes to a great general use case material in three.js such as the [Lambert material](/2018/04/08/threejs-lambert-material/). The nice thing about the lamber material is that it might eat up a little less overhead compared to the standard material. However over all the standard material seems to work fine on the systems that I test on, and also it might prove to reproduce more realistic lighting compared to the lamber material.

<!-- more -->

## 1 - The standard material and what to know first

This is a post on the standard material in three.js that is used along with a geometry to skin a Mesh object that can then be added to a scene when making a three.js project.

## 2 - Basic example of the standard material

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

## 5 - Conclusion

More often than not the standard material is my default go to material that I use with just about every project in which I start playing around with light.


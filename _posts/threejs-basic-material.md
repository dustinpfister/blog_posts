---
title: The basic material in three.js
date: 2018-05-05 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 184
updated: 2021-05-12 15:34:58
version: 1.16
---

In [three.js](https://threejs.org/) the [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) seems to come up a lot, for example it is the default material that is used when creating a Mesh if a material is not specified. Also it is still a decent material if you want to just skin a mesh with a texture, and do not want to do anything special involving the reflection of light. Still the material supports a few options when it comes to texture maps, there is the basic color map, but there is are a few more options such as an alpha map also. Still there are even more options when it comes to texture maps with other materials that will respond to light sources such as the [standard material](/2021/04/27/threejs-standard-material/).

The Basic material is then a good starting point to work with, but of course the material does have its draw backs. For example if I want to do anything with light, and many additional texture maps that have to do with light, I am going to want to use something like the standard material, or Lambert material along with a few other options. However still the basic material can often prove to work out okay for many basic examples, and even full projects actually because I do not always want to bother with light sources. So today I thought I would continue expanding my [collection of posts on three.js](/categories/three-js/) by writing a post on the basic material, and what it has to offer when making a three.js project. This will be some basic examples of the materials, but also a few examples in which I am getting into textures created with canvas elements.

<!-- more -->

## 1 - What to know before reading up more on the Basic Material

This is a post on the basic material used in three.js, one of several options when it comes to skinning a mesh object. If you are new to three.js, you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on three.js. I will not be getting into detail with the very basic of three.js here, however of course I will be keeping many of these examples fairly simple. There are still a few things that you should maybe know before continuing to read this post on the basic material along so in this section I will be just outlining some of these things.

### 1.1 - Version Numbers are impotent with three.js

When I first wrote this post I was using version r91 of three.js and the last time I came around to do some serious editing I was using r127 of three.js. Sense then not much has changed when it comes to using the basic material, at least as far as I can tell. Still code breaking changes are introduced all the time into three.js so always be mindful of the versions of three.js that where used when looking at three.js examples on the open web.

### 1.2 - Be aware of what the full options are with materials

You might also want to check out my post on [three.js materials](/2018/04/30/threejs-materials/) in general for more posts on the various material options in threejs.

## 2 - Basic example of the basic material

The Basic material is the default material used for a mesh so if I just directly add a Mesh to a scene without giving a material, the  mesh will used the basic material with a random color for the color property of the basic material instance.

```js
scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
```

Typically I will want to use the MeshBasicMaterial constructor to create an instance of basic material thought. This will be necessary if I want to set at least one property of the material that is not a default value for the property in question. When it comes to property options for the basic material if I just want to set a solid color for the whole material then the color option would be one way to go about doing that.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
 
    // a mesh using the BASIC MATERIAL
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            // the color property will apply to all faces
            // for this mesh
            new THREE.MeshBasicMaterial({
                color: 0xff0000
            }));
    scene.add(box);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

This results in a cube that is sold green all over. There is no sense of depth on the cube, and if I add a light nothing will change. That is okay though because if I want to do anything with light I would want to use another material such as the standard material.

If I do not want to use a solid color, but a texture then I can use the map property to do so.With that said lets look at another example of the basic material that does just that.

## 3 - Adding a color map texture to a basic material in three.js using canvas

The Basic material is a good choice if you do not what to do much of anything involving light, but do still want to have some kind of color map texture. A texture can be added in from an external image using a loader, or it can be created with javaScript using the 2d canvas drawing context of a canvas element.

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xafafaf);
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 10);
    camera.position.set(1.25, 1.25, 1.25);
    camera.lookAt(0, 0, 0);
 
    // CANVAS
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    // set canvas native size
    canvas.width = 32;
    canvas.height = 32;
    // draw to canvas
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 14, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.rect(0,0,canvas.height,canvas.height)
    ctx.stroke();
 
    // CUBE
    var cube = new THREE.Mesh(
        // box GEOMETRY
        new THREE.BoxGeometry(1, 1, 1),
        // BASIC MATERIAL WITH A COLOR MAP
        new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(canvas)
        })
    );
    scene.add(cube);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

I have written a [post on using canvas as a texture]( /2018/04/17/threejs-canvas-texture/) in which I covered this in further detail, but the basic idea is there.

## 4 - An Alpha map with the Basic material

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x002a2a);
 
    // ALPHA MAP CANVAS
    var alphaCanvas = document.createElement('canvas'),
    ctx = alphaCanvas.getContext('2d');
    // set canvas native size
    alphaCanvas.width = 32;
    alphaCanvas.height = 32;
    // draw to canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, alphaCanvas.width, alphaCanvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, alphaCanvas.width - 6, alphaCanvas.height - 6);
 
    // mesh using BASIC MATERIAL with an alpha map
    var cube = new THREE.Mesh(
            // box GEOMETRY
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0.5,
                color: 0xffffff,
                alphaMap: new THREE.CanvasTexture(alphaCanvas),
                side: THREE.FrontSide
            }));
    scene.add(cube);
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 3000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 5 - Conclusion

The basic material is just as the name suggests, there are other materials to use in three.js if you want to do something more advanced but the basic material gets the job done when it comes to simple projects. There is of course the [Lambert material](/2018/04/08/threejs-lambert-material/) that is a good choice if you want to do something involving light in a real time environment. There are of course many other [materials](/2018/04/30/threejs-materials/) to chose from when working with a [mesh](/2018/05/04/threejs-mesh/) as well that might have better values to offer when it comes to how things look compared to how much resources they eat up. 

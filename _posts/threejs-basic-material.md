---
title: The basic material in three.js
date: 2018-05-05 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 184
updated: 2019-12-19 10:46:55
version: 1.5
---

In [three.js](https://threejs.org/) The [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) seems to come up a lot, for example it is the default material that is used when creating a Mesh if a material is not specified. Also it is still a decent material if you want to just skin a mesh with a texture and do not want to do anything special involving the reflection of light, and many other maps other than a color map. 

So today I thought I would continue expanding my [collection of posts on three.js](/categories/three-js/) by writing a post on the basic material, and what it has to offer when making a three.js project.

<!-- more -->

## What to know

This is a post on the basic material used in three.js. If you are new to three.js, you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on three.js. You might also want ot check out my post on [three.js materials](/2018/04/30/threejs-materials/) in general as well.

## Basic example of the basic material

The Basic material is the default material used for a mesh so if I just directly add a Mesh to a scene without giving a material, the  mesh will used the basic material with a random color.

```js
scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)));
```

Typically I will want to use the MeshBasicMaterial constructor to create an instance of basic material thought if I want to set at least one property of the material.

```js
var redCube = new THREE.Mesh(
 
    new THREE.BoxGeometry(1, 1, 1),
 
    new THREE.MeshBasicMaterial({
 
        color: 0x00ff00
 
}));
redCube.position.set(-2, 0, 0);
scene.add(redCube);
```

## Adding a color map texture to a basic material in three.js using canvas

The Basic material is a good choice if you do not what to do much of anything involving light, but do still want to have some kind of color map texture. A texture can be added in from an external image using a loader, or it can be created with javaScript using the 2d canvas drawing context.

```js
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
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 16, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
 
    // CUBE
    var cube = new THREE.Mesh(
 
            // box GEOMETRY
            new THREE.BoxGeometry(1, 1, 1),
 
            new THREE.MeshBasicMaterial({
            map: new THREE.CanvasTexture(canvas)
        }));
    scene.add(cube);
```

I have written a [post on using canvas as a texture]( /2018/04/17/threejs-canvas-texture/) in which I covered this in further detail, but the basic idea is there.

## Conclusion

The basic material is just as the name suggests, there are other materials to use in three.js if you want to do something more advanced. There is of course the [Lambert material](/2018/04/08/threejs-lambert-material/) that is a good choice if you want to do something involving light in a real time environment. There are of course many other [materials](/2018/04/30/threejs-materials/) to chose from when working with a [mesh](/2018/05/04/threejs-mesh/) as well. 

There are many other properties in the basic material that I have not covered here, but some of them seem like they might be worthy of a whole new post such as with the ambient occlusion map texture that can be used.
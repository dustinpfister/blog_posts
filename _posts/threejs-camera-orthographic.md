---
title: Using an Orthographic Camera three.js
date: 2018-05-17 16:24:00
tags: [js,three.js]
layout: post
categories: three.js
id: 189
updated: 2018-05-17 17:06:49
version: 1.1
---

In [three.js](https://threejs.org/) there are a few cameras to work with, typically in must cases I would use the perspective camera, however there is also the orthographic camera as well that can come in handy. In this post I will be writing about the orthographic camera, how it compares to the perspective camera, and why you might want to use it with certain projects.

<!-- more -->

## The Cube Stack Model

So In order to appreciate the differences between the orthographic, and perspective cameras in three.js I will first need some kind of scene that will help express that well. So that being said I made a model that I think will help make a scene that can do that very well.

The model will generate a scene consisting of a plane, and a whole bunch of cubes randomly positioned over the plane, and on top of each other. This will result in something that might resemble a city, with many high buildings at different heights, or something to that effect.

```js
var CubeStack = (function () {
 
    // the stack constructor
    return function (opt) {
 
        var boxCount,
        box,
        x,
        y,
        z,
        plane,
        boxArray = [],
        boxIndex = 0;
 
        opt = opt || {};
        this.boxCount = opt.boxCount === undefined ? 15 : opt.boxCount;
        this.gx = 5;
        this.gy = 5;
 
        // this is what can be added to the scene
        this.group = new THREE.Group();
 
        plane = new THREE.Mesh(
                // plane geometry
                new THREE.PlaneGeometry(this.gx, this.gy, this.gx, this.gy),
                // materials
                [
                    new THREE.MeshStandardMaterial({
                        color: 0x00ff00,
                        emissive: 0x0a0a0a
                    }),
                    new THREE.MeshStandardMaterial({
                        color: 0x0000ff,
                        emissive: 0x0a0a0a
                    })
                ]);
        plane.position.set(0, -0.5, 0);
        plane.rotation.set(-Math.PI / 2, 0, 0);
        plane.geometry.faces.forEach(function (face, i) {
            face.materialIndex = i % 2;
        });
        this.group.add(plane);
 
        // place some boxes on the plane
        while (boxIndex < this.boxCount) {
 
            box = new THREE.Mesh(
 
                    new THREE.BoxGeometry(1, 1, 1),
 
                    new THREE.MeshStandardMaterial({
 
                        color: 0x00ffff,
                        emissive: 0x0a0a0a
 
                    }));
 
            x = Math.floor(this.gx * Math.random());
            y = 0;
            z = Math.floor(this.gy * Math.random());
 
            if (boxArray[z] === undefined) {
 
                boxArray[z] = [];
 
            }
 
            if (boxArray[z][x] === undefined) {
 
                boxArray[z][x] = [];
 
            }
 
            boxArray[z][x].push(box);
            y = boxArray[z][x].length - 1;
 
            box.position.set(
 
                -2 + x,
                y,
                -2 + z);
            this.group.add(box);
 
            boxIndex += 1;
 
        }
 
    };
 
}
    ());
```

So I have this saved as cube_stack.js, and I link to it in my html after three.js, and before the rest of my demo where I will be using this.

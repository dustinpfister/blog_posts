---
title: Using an Orthographic Camera in three.js
date: 2018-05-17 16:24:00
tags: [js,three.js]
layout: post
categories: three.js
id: 189
updated: 2019-12-17 10:48:59
version: 1.4
---

In [three.js](https://threejs.org/) there are [a few cameras to work with](/2018/04/06/threejs-camera/), typically in must cases I would use the perspective camera, however there is also the orthographic camera as well that can come in handy. In this post I will be writing about the orthographic camera, how it compares to the perspective camera, and why you might want to use it with certain projects.

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

So I have this saved as cube_stack.js, and I link to it in my html after three.js, and before the rest of my demo where I will be using this. I could get into this in detail, and yes it is far from perfect, but that would be off topic. For now if three.js is loaded in the browser, and then this is loaded I will have a constructor that I can use in a three.js demo like this:

```js
var stack = new CubeStack();
scene.add(stack.group);
```

I could have it be a lot more that what it is but for the purpose of the subject of this post by doing this it will just add a group that contains a bunch of Mesh Object instances positioned in a way that might resemble a city. The reason why this is of interest comes when switching between the kinds of cameras used to view something like this.

## The Three.js Orthographic Camera Example

Now that I have the model I can use it in a demo. I will want to make a demo that will show the difference between the two most common camera types by comparing what is rendered using an orthographic camera to that of a perspective camera. To do this I will want to use more than one camera in my demo.

### An Array of cameras

In order to get a good sense of the difference between the orthographic camera compared to the typical perspective camera, I will want an array of cameras. One wll be an instance of THREE.PerspectiveCamera that is what I often use in most projects, while the other will be THREE.OrthographicCamera.

```js
// CAMERAS
var width = 3.2,
height = 2.4,
cameras = [
 
    // camera 0 will be the typical Perspective Camera
    new THREE.PerspectiveCamera(45, width / height, .5, 100),
 
    // and camera 1 will be Orthographic
    new THREE.OrthographicCamera(
        -width,
        width,
        height,
        -height,
        .1,
        50)
 
];
 
cameras.forEach(function(camera){
    // code that will effect all cameras used here
});
```

Any code that I will want to apply to all cameras I will of course put in the forEach loop, such as setting the position,a dn zoom level of the cameras.

## The example in full

So the example will look like this then:

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERAS
    var width = 3.2,
    height = 2.4,
    cameras = [
 
        // camera 0 will be the typical Perspective Camera
        new THREE.PerspectiveCamera(45, width / height, .5, 100),
 
        // and camera 1 will be Orthographic
        new THREE.OrthographicCamera(
            -width,
            width,
            height,
            -height,
            .1,
            50)
 
    ];
 
    // for each camera
    cameras.forEach(function (camera) {
 
        // set to same position, and look at the origin
        camera.position.set(5, 5, 5);
        camera.lookAt(0, 0, 0);
 
        // set zoom
        camera.zoom = .75;
        camera.updateProjectionMatrix();
        scene.add(camera);
 
        // point light above the camera
        var light = new THREE.PointLight();
        light.position.set(0, 2, 0);
        camera.add(light);
 
        // add orbit controls if there
        if (THREE.OrbitControls) {
 
            new THREE.OrbitControls(camera);
 
        }
 
    });
 
    // STACK
    // create an instance of the CubeStack Model
    // and add it to the scene
    var stack = new CubeStack();
    scene.add(stack.group);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // lOOP
    var frame = 0,
    maxFrame = 1000;
    var loop = function () {
 
        var per = frame / maxFrame,
        r = Math.PI * 2 * per,
        // camera index
        ci = Math.floor(per * 8 % 2);
 
        requestAnimationFrame(loop);
 
        stack.group.rotation.set(0, Math.PI * 2 * per, 0);
 
        renderer.render(scene, cameras[ci]);
 
        frame += 1;
        frame = frame % maxFrame;
 
    };
 
    loop();
 
}
    ());
```

When all goes well this will result in a rotating scene that looks like a bunch of buildings. The example will switch between camera 0 (perspective), and camera 1 (orthographic). If you take the time to reproduce this you will notice that it is easier to tell what the size is of things.
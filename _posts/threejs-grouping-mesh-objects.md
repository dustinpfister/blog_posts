---
title: Grouping two or more Mesh Objects together in three.js
date: 2018-05-16 11:52:00
tags: [js,three.js]
layout: post
categories: three.js
id: 188
updated: 2018-05-16 17:38:20
version: 1.3
---

After writing a lot of demos in [three.js](https://threejs.org/) I have arrived at a point where it is time to start getting into some more advanced topics in three.js, or more on to something new. I do not care to move on away from three.js, this project is worth a serious investment of time to get solid with for sure. So with that said, it might be time for me to get into animation with three.js. One way is to have Mesh Objects grouped together, and then have it so they are moving in relation to each other, and have the whole group move as well. Or for whatever the reason it might be a good idea to group two or more objects together, so this post today will be about the three.js [Group](https://threejs.org/docs/index.html#api/objects/Group) constructor.

<!-- more -->

## What to know

This is not a post on three.js for beginners, I have a post for that, and if you are new you might want to [start there](/2018/04/04/threejs-getting-started/). This is an advanced post on three.js that has to do with grouping two or more [Mesh Object](/2018/05/04/threejs-mesh/) instances into a single Group that can then be worked with by itself in a scene. I assume that you have at least a basic working knowledge of three.js, and of course javaScript in general.

## THREE.Object3D vs THREE.Group

When it comes to grouping two ore more Mesh Objects together it may be preferable to use the Group constructor in place of just using Object3D by itself. As far as I can tell there is not much of any difference other than it makes the readability of your code more clear.

## Basic Mesh Group example in three.js

For a basic example of grouping in three.js I put together a demo that involves creating a whole bunch of Mesh Object instances, and groups them all together using THREE.Group. I just used the simple plain old Box Geometry constructor for the geometry, and positioned them all around the origin, and have them all face the origin as well.

Each time I make a new Mesh I just add it to the instance of group rather than Scene, by doing this the origin of each Mesh is relative to the instance of Group rather than the Scene. Once that is done whenever I change the position, or rotation of the group it changes the position, and rotation of the whole group.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 50);
    camera.position.set(10, 10, 10);
 
    // Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.lookAt(0, 0, 0);
 
    var group = new THREE.Group();
 
    var i = 0,
    count = 5;
    while (i < count) {
 
        var bx = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    wireframe: true
                })),
 
        r = Math.PI * 2 / count * i;
 
        bx.position.set(
 
            Math.cos(r) * 4,
            0,
            Math.sin(r) * 4);
 
        bx.lookAt(0, 0, 0);
        group.add(bx);
 
        i += 1;
    }
 
    scene.add(group);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(320, 240);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 1000;
    var loop = function () {
 
        var per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;
 
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
 
        group.rotation.set(
            Math.PI * 2 * per,
            Math.PI * 16 * per,
            0);
 
        frame += 1;
        frame = frame % maxFrame;
 
    };
 
    renderer.render(scene, camera);
    loop();
 
}
    ());
```
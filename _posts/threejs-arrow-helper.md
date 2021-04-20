---
title: Arrow helpers in three.js
date: 2018-11-10 09:42:00
tags: [js,three.js]
layout: post
categories: three.js
id: 327
updated: 2021-04-20 14:05:27
version: 1.24
---

For todays post on [three.js](https://threejs.org/) I thought I would write a quick post on the subject of arrow helpers. In three.js there are a number of built in helper methods than can be used to quickly create structures that helper to visualize what is going on with orientation of objects and other components of a threejs project, the arrow helper is one of these such methods. 

The [THREE.ArrowHelper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) constructor is one such helper that can be used for visualizing directions in three.js. So then it is a nice addition to work with when it comes to know what direction is what in a scene. These arrow helpers can be attached to the scene object, but also just about anything that inherits from the object32 class, so they can also be attached to a mesh, or an instance of a group.

So then in this post I will be going over some basic examples of arrow helpers, and the features to work with when it comes to such helpers. In the process I will also be touching base on some other threejs related topics that have to do with making the code of a threejs project a little more organized so it is not such a thin post as there is only so much to write about when it comes to the arrow helper.

<!-- more -->

## 1 - What to know

This is a post on using the built in arrow helpers in three.js to get a visual on directions in a three.js project. This is a fairly simple post but it is still not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone javaScript in general. So i assume that you have at least a little background when it comes to those topics and are just interested in reading more about how to use the library in new and interesting ways.

### 1.1 - Version numbers matter

When I first started this post I was using revision 98 of three.js, which was released in late October 2018. The last time I edited this post I was using revision revision 127 of threejs, and when it comes to the arrow helper at least it would seem that not much has changed. Still three.js is a project that is being developed, and at a fairly fast rate with new revisions continuing out what seems like every month almost. Although not much has changed with the arrow helper, a great deal has changed elsewhere in the library when I first started this post, and many of my other posts, and these changes can often result in code breaking. So if the code examples here break the first thing you should check is the version number of threejs that you are using.

### 2 - Basic Example of a ArrowHelper in threejs

So a basic example of an Arrow helper would involve setting a direction, origin, length, and color by passing those values to the THREE.ArrowHelper constructor in that order. 

The direction and origin should be insistences of THREE.Vector3 which is one of several constructors that you should be aware of when making a three.js project. I will not be getting into detail with this constructor here, but I have [wrote a post on vector three](/2018/04/15/threejs-vector3/) of course that you might want to check out if you have not done so.

The length should be a number value consistent with the desired length relative to the other values of the camera and objects in the scene, and the color should be a hex value, but can also be a number of other kinds of values depending on the version of tree.js that is being used. In late versions of three.js just about all of the usual options for setting color seem to work okay.

```js

// scene
var scene = new THREE.Scene();
 
// ARROW HELPER
var up = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(0, 2, 0).normalize(),
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);
scene.add(up);
 
// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0, 2.5, 2.5);
camera.lookAt(0, 0, 0);
 
// cube
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.render(scene, camera);
```

## 3 - Change direction example of the arrow helper method

It might also be of interest in how to go about changing direction of the arrow helper when working out an animation of some kind or anything to that effect. For this there is the setDirection method of the arrow helper instance that is one way to go about doing just that. To use it I just need to call the set direction method off of the instance of the arrow helper, and pass an instance of vector three to use as a way to set the new direction for the arrow helper.

```js

// scene
var scene = new THREE.Scene();

// ARROW HELPER
var arrow = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);
scene.add(arrow);

// camera
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
camera.position.set(0, 2.5, 2.5);
camera.lookAt(0, 0, 0);
 
// cube
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
 
// LOOP
var frame = 0,
maxFrame = 500,
loop = function () {
    requestAnimationFrame(loop);
    var per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);
 
    // can change the direction
    var dir = new THREE.Vector3(x, y, 0).normalize();
    arrow.setDirection(dir);
 
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
```

## 4 - Making a utility module to help abstract some things

While I was working out some new code for this post I thought I would take a moment to make a quick simple utility module as a way to abstract some things away, so that I can create, and add arrow helpers, and other parts of a scene with very little code. This might be a little off topic, but there really is only so much to write about when it comes to only the arrow helper alone. Also the use of the arrow helper might be part of something more that can be summed up as having ways to go about making things a little better organized. With that said maybe this is not so far off base then.

### 4.1 - The utility module

Here I have the utility method that I works out that has a bunch of methods that I can use to quickly create a basic scene alone with the other usual suspects such as a camera and a renderer.

```js
(function (utils) {
 
    // add arrow helper method
    utils.addArrow = function (obj3d, x, y, z, len, color) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 2 : y;
        z = z === undefined ? 0 : z;
        len = len === undefined ? 3 : len;
        color = color === undefined ? 0x00ff00 : color;
        var arrow = new THREE.ArrowHelper(
                new THREE.Vector3(x, y, z).normalize(),
                new THREE.Vector3(0, 0, 0),
                len,
                color);
        obj3d.add(arrow);
        return arrow;
    };
 
    // add cube helper method
    utils.addCube = function (obj3d, x, y, z, size, color, wireframe) {
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        z = z === undefined ? 0 : z;
        size = size === undefined ? 2 : size;
        var geometry = new THREE.BoxGeometry(size, size, size);
        var material = new THREE.MeshBasicMaterial({
                color: color === undefined ? 0x00ff00 : color,
                wireframe: wireframe === undefined ? true : wireframe
            });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        obj3d.add(cube);
        return cube;
    };
 
    // create a basic scene
    utils.createBasicScene = function () {
        // scene
        var scene = new THREE.Scene();
        // camera
        var camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
        camera.position.set(2.5, 2.5, 2.5);
        camera.lookAt(0, 0, 0);
        // RENDERER
        var renderer = new THREE.WebGLRenderer();
        document.getElementById('demo').appendChild(renderer.domElement);
        renderer.render(scene, camera);
        // return an object with refs to scene and other items of interest
        return {
            scene: scene,
            camera: camera,
            renderer: renderer,
            canvas: renderer.domElement,
            draw: function () {
                renderer.render(scene, camera);
            }
        };
    };
 
}
    (typeof utils === 'undefined' ? this['utils'] = {}
        : utils));
```

### 4.2 - A main.js file that makes use of this utility module

Not that I have this utility method I can link to after threejs has been loaded, at which point my main.js file can be just a little additional code.

```js
// basic scene
var sceneObj = utils.createBasicScene(),
scene = sceneObj.scene;
 
// ARROWS FOR SCENE
utils.addArrow(scene, 2, 0, 0, 3.2, 'lime');
utils.addArrow(scene, 0, 2, 0, 2.5, 'blue');
utils.addArrow(scene, 0, 0, 2, 2.7, 'cyan');
 
// cube
var cube = utils.addCube(scene, -2.5, 0, .5);
// ARROW FOR CUBE
utils.addArrow(cube, 0, 2, 0, 2.5, 'blue');
 
// render
sceneObj.draw();
```

## 5 - Conclusion

Thats all there is to it when it comes to arrow helpers in three.js for now at least. If you enjoyed this post you might want to check out my many other posts on three.js, with that a good starting point might be my main post on my current set of [threejs examples](/2021/02/19/threejs-examples/). Working out simple little examples that have to do with just using the arrow helper with a few simple built in geometries is one thing, but sooner or later it is time to start really getting into using threejs to have some fun making something real.

In any case thank you for reading this post, and I hope that you gained at least a little something from reading it.

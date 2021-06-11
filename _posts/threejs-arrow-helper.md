---
title: Arrow helpers in three.js
date: 2018-11-10 09:42:00
tags: [js,three.js]
layout: post
categories: three.js
id: 327
updated: 2021-06-11 12:08:08
version: 1.34
---

For todays post on [three.js](https://threejs.org/) I thought I would write a quick post on the subject of arrow helpers. In three.js there are a number of built in helper methods than can be used to quickly create structures that helper to visualize what is going on with orientation of objects and other components of a threejs project, the arrow helper is one of these such methods. 

The [THREE.ArrowHelper](https://threejs.org/docs/#api/en/helpers/ArrowHelper) constructor is one such helper that can be used for visualizing directions in three.js. So then it is a nice addition to work with when it comes to know what direction is what in a scene. These arrow helpers can be attached to the scene object, but also just about anything that inherits from the object32 class, so they can also be attached to a mesh, or an instance of a group.

So then in this post I will be going over some basic examples of arrow helpers, and the features to work with when it comes to such helpers. In the process I will also be touching base on some other threejs related topics that have to do with making the code of a threejs project a little more organized so it is not such a thin post as there is only so much to write about when it comes to the arrow helper.

<!-- more -->

## 1 - What to know

This is a post on using the built in arrow helpers in three.js to get a visual on directions in a three.js project. This is a fairly simple post, well at least when it comes to the very basics of using the constructor at least, but it is still not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone javaScript in general. So I assume that you have at least a little background when it comes to those topics and are just interested in reading more about how to use the library in new and interesting ways when it comes to helper methods, and all kinds of things that might branch off from there. So i will not be going over every little detail when it comes to the very basics, however in this section I will be going over a few things that you might want to know before continuing to read the rest of this post

### 1.1 - Make sure you are solid with some basic things first

If you are not familiar with the object3d class of threejs it might be a good idea to read up on that first, along with other classes that inherit from the object3d class which include mesh objects, groups, and many other objects in threejs. The reason why I say that is because an arrow helper can be attached to the main scene object, but it can also be attached to anything and everything that is based on object3d. So it would be a good idea to maybe [read up a little on object3d first](/2018/04/23/threejs-object3d/) of you have not done so before hand.

### 1.2 - Read up more on the Vector3 class and also what a Unit Vector is

If you have not done so before hand it might be a good idea to log some time getting a more solid grasp on everything there is to work with when it comes to the [Vector3 class](/2018/04/15/threejs-vector3/). Also while you are at it it might also be a good idea to learn about, or refresh your understanding of what a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) is in general. I say that because the use of the Vector3 class is closely related to the use of the Vector3 class and when it comes to setting the direction of an arrow helper I generally want to pass the arrow helper a normalized vector3 instance with a unit vector length of 1. Also it is important to know that the Vector3 normalize method will mutate the vector in place so you might want to call the clone method of a vector first and then normalize that clone.

### 1.3 - Version numbers matter

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

For this example I also set up a basic app loop where I am chaining the direction each time the app loop is called. the result is then the arrow pointing in all directions alone the circumference of a circle.

## 4 - Making a utility module to help abstract some things

While I was working out some new code for this post I thought I would take a moment to make a quick simple utility module as a way to abstract some things away, so that I can create, and add arrow helpers, and other parts of a scene with very little code. This might be a little off topic, but there really is only so much to write about when it comes to only the arrow helper alone. Also the use of the arrow helper might be part of something more that can be summed up as having ways to go about making things a little better organized. With that said maybe this is not so far off base then.

### 4.1 - The utility module

Here I have the utility method that I works out that has a bunch of methods that I can use to quickly create a basic scene along with the other usual suspects such as a camera and a renderer. So there is a create basic scene method that will just create a scene, and set it up with a camera and web gl renderer so I can just call this one method in a main javaScript file. Then I just need to add some mesh object to the scene, so for that I again have some methods that help make quick work of that.

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

Not that I have this utility method I can link to after threejs has been loaded, at which point my main.js file can be just a little additional code. One thing that is worth mentioning is that the arrow helper can be attached to anything that inherits from the object3d class in threejs, so I can bass the scene object as the first argument when calling my add arrow method, but I can also pass a mesh, or anything else that is based off of object3d.

With that said in this main javaScript file I am using the create basic scene method to create a basic scene along with a camera and renderer. After that I just need to add some things to the scene object and to do that I make use of my add arrow method. When doing so I can add arrow helpers to the scene object, but I can also add them to a mesh object such as a cube that I can add with the add cube method of the utility module.

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

## 5 - Moving an object along a direction

What about moving an object along a direction that is shared with the direction that is being pointed out with an arrow helper. That is having a Vector3 instance and having that vector normalized to a unit vector that has a length of one, and then using that normalized vector to position a mesh object along that direction. This might prove to be a decent exercise when it comes to getting a better grasp on the vector3 class and how various methods such as the Vector3 normalize can come into play and also how they work. The normalize method will mutate a vector3 instance in place actually, so in some cases I might want to create a clone from the vector3 and then normalized that clone actually.

```js
// NORAMIZED DIRECTION AS UNIT VECTOR
var V = new THREE.Vector3(1, 1, 0),
DIR = V.normalize(),
LENGTH = 3;
 
// scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
 
// ARROW HELPER
var arrow = new THREE.ArrowHelper(
        // first argument is the direction
        DIR,
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        LENGTH,
        // color
        0x00ff00);
scene.add(arrow);
 
// cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 'yellow'
        }));
scene.add(cube);
 
// camera, render
var camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.1, 1000);
camera.position.set(1.75, 2.5, 2.5);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
 
// LOOP
var frame = 0,
maxFrame = 90,
fps = 30,
lt = new Date();
// update
var update = function (secs, per, bias) {
    var x = DIR.x * LENGTH * per,
    y = DIR.y * LENGTH * per,
    z = DIR.z * LENGTH * per;
    cube.position.set(x, y, z);
    V.z = 5 * per; ;
    DIR = V.clone().normalize();
    arrow.setDirection(DIR);
};
// loop function
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs, per, bias)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
// start loop
loop();
```

## 6 - Conclusion

Thats all there is to it when it comes to arrow helpers in three.js for now at least. If you enjoyed this post you might want to check out my many other posts on three.js, with that a good starting point might be my main post on my current set of [threejs examples](/2021/02/19/threejs-examples/). Working out simple little examples that have to do with just using the arrow helper with a few simple built in geometries is one thing, but sooner or later it is time to start really getting into using threejs to have some fun making something real.

In any case thank you for reading this post, and I hope that you gained at least a little something from reading it.

---
title: Arrow helpers in three.js
date: 2018-11-10 09:42:00
tags: [js,three.js]
layout: post
categories: three.js
id: 327
updated: 2023-06-10 13:00:21
version: 1.46
---

When it comes to [threejs](https://threejs.org/) I thought I would write a quick post on the subject of [arrow helpers](https://threejs.org/docs/#api/en/helpers/ArrowHelper). In threejs there are a number of built in helper methods than can be used to quickly create objects that help to visualize what is going on with state of various components of a threejs project. The arrow helper is one of these such helper objects that can be used to find out what is going on with the direction of a [Vector3 class object](/2018/04/15/threejs-vector3/).

These arrow helper obuects are [Object3d class](/2018/04/23/threejs-object3d/) based objects, so that means that they can be attached to the [scene object](/2018/05/03/threejs-scene/), but also just about anything that inherits from the object32 class. So they can also be attached to a [mesh object](/2018/05/04/threejs-mesh/), an instance of a [group](/2018/05/16/threejs-grouping-mesh-objects/), or any object3d based class for that matter.

In this post I will be going over some basic examples of arrow helpers, and the features to work with when it comes to such objects. In the process I will also be touching base on some other threejs related topics that have to do with making the code of a threejs project a little more organized so it is not such a thin post as there is only so much to write about when it comes to the arrow helper.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/XW762oGXAZM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Arrow Helpers and What to know first

This is a post on using the built in arrow helpers in threejs to get a visual on directions in a threejs project. This is a fairly simple post, well at least when it comes to the very basics of using the constructor at least, but it is still not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone [javaScript in general](/2018/11/27/js-getting-started/). So I assume that you have at least a little background when it comes to those topics and are just interested in reading more about how to use the library in new and interesting ways when it comes to helper methods. So I will not be going over every little detail when it comes to the very basics. However I think it is still called for to go over a few things that you might want to know before continuing to read the rest of this post.

### Read up  ore on the object3d class

If you are not familiar with the [object3d class](/2018/04/23/threejs-object3d/) of threejs it might be a good idea to read up on that first. The Object3d class is a base class of Arrow Helpers, but it is also a Base class for any other kind of object that will be added as a child of a scene object, or any other Object3d based object. There is much ground to cover when it comes to object3d based objects, such as the [position](/2022/04/04/threejs-object3d-position/), and [rotation](/2022/04/08/threejs-object3d-rotation/) properties along with a whole lot more. So I do not want to repeat myself from one blog post to the next when it comes to Object3d based objects.

### Read up more on the Vector3 class and also what a Unit Vector is

If you have not done so before hand it might be a good idea to log some time getting a more solid grasp on everything there is to work with when it comes to the [Vector3 class](/2018/04/15/threejs-vector3/). Also while you are at there is also learning or refresh your understanding of what a [unit vector](https://en.wikipedia.org/wiki/Unit_vector) is in general outside that of threejs, and javaScript. I say that because the use of the Vector3 class is closely related to the use of the Vector3 class and when it comes to setting the direction of an arrow helper I generally want to pass the arrow helper a normalized vector3 instance with a unit vector length of 1. Also it is important to know that the [Vector3 normalize method](/2021/06/14/threejs-vector3-normalize/) will mutate the vector in place so you might want to call the clone method of a vector first and then normalize that clone.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can also be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-arrow-helper). This is also where I parke the source code examples for all of [my other blog posts on threejs](/categories/three-js/) as well.

### Version numbers matter

When I first started this post I was using revision 98 of threejs, which was released in late October 2018. The last time I edited this post I was using revision revision [146 of threejs, and updated the exmaples to be in line with the style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) that I have set for myself with that revision.

Threejs is a project that is being developed at a fairly fast rate with new revisions coming out what seems like every month almost. Although not much has changed with the arrow helper, a great deal has changed elsewhere in the library when I first started this post, and many of my other posts, and these changes can often result in code breaking. So if the code examples here break the first thing you should check is the version number of threejs that you are using.


## 1 - Some Basic examples of Arrow helpers in threejs

To start things off I will be writing about some basic examples of arrow helpers in threejs in this first section. The general idea is simple enough I just call the THREE.ArrowHelper constructor function and pass some arguments that are use to define the direction and origin of the arrow. There are a number of other arguments though, and also a few other things might not be so strait forward. So there will be a few examples in this section where the goal is to address many of these basic things that will come up when working with arrow helpers in threejs.

### 1.1 - Basic Example of a ArrowHelper in threejs

So a basic example of an Arrow helper would involve setting a direction, origin, length, and color by passing those values to the THREE.ArrowHelper constructor in that order. The direction and origin should be an instance of THREE.Vector3 which is one of several constructors that you should be aware of when making a threejs project. 

The length should be a number value consistent with the desired length of the arrow. Additional values have to do with setting the starting color of the arrow as well as the shape and size of the head of the arrow. However these options might not set everything that one might want to set when it comes to the over all style of the objects that compose the arrow. More on that later, but for now this will be just a very simple hello world type example of arrow helpers.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 1, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ARROW HELPER
//-------- ----------
scene.add( new THREE.ArrowHelper(
        new THREE.Vector3(0, 2, 0).normalize(),  // first argument is the direction
        new THREE.Vector3(0, 0, 0),              // second argument is the origin
        2.0,                                     // length
        0x00ff00));                              // color 
//-------- ----------
// RENDER SCENE WITH CAMERA 
//-------- ----------
renderer.render(scene, camera);
```

This is then just a simple getting started type example of the arrow helper where I just have a lime green arrow pointing upward from the origin of the scene. This is then more or less all that one will need to know then for the most part, however maybe it is called for to have at least a few more examples that have to to with changing these values over time.

### 1.2 - Change direction example of the arrow helper method

It might also be of interest in how to go about changing direction of the arrow helper when working out an animation of some kind or anything to that effect. For this there is the set direction method of the instance that is one way to go about doing a change of direction over time. To use it I just need to call the set direction method off of the instance of the arrow helper, and pass an instance of vector three to use as a way to set the new direction for the arrow helper.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ARROW HELPER
//-------- ----------
const arrow = new THREE.ArrowHelper(
        // first argument is the direction
        new THREE.Vector3(2, 2, 0).normalize(),
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        2.2,
        // color
        0x00ff00);
scene.add(arrow);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0;
const maxFrame = 500;
const loop = function () {
    requestAnimationFrame(loop);
    const per = frame / maxFrame,
    rad = Math.PI * 2 * per,
    x = Math.cos(rad),
    y = Math.sin(rad);
    // can change the direction
    const dir = new THREE.Vector3(x, y, 0).normalize();
    arrow.setDirection(dir);
    renderer.render(scene, camera);
    frame += 1;
    frame %= maxFrame;
};
loop();
```

For this example I the set up a basic app loop where I am chainging the direction each time the app loop method is called. The result is then the arrow pointing in all directions along the circumference of a circle.

### 1.3 - Moving an object along a direction

What about moving an object along a direction that is shared with the direction that is being pointed out with an arrow helper. That is having a Vector3 instance and having that vector normalized to a unit vector that has a length of one, and then using that normalized vector to position a mesh object along that direction. This might prove to be a decent exercise when it comes to getting a better grasp on the vector3 class and how various methods such as the Vector3 normalize can come into play and also how they work. The normalize method will mutate a vector3 instance in place actually, so in some cases I might want to create a clone from the vector3 and then normalized that clone actually.

```js
//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// NORAMIZED DIRECTION AS UNIT VECTOR
//-------- ----------
var V = new THREE.Vector3(1, 1, 0),
DIR = V.normalize(),
LENGTH = 3;
//-------- ----------
// ARROW HELPER
//-------- ----------
const arrow = new THREE.ArrowHelper(
        // first argument is the direction
        DIR,
        // second argument is the origin
        new THREE.Vector3(0, 0, 0),
        // length
        LENGTH,
        // color
        0x00ff00);
arrow.children[0].material.linewidth = 3;
scene.add(arrow);
//-------- ----------
// MESH OBJECT OF CUBE
//-------- ----------
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            wireframeLinewidth: 3,
            color: 'yellow'
        }));
scene.add(cube);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0, lt = new Date();
const maxFrame = 300, fps = 30;
// update
const update = function (secs) {
    const a1 = frame / maxFrame,
    a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    // updaing Vector
    V.z = -5 + 10 * a2;
    // UPDATING DIR Vector
    DIR = V.clone().normalize();
    // setting direction With DIR vector3 object
    arrow.setDirection(DIR);
    // setting position of the cube along the direction of the arrow
    // USING DIR Vector and LENGTH CONST with bias alpha
    const x = DIR.x * LENGTH * a2,
    y = DIR.y * LENGTH * a2,
    z = DIR.z * LENGTH * a2;
    cube.position.set(x, y, z);
    cube.lookAt(0, 0, 0);
    camera.position.z = z + 3;
};
// loop function
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(secs)
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
};
// start loop
loop();
```

So then when this example is up and running I have a cube that is moving along the distance of the arrow helper, and as I change the direction of the arrow helper that two in turn effects the position of the cube. It might be called for to work out a whole lot more examples based off of the basic idea that is going on here, but I think this might prove to be a decent starting point at least.


## 2 - Making a utility module to help abstract some things

While I was working out some new code for this post I thought I would take a moment to make a quick simple utility module as a way to abstract some things away, so that I can create, and add arrow helpers, and other parts of a scene with very little code. This might be a little off topic, but there really is only so much to write about when it comes to only the arrow helper alone. Also the use of the arrow helper might be part of something more that can be summed up as having ways to go about making things a little better organized. With that said maybe this is not so far off base then.

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
}(typeof utils === 'undefined' ? this['utils'] = {}: utils));
```

### 2.1 - A main.js file that makes use of this utility module

Not that I have this utility method I can link to after threejs has been loaded, at which point my main.js file can be just a little additional code. One thing that is worth mentioning is that the arrow helper can be attached to anything that inherits from the object3d class in threejs, so I can bass the scene object as the first argument when calling my add arrow method, but I can also pass a mesh, or anything else that is based off of object3d.

With that said in this main javaScript file I am using the create basic scene method to create a basic scene along with a camera and renderer. After that I just need to add some things to the scene object and to do that I make use of my add arrow method. When doing so I can add arrow helpers to the scene object, but I can also add them to a mesh object such as a cube that I can add with the add cube method of the utility module.

```js
// basic scene
var sceneObj = utils.createBasicScene(),
scene = sceneObj.scene;
scene.add( new THREE.GridHelper(10, 10) );
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

## Conclusion

Thats all there is to it when it comes to arrow helpers in three.js for now at least. If you enjoyed this post you might want to check out my many other posts on three.js, with that a good starting point might be my main post on my current set of [threejs examples](/2021/02/19/threejs-examples/). Working out simple little examples that have to do with just using the arrow helper with a few simple built in geometries is one thing, but sooner or later it is time to start really getting into using threejs to have some fun making something real.

In any case thank you for reading this post, and I hope that you gained at least a little something from reading it. In time I am sure that I will come around to expand this post even more with additional examples that Might help to better illustrate various things that branch off from the use of arrow helpers.

---
title: The Object3D Base Class in three.js
date: 2018-04-23 19:35:00
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 180
updated: 2021-05-06 12:25:31
version: 1.38
---

The [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) base class in [three.js](https://threejs.org/) is one of the most important classes to be aware of when making some kind of project involving three.js. It is in use in many objects in three.js including things like cameras, lights, and the the Mesh Objects that are placed in a Scene on top of the scene object itself also.

The Object3d class adds a whole bunch of common properties, and methods for any kind of object in a project that needs to have a position, and orientation in a scene. Properties of the Object3d class can be used to set the position, and rotation of an object along with many other common things that are shared across all such objects in a scene. Once you know a thing or two about the Object3D class the same methods and properties can be applied to any and all objects that inherent from this Object3D base class.

In this post I will be going over many of the basics of what the Object3d class is all about in three.js, there is working with the class directly. However more often than not it is a class that I am working with indirectly each time i want to move or rotate a camera, mesh object, or anything to that effect. In the process of going over the Object3d class I will also be touching base on many other classes that are important in three.js also, such as the [Vector3](/2018/04/15/threejs-vector3/) class and the [Euler Class](/2021/04/28/threejs-euler/).

<!-- more -->

## 1 - What to know before hand

This is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), or javaScript in general. This post is on an advanced topic on [three.js](/categories/three-js/) and I expect that you have some basic working knowledge of what there is to know before hand when it comes to the very basic of three.js and client side javaScript in general.

### 1.1 - Version Numbers matter with three.js big time

As with any post on three.js the version number matters a lot, when I first started this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I updated the post I was using [r127 of threejs](https://github.com/mrdoob/three.js/tree/r127). Three.js is a project in motion so if any code in this post or any other threejs post breaks it might very well be because of the version number that you are using. At least that is the first thing that you should check.

### 1.2 - Basic example of Object3d using the position property

Typically I do not work with the class directly, I work with something that inherits properties and methods from Object3d. Still if for some reason I want to work with the class directly I can do so via the THREE.Object3d constructor. When doing so I just call the constructor with the new keyword just like with any other constructor function in javaScript. The returned result of the constructor is then an instance of this object3d class.

```js
    // Object 3d position
    var obj3d = new THREE.Object3D();
 
    // {"x":0,"y":0,"z":0}
    console.log(JSON.stringify(obj3d.position));
 
    obj3d.position.set(3, 4, 5);
 
    // {"x":3,"y":4,"z":5}
    console.log(JSON.stringify(obj3d.position));
```

Here I made just a simple example where I am just playing with the position property, which is an instance of Vector3. Vector3 is yet another class in threejs that a developer should be familiar with as it has to do with a single point in 3d space, so it goes without saying that class will come up a lot also.

The position property of Object3d can be used to set the center point of the object in a Scene. In the case that the Object is a child of another object it would be the position relative to the parent Object.

## 3 - Rotation of an Object3d instance

Another property of the Object3D base class that I use often is the rotation property. This property expects an instance of the Euler Class, Which is the Class used in three.js that has anything to do with a set of [Euler Angles](https://en.wikipedia.org/wiki/Euler_angles). So when creating or changing the values of a Euler class instance there are three angles that need to be given in the form of a radian value between 0 and Math.PI \* 2. The set method of a Euler class instance can be used to set the values of these angles by passing three angle values for the Euler instance. Another way to set the value of a Euler class instance is to use the copy method that will set the values of the Euler class instance from which the copy method is called to the given Euler Class instance.

### 3.1 - Basic Object3d rotation example using set and copy of the Euler class

In this example I am directly creating an instance of Object3d, and then using the Euler set method to set some angles for the rotation of this instance of Object3d. I then create a full Mesh object which has Object3d as a base class, so there is a corresponding rotation property of the mesh object that also have an instance of Euler as the value. I then call the copy method of the rotation property of the mesh and pass the rotation property value to it, and the result is the mesh object being set to the same values as this instance of Object3d.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // OBJECT3D INSTANCE
    var obj = new THREE.Object3D();
    obj.rotation.set(0, 0, Math.PI * 1.75);
    // creating a mesh that has object3d as a base class
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    // copying OBJECT3d rotation property instance of Euler in obj 
    // to the instance of Euler the mesh
    mesh.rotation.copy(obj.rotation);
    scene.add(mesh);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
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

I will not get into the Euler Class in detail here, but it is similar to [Vector3](/2018/04/15/threejs-vector3/) only when using the set method you want to give [radians](https://en.wikipedia.org/wiki/Radian) rather than, and x, y, z position in the scene.

### 3.2 - Setting the Rotation by making use of the Object3d lookAt method

One very useful method of the [Object3d class is the lookAt method](https://threejs.org/docs/#api/en/core/Object3D.lookAt) which is another way to go about setting the rotation value of an instance of Objected or anything that is based on top of Object3d such as a Mesh object. The look at method can be passed three primitive values for a position in vector space, or an instance of Vector3 such as the position property of another object based off of object3d such as a Camera.

```js
(function () {
    // scene
    var scene = new THREE.Scene();

    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // making the mesh look at the position of the camera
    mesh.lookAt(camera.position);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

So then there is using the look at method, and then there is working directly with the instance of Euler. However in any case this is a major part of what the Object3d class is about. There is setting the position of an object, and then there is setting the orientation of an object.

### 3.3 - Basic spin animation example of a rotation

Now I think I should get into at least one or more simple animations that involve just playing around with the Euler instance of a Mesh object, or some other things that make use of the Object3d class and thus the rotation property of the class. To start off with maybe it would be good to just have a simple rotating or spinning cube animation example.

```js
(function () {
    // scene and grid helper
    var scene = new THREE.Scene();
    var gridHelper = new THREE.GridHelper(6, 6);
    scene.add(gridHelper);
 
    // box is a MESH base off of OBJECT3D
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshNormalMaterial());
    scene.add(box);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // state object
    var state = {
        frame: 0,
        maxFrame: 200,
        fps: 30,
        lt: new Date(),
        euler: new THREE.Euler(0, 0, 0)
    };
    // update
    var update = function (state, secs) {
        // DOING A SPIN ALONG THE Z AXIS
        state.euler.z = Math.PI * 8 * state.per;
        box.rotation.copy(state.euler);
    };
    // loop
    var loop = function () {
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        var now = new Date();
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            update(state, secs);
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
```

### 3.4 - An rotation animation making a mesh following a point moving up and down on the z axis

In this object3d rotation animation example I have an instance of vector3 in a state object along with many other little values that have to do with updating the state of an animation. This vector3 instance in the state object is juts having its z axis value move up and down along the z axis and that is it. I can then use that instance of verctor3 to set the position of a mesh object that has a sphere as a geometry. In addition sense this is a demo about rotation I can set the orientation of another mesh object of a box to look at this instance of vector3 with the lookAt method.

```js
(function () {
    // scene is based OFF of Object3D
    var scene = new THREE.Scene();
 
    // GRID HELPER IS ALSO BASED OFF OF OBJECT3D
    // so then I can use the scale property
    var gridHelper = new THREE.GridHelper(4, 4);
    gridHelper.scale.set(2.5, 2.5, 2.5);
    scene.add(gridHelper);
 
    // box is a MESH base off of OBJECT3D
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(box);
 
    // sphere is a MESH base off of OBJECT3D
    var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 20, 20),
            new THREE.MeshNormalMaterial());
    scene.add(sphere);
 
    // camera is based off of OBJECT3D
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // state object
    var state = {
        frame: 0,
        maxFrame: 100,
        fps: 30,
        lt: new Date(),
        vector: new THREE.Vector3(3, 0, 0) // and instance of vercor3
    };
    // update
    var update = function (state, secs) {
        state.vector.z = -5 + 10 * state.bias;
        // USING THE state.vector instance of Vector3 to set the position
        // of the sphere
        sphere.position.copy(state.vector);
        // and also making the box look at the state.vercor value
        box.lookAt(state.vector);
    };
    // loop
    var loop = function () {
        state.per = state.frame / state.maxFrame;
        state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
        var now = new Date();
        secs = (now - state.lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / state.fps) {
            update(state, secs);
            renderer.render(scene, camera);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            state.lt = now;
        }
    };
    loop();
}
    ());
```

So then this is where things can start to get a little run with it comes to playing around with rotation and position. There is not much to look at here, but it is a start at least when it comes to really getting up and running with three.js. When this demo is up and running a sphere is moving up and down along the z axis, and the box ends up facing that sphere. However there is doing much more with rotations than just having a box face another mesh.

## 4 - Examples of use in other constructors

There are many objects in three.js that inherit from object3D, which is why this is a good class to have a solid understanding of as it applies to a lot of different objects in three.js. When it comes to setting the position and orientation of a perspective camera for example the Object3d position property is the way to go about doing so. The Object3d look at method can also be used to set the rotation of the camera to look at a given point or object.

Camera's such as the perspective camera inherit from Object3D

```js
// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
// changing position of a camera
camera.position.set(3, 1, 3);
```

Anything that is contained in a mesh also inherits from the Object3d class.

```js
var low = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        emissive: 0x002a00
    }));
// changing position of a mesh
low.position.y = -1;
```

There are also various lights and helper objects also that all inherit from Object3d. So the Object3d class is a common class that can be used to move, and rotate any and all objects in a scene. 

## 5 - Full demo of Object3D that uses the class as a way to group

The [Three.Group](/2018/05/16/threejs-grouping-mesh-objects/) constructor also inherits from Object3d and is a way of grouping objects together into a collection. However the add method of Object3d is in all objects that inherit from Object3d, and as such grouping can be done with any such object, including just a stand alone instance of Object3d.

I try to make it a habit to have at least one copy and past working demo of what it is that I am writing about in each blog post of mine. In this demo I am making use of an instance of Object3D to group some cubes together. I am also working with many other objects that inherit from Object3D, using the position, and rotation properties often.

### 5.1 - A Create Cube Stack method

So I started off this example of Object3d by creating an createCubeStack helper method. This method will return an object that contains a group property that is what will be added to the scene later on, and also a set method that can be used to change the stack of the stack relative to a value between zero and one.

In this helper I am also using the [clone method of a mesh](/2019/12/18/threejs-mesh-copy/) to create a copy of an original mesh that is then mutated just slightly and then added to the group created with the Object3d constructor.

```js
// create cube stack method
var createCubeStack = function (original) {
    var stack = {},
    original = original || new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()),
    cube;
    // the group
    stack.group = new THREE.Object3D();
    // set method
    stack.set = function (per) {
        var bias = 1 - Math.abs(0.5 - per) / 0.5,
        arr = stack.group.children,
        len = arr.length;
        arr.forEach(function (cube, i) {
            var y = -len / 2 + i + 2 * bias;
            cube.position.set(0, y, 0);
            cube.rotation.set(0, Math.PI * 2 * (i / len) + Math.PI * 2 * per, 0);
        });
    };
    // create cubes for the group
    var i = 0,
    len = 3,
    per;
    while (i < len) {
        per = i / len;
        cube = original.clone();
        cube.position.set(0, -len / 2 + i, 0);
        cube.rotation.set(0, Math.PI * 2 * per, 0);
        stack.group.add(cube)
        i += 1;
    }
    return stack;
};
```

So now that I have a helper method worked out it would be nice to test it out with a scene, renderer, and main app loop, so lets take a look at that then.

### 5.2 - The rest of the Object3d example

So then here I have the rest of the example that makes use of the create cube stack helper. I create a scene, camera, and renderer just like with any threejs example. However I now use my create cube stack helper to create an cube stack object which contains a group property. That group property is then what I add to the scene, and the set method of the cube stack object is what I use to update the stack in a main app loop.

```js
// Scene
var scene = new THREE.Scene();
 
// Camera
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
 
var stack = createCubeStack();
 
scene.add(stack.group);
 
// Render
var renderer = new THREE.WebGLRenderer();
renderer.setSize(320, 240);
document.getElementById('demo').appendChild(renderer.domElement);
 
// loop
var frame = 0,
maxFrame = 100;
var loop = function () {
 
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
 
    stack.set(frame / maxFrame);
 
    frame += 1;
    frame = frame % maxFrame;
 
};
 
renderer.render(scene, camera);
loop();
```

When this example is up and running I get a stack of cubes rotating around and moving up and down. Thanks to the position, and rotation properties of the Object3d class.

It may be true that Object3D by itself is not intended to be used from grouping as there is a separate constructor for that, called simply enough [Group](https://threejs.org/docs/index.html#api/objects/Group). Still Object3D by itself seems to work okay by itself good enough for this simple demo on Object3D.

## 6 - Conclusion

From here you might choose to make some more demos that have to do with exercising the use of working with objects in three.js. There is working out some examples that involve using the rotation and position properties in an instance of a camera to change the position and orientation of a camera over time. If you enjoyed this post you might also like to check out my [many other posts](/categories/three-js/) on the subject of threejs.

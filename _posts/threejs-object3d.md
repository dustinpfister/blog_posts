---
title: The Object3D Base Class in three.js
date: 2018-04-23 19:35:00
tags: [three.js]
layout: post
categories: three.js
id: 180
updated: 2023-01-23 13:49:05
version: 1.62
---

The [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) base class in [threejs](https://threejs.org/) is one of the most important classes to be aware of when making some kind of project. It is the base class of mesh objects, but also just about every other kind of object that would be added to a scene object such as cameras, groups, lights, various helper objects and so forth. So then to learn a thing or two about object3d is also to learn a thing about all of those kinds of objects that I have mentioned. For example to set the position of a mesh object I need to use the the object3d position property to so so and the same is also true of cameras, groups, and so forth.

In this post I will be going over many of the basics of what the Object3d class is all about in threejs, when it comes to working with the class directly. However more often than not it is a class that I am working with indirectly each time I want to move or rotate a camera, mesh object, or anything to that effect that is based off the the object3d base class. In the process of going over the Object3d class I will also be touching base on many other classes that are important also, such as the [Vector3](/2018/04/15/threejs-vector3/) class and the [Euler Class](/2021/04/28/threejs-euler/) that are used as the values for many note worthy properties of this major base class.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/Hu-O_rzrAd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Object3d class and what to know before hand

This is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), or javaScript in general. So I assume that you are at least up to speed with getting a basic hello world style example of threejs up and working at least. However now that you have a very basic example working at least you might now be looking into what the next steps might be when it comes to learning more about the library. With that said the object3d class, and everything that branches off from this class might be a good thing to get solid with. Also even if you do have some experience with threejs learning a thing or two more about the object3d base class is still something that might need to happen now and then also as there is a lot to be aware of with this one.

### Source code examples are up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d) on Github. This is also a repo where I park the source code examples for my [many other threejs blog posts](/categories/three-js/) that I have wrote over the years. So there is a folder in the repo of this post, but also ever other post as well.

### Version Numbers matter with three.js big time

As with any post on threejs the version number matters a lot, when I first started this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I updated the post I was using [r135 of threejs](https://github.com/mrdoob/three.js/tree/r135). Threejs is a project in motion so if any code in this post or any other threejs post breaks it might very well be because of the version number that you are using, at least that is the first thing that you should check anyway.

## 1 - Basic object3d class examples

Another property of the Object3D base class that I use often is the rotation property. This property expects an instance of the Euler Class, Which is the Class used in three.js that has anything to do with a set of [Euler Angles](https://en.wikipedia.org/wiki/Euler_angles). So when creating or changing the values of a Euler class instance there are three angles that need to be given in the form of a radian value between 0 and Math.PI \* 2. 

The set method of a Euler class instance can be used to set the values of these angles by passing three angle values for the Euler instance. Another way to set the value of a Euler class instance is to use the copy method that will set the values of the Euler class instance from which the copy method is called to the given Euler Class instance. So then in this section I will be going over at least a few examples of rotation, but also position while I am at it also.

### 1.1 - A Very Basic example of Object3d using the position property

Typically I do not work with the object3d class directly, I work with something that inherits from Object3d such as a mesh object or group. Still if for some reason I want to work with the class directly I can do so via the THREE.Object3d constructor function. When doing so I just call the constructor with the new keyword just like with any other constructor function in javaScript. The returned result of the constructor is then an instance of this object3d class.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// Object3d
//-------- ----------
const obj3d = new THREE.Object3D();
console.log(JSON.stringify(obj3d.position)); // {"x":0,"y":0,"z":0}
obj3d.position.set(-3, 4, 4); 
console.log(JSON.stringify(obj3d.position)); // {"x":3,"y":4,"z":5}
//-------- ----------
// A mesh object is bassed off of Object3d
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshNormalMaterial() );
scene.add(mesh);
mesh.position.copy(obj3d.position);
//-------- ----------
// A Camera is also based on object3d
//-------- ----------
camera.position.set(15, 15, -15);
camera.lookAt(mesh.position);
//-------- ----------
// render static scene
//-------- ----------
renderer.render(scene, camera);
```

Here I made just a simple example where I am just playing with the [position property of the object3d class](/2022/04/04/threejs-object3d-position/), which is an instance of Vector3. Vector3 is yet another class in threejs that a developer should be familiar with as it has to do with a single point in 3d space, so it goes without saying that class will come up a lot also.

The position property of Object3d can be used to set the center point of the object in a Scene. In the case that the Object is a child of another object it would be the position relative to the parent Object.


### 1.2 - Basic Object3d rotation example using set and copy of the Euler class

In this example I am directly creating an instance of Object3d, and then using the Euler set method to set some angles for the rotation of this instance of Object3d. I then create a full Mesh object which has Object3d as a base class, so there is a corresponding rotation property of the mesh object that also have an instance of Euler as the value. I then call the copy method of the rotation property of the mesh and pass the rotation property value to it, and the result is the mesh object being set to the same values as this instance of Object3d.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECT3D INSTANCE
//-------- ----------
var obj = new THREE.Object3D();
obj.rotation.set(0, 0, Math.PI * 1.75);
//-------- ----------
// MESH
//-------- ----------
// creating a mesh that has object3d as a base class
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// copying OBJECT3d rotation property instance of Euler in obj 
// to the instance of Euler the mesh
mesh.rotation.copy(obj.rotation);
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2,2,2);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

I will not get into the Euler Class in detail here, but it is similar to [Vector3](/2018/04/15/threejs-vector3/) only when using the set method you want to give [radians](https://en.wikipedia.org/wiki/Radian) rather than, and x, y, z position in the scene.

### 1.3 - Setting the Rotation by making use of the Object3d lookAt method

One very useful method of the [Object3d class is the lookAt method](https://threejs.org/docs/#api/en/core/Object3D.lookAt) which is another way to go about setting the rotation value of an instance of Objected or anything that is based on top of Object3d such as a Mesh object. The look at method can be passed three primitive values for a position in vector space, or an instance of Vector3 such as the position property of another object based off of object3d such as a Camera.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
// making the mesh look at the position of the camera
mesh.lookAt(camera.position);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3,3,3);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

So then there is using the look at method, and then there is working directly with the instance of Euler. However in any case this is a major part of what the Object3d class is about. There is setting the position of an object, and then there is setting the orientation of an object.


## 2 - Examples of use in other constructors

There are many objects in three.js that inherit from object3D, which is why this is a good class to have a solid understanding of as it applies to a lot of different objects. When it comes to setting the position and orientation of a perspective camera for example the Object3d position and rotation properties is the way to go about doing so. The Object3d look at method can also be used to set the rotation of the camera to look at a given point or object. However all of this does not just apply to cameras, but all objects based off of object3d. So the look at method can be used to have a camera look at an mesh object, and the same method can also be used to make that mesh obect face the camera as well sense the look at method is a method of the object3d class.

In this section I will then be going over some source code examples that have to do with using object3d features in the various different kinds of objects that are based off of object3d.

### 2.1 - Camera objects are based off of object3d

The camera based class is based off of the object3d class, so when it comes to working with a camera such as the perspective camera I can use object3d features as a way to set the position and rotation of a camera.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
camera.position.set(10, 10, 10);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// mesh
//-------- ----------
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
// state object
const state = {
    frame: 0,
    maxFrame: 100,
    fps: 30,
    lt: new Date()
};
// UPDATING THE CAMERA WITH object3d properties and methods
const update = function (state, secs) {
    const e = new THREE.Euler();
    e.y = Math.PI * 0.25;
    e.x = Math.PI * 0.5 * -1 + Math.PI * 1.0 * state.bias;
    camera.position.copy( new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(10) );
    camera.lookAt(box.position)
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date();
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
```


### 2.2 - Mesh objects are based off of object3d

Mesh objects are also based off of the obejct3d class, in this example I am once again using the position property of a mesh object to set the position. Also I am making use of the look at method to make it so that the mesh object always faces the origin of the scene object.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS ARE BASED OFF OF OBJECT3D
//-------- ----------
const box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 5, 2),
        new THREE.MeshNormalMaterial());
scene.add(box);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(box.position);
// state object
const state = {
    frame: 0,
    maxFrame: 100,
    fps: 30,
    lt: new Date()
};
// UPDATING THE CAMERA WITH object3d properties and methods
const update = function (state, secs) {
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * state.per;
    e.x = Math.PI * 0.5 * Math.sin( Math.PI * 0.25 * state.bias );
    box.position.copy( new THREE.Vector3(1, 0, 0).applyEuler(e).normalize().multiplyScalar(3) );
    box.lookAt(0, 0, 0);
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date();
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
```

## 3 - Animaiton loop examples

In this section I will not be going over a few animation loop exmaples of the object3d class.

### 3.1 - Basic spin animation example of a rotation

Now I think I should get into at least one or more simple animations that involve just playing around with the Euler instance of a Mesh object, or some other things that make use of the Object3d class and thus the rotation property of the class. To start off with maybe it would be good to just have a simple rotating or spinning cube animation example.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
// box is a MESH base off of OBJECT3D
const box = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshNormalMaterial());
scene.add(box);
 
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
//-------- ----------
// LOOP
//-------- ----------
// state object
const state = {
    frame: 0,
    maxFrame: 200,
    fps: 30,
    lt: new Date(),
    euler: new THREE.Euler(0, 0, 0)
};
// update
const update = function (state, secs) {
    // DOING A SPIN ALONG THE Z AXIS
   state.euler.z = Math.PI * 8 * state.per;
   box.rotation.copy(state.euler);
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date(),
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
```

### 3.2 - An rotation animation making a mesh following a point moving up and down on the z axis

In this object3d rotation animation example I have an instance of vector3 in a state object along with many other little values that have to do with updating the state of an animation. This vector3 instance in the state object is juts having its z axis value move up and down along the z axis and that is it. I can then use that instance of verctor3 to set the position of a mesh object that has a sphere as a geometry. In addition sense this is a demo about rotation I can set the orientation of another mesh object of a box to look at this instance of vector3 with the lookAt method.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
// GRID HELPER IS ALSO BASED OFF OF OBJECT3D
// so then I can use the scale property
const gridHelper = new THREE.GridHelper(4, 4);
gridHelper.scale.set(2.5, 2.5, 2.5);
scene.add(gridHelper);
// box is a MESH base off of OBJECT3D
const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(box);
// sphere is a MESH base off of OBJECT3D
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 20, 20),
    new THREE.MeshNormalMaterial());
scene.add(sphere);
//-------- ----------
// loop
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
// state object
const state = {
    frame: 0,
    maxFrame: 100,
    fps: 30,
    lt: new Date(),
    vector: new THREE.Vector3(3, 0, 0) // and instance of vercor3
};
// update
const update = function (state, secs) {
    state.vector.z = -5 + 10 * state.bias;
    // USING THE state.vector instance of Vector3 to set the position
    // of the sphere
    sphere.position.copy(state.vector);
    // and also making the box look at the state.vercor value
    box.lookAt(state.vector);
};
// loop
const loop = function () {
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    const now = new Date(),
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
```

So then this is where things can start to get a little run with it comes to playing around with rotation and position. There is not much to look at here, but it is a start at least when it comes to really getting up and running with three.js. When this demo is up and running a sphere is moving up and down along the z axis, and the box ends up facing that sphere. However there is doing much more with rotations than just having a box face another mesh.

### 3.3 - Object3D loop exmaple that uses the class as a way to group

The [Three.Group](/2018/05/16/threejs-grouping-mesh-objects/) constructor also inherits from Object3d and is a way of grouping objects together into a collection. However the add method of Object3d is in all objects that inherit from Object3d, and as such grouping can be done with any such object, including just a stand alone instance of Object3d.

I try to make it a habit to have at least one copy and past working demo of what it is that I am writing about in each blog post of mine. In this demo I am making use of an instance of Object3D to group some cubes together. I am also working with many other objects that inherit from Object3D, using the position, and rotation properties often.

So I started off this example of Object3d by creating an createCubeStack helper method. This method will return an object that contains a group property that is what will be added to the scene later on, and also a set method that can be used to change the stack of the stack relative to a value between zero and one.

In this helper I am also using the [clone method of a mesh](/2019/12/18/threejs-mesh-copy/) to create a copy of an original mesh that is then mutated just slightly and then added to the group created with the Object3d constructor.

So now that I have a helper method worked out it would be nice to test it out with a scene, renderer, and main app loop, so lets take a look at that then.

So then here I have the rest of the example that makes use of the create cube stack helper. I create a scene, camera, and renderer just like with any threejs example. However I now use my create cube stack helper to create an cube stack object which contains a group property. That group property is then what I add to the scene, and the set method of the cube stack object is what I use to update the stack in a main app loop.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create cube stack method
const createCubeStack = function (original) {
    const stack = {};
    original = original || new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
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
    let i = 0,
    cube,
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
//-------- ----------
// STACK
//-------- ----------
const stack = createCubeStack();
scene.add(stack.group);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(5,5,5);
camera.lookAt(0,0,0);
let frame = 0,
maxFrame = 100;
const loop = function () {
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


## 4 - The name property of the Object3d class

Yet another note worthy aspect of the [Object3d class is the name property of the class](/2021/05/12/threejs-object3d-get-by-name/) as well as the get object by name method of Object3d. This name property is a way to set a unique name for an object, once that is done the get object by name method can be used as a way to gain a reference to the object at a later point in a body of javaScipt code.

## 5- Setting the Scale of an object

The [scale property](/2021/05/11/threejs-object3d-scale/) of an instance of Object3d contains and instance of Vector3 that can be used to change the scale of an object. By default the values for this vector3 instance are 1,1,1 but they can be changed to something like 2,2,2 which would cause the object to be scaled up to a size that is twice the side of the objects original size. So it would go without saying that this also proves to be a very useful property in the object3d class along with position and rotation.

## 6 - The user data object.

The [user data object](/2021/02/16/threejs-userdata/) is the standard go to object in an instance of Object3d that can be used to park user defined data. In other words when it comes to me making my own modules and applications based off of three.js and I want to append some data to an object in three.js this user data object is how I can go about doing so without messing up anything that three.js depends on.

## Conclusion

From here you might choose to make some more demos that have to do with exercising the use of working with objects in three.js. There is working out some examples that involve using the rotation and position properties in an instance of a camera to change the position and orientation of a camera over time. 

If you enjoyed this post you might also like to check out my [many other posts](/categories/three-js/) on the subject of threejs, or better yet by [post on my main three.js project examples](/2021/02/19/threejs-examples/) that I have made thus far. One example that I have made that [applies to object3d is my scene shake example](/2021/05/06/threejs-examples-scene-shake/), where I have a shake module that will shake the whole scene if I pass the scene object as the object to apply the shake to and I do not add the camera to the scene, however I can also pass anything that is based off of object3d also.

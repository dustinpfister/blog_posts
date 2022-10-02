---
title: The Box3 class in threejs.
date: 2022-05-09 08:57:00
tags: [js,three.js]
layout: post
categories: three.js
id: 985
updated: 2022-10-02 16:36:35
version: 1.19
---

The [box3 class in the javaScript library known as threejs](https://threejs.org/docs/#api/en/math/Box3) is a way to create a box in the from of a min and max instance of the Vector3 class. This Box can then be used for things like getting another Vector3 instance that is the size of the box. There is creating a new instance of the box3 class and then using that as a way to preform some kind of an action on an object such as scaling that object to the size of the instance of the box3 class. There is also creating an instance of box3 from an object that all ready exists in a scene, and doing something else with that kind of box such as suing it to position an object in space for example. There are many other use case examples of this class, so it goes without saying that I should write at least one if not a few posts on this class, so to start off with that I am writing this post.

<!-- more -->

## The Box3 class in threejs and what to know first

The content of this blog post has to do with a general overview of a single class in a javaScript library known as threejs. This is then not a [post intended for people that have no experience at all with threejs](/2018/04/04/threejs-getting-started/), let alone with [javaScript in general](/2018/11/27/js-getting-started/). You should have some background with javaScript and client side web development in general, also there are a lot of additional things you should be aware of with threejs also. I will not be getting into detail with everything that you should be aware of at this point, but I often use this first section to quickly mention some things you might want to read up more on before hand if you have not done so.

<iframe class="youtube_video" src="https://www.youtube.com/embed/9H3OmGlsdzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Check out the Vector3 class

In order to create an instance of the THREE.Box3 [constructor function](/2019/02/27/js-javascript-constructor/) in threejs from scratch at least I will need to pass two instances of [the Vector3 class](/2018/04/15/threejs-vector3/). This is a class that one should look into further as it will come up a whole lot and not just when it comes to using the Box3 class. The Vector3 class is also used to set the position and scale of objects, and can also be used to create custom geometries, arrays of points, as well as many other various tasks that have to do with 3d space in general.

### Mesh objects, groups, and Object3D

The use of the Box3 class also has a lot to do with Mesh objects, Groups, and a whole lot of other objects based on the [Object3d class](/2018/04/23/threejs-object3d/). For example one major use case of the Box3 class would be to use it to set the position of a mesh object within the space of a BOX3 class. The way to do so would be by way of the [position property of the object3d class](/2022/04/04/threejs-object3d-position/). There are also a number of other properties of object3d that one should be aware of such as scale and rotation just to name a few.

### Version numbers matter

When I first wrote this post I was using r135 of threejs, and the last time I came around to do a little editing here I was using r140.

### Source code is on Github

I have the source code examples in this post parked in [my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box3).

## 1 - Basic gettting started examples of the box3 class

In this section I will be starting out with some basic examples of the box3 class. There are a number of ways to get a box3 class object, such as just directly calling the constructor function and passing vector3 object for the min and max values. However there are also ways of setting the values from various objects and attributes as well as methods of other classes the will create an instance of this kind of object. So in this section I will be taking a look at some of the ways to get a box3 to begin with, as well as what can be done with them, and some additional related examples that are not to complex.

### 1.1 - Set the position of a mesh object with box3

For this example I am using the values of a box3 class as a way to directly set the positions of mesh objects. When it comes to this kind of thing the min and max properties of the box3 object are instances of Vector3. So then I can use vector3 class methods like copy to just direct copy the min and max values to the position properties of a mesh or anything based off of object3d. However for this example I will be using the set method with specific values and setting a number literal for the y axis.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5))
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE A NEW BOX3
//-------- ----------
const min = new THREE.Vector3(-2.5, -2.5, -2.5);
const max = new THREE.Vector3(2.5, 2.5, 2.5);
const box3 = new THREE.Box3(min, max);
//-------- ----------
// MESH - position with box3 values
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.position.set(box3.min.x, 0, box3.min.z );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Get size and scaling a mesh object with the Box3 class 

I have wrote a [post a while back on the scale property of the object3d class](/2021/05/11/threejs-object3d-scale/) which is a way to go about setting the scale of any object based off of object3d, such as a Mesh object, or a Group object for example. This scale property contains an instance of the Vector3 class that by default should have a value of 1,1,1 which means the normal scale of the object. As one would expect by changing these values up or down that will change the scale up and down.

Anyway one basic use case example of the THREE.Box3 class would be to use it to create an instance of Box3 from scratch by creating two Vector3 instances for the min and max arguments of the Box3 constructor function. The get size method of the Box3 class can then be used to copy values to a Vector3 that are the size of the box, this in turn can be used with the copy method of the Vector3 class to set the scale property of a mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE A NEW BOX3
//-------- ----------
const min = new THREE.Vector3(-0.5, -0.75, -1.125);
const max = new THREE.Vector3(0.125, 0.25, 0.5);
const box3 = new THREE.Box3(min, max);
// THE GET SIZE METHOD OF BOX 3
// can be used to copy a size to a Vector3 instance
const s = new THREE.Vector3();
box3.getSize(s);
//-------- ----------
// MESH
//-------- ----------
// I CAN THEN USE THAT SIZE VECTOR TO DO
// SOMETHING LIKE SCALING A MESH OBJECT
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.scale.copy(s);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.3 - Creating a BOX3 from a mesh, and using that to set the position of the mesh

Some times I might not want to set the size of an object from a BOX3 but rather create a Box3 from an object, and then use that BOX3 to know how to position an object relative to the ground, or some point of interest. When it comes to an instance of buffer geometry there is a method of geometry called the compute bounding box method that will create a box3 instance for the bounding box property of the geometry. So then say that I have an object and I want to know how high it is so that I can set the y position of this object to one half of this height. One way to go about doing this would be to make use of the compute bounding box method, and then use get size method of Box3 to get a Vector that I can then use to set the position property of the mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10))
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0.4, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
//-------- ----------
// BOX3 by way of bufferGeometry.computeBoudningBox
//-------- ----------
// UISNG COMPUTE BOUNDING BOX OF THE GEOMETRY
// TO CREATE A BOX3 for the mesh at the boundingBox
// property of the geometry
mesh.geometry.computeBoundingBox();
// GETTING SIZE
const s = new THREE.Vector3();
const box3 = mesh.geometry.boundingBox;
box3.getSize(s);
// USING SIZE VECTOR3 to set Y position of mesh
mesh.position.y = s.y / 2;
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.4 - Box3 helper

Like that of the box helper that can be used with mesh objects and any object that is based off of the object3d class, there is also a box3 helper that will do the same thing more or less but work with Box3 class objects.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX3, BOX3 Helper
//-------- ----------
const min = new THREE.Vector3(-0.5, -0.75, -1.125);
const max = new THREE.Vector3(0.125, 0.25, 0.5);
const box3 = new THREE.Box3(min, max);
// THE BOX3 HELPER
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Seeded random example

This example involves positioning a bunch of mesh objects inside the bounds of an instance of the Box3 class. While I am at it I can also take a moment to mention the [seeded random method of the math utils objects of threejs](/2022/04/11/threejs-math-utils/). As you might expect this seeded random method works like that of the [math random method in core javaScript](/2020/04/21/js-math-random/), but it will result in the same value each time I reload the page.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(-2, 0.5, 4);
camera.lookAt(0, -0.25, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// set axis helper
const setAxis = function(mesh, box3, axis, per){
    // get mesh size
    const meshSize = new THREE.Vector3();
    mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox.getSize(meshSize);
    // get box size
    const boxSize = new THREE.Vector3();
    box3.getSize(boxSize);
    mesh.position[axis] = box3.min[axis] + meshSize[axis] / 2  + ( boxSize[axis] - meshSize[axis] ) * per;
};
// rnd
const rnd = function(){
    return THREE.MathUtils.seededRandom();
};
//-------- ----------
// BOX3
//-------- ----------
// create a new box3 with helper
const min = new THREE.Vector3(-1.0, -1.0, -1.0);
const max = new THREE.Vector3(1.0, 1.0, 1.0);
const box3 = new THREE.Box3(min, max);
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// MESH OBJECTS
//-------- ----------
// CREATE AND POSITION MESH OBJECTS IN THE BOX
let i = 0; 
const len = 80;
while(i < len){
    const w = 0.5 + 0.75 * rnd(),
    h = 0.5 + 0.75 * rnd(),
    d = 0.5 + 0.75 * rnd();
    const mesh = new THREE.Mesh( 
        new THREE.BoxGeometry(w, h, d), 
        new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.25
        }) 
    );
    setAxis(mesh, box3, 'x', rnd());
    setAxis(mesh, box3, 'y', rnd());
    setAxis(mesh, box3, 'z', rnd());
    scene.add(mesh);
    i += 1;
};
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## Conclusion

The Box3 class is then a useful tool for various tasks what will come up when working with a project. It can be used to create a box by way of two vectors and then that box can be used as a way to scale or position an object in all kinds of various ways. I can also use it to create a box from an object that all ready has a set of values that I want with size, but I just want to get a vector that reflects what that size is so that I know to go about positing it.

I am sure that there will be many more use case examples of this box3 class that will come up now and then. I do make an effort to edit my content, so I am sure that I will expand this post a bit more as I get around to fining or making more examples to write about here.


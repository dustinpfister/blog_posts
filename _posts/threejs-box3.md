---
title: The Box3 class in threejs.
date: 2022-05-09 08:57:00
tags: [js,three.js]
layout: post
categories: three.js
id: 985
updated: 2022-05-10 10:58:58
version: 1.14
---

The [box3 class in the javaScript library known as threejs](https://threejs.org/docs/#api/en/math/Box3) is a way to create a box in the from of a min and max instance of the Vector3 class. This Box can then be used for things like getting another Vector3 instance that is the size of the box. There is creating a new instance of the box3 class and then using that as a way to preform some kind of an action on an object such as scaling that object to the size of the instance of the box3 class. There is also creating an instance of box3 from an object that all ready exists in a scene, and doing something else with that kind of box such as suing it to position an object in space for example. There are many other use case examples of this class, so it goes without saying that I should write at least one if not a few posts on this class, so to start off with that I am writing this post.

<!-- more -->

## The Box3 class in threejs and what to know first

The content of this blog post has to do with a general overview of a single class in a javaScript library known as threejs. This is then not a [post intended for people that have no experience at all with threejs](/2018/04/04/threejs-getting-started/), let alone with [javaScript in general](/2018/11/27/js-getting-started/). You should have some background with javaScript and client side web development in general, also there are a lot of additional things you should be aware of with threejs also. I will not be getting into detail with everything that you should be aware of at this point, but I often use this first section to quickly mention some things you might want to read up more on before hand if you have not done so.

<iframe class="youtube_video" src="https://www.youtube.com/embed/9H3OmGlsdzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
### Check out the Vector3 class

In order to create an instance of the THREE.Box3 [constructor function](/2019/02/27/js-javascript-constructor/) in threejs from scratch at least I will need to pass two instances of [the Vector3 class](/2018/04/15/threejs-vector3/). This is a class that one should look into further as it will come up a whole lot and not just when it comes to using the Box3 class. The Vector3 class is also used to set the position and scale of objects, and can also be used to create custom geometers, arrays of points, as well as many other various tasks that have to do with 3d space in general.

### Mesh objects, groups, and Object3D

The use of the Box3 class also has a lot to do with Mesh objects, Groups, and a whole lot of other objects based on the [Object3d class](/2018/04/23/threejs-object3d/). For example one major use case of the Box3 class would be to use it to set the position of a mesh object within the space of a BOX3 class. The way to do so would be by way of the [position property of the object3d class](/2022/04/04/threejs-object3d-position/). There are also a number of other properties of object3d that one should be aware of such as scale and rotation just to name a few.

### Version numbers matter

When I first wrote this post I was using r135 of threejs.

### Source code is on Github

I have the source code examples in this post parked in [my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box3).

## 1 - Basic scaling a mesh object example of the Box3 class 

I have wrote a [post a while back on the scale property of the object3d class](/2021/05/11/threejs-object3d-scale/) which is a way to go about setting the scale of any object based off of object3d, such as a Mesh object, or a Group object for example. This scale property contains an instance of the Vector3 class that by default should have a value of 1,1,1 which means the normal scale of the object. As one would expect by changing these values up or down that will change the scale up and down.

Anyway one basic use case example of the THREE.Box3 class would be to use it to create an instance of Box3 from scratch by creating two Vector3 instances for the min and max arguments of the Box3 constructor function. The get size method of the Box3 class can then be used to copy values to a Vector3 that are the size of the box, this in turn can be used with the copy method of the Vector3 class to set the scale property of a mesh object.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// CREATE A NEW BOX3
var min = new THREE.Vector3(-0.5, -0.75, -1.125),
max = new THREE.Vector3(0.125, 0.25, 0.5);
var box3 = new THREE.Box3(min, max);
// THE GET SIZE METHOD OF BOX 3
// can be used to copy a size to a Vector3 instance
var s = new THREE.Vector3();
box3.getSize(s);
// I CAN THEN USE THAT SIZE VECTOR TO DO
// SOMETHING LIKE SCALING A MESH OBJECT
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.scale.copy(s);
// render
renderer.render(scene, camera);
```

## 2 - Creating a BOX3 from a mesh, and suing that to set the position of the mesh

Some times I might not want to set the size of an object from a BOX3 but rather create a Box3 from an object, and then use that BOX3 to know how to position an object relative to the ground, or some point of interest. When it comes to an instance of buffer geometry there is a method of geometry called the compute bounding box method that will create a box3 instance for the bounding box property of the geometry. So then say that I have an object and I want to know how high it is so that I can set the y position of this object to one half of this height. One way to go about doing this would be to make use of the compute bounding box method, and then use get size method of Box3 to get a Vector that I can then use to set the position property of the mesh object.

```js
var scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10))
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0.4, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// mesh object
var mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// UISNG COMPUTE BOUNDING BOX OF THE GEOMETRY
// TO CREATE A BOX3 for the mesh at the boundingBox
// property of the geometry
mesh.geometry.computeBoundingBox();
// GETTING SIZE
var s = new THREE.Vector3();
var box3 = mesh.geometry.boundingBox;
box3.getSize(s);
// USING SIZE VECTOR3 to set Y position of mesh
mesh.position.y = s.y / 2;
scene.add(mesh);
// render
renderer.render(scene, camera);
```

## 3 - Box3 helper

Like that of the box helper that can be used with mesh objects and any object that is based off of the object3d class, there is also a box3 helper that will do the same thing more or less but work with Box3 class objects.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// create a new box3
var min = new THREE.Vector3(-0.5, -0.75, -1.125),
max = new THREE.Vector3(0.125, 0.25, 0.5);
var box3 = new THREE.Box3(min, max);
// THE BOX3 HELPER
var box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
// render
renderer.render(scene, camera);
```

## 4 - Seeded random example

This example involves positioning a bunch of mesh objects inside the bounds of an instance of the Box3 class. While I am at it I can also take a moment to mention the seeded random method of the math utils objects of threejs. As you might expect this seeded random method works like that of the math random method in core javaScript, but it will result in the same value each time I reload the page.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(-2, 0.5, 4);
camera.lookAt(0, -0.25, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
// create a new box3 with helper
var min = new THREE.Vector3(-1.0, -1.0, -1.0),
max = new THREE.Vector3(1.0, 1.0, 1.0);
var box3 = new THREE.Box3(min, max);
var box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
// HELPER FUNCTIONS
var setAxis = function(mesh, box3, axis, per){
    var meshSize = new THREE.Vector3()
    mesh.geometry.boundingBox.getSize(meshSize);
    mesh.position[axis] = box3.min[axis] + meshSize[axis] / 2  + ( boxSize[axis] - meshSize[axis] ) * per;
};
var rnd1 = function(){
    return Math.random();
};
var rnd2 = function(){
    return THREE.MathUtils.seededRandom();
};
// CREATE AND POSITION MESH OBJECTS IN THE BOX
var i = 0, len = 10;
while(i < len){
    var w = 0.2 + 0.3 * rnd2(),
    h = 0.2,
    d = 0.2 + 0.8 * rnd2()
    var mesh = new THREE.Mesh( 
        new THREE.BoxGeometry(w, h, d), 
        new THREE.MeshNormalMaterial({
            transparent: true,
            opacity: 0.25
        }) 
    );
    // get box size
    var boxSize = new THREE.Vector3();
    box3.getSize(boxSize);
    // get mesh size
    mesh.geometry.computeBoundingBox();
    setAxis(mesh, box3, 'x', rnd2());
    setAxis(mesh, box3, 'y', rnd2());
    setAxis(mesh, box3, 'z', rnd1());
    scene.add(mesh);
    i += 1;
};
// render
renderer.render(scene, camera);
```

## Conclusion

The Box3 class is then a useful tool for various tasks what will come up when working with a project. It can be used to create a box by way of two vectors and then that box can be used as a way to scale or position an object in all kinds of various ways. I can also use it to create a box from an object that all ready has a set of values that I want with size, but I just want to get a vector that reflects what that size is so that I know to go about positing it.

I am sure that there will be many more use case examples of this box3 class that will come up now and then. I do make an effort to edit my content, so I am sure that I will expand this post a bit more as I get around to fining or making more examples to write about here.
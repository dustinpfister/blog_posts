---
title: The Box3 class in threejs.
date: 2022-05-09 08:57:00
tags: [js,three.js]
layout: post
categories: three.js
id: 985
updated: 2023-05-23 10:29:07
version: 1.27
---

The [box3 class in the javaScript library known as threejs](https://threejs.org/docs/#api/en/math/Box3) is a way to create a box in the from of a min and max values in the form of [vector3 class objects](https://threejs.org/docs/#api/en/math/Vector3). This Box can then be used for things like getting another Vector3 instance that is the size of the box. This size vector3 can then be used for things like setting the scale of a mesh object to the size vector. There are just about all kinds of other usfule use case examples of the Box3 class beyond that of course but one still does have to start somewhere.

With that said in this post I will be starting out with a number of examples that have to do with typical use cases of this Box3 class.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/9H3OmGlsdzc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Box3 class in threejs and what to know first

The content of this blog post has to do with a general overview of a single class called Box3 in a javaScript library known as threejs. This is then not a [post intended for people that have no experience at all with threejs](/2018/04/04/threejs-getting-started/), let alone with [javaScript in general](/2018/11/27/js-getting-started/). I will not be getting into detail with everything that you should be aware of at this point, but I often use this first section to quickly mention some things you might want to read up on before hand. For example in order to even create a Box3 class at all to begin with directly at least one will need to Vector3 objects to begin with.

### Check out the Vector3 class

In order to create an instance of the THREE.Box3 [constructor function](/2019/02/27/js-javascript-constructor/) in threejs from scratch at least I will need to pass two instances of [the Vector3 class](/2018/04/15/threejs-vector3/) to the Box3 constructor function as arguments. This is a class that one should look into further as it will come up a whole lot and not just when it comes to using the Box3 class, but in general with many threejs features. For example the Vector3 class is also used to set the position and scale of objects, and can also be used to create custom geometries, arrays of points, as well as many other various tasks that have to do with 3d space in general.

### Mesh objects, groups, and Object3D

The use of the Box3 class also has a lot to do with [Mesh objects](/2018/05/04/threejs-mesh), [Groups](/2018/05/16/threejs-grouping-mesh-objects/), and a whole lot of other objects based on the [Object3d class](/2018/04/23/threejs-object3d/). For example one major use case of the Box3 class would be to use it to set the position of a mesh object within the space of a BOX3 class. The way to do so would be by way of the [position property of the object3d class](/2022/04/04/threejs-object3d-position/). There are also a number of other properties of object3d that one should be aware of such as scale and rotation just to name a few.

### The Buffer Geometry Compute Bounding Box method

When it comes to buffer geometry there is the [Compute Bounidng Box method](/2022/10/07/threejs-buffer-geometry-compute-bounding-box/) of that class that can be used to create an update an instance of the Box3 class that will then be set to the bounding box property of the buffer geometry instance. In this post I might cover a few example of this method of buffer geometry, however the focus is more so on The Box3 class alone here.

### Source code is on Github

I have the source code examples in this post parked in [my test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-box3). This is also where I have the source code exmaples for my [many other posts on threejs](/categories/three-js/).

### Version numbers matter

When I first wrote this post I was using r135 of threejs, and the last time I came around to do a little editing here I was using r146 when updating the source code of these demos.


## 1 - Basic gettting started examples of the box3 class

In this section I will be starting out with some basic examples of the box3 class. There are a number of ways to get a box3 class object, such as just directly calling the constructor function and passing vector3 objects for the min and max values. However there are also ways of setting the values from various objects and attributes as well as methods of other classes the will create an instance of this kind of object. So in this section I will be taking a look at some of the ways to get a box3 to begin with, as well as what can be done with them, and some additional related examples that are not to complex.

### 1.1 - Set the position of a mesh object with box3

For this example I am using the values of a box3 class as a way to directly set the positions of mesh objects in a scene. To so this I create vector3 objects for a min and max values that define the lowest and highest corners of the box area. I can then just call the THREE.Box3 constructor function and pass the min vector3 and then the max one. The returned result will then be an instance of the Box3 class that I can use to help with all kinds of things.

When I have a box3 class object I can still access the vector3 objects that are used to define the min and max points in space. There is just simply the min and max properties of the box3 class that can be used to access these values. So then one way to set the position of mesh objects with a box3 object would be to just use the Vector3 set or copy method with these vector3 objects.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5))
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE A NEW BOX3
//-------- ----------
const box3 = new THREE.Box3(
    new THREE.Vector3(-2.5, -2.5, -2.5),
    new THREE.Vector3(2.5, 2.5, 2.5));
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
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
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
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE A NEW BOX3
//-------- ----------
const v_min = new THREE.Vector3(0, 0, 0);
const x = 1 / 12 * 4;
const y = 1 / 12 * 2;
const z = 8;
const v_max = new THREE.Vector3(x, y, z);

const box3 = new THREE.Box3(v_min, v_max);
// THE GET SIZE METHOD OF BOX 3
// can be used to copy a size to a Vector3 instance
const v_size = new THREE.Vector3();
box3.getSize(v_size);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// I CAN THEN USE THAT SIZE VECTOR TO DO
// SOMETHING LIKE SCALING A MESH OBJECT TO THE SIZE
// OF THE BOX
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.scale.copy(v_size);
// grid helper
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

### 1.3 - Creating a BOX3 from a mesh, and using that to set the position of the mesh

Some times I might not want to set the size of an object from a BOX3 but rather create a Box3 from an object, and then use that BOX3 to know how to position an object relative to the ground, or some point of interest. When it comes to an instance of buffer geometry there is a method of geometry called the compute bounding box method that will create a box3 instance for the bounding box property of the geometry. So then say that I have an object and I want to know how high it is so that I can set the y position of this object to one half of this height. One way to go about doing this would be to make use of the compute bounding box method, and then use get size method of Box3 to get a Vector that I can then use to set the position property of the mesh object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// SCENE CHILD OBJECTS
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
// grid helper
scene.add( new THREE.GridHelper(10, 10))
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, 0.4, 0);
renderer.render(scene, camera);
```

### 1.4 - Box3 helper

Like that of the box helper that can be used with mesh objects and any object that is based off of the object3d class, there is also a box3 helper that will do the same thing more or less but work with Box3 class objects. To use this I just need to call the THREE.Box3Helper constructor and then just pass the box3 object that I want a helper for. I can then pass an additional argument if I want to set what the color of the lines should be for the helper. After that I can add the helper to a scene object just like that of any other objct3d based object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
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
camera.position.set(1.25, 1.25, 1.25);
camera.lookAt(0, -0.125, 0);
renderer.render(scene, camera);
```

### 1.5 - Set from object3d object in general such as a group of mesh objects

In this basic section I did cover an example where I was creating an instance of box3 from a single mesh object thanks to the compute bounding box method of the buffer geometry of the mesh object. However what if I have a whole bunch of mesh objects in a group, or if I want a box3 for everything n in a whole scene object. Well for this wort of thing there is making use of the set from object method of the box3 class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX3, BOX3 Helper
//-------- ----------
const box3 = new THREE.Box3();
// THE BOX3 HELPER
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// GROUP AND SET BY OBJECT
//-------- ----------
const group = new THREE.Group();
let i = 0;
const len = 3;
while(i < len){
    const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial() );
    mesh.position.x = -2.5 + 5 * Math.random();
    mesh.position.y = -2.5 + 5 * Math.random();
    mesh.position.z = -2.5 + 5 * Math.random();
    group.add(mesh);
    i += 1;
}
scene.add(group);
box3.setFromObject(group);
// grid helper
scene.add( new THREE.GridHelper(5, 5, 5));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 8);
camera.lookAt(0, -0.8, 0);
renderer.render(scene, camera);
```

### 1.6 - The intersects box method

One of the major functions of the box3 class is to check if two objects overlap each other or not. For this kind of task there is the intersects box method. For this example I am making a main box3 object and the I am creating a whole bunch of mesh objects. For each mesh object I am then also creating a box3 object for the mesh by using the set from object method. I then call the intersects box method off of the box3 for each mesh and then pass the main box3 object as the first and only argument. The result value of the intersects box method is then true or false depending the two box3 objects intersect or not. I can then use this value with an if statement and then set the color of the material to lime if the mesh is inside the main box, else leave it to the default red color if it is not.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BOX3, BOX3 Helper
//-------- ----------
const box3 = new THREE.Box3(
   new THREE.Vector3(-2, -2, -2),
   new THREE.Vector3(2, 2, 2)
);
// THE BOX3 HELPER
const box3Helper = new THREE.Box3Helper(box3, 0x00ff00);
box3Helper.material.linewidth = 3;
scene.add(box3Helper);
//-------- ----------
// GROUP AND SET BY OBJECT
//-------- ----------
const group = new THREE.Group();
let i = 0;
const len = 40;
while(i < len){
    const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 0, 0),
        transparent: true,
        opacity: 0.5
    });
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        material);
    mesh.position.x = -4 + 8 * Math.random();
    mesh.position.y = -4 + 8 * Math.random();
    mesh.position.z = -4 + 8 * Math.random();
    // box3 for the mesh object
    const mesh_b3 = new THREE.Box3();
    mesh_b3.setFromObject(mesh)
    if( mesh_b3.intersectsBox( box3 ) ) {
        mesh.material.color = new THREE.Color(0, 1, 0);
    }
    group.add(mesh);
    i += 1;
}
scene.add(group);
// grid helper
scene.add( new THREE.GridHelper(4, 4, 0xffffff, 0x008800 ));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 8, 10);
camera.lookAt(0, -0.8, 0);
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
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
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
camera.position.set(-2, 0.5, 4);
camera.lookAt(0, -0.25, 0);
renderer.render(scene, camera);
```

## Conclusion

The Box3 class is then a useful tool for various tasks what will come up when working with a project. It can be used to create a box by way of two vectors and then that box can be used as a way to scale or position an object in all kinds of various ways. I can also use it to create a box from an object that all ready has a set of values that I want with size, but I just want to get a vector that reflects what that size is so that I know to go about positing it.

I am sure that there will be many more use case examples of this box3 class that will come up now and then. I do make an effort to edit my content, so I am sure that I will expand this post a bit more as I get around to fining or making more examples to write about here.


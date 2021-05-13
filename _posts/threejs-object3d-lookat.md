---
title: The Look At method in three.js
date: 2021-05-13 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 866
updated: 2021-05-13 15:40:04
version: 1.16
---

I thought that I knew everything I needed to know about the [object3d class look at](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), but it turns out that there is a little more to it at least when it comes to some things that branch off from the method. Using the look at method is fairly straight forward I just call the method off of some kind of object in three.js that is based off of the object3d class and then pass an instance of Vector3 or a set of numbers that ether way is a position to look at, and the result is that the object ends up looking at that point in space. However things might not always work the way that I might expect it to, and one reason why is because the look at method will always get an object to look at something that is called world space. This world space is not relative to a group object, or even the scene object also as that is also an instance of object3d that can have its position changed.

To some extent this is not really a problem as I typically do want to always look at a point relative to world space. However ofter I might end up making some kind of group of mesh objects and I want to have a mesh object look at another mesh object in this group, so in that case I want to look at something relative to the position of the group, not the world. In these kinds of situations I can still use the look at method, it is just that I will need to adjust for the fact that the look at method is relative to world space.

<!-- more -->

## 1 - The look at method in three.js, and what to know first

The look at method in three.js is a prototype method of the Object3d class in a javaScript library known as three.js. I assume that you have some background when it comes to the very basics of getting started with three.js and client side javaScript in general. If not you might want to take a step back for a moment before getting into some more advanced topics when it comes to groups, and having the look at method look at a mesh relative to the group rather than world space. I will not be covering the very basics of three.js in general here, but I will be going over some additional things that you should know first in this section.

### 1.1 - version numbers matter with three.js

When I first wrote this post I was using three.js version r127 which was a late version of three.js as of April of 2021. I do not think much has changed with the look at method from the point that I started write posts on three.js back in 2018 when I was using r91. Still it is possible that code breaking changed will be made to three.js that might effect other parts of the code examples that I am writing about here. So always take care when reading about three.js code examples on the open web, more so than usual with three.js as this is still a very fast moving library in terms of development.

### 1.2 - Read up more on the object3d class and other related topics if you have not done so

The look at method is just one method of the object3d base class, there is a great deal more about the class that is also worth looking into more. The object3d class is the base class for a lot of object classes in tree.js such as Camera, Mesh, Group, and Scene just to name a few. So by learning about a method the the look at method one will end up learning about a method that can be applied to Cameras, but also Mesh objects, groups and anything based on Object3d.


## 2 - Basic Object3d look at method example

For a basic example of the look at method here I am using the look at method to get two mesh objects to look at each other. I am also using the look at method to get a camera to look at the position 0,0,0 in world space after moving the camera to a location other than 0, 0, 0.

When using the look at method I can pass a single argument that is an instance of Vector3, or I can pass a set of three arguments for each axis value. If what I want to look at is something that is another instance of Object3d such as a Mesh, or a Group I can pass the position value to the look at method which is an instance of the Vector3 class.

```js
// creating a scene
var scene = new THREE.Scene();
 
var m1 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(m1);
 
var m2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
m2.position.set(2, 0, 2)
scene.add(m2);
 
// MAKING THESE TWO MESH OBJECTS LOOK AT EACH OTHER
m1.lookAt(m2.position);
m2.lookAt(m1.position);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
// MAKING THE CAMREA LOOK AT 0,0,0
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 3 - Group with a Mesh that ends up facing a point that can be world, or group relative

One of the draw backs of the Object3d look at method is that it will always look at the given point relative to word space. This is just fine when it comes to having a scene that is not moved from th default starting position, and I am just working with mesh objects that are children of that scene object. However if for some reason I am moving the scene objects around, or trying to get the look at method to look at another child within a group this can present problems.

However the Look at method will always look at the given point relative to world space, so the solution to these problems just involves creating an instance of Vector3, or by one way or another giving adjusted values to the look at method that will case the look at method to rotate the mesh to look at a point relative to the group, or translated scene, rather than world space. If you are still confused, maybe the best way to get a feel of what it going on would be to work out some of your own examples with this. In this section I will be going over such examples that I have worked out, but it would be best to play around with something like what I am writing about here a little.

### 3.1 - Pointing to the cube location relative to word space from with a group

If I want to have a mesh object point to some world location outside of the group rather than relative to the group then I can just call the look at method and pass that location. However if I want to have a mesh point to another child within a group that is where things will get a little involved. In this example I have a mesh that is a kind of pointer mesh because I am using the cylinder geometry constructor to create a cone like geometry and then I am rotating that geometry so that it points in the direction in which the mesh is facing. However when I have this pointer mesh face another cube mesh that is a child of the group this results in the pointer mesh facing the position of the cube relative to the would rather than the group.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
 
// creating a group
var group = new THREE.Group();
// creating and adding a pointer mesh to the group
var geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
geo.rotateX(Math.PI * 0.5);
var pointer = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
pointer.position.set(0, 0, 0);
group.add(pointer);
// creating and adding a cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(0, 0, 4);
group.add(cube);
// box helper for the group
group.add(new THREE.BoxHelper(group));
// changing the position of the group to something other that 0,0,0
group.position.set(-2.0, 0, -2.0);
// add group to the scene
scene.add(group);
 
// POINTER LOOKS AT CUBE POSITION RELATIVE TO THE SCENE, BUT NOT RELATIVE TO THE GROUP
pointer.lookAt(cube.position);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

### 3.2 - Pointing to the cube relative to group space

If I want to have a mesh face a child within a group than I am going to want to do something to adjust the values that I give to look at to point to the equivalent location of the mesh object in world space.

```js
// creating a scene
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
 
// creating a group
var group = new THREE.Group();
// creating and adding a pointer mesh to the group
var geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
geo.rotateX(Math.PI * 0.5);
var pointer = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
pointer.position.set(0, 0, 0);
group.add(pointer);
// creating and adding a cube
var cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(0, 0, 4);
group.add(cube);
// box helper for the group
group.add(new THREE.BoxHelper(group));
// changing the position of the group to something other that 0,0,0
group.position.set(-2.0, 0, -2.0);
// add group to the scene
scene.add(group);
 
// IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
// THEN I WILL WANT TO ADJUST FOR THAT
var vg = group.position,
vc = cube.position;
var v = new THREE.Vector3(
   vg.x - vc.x,
   vg.y - vc.y,
   vg.z + vc.z
);
pointer.lookAt(v);
 
// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

## 4 - Conclusion

The look at method is every useful method in three.js, and of course as such I use it all the time. However every now and then I get into situations in which the method is just not working as I would like it to. The method is not a magic wand of a method that will always just work all the time, and even when it does work I can not help but thing that I am doing myself a disservice by using it. I do not care to make things more complex than they need to be, however the look at method is not always a substitute for some complex expressions involving a little trigonometry.




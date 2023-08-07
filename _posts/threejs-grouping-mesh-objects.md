---
title: Grouping two or more Mesh Objects together in three.js
date: 2018-05-16 11:52:00
tags: [js,three.js]
layout: post
categories: three.js
id: 188
updated: 2023-08-07 14:53:36
version: 1.46
---

After writing a lot of demos in [threejs](https://threejs.org/) I have arrived at a point where it is time to start getting into some more advanced topics in threejs, or at least something new beyond just the very basics of getting started with the library. So with that said, it might be time for me to get into animation with three.js, but doing so the professional way will prove to be a little complicated, and it will also largely involve the use of an application like blender as a way to create models in the form of external files. 

So another simple way of making some animations is to have Mesh Objects grouped together, and then have it so they are moving in relation to each by moving the position of a group object rather than each individual mesh object. In addition to this a group object also has all kinds of properties that are inherited from object3d that prove to be useful such as the user data object that I can use to park some of my own data about the group that will be used in some additional code.

Also for one reason or another it is often a good idea to have a way to group two or more objects in general and not just mesh objects. For example I might want to add a light to a camera and then add the camera to a scene object. So this post today will be about the three.js [Group](https://threejs.org/docs/index.html#api/objects/Group) constructor, but a whole lot of what a group is about is also a feature of the [object3d class](https://threejs.org/docs/#api/en/core/Object3D) in general. So here I will be going over some of the basics when it comes to this sort of thing, but also I will likely touch base on many other related topics what will come up when creating groups of objects that have to do with rotating a geometry just once, and the difference between world space, and space that is relative to a group.

<!-- more -->

## Groups in threejs and what else to know

If you are still fairly new to threejs you might want to [start by reading some kind of getting started post on threejs first](/2018/04/04/threejs-getting-started/). The main focus in this post has to do with creating a group of two or more [Mesh Object](/2018/05/04/threejs-mesh/) instances to create a single Group that can then be worked with by itself in a scene. These groups of objects can from complex shapes composed of many mesh objects using a collection of built in geometry constructors and materials. I assume that you have at least a basic working knowledge of three.js, and of course javaScript in general, but regardless of where you are at I will be going over a few things in this section that you might want to read up on before hand. 

<iframe class="youtube_video"  src="https://www.youtube.com/embed/3JW--vfkxPg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### THREE.Object3D vs THREE.Group

When it comes to grouping two ore more Mesh Objects together it may be preferable to use the Group constructor in place of just using [Object3D by itself](/2018/04/23/threejs-object3d/). However as far as I can tell there is not much of any difference other than it makes the readability of your code more clear as to what the object is for. The fact of the matter is that when it comes to grouping things together such a task can be done with any object that is based off the Object3d class really. This includes Groups, Mesh objects, Cameras, various helpers, and even a whole Scene object for that matter.

### Check out my curves module example

When it comes to setting the position of many child objects of a group I have found that I like to use curves to do so. As such I have started a [threejs project example that is centered around the use of curves](/2022/11/18/threejs-examples-curves-module/) to do this sort of thing.

### The source code examples in this post are on Github

The source code examples that I am writing about in this post can be found in [my test threejs Github Repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-grouping-mesh-objects). This is also where I pack the source code examples for my [many other posts on threejs as well](/categories/three-js/).

### Version numbers matter

I also often try to mention that three.js is a project where the version number matters a great deal as code breaking changes are made all the time.  With that said when I first wrote this post I was using [three.js r91](https://github.com/mrdoob/three.js/releases/tag/r91). When it comes to the last time I came around to doing a little editing of this post I was able to still get all these examples to work okay with [r146 as well](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md).

## 1 - Basic examples of Groups of Mesh objects in threejs

In this section I will be going over a number of basic examples of the THREE.Group constructor function in threejs and while doing so I will also be touching base on a whole lot of other topics in the process. Much of what I cover here will also come into play with the more advanced examples later in the post where I really start to get into some things that are a bit interesting when it comes to making cool projects that are collections of mesh objects.

However before we get into the good stuff we have to get the hello world type examples out of the way when it comes to groups, so lets get to it.

### 1.1 - Creating a group and adding mesh children to it.

For this very first basic example I am just creating a group, adding it to the scene, and adjusting values for the position and rotation attributes of the group. I am then using a simple make cube helper function to add mesh objects to the group. When doing so the position values for the mesh objects will be relative to the position of the group and not the scene object, or world space. More on world space and scene objects later in this post.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER
//-------- ----------
const makeCube = (size, x, y, z) => { 
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshNormalMaterial());
    mesh.position.set(x, y, z);
    return mesh;
};
//-------- ----------
// CREATING A GROUP
//-------- ----------
const group = new THREE.Group();
scene.add(group);
// changing position and rotation of the group
group.position.x = -2;
group.rotation.y = Math.PI / 180 * 45;
//-------- ----------
// ADDING MESH OBJECTS TO THE GROUP
//-------- ----------
group.add(makeCube(1.0, 0, 0, 0));
 group.add(makeCube(0.5, 0, 2, 0));
group.add(makeCube(0.5, 0, -2, 0));
group.add(makeCube(0.5, 2, 0, 0));
group.add(makeCube(0.5, -2, 0, 0));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Mesh Objects Positioned in a circle using Math.cos and Math.sin

For this group example I am creating a group of mesh objects where each mesh objects is positioned in a circle like pattern. There are a number of ways to do this as I will be getting to later examples, but for now I am making use of the core java Script Math.cos and Math.sin methods to do this.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CREATING A GROUP
//-------- ----------
const group = new THREE.Group(), radius = 2, count = 8;
let i = 0;
while (i < count) {
    // creating a mesh
    const bx = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial()),
    r = Math.PI * 2 / count * i;
    // set position of mesh
    bx.position.set(
        Math.cos(r) * radius,
        0,
        Math.sin(r) * radius);
    // add mesh to the group
    group.add(bx);
    i += 1;
}
scene.add(group);
// changing position and rotation of the group
group.position.set(-4, 0, -4);
group.rotation.z = Math.PI / 180 * 90;
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - The parent property of an object3d based object

The [parent property of an object3d](/2021/06/02/threejs-object3d-parent/) based object will be a reference to an object that is the parent of the current object3d based object. So then if I have a scene object and then I add a group to that scene object the parent property of the group should be a ref to the scene object. Also If I add a mesh object as a child of the group the parent property of that mesh should then be a reference to the group and the same could then be said about any additional mesh object that I may add as a child of that mesh object, and so forth.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
//-------- ----------
// HELPER
//-------- ----------
const makeCube = (size, x, y, z) => { 
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshPhongMaterial({color: new THREE.Color(1,1,1)}));
    mesh.position.set(x, y, z);
    return mesh;
};
//-------- ----------
// CREATING A GROUP
//-------- ----------
const group = new THREE.Group();
scene.add(group);
//-------- ----------
// ADDING MESH OBJECTS TO THE GROUP
//-------- ----------
const mesh = makeCube(3, 0, 0, 0);
const meshChild = makeCube(1.5, 0, 3, 0);
mesh.add( meshChild );
mesh.add( makeCube(1.5, 0, -3, 0) );
mesh.add( makeCube(1.5, 3, 0, 0) );
mesh.add( makeCube(1.5, -3, 0, 0) );
group.add( mesh );
//-------- ----------
// GER REFS BY PARENT PROP
//-------- ----------
meshChild.material.color = new THREE.Color(1, 0, 0);
meshChild.parent.material.color = new THREE.Color(0, 1, 0);
meshChild.parent.parent.position.set(-5, 0, -5);
meshChild.parent.parent.rotation.y = Math.PI / 180 * 45;
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 2.5, 0);
renderer.render(scene, camera);
```

### 1.4 - The Get By name method and groups

Another useful object3d class feature when working with groups of objects is the get by name method. When I create a group and start adding a whole bunch of children to the group I can set name values to these objects. That way when I want to get a reference to a certain object I can just call the get by name method off of any object reference that contains the object that I want as a child.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const createGroup = (prefix) => {
   const group = new THREE.Group();
   group.name = prefix;
   const sphere = new THREE.Mesh(
       new THREE.SphereGeometry(1, 20, 20),
       new THREE.MeshPhongMaterial({color: 0xffffff})
   );
   sphere.name = prefix + '_sphere';
   group.add(sphere);
   const cone = new THREE.Mesh(
       new THREE.ConeGeometry(0.25, 1.5, 20, 20),
       new THREE.MeshPhongMaterial({color: 0xffffff})
   );
   cone.geometry.rotateX(Math.PI * 1.5);
   cone.position.set(0, 1.75, 0);
   cone.lookAt(group.position);
   cone.name = prefix + '_cone';
   group.add(cone);
   return group;
};
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
['foo', 'bar', 'baz'].forEach( (prefix, i, arr) => {
    const a1 = i / ( arr.length - 1);
    const group = createGroup(prefix);
    group.position.x = -5 + 10 * a1;
    scene.add(group);
});
//-------- ----------
// USING GET BY NAME
//-------- ----------
const cone = scene.getObjectByName('baz_cone');
cone.material.color = new THREE.Color(1, 0, 0);
cone.position.applyEuler( new THREE.Euler( Math.PI / 180 * 45, 0, 0) );
cone.lookAt(cone.parent.position)
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Rotation of geometry to make it line up with the front of a mesh object

In some cases I will want to [rotate the geometry](/2021/05/20/threejs-buffer-geometry-rotation/) that I am using with a mesh so that the front of the geometry will line up with the front of the mesh object. This is so that things will look the way I want it to when using something like the object3d [look at method](/2021/05/13/threejs-object3d-lookat/) for example. 

### 2.1 - Starting out with the cone geometry

So then say I have a group of cone geometries and I want the point of the cones to face the center of the group, or maybe I want them to face away from the center. To do this I will just want to call the rotateX method of the buffer geometry class instance created with the cone geometry constructor. When calling rotateX I need to pass a radian value that will be the rotation delta on the X axis. The end result will then be the geometry adjusted by that amount in radius for the X axis.

For this example I am then creating a group of mesh objects each of which use the cone geometry along with the normal material. I made a helper function that when called will create just a single mesh object with the cone geometry set up just the way that I like it. I then have another helper function that will create and return a group and each child of the group will be a mesh object created with this create cone helper.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a single cone and rotate the geo once
const createConeMesh = () => {
    const geo = new THREE.ConeGeometry(0.5, 1, 10, 10);
    geo.rotateX(Math.PI * 0.5);
    const cone = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
    return cone;
};
// create a cone circle
const createConeCircle = function (radius, count) {
    const group = new THREE.Group();
    let i = 0;
    while (i < count) {
        // creating a mesh
        const cone = createConeMesh();
        // position the mesh
        const vs = new THREE.Vector3(0, 0, 1);
        const e = new THREE.Euler(0, Math.PI / 180 * 360 * (i / count), 0 );
        cone.position.copy(vs).applyEuler(e).multiplyScalar( radius );
        // set look at point
        cone.lookAt(0, 0, 0);
        // add mesh to the group
        group.add(cone);
        i += 1;
    }
    return group;
};
//-------- ----------
// GROUPS
//-------- ----------
// add groups
const group1 = createConeCircle(2, 8);
scene.add(group1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

When it comes to setting the position of each cone so that they are positioned in a circle around the origin of the group I could use Math.con and Math.sin. However there are a whole lot or great tools to work with in threejs of course when it comes to the Vector3 and Euler classes. With that said here I am using the copy, applyEuler, and multiplyScalar methods to position the mesh objects when creating the mesh objects.

### 2.2 - Using an update method for object3d values, and just rotating the geometry once

This is now just an improved version of the first example in which I am using cone geometry for a mesh, and rotating the geometry just once. This time I have broke things down and took code that I had in my create method and pulled it into a new update method that I call to set things up for the first time in the create method. However I am also using it outside of the create method as well as a way to update the state of things with the group by just calling the update method, passing the group as the first argument, and then passing an alpha value that will adjust things in terms of a value from 0 to 1. I often like to create my update methods for projects such as this this way where I have a whole bunch of options when it comes to creating a group, or objects of some kind, and then pass that object to an update method where there is just one main alpha value that will set the state of the group.

The main thing to keep in mind here as far as the rotation of the cones is concerned though is that I am just rotation the geometry of the cones once. After that any additional updates to the rotation of the cones is done by calling the look at method which will effect the object3d state of rotation rather than the geometry. 

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// create a single cone and rotate the geo once
const createConeMesh = ( length, radius ) => {
    const geo = new THREE.ConeGeometry(radius, length, 10, 10);
    geo.rotateX(Math.PI * 0.5);
    const cone = new THREE.Mesh(
        geo,
        new THREE.MeshNormalMaterial());
    return cone;
};
// update a group
const coneCircleUpdate = (group, alpha ) => {
    alpha = alpha || 0;
    // position the mesh
    const count = group.children.length;
    const gud = group.userData;
    let i = 0;
    while (i < count) {
        const cone = group.children[i];
        const vs = new THREE.Vector3(0, 0, 1);
        const e = new THREE.Euler(0, Math.PI / 180 * 360 * (i / count), 0 );
        cone.position.copy(vs).applyEuler(e).multiplyScalar( gud.radius[0] + gud.radius[1] * alpha );
        // set look at point
        cone.lookAt(gud.v3_lookat);
        i += 1;
    };
};
// create a cone circle
const createConeCircle = function (opt) {
    opt = opt || {};
    opt.count = opt.count === undefined ? 4 : opt.count;
    opt.cone = opt.cone || [1, 0.5];
    const group = new THREE.Group();
    const gud = group.userData;
    gud.v3_lookat = opt.v3_lookat || new THREE.Vector3();
    gud.radius = opt.radius === undefined ? [1, 1] : opt.radius;
    let i = 0;
    while (i < opt.count) {
        // creating a mesh
        const cone = createConeMesh.apply(null, opt.cone);
        // add mesh to the group
        group.add(cone);
        coneCircleUpdate(group, 0);
        i += 1;
    }
    return group;
};
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh( new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshNormalMaterial());
mesh.position.set(2, 4, 0);
scene.add(mesh)
//-------- ----------
// GROUPS
//-------- ----------
const opt = {count: 8, radius: [2, 3], v3_lookat: mesh.position, cone: [2,0.5] };
const group1 = createConeCircle(opt);
coneCircleUpdate(group1, 0);
scene.add(group1);
const group2 = createConeCircle(opt);
coneCircleUpdate(group2, 1);
scene.add(group2);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - The object3d look at method, getting world position, and groups

One nice feature of the [object3d class is the look at method](/2021/05/13/threejs-object3d-lookat/), that helps a lot when it comes to setting the orientation of an object such as a group. I can call this method off of an instance of something that is based off of object3d and pass a position in the from of a few number arguments, or a single instance of vector3. This method works fine in most situations but there are a few draw backs and limitations one of which is that the look at method will always set the orientation of the object relative to world space rather than a space that is relative to a group.

So if I am in a situation in which I want to use the look at method to set the orientation of a group to a position of something in a group, I will want to get the world location of that object in the group. One way to go about doing this would be to use the [get world position method](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition) of the object3d class.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GROUP AND MESH OBJECTS
//-------- ----------
const group = new THREE.Group();
// creating and adding a pointer mesh to the group
const geo = new THREE.CylinderGeometry(0, 0.5, 1, 12);
geo.rotateX(Math.PI * 0.5);
const pointer = new THREE.Mesh(
    geo,
    new THREE.MeshNormalMaterial());
pointer.position.set(0, 0, 0);
group.add(pointer);
// creating and adding a cube
const cube = new THREE.Mesh(
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
//-------- ----------
// POINTER LOOK
//-------- ----------
// IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
// THAT IS A CHILD OF THE GROUP, THEN I WILL WANT TO ADJUST 
// FOR THAT FOR THIS THERE IS THE getWorldPosition Method
const v = new THREE.Vector3(0, 0, 0);
cube.getWorldPosition(v);
console.log(Object.values(v)); [-2, 0, 2];
pointer.lookAt(v);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

In this example I am once again using the rotate x method of the cone geometry to make it so the point of the cone geometry is line up with the front of the mesh object that is using the cone geometry. I am then adding this cone geometry to a group, along with another child object that is a cube. I am then changing the position of the group so that it is at a location other than the origin. Because I am using the get world position method of the cube to set the values of a vector3 instance and using that with the look at method, this results in the cone pointing to the cube at its location relative to the group, rather than its location relative to world space.

## 4 - Example of grouping with a camera

Grouping is basically whenever you use the add property of anything that inherits from the Object3D class and it is not just Groups that are based on the Object3d class. The Object3d class is a base class of many other objects in threejs which includes things like cameras, as such I can use the add method to add things like lights, and a Mesh, and position them relative to the camera. 

So then say for example I want to have a point light on top of camera, and a Mesh that is always in front of the camera as it moves around in a scene, no problem. I can just add the point light, and mesh object to the camera via the add method of the camera. and then just adjust the position and orientation of these child objects of the camera as needed.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ADD CAMERA TO SCENE
//-------- ----------
scene.add(camera)
//-------- ----------
// ADD LIGHT TO CAMERA
//-------- ----------
// positioning a light above the camera
const light = new THREE.PointLight();
light.position.set(0, 5, 0);
camera.add(light);
//-------- ----------
// OBJECTS
//-------- ----------
// positioning a mesh in front of the camera
const withCamera = new THREE.Mesh(
        new THREE.BoxGeometry(.1, .1, .1),
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x1a1a1a
        }));
withCamera.position.set(-0.25, .2, -0.75);
camera.add(withCamera);
// adding another mesh object directly to the scene
scene.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: 0x00ff00
        })));
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let frame = 0;
const maxFrame = 500;
const loop = function () {
    const per = frame / maxFrame,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    requestAnimationFrame(loop);
    withCamera.rotation.set(Math.PI * 4 * per,
        Math.PI * 2 * per, 0);
    camera.position.set(-2 + 8 * bias, 8, 8);
    camera.lookAt(0, 0, 0);
    frame += 1;
    frame = frame % maxFrame;
    renderer.render(scene, camera);
};
loop();
```

## 5 - Using Grouping when making a Model

Grouping comes in handy when I want to make a Constructor function that will include a group of Mesh Object instances that can be added to a Scene that will constitute some kind of model. The group will typically be one of many properties of the constructor, and will also contain methods that I can use on that group.

For a quick example of this I would place something like this in an external javaScript file called something like model.js:

```js
const Model = (function () {
    // the constructor
    const Mod = function (opt) {
        // this is what will be added to the Scene
        this.group = new THREE.Group;
        // set default, or use what is given
        opt = opt || {};
        this.radius = opt.radius === undefined ? 4 : opt.radius;
        this.count = opt.count === undefined ? 5 : opt.count;
        this.bxSize = opt.bxSize === undefined ? 1 : opt.bxSize;
        this.color = opt.color === undefined ? 0x00ff00 : opt.color;
        let i = 0,
        bx,
        radian;
        while (i < this.count) {
            bx = new THREE.Mesh(
                    new THREE.BoxGeometry(this.bxSize, this.bxSize, this.bxSize),
                    new THREE.MeshStandardMaterial({
                        color: this.color,
                        emissive: 0x0f0f0f
                    }));
            this.group.add(bx);
            i += 1;
        }
        this.update();
        console.log(this.group);
    };
    // update the group
    Mod.prototype.update = function () {
        let i = 0,
        bx,
        radian;
        while (i < this.count) {
            bx = this.group.children[i];
            radian = Math.PI * 2 / this.count * i;
            bx.position.set(
                Math.cos(radian) * this.radius,
                0,
                Math.sin(radian) * this.radius);
            bx.lookAt(0, 0, 0);
            i += 1;
        };
    };
    // set radius and update
    Mod.prototype.setRadius = function (radius) {
        this.radius = radius;
        this.update();
    };
    // return the constructor
    return Mod;
}());
```

This will give me a model that I can use to create a circle of boxes that all face the origin of the group. I just have to add the group property of an instance of this to the scene, and I can of course make many instances of this model in my scene.

When I make my main.js file that will contain the basic elements of my three.js project I can call this constructor from there and give it a bunch of arguments that will define it's state. In the main update, or render loop of the project I can call setRadius to change the radius of the circle of boxes.

So I would use it in a main.js file to make something like this:

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MODEL OBJECTS
//-------- ----------
const mod1 = new Model({ count: 8, bxSize: 1, color: 0xff0000 });
scene.add(mod1.group);
const mod2 = new Model({ count: 16, radius: 8, bxSize: 1});
scene.add(mod2.group);
const mod3 = new Model({
        count: 32,
        radius: 9,
        bxSize: 1,
        color: 0x0000ff
    });
mod3.group.rotation.set(Math.PI * 1.5, 0, 0)
scene.add(mod3.group);
//-------- ----------
// LIGHT
//-------- ----------
scene.add(new THREE.PointLight().add(new THREE.Mesh(
            new THREE.SphereGeometry(.5, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            }))));
const light = new THREE.PointLight();
light.position.set(15, 0, 0);
light.add(new THREE.Mesh(
        new THREE.SphereGeometry(.5, 10, 10),
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        })))
scene.add(light);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
let frame = 0;
const maxFrame = 500;
const loop = function () {
    const per = frame / maxFrame,
    bias = Math.abs(.5 - per) / .5,
    r = Math.PI * 2 * per;
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
    // using the setRadius method of the model to change
    // the radius.
    mod1.setRadius(1 + 6 * bias);
    // changing the rotation of the group
    mod1.group.rotation.set(
        Math.PI * 2 * per,
        Math.PI * 4 * per,
        Math.PI * 8 * per);
    // change position of light, and camera
    light.position.set(Math.cos(r) * 15, 0, Math.sin(r) * 15);
    camera.position.set(
        Math.cos(r + Math.PI * bias) * 20,
        -50 + 100 * bias,
        Math.sin(r) * 20);
    camera.lookAt(0, 0, 0);
    frame += 1;
    frame = frame % maxFrame;
};
loop();
```

This results in three instances of the model, each with different radius, count of boxes, and color. I am also changing the state of one of theme in a loop, by calling one of the methods of the model, as well as by directly working with the group instance as it has all the Object3D methods to play with that will effect the group as a whole when used.

## Conclusion

Grouping is a useful in three.js projects, don't forget that it is also something that you can do with anything in three.js that inherits from the Object3D class. So not only can you use grouping with Mesh Object instances, it can also be done with things like lights, and cameras, and also even additional groups.

One thing that might be work checking out next is one of my [threejs example](/2021/02/19/threejs-examples/) posts, [including one where I have made a crude model of sorts that is a group of groups where each nested group is a bunch of mesh objects that from a biplane](/2021/02/18/threejs-examples-biplane-group/) of sorts. There are a number of additional other examples that I have made like that where I am using groups as a way to make weird, simple models, which I have to admit is a little fun. There are all kinds of things that can be done with threejs groups that are pretty fun, and so far I have only scratched the surface of what can be done.
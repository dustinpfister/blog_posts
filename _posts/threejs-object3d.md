---
title: Object3D Class in threejs
date: 2018-04-23 19:35:00
tags: [three.js]
layout: post
categories: three.js
id: 180
updated: 2023-06-26 14:05:58
version: 1.73
---

The [Object3D](https://threejs.org/docs/index.html#api/core/Object3D) base class in [threejs](https://threejs.org/) is one of the most important classes to be aware of when making some kind of project with the library. It is the base class of mesh objects, but also just about every other kind of object that would be added to a scene object such as cameras, groups, lights, various helper objects and so forth. Also speaking of scene objects they too are based on top of the object3d class as well. So then to learn a thing or two about object3d is also to learn a thing about all of those kinds of objects that I have mentioned. For example to set the position of a mesh object I need to use the the object3d position property to so so and the same is also true of cameras, groups, and so forth.

In this post I will be going over many of the basics of what the Object3d class is all about in threejs, when it comes to working with the class directly. However more often than not it is a class that I am working with indirectly each time I want to move or rotate a camera, mesh object, or anything to that effect. In the process of going over the Object3d class I will also be touching base on many other classes that are important also, such as the [Vector3](/2018/04/15/threejs-vector3/) class and the [Euler Class](/2021/04/28/threejs-euler/) that are used as the values for many note worthy properties of this major base class.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/Hu-O_rzrAd8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Object3d class and what to know before hand

This is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), or javaScript in general. So I assume that you are at least up to speed with getting a basic hello world style example of threejs up and working at least. However if that is the case you might now be looking into what the next steps might be when it comes to learning more about the library. With that said the object3d class, and everything that branches off from this class might be a good thing to get solid with. 

Also even if you do have some experience with threejs learning a thing or two more about the object3d base class is still something that might need to happen now and then also as there is a lot to be aware of with this one. I have been at this for years and there are still a few details here that there that I might still want to look into more with this one.

### Source code examples are up on Github

The source code examples that I am writing about in this post can be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d) on Github. This is also a repo where I park the source code examples for my [many other threejs blog posts](/categories/three-js/) that I have wrote over the years. So there is a folder in the repo of this post, but also ever other post as well.

### Version Numbers matter with three.js big time

As with any post on threejs the version number matters a lot, when I first started this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91), and the last time I updated the post I was using [r146 of threejs](https://github.com/mrdoob/three.js/tree/r146). Threejs is a project in motion so if any code in this post or any other threejs post breaks it might very well be because of the version number that you are using, at least that is the first thing that you should check anyway.

## 1 - Basic object3d class examples

For this first opening section I will be going over just a few quick basic examples of the object3d class. The main focus here will then be just creating an object3d class object, but also working with other objects that are based on the object3d class. Sense this is a basic section the examples will remain fairly simple, and copy and paste style friendly. They will also just involve very simple basic static scenes of just one or two objects just for the sake of demoing some very basic features of object3d. 

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

Another property of the Object3D base class that I use often is the rotation property. This property expects an instance of the Euler Class, Which is the Class used in threejs that has anything to do with a set of [Euler Angles](https://en.wikipedia.org/wiki/Euler_angles). So when creating or changing the values of a Euler class instance there are three angles that need to be given in the form of a radian value between 0 and Math.PI \* 2. 

The set method of a Euler class instance can be used to set the values of these angles by passing three angle values for the Euler instance. Another way to set the value of a Euler class instance is to use the copy method that will set the values of the Euler class instance from which the copy method is called to the given Euler Class instance. So then in this section I will be going over at least a few examples of rotation, but also position while I am at it also.

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

There are many objects in threejs that inherit from the object3D class, which is why this is a good class to have a solid understanding of object3d as it applies to a lot of different objects that will be worked with all the time in various projects. When it comes to setting the position and orientation of a perspective camera for example the Object3d position and rotation properties is the way to go about doing so. The Object3d look at method can also be used to set the rotation of the camera to look at a given point or object. However all of this does not just apply to cameras, but all objects based off of object3d. So the look at method can be used to have a camera look at an mesh object, and the same method can also be used to make that mesh object face the camera as well sense the look at method is a method of the object3d class.

I have wrote a [blog posts on the type property of the object3d class](/2022/04/01/threejs-object3d-type/) in which I get into this sort of thing in detail. However I think that I should also have a section on this topic in the main object3d blog post as well. So then in this section I will then be going over some source code examples that have to do with using object3d features in the various different kinds of objects that are based off of object3d.

### 2.1 - Camera objects are based off of object3d

The [camera base class](/2018/04/06/threejs-camera/) is based off of the object3d class, so when it comes to working with a camera such as the [perspective camera](/2018/04/07/threejs-camera-perspective/) I can use object3d features as a way to set the position and rotation of a camera. So then in this example I am doing just that, using the object3d features to move a camera around and then also have the camera look at a fixed location again by making use of the look at method.

I have wrote a blog post on the [subject of camera movement in threejs](/2019/12/17/threejs-camera-move/), but what applies for cameras also applies for objects in general of course. There is looking into all the various ways to go about moving cameras, and objects in general over time then such as [using curves](/2022/11/18/threejs-examples-curves-module/) to do so which I think is a great way to do so.

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

[Mesh objects](/2018/05/04/threejs-mesh/) are one or the major objects that I end up using all the time in a project that are based off of object3d as well. This is a kind of object where I must create a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) of one kind or another and pass the as the first argument. After getting a geometry together there is also of course looking into the various options when it comes to [mesh materials](/2018/04/30/threejs-materials/) that are used to skin the geometry of the mesh object.

In this example I am once again using the position property of a mesh object to set the position. Also I am making use of the look at method to make it so that the mesh object always faces the origin of the scene object.

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

### 2.3 - Points type object3 based objects

There are also points objects that can be used as one alternative option to the typical mesh object. This kind of object will just use the [position attribute of a buffer geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) to render just points in space. All other attributes of the buffer geometry will then not be used with this kind of object, with some exceptions such as [color attributes](/2023/01/20/threejs-buffer-geometry-attributes-color) if one will like to use vertex coloring as a way to style the points.

When using this kind of object I am limited to just using the [points material](/2018/05/12/threejs-points-material/) as a way to skin the points. This is then one major reason why more often than now I would not want to use points to create particles, although the good thing about them is that they will eat up less overhead when it comes to a real time project of some kind.

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
// POINTS OBJECT - is also based on object3d
//-------- ----------
// cretaing points with a built in geometry
const geo1 = new THREE.SphereGeometry(5, 60, 60);
const mat1 = new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0, 1, 0) });
const points1 = new THREE.Points(geo1, mat1);
scene.add(points1);
// object3d rotation prop of points object
points1.rotation.z = Math.PI / 180 * 45;
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(points1.position);
renderer.render(scene, camera);
```

## 3 - The name property of the Object3d class

Yet another note worthy aspect of the [Object3d class is the name property of the class](/2021/05/12/threejs-object3d-get-by-name/) as well as the get object by name method. This name property is a way to set a unique name for an object, once that is done the get object by name method can be used as a way to gain a reference to the object at a later point in a body of javaScipt code. This can prove to be a useful way to get references to any object that is attached as a child of an object that I have a reference to begin with. So if i have a variable to an object3d based object, and I want to get a reference to a child of that object, one way would be to set and use names to get references to a specific child object. So in this secton I will be going over some quick exmaples of this kind of feature.

### 3.1 - Basic get object by name object3d class method example

For a basic example here I am adding a whole bunch of child objects to a main scene object. While I am creating the child objects of the scene object I am making sure to set names for all of these objects inside the loop in which I am creating them and adding them t0o the main scene object. Later on I can use the get object by name method of the main scene object to get references to each of the child objects this way.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CREATING OBJECTS WITH NAMES
//-------- ----------
const PREFIX = 'box';
const COLORS = ['red', 'blue', 'green'];
const COUNT = COLORS.length;
let i = 0;
while(i < COUNT){
    const geo = new THREE.BoxGeometry();
    const mat = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = PREFIX + i;
    scene.add(mesh)
    i += 1;
}
//-------- ----------
// USING GET By NAME TO GET REFERNCE TO OBJECTS
//-------- ----------
COLORS.forEach((colorStr, i) => {
    const mesh = scene.getObjectByName(PREFIX + i);
    const a_mpos = i  / ( COUNT - 1 );
    if(mesh){
        mesh.position.x = -5 + 10 * a_mpos;
        mesh.material.color = new THREE.Color(colorStr);
    }
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

This might not be the best example of this feature of the object3d class ans there are other ways of getting references to child objects of a single parent object such as just using the children array to do so for example. However for this first example of the section it is just the general idea of this that I want to get out of the way. The use of names becomes very helpful with situations in which I have many nested objects and I would like to set a specific name for each part of an over all larger collection of objects.

## 4 - The get world positon method

The [get world position method](/2021/05/25/threejs-object3d-get-world-position/) of the object3d method is a must known about method when it comes to taking care of certain problems that will come up that have to do with the difference between local space, and world space. What I mean by that is that when dealing with an object that is a child of another parent object the position of the object is relative to the parent object and not the over all world space. In some cases I might want to get the position of a child object relative to world space rather than the local space of the parent object, and for these kinds of tasks there is of course the get world position method.

### 4.1 - Basic example of the get world position method

Here I have a fairly basic example of the get world position method that should help to showcase what this get world position method is all about. Here I have a parent object, and then one child object of the parent object. I move the position of the parent object so that it is not lined up with the origin of world space, and then I also move the child object to a location relative to the parent object. I then have a loop in which I am using the [vector3 lerp method](/2022/05/17/threejs-vector3-lerp/) to lerp between two vector3 objects. One vector3 object is the world space relative position of the object and the other is the value that is local to the parent object. The camera then looks back and froth between where the mesh object actually is and then where it would be if the mesh object was not a child of the parent object, but rather lined up with world space.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECT WITH CHILD OBJECTS
//-------- ----------
const geo = new THREE.SphereGeometry(1, 30, 30);
const mat = new THREE.MeshNormalMaterial();
const mesh_parent = new THREE.Mesh(geo, mat);
const mesh_child = new THREE.Mesh(geo, mat);
mesh_parent.add(mesh_child);
scene.add(mesh_parent);
// setting position values for parent and child objects
mesh_parent.position.set(-8,0,2);
mesh_child.position.set(8,0,-4);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(10, 10, 10);
const v1 = mesh_child.position.clone();
const v2 = mesh_child.getWorldPosition( new THREE.Vector3() );
let f = 0;
const fm = 90;
const loop = () => {
    requestAnimationFrame(loop);
    const a1 = f / fm;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    camera.lookAt( v2.clone().lerp(v1, a2) );
    renderer.render(scene, camera);
    f += 1;
    f %= fm;
};
loop();
```

## 5 - Setting the Scale of an object

The [scale property](/2021/05/11/threejs-object3d-scale/) of an instance of Object3d contains and instance of Vector3 that can be used to change the scale of an object. By default the values for this vector3 instance are 1,1,1 but they can be changed to something like 2,2,2 which would cause the object to be scaled up to a size that is twice the side of the objects original size. So it would go without saying that this also proves to be a very useful property in the object3d class along with position and rotation. In this section then I will be looking at a few examples that have to do with making use of the scale property of the object3d class then.

### 5.1 - Basic scale property example

For this example then I create a single mesh object that will serve as a source object or sorts that I will make copies of by making use of the clone method of the mesh object class. There are some things that I think I should say about the clone method that is used with mesh objects. One thing to be aware of is that there is a clone method of the mesh class that will supersede the object3d clone method. However maybe the mosu impotent thing to be aware of here is that the clone method will not deep copy geometry and materials. Also when it makes clones of any and all children it will not copy geometry and materials for all children also. However for this example at least this will not present a problem as I just want to scale the objects themselves and using the same geometry and materials for all objects will work fine.


Inside the body of a loop I call the clone method of the source mesh object, and the result that is returned is a clone of the source object. I can then set a new scale for this copy of the source mesh object, and while doing so I can also adjust the position of it as well. The end result is then a whole bunch of mesh objects that are all cloned from a single source mesh object, but with the scale adjusted for each of them.

```js
//-------- ----------
// SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
const geo = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshNormalMaterial();
// source mesh object
const mesh_source = new THREE.Mesh(geo, mat);
// mesh objects cloned from source mesh objects and scaled
const count = 8;
let i = 0;
while(i < count){
    const a1 = i / (count - 1);
    const mesh = mesh_source.clone();
    mesh.scale.set(1, i + 1 ,1);
    mesh.position.x = -5 + 10 * a1;
    mesh.position.y = 0.5 + 0.5 * i;
    scene.add(mesh)
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 2, 0);
renderer.render(scene, camera);
```

## 6 - The user data object.

The [user data object](/2021/02/16/threejs-userdata/) is the standard go to object in an instance of Object3d that can be used to park user defined data. In other words when it comes to me making my own modules and applications based off of three.js and I want to append some data to an object in three.js this user data object is how I can go about doing so without messing up anything that three.js depends on.

### 6.1 - Cubes Example

This is a demo based on some source code from my blog post on the user of the user data object of the object3d class. Here in this demo I am using the user data object to park all kinds of data for a group object that are then used to set the position and rotation values of a collection of four cubes.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CUBE GROUP MODULE
//-------- ----------
(function (api) {
    // CONST
    const ANGLES_A = [225, 315, 135, 45];
    //-------- ----------
    // HELPER FUNCTIONS
    //-------- ----------
    // to radians helper
    const toRadians = function (array) {
        return array.map(function(deg){
            return Math.PI / 180 * deg;
        });
    };
    // create a single cube mesh
    const createCube = function (rotationCounts, position) {
        const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshPhongMaterial({
                    color: 0xff0000,
                    specular: 0xffffff
                })
        );
        // USER DATA OBJECT FOR A SINGLE CUBE
        const ud = cube.userData;
        ud.rotationCounts = rotationCounts || [0, 0, 0];
        cube.position.copy(position || new THREE.Vector3(0, 0, 0));
        return cube;
    };
    // update a single cube
    const updateCube = function (cube, per) {
        const ud = cube.userData,
        rc = ud.rotationCounts,
        pi2 = Math.PI * 2;
        cube.rotation.x = pi2 * rc[0] * per;
        cube.rotation.y = pi2 * rc[1] * per;
        cube.rotation.z = pi2 * rc[2] * per;
    };
    const setCubesRotation = function(cubes, per){
        const x = Math.PI * 0 * per,
        y = Math.PI * 0 * per,
        z = Math.PI * 0 * per;
        cubes.rotation.set(x, y, z);
    };
    const setCubes = api.setCubes = function(cubes, frame, maxFrame){
        const gud = cubes.userData;
        gud.frame = frame === undefined ? gud.frame: frame;
        gud.maxFrame = maxFrame === undefined ? gud.maxFrame: maxFrame;
        const per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        // update cubes
        cubes.children.forEach(function (cube, i) {
            // start values
            const sx = i % 2 - 0.5,
            sz = Math.floor(i / 2) - Math.floor(i / 4) * 2 - 0.5,
            sy = Math.floor(i / (2 * 2)) - 0.5;
            // adjusted
            const aIndex = i % 4,
            bIndex = Math.floor(i / 4),
            r1 = gud.anglesA[aIndex],
            x = sx + Math.cos(r1) * (gud.xzStart + gud.xzDelta * bias),
            y = sy + (gud.yStart + gud.yDelta * bias) * (bIndex === 0 ? -1 : 1),
            z = sz + Math.sin(r1) * (gud.xzStart + gud.xzDelta * bias);
            // set position of cube
            cube.position.set(x, y, z);
            // call cube update method
            updateCube(cube, per);
        });
        // whole group rotation
        setCubesRotation(cubes, per);
    };
    //-------- ----------
    // PUBLIC FUNCTIONS
    //-------- ----------
    // public method to create a cube group
    api.create = function(opt) {
        opt = opt || {};
        opt.cubeRotations = opt.cubeRotations || [];
        const cubes = new THREE.Group(),
        // USER DATA OBJECT FOR A GROUP OF CUBES
        gud = cubes.userData;
        gud.frame = 0;
        gud.maxFrame = opt.maxFrame || 180;
        gud.fps = opt.fps || 30;
        gud.anglesA = toRadians(opt.anglesA || ANGLES_A);
        gud.yDelta = opt.yDelta === undefined ? 2 : opt.yDelta;
        gud.xzDelta = opt.xzDelta === undefined ? 2 : opt.xzDelta;
        gud.yStart = gud.yStart === undefined ? 0.1 : gud.yStart;
        gud.xzStart = gud.xzStart === undefined ? 0.1 : gud.xzStart;
        gud.secs = 0;
        let i = 0;
        while(i < 8){
            const cubeRotations = opt.cubeRotations[i] || [0.00, 0.00, 0.00];
            const cube = createCube(
                cubeRotations, 
                new THREE.Vector3(0, 0, 0));
            cubes.add(cube);
            i += 1;
        };        
        return cubes;
    };
    // update the group
    api.update = function(cubes, secs) {
        // GROUP USER DATA OBJECT
        const gud = cubes.userData;
        const per = gud.frame / gud.maxFrame,
        bias = 1 - Math.abs(per - 0.5) / 0.5;
        // step frame
        gud.secs += secs;
        if(gud.secs >= 1 / gud.fps){
            gud.frame += 1; // gud.fps * secs;
            gud.frame %= gud.maxFrame;
            gud.secs %= 1 / gud.fps; 
        }
        setCubes(cubes);
    };
}(this['CubeGroupMod'] = {}));
//-------- ----------
// LIGHT
//-------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
scene.add(dl);
const pl = new THREE.PointLight(0xffffff, 1);
scene.add(pl);
//-------- ----------
// CUBE GROUPS
//-------- ----------
const cubes3 = CubeGroupMod.create({
   anglesA:[180, 270, 90, 0],
   yDelta: 0.5,
   xzDelta: 0.75,
   fps: 30,
   cubeRotations: [
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [1, 1, 0],
      [1, 1, 1],
      [0, 0, 1]
   ]
});
cubes3.position.y = 2;
scene.add(cubes3);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(4, 4, 4);
const update = (frame, frameMax) => {
    CubeGroupMod.setCubes(cubes3, frame, frameMax);
    camera.lookAt(cubes3.position);
};
let lt = new Date();
let frame = 0;
const frameMax = 180;
const fps = 20;
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        update(frame, frameMax);
        renderer.render(scene, camera);
        lt = now;
        frame += 1;
        frame %= frameMax;
    }
};
loop();
```

## 7 - Animation loop examples

In this section I will not be going over a few animation loop examples of the object3d class. There is a whole lot of what I have covered in the above examples of course, so now it is time to apply what was covered to make at least one if not many cool little animation projects. While I am at it here I can also write about all kinds of other topics that might pop up when making animations as well of course.

### 7.1 - Basic spin animation example of a rotation

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

### 7.2 - An rotation animation making a mesh following a point moving up and down on the z axis

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

### 7.3 - Object3D loop example that uses the class as a way to group

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

## Conclusion

From here you might choose to make some more demos that have to do with exercising the use of working with objects in three.js. There is working out some examples that involve using the rotation and position properties in an instance of a camera to change the position and orientation of a camera over time. 

If you enjoyed this post you might also like to check out my [many other posts](/categories/three-js/) on the subject of threejs, or better yet by [post on my main three.js project examples](/2021/02/19/threejs-examples/) that I have made thus far. One example that I have made that [applies to object3d is my scene shake example](/2021/05/06/threejs-examples-scene-shake/), where I have a shake module that will shake the whole scene if I pass the scene object as the object to apply the shake to and I do not add the camera to the scene, however I can also pass anything that is based off of object3d also.

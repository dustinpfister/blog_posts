---
title: The Look At method in three.js
date: 2021-05-13 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 866
updated: 2022-10-19 12:40:35
version: 1.56
---

I thought that I knew everything I needed to know about the [object3d class look at](https://threejs.org/docs/#api/en/core/Object3D.lookAt) method in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), but it turns out that there is a little more to it. Using the look at method is fairly straight forward I just call the method off of some kind of object3d class based object such as a Mesh object or Camera, and then pass a set of numbers for x, y and z or a single instance of Vector3 that ether way is a position for the object to look at. The result of calling the look at method then is that the object ends up looking at that point in space that was passed. However things might not always work the way that I might expect it to, when it comes to a mesh object I often might want to change what the front side of the mesh is,  and also I might run into problems that have to do with world space compared to local space. 

When it comes to the problem of world space the look at method will always treat the values that it is given as a world space relative position, rather than a local space relative to a nested object. This world space is not relative to a group object, or even the scene object also as that is an based off of object3d that can have its position changed as well. To some extent this is not really a problem as I typically do want to always look at a point relative to world space. However often I might end up making some kind of group of mesh objects and I want to have a mesh object look at another mesh object in this group, so in that case I want to look at something relative to the position of the group, not the world. In these kinds of situations I can still use the look at method, it is just that I will need to adjust for this by using something like the [get world position method of the object3d class](/2021/05/25/threejs-object3d-get-world-position/).

When it comes to mesh object and the geometry that is used with a mesh object often I will want to adjust what the front face of the geometry is. To so so it will require me to [rotate the buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/) once just to change what the front facing direction is. I can then use the the lookAt method or directly mutate the instance of [Euler](/2021/04/28/threejs-euler/) at the [rotation property of the object3d based object](/2022/04/08/threejs-object3d-rotation/) to change rotation from there on out.

Although the lookAt method will work fine for most situations there are a few additional use cases where it will just not work great. So then there will be some times where I might have to roll up my sleeves, and work out some kind of custom solution for setting rotation of an object3d based object.

<!-- more -->

## The look at method in three.js, and what to know first

I assume that you have some background when it comes to the [very basics of getting started with three.js](/2018/04/04/threejs-getting-started/) and client side [javaScript in general](/2018/11/27/js-getting-started/). If not you might want to take a step back for a moment before getting into some more advanced topics when it comes to [groups](/2018/05/16/threejs-grouping-mesh-objects/), and using the look at method to set rotation of [a mesh object](/2018/05/04/threejs-mesh/) relative to the group rather than world space as well as many other little issues with the look at method. I will not be covering the very basics of three.js in general here, but I will be going over some additional things that you should know first in this section.

<iframe class="youtube_video" src="https://www.youtube.com/embed/morZYyJN05o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Read up more on the object3d class and other related topics if you have not done so

The look at method is just one method of the [object3d base class](/2018/04/23/threejs-object3d/), there is a great deal more about the class that is also worth looking into more. The object3d class is the base class for a lot of object classes in threejs such as Cameras, Mesh Objects, Groups, and whole Scene objects just to name a few. So by learning about a method like the look at method one will end up learning about a method that can be applied to a whole lot of differing objects that are used in threejs projects.

### Read up more on the Vector3 class

When using the look at method one option is to give and x, y, and z position as a set of three arguments in the form of javaScript number values. However the other option is to give just one argument that is an instance of the [Vector3 class which it worth checking out in detail if you have not done so yet](/2018/04/15/threejs-vector3/). There are a great deal of very useful methods for working with a 3D form of a vector in space that make quick work of various tasks that have to do with adjusting direction and vector unit length. I will be making use of many of these in this post, but there is a lot of ground to cover to do the class justice that I will not be doing here.

### Source code is up on Github

The source code examples that I am writing about here can also be found in [my test threejs repo on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-lookat). This is where I part not just the source code examples that I am writing about here, draft examples, notes for additional future examples and more. This is also where I am parking the source code examples for my [many other posts on threejs](/categories/three-js/).

### Version numbers matter with three.js

When I first wrote this post I was using three.js version r127 which was a late version of three.js as of April of 2021, and the last time I came around to do some editing I was testing out the source code examples on r140. I do not think much has changed with the look at method from the point that I started write posts on three.js back in 2018 when I was using r91. Still it is possible that code breaking changed will be made to three.js that might effect other parts of the code examples that I am writing about here. So always take care when reading about three.js code examples on the open web, more so than usual with three.js as this is still a very fast moving library in terms of development.

## 1 - Some Basic examples of the Object3d.lookAt method

In this section I will be starting out with just a few basic examples of the look at method of the object3d class. There are two general ways of using the look at method one of which is to give three numbers, and the object is to use a single Vector3 class instance. In this section I will be covering examples that make use of both ways calling the method. In addition I think I should also cover rotation of geometry as well right away as that is something that will become a problem quickly when using the look at method to set the rotation of mesh objects.

### 1.1 - Using a set of three numbers with Object3d.lookAt

For this very first basic example I will be using a set of three numbers as a way to define what the position should be to look at in space. I am using the look at method in this example with both a mesh object as well as a camera as they are both objects that share the Object3d class as a base class. For the mesh object I went with the cone geometry [constructor function](/2019/02/27/js-javascript-constructor/) as a way to create a [buffer geometry](/2021/04/22/threejs-buffer-geometry/) for the mesh object. 

When doing so I will want to change the front facing direction of the geometry so that the point of the cone geometry is pointing to the location that I pass when using the look at method. For this I made use of rotateX method of the buffer geometry class which is one of several options for setting the rotation of a geometry rather than an object3d based object as a whole. When using these geometry rotation methods I will typically only want to call the method once just the adjust things with the geometry, and then use object3d class methods from there such as the look at method. This becomes more important when it comes to doing animation which I will be getting to later in this post.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECT
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 20, 20),
    new THREE.MeshNormalMaterial());
mesh.geometry.rotateX(Math.PI * 0.5);
scene.add(mesh);
// setting position of camera and mesh
camera.position.set(5, 5, 5);
mesh.position.set(2, 0, -3);
// USING LOOKAT TO HAVE BOTH MESH AND CAMERA LOOK AT 0,0,0
camera.lookAt(0, 0, 0);
mesh.lookAt(0, 0, 0);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

### 1.2 - Using the Vector3 class such as the position property of an object3d based object such as a Mesh

Using a set of three numbers is great and all, but there is a whole lot to say about the Vector3 class, and often I will use that as a way to define what the position in space should be for the look at method. For this example I am just making use of the instances of the Vector3 class stored at the position properties of mesh objects to get them to face each other. I can also use the position property as a quick way to get a camera to look at a specific object in a scene as well.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10,10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUCNTIONS
//-------- ----------
const mkCone = (x, y, z) => {
    const mesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1, 20, 20),
        new THREE.MeshNormalMaterial());
    mesh.geometry.rotateX(Math.PI * 0.5);
    mesh.position.set(x, y, z)
    return mesh;
};
//-------- ----------
// MESH OBJECTS
//-------- ----------
const m1 = mkCone(0, 0, 0);
scene.add(m1);
const m2 = mkCone(3, 0, 0);
scene.add(m2);
// MAKING THESE TWO MESH OBJECTS LOOK AT EACH OTHER
m1.lookAt(m2.position);
m2.lookAt(m1.position);
// MAKING THE CAMREA LOOK AT M1
camera.position.set(5, 5, 5);
camera.lookAt(m1.position);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 2 - Nested objects and the look at method of the obejct3d class

One of the draw backs of the Object3d look at method is that it will always look at the given point relative to word space. This is just fine when it comes to having a scene that has not moved from the default starting position, and I am just working with mesh objects that are children of that scene object. However if for some reason I am moving the scene objects around, or trying to get the look at method to look at another child within a group this can present problems.

Sense the look at method will always make an object look at a point relative to world space, the way to go about addressing this is to just have a way to convert local space to world space. The hard way of doing this  would involve translating a local position to a world space position by just doing the math manually by taking into account not just the local position, but also the positions of all parent objects. However better yet there is also a special method of the object3d class called [Object3D.getWorldPosiiton](/2021/05/25/threejs-object3d-get-world-position/).

If you are still confused, maybe the best way to get a feel of what it going on would be to work out some of your own examples with this. Learning by doing is the best way to gain a greater sense of what the situation is with these things. However will in this section I will be going over such examples that I have worked out, but it would be best to play around with something like what I am writing about here a little.

### 2.1 - Pointing to Where a nested object would be relative to world space by giving a local space value

Say that I have a group object and two mesh objects as child objects of the group. One mesh object contains a cone geometry, and the other child mesh object contains a box geometry. On top of all of this the group itself is positioned away from the origin so that the origin of the group does not align with the origin of world space, assuming that nothing has been done to adjust the scene object position.

Now lets say that I want to have the cone mesh look at the cube, but when I do so the cube points at a location that would be where the cube would be if it was not a child of the group, but rather the scene object. This happens because I am just giving the position of the nested cube as a value to look at which is a local space that is relative to the group, not the scene object which is aligned with world space.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  GROUP, MESH
//-------- ----------
// creating a group
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
// POINTER LOOKS AT CUBE POSITION RELATIVE TO WORLD, BUT NOT RELATIVE TO THE GROUP
pointer.lookAt(cube.position);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

The important thing to keep in mind here is that the look at method is working just fine, the real core problem here is that there is a difference between local space and world space. The look at method is indeed getting the cone to look at the location of the cube, it is just that the location is relative to world space rather than the local space of the group. So I just need to have a way to get the world space location of the cube, rather than the local space location that is relative to the group.

### 2.2 - Pointing to the cube relative to group space

If I want to have a mesh face a child within a group then I am going to want to do something to adjust the values that I give to look at to point to the equivalent location of the mesh object in world space. I could create an new instance of Vector3 and then manually do the math to get the desired position in world space rather than the position relative to the group position. However there is another useful Object3d method in the class that can be used to make quick work of this kind of task called [Object3d.getWorldPosition](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition).

As of around r127 forward it is now required to create a new instance of Vector3 and pass that as an argument when calling the get world space method. Failing to do so with later versions of threejs, such as r140 that I tested this out on last, will result in an error.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 100);
camera.position.set(0, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  GROUP, MESH
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
// IF I WANT TO HAVE THE POINTER LOOK AT THE CUBE
// THAT IS A CHILD OF THE GROUP, THEN I WILL WANT TO ADJUST 
// FOR THAT FOR THIS THERE IS THE getWorldPosition Method
const target = new THREE.Vector3();
cube.getWorldPosition(target)
pointer.lookAt( target );
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

So now the cone is pointing to the cube within the group, rather than the location to which it would be if it was a child of the scene object.

### 2.3 - Moving a whole scene object

One very important thing to keep in mind here is that even the scene object is relative to world space, and is also based off of the object3d class. Sense a scene object is based off of object3d then it too has a position property and as such can also be positioned away from the origin in world space. 

A camera is always used to render a scene, and also a camera is an object3d based object, but it does not have to be a child of the scene object, it can remain free in world space. So in this example I am setting a camera at a location that is just above the origin in world space, and I am moving a whole scene object to a location that is away from the origin. I then have two mesh objects as children of the scene. One of which is given the position of the scene object to look at, and the other is the origin. Sure enough the rotation of the two mesh objects differ, so world space is not just space that is relative to the scene. Typically the scene object is left in a state in which it is aligned with world space sure, but this is just one little thing to be aware of with word space, it is a final, object, fixed kind of space that is independent of the scene object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(6, 6));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//  MESH
//-------- ----------
const geo = new THREE.CylinderGeometry(0, 0.5, 2, 40, 40);
geo.rotateX(Math.PI * 0.5);
const material = new THREE.MeshNormalMaterial({transparent: true, opacity: 1});
const m1 = material.clone();
m1.opacity = 0.5;
const pointer1 = new THREE.Mesh(geo, m1);
scene.add(pointer1);
const pointer2 = new THREE.Mesh(geo, material);
//pointer2.geometry.rotateX(Math.PI * 0.5);
scene.add(pointer2);
//-------- ----------
//  MOVING SCENE
//-------- ----------
// moving the scene object away from 0,0,0
scene.position.set(0, 0, 10);
// having pointer1 look at position of scene object
pointer1.position.set(2, 0, 2);
pointer1.lookAt(scene.position);
// pointer 2 at same position as pointer1
// however I am having it point at 0,0,0 world space
// rather than the position of the scene object in world space 
// that has moved away from 0,0,0
pointer2.position.set(2, 0, 2);
pointer2.lookAt(0, 0, 0);
// positioning the camera ( That is not a child of scene )
// at 0, 2, 0 in world space and having it look at the 
// pointer position
const ct = new THREE.Vector3();
pointer1.getWorldPosition(ct);
camera.position.set(0, 2, 0);
camera.lookAt(ct);
camera.zoom = 7;
camera.updateProjectionMatrix();
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
```

## 3 - Animation loop examples

Now that I have a lot of the basics of the look at method covered there is getting into at least one if not more animation loop examples to really get an idea of how this method works and what the deal is with certain issues that will pop up. That is examples that involve the use of the request animation frame method, or some other means to create a function that will be called over and over again to make some kind of animation rather than static scene example using threejs. There is a lot to write about when it comes to certain topics with this sort of thing, but I will not be getting into that here preferring to keep on track with the object3d look at method.

### 3.1 - Circle of cones all looking at a moving sphere

Here I have some source code that is based off of the code that I made for the first video that I made for this blog post. The idea was to make a circle of mesh objects that each use geometry created with the cone geometry constructor function. I then use the look at method to get each of these cones to look at another mesh object that contains geometry made with the sphere geometry constructor. The effect is then just moving this sphere around in the scene object and having each of the cones look at the sphere.

```js
(function () {
    // ---------- ---------- ----------
    // SCENE, CAMERA, and RENDERER
    // ---------- ---------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 320 / 240, 1, 1000);
    camera.position.set(8, 8, 8);
    camera.lookAt(0,0,0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ---------- ----------
    // LIGHT
    // ---------- ---------- ----------
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 1, 1);
    scene.add(dl);
    // ---------- ---------- ----------
    // HELPER FUNCTIONS
    // ---------- ---------- ----------
    // ALL LOOK HELPER
    var allLook = function(group, target){
        var v = new THREE.Vector3();
        target.getWorldPosition(v);
        group.children.forEach(function(child){
            child.lookAt(v);
        });
    };
    // ---------- ---------- ----------
    // GROUPS
    // ---------- ---------- ----------
    // DEMO GROUP
    var demoGroup = new THREE.Group();
    scene.add(demoGroup);
    var sphere = new THREE.Mesh( 
        new THREE.SphereGeometry(1.25, 30, 30), 
        new THREE.MeshStandardMaterial({
            color: new THREE.Color('blue')
        })
    );
    demoGroup.add(sphere);
    // CONE GROUP
    var coneGroup = new THREE.Group();
    demoGroup.add(coneGroup);
    var coneMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('cyan')
    });
    // [ [[x, y, z], coneLength], ... ]
    var coneDataArray = [],
    len = 8,
    i = 0, x, y, z, radian, radius = 3;
    while(i < len){
        radian = Math.PI * 2 / len * i;
        x = Math.cos(radian) * radius;
        y = 0;
        z = Math.sin(radian) * radius;
        coneDataArray.push([[ x, y, z], 2]);
        i += 1;
    }
    coneDataArray.forEach(function(coneData){
        var cone = new THREE.Mesh( new THREE.ConeGeometry(0.5, coneData[1], 30, 30), coneMaterial);
        cone.geometry.rotateX(1.57);
        cone.position.fromArray(coneData[0]);
        cone.position.y += coneData[1] / 2 - 0.8;
        coneGroup.add(cone);
    });
    allLook(coneGroup, sphere);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 300;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const v_start = new THREE.Vector3(0, 0, 1);
    const v_delta = new THREE.Vector3(0, 0, 3);
    const update = function(frame, frameMax){
        const a = frame / frameMax;
        coneGroup.rotation.set(0, Math.PI * 2 * a, 0);
        const e = new THREE.Euler();
        e.x = Math.PI * 8 * a;
        sphere.position.copy(v_start).normalize().applyEuler(e).multiplyScalar(4).add(v_delta);
        allLook(coneGroup, sphere);
    };
    // loop
    const loop = () => {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if(secs > 1 / FPS_UPDATE){
            // update, render
            update( Math.floor(frame), FRAME_MAX);
            renderer.render(scene, camera);
            // step frame
            frame += FPS_MOVEMENT * secs;
            frame %= FRAME_MAX;
            lt = now;
        }
    };
    loop();
}());
```

## Conclusion

The look at method is a very useful feature in the object3d class so of course I use it all the time as a way to set the rotation of a camera and also for mesh objects, groups, and jut about anything based off of the object3d class.  However every now and then I get into situations in which the method is just not working as I would like it to. The look at method is not a magic wand of a solution that will always just work all the time, and even when it does work I can not help but think that I am doing myself a disservice by using it a little. I do not care to make things more complex than they need to be mind you though, however the look at method is not always a substitute for some complex expressions that might be called for when needed.


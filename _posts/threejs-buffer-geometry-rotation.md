---
title: Buffer Geometry Rotation in three.js
date: 2021-05-20 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 871
updated: 2023-06-19 11:15:41
version: 1.30
---

When it comes to rotating things in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is the [rotation property](/2022/04/08/threejs-object3d-rotation/) of the [object3d class](https://threejs.org/docs/#api/en/core/Object3D) that stores an instance of the [Euler class](https://threejs.org/docs/#api/en/math/Euler) which is one way to adjust the local rotaton of such an object. When it comes to a [Mesh object](/2018/05/04/threejs-mesh/) which is one of many objects that are based off of object3d, this rotation property can be used as a way to rotate the mesh as a whole, along with any children that might be added to the mesh objects as well. 

However it is also worth pointing out that the [buffer geometry](/2021/04/22/threejs-buffer-geometry/) used in a mesh object can also be rotated independently of a mesh objects orientation as well. In some cases I might want to rotate a geometry rather than rotating the mesh object, or any parent object of the mesh.

When it comes to rotating a buffer geometry there are a number of methods that are of interest for this kind of task. Often I end up using a method like that of the [rotateX method](https://threejs.org/docs/#api/en/core/BufferGeometry.rotateX) however just like that of the Object3d class there is also a [look at method](https://threejs.org/docs/#api/en/core/BufferGeometry.lookAt) that might also work in some cases. However I think it might be best to use these methods only once to make the geometry line up with what would be expected when using an object3d level method or property value to set an orientation of a mesh object that contains a geometry. In this post I will be going over a few examples that will showcase this sort of thing.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/65N2KLaBSUQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Buffer geometry rotation and what to know first

This is a post on using methods of a buffer geometry instance to rotate just a geometry independent of any orientation of a mesh object that might use this geometry. The content of this post is then on a topic that might be a little advanced for people that are still relatively new to threejs and javaScript in general. However I will take a moment to cover some basics in this section that you should take a moment to get solid with before continuing reading this post of you have not done so all ready.

### Read up more on Vector3 and the Euler classes

If are not familial with the [Vector3](/2018/04/15/threejs-vector3/) and [Euler classes](/2021/04/28/threejs-euler/) now would be a good time to look into these and have at least some basic understanding of what they are used for. A Vector3 class instance is used to represent a position in space, and a Euler class instance is used to represent an orientation of an object in space. The two classes are somewhat similar in terms of properties and methods but the values that are used with them are very different. The vecor3 class is a position so the values are x y, and z cornets, while with Euler there is a similar set of values but the values used are radian values that represent angles rather than a position.

It should go without saying why the Euler class is important when it comes to rotating a geometry, but the vector3 class is also of interest when it comes to using something like the look at method as a way to set the orientation of a geometry or a mesh object as the value passed to such a method when using just one argument needs to be an instance of vector3.

### Check out the Object3d class also.

There is rotating a geometry and then there is rotating something that contains that geometry. A geometry is often used with a Mesh, and a mesh is based off of the [Object3d class](/2018/04/23/threejs-object3d/). The Mesh if what should often be what is used to set orientation first and foremost, it is just that there are some situations in which the orientation of a geometry will need to be adjusted too at least once.

### Source code is also up on Github

I also have the source code examples that I am writing about up on [Github in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-rotation). This is also where I park the source code examples for the many [other blog posts that I have wrote on threejs](/categories/three-js/) as well.

### Version Numbers matter in three.js

When I first wrote this post I was using revision number 127 of threejs, however the last time I came around to do some editing I got all the demos updated to my [r146 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md). Code braking changes are made to three.js often so it is possible that the code examples here might not work on later versions of three.js. Always be mindful of the version of three.js that you are using, and how old any content is on three.js.

## 1 - Basic examples of rotation of buffer geometry

To start out with rotaton of geoetry I will first want to go over a few basic examples. For the most part I think I will want to stick to the rotation method of the buffer geomerty class here.

### 1.1 - Basic example of the rotation methods of the buffer geometry class

To start out this basic section I think that I should start out with the rotation methods first and formost. There are other options, but I thbk that I should maybe not get into those in a basic section. Also often I do just need to rotate a geometry one axis anyway, so often these methods will work just fine anyway. Any any case the way to go about using these is to just call one of the roation methods such as the rotateX method, and then pass a radian value as the first argument as a way to rotate the object.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 10, 30, 30),
        new THREE.MeshNormalMaterial());
// USING BUFFER GEOMERTY rotateX, rotateY, and rotateX METHODS
mesh1.geometry.rotateX(Math.PI * 0.5);
mesh1.geometry.rotateY(Math.PI * 0.25);
mesh1.geometry.rotateZ(Math.PI * 0.75);
scene.add(mesh1)
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(6, 8, 6);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.2 - Rotation of a cone geometry and using object3d.lookAt to have the point of the cone face something

A example of buffer geometry rotation in combination with mesh object rotation might be to start out with an instance of the built in cone geometry constructor, and rotating that geometry so that it will work as expected when using the look at method of a mesh object. The basic idea here is to create a cone geometry and then use the rotateX method to rotate that geometry on the x axis by one half of the value of Math.PI. I can then use this geometry with a mesh object, and then when using the look at method of the mesh instance the point of the cone will be pointing to the location in world space given to the look at method.

So now I can create the cone geometry and rotate it the way that it should be facing once, and I can now use the look at method of the mesh that contains the geometry to have the cone face the direction I want it to. To test this out I created and added a cube to a scene as an object to have the cone point at. So once I have my cube mesh object I can now just pass the position property of the cube to the look at method of the mesh object that contains the cone geometry. The result is then the desired outcome where the tip of the cone is pointing to the location of the cube.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
// USING BUFFER GEOMERTY ROTATEX METHOD TO ADJUST THE CONE TO WORK WELL
// WITH THE LOOKAT METHOD OF THE Object3d class
geometry.rotateX(Math.PI * 0.5);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(7, 7));
const cone = new THREE.Mesh(
     geometry,
     new THREE.MeshNormalMaterial()); 
cone.add(new THREE.BoxHelper(cone)); // adding a box helper
scene.add(cone); // add custom to the scene
// adding a cube to have the cone point to
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(3, 0, 3);
scene.add(cube)
cone.lookAt(cube.position); // using Object3d (base class of Mesh) lookAt
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(6, 8, 6);
camera.lookAt(cone.position);
renderer.render(scene, camera);
```

In this example I am just rendering a static scene once, however it would not take that much more work to create a simple animation in which I am moving the cube around and having the cone continue to point in the direction of the cube. When doing so the general idea here is to rotate the geometry just once to get the geometry to face the right direction within the mesh object, then change the rotation of the mesh object in the loop as needs when needed to create the animation rather than rotating the geometry.

## 2 - Using the copy method with rotation methods, and comparing to object3d rotation property

There is rotation of the buffer geometry, and then there is rotation of the object that contains the geometry which in most cases is a mesh object. I often think of rotation of buffer geometry as a way to set the orientation of the geometry just once, and when it comes to updating often over time I will typically want to use the instance of the Euler class stored at the rotation property of the containing mesh object.

Still in some cases I might want to rotation geometry over time often, even though it might be expensive in terms of system resources to do so. When doing so I might want to set the rotation in a way that is similar to what I am used to when it comes to using to rotation property of object3d where I can use the set methods, rather than using a delta each frame tick. One way to go about doing this would be to use the copy method of the buffer geometry class to always set the geometry to a kind of starting home position, and then translate.

```js
//-------- ----------
// SCENE, CAMERA, RENDER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 2, 30, 30),
    new THREE.MeshNormalMaterial()
);
mesh1.position.set(-1.5, 0, 0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.25, 2, 30, 30),
    new THREE.MeshNormalMaterial()
);
mesh2.position.set(1.5, 0, 0);
scene.add(mesh2);
// CHILD MESH OBEJECTS
const childMaterial = new THREE.MeshNormalMaterial({ 
    transparent: true,
    opacity: 0.5
});
mesh1.add( new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    childMaterial) );
mesh2.add( new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    childMaterial) );
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(6, 8, 6);
camera.lookAt(0, 0, 0);
let frame = 0,
lt = new Date();
const maxFrame = 200,
fps_target = 24
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / maxFrame,
    bias = Math.abs(.5 - per) / .5;
    requestAnimationFrame(loop);
    if (secs >= 1 / fps_target) {
        // ROTATION OF GEOMETRY COMPARED TO MESH
        const rx = Math.PI * 2 * per,
        rz = Math.PI * 8 * per;
        // USING COPY AND ROTATION METHODS
        mesh1.geometry.copy( new THREE.ConeGeometry(0.25, 2, 30, 30) );
        mesh1.geometry.rotateX( rx );
        mesh1.geometry.rotateZ( rz );
        // USING OBJECT3D ROTATION PROPERTY OF MESH2 to ROTATE THE MESH OBJECT
        // RATHER THAN THE GEOMETRY
        mesh2.rotation.set(rx ,0, rz)
        // render, step frame, ect...
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
        lt = now;
    }
};
loop();
```

## Conclusion

That is it for now when it comes to rotating a geometry in three.js, I did just want to touch base on this topic for now. If I do get more time to work on editing my three.js content more I am sure I will come around to adding a few more examples with this as I think doing so is called for. The main thing to keep in mind is that a geometry can be rotated in its own way separately from any mesh, or additional containing group of a mesh object. When rotating a geometry this is something that should often just be done once though just as a way to make sure that the front of a geometry is lines up with the front of a containing mesh object.


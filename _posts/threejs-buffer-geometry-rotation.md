---
title: Buffer Geometry Rotation in three.js
date: 2021-05-20 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 871
updated: 2021-05-20 10:12:21
version: 1.11
---

When it comes to rotating things in three.js there is the rotation property of the object3d class that stores an instance of the Euler class. When it comes to a Mesh object that is based off of Object3d that can be used as a way to rotate the mesh as a whole. However it is also worth pointing out that the geometry of a mesh object can also be rotated independently of a mesh objects orientation also.

<!-- more -->

## 1 - Buffer geometry rotation and what to know first

This is a post on using methods of a buffer geometry instance to rotate just a geometry independent of any orientation of a mesh object that might use this geometry. The content of this post is then on a topic that might be a little advanced for people that are still relatively new to three.js and javaScript in general. However I will take a moment to cover some basics in this section that you should take a moment to get solid with before continuing reading this post of you have not done so all ready.

### 1.1 - Version Numbers matter in three.js

When I wrote this post I was using revision number 127 of three.js. Code braking changes are made to three.js often so it is possible that the code examples here might not work on later versions of three.js. Always be mindful of the version of three.js that you are using, and how old any content is on three.js.

### 1.2 - Read up more on Vector3 and the Euler classes

If are not familial with the Vector3 and Euler classes now would be a good time to look into these and have at least some basic understanding of what they are used for. A Vector3 class instance is used to represent a position in space, and a Euler class instance is used to represent an orientation of an object in space. The two classes are somewhat similar in terms of properties and methods but the values that are used with them are very different. The vecor3 class is a position so the values are x y, and z cornets, while with Euler there is a similar set of values but the values used are radian values that represent angles rather than a position.

It should go without saying why the Euler class is important when it comes to rotating a geometry, but the vector3 class is also of interest when it comes to using something like the look at method as a way to set the orientation of a geometry or a mesh object as the value passed to such a method when using just one argument needs to be an instance of vector3.

### 1.3 - Check out the Object3d class also.

There is rotating a geometry and then there is rotating something that contains that geometry. A geometry is often used with a Mesh, and a mesh is based off of the Object3d class. The Mesh if what should often be what is used to set orientation first and foremost, it is just that there are some situations in which the orientation of a geometry will need to be adjusted too at least once.

## 2 - Rotation of a cone geometry and using object3d.lookAt to have the point of the cone face something

A good starting example of buffer geometry rotation in combination with mesh object rotation might be to start out with an instance of the built in cone geometry constructor, and rotating that geometry so that it will work as expected when using the look at method of a mesh object. The basic idea here is to create a cone geometry and then use the rotateX method to rotate that geometry on the x axis by one half of the value of Math.PI. I can then use this geometry with a mesh object, and then when using the look at method of the mesh instance the point of the cone will be pointing to the location in world space given to the look at method.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
    // geometry
    var geometry = new THREE.ConeGeometry(0.5, 03, 30, 30);
    // Mesh
    var cone = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial());
 
    // USING BUFFER GEOMERTY ROTATEX METHOD
    cone.geometry.rotateX(Math.PI * 0.5);
 
    cone.add(new THREE.BoxHelper(cone)); // adding a box helper
    scene.add(cone); // add custom to the scene
 
    // adding a cube to have the cone point to
    var cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    cube.position.set(3, 0, 3);
    scene.add(cube)
 
    cone.lookAt(cube.position); // using Object3d (base class of Mesh) lookAt
 
    // camera render
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    camera.lookAt(cone.position);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Conclusion

That is it for now when it comes to rotating a geometry in three.js, I did just want to touch base on this topic for now. If I do get more time to work on editing my three.js content more I am sure I will come around to adding a few more examples with this as I think doing so is called for. The main thing to keep in mind is that a geometry can be rotated in its own way separately from any mesh, or additional containing group of a mesh object. When rotating a geometry this is something that should often just be done once though just as a way to make sure that the front of a geometry is lines up with the front of a containing mesh object.


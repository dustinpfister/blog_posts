---
title: Buffer Geometry Rotation in three.js
date: 2021-05-20 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 871
updated: 2022-08-08 10:50:59
version: 1.22
---

When it comes to rotating things in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) there is the [rotation property](/2022/04/08/threejs-object3d-rotation/) of the [object3d class](/2018/04/23/threejs-object3d/) that stores an instance of the [Euler class](/2021/04/28/threejs-euler/). When it comes to a [Mesh object](/2018/05/04/threejs-mesh/) which is one of many objects that are based off of object3d, this rotation property can be used as a way to rotate the mesh as a whole, along with any children that might be added to the mesh objects as well. 

However it is also worth pointing out that the [buffer geometry](/2021/04/22/threejs-buffer-geometry/) of a mesh object can also be rotated independently of a mesh objects orientation as well, and in some cases I might want to do that rather than rotating the mesh object, or any parent object of the mesh. More often than not it is the orientation of a mesh object or a [group of mesh objects](/2018/05/16/threejs-grouping-mesh-objects/) that I want to rotate, however in some cases I will want to adjust the orientation of a geometry relative to the orientation of a mesh object that contains a geometry.

When it comes to rotating a buffer geometry there are a number of methods that are of interest for this kind of task. Often I end up using a method like that of the [rotateX method](https://threejs.org/docs/#api/en/core/BufferGeometry.rotateX) however just like that of the Object3d class there is also a [look at method](https://threejs.org/docs/#api/en/core/BufferGeometry.lookAt) that might also work in some cases. However I think it might be best to use these methods only once to make the geometry line up with what would be expected when using an object3d level method or property value to set an orientation of a mesh object that contains a geometry. In this post I will be going over a few examples that will showcase this sort of thing.

<!-- more -->

## Buffer geometry rotation and what to know first

This is a post on using methods of a buffer geometry instance to rotate just a geometry independent of any orientation of a mesh object that might use this geometry. The content of this post is then on a topic that might be a little advanced for people that are still relatively new to three.js and javaScript in general. However I will take a moment to cover some basics in this section that you should take a moment to get solid with before continuing reading this post of you have not done so all ready.

<iframe class="youtube_video" src="https://www.youtube.com/embed/65N2KLaBSUQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Version Numbers matter in three.js

When I wrote this post I was using revision number 127 of three.js. Code braking changes are made to three.js often so it is possible that the code examples here might not work on later versions of three.js. Always be mindful of the version of three.js that you are using, and how old any content is on three.js.

### Read up more on Vector3 and the Euler classes

If are not familial with the Vector3 and Euler classes now would be a good time to look into these and have at least some basic understanding of what they are used for. A Vector3 class instance is used to represent a position in space, and a Euler class instance is used to represent an orientation of an object in space. The two classes are somewhat similar in terms of properties and methods but the values that are used with them are very different. The vecor3 class is a position so the values are x y, and z cornets, while with Euler there is a similar set of values but the values used are radian values that represent angles rather than a position.

It should go without saying why the Euler class is important when it comes to rotating a geometry, but the vector3 class is also of interest when it comes to using something like the look at method as a way to set the orientation of a geometry or a mesh object as the value passed to such a method when using just one argument needs to be an instance of vector3.

### Check out the Object3d class also.

There is rotating a geometry and then there is rotating something that contains that geometry. A geometry is often used with a Mesh, and a mesh is based off of the Object3d class. The Mesh if what should often be what is used to set orientation first and foremost, it is just that there are some situations in which the orientation of a geometry will need to be adjusted too at least once.

## 1 - Rotation of a cone geometry and using object3d.lookAt to have the point of the cone face something

A good starting example of buffer geometry rotation in combination with mesh object rotation might be to start out with an instance of the built in cone geometry constructor, and rotating that geometry so that it will work as expected when using the look at method of a mesh object. The basic idea here is to create a cone geometry and then use the rotateX method to rotate that geometry on the x axis by one half of the value of Math.PI. I can then use this geometry with a mesh object, and then when using the look at method of the mesh instance the point of the cone will be pointing to the location in world space given to the look at method.

So now I can create the cone geometry and rotate it the way that it should be facing once, and I can now use the look at method of the mesh that contains the geometry to have the cone face the direction I want it to. To test this out I created and added a cube to a scene as an object to have the cone point at. So once I have my cube mesh object I can now just pass the position property of the cube to the look at method of the mesh object that contains the cone geometry. The result is then the desired outcome where the tip of the cone is pointing to the location of the cube.

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

In this example I am just rendering a static scene once, however it would not take that much more work to create a simple animation in which I am moving the cube around and having the cone continue to point in the direction of the cube. When doing so the general idea here is to rotate the geometry just once to get the geometry to face the right direction within the mesh object, then change the rotation of the mesh object in the loop as needs when needed to create the animation rather than rotating the geometry.

## 2 - Conclusion

That is it for now when it comes to rotating a geometry in three.js, I did just want to touch base on this topic for now. If I do get more time to work on editing my three.js content more I am sure I will come around to adding a few more examples with this as I think doing so is called for. The main thing to keep in mind is that a geometry can be rotated in its own way separately from any mesh, or additional containing group of a mesh object. When rotating a geometry this is something that should often just be done once though just as a way to make sure that the front of a geometry is lines up with the front of a containing mesh object.


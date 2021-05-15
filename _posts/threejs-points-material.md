---
title: The Points material in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2021-05-15 10:16:35
version: 1.14
---

The use of [Vector3](/2018/04/15/threejs-vector3/) class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. There is not just the geometry used with a material to compose a mesh object when it comes to vectors, the position property in the Object3d class is an instance of Vector3. This position property is used to set the position of mesh objects, cameras, and a whole lot of other objects.

However what if I just want to work with a collection of vectors, and have some kind of way of just displaying some points in space rather than lines, or a solid object. Maybe there is a few ways of going about doing that actually such as just observing the position property of a mesh as a point in space, and just using built in geometry constructors for the mesh such as the Sphere geometry constructor to just serve as some geometry to surround this point of interest. When I think about it for a moment maybe that kind of approach would be a good idea actually. However there is also the [Points Constructor](https://threejs.org/docs/#api/en/objects/Points) that can be used with the Special [Points Material](https://threejs.org/docs/#api/en/materials/PointsMaterial) that is put in place just for this purpose of just drawing some points in space.

There is always at least a few different ways of going about doing something, I can not say that I bother with the points material that much when it comes to working on actual projects. So in this post I will of course be going over a few examples of the Points Constructor, but I will also be going over some other examples of this sort of thing involving collections of points in space.

<!-- more -->

## 1 - What to know before getting started

This is a post on three.js, a javaScript library that is used to work with 3d space. It is not a getting stared post on three.js, or javaScript in general. If you are new to three.js you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. I assume that you have at least some experience making three.js demos, and are not only interested in making a certain kind of demo where you are only dealing with a collection of points. Also in this post I will not be getting into every little additional detail on every other little thing about three.js, but I do have [many other posts](/categories/three-js/) on this subject.

## 2 - Points vs Mesh Constructors, and basic Three.Points Constructor example

If you have made at least a few basic three.js demos you might be at the point where you understand that at least part of the process is to create and add a [Mesh](/2018/05/04/threejs-mesh/) object and add that object to a scene object. That scene object is then passed to a renderer along with a camera to create a render instance that can then be used to draw to a canvas element. This Mesh Object is composed of a Geometry, and at least one material to be used when rendering that Geometry. The THREE.Points class is then just a different kind of mesh that is used to just draw points of a geometry. In this section I will be going over a basic example of the THREE.Mesh Constructor, and then go on to an example of THREE.Points.

## 2.1 - Basic THREE.Mesh Example

```js
scene.add(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        })
    )
);
```

The [Mesh](/2018/05/04/threejs-mesh/) is something that binds everything together into a single package of sorts, and it has properties and methods that are appropriate for it. In the above example I am just using the Box geometry constructor as a way to just go about quickly creating a geometry, and I am using that geometry with the [basic material](/2018/05/05/threejs-basic-material/) as a way to go about skinning that geometry. However when it comes to using the THREE.Points constructor in place of THREE.Mesh, I need to create a custom instance of Buffer Geometry.

### 2.2 - A Basic THREE.Points example

So then the Points constructor is like that Mesh constructor only it is just the position attribute of a Buffer Geometry instance that will be mainly what is used in rendering. This geometry that I give the THREE.Points constructor could be a custom geometry like the one on the documentation page of the THREE.Points constrictor on the three.js website. However it can also be one of the geometries that is created and returned by one of the Built in geometry constructors such as the THREE.SphereGeomerty constructor.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
 
    // GEOMETRY
    var geometry = new THREE.SphereGeometry(1, 30, 30);
    var pt = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.05
            }));
    scene.add(pt);
 
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

So in other words the points constructor is just a more primitive kind of mesh, that can only be used with a special points material, but aside from that an instance of THREE.Points is very similar to that of THREE.Mesh instances. Just like the that of A mesh and Instance of Points is based on the Object3d class, so when it comes to positioning and rotating the Points instance all of that is more or less the same as Mesh. Also it is still and instance of buffer geometry that is passed as the first argument, that can be created by using the Buffer Geometry constructor directly, or by using one of the built in constructors, it is just that many of the attributes that would be used in the Mesh constructor are ignored.

## 3 - Conclusion

So the points material is an interesting alternative to the typical basic or standard material that I often use in my basic project examples that I have made thus far with working with the typical Mesh rather than points class. There should be at least one such option when it comes to just having a way to see the location of points in a geometry, and the points material seems to work fine when it comes to this. However there are a number of draw backs from using the Points class, and I think that I often will want to use a  mesh instance even in situations in which I am interested in the points, by using a geometry positions attribute as a way to set position values for a collection of mesh objects.


---
title: The Points material in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2021-05-15 11:53:46
version: 1.23
---

The use of [Vector3](/2018/04/15/threejs-vector3/) class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. There is not just the geometry used with a material to compose a mesh object when it comes to vectors, the position property in the Object3d class is an instance of Vector3. This position property is used to set the position of mesh objects, cameras, and a whole lot of other objects.

However what if I just want to work with a collection of vectors, and have some kind of way of just displaying some points in space rather than lines, or a solid object. Maybe there is a few ways of going about doing that actually such as just observing the position property of a mesh as a point in space, and just using built in geometry constructors for the mesh such as the Sphere geometry constructor to just serve as some geometry to surround this point of interest. When I think about it for a moment maybe that kind of approach would be a good idea actually. However there is also the [Points Constructor](https://threejs.org/docs/#api/en/objects/Points) that can be used with the Special [Points Material](https://threejs.org/docs/#api/en/materials/PointsMaterial) that is put in place just for this purpose of just drawing some points in space.

There is always at least a few different ways of going about doing something, I can not say that I bother with the points material that much when it comes to working on actual projects. So in this post I will of course be going over a few examples of the Points Constructor, but I will also be going over some other examples of this sort of thing involving collections of points in space.

<!-- more -->

## 1 - What to know before getting started

This is a post on three.js, a javaScript library that is used to work with objects in a 3d space. It is not a getting stared post on three.js, or javaScript in general, so if you are new to three.js you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. I then assume that you have at least some experience making three.js demos, and are now at thins point only interested in making a certain kind of demo where you are just dealing with a collection of points. The process of doing so is not all that different from what you might all ready be familial with when it comes to working with the Mesh constructor.

So although I will not be getting into detail about the basics of three.js here, let alone everything else that you should be up to speed with before reading this. In this section I will be briefly be going over a few things that you should know, or many read up a bit more on before continuing with the Points Constructor and the Points material.

### 1.1 - Version Numbers matter with three.js

When I first wrote this post back in May of 2018 I was using version r91 of three.js, and the last time I got around to editing this post I was using r127. Sense then a number of code breaking changes have happened when it comes to using the geometry constructor rather than the Buffer Geometry constructor. The old Geometry constructor has been removed from three.js as of version r125, so the examples here have been updated to work with the buffer geometry constructor as well as versions other chances that have happened sense then.

### 1.2 - The Buffer Geometry Constructor

Although built in geometries can be used with the Points material, more often than not I think that main reason why developers might be looking into the points material and the Points constructor is to get into making custom geometries. So it would make sense to also look into the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry/) at some point, maybe before or around the same time as starting to work with the Points Martial.

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
    // scene
    var scene = new THREE.Scene();
    // geometry
    var geometry = new THREE.SphereGeometry(1, 10, 60);
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    var pt = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.025
            }));
    scene.add(pt);
    // camera and renderer
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

## 3 - The Points Material and creating a custom geometry with the Buffer Geometry Constructor, and Rand Float Spread

Now that I have coved the basics of the TREE.Point constructor, and how it compares to the Mesh Constructor it is now time to start to look at a few more examples of the Points constructor and of course the Points material. The process of doing so involves creating an array of axis values for each axis and each point in the form of an single linear array of these values. In this example I am using the THREE.Math.randFloatSpread function to create values between zero and a given max range. I then will want to create an instance of the Buffer Geometry constructor, and create a position attribute for the geometry. The array or points will then be passed to the set attribute method of the buffer geometry instance. After that it is just a matter of passing the instance of buffer geometry to the THREE.Point constructor as the value for the first argument, followed by an instance of the Points material.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // geometry
    var i = 0,
    verts = [];
    while (i < 500) {
        var pt = new THREE.Vector3();
        pt.set(
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45));
        verts.push(pt.x, pt.y, pt.z);
        i += 1;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf
            })));
 
    // renderer and camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 4 - A spiral example of THREE.Points and THREE.PointsMatreial

The next step with this is starting to experiment with creating custom geometries, and just looking at the state of the points alone.  With that said there is starting to work out expressions for creating the array of values to be used just for the position attribute of an instance of Buffer Geometry. The full process of making a geometry instance that will work well with THREE.Mesh is a little involves, and working out the position array is just one part of the process. However when it comes to just using the THREE.Points constructor and the Points material I can just focus on the points in space, and that is all. In this example I was paying around with some expressions that result in the formation of a spiral like pattern of points.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // geometry
    var i = 0,
    iMax = 50,
    rotationCount = 4,
    vert,
    vertices = [],
    per,
    r;
    while (i < iMax) {
        // percent
        per = i / iMax;
        // radian
        r = Math.PI * 2 * rotationCount * per;
        r %= Math.PI * 2;
        // current vertex
        vert = new THREE.Vector3();
        vert.x = Math.cos(r) * (1 + 5 * per);
        vert.y = -10 + 15 * per;
        vert.z = Math.sin(r) * (1 + 5 * per);
        vertices.push(vert.x, vert.y, vert.z);
        i += 1;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
 
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    var points = new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .05
            }));
    scene.add(points);
 
    // camera and renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

There is a great deal more to look into when it comes to making a solid custom geometry, however maybe one of the first things that should be worked out is the position of the vertices. Just working out that logic with the use of the Points constructor is then a good starting point, and then from there it is just a question of adding all the additional properties that are needs when it comes to drawing triangles between the points, and setting material index values as well as a uv array.

## 5 - Conclusion

So the points material is an interesting alternative to the typical basic or standard material that I often use in my basic project examples that I have made thus far with working with the typical Mesh rather than points class. There should be at least one such option when it comes to just having a way to see the location of points in a geometry, and the points material seems to work fine when it comes to this. However there are a number of draw backs from using the Points class, and I think that I often will want to use a  mesh instance even in situations in which I am interested in the points, by using a geometry positions attribute as a way to set position values for a collection of mesh objects.


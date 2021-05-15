---
title: The Points material in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2021-05-15 08:08:59
version: 1.9
---

The use of [Vector3](/2018/04/15/threejs-vector3/) class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. There is not just the geometry used with a material to compose a mesh object when it comes to vectors, the position property in the Object3d class is an instance of Vector3. This position property is used to set the position of mesh objects, cameras, and a whole lot of other objects.

However what if I just want to work with a collection of vectors, and have some kind of way of just displaying some points in space rather than lines, or a solid object. Maybe there is a few ways of going about doing that actually such as just observing the position property of a mesh as a point in space, and just using built in geometry constructors for the mesh such as the Sphere geometry constructor to just serve as some geometry to surround this point of interest. When I think about it for a moment maybe that kind of approach would be a good idea actually. However there is also the [Points Constructor](https://threejs.org/docs/#api/en/objects/Points) that can be used with the Special [Points Material](https://threejs.org/docs/#api/en/materials/PointsMaterial) that is put in place just for this purpose of just drawing some points in space.

There is always at least a few different ways of going about doing something, I can not say that I bother with the points material that much when it comes to working on actual projects. So in this post I will of course be going over a few examples of the Points Constructor, but I will also be going over some other examples of this sort of thing involving collections of points in space.

<!-- more -->

## 1 - What to know before getting started

This is a post on three.js, a javaScript library that is used to work with 3d space. It is not a getting stared post on three.js, or javaScript in general. If you are new to three.js you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. I assume that you have at least some experience making three.js demos, and are not only interested in making a certain kind of demo where you are only dealing with a collection of points. Also in this post I will not be getting into every little additional detail on every other little thing about three.js, but I do have [many other posts](/categories/three-js/) on this subject.

### 1.2 - Points vs Mesh Constructors

If you have made at least a few three.js demos you might be at the point where you understand that at least part of the process is to create and add a [Mesh](/2018/05/04/threejs-mesh/) that is composed of a Geometry, and at least one material to be used when rendering that Geometry.

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

The [Mesh](/2018/05/04/threejs-mesh/) is something that binds everything together into a single package of sorts, and it has properties and methods that are appropriate for it. In the above example I am just using the Box geometry constructor as a way to just go about quickly creating a geometry, and I am using that geometry with the [basic material](/2018/05/05/threejs-basic-material/) as a way to go about skinning that geometry.

The Points constructor is like that Mesh constructor only instead of giving in a geometry composed of vertices, faces, and other properties such as vector, and face normals. I am just giving it a geometry that can just simple be a collection of vertices only, and a Material that is used just to render those points in space. So in other words the points constructor is just a more primitive kind of mesh that can also be added to a scene.

```js
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
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(
        new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf
            })));
```

## 3 - Conclusion

So the points material is an interesting alternative to the typical basic or standard material. There should be at least one such option when it comes to just having a way to see the location of points in a geometry, and the points material seems to work fine when it comes to this.
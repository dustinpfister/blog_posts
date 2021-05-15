---
title: The Points material in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2021-05-15 07:38:11
version: 1.7
---

The use of [Vector3](/2018/04/15/threejs-vector3/) class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. There is not just the geometry used with a material to compose a mesh object when it comes to vectors, the position property in the Object3d class is an instance of Vector3. This position property is used to set the position of mesh objects, cameras, and a whole lot of other objects.

However what if I just want to work with a collection of vectors, and have some kind of way of just displaying some points in space rather than lines, or a solid object. Maybe there is a few ways of going about doing that actually such as just observing the position property of a mesh as a point in space, and just using built in geometry constructors for the mesh such as the Sphere geometry constructor to just serve as some geometry to surround this point of interest. When I think about it for a moment maybe that kind of approach would be a good idea actually. However there is also the [Points Constructor](https://threejs.org/docs/#api/en/objects/Points) that can be used with the Special [Points Material](https://threejs.org/docs/#api/en/materials/PointsMaterial) that is put in place just for this purpose.

<!-- more -->

This post will mainly be about the Points Material rather than the Points constructor, but from what I have gathered thus far it looks like there might not be much to write about the Points constructor so for the moment I will cover both of theme here.

## 1 - What to know before getting started

This is a post on three.js, a javaScript library that is used to work with 3d space. It is not a getting stared post on three.js, or javaScript in general. If you are new to three.js you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. I assume that you have at least some experience making three.js demos, and are not only interested in making a certain kind of demo where you are only dealing with a collection of points. Also in this post I will not be getting into every little additional detail on every other little thing about three.js, but I do have [many other posts](/categories/three-js/) on this subject.

## 2 - Points vs Mesh Constructors

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

The [Mesh](/2018/05/04/threejs-mesh/) is something that binds everything together into a single package of sorts, and it has properties and methods that are appropriate for it, as is the same with the instance of [geometry](/2018/04/14/threejs-geometry/), and the [basic material](/2018/05/05/threejs-basic-material/) used in the above example.

The Points constructor is like that Mesh constructor only instead of giving in a geometry composed of vertices, faces, and other properties such as vector, and face normals. I am just giving it a geometry that can just simple be a collection of vertices only, and a Material that is used just to render those points in space. So in other words the points constructor is just a more primitive kind of mesh that can also be added to a scene.

```js
var pointsGeometry = new THREE.Geometry();
var i = 0;
while (i < 500) {
 
    var star = new THREE.Vector3();
    star.set(
        THREE.Math.randFloatSpread(45),
        THREE.Math.randFloatSpread(45),
        THREE.Math.randFloatSpread(45));
 
    pointsGeometry.vertices.push(star);
 
    i += 1;
 
}
 
scene.add(
    new THREE.Points(
        pointsGeometry, 
        new THREE.PointsMaterial({
            color: 0x00afaf
        })
    )
);
```

## 3 - Conclusion

So the points material is an interesting alternative to the typical basic or standard material. There should be at least one such option when it comes to just having a way to see the location of points in a geometry, and the points material seems to work fine when it comes to this.
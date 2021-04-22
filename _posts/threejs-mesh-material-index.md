---
title: Using an array of materials, and setting material index values in three.js
date: 2018-05-14 09:54:00
tags: [js,three.js]
layout: post
categories: three.js
id: 187
updated: 2021-04-22 10:11:59
version: 1.14
---

When working with a [mesh](/2018/05/04/threejs-mesh/) in [three.js](https://threejs.org/) a single instance of some kind of mesh material can be passed to the mesh constructor as the second argument which will be used to skin the the whole geometry of the mesh. This is fine if you are okay with every face in the [geometry](/2018/04/14/threejs-geometry/) being skinned with the same material, otherwise you might want to pass an array of [materials](/2018/04/30/threejs-materials/) instead. 

When working with an array of materials there is a property of a [face3](/2018/05/11/threejs-face3/) instance in the geometry of the mesh that is of interest when setting the material index property of the faces, or at least that was the case with the old Geometry Constructor that was removed in r125 of threejs. So there is how to go about doing this sort of thing with a Buffered Geometry that is still part of the core f the three.js library.

In this post I will be covering some basic demos of how to work with more than one material, and how to go about setting the material index values of a geometry.

<!-- more -->

## 1 - What to know before getting into Mesh Material index values

It should go without saying that this is not a getting started post with three.js, and I also will not be getting into the basics of javaScript and any additional topics that you should have a solid grasp on before hand. Still in this section I will be going over some of the things that you show know before getting into mesh material index values. If you thing that you know what you need to know with that you can of course skip over this section.

### 1.1 - Version Numbers matter big time with three.js

Three.js has been, and as of this writing still is, a fast moving target of a library when it comes to development. When I first wrote this post back in May of 2018 I was using r91 of threejs, and at this time there is now an r127 which is what I am observing at the time that I have edited this post last.

## 2 - New example with groups array using r127

So the first example that I should cover here is an example that makes use of a new version of threejs, as of this writing I was using r127. In any case the process is somewhat similar an array of materials must be used rather than just a single material. After that it is just a matter of making sure that each face has the proper index value in the materials array set.

In late versions of threejs that only support the use of Buffered Geometry in the core of the library itself there should be a groups array for a geometry. This is now the array of face objects that contain matreial index properties. When it comes to this example I am using the built in Box Geometry constructor that will create and return a buffered geometry, and on top of that there will be index values set for it by default that will work well with an array of materials that is a collection of six materials one for each side. However what if I just want to use three? In that case I will want to do something to make sure that I am only using index values in that range, such as looping over the groups object and setting the material index values that way.

```js

(function () {
 
    // REVISION 127 was used for this example
    console.log(THREE.REVISION);
 
    // ARRAY OF MATERIALS
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];
 
    // geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);
 
    // SET THE INDEX VALUES FOR EACH FACE
    geometry.groups.forEach(function (face, i) {
        face.materialIndex = Math.floor(i % materials.length);
    });
 
    // mesh
    var mesh = new THREE.Mesh(
            // geometry as first argument
            geometry,
            // array of materials as the second argument
            materials);
    // scene, add mesh
    var scene = new THREE.Scene();
    scene.add(mesh);
    // camera, renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Old Basic Example of an array of materials, and face material index values using r91.

A basic example of this would be to just have an array of instances of some kind of Mesh Material such as the Mesh Basic Material. Once I have an array the materials can be used by setting the material index value of all face3 instances in the geometry that I am using to point to the corresponding index of the material in the array of materials that I want to use with a given face.

```js
(function () {
 
    // REVISION 91 was used for this example
    console.log(THREE.REVISION);
 
    // an array of materials
    var materials = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];
 
    // create the mesh
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // set material index values
    var len = materials.length;
    geometry.faces.forEach(function (face3, i) {
        face3.materialIndex = Math.floor(i % (len * 2) / 2);
    });
    // create the mesh
    var mesh = new THREE.Mesh(
            geometry,
            materials);
 
    // SCENE
    var scene = new THREE.Scene();
    // add mesh to scene
    scene.add(mesh);
    // some helpers
    scene.add(new THREE.FaceNormalsHelper(mesh, 2, 0x00ff00, 1));
    scene.add(new THREE.VertexNormalsHelper(mesh, 2, 0xff0000, 1));
 
    // camera, orbit controls, renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var controls = new THREE.OrbitControls(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // loop
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
    };
 
    loop();
 
}
    ());
```

Using modulo to get the remainder when diving the current face index over the length of materials will result in an effect where each material is used in an alternating fashion. I can write different expressions to get different effects, but you should get the basic idea. The process is to have a collection of materials, and then do what is necessary to see that each face is painted with the desired material.

## 4 - Conclusion

When starting to make a real project of one kind or another it is important to know how to go about doing this sort of thing of course. Event when it comes to developing some kind of crude yet effective kind of style for 3d modeling I am still going to want to know how to skin different faces with different materials.


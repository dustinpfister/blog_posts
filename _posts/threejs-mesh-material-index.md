---
title: Using an array of materials, and setting material index values in three.js
date: 2018-05-14 09:54:00
tags: [js,three.js]
layout: post
categories: three.js
id: 187
updated: 2022-04-18 10:46:28
version: 1.25
---

When working with a [Mesh Object](/2018/05/04/threejs-mesh/) in [three.js](https://threejs.org/) a single instance of some kind of mesh material can be passed to the mesh constructor as the second argument which will be used to skin the geometry of the Mesh. This is fine if I am okay with every face in the [geometry](/2018/04/14/threejs-geometry/) being skinned with the same material, otherwise I might want to do something else. In some cases I might be fine with using the same material for all the faces, I just want to do something with the [uv attribute of the buffered geometry](/2021/06/09/threejs-buffer-geometry-attributes-uv/) instance. That is to change what the offset values in a geometry that are used for a texture that is use for one or more of the various maps that are used for the material. However another option might be to have not just one material, but an array of [materials](/2018/04/30/threejs-materials/) and then have a way to set what the material index value is for each face in the geometry.

When working with an array of materials there is a property of a [face3](/2018/05/11/threejs-face3/) instance in the geometry of the mesh that is of interest when setting the material index property of the faces, or at least that was the case with the old Geometry Constructor that was removed in r125 of threejs. So then there is how to go about setting material index values with an instance of the Buffered Geometry constructor that is still part of the core of the three.js library in late versions of threejs. In this post then I will be touching base on this topic of working with an array of materials in a threejs project then, rather than alternatives to doing so such as uv mapping, or having [groups of objects](/2018/05/16/threejs-grouping-mesh-objects/).

<!-- more -->

## What to know before getting into Mesh Material index values

It should go without saying that this is not a [getting started post with three.js](/2018/04/04/threejs-getting-started/), and I also will not be getting into the basics of javaScript, and any additional topics that you should have a solid grasp on before hand. Still in this section I will be going over some of the things that you show know before getting into mesh material index values of group objects of a buffer geometry instance.

### Version Numbers matter big time with three.js

Three.js has been, and as of this writing still is, a fast moving target of a library when it comes to development. When I first wrote this post back in May of 2018 I was using r91 of threejs, and at this time there is now an r135 which is what I am observing at the time that I have edited this post last. Between these two versions of threejs a whole lot of code breaking changes have happened, and this will likely continue to be the case moving forward.

### It might be good to look over the Buffer Geometry class in detail if you can get around to it

This is a post on the mesh class object and three.js and how to use an array of materials rather than just one with a geometry. That is when using more than one material with a mesh there is creating an instance of a mesh, passing a geometry as the first argument, and an array of materials as the second argument. When it comes to having  control over what material index value is for what that is a matter of what it is that is going on with the instance of buffer geometry rather than the array of materials or the mesh object as a whole. 

When it comes to using the built in geometry constructors to create an instance of buffer geometry groups and material index values for them are set up for you and it is just a matter of looping over the groups of the geometry and changing the index values to the desired value if needed. However when it comes to making a custom geometry, as well as some of the built in geometries adding groups is something that needs to be done manually. In any case it makes sense to look into the [buffer geometry in greater detail](/2021/04/22/threejs-buffer-geometry/) beyond the scope of just this post alone.

## 1 - New example with groups array using r127

So the first example that I should cover here is an example that makes use of a new version of threejs, as of this writing I was using r127. In any case the process is somewhat similar an array of materials must be used rather than just a single material. After that it is just a matter of making sure that each face has the proper index value in the materials array set.

In late versions of threejs that only support the use of Buffered Geometry in the core of the library itself there should be a groups array for a geometry. This is now the array of face objects that contain material index properties. When it comes to this example I am using the built in Box Geometry constructor that will create and return a buffered geometry, and on top of that there will be index values set for it by default that will work well with an array of materials that is a collection of six materials one for each side. However what if I just want to use three? In that case I will want to do something to make sure that I am only using index values in that range, such as looping over the groups object and setting the material index values that way.

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

The situation will change up a little from one situation to the next, but the basic idea is there.

## 2 - Old Basic Example of an array of materials, and face material index values using r91.

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

## 3 - Conclusion

When starting to make a real project of one kind or another it is important to know how to go about doing this sort of thing of course. Event when it comes to developing some kind of crude yet effective kind of style for 3d modeling I am still going to want to know how to skin different faces with different materials.

### 3.1 - More Examples of Material index values

On my post on the [sphere geometry constructor](/2021/05/26/threejs-sphere/) I worked out an example that has to do with creating groups for a sphere geometry. However maybe the best additional post on this topic thus far would be my [post on the plane geometry constructor](/2019/06/05/threejs-plane/) where I worked out a few more examples of this sort of thing.

### 3.2 - Additional THREEJS reading

To really get a solid grasp on working with material index values, as well as the materials themselves, and everything that branches off from that it would be best to just start making one or two actual projects of some kind and learn as you go. At least I have found that is the best way to go about things speaking from my experience thus far. With that said it might be a good idea to check out some of my threejs project examples thus far, one that stands out when it comes to material index values would be my [guy on a hamster wheel example](/2021/04/19/threejs-examples-hamster-wheel/) where I am making use of material index values, and canvas generated textures for those materials.

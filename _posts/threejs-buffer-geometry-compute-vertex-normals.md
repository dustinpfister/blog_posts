---
title: Compute Vertex Normals for Buffer Geometry in threejs
date: 2022-04-22 10:22:00
tags: [three.js]
layout: post
categories: three.js
id: 980
updated: 2022-04-22 10:39:00
version: 1.3
---

The process of creating a custom geometry, or mutating a built in geometry in threejs might be a little involved, but still there is only so much to be aware of to get started. The first step might be to work out the positions attribute which is the values for the actual points in space. However after that when it is also a good idea to work out what the deal should be with the normals attribute. In some cases I might have to work this out manually, however in most cases just calling the compute vertex normals method will work just fine, which is what this post is about today.


<!-- more -->


## 1 - Basic compute vertex normals method example

When working with one of the built in geometry constructors the normals are worked out for me as that is part of making a comprehensive geometry constructor function. However when making a custom geometry from the ground up I will of course have to make attribute one way or another. For this basic example of the compute vertex normals method I am then just making a very simple geometry of a single triangle, and then calling the compute vertex normals method of the buffer geometry as a way to go about creating the normals attribute.

```js
(function () {
     // SCENE, CAMERA, RENDERER, and LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 0, 3);
    scene.add(dl);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                -1.0, 0.0, 0.0,
                1.5, 0.0, 0.0,
                1.0, 1.0, 0.0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // COMPUTE VERTEX NORMALS FOR THE GEMOERTY
    geometry.computeVertexNormals();
    // MESH with GEOMETRY, and STANDARD MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide
            }));
    scene.add(custom);
    // RENDER
    renderer.render(scene, camera);
}
    ());
```

So now that I have a normals attribute with this geometry I can now use a light source and see the material when using a material like that of the standard material with a light source. Although that might be the case there is still one additional attribute that I will need to add to the geometry in order for this to be a done deal in terms of the core set of attributes that are needed which would be the uv attribute. However for the sake of this post I think I should first cover a few more examples that focus more so on the state of this normals attribute and how to know what the state of it is.

## Conclusion

The compute vertex normals method will work just fine for most cases as a way to create, or update the normals attribute of a buffer geometry instance. However there are some cases in which I might need to manually edit these values also, so I can not just call this method and be done with it all the time.
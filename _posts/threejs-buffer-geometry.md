---
title: The Buffer Geometry Constructor in threejs
date: 2021-04-22 16:11:00
tags: [three.js]
layout: post
categories: three.js
id: 851
updated: 2021-04-22 16:25:08
version: 1.5
---

As of revision 125 pf [threejs](https://threejs.org/) The Geometry Constructor has been removed which will result in code breaking changes for a whole Internet of threejs example. So this week I have been editing old posts, and writing some new ones on threejs, and I have noticed that I have not wrote a post on the buffer geometry constructor just yet. I have wrote one on the old Geometry Constructor that I preferred to use in many of my examples, but now that the constructor is no more I am going to need to learn how to just use the Buffer Geometry Constructor when it comes to making my own geometries.

The basic example of a [buffer Geometry in the three.js documentation works okay](https://threejs.org/docs/index.html#api/en/core/BufferGeometry.groups) as a starting point, but it does not cover every little detail when it comes to what I should be aware of when making a custom geometry. So in this post I will be going over the basic examples that I have worked out thus far when it comes to just working with some very simple starting points with a custom geometry using the buffer geometry constructor rather than the plain old geometry constructor.

<!-- more -->


## 2 - A Basic starting point for the Buffer Geometry Constructor in threejs

This first example is not all that different from that of the example that I have found at the official three.js documentation website.

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
 
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0,0,0,
                1,0,0,
                1,1,0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
 
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            })));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Conclusion

I have a lot of work cut out for me when it comes to working on editing a lot of my old three.js content. A lot of my examples made use of the old geometry constructor, so They will need to be updated to work with the buffered geometry constructor if I want them to still work with late versions of three.js. The only other options would be to just make quick edits that mention what version of three.js I was using when I made they example which might prove to be a good temporarily fix when it comes to editing.

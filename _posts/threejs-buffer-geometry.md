---
title: The Buffer Geometry Constructor in threejs
date: 2021-04-22 16:11:00
tags: [three.js]
layout: post
categories: three.js
id: 851
updated: 2021-04-22 16:57:33
version: 1.16
---

As of revision 125 pf [threejs](https://threejs.org/) The Geometry Constructor has been removed which will result in code breaking changes for a whole Internet of threejs example. So this week I have been editing old posts, and writing some new ones on threejs, and I have noticed that I have not wrote a post on the buffer geometry constructor just yet. I have wrote one on the old Geometry Constructor that I preferred to use in many of my examples, but now that the constructor is no more I am going to need to learn how to just use the Buffer Geometry Constructor when it comes to making my own geometries.

The basic example of a [buffer Geometry in the three.js documentation works okay](https://threejs.org/docs/index.html#api/en/core/BufferGeometry.groups) as a starting point, but it does not cover every little detail when it comes to what I should be aware of when making a custom geometry. So in this post I will be going over the basic examples that I have worked out thus far when it comes to just working with some very simple starting points with a custom geometry using the buffer geometry constructor rather than the plain old geometry constructor.

<!-- more -->

## 1 - The buffer geometry constructor in threejs and what to know first

This is a post on the buffer geometry constructor in three.js which was one of two options to create a custom geometry in three.js before r125, but after r125 is now they only way to do so when it comes to the core library by itself anyway. This is then not a getting started type post with three.js or any additional skills that are required before hand.

## 2 - A Basic starting point for the Buffer Geometry Constructor in threejs

This first example is not all that different from that of the example that I have found at the official three.js documentation website. However I made an effort to try to make the example yet even more easy to follow by having the geometry be just a single triangle.

I started out by just calling the Buffer Geometry constructor with the new keyword to create a new clean instance of the buffer geometry. The next step is to add some points or vertices as they are often called for the geometry. To do this I will want to create an instance of a Float32Array which is one of the many kinds of type arrays to work with in javaScript now these days. 

I then just added three points to the array by having just a linear collection of numbers where the first number is the x axis of the first point, the second element is y for the first point, the third is for the z value of the first point, and so on when it comes to additional points. I then just need to use the set attribute method of the buffer geometry instance of create the position attribute of the geometry passing the array of points as the first argument and the number 3 as the next argument.

I now just need to add this geometry to a mesh by calling the mesh constructor, and passing the geometry as the first argument, and then a material as the second argument. When it comes to a very basic example like this one, the basic material will work just fine for this simple example that is just a single face.

```js
(function () {
 
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
 
    // MESH with GEOMETRY, and Basic MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
 
    // add custom to the scene
    scene.add(custom);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - Using the normal material

So if I take my basic example that I worked out above and switch to the normal material rather than the basic material, then I get nothing. That should be what is expected sense there is no normals array for the geometry just yet. There might be more then one way to go about making a normals array, but the quick and simple way might be to just call the compute vertex normals method of the geometry.

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
 
    // compute vertex normals
    geometry.computeVertexNormals();
 
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial({
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

## 4 - Material index values and groups

So how about material index values for a geometry that consists of more then one face? Well this is where the add group method comes into play as it can be used to create an array of group objects where each group object contains a material index property. For this example I am then going to want to have just a slightly more complex geometry in which I now have two triangle in space rather than just one. Sense that is the case I and then call the add group method twice to create two face objects for each triangle while doing so I can set what the material index values should be.

Now that I have that done when I create a mesh with this geometry I can now pass an array of materials, and each material will then be used for each face depending on the material index values.

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
                0, 0, 0, // triangle 1
                1, 0, 0,
                1, 1, 0,
 
                0, 0, 0, // triangle 2
                0, 1, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
 
    // add groups, and set material index values
    geometry.addGroup(0, 3, 1);
    geometry.addGroup(3, 3, 0);
 
    console.log(geometry.groups);
    console.log(new THREE.BoxGeometry(1, 1, 1));
 
    // compute vertex normals
    //geometry.computeTangents();
 
    // MESH with GEOMETRY, and Normal MATERIAL
    scene.add(new THREE.Mesh(
            geometry,
 
            [
                new THREE.MeshBasicMaterial({
                    color: 'red',
                    side: THREE.DoubleSide
                }),
                new THREE.MeshBasicMaterial({
                    color: 'lime',
                    side: THREE.DoubleSide
                })
            ]));
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 5 - Working with light

Now it is time to see how a custom geometry works with a situation involving a little light, and the use of a materials that will respond to light.

```js
(function () {
 
    // SCENE
    var scene = new THREE.Scene();
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 2, 4);
    camera.lookAt(0, 0, 0);
 
    var materials = [
        new THREE.MeshStandardMaterial({
            color: 'red',
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 'lime',
            side: THREE.DoubleSide
        })
    ];
 
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0, // triangle 1
                1, 0, 0,
                1, 1, 0,
 
                0, 0, 0, // triangle 2
                0, 1, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
 
    // compute vertex normals
    geometry.computeVertexNormals();
 
    // add groups, and set material index values
    geometry.addGroup(0, 3, 0);
    geometry.addGroup(3, 3, 1);
 
    // MESH with GEOMETRY, and Normal MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            materials);
    scene.add(custom);
 
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            materials);
 
    box.position.set(-1, 0, 0);
 
    box.geometry.groups.forEach(function (face, i) {
        face.materialIndex = i % materials.length;
    });
 
    scene.add(box);
 
    // ADD A POINT LIGHT
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(4, 2, 4);
    scene.add(pointLight);
 
    // add AmbientLight
    var light = new THREE.AmbientLight(0xffffff);
    light.intensity = 0.2;
    scene.add(light);
 
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // LOOP
    var frame = 0,
    maxFrame = 200,
    fps_target = 24,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs >= 1 / fps_target) {
            var per = frame / maxFrame,
            bias = Math.abs(.5 - per) / .5,
            r = -Math.PI * 2 * per;
 
            custom.rotation.set(0, Math.PI * 2 * per, 0);
 
            renderer.render(scene, camera);
            frame += 1;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
 
}
    ());
```

## 6 - Conclusion

I have a lot of work cut out for me when it comes to working on editing a lot of my old three.js content. A lot of my examples made use of the old geometry constructor, so They will need to be updated to work with the buffered geometry constructor if I want them to still work with late versions of three.js. The only other options would be to just make quick edits that mention what version of three.js I was using when I made they example which might prove to be a good temporarily fix when it comes to editing.

There might be more to work out when it comes to just some very basic examples like the ones that I worked out for this post when it comes to the various properties of a geometry and how they apply to various features of three.js. For now they seem to work okay, but I am sure that there will be some minor fixes for some of these examples when and if I get around to them.


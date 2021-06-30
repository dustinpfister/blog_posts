---
title: The Buffer Geometry Constructor in threejs
date: 2021-04-22 16:11:00
tags: [three.js]
layout: post
categories: three.js
id: 851
updated: 2021-06-30 14:36:13
version: 1.32
---

As of revision 125 of [threejs](https://threejs.org/) the [Geometry Constructor](/2018/04/14/threejs-geometry/) has been removed which will result in code breaking changes for a whole Internet of threejs examples. So this week when it comes to my threejs content I have been editing old posts, and writing some new ones, and I have noticed that I have not wrote a post on the buffer geometry constructor just yet. I have wrote one on the old Geometry Constructor that I preferred to use in many of my examples, but now that the constructor is no more I am going to need to learn how to just use the Buffer Geometry Constructor when it comes to making my own geometries.

The basic example of a [buffer Geometry in the three.js documentation works okay](https://threejs.org/docs/index.html#api/en/core/BufferGeometry.groups) as a starting point, but it does not cover every little detail when it comes to what I should be aware of when making a custom geometry. There is not just creating the positions attribute of a geometry, but also the normal, and uv attributes for a geometry. There are also a whole bunch of other details such as working out an array of groups, and material index values.

So in this post I will be going over the basic examples that I have worked out thus far when it comes to just working with some very simple starting points with a custom geometry using the buffer geometry constructor rather than the plain old geometry constructor.

<!-- more -->

## 1 - The buffer geometry constructor in threejs and what to know first

This is a post on the buffer geometry constructor in three.js which was one of two options to create a custom geometry in three.js before r125, but after r125 is now they only way to do so when it comes to the core library by itself at least. This is then not a [getting started type post with three.js](/2018/04/04/threejs-getting-started/) or any additional skills that are required before hand. However in this section I will be going over some things that you might want to read up more on before continuing to read the rest of this post.

### 1.1 - The source code of these examples is on my guthub

The source code for these examples can be found in my test [threejs github repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry). The latest state of the source code can always be found there if I just happen to be working on some new examples, as well as making some changes to the ones that I have all ready made. If you want to make a pull request for whatever the reason that would also of course be the place to do so.

### 1.2 - The Scene Object, Mesh Objects, Cameras, and Object3d in general

In order to make use of a geometry I will need a [Mesh object](/2018/05/04/threejs-mesh/) and pass the geometry to the mesh object as the first argument, and a material as the second argument. After that I will want to make the mesh object a child of a [Scene object](/2018/05/03/threejs-scene/), which I can then pass to a renderer with a camera such as the [perspective camera](/2018/04/07/threejs-camera-perspective/). All of these objects that is a Mesh object, scene object, and a camera are all based on a base class called [Object3d](/2018/04/23/threejs-object3d).

### 1.3 - Version Numbers matter with threejs.

When I first wrote this post I was using r127 of threejs, and the code here may very well break on older or newer version of threejs. I do try to do my best to keep my threejs content up to date, but at times it might be a while between edits.

## 2 - The position attribute, and a Basic starting point for the Buffer Geometry Constructor in threejs

This first example is not all that different from that of the example that I have found at the official three.js documentation website. However I made an effort to try to make the example yet even more easy to follow by having the geometry be just a single triangle. The first and for most step is to come up with the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/), there is also the normal and uv attributes that are important when it comes to light and textures, but for this basic example it is just the position attribute that I am going to care about for now.

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

## 3 - Creating a normal attribute and using the normal material

So if I take my basic example that I worked out above and switch to the normal material rather than the basic material, then I get nothing. That should be what is expected sense there is no [normal attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/) for the geometry just yet. There might be [more then one way to go about making a normals attribute](https://stackoverflow.com/questions/29202480/three-js-calculating-vertex-normals), but the quick and simple way might be to just call the [compute vertex normals method](https://threejs.org/docs/#api/en/core/BufferGeometry.computeVertexNormals) of the geometry.

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

This might prove to be a good start at least, but in order to really know what is going on with face normals I might need to use some kind of helper to see what the direction of each normal vector is.

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

Now it is time to see how a custom geometry works with a situation involving a little light, and the use of a materials that will respond to light. With that said this one might prove to be a little bit of a work in progress at least at the point that I started writing this post anyway. When I have this example up and running it seems to work okay, but the colors do not always look the way that I think they should as I move them around. A quick fix for this was to just add a little ambient light rather than just having a point light like I typically do in many of my examples.

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

## 6 - Rotation and translation of buffer geometry

When I add a geometry to a Mesh object the resulting Mesh object is based off of Object3d and as such it has a position and rotation property that can be used as a way to translate and rotate the mesh object as a whole. However I think that it is important to point out that this is the way to go about moving a geometry around once the translation and rotation of a geometry is in the initial fixed state that I want. If that is not the case I will want to adjust that using the translate and rotation methods of the Buffer geometry class instance, and not that of the containing mesh object. When doing this sort of thing I typically will only want to adjust the position and rotation of the geometry just once, when it comes to updating things over and over again in a loop I will want to stick to the object3d values that there are to work with.


```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // geometry
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                0, 0, 0, // triangle 1
                1, 0, 0,
                1, 1, 0
            ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // TRANSLATE AND ROTATE
    geometry.rotateZ(Math.PI / 180 * 135);
    geometry.translate(0.75, 0, 0);
 
    // mesh
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                color: 'red',
                side: THREE.DoubleSide
            }));
    scene.add(custom);
    // render, camera, and loop
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(1, 2, 4);
    camera.lookAt(0, 0, 0);
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

## 7 - Conclusion

I have a lot of work cut out for me when it comes to working on editing a lot of my old three.js content. A lot of my examples made use of the old geometry constructor, so They will need to be updated to work with the buffered geometry constructor if I want them to still work with late versions of three.js. The only other options would be to just make quick edits that mention what version of three.js I was using when I made they example which might prove to be a good temporarily fix when it comes to editing.

There might be more to work out when it comes to just some very basic examples like the ones that I worked out for this post when it comes to the various properties of a geometry and how they apply to various features of three.js. For now they seem to work okay, but I am sure that there will be some minor fixes for some of these examples when and if I get around to them.


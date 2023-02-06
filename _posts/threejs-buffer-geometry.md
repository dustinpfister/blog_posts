---
title: The Buffer Geometry Constructor in threejs
date: 2021-04-22 16:11:00
tags: [three.js]
layout: post
categories: three.js
id: 851
updated: 2023-02-06 17:07:41
version: 1.58
---

As of revision 125 of [threejs](https://threejs.org/) the [Geometry Constructor](/2018/04/14/threejs-geometry/) has been removed which will result in code breaking changes for a whole Internet of threejs examples. So this week when it comes to my threejs content I have been editing old posts, and writing some new ones, and I have noticed that I have not wrote a post on the buffer geometry constructor just yet. I have wrote one on the old Geometry Constructor that I preferred to use in many of my examples, but now that the constructor is no more I am going to need to learn how to just use the Buffer Geometry Constructor when it comes to making my own geometries.

The basic example of a [buffer Geometry in the three.js documentation works okay](https://threejs.org/docs/index.html#api/en/core/BufferGeometry.groups) as a starting point, but it does not cover every little detail when it comes to what I should be aware of when making a custom geometry. There is not just creating the positions attribute of a geometry, but also the normal, and uv attributes for a geometry as well that are also of importance when it comes to using custom geometries with various materials that use textures and respond to light sources. There are also a whole bunch of other details such as working out an array of groups, and material index values.

So in this post I will be going over the basic examples that I have worked out thus far when it comes to just working with some very simple starting points with a custom geometry using the buffer geometry constructor rather than the plain old geometry constructor. Also in this post I will be going over some examples that are just examples of the various prototype methods and features that one should know about when it comes to working with buffer geometry in general, regardless of what it was made.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/l0CkGHtllxw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The buffer geometry constructor in threejs and what to know first

This is a post on the buffer geometry constructor in three.js which was one of two options to create a custom geometry in three.js before r125, but after r125 is now they only way to do so when it comes to the core library by itself at least. This is then not a [getting started type post with three.js](/2018/04/04/threejs-getting-started/) or any additional skills that are required before hand. However in this section I will be going over some things that you might want to read up more on, as well as be aware of for one reason or another, before continuing to read the rest of this post.

### The Scene Object, Mesh Objects, Cameras, and Object3d in general

In order to make use of a geometry I will need a [Mesh object](/2018/05/04/threejs-mesh/) and pass the geometry to the mesh object as the first argument, and a material as the second argument. After that I will want to make the mesh object a child of a [Scene object](/2018/05/03/threejs-scene/), which I can then pass to a renderer with a camera such as the [perspective camera](/2018/04/07/threejs-camera-perspective/). All of these objects that is a Mesh object, scene object, and a camera are all based on a base class called [Object3d](/2018/04/23/threejs-object3d).

### Know a thing or two about materials also

In order to do anything interesting with a geometry in threejs I am going to want to make the geometry part of a Mesh object, or in some cased a Line object. When creating a Mesh object I will want to of course pass the geometry to the mesh constructor, but I will also want to pass [a material](/2018/04/30/threejs-materials/) along with it to. In the event that I just care about the position property and that is it, then I can pass the geometry to the Line constructor and use a line material actually, with lines I do not have to have so much about the other attributes. However when it comes to using the Mesh object I am going to want to have a position, and at least a normal attribute when it comes to using the normal material. Often I will also need a uv attribute also if I want to do anything with textures using materials like the basic material, and the standard material.

### The source code of these examples is on my github

The source code for these examples can be found in my test [threejs github repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry). The latest state of the source code can always be found there if I just happen to be working on some new examples, as well as making some changes to the ones that I have all ready made. If you want to make a pull request for whatever the reason that would also of course be the place to do so.

### Version Numbers matter with threejs.

When I first wrote this post I was using r127 of threejs, and the last time I came around to doing a little editing I was using r135 and found that these examples are still working okay with that revision as well. Still at some point in the future the code here may very well break on older or newer version of threejs. I do try to do my best to keep my threejs content up to date, but at times it might be a while between edits.

## 1 - The position attribute, and a Basic starting point for the Buffer Geometry Constructor in threejs

This first example is not all that different from that of the example that I have found at the official three.js documentation website. However I made an effort to try to make the example yet even more easy to follow by having the geometry be just a single triangle. The first and for most step is to come up with the [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/), there is also the normal and uv attributes that are important when it comes to light and textures, but for this basic example it is just the position attribute that I am going to care about for now.

I started out by just calling the Buffer Geometry constructor with the new keyword to create a new clean instance of the buffer geometry. The next step is to add some points or vertices as they are often called for the geometry. To do this I will want to create an instance of a Float32Array which is one of the many kinds of type arrays to work with in javaScript now these days. 

I then just added three points to the array by having just a linear collection of numbers where the first number is the x axis of the first point, the second element is y for the first point, the third is for the z value of the first point, and so on when it comes to additional points. I then just need to use the set attribute method of the buffer geometry instance of create the position attribute of the geometry passing the array of points as the first argument and the number 3 as the next argument.

I now just need to add this geometry to a mesh by calling the mesh constructor, and passing the geometry as the first argument, and then a material as the second argument. When it comes to a very basic example like this one, the basic material will work just fine for this simple example that is just a single face.

```js
(function () {

    // SCENE, CAMERA, RENDERER
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 1, 3);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // GEOMETRY, MESH
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                -1, 0, 0,
                1, 0, 0,
                1, 1.25, 0
            ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    var mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide
            }));
    scene.add(mesh);
    camera.lookAt(mesh.position)
 
    // RENDER
    renderer.render(scene, camera);
 
}
    ());
```

This might be okay when it comes to just starting out, but there is a great deal more to do on top of just this even when it comes to just playing around with a single triangle. You will notice for example that I used the THREE.DocubleSide value for the side property of the basic material that I am using to skin the triangle here. So there is then the question of being able to set which side of the triangle is the 'front side', and also lots of other things that have to do with textures. So lets look at a few more examples that have to do with creating a custom buffer geometry instance from the ground up.

## 2 - Creating a normal attribute and using the normal material

So if I take my basic example that I worked out above and switch to the normal material rather than the basic material, then I get nothing. That should be what is expected sense there is no [normal attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/) for the geometry just yet. There might be [more then one way to go about making a normals attribute](https://stackoverflow.com/questions/29202480/three-js-calculating-vertex-normals), but the quick and simple way might be to just call the [compute vertex normals method](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) of the geometry.

```js
(function () {
    // SCENE, CAMERA
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // MESH with GEOMETRY, and Normal MATERIAL
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
    var mesh1 = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial({
                side: THREE.FrontSide
            }));
    mesh1.rotateY(Math.PI * 0.15);
    mesh1.position.x  = 0.50;
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
            geometry,
            new THREE.MeshNormalMaterial({
                side: THREE.BackSide
            }));
    mesh2.rotateY(Math.PI * 0.75);
    mesh2.position.x  = -0.50;
    scene.add(mesh2);
    // vertex helper
    var vertHelper = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper)
    var vertHelper = new THREE.VertexNormalsHelper(mesh2, 0.5, 0x00ff00);
    scene.add(vertHelper) 
 
    // RENDER
    renderer.render(scene, camera);
}());
```

This might prove to be a good start at least, but in order to really know what is going on with face normals I might need to use some kind of helper to see what the direction of each normal vector is. With that said in this example I am making use of the THREE.VertextNormalsHelper which I can add to a project on top of the threejs file. This file should be located in the examples folder of the threejs Github repository. When using the normals helper it is clear that the normals attribute is what is used to find out what side of a triable is the front side of it which is why I am using the THREE.BackSide and THREE.FrontSide values for the side values of the materials that I am using for these mesh objects.

## 3 - The uv attribute

There is then the position attribute, the normals attribute and then one more major attribute of interest in order to make a geometry that will work well with most materials and that is the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/). 

This is where I store data that will have to do with texture offset data that will be used to map a 2d texture to the 3d model. So in order to really get a sense of what the deal is with this uv attribute on top of how to create the attribute I will also want to have a texture for the material that I use with the mesh as well. 

So once again I will need to create an attribute this time for the uv, however in order to really know if what I have done is working or not I will also need a texture to use with the material. There are a number of ways to create o load a textures, however for this example I will want to just stick with a JavaScript solution to make the texture. One way to do about doing this would be to make use of a [Data texture](/2022/04/15/threejs-data-texture/).

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER, LIGHT
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(10, 10));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(0, 0.5, 3);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(1, 3, 2)
    scene.add(dl);
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
                0, 0, 0,
                1, 0, 0,
                1, 1, 0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // compute vertex normals
    geometry.computeVertexNormals();
    // creating a uv
    const uvs = new Float32Array([
                0, 0,
                1, 0,
                1, 1
            ]);
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    //-------- ----------
    // TEXTURE
    //-------- ----------
    const width = 4,
    height = 4;
    const size = width * height;
    const data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v;
        data[stride + 1] = v;
        data[stride + 2] = v;
        data[stride + 3] = 255;
    }
    const texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    const mesh1 = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.FrontSide
            }));
    //-------- ----------
    // MESH
    //-------- ----------
    mesh1.rotateY(Math.PI * 0.15);
    mesh1.position.x = -0.50;
    scene.add(mesh1);
    // vertex helper
    const vertHelper = new THREE.VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
    scene.add(vertHelper)
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
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

When I add a geometry to a Mesh object the resulting Mesh object is based off of Object3d and as such it has a position and rotation property that can be used as a way to translate and rotate the mesh object as a whole. However I think that it is important to point out that this is the way to go about moving a geometry around once the translation and rotation of a geometry is in the initial fixed state that I want. If that is not the case I will want to adjust that using the translate and [rotation methods of the Buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/) class instance, and not that of the containing mesh object. 

When doing this sort of thing I typically will only want to adjust the position and rotation of the geometry just once, when it comes to updating things over and over again in a loop I will want to stick to the object3d values that there are to work with.

In the even that I do want to update the geometry over and over again I tend to run into problems compared to what I am used to when working with the Euler class that I deal with when working with the rotation property of an mesh object. The main problem that I run into is that the rotation methods of buffer geometry apply deltas to the current state of the geometry rather than setting the rotation from a kind of home position. One way to address this would be to use the copy method to always set the geometry to a desired starting state, and then translate from there as I am doing in this sections source code example.

```js
(function () {
    //******** **********
    // SCENE, CAMERA, RENDER
    //******** **********
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(7, 7)); // grid helper for the scene
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(6, 8, 6);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** **********
    // MESH OBJECTS
    //******** **********
    var mesh1 = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 2, 30, 30),
        new THREE.MeshNormalMaterial()
    );
    mesh1.position.set(-1.5, 0, 0);
    scene.add(mesh1);
    var mesh2 = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 2, 30, 30),
        new THREE.MeshNormalMaterial()
    );
    mesh2.position.set(1.5, 0, 0);
    scene.add(mesh2);
    // CHILD MESH OBEJECTS
    var childMaterial = new THREE.MeshNormalMaterial({ 
        transparent: true,
        opacity: 0.5
    });
    mesh1.add( new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        childMaterial) );
    mesh2.add( new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        childMaterial) );
    //******** **********
    // LOOP
    //******** **********
    var frame = 0,
    maxFrame = 200,
    fps_target = 24,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        bias = Math.abs(.5 - per) / .5;
        requestAnimationFrame(loop);
        if (secs >= 1 / fps_target) {
            // ROTATION OF GEOMETRY COMPARED TO MESH
            var rx = Math.PI * 2 * per,
            rz = Math.PI * 8 * per;
            // USING COPY AND ROTATION METHODS
            mesh1.geometry.copy( new THREE.ConeGeometry(0.25, 2, 30, 30) );
            mesh1.geometry.rotateX( rx );
            mesh1.geometry.rotateZ( rz );
            // USING OBJECT3D ROTATION PROPERTY OF MESH2 to ROTATE THE MESH OBJECT
            // RATHER THAN THE GEOMETRY
            mesh2.rotation.set(rx ,0, rz)
            // render, step frame, ect...
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

## 7 - Converting buffer geometry to JSON TEXT

One thing that I would like to do now and then is to convert the current state of a buffer geometry instance to a standard JOSN format that I can then sore as a file or some other from of storage. Later I would then use some kind of means to load this json data as a way to create a geometry form the stored json data.

Built into threejs itself there is the buffer geometry loader, in a later section in this post I should have at least one example of that here, but first in order to use that loader I will need some JOSN to load. When doing so I have found that the first thing that I want to do is call the to [non index method](https://threejs.org/docs/#api/en/core/BufferGeometry.toNonIndexed), if I do not when calling the to JSON method I will get a different from of json when the buffer geometry is the product of one of the built in geometry constrictors.

After calling the [to josn method](https://threejs.org/docs/#api/en/core/BufferGeometry.toJSON) the end result will end up being an object that is ready to use with the [JSON stringify method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). After passing the object to the strignify method the end result will then be JSON text that I can store as a file and then use with the loader. Alliteratively there is working directly with the parse method of the buffer geometry loader, when using the the first argument is expected to be an object so I will want to pass the text to the [JSON parse method](/2020/02/28/js-json-parse/) first.

```js
(function () {
    //******** *********
    // Scene, Camera, renderer
    //******** *********
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 10);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    //******** *********
    // BUFFER GEOMETRY TO TEXT
    //******** *********
    var geo = new THREE.SphereGeometry(1, 10, 10);
    // make sure to use to non indexed before calling to json
    var buffObj = geo.toNonIndexed().toJSON();
    var text = JSON.stringify(buffObj);
    //******** *********
    // TEXT TO BUFFER GEOMETRY
    //******** *********
    const loader = new THREE.BufferGeometryLoader();
    var obj = JSON.parse(text);
    var geo2 = loader.parse( obj );
    var mesh = new THREE.Mesh(geo2)
    scene.add(mesh)
    renderer.render(scene, camera)
}
    ());
```

## 8 - loading JSON text

If I have a josn file to load that is formated the way as I have outline in the above example for doing so I can use the [buffer geometry loader](/2018/04/12/threejs-buffer-geometry-loader/) to load the json text file. I just need to cerate an instance of the threejs buffer geometry loader, and then call the load method of the loader instance that is returned when calling the constructor function with the new keyword.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, 0.1, 100);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var pl = new THREE.PointLight(0xffffff, 1, 100);
    pl.position.set(5, 5, 5);
    scene.add(pl);
 
    var frame = 0,
    maxFrame = 200,
    mesh;
    var loop = function () {
        var per = frame / maxFrame;
        requestAnimationFrame(loop);
        mesh.rotation.set(Math.PI / 2, Math.PI * 2 * per, 0);
        // render the scene
        renderer.render(scene, camera);
        frame += 1;
        frame %= maxFrame;
    };
 
    // Loader
    var loader = new THREE.BufferGeometryLoader();
 
    // load a resource
    loader.load(
        // resource URL
        //'/forpost/threejs-buffer-geometry-loader/buffer-geo/three_2.json',
 
        '/json/static/box_house1_solid.json',
 
        // onLoad callback
        function (geometry) {
        // create a mesh with the geometry
        // and a material, and add it to the scene
        mesh = new THREE.Mesh(
                geometry,
                new THREE.MeshStandardMaterial({
                    color: 0x00ff0000,
                    emissive: 0x2a2a2a,
                    side: THREE.DoubleSide
                }));
        scene.add(mesh);
        loop();
    });
 
}
    ());
```

## 9 - Morph Attributes

In the opening sections of this post I wrote a thing or two about the various attributes that are used to compose a buffer geometry object. There is the position attribute that is the actual points in space which can be index, or not indexed. Then there is the normal attribute that can be used to define what side of a face is the front side of a face and is also used in the process of rendering with many materials. There is also the uv attribute which is what it is used to define what the offsets are in a texture when it comes to mapping a 2d texture to a 3d object. However in this section I will now be writing about [morph attributes](/2023/02/03/threejs-buffer-geometry-morph-attributes) where are a way to go about defining an array of attributes for each of these attributes each of which is a state for all of them. These morph attributes can then be used to change from one state to another, not just with the position attribute but all of the various attributes.

### 9.1 - Basic example on morph attributes

This is a basic example on morph attributes that I copied over from my post on the subject that is based on one of the official examples on morph attributes that can be [found here](https://github.com/mrdoob/three.js/blob/r146/examples/webgl_morphtargets.html). It involves just creating a buffer geometry with the built in box geometry constructor function. Then one just needs to start out by creating an empty array for the position attribute in the morph attributes property of the returned geometry. After that it is a matter of adding at least one or more elements to this array that are other states to morph to from the starting box geometry state. For this there is some code that will create a new position attribute that is a sphere like state to transition to for each point in this box geometry. 

There is then making a mesh object with the geometry like always. However now I can use the morph Target Influences property of the mesh object to set what the alpha value should be between the starting state, and the the sphere state.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// base on this: https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_pos = [];
for ( let i = 0; i < pos.count; i ++ ) {
     const x = pos.getX( i );
     const y = pos.getY( i );
     const z = pos.getZ( i );
     data_pos.push(
         x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
         y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
         z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
     );
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos, 3 );
// ---------- ----------
// MATERIAL, MESH
// ---------- ----------
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide});
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
mesh.morphTargetInfluences[ 0 ] = 0.75;
mesh.geometry.computeVertexNormals();
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

## Conclusion

I have a lot of work cut out for me when it comes to working on editing a lot of my old three.js content. A lot of my examples made use of the old geometry constructor, so They will need to be updated to work with the buffered geometry constructor if I want them to still work with late versions of three.js. The only other options would be to just make quick edits that mention what version of three.js I was using when I made they example which might prove to be a good temporarily fix when it comes to editing.

There might be more to work out when it comes to just some very basic examples like the ones that I worked out for this post when it comes to the various properties of a geometry and how they apply to various features of three.js. For now they seem to work okay, but I am sure that there will be some minor fixes for some of these examples when and if I get around to them.


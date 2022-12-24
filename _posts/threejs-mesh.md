---
title: Mesh objects in three.js, position, rotate, scale, skin, ect
date: 2018-05-04 12:44:00
tags: [js,three.js]
layout: post
categories: three.js
id: 183
updated: 2022-12-24 09:40:47
version: 1.43
---

A mesh object in [three.js](https://threejs.org/) is used to create an object with a [buffer geometry](/2021/04/22/threejs-buffer-geometry/), and a material such as the [mesh basic material](/2018/05/05/threejs-basic-material/). This resulting mesh object can then be added as a child of a main [scene object](/2018/05/03/threejs-scene/), and then the scene object can be used along with a camera to render a view of the scene which will include one or more of these mesh objects.

The [Mesh Constructor](https://threejs.org/docs/#api/en/objects/Mesh) is one of many constructor functions that I find myself using often as I get into making threejs projects. What is great about mesh objects is that they are one of many objects in threejs that have the [Object3d class](https://threejs.org/docs/#api/en/core/Object3D) as a base class. So then when it comes to something like learning how to use the [position property](/2022/04/04/threejs-object3d-position/) of a mesh object, what one is really learning about is an object3d class feature. Knowledge of this object3d class feature can then also be applied to cameras, groups, and anything else in threejs that is based off of the object3d class. Still there are some things that are just a part of mesh objects alone, mainly the buffer geometry and material properties of such objects.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/vZImQE_ikng" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Threejs Mesh objects and what to know before continuing

This is a post on making and working with one or more mesh objects in the javaScript library called threejs. It is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), let alone with [javaScipt in general](/2018/11/27/js-getting-started/), and any additional skills that are needed before hand. I then assume that you have at least some background with client side javaScript, and know how to set up a basic threejs project. Still there are some additional things that a developer should be aware of when it comes to working with a mesh object that I think that I should at least briefly mention before getting to the full source code examples in this post.

### Geometry and mesh objects

When creating a mesh object the first argument that is passed to the mesh constructor is a [buffer geometry](/2021/04/22/threejs-buffer-geometry/), followed by a second argument that is a single material, or an array of materials that will be used to skin that geometry. There is learning how to go about [making custom geometries with javaScript code](/2021/06/07/threejs-buffer-geometry-attributes-position/), or also from an external resources such as a JSON format that can be loaded with the [built in buffer geometry loader](/2018/04/12/threejs-buffer-geometry-loader/). There are also a lot of official assets loaders that can be added on top of threejs that can be used to load a wide range of [file formats such as DAE](/2021/04/30/threejs-dae-collada-loader/). However when it comes to just starting out, and also creating certain kinds of projects where built in geometry constructors will work fine, there are constructors like that of the [THREE.BoxGeometry constructor](/2021/04/26/threejs-box-geometry/).

### Materials and mesh objects

The mesh is then an object that contains references to the geometry and materials that are used to compose the over all content of the mesh object. So on top of knowing a thing or two about geometry it also pays to learn more about [what the options are when it comes to materials](/2018/04/30/threejs-materials/). I think that a good starting option for materials might be the [normal material](/2021/06/23/threejs-normal-material/) as it will help to show some sense of depth and also does not require a [light source](/2022/02/25/threejs-light/) to work. However in the long run there is learning how to use the basic material with textures or lines, or better yet maybe the Phong material that is a good choice for using one or more light sources.

### At some point you might want to read more on the Object3d, Vector3 and Euler classes also

A mesh object is based off of the [Object3d class](/2018/04/23/threejs-object3d/), and there are many additional objects in threejs that are based off of it beyond just that of mesh objects. [The Vector3 class](/2018/04/15/threejs-vector3/) also comes up a lot in code examples of threejs which is used for creating and working with a vector, or point in 3d space. With a mesh object the [position property](/2022/04/04/threejs-object3d-position/) of a mesh is an instance of vector3 and that is what can be used to set and change the position of a mesh Object. Another property of instance for mesh objects is the [scale property](/2021/05/11/threejs-object3d-scale/) which is also an instance of this Vector3 class.

There is also the [Euler class](/2021/04/28/threejs-euler/) that is like vector3 only we are dealing with angles rather than a position. So with that said the [rotation property](/2022/04/08/threejs-object3d-rotation/) of a mesh object, as well as anything else based off of object 3d class.

### The source code examples in this post can be found on Github

The source code examples that I am writing about here can be found in [my test threejs Github repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-mesh).

### Version Numbers matter with three.js

The last time I edited this post I was using version r135 of three.js, and when I first wrote this post I was using version r91 of threejs. Between r91 and r135 a whole lot of code breaking changes have happened, so always check what version of three.js you are using when looking at old code examples of three.js on the open web.

## 1 - Basic example of using a mesh

A Basic example of using a mesh would involve creating an instance of a Mesh with the THREE.Mesh constructor, passing it the geometry that I want to use. Be default the basic material will be used with a random color, so if I want to use something else for a material then you I want to pass that to the Mesh Constructor as the second argument. The result can then be saved to a variable, or just directly added to the scene as there are ways of still getting a reference to the mesh by way of the children property of the scene object.

So then the Basic idea here is to create a scene object, then create and add a Mesh object to the scene object. However in order to see the mesh I am going to need a camera, for this there are a few options but I typically like to go with the perspective camera. When I add the camera to the scene I am going to want to make sure that I position the camera away from the mesh so that it is not inside the mesh. After that I am going to need some kind of Renderer such as the built in WebGLRenderer. I then just need to call the render method of the renderer and pass the scene and camera to use.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
 
    // CREATEING AND ADDING A MESH TO A SCENE
    scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshDepthMaterial()));
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.5, 1.5, 1.5);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());
```

So then this is a basic hello world type example of three.js where I am just looking at a cube. Now that I have that out of the way I can start to get to some more complex examples.


## 2 - Moving and rotating a Mesh object

It is important to note that THREE.Mesh is just one of many constructors in three.js that inherit from Object3D which would be worth checking out in detail because much of what applies for a mesh will also apply for a camera, groups, a light source, and even a whole scene because all those things are built on top of Object3d. However for now it is a good idea to just know that Object3D brings a whole bunch of methods, and properties to THREE.Mesh that can be used to do things like moving the mesh around, and changing its rotation.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // THE MESH
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
 
    // camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(4, 2, 4);
    camera.lookAt(0, 0, 0);
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var frame = 0,
    maxFrame = 200,
    fps = 30,
    lt = new Date();
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000,
        per = frame / maxFrame,
        r = Math.PI * 2 * per;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
 
            // MOVE the mesh with Object3D.position property that is an instance of Vector3
            mesh.position.set(Math.cos(r) * 2, 0, Math.sin(r) * 2);
 
            // ROTATE the mesh with the Object3d.rotation property that is an instance of Euler
            mesh.rotation.set(0, r, r * 2);
 
            // render the scene with the camera
            renderer.render(scene, camera);
            frame += fps * secs;
            frame %= maxFrame;
            lt = now;
        }
    }
 
    loop();
 
}
    ());
```

Here I am using the Object3D position property that stores an instance of Vector3 that can be used to change what should be the center point of the Mesh geometry assuming it has been normalized. That might come off as a mouth full so maybe another way of explaining it is that there is a point in space in which the geometry of the mesh is relative to. The position property can be used to change the value of that point in space.

Also In this demo I am using the rotation property, which is another useful property that is inherited from, use guessed it, Object3D. This rotation property stores an instance of the Euler class which is like vercor3 only we are taking angles rather than a matrix position.

## 3 - Using an array of materials

One thing about a mesh is that a [material index](/2018/05/14/threejs-mesh-material-index/) can be with and array of materials when skinning a geometry of a mesh. So then it is possible to pass an array of materials rather than just a single instance of some kind of mesh material. When doing this the material index value of the face instances in the geometry is of interest when it comes to assigning what material is used for what face of the geometry. 

I have a post on this in which I get into this in detail but I can also provide a basic example of this here.

```js
(function () {
    // SCENE
    var scene = new THREE.Scene();
 
    // the materials array
    var materials = [
        // material 0 (red basic)
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide
        }),
        // material 1 (green basic)
        new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            side: THREE.DoubleSide
        }),
        // material 2 (blue basic)
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide
        })
    ];
    // a box geometry
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    // for all faces
    geometry.groups.forEach(function (face, i) {
        face.materialIndex = i % materials.length;
    });
    // add to scene with the Mesh
    scene.add(new THREE.Mesh(
            geometry,
            materials));
 
    // CAMERA
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    // RENDER
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

So then the process of skinning a mesh is just a matter of passing an array of materials to the mesh constructor rather than just a single material. After that it is just a question of making sure that the material index values are what they should be when it comes to the instance of the geometry that is being used with the mesh.

## 4 - Making copies of a mesh object

There will comes times now and then in which I will want to make a single mesh object and then make [many copies of that single mesh object](/2019/12/18/threejs-mesh-copy/). For this task there is the clone method of the mesh object that can be used to create a kind of shallow copy of a mesh object. What I mean by a sallow copy is that this will be a copy of the mesh object itself but not always all nested objects of that mesh object, at least not when it comes to the material as this example will demonstrate.

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // CREATEING AND ADDING A MESH TO A SCENE
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial());
    scene.add(mesh);
    // MAKING CLONES OF THAT MESH
    var i = 0, len = 5, x, y, z, copy;
    while(i < len){
        copy = mesh.clone();
        x = -5 + 10 * (i / len);
        y = 0;
        z = -2;
        // change of position does not effect original
        copy.position.set(x, y, z);
        scene.add(copy);
        i += 1;
    }
    // HOWEVER A CHNAGE TO THE MATERIAL WITH THE ORIGINAL WILL EFFECT
    // ALL COPIES BECUASE THE CLONE METHOD WILL NOT DEEP CLONE MATERAILS
    mesh.material.color = new THREE.Color('red')
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());
```

## 5 - The look at method of the object3d class and rotation of geometry

Another method of interest that I think I should touch base with in this post is the [look at method of the object 3d class](/2021/05/13/threejs-object3d-lookat/). This is a method that I have used with the camera object in just about all of the examples in this post thus far. Because it is often used with a camera object new developers might assume that this is a method of a camera object, but it is actually a method of the object3d class. because the mesh object like a camera is also based off of object 3d I can also use this look at method as a way to have a mesh object face a position in word space.

However when it comes to a mesh object I might often need to adjust what the 'front' of the geometry is, for this tasks I will want to use the [rotate methods of an instance of buffer geometry](/2021/05/20/threejs-buffer-geometry-rotation/).

```js
(function () {
    // Scene
    var scene = new THREE.Scene();
    scene.add( new THREE.GridHelper(10, 10) );
 
    // CREATEING AND ADDING A MESH OBJECTS
    var mesh = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 2, 30),
            new THREE.MeshNormalMaterial());
   // ROTTAING GEOMERTY OF THE CONE
    mesh.geometry.rotateX(1.57)
    scene.add(mesh);
    var i = 0, len = 5, x, y, z, copy;
    while(i < len){
        copy = mesh.clone();
        x = -5 + 10 * (i / len);
        y = 0;
        z = -3;
        copy.position.set(x, y, z);
        // USING LOOK AT METHOD
        copy.lookAt(mesh.position);
        scene.add(copy);
        i += 1;
    }
 
    // Camera
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(2, 5, 5);
    camera.lookAt(0, 0, 0);
    // renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // render the scene with the camera
    renderer.render(scene, camera);
}
    ());
```

## Conclusion

There is not much more to write about with Mesh, at least not at this time. However that is not at all the case with many other topics that branch off from Mesh such as geometry, materials, Object3D, Vector3, the Scene object, and [many more](/categories/three-js/) just when it comes to the basics of three.js.

Once the basics are out of the way though it is then time to look into starting some actual projects of some kind. There is getting into making games, and also all kinds of fun animation type projects.

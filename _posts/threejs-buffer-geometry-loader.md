---
title: The Buffer Geometry loader in three.js
date: 2018-04-12 10:20:30
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 172
updated: 2022-08-04 09:25:58
version: 1.24
---

In this post I will be writing about the [BufferGeometryLoader](https://threejs.org/docs/index.html#api/loaders/BufferGeometryLoader) in [three.js](https://threejs.org/) the popular javaScript library for working with 3D objects. The Buffer Geometry Loader is one of several options in threejs when it comes to external asset loaders, some of which might prove to be a better option depending on what needs to happen.

In three.js if I want to import a 3d model that has been created in a 3d modeling program like [blender](https://www.blender.org/), and if I want to use the built in buffer geometry loader, it will have to be converted to a standard JSON format used by three.js. Luckily there is an official plugin to do just that for blender at least in the three.js repositories [exporters folder](https://github.com/mrdoob/three.js/tree/r92/utils/exporters/blender) of r92 of threejs. As of r93+ the exporter has been removed from the reposaptory but the same old exporter should still work okay with the version of blener that is being used, if not doing this might prove to be a little involved. 

As of the last time I edited this post, one of the other options when it comes to loading assets into three.js that I like best would be the [Collada file loader](/2021/04/30/threejs-dae-collada-loader/). This collada file loader allows me to load files that are in a format that works out of the box with blender without having to bother with external plug-ins to add the export functionality. The collada file format is also a great format not just for geometry but also with materials, as well as a way to load additional external assets such as textures. This way I do not have to bother adding a plugin to blender, but I do have to add an additional file on top of threejs to load Collada Files as that loader is not built into the core of three.js like that of the Buffer Geometry loader.

<!-- more -->

## The buffer Geometry loader and what to know first

This is an advanced post on three.js that has to do with the buffered geometry loader, it is not a [getting started post on three.js](/2018/04/04/threejs-getting-started/), or any additional skills needed before getting into three.js to begin with when it comes to [client side javaScrpt in general](/2018/11/27/js-getting-started/). This post has to do with Buffered Geometry, but I will not be getting into that in depth in this post at least. I assume that you have a good grasp on what is required before hand, and are here because you want to learn the ins and outs of the buffered geometry loader in three.js, rather than buffer geometry in general. If you want to read up more on the [buffer geometry constrictor and various other topics that branch off from that I have wrote a post on that topic](/2021/04/22/threejs-buffer-geometry/).

Also when it comes to making a 3d model with a 3d modeling program I have come to prefer blender, I am also going to be covering the use of the io_three blender plug-in that is used to export a model to the JSON format that is used by this loader.

### Version Numbers matter.

I know there are a lot of projects where newer versions just patch programing mistakes, and the actual use of the project renames the same when it comes to the use of the public API. This is not so true with three.js, major changes happen often that result in code breaking changes. When I first wrote this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91) that was release in March of 2018, and the last time I edited the post I was using r127 of three.js that was released in March of 2021.

Also in this post I am using blender 2.79 also released in March of 2018. When it comes to using the io_three plug-in it is important to use a late version of blender.

### The source code examples here, as well as additional assets can be found on Github

The source code examples that I am write about here in this post can also be found in the [for post folder of my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-loader). This is also where I park the source code for my many other posts on threejs. On top of the javaScript files I also have additional assets there such as the buffer geometry files that I am loading into the example with the buffer geometry loader..

### Why use the buffered geometry loader?

When first starting out with three.js one might use one of the built in constructors to create a simple geometry such as a cube geometry using the [BoxBufferGeometry](https://threejs.org/docs/index.html#api/geometries/BoxBufferGeometry) constructor. That works fine when you are just aiming to make a three.js hello world type project involving a spinning cube on the screen, but when making an actual project chances are you are going to want to make your own geometry one way or another.

Of course there are ways of making a hard coded geometry, or generating a geometry with javaScipt in the source code of your project. However it is also possible to create a geometry in an external application, and then import that geometry into three.js. The buffered geometry loader is one of many ways in three.js to load a geometry.

The good thing about the Buffer Geometry loader is that it is one of the loaders that is built into three.js itself, the bad news is that there is a little leg work when it comes to adding a plug-in to blender to export to the standard that is used by the built in buffer geometry loader. To make matters worse if you are using a 3d modeling program other than blender there may not be a plug in to convert to this json format. So it might be a good idea to look into what the other options are, but the buffer geometry loader may still be a good starting point when it comes to looking into what the options are.

### The JSON file format

The format of a json file that can be loaded with the buffered geometry loader should have a type of "BufferedGeometry" in it's meta data. A simple example that I made in blender and exported with the io_three plug in looks like this:

```js
{
    "metadata":{
        "version":3,
        "type":"BufferGeometry",
        "normal":30,
        "position":30,
        "generator":"io_three"
    },
    "data":{
        "index":{
            "array":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,2,21,0,0,22,1,3,23,4,8,24,6,6,25,7,9,26,10,12,27,13,15,28,16,18,29,19],
            "type":"Uint16Array",
            "itemSize":1
        },
        "attributes":{
            "normal":{
                "array":[-1,0,0,-1,0,0,-1,0,0,0,-2.98023e-08,-1,0,-2.98023e-08,-1,0,-2.98023e-08,-1,1,0,0,1,0,0,1,0,0,0,2.98023e-08,1,0,2.98023e-08,1,0,2.98023e-08,1,0,-1,2.98023e-08,0,-1,2.98023e-08,0,-1,2.98023e-08,0,0.894427,-0.447214,0,0.894427,-0.447214,0,0.894427,-0.447214,0,0.894427,0.447214,0,0.894427,0.447214,0,0.894427,0.447214,-1,-0,0,-1,0,0,-0,-2.98023e-08,-1,1,0,-0,1,0,0,-0,2.98023e-08,1,0,-1,2.98023e-08,0,0.894427,-0.447214,0,0.894427,0.447214],
                "type":"Float32Array",
                "itemSize":3
            },
            "position":{
                "array":[-1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,1,1,-1,1,1,1,1,-1,1,1,1,1,-1,-1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,-1,-1,1,1.5,-6.55671e-08,-1,1,-1,-1,1.5,-6.55671e-08,-1,1.5,-6.55671e-08,1,1,1,1,1.5,-6.55671e-08,-1,-1,1,-1,1.5,-6.55671e-08,1,1,-1,1,-1,-1,1,1.5,-6.55671e-08,-1,1,1,1,-1,1,1,1,-1,-1,1,1],
                "type":"Float32Array",
                "itemSize":3
            }
        },
        "groups":[{
            "count":48,
            "start":0,
            "materialIndex":0
        }]
    }
}
```

### Choosing a 3d modeling program

In order to load buffered geometry you first must have such geometry to load in the first place. Typically you will create a model in a 3d modeling program, and one way or another produce a JSON file that resembles the example I have given.

The only 3d modeling programs I have some experience with so far are [sketchup](https://www.sketchup.com/), and [blender](https://www.blender.org/). Sketchup is a fairly easy to use program, but is not open source, blender on the other hand is.

The process of exporting from sketchup to blender is a [little involved](https://github.com/mrdoob/three.js/wiki/Using-SketchUp-Models). It can be done but requires an additional Collada file loader that can be [found in the examples folder](https://github.com/mrdoob/three.js/blob/r91/examples/js/loaders/ColladaLoader.js) of the three.js repository. If you make use of that it is also off topic anyway, because this post is about the buffered geometry loader, and making use of the Collada file loader will be making use of an alternative to the buffered geometry loader.

So for this post I will be writing about the blender plug-in, and as of late I have been using blender over sketchup. It is open source, and also a bit more professional when it comes to this sort of thing anyway. In the three.js repositories exporters folder there is the io_three plugin that can be used to export a model to the JSON format used by the loader.

### Setting up the blender plugin

The [readme file](https://github.com/mrdoob/three.js/blob/r92/utils/exporters/blender/README.md) at the repository covers this process well, and it is pretty quick, easy, and painless. The readme states that you will need blender version 2.73.0 or later, when I got this working I was using 2.79.0 but have not tested it out on any newer versions of blender. 

To get this working I just copy and paste the contents of the plug-in folder to a path on my computers file system. The path depends on your operating system, and the version of blender used.

Some windows, and posix examples of what that path might be:

```
C:\Program Files\Blender Foundation\Blender\2.7X\scripts\addons
C:\Users\USERNAME\AppData\Roaming\Blender Foundation\Blender\2.6X\scripts\addons
/home/USERNAME/.config/blender/2.6X/scripts/addons
/usr/lib/blender/scripts/addons
/usr/share/blender/scripts/addons
/Users/(myuser)/Library/Application Support/Blender/2.7X/scripts/addons
```

Wherever it is you are looking for, it is the add ons folder that is used by blender. Out of the box there should be a bunch of plug-ins there before hand, you just want to add the io_three plug-in to the collection there.

## 1 - Basic demo using the buffered geometry loader.

A basic example of the loader will involve creating an instance of the loader, and then calling the load method of that instance. When calling the load method you will want to pass at least two arguments to the method which are the url of the json file that you want to load, and a callback method that will fire when the file is loaded, and ready to use.

```js
(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 10);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 2, 2);
    scene.add(light);
 
    var light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(-2, -2, -2);
    scene.add(light2);
 
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
        'buffer-geometry-loader/js/three_1.json',
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

The callback gives just one argument that is the geometry that can be used to make a mesh that can then be added to the scene, at which point the external geometry can be rendered. Aside from that I do not have to do anything out of the usual with respect to the scene, camera, and renderer as it is just another way to acquire a geometry to create a mesh.

## 2 - Additional callbacks when calling the load method of the buffer geometry loader

If desired additional callbacks can be given to the load method for reporting load progress, and handing errors if they happen. One way to go about dong this is to just give additional callbacks when calling the load function of the buffer geometry loader. So when calling the load method the first argument should be a string value to the json file that I want to load, and then a callback when the file is loaded as usual. However after that I can give an additional callback that will fire when it comes to the progress of the file that is being loaded, and after that yet another that will fire for any errors that might happen.

```js

(function () {
 
    // Scene
    var scene = new THREE.Scene();
 
    // Camera
    var camera = new THREE.PerspectiveCamera(65, 4 / 3, .5, 10);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
 
    // Render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 2, 2);
    scene.add(light);
 
    var light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(-2, -2, -2);
    scene.add(light2);
 
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
        // URL
        '/forpost/threejs-buffer-geometry-loader/buffer-geo/three_2.json',
        // Load Done
        function ( geometry ) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({}));
            scene.add(mesh);
            renderer.render(scene, camera);
        },
        // Progress
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Error
        function ( err ) {
            console.log( 'An error happened' );
        }
    );
}
    ());
```

## 3 - Conclusion

There are many more loaders, some of which do more than just load geometry after all there are many other kinds of assets to use rather than just geometry such as textures, and materials. It is possible to load other assets besides just geometry as well with some of the built in loaders, however maybe those are all matters for another post. 

In this post I also did not get into depth about Buffer Geometry Constructor, and why it is that you might want to use Buffered geometry over the plain old [Geometry Constructor](/2018/04/14/threejs-geometry/) which is now no longer part of the core of three.js itself as of r127 forward.


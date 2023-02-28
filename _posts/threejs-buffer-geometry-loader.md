---
title: The Buffer Geometry loader in three.js
date: 2018-04-12 10:20:30
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 172
updated: 2023-02-28 12:13:45
version: 1.30
---

In this post I will be writing about the [BufferGeometryLoader](https://threejs.org/docs/index.html#api/loaders/BufferGeometryLoader) in [threejs](https://threejs.org/) the popular javaScript library for working with 3D objects. The Buffer Geometry Loader is one of several options in threejs when it comes to external asset loaders, some of which might prove to be a better option depending on what needs to happen. What is nice about the buffer geometry loader is that it is baked into the core of threejs itself, so there is no need to boter loading an additional file beyond that which is often the case with many other options.

If I want to import a 3d model that has been created in a 3d modeling program like [blender](https://www.blender.org/), and if I want to use the built in buffer geometry loader, it will have to be converted to a standard JSON format used by threejs. Luckily there is an official plugin to do just that for blender at least in the three.js repositories [exporters folder](https://github.com/mrdoob/three.js/tree/r92/utils/exporters/blender) of r92 of threejs. As of r93+ the exporter has been removed from the repository but the same old exporter should still work okay with the version of blender that is being used, if not doing this might prove to be a little involved. 

Because I might run into problems exporting what I want to use from various programs I would not stop with the buffer geometry loader. One of the other options when it comes to loading assets into threejs that I like best thus far would be the [Collada file loader](/2021/04/30/threejs-dae-collada-loader/). This collada file loader allows me to load files that are in a format that works out of the box with blender without having to bother with external plug-ins to add the export functionality of that program. The collada file format is also a great format not just for geometry but also with materials, textures, and so forth as well.T his way I do not have to bother adding a plugin to blender, but I do have to add an additional file on top of threejs to load Collada Files as that loader is not built into the core of threejs like that of the Buffer Geometry loader.

Still if you are willing to do what is necessary to create buffer geometry JSON files, the buffer geometry loader is one way to go about loading external geometry at least. So then in this post I will be writing abut at least a few examples of this kind of option when it comes to this sort of thing.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/ELCdtbx8DPc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The buffer Geometry loader and what to know first

This is a post on threejs that has to do with the buffered geometry loader, which is one of serverl options for loading a 3d model assets into a threejs project. It is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), or any additional skills needed before getting into threejs to begin with when it comes to [client side javaScrpt in general](/2018/11/27/js-getting-started/). However I will take a moment to write about a few things that you might want to read up more on if you have not done so before hand here.

### Know a thing or two about the buffer geometry class

This post has to do with Buffered Geometry, but I will not be getting into that in depth in this post as there is a lot to write about and it would be a bit off topic to do so. So I assume that you have a good grasp on what is required before hand when it comes to the buffer geometry class, and are here because you want to learn the ins and outs of the buffered geometry loader alone. If you want to read up more on the [buffer geometry in general I have a post on that](/2021/04/22/threejs-buffer-geometry/). I also have a number of other posts on various core features of buffer geometry objects such as [position attributes](/2021/06/07/threejs-buffer-geometry-attributes-position/), and now also advanced topics such as [morph attributes](/2023/02/03/threejs-buffer-geometry-morph-attributes/) as well.

### Why use the buffered geometry loader?

When first starting out with threejs one might use one of the built in constructors to create a simple geometry such as a cube geometry using the [BoxBufferGeometry](https://threejs.org/docs/index.html#api/geometries/BoxBufferGeometry) constructor. That works fine when you are just aiming to make a threejs hello world type project involving a spinning cube on the screen. However when making an actual project chances are you are going to want to make your own geometry one way or another.

Of course there are ways of making a hard coded geometry, or generating a geometry with javaScipt in the source code of your project. However it is also possible to create a geometry in an external application, and then import that geometry into threejs. The buffered geometry loader is one of many ways in threejs to load a geometry.

### Why not use the buffered geometry loader?

The bad news is that there is a little leg work when it comes to adding a plug-in to blender to export to the standard that is used by the built in buffer geometry loader. To make matters worse if you are using a 3d modeling program other than blender there may not be a plug in to convert to this json format. So it might be a good idea to look into what the other options are, but the buffer geometry loader may still be a good starting point when it comes to looking into what the options are.

### The JSON file format

The format of a json file that can be loaded with the buffered geometry loader should have a type of "BufferedGeometry" in it's meta data. There are to general ways to generate this file format from some kind of resource. In blender if I added the io three plugin I can use that as a way to generate this type of file. The other general way to go about cretaing this kind of file would be to use the to json method of the buffer geometry class combined with the JSON.stringify method to produce text that can then be saves as a json file that in turn could be used with the loader, more on that in a later section. 

For now it might be a good idea to just take a quick look at how this json is formated. A simple example that I made in blender and exported with the io_three plug in looks like this:

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

In order to load buffered geometry you first must have such geometry to load in the first place. Typically I will create a model in a 3d modeling program, and one way or another produce a JSON file that resembles the example I have given. These days I am mainly just using blender when it comes to making a geometry with a program that I will then want to export to use in threejs as one format or another.

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

### The source code examples here, as well as additional assets can be found on Github

The source code examples that I write about here in this post can also be found in the [for post folder of my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-loader). This is also where I park the source code for my [many other posts on threejs](/categories/three-js/). On top of the javaScript files I also have additional assets there such as the buffer geometry files that I am loading into the example with the buffer geometry loader.

### Version Numbers matter.

I know there are a lot of projects where newer versions just patch programming mistakes, and the actual use of the project renames the same when it comes to the use of the public API. This is not so true with threejs, major changes happen often that result in code breaking changes in what some times seems like every revision number that comes out at times. When I first wrote this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91) that was release in March of 2018, and the last time I edited the post I was using r140 of threejs that was released in August of 2022. A great deal was removed and changed between those two version numbers, so always be mindful of what version you are using when looking at source code examples here elsewhere on the open web.

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

### 3 - To JSON text and back

To create JSON text from a buffer geometry instance I will first want to call the to non indexed method of the buffer geometry class, and then call the to json method to get an object that is formatted the way that I want it. If I do not call the non index method I can end up with a format that will not work well with the parser of the buffer geometry loader as of r140. Anyway once I have the object that looks good I can then just pass that to the JSON.stringify method to get the text that can then in turn be saved as a json file that will then work with the parser.

If I have some text that I just simply want to parse I can create an instance of the Buffer Geometry Loader and call the parse method directly. When doing so I will want to pass the text to the JSON.pasre method and then pass an object to the parser as it expected and object rather than text.

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

## Conclusion

There are many more loaders, some of which do more than just load geometry after all there are many other kinds of assets to use rather than just geometry such as textures, and materials. It is possible to load other assets besides just geometry as well with some of the built in loaders, however maybe those are all matters for another post. 

In this post I also did not get into depth about Buffer Geometry Constructor, and why it is that you might want to use Buffered geometry over the plain old [Geometry Constructor](/2018/04/14/threejs-geometry/) which is now no longer part of the core of three.js itself as of r127 forward.

Another project that might be worth checking out is my [dae tools threejs example](/2021/06/25/threejs-examples-dae-tools). This is a project where I am building on top of the DAE file loader, and in late versions of the example I have worked out some methods that have to go with converting dae files to buffer geometry json files.


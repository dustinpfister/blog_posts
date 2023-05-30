---
title: The Buffer Geometry loader in three.js
date: 2018-04-12 10:20:30
tags: [js,canvas,three.js]
layout: post
categories: three.js
id: 172
updated: 2023-05-30 11:48:55
version: 1.34
---

In this post I will be writing about the [BufferGeometryLoader](https://threejs.org/docs/index.html#api/loaders/BufferGeometryLoader) in [threejs](https://threejs.org/) the popular javaScript library for working with 3D objects. The Buffer Geometry Loader is one of several options in threejs when it comes to external asset loaders, some of which might prove to be a better option depending on what needs to happen. What is nice about the buffer geometry loader is that it is baked into the core of threejs itself, so there is no need to boter loading an additional file beyond that which is often the case with many other options.

If I want to import a 3d model that has been created in a 3d modeling program like [blender](https://www.blender.org/), and if I want to use the built in buffer geometry loader, it will have to be converted to a standard JSON format used by threejs. Luckily there is an official plugin to do just that for blender at least in the three.js repositories [exporters folder](https://github.com/mrdoob/three.js/tree/r92/utils/exporters/blender) of r92 of threejs. As of r93+ the exporter has been removed from the repository but the same old exporter should still work okay with the version of blender that is being used, if not doing this might prove to be a little involved. 

Because I might run into problems exporting what I want to use from various programs I would not stop with the buffer geometry loader. One of the other options when it comes to loading assets into threejs that I like best thus far would be the [Collada file loader](/2021/04/30/threejs-dae-collada-loader/). This collada file loader allows me to load files that are in a format that works out of the box with blender without having to bother with external plug-ins to add the export functionality of that program. The collada file format is also a great format not just for geometry but also with materials, textures, and so forth as well. T his way I do not have to bother adding a plugin to blender, but I do have to add an additional file on top of threejs to load Collada Files as that loader is not built into the core of threejs like that of the Buffer Geometry loader.

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

I know there are a lot of projects where newer versions just patch programming mistakes, and the actual use of the project renames the same when it comes to the use of the public API. This is not so true with threejs, major changes happen often that result in code breaking changes in what some times seems like every revision number that comes out at times. When I first wrote this post I was using [three.js r91](https://github.com/mrdoob/three.js/tree/r91) that was release in March of 2018, and the last time I edited the post I was using r146 of threejs that was released in October of 2022. A great deal was removed and changed between those two version numbers, so always be mindful of what version you are using when looking at source code examples here elsewhere on the open web.

## 1 - Basic demos of the Buffer Geometry Loader in threejs

One has to start somewhere with this sort of thing and with that said this will be a few basic examples of the Buffer Geometry loader. Although I will be making these examples as simple as I can make them, I am still assuming that you have a JSON file at the ready to load. if not I have a gew sections in this post where the subject is more on how to get the JSON from one or more sources to begin with.

### 1.1 - Basic demo of a static scene

To start out with the most basic example of the use of the buffer geometry loader might involve just setting up the usual set of objects, and then loading just a single buffer geometry file.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
loader.load(
    '/json/static/box_house1_solid.json',
    (geometry) => {
        geometry.rotateX(Math.PI * 1.5);
        const mesh = new THREE.Mesh(
           geometry,
            new THREE.MeshNormalMaterial());
        scene.add(mesh);
        camera.position.set(-10, 8, -10);
        camera.lookAt(0, -1, 0);
        renderer.render(scene, camera);
    }
);
```

### 1.2 - Basic demo using the buffered geometry loader with an animaiton loop.

A basic example of the loader will involve creating an instance of the loader, and then calling the load method of that instance. When calling the load method you will want to pass at least two arguments to the method. The first argument is the url of the json file that you want to load, and the second argument is a callback method that will fire when the file is loaded, and ready to use. There are additional options when it comes to more advanced examples, but for now I am just going to stick with the buffer geometry loader alone.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
//-------- ----------
// MESH
//-------- ----------
let mesh = null;
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const degree = 360 * (frame / frameMax);
    mesh.rotation.y = THREE.MathUtils.degToRad(degree);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
//-------- ----------
// LOADER
//-------- ----------
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // resource URL
     '/json/static/box_house1_solid.json',
    // onLoad callback
    (geometry) => {
        geometry.rotateX(Math.PI * 1.5);
        // create a mesh with the geometry
        // and a material, and add it to the scene
        mesh = new THREE.Mesh(
           geometry,
            new THREE.MeshPhongMaterial({
                color: 0x00ff0000,
                emissive: 0x2a2a2a,
                side: THREE.DoubleSide
            }));
        scene.add(mesh);
        loop();
    }
);
```

The callback gives just one argument that is the final parsed geometry object from the given JSON text that was loaded. For this example I am just rotating the geometry to correct an issue with the orientation of the json file source, and then I am using it to create a mesh object. I can then add the mesh object to scene object, and start the app loop.

## 2 - Additional callbacks when calling the load method of the buffer geometry loader

If desired additional callbacks can be given to the load method for reporting load progress, and handing errors if they happen. One way to go about dong this is to just give additional callbacks when calling the load function of the buffer geometry loader. So when calling the load method the first argument should be a string value to the json file that I want to load, and then a callback when the file is loaded as usual. However after that I can give an additional callback that will fire when it comes to the progress of the file that is being loaded, and after that yet another that will fire for any errors that might happen.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(2, 2, 2);
scene.add(light);
const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(-2, -2, -2);
scene.add(light2);
//-------- ----------
// LOAD/RENDER
//-------- ----------
camera.position.set(3, 3, 2);
camera.lookAt(0, 0, 0); 
// Loader
const loader = new THREE.BufferGeometryLoader();
// load a resource
loader.load(
    // URL
    '/forpost/threejs-buffer-geometry-loader/buffer-geo/three_2.json',
    // Load Done
    function ( geometry ) {
        const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({}));
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
```

### 3 - To JSON text and back

To create JSON text from a buffer geometry instance I will first want to call the to non indexed method of the buffer geometry class, and then call the to json method to get an object that is formatted the way that I want it. If I do not call the non index method I can end up with a format that will not work well with the parser of the buffer geometry loader as of r140. Anyway once I have the object that looks good I can then just pass that to the JSON.stringify method to get the text that can then in turn be saved as a json file that will then work with the parser.

If I have some text that I just simply want to parse I can create an instance of the Buffer Geometry Loader and call the parse method directly. When doing so I will want to pass the text to the JSON.parse method and then pass an object to the parser as it expected and object rather than text.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// BUFFER GEOMETRY TO TEXT
//-------- ----------
const geo = new THREE.SphereGeometry(1, 10, 10);
// make sure to use to non indexed before calling to json
const buffObj = geo.toNonIndexed().toJSON();
const text = JSON.stringify(buffObj);
//-------- ----------
// TEXT TO BUFFER GEOMETRY
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const loader = new THREE.BufferGeometryLoader();
const obj = JSON.parse(text);
const geo2 = loader.parse( obj );
const mesh = new THREE.Mesh(geo2)
scene.add(mesh)
renderer.render(scene, camera);
```

## 4 - Using the Loading Manager

If I want to load more than one file, or i find myself in a situation in which I need to load not just better geometry, but other assets as well. Then I will want to start making use of the THREE.LoadingManager class to do so. This is a class that allows for me to create a single object to which I can attach callback functions that will fire when a whole bunch of loading has been completed. In this section then I will be going over a few examples that make use of this loading manager class starting out with some very basic ones.

### 4.1 - A loading manager hello world example

To start out with this I just create an instance of the THREE.loadingManager class, after that I will want to attach at least an onLoad handler for the manager. There are a number of other handlers of course, but this is a very basic getting started example so for now I am just going to care about that. Anyway once I have my loading manager class i can pass that as the first argument for a call of the load method of a buffer geometry class instance. 

When the loading is done with the buffer geometry loader the on load method will fire and in that call back I then render my over all scene. This might not be much of an improvement from the basic example in this post, but things will become more clear as we get into more complex examples in this section.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
//-------- ----------
// LOADING MANAGER
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0,-1,0);
const manager = new THREE.LoadingManager();
manager.onLoad = () => {
    console.log('Done Loading');
    renderer.render(scene, camera);
};
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
const onBufferGeometryLoad =  (geometry) => {
    geometry.rotateX(Math.PI * 1.50);
    geometry.rotateY(Math.PI * 1.10);
    const mesh = new THREE.Mesh(
       geometry,
        new THREE.MeshPhongMaterial({
            color: 0x00ff0000,
            emissive: 0x2a2a2a,
            side: THREE.DoubleSide
        }));
    scene.add(mesh);
};
const loader = new THREE.BufferGeometryLoader(manager);
loader.load('/json/static/box_house1_solid.json', onBufferGeometryLoad);
```

### 4.2 - Loading more than one geometry

For this next demo I am doing more or less the same thing as the first one, but now I am just making many calls of the load method of the buffer geometry loader. The only goal with this demo is to just simply load more than one geometry and then render the over all scene only after all of the external geometries have been  loaded. There is a whole lot more ground to cover when it comes to this sort of thing of course when it comes to additional handers for the manager, and also situations in which I might want to have more then one instance of the loader I am using and so forth. There is also the issue of the order in which the objects are loaded and that this will not always be the same each time. However for this example the basic idea of what a loading manager is good for should be clear all ready. I am loading a whole bunch of external geometry objects and the on load hander function files when all of it is done loading.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1, 100);
pl.position.set(5, 5, 5);
scene.add(pl);
//-------- ----------
// LOADING MANAGER
//-------- ----------
camera.position.set(-10, 15, 15);
camera.lookAt(0,-1,0);
const manager = new THREE.LoadingManager();
manager.onLoad = () => {
    console.log('Done Loading');
    renderer.render(scene, camera);
};
//-------- ----------
// BUFFER GEOMETRY LOADER
//-------- ----------
let object_index = 0;
const onBufferGeometryLoad =  (geometry) => {
    geometry.rotateX(Math.PI * 1.50);
    geometry.rotateY(Math.PI * 1.10);
    const mesh = new THREE.Mesh(
       geometry,
        new THREE.MeshPhongMaterial({
            color: 0x00ff0000,
            emissive: 0x2a2a2a,
            side: THREE.DoubleSide
        }));
    scene.add(mesh);
    mesh.position.set(6 * object_index,0, 1.8 * object_index);
    object_index += 1;
};
const loader = new THREE.BufferGeometryLoader(manager);
loader.load('/json/static/box_house1_solid.json', onBufferGeometryLoad);
loader.load('/json/static/cube_thing.json', onBufferGeometryLoad);
loader.load('/json/static/wheel.json', onBufferGeometryLoad);
```

## Conclusion

There are many more loaders, some of which do more than just load geometry after all there are many other kinds of assets to use rather than just geometry such as textures, and materials. It is possible to load other assets besides just geometry as well with some of the built in loaders, however maybe those are all matters for another post. 

In this post I also did not get into depth about Buffer Geometry Constructor, and why it is that you might want to use Buffered geometry over the plain old [Geometry Constructor](/2018/04/14/threejs-geometry/) which is now no longer part of the core of three.js itself as of r127 forward.

Another project that might be worth checking out is my [dae tools threejs example](/2021/06/25/threejs-examples-dae-tools). This is a project where I am building on top of the DAE file loader, and in late versions of the example I have worked out some methods that have to go with converting dae files to buffer geometry json files.

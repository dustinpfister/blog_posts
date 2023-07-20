---
title: The Object Loader in threejs
date: 2023-07-19 13:52:00
tags: [three.js]
layout: post
categories: three.js
id: 1061
updated: 2023-07-20 14:17:27
version: 1.5
---

The [Object Loader](https://threejs.org/docs/#api/en/loaders/ObjectLoader) in threejs is a loader option that is built into the core of the library itself that can be used to load JSON files that follow the [object format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4). Many other loaders for object formats must be added to threejs by making use of an additional add on file beyond just threejs itself so this alone is one reason why one might be interested in the format. However another nice thing about it is that it is also easy to work with when it comes to creating this kind of json data as just simply calling the toJSON method of the object that I want to convert will create the data in an object format, and then I can just pass that to the JSON.stringify method.

<!-- more -->

## The Object Loader and what to know first

In this post I am writing about the object loader that is built into threejs than can be used to load a single object, or a whole scene in the from of a JSON file. The Object Loader will typically be used to load a whole other external file that will need to be loaded over HTTP, however the parse method of the loader can also be used to create a workable object3d class based object from an object form of the data. In addition the object form of the data can be created from a JSON string from any source by just passing that string to the JSON.parse method. Anyway this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/), or javaScript in general. If you are at a loss all ready there are some more things you might want to read about more first.

### Know a thing out two about JSON

It would be a good idea to [learn at least a thing or two about JSON in general](/2020/02/28/js-json-parse) if you have not done so before hand. Mainly the [JSON.stringify method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) that can be used to create a data object created with the [toJSON method of the object3d class](https://threejs.org/docs/#api/en/core/Object3D.toJSON) to a JSON string, as well as the [JSON.parse method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) that can do the inverse of this.

### There is the base Loader and Loader Manager classes

The Object Loader extends the [Base Loader class](https://threejs.org/docs/#api/en/loaders/Loader), and as such there are various features in that class that a worth checking out. The Object Loader is then just one kind of loader that extends from this common class, as such there are many other options for loading various assets for a threejs project. The object loader is one example of a loader that is built into the core of the threejs library itself, however there is a wide range of other options for loaders that can be added on top of threejs by itself in the form of add on files that can be found in the [examples folder of the threejs repository on Github](https://github.com/mrdoob/three.js/tree/dev/examples/jsm/loaders).

### Source Code Examples are also on Github

The source code examples that I am writing about in this post can also be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object-loader) on Github. This is the location where I also store the source code exmaples for [every other blog post that I have wrote on threejs](/categories/three-js/) thus far.

### Version Numbers Matter

When I first wrote the blog post I was following my [r152 style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) for the code examples. This means that I am using javaScript Module type script tags along with the use of import in the demos for the main threejs module. If you are sticking with an older revision of threejs the demos might still work by doing away with the use of import at the top of the code examples and make sure that you load the plain javaScript form of the library first. However I was very much using the r152 module form at this time so if things are not working for you that would be the first thing to check.


## 1 - Some Basic Examples of the Object Loader in threejs

To start out with the Object Loader in this section I will be going over a few basic examples. There are several ways to go about getting started with this, but the first thing is to find out how to go about creating JSON data to begin with. So many of the examples here will be focusing on that and the use of the parse method of the Object Loader as a way to parse this JSON data into an object that can then be used in a project. Because we are talking about a plain text format here this is a good format to get started with as just hand coded raw text is one way to get started. However in the long run it would be best to make use of options that can be used to generate the json data by just calling the toJSON method of the source object that I want to convert to this standard.

### 1.1 - Creating an object from a hard coded JSON string using the parse method

One way to get started with this Object Loader, and also to get familiar with the format, would be to just start hand coding a JSON string by just studied the format of the JSON and then doing it that way. One thing about this is that I will need to have a way to generate UUID strings for the uuid keys of the various objects. For this task there is the generateUUID method in the [MathUtils object of threejs](/2022/04/11/threejs-math-utils/) which I can call for each ID that I need. 

So now I can work out what the main JSON object will be by just using back ticks so I can just go ahead and have End Of Line chars in the JSON string. The format should include a metadata object and I will want to go with version 4.5 as of this writing. The type key for the metadata object should be \"Object\", and for the generator key I just typed \"Hand Coded\" just to make it clear as to how this data was created. After the meta data object I will then want to add a geometries, and materials arrays that will contain data for all the geometry and materials used for the main object as well as all the children as well. However for this very first demo I am not going to do anything that advanced and just stick with making a single mesh object that make used of just one geometry and material.

When it comes to working out a geometry for the object I can use one of the built in constructor function options for this such as [BoxGeometry](/2021/04/26/threejs-box-geometry/) by just setting that as the value for the type key in place of BufferGeometry. This way I can just pass some key values that will be used for the various parameters when calling the constructor function for that. For the material I am just setting the type key to the [MeshNormalMaterial](/2021/06/23/threejs-normal-material/) as that is a nice option that does not require anything fancy with light and textures to show depth.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// JSON STRING IN OBJECT FORMAT
// ---------- ----------
const uuid_geometry = new THREE.MathUtils.generateUUID();
const uuid_material = new THREE.MathUtils.generateUUID();
const uuid_mesh = new THREE.MathUtils.generateUUID();
const mesh_json = `
{
    "metadata": {
        "version": 4.5,
        "type": "Object",
        "generator": "Hand Coded"
    },
    "geometries": [{
            "uuid": "` + uuid_geometry + `",
            "type": "BoxGeometry",
            "width": 1,
            "height": 1,
            "depth": 1
        }
    ],
    "materials": [{
            "uuid": "` + uuid_material + `",
            "type": "MeshNormalMaterial"
        }
    ],
    "object": {
        "uuid": "` + uuid_mesh + `",
        "type": "Mesh",
        "layers": 1,
        "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        "up": [0, 1, 0],
        "geometry": "` + uuid_geometry + `",
        "material": "` + uuid_material + `"
    }
}
`
const mesh = new THREE.ObjectLoader().parse( JSON.parse( mesh_json ) );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

Now we come to the part of the JSON string that will be the Object3D class based object to store this way. For now this object is just a Single Mesh Object, however there is getting into children for this mesh object, and yes the type of the Object can be Scene rather than mesh. However this is still just the very first example of this basic section of the post, so lets refrain from anything fancy for the moment.

### 1.2 - The toJSON method of Objects

So hand coding JSON files is all find and good, but lets get real here this is not how to go about creating these kinds of assets right? Well no there is of course the toJSON method that can be called off of any object3d class based object to which I want an object in the format that is used for the object loader, and then I can pass that to JSON.stringify. However I have found that the results that this kind of generator creates is not always what I might want, so it still seems like I need to hack over it a little. However depending on how you aim to use the object loader you might not need to bother with that. In this demo I will write about one issue that I have fond when it comes to the position of objects and the use of the Object3d.toJSON generator.

```js
// ---------- ----------
// IMPORT - threejs and any addons I want to use
// ---------- ----------
import * as THREE from 'three';
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SOURCE SCENE OBJECT
// ---------- ----------
const scene_source = new THREE.Scene();
const geometry = new THREE.BufferGeometry();
geometry.copy( new THREE.BoxGeometry(1,1,1) );
const material = new THREE.MeshPhongMaterial({ color: 0xff0000, emissive: 0xffffff, emissiveIntensity: 0.05 });
const mesh_source = new THREE.Mesh( geometry, material );
scene_source.add(mesh_source);
const light_source = new THREE.PointLight(0xffffff, 1);
light_source.position.set( 1, 3, 2);
light_source.name = 'point_light'
scene_source.add(light_source);
const scene_json = JSON.stringify( scene_source.toJSON() );
// logging the JSON text
console.log( scene_json );
// ---------- ----------
// CREATING A SCENE OBJECT FROM THE JSON TEXT
// ---------- ----------
// creating a new mesh from the JSON text
const scene = new THREE.ObjectLoader().parse( JSON.parse( scene_json ) );
// !!! looks like the 'position' prop of child objects is not getting stored.
// that is a problem
const pl = scene.getObjectByName('point_light');
pl.position.set(1, 3, 2);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

For this demo I am creating a scene object, along with a mesh object, and a point light. I am then positioning the point light away from the mesh object and then calling the toJSON method off of the scene object. Now for the most part this works fine, but with one little problem it would seem that the change to the position attribute that I made is not being stored into the json data. So the way that I had to fix that here when it comes to converting the JSON string back to an object was to get a reference to the point light, and then set the position again.

The good news here is that if I aim to use the object loader to load one object at a time, and then do something else to position things then this way of creating the json data will work just fine. However if I want to create a whole static scene with a bunch of child objects all over the place this presets a problem. The good news though is that this is a limitation of the Object3d.toJSON generator and not the parse method of the Object loader. When I look at the source code for the Object loader it does look like it will process a key value pair for the position. However if the position is key is not there, or if it is there but a matrix key is there then it will not work.

## Conclusion

That will be it for the Object Loader thus far between now and then next time I do a little editing for this post. Although there are a lot of options for loaders not just built in but also with respect to add on loaders such as the [DAE Loader](/2021/04/30/threejs-dae-collada-loader/) just to name one, I do like the built in object loader for many reasons. For one reason it is a plain text format which is nice because although it might be time consuming to do so, the data can be created and edited with any plain text editor. However it is not just that it is a plain text format, it is also because the plain text is JSON rather than some other plain text format like XML.


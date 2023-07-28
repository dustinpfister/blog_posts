---
title: The Matheral Loader in threejs
date: 2023-07-27 12:28:00
tags: [three.js]
layout: post
categories: three.js
id: 1063
updated: 2023-07-28 12:04:39
version: 1.3
---

There are a number of loaders built into the core of threejs that extend from the common base loader class, one such option is the materials loader which will be the main theme of this post. There might be a situation or two in which I might want to use the material loader in conjunction with the texture loader, and buffer geometry loader, then create the final scene object with all of these assets. However I have found that I might prefer to go with the Object Loader as a way to bake everything into a single JSON file format and just start creating assets that way.

There is also of course starting to look into the long list of options when it comes to the additional loaders there are to work with in the JSM folder of the examples folder of the threejs Github Repository. There is also the js folder of the examples folder if you are using r147 or older, but getting into all of that is a whole other matter. The main point here I think is to maybe start by looking into what there is to work with that is baked into the core of the threejs library itself first. In some cases it might be possible to just go with these standards and then move on with ones life, and with that said this post will center on the use of one of these options for materials at least.

<!-- more -->

## The Material Loader in threejs and what to know first

In this blog post I am writing about a few source code examples that make use of the Material Loader that is baked into the core of threejs. Although I do try to keep these examples easy to follow for people that are new to threejs, this is still not a [getting started type post on the library](/2018/04/04/threejs-getting-started/). I then assume that you at least know a few basic things that have to do with the very core basics of threejs projects. However I will still write about a few things that you might want to read more on first in this into section.

### Read More about materials in general first

I have my [main blog post on the subject of materials](/2018/04/30/threejs-materials/) in general that I started a long time ago, and have edited over and over again and still do on occasion. This would then be a good read when it comes to looking over everything that there is to be aware of when it comes to materials in general.

### The Object Loader

The material loader works okay, but it does have some limitations. For example there is the concern when it comes to textures that are used with a material and how to go about loading them in. Also materials are just imply that, which then raises concerns with other forms of data that are needed when it comes to geometry, and the various objects that will from an over all scene. There might be ways of addressing all of these concerns involving the use of additional loaders such as the texture loader, and the buffer geometry loader. However I have found that as of late I like to just go with [the object loader](/2023/07/19/threejs-object-loader/) as a way to not just pull in materials, but also textures, geometry, animations and so forth.

### Source Code is up on Github

The source code examples that I am writing about here can also be found in my [test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-materials-loader) on github. This is also where I park additional notes on various resources used, what the plans are for future edits of the post, and so forth. This repo is also where I place such things for [every other blog post that I have wrote on threejs](/categories/three-js/) over the years as well.

### Version Numbers Matter

When I first started this blog post I was using [r152 of threejs and thus followed that style rules](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r152/README.md) I have set for that revision. You can check out my readme on this but if you want me to save you a click this means that I am using an import map, and setting the type attribute of the script tags to module rather than leaving it to the default text/javaScript mime type. It should also go without saying that I am using r152 here, so if you are using an older or newer revision the code examples here might break for that reason.

## 1 - Some Basic Examples of the Material Loader

As always with these posts on threejs I like to start out with just a few very basic getting started type examples of something. So when it comes to using the Material loader there is the question of how to go about creating the raw JSON data to begin with in the from of an external file, or a hard coded string in a javaScript file. After that there is just working out how to go about loading that external file, or to parse a string form of the same data coded into the javaScript code itself, or obtained by some other means.

### 1.1 - Parse a Hand Coded JSON String

For this first example I am going to start out by just making a hand coded form of the JSON data to the use with the parse method of the material loader. Hand coding the JSON from the ground up is one option, and when doing so I have found that I can leave a lot out as the blanks for everything will just be filled in with whatever the defaults are. Of course there are other was of generating the JSON data to begin with though that I will be getting to in the next examples. I just want to make it clear that this is very much one way to get started with this.

When doing so I will want to start out by using backtricks to create the string value. After that at a bare bones minimum I am going to want to have a metadata object in which I set the version number of the object standard I am using such as 4.5, make sure that the type key for this is set to 'Material', and also give a generator key as well. The generator key will give some indication as to what was used to create this JSON data such as the Material.toJSON method that I will be getting to, sense this is hand coded text I am just punching that in for this. After the metadata object I will want to at least give a type key to set what material option to use such as the MeshNormalMaterial which strokes me a s a good start for this.

Once I have the string value that I want to use I can pass that to the JSON.pase method to create an object from the string data. This object can then be passed to the parse method of an instances of the MaterialLoader, and the end result is an instance of the MeshNormalMaterial that I can then use with a Mesh.

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
// MATERIAL LOADER - parse a material in the form of a hard coded string
// ---------- ----------
const str_material = `
{
    "metadata": {
        "version": 4.5,
        "type": "Material",
        "generator": "Hand Coded"
    },
    "type": "MeshNormalMaterial"
}
`
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So far this is just a very complex way of creating an instance of the MeshNormalMatreial, but this is the very first example of the basic example so I want to start one with a very simple clean example. In any case the core idea should all ready be clear with this as there are a whole lot more public keys to a material other than just the type of course.

### 1.2 - Create A JSON string from a Material Object

For this example I am going to touch base on how to go about generating JSON data of a material object that you all ready have to work with in code. For now I am just going to log the text to the javaScript console, but then also use the same text to create a material again as I have all ready covered. So if I am ready have a material option and I want to generate a JSON object from that material I cna just call the toJSON method of the material. To convert this object to a string from of the object I can then just pass the object to the JSON.stringify method. Now that I have that text I can save that as a JSON file, or I can convert it back to a material object same as before.

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
// MATERIAL LOADER - creating a JSON string from a material
// ---------- ----------
const obj_material = new THREE.MeshNormalMaterial().toJSON();
const str_material = JSON.stringify(obj_material);
console.log(str_material);
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 1.3 - Load a Material in JSON file form

So there are two general ways of creating the JSON data of a material to begin with, one of which is to just hand coded the data from the ground up in an editor, or some similar kind of means if there is no material to begin with. However if there is a material object to begin with then the toJSON method of the material class can be used to convert this material to an object than can then be converted to the text. One way or another there is getting that text format of the JSON, and although it can be stored in the from of a hard coded string in a JSON file to then be loaded with the parse method, typically it is an external JSON file that is to be created. With that aid in the event that I have a JSON file of a material stored in a location of a project, I will of course want to load that into it by using the load method of the Material Loader.

So say that I have this JSON file text stored in the same location of my javaScript file as material.json.

```json
{
    "metadata": {
        "version": 4.5,
        "type": "Material",
        "generator": "Material.toJSON"
    },
    "uuid": "beb0f098-1561-467e-a207-b577a6f5e1da",
    "type": "MeshNormalMaterial",
    "depthFunc": 3,
    "depthTest": true,
    "depthWrite": true,
    "colorWrite": true,
    "stencilWrite": false,
    "stencilWriteMask": 255,
    "stencilFunc": 519,
    "stencilRef": 0,
    "stencilFuncMask": 255,
    "stencilFail": 7680,
    "stencilZFail": 7680,
    "stencilZPass": 7680
}
```

I will then want to load that material by calling the load method of an instance of THREE.MaterialLoader. When calling the load method I will want to pass the URL of the JSON file as the first argument, and then a callback function that will fire when the material is done loading.

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
// MATERIAL LOADER
// ---------- ----------
const loader = new THREE.MaterialLoader();
loader.load('/forpost/threejs-materials-loader/s1-3-basic-load/material.json', (material) => {
    scene.add( new THREE.GridHelper( 10,10 ) );
    const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
    scene.add(mesh);
    // RENDER
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
});
```

## 2 - Loading Shader Materials

I have wrote a main blog post on the subject of using the [shader material](/2023/01/13/threejs-shader-material) as a way to create custom materials by writing a little GLSL code on top of what there is to work with in the shader library baked into the core of threejs. If I am going to ever use the material loader in any capacity in a real project I am fairly sure that I am going to want to make sure that I can use it to load these kinds of materials. Also I am sure that working out what I am doing here will also apply to the materials key of the JSON data that I use with the object loader as well.

### 2.1 - Very simple getting started parse string example

So then one will need to start somewhere when it comes to just testing things out with this to begin with and that will be what this example is about. So then I am starting out with making an example where I can just start creating a JSON string and see if parsing it into a material will work okay. I could also just start with what I did in the single load of an external file demo, but this way I can have everything together in one nice neat little demo.

Sense this is just a getting started type demo of this I will just want to have a solid mass of color for the object I use it with and that is it. This will help make the GLSL code for the vertex and fragment shaders fairly simple, but still only so simple if you are new to this sort of thing. The vertex shader as the name suggests is used to find out what the deal is when it comes to setting the current position of a fragment, and then the fragment shader is then used to set the style of that fragment such as the color. When it comes to setting the gl\_FragColor value this will need to be an instance of vec4 which is a vector of 4 values, red, green, blue, and alpha opacity.

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
// SHADER MATERIAL JSON AS HARD CODED STRING
// ---------- ----------
const str_material = `{
  "metadata":{
    "version": 4.5,
    "type": "Material",
    "generator": "Hacked-Over-Material.toJSON-Export"
  },
  "uuid": "15d8e01f-af72-4a5e-9188-b009814b7496",
  "type": "ShaderMaterial",
  "uniforms":{
    "diffuse":{
      "type":"c",
      "value": 65535
    }
  },
  "vertexShader": "void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);}",
  "fragmentShader": "uniform vec3 diffuse;void main(){gl_FragColor = vec4(diffuse,1);}"
}`;
const material = new THREE.MaterialLoader().parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - The Deal with textures and the Material Loader

One major headache with the material loader I have found is the deal with textures which is one major reason why I like the Object Loader as that helps to have everything in one package. However where there is a will there is a way when it comes to getting this to work, and with that said the key method here is the set textures method of the material loader. The threejs docs do not give much help in terms of how to format the object that I am to give when calling it, but after taking a look at the source code of the material loader it would seem that what needs to be passed is an object where each key is the value of the option to which I want to set the texture for in the JSON of the material.

### 3.1 - Demo using a canvas texture and the setTextures method of the material loader

For this demo I am using a hard coded JSON String for the material, and then creating a texture with a canvas element by using THREE.CanvasTexture. With this one before I call the parse method I will want to call the set textures method of the material loader and then pass an object with the textures I want to use with the material. The trick here is to make sure that each key name for each texture will match up with the key value of the option in the material JSON data.

```
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
//-------- ----------
// CANVAS ELEMENT AND TEXTURE
//-------- ----------
const canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = 32; canvas.height = 32;
ctx.lineWidth = 5;
ctx.strokeStyle = '#ff0000';
ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);
const texture = new THREE.CanvasTexture(canvas); 
texture.magFilter = THREE.NearestFilter;
texture.minFilter = THREE.NearestFilter;
// ---------- ----------
// MATERIAL LOADER - loading json with map option with key value of 'diffuse_one' that is then given by setTextures method
// ---------- ----------
const str_material = `
{
  "metadata":{
    "version":4.5,
    "type":"Material",
    "generator":"Hacked over Material.toJSON Export setting key value of map option"
  },
  "uuid":"a5ce8212-1239-49d2-b564-0dfb6d84441f",
  "type":"MeshBasicMaterial",
  "color":16777215,
  "map":"diffuse_one",
  "reflectivity":1,
  "refractionRatio":0.98,
  "depthFunc":3,
  "depthTest":true,
  "depthWrite":true,
  "colorWrite":true,
  "stencilWrite":false,
  "stencilWriteMask":255,
  "stencilFunc":519,
  "stencilRef":0,
  "stencilFuncMask":255,
  "stencilFail":7680,
  "stencilZFail":7680,
  "stencilZPass":7680
}
`;
const loader =  new THREE.MaterialLoader();
loader.setTextures({
    diffuse_one: texture
});
const material = loader.parse( JSON.parse(str_material) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.2 - Texture Loader Demo

The process of using the texture loader to load an image that will then be used for one of the options of the material loaded with the material loader is a bit of a convoluted process. This is one of the major reasons why I like the object loader as it allows for me to package everything into a single json file by making use of DATA urls. Still there might be some reasons why a developer might want to break things down, as such they might want to load materials and with that also the textures used with said materials, and then do whatever needs to be done in terms of geometry and scene objects. With that said there is a way to do this but there are some issues of course.

One major pain is with the texture loader, it will load images files and then create a new texture object. This presents a problem if the uuids of the textures or rather at least the keys of the textures object passed to the setTextures method much match up with the key values of the options in the material json that use the textures. Each time an image is loaded with the texture loader a new textures object will be created for it, and with that a new uuid. One way to solve this is maybe to use uuids for the file names of the textures, then set the uuids of the textures to the uuid of the file name, and then also make sure that this is set for the key of the textures object as well.

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
// MATERIAL LOADER
// ---------- ----------

const textures = {};

const loader = new THREE.TextureLoader();
const uuid = 'c3ad2169-e7e1-435c-90f3-81bdc4ba6283';
const url = uuid + '.png';
loader.load( url, (texture) => {
    texture.uuid = uuid;
    textures[uuid] = texture;
    const loader = new THREE.MaterialLoader();
    loader.setTextures(textures)
    loader.load('/forpost/threejs-materials-loader/s3-2-texture-load/material.json', (material) => {
        scene.add( new THREE.GridHelper( 10,10 ) );
        const mesh = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), material );
        scene.add(mesh);
        // RENDER
        camera.position.set(2, 2, 2);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    });
});
```

Although this might work with just this one file for this one option in the JSON data there are a lot of issues here. Still the core of the idea is working with this never the less. The most important part here is that the key value set for the textures object matches up with what is being used in the material json data. So I could alternatively use whatever file names I want given that I set the file names as the uuid values in the material JSON data.

## Conclusion

I have a whole lot more that I would like to write about when it comes to this topic, however I can only get to so much of what I want to do of course. I will come around to edit this post again at some point in the future I am sure, and with that said I do have a number of things on the todo list with this one which is almost always the case with threejs topics. However I am thinking that my content on the object loader will need to take higher priority with this subject as it seems that kind of loader is just want I am going to want to use in order to address some if the issues that come up when using the material loader. The other way of addressing most of the concerns often seems to involve having to also use the texture loader, buffer geometry loader and so forth.



